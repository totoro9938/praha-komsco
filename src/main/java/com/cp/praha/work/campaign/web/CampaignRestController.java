package com.cp.praha.work.campaign.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.common.validation.CustomCollectionValidator;
import com.cp.praha.consult.consultmain.service.ConsultService;
import com.cp.praha.consult.consultmain.service.request.UserDddCommand;
import com.cp.praha.consult.consultmain.service.response.ReservationAgentSelectDomain;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.WebSocketService;
import com.cp.praha.work.campaign.service.CampaignService;
import com.cp.praha.work.campaign.service.request.*;
import com.cp.praha.work.campaign.service.response.CampaignInsertDomain;
import com.cp.praha.work.campaign.service.response.CampaignSelectItemDomain;
import com.cp.praha.work.campaign.service.response.CampaignSmsResultSelectDomain;
import com.cp.praha.work.campaign.service.response.CampaignUserDistribSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_HAPPYCALL_MGR_SELECT")
public class CampaignRestController {

    private final UserInfo userInfo;
    private final CampaignService campaignService;
    private final ConsultService consultService;
    private final CustomCollectionValidator customCollectionValidator;
    private final WebSocketService webSocketService;
    private final CategoryService categoryService;



    @GetMapping("/campaign/select/page")
    public GridDomain campaignSelectPage(@Valid CampaignSelectPageCommand campaignSelectPageCommand){
        return campaignService.campaignSelectPage(campaignSelectPageCommand);
    }

    @GetMapping("/campaign/select/{uuid}")
    public CampaignSelectItemDomain campaignSelectItem(@PathVariable String uuid){
        return campaignService.campaignSelectItem(uuid);
    }

    @GetMapping("/campaign/target/select/page")
    public GridDomain campaignTargetSelectPage(@Valid CampaignTargetSelectPageCommand campaignTargetSelectPageCommand){
        return campaignService.campaignTargetSelectPage(campaignTargetSelectPageCommand);
    }

    @GetMapping("/campaign/cust/select/page")
    public GridDomain campaignCustSelectPage(@Valid CampaignCustSelectPageCommand campaignCustSelectPageCommand){
        return campaignService.campaignCustSelectPage(campaignCustSelectPageCommand);
    }

    @GetMapping("/campaign/select/distribution/{programId}")
    public List<CampaignUserDistribSelectDomain> campaignSelectDistribution(@PathVariable int programId){
        return campaignService.campaignUserDistribSelect(programId);
    }

    @PostMapping("/campaign/insert")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_INSERT")
    public CampaignInsertDomain campaignInsert(@RequestBody @Valid CampaignInsertCommand campaignInsertCommand) {
        return campaignService.campaignInsert(campaignInsertCommand,userInfo);
    }

    @PutMapping("/campaign/update")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_UPDATE")
    public ResponseEntity<HttpStatus> campaignUpdate(@RequestBody @Valid CampaignUpdateCommand campaignUpdateCommand){
        campaignService.campaignUpdate(campaignUpdateCommand,userInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/campaign/regist-step/update")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_UPDATE")
    public String campaignRegistStepUpdate(@RequestBody @Valid CampaignRegistStepUpdateCommand campaignRegistStepUpdateCommand){
        return campaignService.campaignRegistStepUpdate(campaignRegistStepUpdateCommand);
    }

    @PostMapping("/campaign/customer/insert")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_INSERT")
    public ResponseEntity<HttpStatus> campaignCustInsert(@RequestBody @Valid List<CampaignCustInsertCommand> campaignCustInsertCommands, BindingResult bindingResult) throws BindException {

        customCollectionValidator.validate(campaignCustInsertCommands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            campaignService.campaignCustInsert(campaignCustInsertCommands, userInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/campaign/customer/distribution/insert")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_UPDATE")
    public ResponseEntity<HttpStatus> campaignCustDisInsert(@RequestBody @Valid CampaignCustDisInsertCommand campaignCustDisInsertCommand){
        campaignService.campaignCustDisInsert(campaignCustDisInsertCommand, userInfo);
        var srcId2 = campaignCustDisInsertCommand.getCampaignId();
        var srcId1 = AlarmSrcId.CAMPAIGN;
        webSocketService.alarmSourceSend(srcId1, String.valueOf(srcId2));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/campaign/customer/distribution/collect")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_UPDATE")
    public ResponseEntity<HttpStatus> campaignCustDisInsert(@RequestBody @Valid CampaignCustDisCollectCommand campaignCustDisCollectCommand){
        campaignService.campaignCustDisCollect(campaignCustDisCollectCommand, userInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/campaign/customer/delete")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_DELETE")
    public ResponseEntity<HttpStatus> campaignCustDelete(@RequestBody @Valid List<CampaignCustDeleteCommand> campaignCustDeleteCommands, BindingResult bindingResult) throws BindException {

        customCollectionValidator.validate(campaignCustDeleteCommands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            campaignService.campaignCustDelete(campaignCustDeleteCommands, userInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/campaign/reservation-user-select")
    public List<ReservationAgentSelectDomain> reservationAgentSelect(UserDddCommand command){
        return consultService.reservationAgentSelect(command);
    }

    @PostMapping("/campaign/customer/upload")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_INSERT")
    public ResponseEntity<HttpStatus> campaignCustUpload(HttpServletRequest request, @RequestBody @Valid List<CampaignCustUploadCommand> campaignCustUploadCommands, BindingResult bindingResult) throws BindException {
        String ip = IpUtil.getClientIP(request);
        customCollectionValidator.validate(campaignCustUploadCommands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            campaignService.campaignCustUpload(campaignCustUploadCommands,ip,userInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/campaign/sms/insert")
    @Secured("ROLE_WORK_HAPPYCALL_MGR_INSERT")
    public ResponseEntity<HttpStatus> campaignSmsInsert(@RequestBody @Valid List<SmsInsertCommand> commands, BindingResult bindingResult) throws BindException {

        customCollectionValidator.validate(commands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            campaignService.campaignSmsInsert(commands);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/campaign/sms/result/{programId}")
    public List<CampaignSmsResultSelectDomain> campaignSmsReulst(@PathVariable int programId){
        return campaignService.campaignSmsResultSelect(programId);
    }

    @GetMapping("/campaign/cat/treeSelect")
    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command) {
        return categoryService.categoryTreeSelect(command);
    }

}
