package com.cp.praha.consult.reservation.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.reservation.entity.*;
import com.cp.praha.consult.reservation.service.request.*;
import com.cp.praha.consult.reservation.service.response.ReservationSelectItemDomain;
import com.cp.praha.consult.reservation.service.response.VisitorReserveSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservationListService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Transactional
    public void reservationUpdate(ReservationUpdateCommand reservationUpdateCommand) {
        ProcErrorHandler.errorHandler(ReservationUpdateProc.procedureQuery(entityManager,userInfo,reservationUpdateCommand));
    }

    public ReservationSelectItemDomain reservationSelectItem(ReservationListSelectItemCommand reservationListSelectItemCommand) {
        var procedure = ReservationSelectItemProc.procedureQuery(entityManager,reservationListSelectItemCommand);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }

    public GridDomain reservationSelectPage(ReservationSelectPageCommand reservationSelectPageCommand) {
        var procedure = ReservationSelectPageProc.procedureQuery(entityManager,reservationSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }

    @Transactional
    public void visitorReserveInsert(String ip, VisitorReserveInsertCommand visitorReserveInsertCommand) {
        ProcErrorHandler.errorHandler(VisitorReserveInsertProc.procedureQuery(entityManager,userInfo,ip, visitorReserveInsertCommand));
    }

    public List<VisitorReserveSelectDomain> visitorReserveSelect(VisitorReserveSelectCommand visitorReserveSelectCommand) {
        var procedure = VisitorReserveSelectProc.procedureQuery(entityManager,visitorReserveSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

}
