package com.cp.praha.main.common.service;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.common.login.service.response.CpUserDetail;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.common.entity.*;
import com.cp.praha.main.common.service.request.UserPasswordUpdateCommand;
import com.cp.praha.main.common.service.response.AlarmDomain;
import com.cp.praha.main.common.service.response.CallAverageDomain;
import com.cp.praha.main.common.service.response.CallJobDomain;
import com.cp.praha.main.login.entity.UserLoginProc;
import com.cp.praha.main.login.service.request.UserLoginCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.EntityManager;
import javax.persistence.StoredProcedureQuery;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${company.name}")
    private String companyName;

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Transactional
    public void userPasswordUpdate(UserPasswordUpdateCommand command) {
        var user = userInfo.getUser();
        this.checkPassword(command.getUserPwdChange(), command.getPassword(), user.getUserCd());
        ProcErrorHandler.errorHandler( UserPasswordUpdateProc.procedureQuery(entityManager,command, user));
    }


    @Transactional
    public void homePasswordUpdate(UserPasswordUpdateCommand command) {

        HttpServletRequest request =
                ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        log.debug("{}", IpUtil.getClientIP(request));
        this.checkPassword(command.getUserPwdChange(), command.getPassword(), command.getUserCd());
        UserLoginCommand userLoginCommand = new UserLoginCommand();
        userLoginCommand.setUserCd(command.getUserCd());
        userLoginCommand.setUserPwd(command.getUserPwd());

        var procedureQuery = UserLoginProc.procedureQuery(entityManager, userLoginCommand);
        ProcErrorHandler.errorHandler(procedureQuery);

        var user = GenericListType.getObjectType(new TypeReference<UserLoginProc>() {},procedureQuery.getSingleResult());
        CpUserDetail userDetail = new CpUserDetail(user.getUserId());
        StoredProcedureQuery updatePasswordProcedureQuery = UserPasswordUpdateProc.procedureQuery(entityManager,command, userDetail);

        ProcErrorHandler.errorHandler(updatePasswordProcedureQuery);
    }

    public void checkPassword(String userPwdChange, String password, String userCd) {

        log.info("{} - {}", userCd, userPwdChange);

        if (!userPwdChange.equals(password)) throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "패스워드가 일치하지 않습니다.");

        // 비밀번호 포맷 확인(영문, 특수문자, 숫자 포함 8자 이상)
        Pattern passPattern1 = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{9,20}$");
        Matcher passMatcher1 = passPattern1.matcher(userPwdChange);

        if (!passMatcher1.find()) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "비밀번호는 영문과 특수문자 숫자를 포함하며 9자 이상이어야 합니다.");
        }

        // 반복된 문자 확인
        Pattern passPattern2 = Pattern.compile("(\\w)\\1\\1\\1");
        Matcher passMatcher2 = passPattern2.matcher(userPwdChange);

        if (passMatcher2.find()) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "비밀번호에 동일한 문자를 과도하게 연속해서 사용할 수 없습니다.");
        }

        // 아이디 포함 확인
        if (password.contains(userCd)) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "비밀번호에 ID를 포함할 수 없습니다.");
        }

        // 특수문자 확인
        Pattern passPattern3 = Pattern.compile("\\W");
        Pattern passPattern4 = Pattern.compile("[!@#$%^*+=-]");

        for (int i = 0; i < userPwdChange.length(); i++) {
            String s = String.valueOf(userPwdChange.charAt(i));
            Matcher passMatcher3 = passPattern3.matcher(s);

            if (passMatcher3.find()) {
                Matcher passMatcher4 = passPattern4.matcher(s);
                if (!passMatcher4.find()) {
                    throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.");
                }
            }
        }

        //연속된 문자 확인
        int ascSeqCharCnt = 0; // 오름차순 연속 문자 카운트
        int descSeqCharCnt = 0; // 내림차순 연속 문자 카운트

        char char0;
        char char1;
        char char2;

        int diff01;
        int diff12;

        for (int i = 0; i < userPwdChange.length() - 2; i++) {
            char0 = userPwdChange.charAt(i);
            char1 = userPwdChange.charAt(i + 1);
            char2 = userPwdChange.charAt(i + 2);

            diff01 = char0 - char1;
            diff12 = char1 - char2;

            if (diff01 == 1 && diff12 == 1) {
                ascSeqCharCnt += 1;
            }

            if (diff01 == -1 && diff12 == -1) {
                descSeqCharCnt -= 1;
            }
        }

        if (ascSeqCharCnt > 1 || descSeqCharCnt > 1) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST, "비밀번호에 연속된 문자열을 사용할 수 없습니다.");
        }
    }

    public List<AlarmDomain> alertList(String readYn) {
        var user = userInfo.getUser();
        StoredProcedureQuery procedureQuery = AlarmProc.procedureQuery(entityManager, user.getUserId(), readYn);

        ProcErrorHandler.errorHandler(procedureQuery);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedureQuery.getResultList());
    }

    public List<CallJobDomain> callJobList() {
        var user = userInfo.getUser();
        StoredProcedureQuery procedureQuery = CallJobProc.procedureQuery(entityManager,user.getUserId());

        ProcErrorHandler.errorHandler(procedureQuery);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedureQuery.getResultList());
    }

    public List<CallAverageDomain> callAverageList(Integer daycount) {
        var user = userInfo.getUser();
        StoredProcedureQuery procedureQuery = CallAverageProc.procedureQuery(entityManager,daycount,user.getUserId());

        ProcErrorHandler.errorHandler(procedureQuery);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedureQuery.getResultList());
    }

    @Transactional
    public void alarmReadUpdate(int alarmId) {
        var user = userInfo.getUser();
        StoredProcedureQuery procedureQuery = AlarmUpdateReadFlagProc.procedureQuery(entityManager,alarmId, user.getUserId());
        ProcErrorHandler.errorHandler(procedureQuery);
    }

}
