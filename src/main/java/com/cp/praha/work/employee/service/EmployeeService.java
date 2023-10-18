package com.cp.praha.work.employee.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.administrative.service.AdministUtil;
import com.cp.praha.consult.administrative.service.request.ParamVO;
import com.cp.praha.work.employee.entity.*;
import com.cp.praha.work.employee.service.request.EmployeeSelPageCommand;
import com.cp.praha.work.employee.service.response.EmployeeDeptVO;
import com.cp.praha.work.employee.service.response.EmployeeUserVO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmployeeService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    private final AdministUtil administUtil;

    @Value("${internal.ip}")
    private String ip;

    public GridDomain employeeSelectPage(EmployeeSelPageCommand command) {

        var procedure = EmployeeSelPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList()));

        return gridDomain;
    }

    @Transactional
    public Integer employeeSync(ParamVO param) throws Exception {
        int syncStatus = 0;

        String datas = "";
        String xmlStringDatas = "";
        int i = 0;

        try{

            URL targetURL = new URL(ip + "/employee/dept");
            URLConnection urlConn = targetURL.openConnection();
            HttpURLConnection hurlc = (HttpURLConnection) urlConn;

            BufferedReader reader = new BufferedReader(new InputStreamReader(hurlc.getInputStream()));
            String buffer = null;

            datas = "";
            while ((buffer = reader.readLine()) != null) {
                datas += buffer;
            }

            xmlStringDatas = datas;

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
            List<EmployeeDeptVO> employeeDeptVOList = Arrays.asList(objectMapper.readValue(xmlStringDatas, EmployeeDeptVO[].class));

            i = 0;
            for(EmployeeDeptVO data : employeeDeptVOList){
                var procedureDept = EmployeeDeptInsProc.procedureQuery(entityManager, i, userInfo, data);
                ProcErrorHandler.errorHandler(procedureDept);
                i++;
            }
            log.debug("조직정보 가져오기 완료");
        }catch (Exception ex){
            syncStatus = 1;
            log.error("조직정보 가져오기 오류");
        }

        if(syncStatus == 0) {
            try {
                var procedureSync = EmployeeDeptSyncProc.procedureQuery(entityManager, userInfo);
                ProcErrorHandler.errorHandler(procedureSync);
                log.debug("조직정보 동기화 완료");
            } catch (Exception ex) {
                syncStatus = 2;
                log.error("조직정보 동기화 오류");
            }
        }

        if(syncStatus == 0) {
            //  인사정보동기화 : USER
            try {

                URL targetURL = new URL(ip + "/employee/user");
                URLConnection urlConn = targetURL.openConnection();
                HttpURLConnection hurlc = (HttpURLConnection) urlConn;

                BufferedReader reader = new BufferedReader(new InputStreamReader(hurlc.getInputStream()));
                String buffer = null;

                datas = "";
                while ((buffer = reader.readLine()) != null) {
                    datas += buffer;
                }

                xmlStringDatas = datas;

                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
                List<EmployeeUserVO> employeeUserVOList = Arrays.asList(objectMapper.readValue(xmlStringDatas, EmployeeUserVO[].class));

                i = 0;
                for(EmployeeUserVO data : employeeUserVOList){
                    var procedureUser = EmployeeUserInsProc.procedureQuery(entityManager, i, userInfo, data);
                    ProcErrorHandler.errorHandler(procedureUser);
                    i++;
                }
                log.debug("인사정보 가져오기 완료");
            } catch (Exception ex) {
                syncStatus = 3;
                log.error("인사정보 가져오기 오류");
            }
        }

        if(syncStatus == 0) {
            try {
                var procedureSync = EmployeeUserSyncProc.procedureQuery(entityManager, userInfo);
                ProcErrorHandler.errorHandler(procedureSync);
                log.debug("인사정보 동기화 완료");
            } catch (Exception ex) {
                syncStatus = 4;
                log.error("인사정보 동기화 오류");
            }
        }

        return syncStatus;
    }
}
