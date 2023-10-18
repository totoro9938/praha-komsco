package com.cp.praha.report.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.report.entity.*;
import com.cp.praha.report.service.request.*;
import com.cp.praha.report.service.response.*;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    private final EntityManager entityManager;



    public List<ReportUserPerDayDomain> reportUserPerDay(ReportUserPerDayCommand command) {
        var procedure = ReportUserPerDayProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportCampaignDomain> reportCampaign(ReportCampaignCommand command) {
        var procedure = ReportCampaignProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportRequestManualListDomain> reportManual(ReportRequestManualListCommand command) {
        var procedure = ReportRequestManualListProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportCallCatPerDayDomain> reportCalCatPerDay(ReportCallCatPerDayCommand command) {
        var procedure = ReportCallCatPerDayProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportCallClassPerDayDomain> reportCallClassPerDay(ReportCallClassPerDayCommand command) {
        var procedure = ReportCallClassPerDayProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportHourPerReceiptDomain> reportHourPerReceipt(ReportHourPerReceiptCommand command) {
        var procedure = ReportHourPerReceiptProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<ReportTransferListDomain> reportTransferList(ReportTransferListCommand command) {
        var procedure = ReportTransferListProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportCallCatTypeDomain> reportCallCatType(ReportCallCatTypeCommand command) {
        var procedure = ReportCallCatTypeProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportDnisDomain> reportDnis(ReportCallCatTypeCommand command) {
        var procedure = ReportDnisProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }
    public List<ReportCallCatTypeFirstDomain> reportCallCatTypeFirst(ReportCallCatTypeCommand command) {
        var procedure = ReportCallCatTypeFirstProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportCallCatTypePivotDomain> reportCallCatTypePivot(ReportCallCatTypePivotCommand command){
        var procedure = ReportCallCatTypePivotProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportCallYmdSelDomain> reportCallColSel(ReportCallColSelCommand command){
        var procedure = ReportCallColSelProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportBoundTypeDomain> reportBoundType(ReportBoundTypeCommand command){
        var procedure = ReportBoundTypeProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<DiscomfortReportDeptDomain> discomfortReportDept(DiscomfortReportDeptCommand command) {
        var procedure = DiscomfortReportDeptProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }
    public List<DiscomfortReportCatDomain> discomfortReportCat(DiscomfortReportDeptCommand command) {
        var procedure = DiscomfortReportCatProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }
    public List<DiscomfortReportDayDomain> discomfortReportDay(DiscomfortReportDeptCommand command) {
        var procedure = DiscomfortReportDayProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportHomeServiceTargetProc> reportHomeServiceTarget(ReportHomeServiceTargetCommand command) {
        var procedure = ReportHomeServiceTargetProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportHomeServiceColSelDomain> reportHomeServiceColSel(ReportHomeServiceColSelCommand command){
        var procedure = ReportHomeServiceColSelProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportProcessCenterDomain> reportProcessCenter(ReportProcessCenterCommand command){
        var procedure = ReportProcessCenterProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportProcessTeamDomain> reportProcessTeam(ReportProcessTeamCommand command){
        var procedure = ReportProcessTeamProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportProcessAgentDomain> reportProcessAgent(ReportProcessAgentCommand command){
        var procedure = ReportProcessAgentProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }
    public List<ReportUserCallCatDomain> reportUserCallCat(ReportCallCatTypeCommand command) {
        var procedure = ReportUserCallCatProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportCallbackProcessTimeDomain> reportCallbackProcessTime(ReportCallbackProcessTimeCommand command){
        var procedure = ReportCallbackProcessTimeProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportManualCallPartDomain> reportManualCallPart(ReportManualCallPartCommand command){
        var procedure = ReportManualCallPartProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportManualDeptDomain> reportManualDept(ReportManualDeptCommand command){
        var procedure = ReportManualDeptProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ReportManualDayDomain> reportManualDay(ReportManualDayCommand command){
        var procedure = ReportManualDayProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public GridDomain LogLoginOut(LogLoginOutSelPageCommand command){
        var procedure = LogLoginOutSelPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        var list =  GenericListType.getObjectType(new TypeReference<List<LogLoginOutSelPageDomain>>() {
        }, procedure.getResultList());
        int totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        int curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");

        GridDomain grid = new GridDomain();
        grid.setRows(list);
        grid.setTotalCount(totalCount);
        grid.setCurPage(curPage);
        return grid;
    }

}
