const ctiAppName = "ContactPro";
const ctiIpAddr = "211.39.139.26";
const ctiIpPort = "9203";
const tenantName = "centerlink";
const recIp = "211.39.139.41";
const recPort = "7210"
const ivrDn = "6325";
const thirdPartyDn = "6324";
const ctiShaType = 4;           // cti 암호화방식 none : 0,sha-160 = 1 ,sha-256 :2 , sha-384 : 3, sha-512 :4
class SoftPhone {
    ctiValue = Object.freeze({
        "reason": [
            {
                "stataName": "휴식", "code": "rest", "buttons": {
                    makeCall: true, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:true,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "agentStatus",
                "icon": "bi bi-cup-straw",
                "isAgentStatus": true,
                "ctiSubCode" :1,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "교육", "code": "education", "buttons": {
                    makeCall: true, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:true,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "agentStatus",
                "icon": "bi bi-book",
                "isAgentStatus": true,
                "ctiSubCode" :2,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "업무", "code": "work", "buttons": {
                    makeCall: true, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:true,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": true,
                "type": "agentStatus",
                "icon": "bi bi-person-workspace",
                "isAgentStatus": true,
                "ctiSubCode" :3,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "식사", "code": "eat", "buttons": {
                    makeCall: true, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:true,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "agentStatus",
                "icon": "bi bi-egg-fried",
                "isAgentStatus": true,
                "ctiSubCode" :4,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "후처리", "code": "afterCall", "buttons": {
                    makeCall: false, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:true,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "agentStatus",
                "isAgentStatus": true,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "연결중", "code": "makeCall", "buttons": {
                    makeCall: false, answerCall: false, clearCall: true,
                    hold: false, retrieveCall: false, wait:false,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":true,
                "isCallStatus" : true
            },
            {
                "stataName": "끊기", "code": "clearCall",
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": true,
                "isSetStatus":false,
                "isCallStatus" : false
            },
            {
                "stataName": "콜인입", "code": "ringing", "buttons": {
                    makeCall: false, answerCall: true, clearCall: true,
                    hold: false, retrieveCall: false, wait:false,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":true,
                "isCallStatus" : true
            },
            {
                "stataName": "받기", "code": "answerCall",
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":false,
                "isCallStatus" : false
            },
            {
                "stataName": "상담중", "code": "calling", "buttons": {
                    makeCall: false, answerCall: false, clearCall: true,
                    hold: true,  retrieveCall: false, wait:false,
                    singleStepTransfer: true, snarl: true
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":true,
                "isCallStatus" : true
            },
            {
                "stataName": "보류", "code": "holding", "buttons": {
                    makeCall: false, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: true,wait:false,
                    singleStepTransfer: true, snarl: false
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":true,
                "isCallStatus" : true
            },
            {
                "stataName": "해제", "code": "retrieve", "buttons": {
                    makeCall: false, answerCall: false, clearCall: true,
                    hold: true, retrieveCall: false,wait:false,
                    singleStepTransfer: true, snarl: true
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":false,
                "isCallStatus" : false
            },
            {
                "stataName": "즉시전달", "code": "singleStepTransfer",
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "isSetStatus":false,
                "isCallStatus" : false
            },
            {
                "stataName": "수신대기", "code": "wait", "buttons": {
                    makeCall: false, answerCall: false, clearCall: false,
                    hold: false, retrieveCall: false, wait:false,
                    singleStepTransfer: false, snarl: false
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": true,
                "isSetStatus":true,
                "isCallStatus" : false
            },
            {
                "stataName": "통화종료", "code": "snarl", "buttons": {
                    makeCall: false, answerCall: false, clearCall: true,
                    hold: true, retrieveCall: false, wait:false,
                    singleStepTransfer: true, snarl: true
                },
                "initStatus": false,
                "type": "callStatus",
                "isAgentStatus": false,
                "popover": {
                    "id": "cti-button-snarl",
                    "acr": [
                        {"text": "성희롱", "icon": "bi bi-exclamation-circle-fill" , "click" : "endScenario('WRN1')"},
                        {"text": "폭언/욕설","icon": "bi bi-megaphone-fill" , "click" : "endScenario('WRN2')"},
                        {"text": "반복/억지", "icon": "bi bi-arrow-repeat" , "click" : "endScenario('WRN3')"}
                    ]
                },
                "isSetStatus":false,
                "isCallStatus" : false
            }
        ]
    });
    statusTime = 0;
    waitTime = 0;
    timer;
    waitCall = false;
    isCtiUse = false;
    prefix = "9";
    isCalling =false;
    transferFlag = false;
    conferenceFlag = false;
    scenarioCallFlag = false;
    agentState;
    constructor(isCtiUse = false) {
        this.isCtiUse = isCtiUse;
        if (this.isCtiUse) {
            ipron.SetServerInfo(ctiIpAddr,ctiIpPort);
            ipron.SetHeartbeatInfo(10,18);
            ipron.OpenServer(ctiAppName,cp_cti_func_event,cp_cti_response);
        }
    }

    connectServer() {
        $('#cti-phone-number').show();
        $('#soft-phone').show();
        $('#agent-status-bar').show();
        $('#cti-timer').show();
        $('#cti-report').show();

        let ctiNumber = $("#cti-phone-number");
        let numbers = JSON.parse(localStorage.getItem("LAST_NUMBER"));
        if(!numbers)
            localStorage.setItem("LAST_NUMBER",JSON.stringify([{callType:"",telNo:""}]))

        this.ctiPhoneNumber = ctiNumber.kendoAutoComplete({
            size: "small",
            template : (r)=>{
                let template ="";
                if(!!r.telNo){
                    if(r.callType === "In") {
                        template += `<span class="k-icon k-i-c-telephone-inbound-fill k-button-icon" style="color: cornflowerblue"></span>`;
                    }else{
                        template += `<span class="k-icon k-i-c-telephone-outbound-fill k-button-icon" style="color: orangered"></span>`;
                    }
                    template += `<span> ${formatterHpNo(r.telNo)}</span>`;
                }
                return template;
            },
            dataSource: JSON.parse(localStorage.getItem("LAST_NUMBER")),
            dataTextField: "telNo",
            filter: "contains",
            noDataTemplate:false,
            clearButton:false,
            filtering: (e)=> {
                e.filter.value = e.filter.value.replaceAll("-","")
            },
            dataBound : (e)=>{
                $(e.sender.popup.element[0].parentElement).parent().css("z-index",999999999);
            },
            change : (e)=>{
                let val = e.sender.value();
                this.ctiPhoneNumber.value(val.formatterHpNo());
            }
        }).data("kendoAutoComplete");
        ctiNumber.bind("keyup",()=>{
            let val = this.ctiPhoneNumber.value();
            this.ctiPhoneNumber.value(val.formatterHpNo());
        });
        ctiNumber.bind("click",()=>{
            let val = this.ctiPhoneNumber.value();
            if(val === "")
                this.ctiPhoneNumber.search("");
        });

        let $ctiStatus = $('#cti-status');
        this.ctiStatus = $ctiStatus.kendoBadge({
            themeColor: 'primary',
            text: '휴식',
            size: 'large',
            fillMode: 'outline'
        }).data("kendoBadge");

        this.ctiButtonMakeCall = $('#cti-button-make-call')
            .kendoButton({
                icon: "c-telephone-forward",
                enabled: false,
                customData: this.ctiValue.reason.find(e => e.code === 'makeCall'),
                click: ctiBtnAct.makeCall
            }).data("kendoButton");

        this.ctiButtonAnswerCall = $('#cti-button-answer-call')
            .kendoButton({
                icon: 'c-telephone-inbound',
                enabled: false,
                customData: this.ctiValue.reason.find(e => e.code === 'answerCall'),
                click: ctiBtnAct.answerCall
            }).data("kendoButton");

        this.ctiButtonClearCall = $('#cti-button-clear-call')
            .kendoButton({
                icon: 'c-telephone-x',
                enabled: false,
                customData: this.ctiValue.reason.find(e => e.code === 'clearCall'),
                click: ctiBtnAct.clearCall
            }).data("kendoButton");

        this.ctiButtonHold = $('#cti-button-hold')
            .kendoButton({
                icon: 'c-pause',
                enabled: false,
                customData: this.ctiValue.reason.find(e => e.code === 'holding'),
                click: ctiBtnAct.hold
            }).data("kendoButton");

        this.ctiButtonRetrieveCall = $('#cti-button-retrieve-call')
            .kendoButton({
                icon : 'c-play',
                enabled: false,
                customData: this.ctiValue.reason.find(e => e.code === 'retrieve'),
                click: ctiBtnAct.retrieveCall
            }).data("kendoButton");

        this.ctiButtonWait = $('#cti-button-state-ready')
            .kendoButton({
                icon: 'c-headset',
                enabled: true,
                customData: this.ctiValue.reason.find(e => e.code === 'wait'),
                click: ctiBtnAct.ready
            }).data("kendoButton");

        this.ctiButtonSingleStepTransfer = $('#cti-button-single-step-transfer')
            .kendoButton({
                icon: 'c-people',
                enabled: false,
                click: ctiBtnAct.singleStepTransfer
            }).data("kendoButton");

        this.ctiButtonSnarl = $('#cti-button-snarl')
            .kendoButton({
                icon: 'c-shield-exclamation',
                enabled: false,
                click: ctiBtnAct.snarl
            }).data("kendoButton");

        $('#soft-phone').show();
        let snarl = this.ctiValue.reason.find(r => r.code === 'snarl');
        this.snarlPopover = $(`#${snarl.popover.id}`).kendoPopover({
            showOn: "click",
            width: 307,
            position: 'bottom',
            body: function () {
                return snarl.popover.acr
                    .reduce((a, b) => {
                        return `${a}
                           <p role="button" style="font-size: 1em;
                                                    line-height: 1.2;
                                                    padding: 5px;
                                                    width: 90px;
                                                    text-align: left;
                                                    box-sizing: border-box;
                                                    background-color: #F0EDCC;
                                                    color: #02343F;
                                                    margin: 0;
                                                    z-index: 999999;" 
                           onclick="${b.click}"
                           class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-sm k-rounded-sm">
                           <i class="${b.icon}"></i>
                            ${b.text}
                        </p>
                       `;
                    }, '')
            }
        }).data('kendoPopover');

        let ctiValue = this.ctiValue;
        this.ctiStatusPopover = $ctiStatus.kendoPopover({
            showOn: "click",
            width: 202,
            position: 'bottom',
            body: function () {
                return ctiValue.reason
                    .filter(e => e.type === 'agentStatus' &&e.code != "afterCall" )
                    .reduce((a, b) => {
                        return `${a}
                           <p role="button" style="font-size: 1em;
                                                    line-height: 1.2;
                                                    padding: 5px;
                                                    width: 80px;
                                                    text-align: left;
                                                    box-sizing: border-box;
                                                    background-color: #F0EDCC;
                                                    color: #02343F;
                                                    margin: 1px 2px;
                                                    z-index: 999999;" 
                           onclick="softPhoneObject.setStatus('${b.code}');softPhoneObject.popoverClose();"
                           class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-sm k-rounded-sm">
                           <i class="${b.icon}"></i>
                            ${b.stataName}
                        </p>
                       `;
                    }, '')
            },
            show: function (e) {
                let text = softPhoneObject.getStatusText();
                let r = softPhoneObject.ctiValue.reason.find(e => e.stataName === text)
                if (!r.isAgentStatus)e.sender.hide();
            }
        }).data('kendoPopover');

        let initStatus = this.ctiValue.reason.find(r => r.initStatus);
        this.setStatus(initStatus.code);

        //this.ctiTimer = $("#cti-timer").kendoBadge({
        //    //themeColor: 'success',
        //    text: '00:00:00',
        //    size: 'large',
        //    fill: 'outline'
        //}).data("kendoBadge");

        this.ctiReport = $("#cti-report").kendoBadge({
            template :`<div style="font-size: 20px;display:inline-flex">
                            <div id="cti-timer" style="margin-right: 15px;">00:00:00</div>
                            <div id="cti-wait-customer" title="대기고객수" style="display: inline-flex;align-items: center;">
                                <span class="k-icon k-i-c-people-fill" style="margin-right: 2px;font-size: 18px;"></span>
                                <span id="cti-wait-custCnt">00</span>
                            </div>
                            <div style="width: 5px;"></div>
                            <div id="cti-wait-agent" title="대기상담원" style="display: inline-flex;align-items: center;">
                                <span class="k-icon k-i-c-headset"  style="margin-right: 2px;font-size: 18px;"></span>
                                <span id="cti-wait-agentCnt">00</span>
                            </div>
                        </div>`,
            size: 'large',
            fillMode: 'outline'
        }).data("kendoBadge");

        this.ctiWaitCust  = $("#cti-wait-custCnt");
        this.ctiWaitAgent = $("#cti-wait-agentCnt");
        try{
            clientDb.version(1).stores({
                ctilog: "++id, data, date, type, event"
            });
            console.log("clientDb open and create");
            clientDb.open();
            ctiLogView.deleteLog();
        }catch (e){
            console.log("clientDb open failed >>" + e.message);
        }
    }

    popoverClose() {
        this.ctiStatusPopover.hide();
    }

    setStatus(type) {
        let result = this.ctiValue.reason.find(r => r.code === type);

        if(result.type == "agentStatus"){
            if(result.code != "afterCall"){
                ipron.SetAgentState(USER_INFO.ctiStation,USER_INFO.ctiId,3,result.ctiSubCode,0);
            }else{
                ipron.SetAgentState(USER_INFO.ctiStation,USER_INFO.ctiId,6,0,0);
            }
        }else if(result.type == "callStatus"){
            if(result.code == "makeCall"){
                let boundTelNo = this.prefix+$("#cti-phone-number").data("kendoCpTextBox").value().replaceAll("-","");
                ipron.MakeCall(USER_INFO.ctiStation,boundTelNo,"",0,0, 0);
            }else if(result.code == "clearCall"){
                ipron.ClearCall(USER_INFO.ctiStation,callData.connectionid,0);
            }else if(result.code == "holding"){
                ipron.HoldCall(USER_INFO.ctiStation,callData.connectionid,0);
            }else if(result.code == "retrieve"){
                ipron.RetrieveCall(USER_INFO.ctiStation,callData.connectionid,0);
            }else if(result.code == "answerCall"){
                ipron.AnswerCall(USER_INFO.ctiStation,callData.connectionid,0);
            }
        }
        if (result.isCallStatus) {
            if(result.buttons != undefined)this.setButton(result.buttons);
            this.setStatusText(result.stataName);
            if(!this.isCalling)this.timeCount();
        }
    }

    setStatusText(text) {
        this.ctiStatus.text(text);
    }

    getStatusText() {
        return this.ctiStatus.text();
    }

    timeCount(start = true) {
        this.statusTime = 0;
        if (start && typeof (Worker) !== "undefined") {
            if (!this.timer) {
                this.timer = new Worker('/js/common/timer.js');
                this.timer.postMessage(1000);
                this.timer.onmessage = () => {
                    if (this.waitCall) {
                        this.waitTime++;
                    } else {
                        this.statusTime++;
                    }
                    $('#cti-timer').text((this.waitCall ? this.waitTime : this.statusTime).toString().toHHMMSS());
                }
            }

        } else {
            if (start && !this.timer) {
                this.timer = setInterval(() => {
                    if (this.waitCall) this.waitTime++;
                    else this.statusTime++;

                    $('#cti-timer').text((this.waitCall ? this.waitTime : this.statusTime).toString().toHHMMSS());
                }, 1000);
            } else if (!this.timer) {
                clearInterval(this.timer);
            }
        }
    }

    isWait(is = false) {
        if (is) this.waitTime = 0;
        this.waitCall = is;
    }

    setButton(buttons) {
        this.ctiButtonMakeCall.enable(buttons.makeCall)
        this.ctiButtonAnswerCall.enable(buttons.answerCall)
        this.ctiButtonClearCall.enable(buttons.clearCall)
        this.ctiButtonWait.enable(buttons.wait)
        this.ctiButtonHold.enable(buttons.hold)
        this.ctiButtonRetrieveCall.enable(buttons.retrieveCall)
        this.ctiButtonSingleStepTransfer.enable(buttons.singleStepTransfer)
        this.ctiButtonSnarl.enable(buttons.snarl)
    }
    setDisableButton() {
        $('.cp-cti-phone-number').hide();
        $('#cti-phone-number').hide();
        $('#soft-phone').hide();
        $('#agent-status-bar').hide();
        $('#cti-timer').hide();
        $('#cti-report').hide();
    }

    setTenantCtiReport (data) {
        this.ctiWaitCust.text(leadingZeros(data.waitingcalls , 3));
        this.ctiWaitAgent.text(leadingZeros(data.readyagentcount , 2));
    }

    setCtiReportInterval () {
        setInterval(() =>{ipron.TenantReport(tenantName)},5000);
    }

}

const ctiBtnAct = {
    makeCall: (e) => {
        if(ctiBtnAct.isMakeCall()){
            let telNo = $("#cti-phone-number").data("kendoCpTextBox").value();
            if(telNo != "" && telNo.length > 3){
                ctiBtnAct.setCallStatus(e);
            }
        }
    },
    outBoundSendTel:(telNo) =>{
        if(ctiBtnAct.isMakeCall()) {
            ctiBtnAct.isOpenMainConsult();
            $("#cti-phone-number").data("kendoCpTextBox").value(telNo.formatterHpNo());
            softPhoneObject.setStatus("makeCall");
        }
    },
    campaignSendTel: (telNo, boundFcampaignId, boundFcampaignCustId) => {
        if(ctiBtnAct.isMakeCall()) {
            ctiBtnAct.isOpenMainConsult();
            $("#cti-phone-number").data("kendoCpTextBox").value(telNo.formatterHpNo());
            $("#callBoundF").find("#boundFcampaignId").val(boundFcampaignId);
            $("#callBoundF").find("#boundFcampaignCustId").val(boundFcampaignCustId);
            softPhoneObject.setStatus("makeCall");
        }
    },
    revSendTel:(telNo, reservationBoundId, reservationCallId) => {
        if(ctiBtnAct.isMakeCall()) {
            ctiBtnAct.isOpenMainConsult();
            $("#cti-phone-number").data("kendoCpTextBox").value(telNo.formatterHpNo());
            $("#callBoundF").find("#boundFreservationBoundId").val(reservationBoundId);
            $("#callBoundF").find("#boundFreservationCallId").val(reservationCallId);
            softPhoneObject.setStatus("makeCall");
        }
    },
    callbackSendTel: (telNo, boundFCallbackId) => {
        if(ctiBtnAct.isMakeCall()) {
            ctiBtnAct.isOpenMainConsult();
            $("#cti-phone-number").data("kendoCpTextBox").value(telNo.formatterHpNo());
            $("#callBoundF").find("#boundFcallbackId").val(boundFCallbackId);
            softPhoneObject.setStatus("makeCall");
        }
    },
    transferSendTel: (telNo, custDiv, boundFtransferCallId, boundFtransferBoundId) => {
        if(ctiBtnAct.isMakeCall()) {
            ctiBtnAct.isOpenMainConsult();
            $("#cti-phone-number").data("kendoCpTextBox").value(telNo.formatterHpNo());
            softPhoneObject.setStatus("makeCall");
        }
    },
    answerCall: (e) => {
        ctiBtnAct.setCallStatus(e);
    },
    clearCall: (e) => {
        ctiBtnAct.setCallStatus(e);
    },
    hold: (e) => {
        ctiBtnAct.setCallStatus(e);
    },
    ready: (e) => {
        ipron.SetAgentState(USER_INFO.ctiStation,USER_INFO.ctiId,4,0,0);
        ctiBtnAct.setCallStatus(e);
    },
    retrieveCall: (e) => {
        ctiBtnAct.setCallStatus(e);
    },
    singleStepTransfer: (e) => {
        $("#consult-callType").data("kendoRadioGroup").value("CallTransfer");
        $("#consult-callType").data("kendoRadioGroup").trigger("change")
        let opt = {
            height : 600,
            width : 1240,
            top : 200,
            left : 200,
        };
        new popupWindow('/transferList?consult=Y',"transfer",opt).open()
        consultMain.callTypeObjectReset();
    },
    snarl: () => {
        softPhoneObject.snarlPopover.show();
    },
    setCallStatus(e) {
        let data = e.sender.options?.customData;
        if (data) softPhoneObject.setStatus(data.code);
    },
    isOpenMainConsult : ()=>{
        $("#drawer-content").data('kendoDrawer').addContents(MENU_ARRAY.find(menu => menu.programId === 250));
        let callmain = $("#menu-250");
        if(callmain.length > 0) callmain.find(".k-icon").removeClass("k-i-c-grid").addClass("k-i-c-grid-fill cp-open-color");
    },
    isMakeCall: () => {
        if(softPhoneObject.agentState) {
            if(softPhoneObject.agentState.agentstate == 3 && !softPhoneObject.isCalling){
                return true;
            }else{
                message.notification({msg:"CTI 상태를 확인하세요.",type:"error"});
                return false;
            }
        }else {
            message.notification({msg:"CTI 연결을 확인하세요.",type:"error"});
            return false;
        }
    }
}
let bReconnect = false;
let boundCallType = "Out";

let callData;
let transferCallData;
let conferenceCallData;
let subCode;
let scenarioThirdPartyDn;
let arsInputId;
let arsButtonId;
const cp_cti_func_event =async (data)=>{
    let transferWin = OPEN_POPUPS.find(r => r.pageNm === "transfer");
    clientDb.transaction("rw", clientDb.ctilog, function* () {
        yield clientDb.ctilog.add({
            data:data,
            date:kendo.toString(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            type:"event",
            event:data.method
        });
    });
    switch (data.method) {
        case ipron.APIEvent.OPENSRVSUCCESS:
            break;
        case ipron.APIEvent.INITIATED: // initiated
            break;
        case ipron.APIEvent.RINGING:
            // 통화 인입 event
            softPhoneObject.setStatus("ringing"); // 상담사 상태 콜인입 으로 변경
            boundCallType = "In";                 // 바운드타입 설정
            callData = data;                       // 인입 콜 data 저장 통화끊기시 connetionid 필요 하여 맵핑
            ctiBtnAct.isOpenMainConsult();        // 상담메인페이지 호출
            softPhoneObject.isCalling = true;     // 통화중 플래그 설정
            $("#cti-phone-number").data("kendoCpTextBox").value(data.ani.formatterHpNo());
            inboundWindowOpen(data);              // 인입전화 kendoWindo 오픈
            break;
        case ipron.APIEvent.ESTABLISHED:
            // 통화 연결 event
            if(data.reason != 70) {
                if (!softPhoneObject.transferFlag && !softPhoneObject.conferenceFlag) {       // 호전환 , 3자통화 플래그 확인
                    let nowState = softPhoneObject.getStatusText();
                    if(nowState != "상담중" && nowState != "보류" ){
                        callData = data;                                                        // 콜 연결시 data 저장
                        try{
                            setVeloceUserInfo();                                                    // 벨로체 userinfoupdate
                            await setEstablishedCallData(data);                                     // 연결된 콜 정보 topBoundF 에 셋팅
                            boundIns().then(() => {});           // topBoundF 에 셋팅후 boundIns 프로시져 호출
                            softPhoneObject.setStatus("calling");
                        }catch (e) {
                            message.notification({msg:e,type:"error"});
                            softPhoneObject.setStatus("calling");
                        }
                    }
                    if(transferWin){
                        transferWin.$("#transfer-refresh").trigger("click");
                    }
                }
            }
            break;
        case ipron.APIEvent.RELEASED:
            // 통화 종료 event
            if(callData.connectionid == data.connectionid){                             // 종료된 통화의 id가 고객콜일경우
                if(softPhoneObject.transferFlag){
                    if(callData.callid == data.callid){                     // 호전환중 고객이 전화를 끊었을떄
                        softPhoneObject.setStatus("calling");
                        message.callBackAlert({msg:"보류중인 고객이 통화를 종료 하였습니다."});
                    }
                    callData = transferCallData;                                        // 호전환시도 중 고객이 종료할경우 transferCallData 가 원콜 정보로 덮힘
                    softPhoneObject.transferFlag = false;                               // 원콜 정보로 저장되면서 플래그 회수
                }else if (softPhoneObject.conferenceFlag) {
                    if(callData.callid != data.callid && conferenceCallData.callid != data.callid){
                        ipron.ClearCall(USER_INFO.ctiStation,data.connectionid,0);          // 3자통화 통화종료
                        softPhoneObject.conferenceFlag = false;                             // 원콜 정보로 저장되면서 플래그 회수
                        setReleasedCallData(data);
                        boundUpt();
                        softPhoneObject.isCalling = false;                                  // 통화중 플래그 회수
                        softPhoneObject.setStatus("afterCall");
                    }else if(callData.callid == data.callid){
                        softPhoneObject.setStatus("calling");
                        message.callBackAlert({msg:"보류중인 고객이 통화를 종료 하였습니다."});
                        callData = conferenceCallData;
                        softPhoneObject.conferenceFlag = false;                               // 원콜 정보로 저장되면서 플래그 회수
                    }
                }else{
                    setReleasedCallData(data);                                          // 호전환 시도가 아닌경우 통화 종료시간 설정
                    if($("#main-cti-window").data("kendoWindow") != undefined){
                        $("#main-cti-window").data("kendoWindow").close();              // 콜 인입중 전화 종료시 인입정보kendoWindow 닫힘
                    }
                    boundUpt();
                    softPhoneObject.isCalling = false;                                  // 통화중 플래그 회수
                    softPhoneObject.setStatus("afterCall");                             // 후처리로 상태 변경
                }
            }else if(transferCallData && transferCallData.callid == data.callid){
                softPhoneObject.transferFlag = false;                               // 플래그 회수
            }else if(conferenceCallData && conferenceCallData.callid == data.callid){
                softPhoneObject.conferenceFlag = false;                             // 플래그 회수
            }
            if(transferWin){
                transferWin.$("#transfer-refresh").trigger("click");
            }
            break;
        case ipron.APIEvent.DIALING: // dialing
            // 통화 걸기 event
            if(softPhoneObject.transferFlag) transferCallData = data;                   // 아웃바운드 다이얼링 시작시 호전환 플래그 있으면 끊기를 위한 data 저장
            else if(softPhoneObject.conferenceFlag) conferenceCallData = data;          // 아웃바운드 다이얼링 시작시 3자통화 플래그 있으면 끊기를 위한 data 저장
            else {
                boundCallType = "Out";
                callData= data;                                                        // 아웃바운드 다이얼링 시작시 끊기를 위한 data 저장
                softPhoneObject.isCalling = true;                                           // 통화중 플래그 저장
                ctiBtnAct.isOpenMainConsult();                                              // 상담메인화면 호출
            }
            break;
        case ipron.APIEvent.ABANDONED: // abandoned
            break;
        case ipron.APIEvent.DESTBUSY: // dest busy
            break;
        case ipron.APIEvent.HELD: // held
            if(data.result == 1){
                softPhoneObject.setStatus("holding");
            }
            // 통화 보류 event
            break;
        case ipron.APIEvent.RETRIEVED: // retrieved
            // 통화 보류해제 event
            softPhoneObject.setStatus("calling"); // 상담중 상태로 다시 변경 cti 상태 x
            break;
        case ipron.APIEvent.PARTYADDED: // party added
            // 3자 통화 시작 event
            if(softPhoneObject.scenarioCallFlag){
                scenarioThirdPartyDn = data.thirdpartydn;
            }
            softPhoneObject.setStatus("calling") // 상담중 상태로 다시 변경 cti 상태 x
            break;
        case ipron.APIEvent.PARTYCHANGED: // party changed
            break;
        case ipron.APIEvent.PARTYDELETED: // party deleted
            // 3자 통화 종료 event
            if(softPhoneObject.conferenceFlag) {
                softPhoneObject.conferenceFlag = false;
                if(transferWin){
                    transferWin.$("#transfer-refresh").trigger("click");
                }
            }else if(softPhoneObject.scenarioCallFlag){
                softPhoneObject.scenarioCallFlag = false;
                if(scenarioThirdPartyDn == data.otherdn) {
                    //같으면 정상
                    let ars = data.extensiondata.UEI3[0];//getExtensionValue(data.extensiondata,"UEI3") // ars 입력값 받아옴
                    let administPop = OPEN_POPUPS.find(r => r.pageNm === "CONSULT_ADMINIST");
                    administPop.$(arsInputId).val(ars);
                    administPop.$(arsButtonId).trigger("click");
                    arsInputId = "";
                    arsButtonId = "";
                }else{
                    softPhoneObject.setStatus("clearCall")
                }
            }
            break;
        case ipron.APIEvent.QUEUED: // queued
            break;
        case ipron.APIEvent.DIVERTED: // diverted
            softPhoneObject.setStatus("rest");
            if($("#main-cti-window").data("kendoWindow") != undefined){
                $("#main-cti-window").data("kendoWindow").close();              // 콜 인입중 전화 종료시 인입정보kendoWindow 닫힘
                message.callBackAlert({msg:"인입된 전화가 있습니다."});
            }
            break;
        case ipron.APIEvent.ACDAGENT_LOGGEDON: // acd Login
            break;
        case ipron.APIEvent.ACDAGENT_LOGGEDOFF: // acd Logout
            break;
        case ipron.APIEvent.ACDAGENT_NOTREADY: // acd NotReady
            break;
        case ipron.APIEvent.ACDAGENT_READY: // acd Ready
            break;
        case ipron.APIEvent.ACDAGENT_WORKAFTCALL: // acd AFTCall
            break;
        case ipron.APIEvent.AGENTLOGIN: // agent login
            break;
        case ipron.APIEvent.AGENTLOGOUT: // agent logout
            break;
        case ipron.APIEvent.AGENTREADY: // agent ready
            break;
        case ipron.APIEvent.AGENTNOTREADY: // agent not ready
            break;
        case ipron.APIEvent.AGENTACW: // agent acw
            break;
        case ipron.APIEvent.REGISTERED: // registered
            break;
        case ipron.APIEvent.UNREGISTERED: // unregistered
            break;
        case ipron.APIEvent.UPDATE_USERDATA: // update userdata
            break;
        case ipron.APIEvent.USEREVENT: // user event
            break;
        case ipron.APIEvent.BANISHMENT: // banishment
            break;
        case ipron.APIEvent.LINKCONNECTED: // LINKCONNECTED
            break;
        case ipron.APIEvent.LINKDISCONNECTED: //
            break;
        case ipron.APIEvent.CTIDISCONNECTED:
            break;
        case ipron.APIEvent.RETRY_CONNECT:
            break;
        case ipron.APIEvent.RETRY_CONN_SUC:
            break;
        case ipron.APIEvent.RETRY_CONN_FAIL:
            break;
        default:
            break;
    }
    // 재접속 관련...
    switch (data.method) {
        case ipron.WebEvent.ERR_DISCONNECT:
            bReconnect = true;
            ipron.OpenServer(ctiAppName, cp_cti_func_event, cp_cti_response);
            break;
        case ipron.WebEvent.ERR_OPENSERVER:
            message.callBackAlert({msg:"CTI 서버 접속에 실패하였습니다."});
            if (bReconnect) {
                ipron.OpenServer(ctiAppName, cp_cti_func_event, cp_cti_response);
                break;
            }
    }
    if (data.extensionhandle > 0) {             // 서브 데이터 있을시 실행
        subCode =data.extensiondata
    }
}
const cp_cti_response = (data)=>{
    let transferWin = OPEN_POPUPS.find(r => r.pageNm === "transfer");                               // 호전환 완료시 담당자찾기 팝업 종료
    if(data.method != 4039 && data.method != "tenantreport"){
        clientDb.transaction("rw", clientDb.ctilog, function* () {
            yield clientDb.ctilog.add({
                data:data,
                date:kendo.toString(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                type:"response",
                event:data.messagetype
            });
        });
    }
    switch (data.messagetype) {
        case ipron.MsgType.AjaxResponse:
            if (data.method == ipron.Request.OpenServer) {
                if (data.result == ipron.JSONValue.True) {                              // 오픈서버 event 성공시 설정
                    bReconnect = false;
                    ipron.Register(USER_INFO.ctiStation,tenantName,9,0);                // 오픈서버 이후 register 등록
                }
                else {
                    if (bReconnect) {                                                   // 오픈서버 실패시 재시도
                        setTimeout('ipron.OpenServer(ctiAppName, cp_cti_func_event, cp_cti_response)', 3000);
                        break;
                    }
                }
            }
            break;
        case ipron.MsgType.ICResponse:
            switch (data.method) {
                case ipron.APIMethod.INSTANT_MSG_ARRIVED:
                    break;
                case ipron.APIMethod.REGIADDR_RES: // register
                    if(data.result == 1) ipron.SeqAgentLogin(USER_INFO.ctiStation,0, USER_INFO.ctiId, USER_INFO.ctiPwd, tenantName, 3, 3, ctiShaType, 0);     // register 등록 성공시 로그인계정으로 CTI 로그인
                    else if(data.result == 0) {
                        message.callBackAlert({msg:"CTI 서버 접속에 실패하였습니다."});
                    }
                    break;
                case ipron.APIMethod.UNREGIADDR_RES: // unregister
                    if(data.result == 1)ipron.CloseServer()                                                                                             // unregister 성공후 서버 close
                    break;
                case ipron.APIMethod.GROUP_REGIADDR_RES: // groupregister
                    break;
                case ipron.APIMethod.GROUP_UNREGIADDR_RES: // groupunregister
                    break;
                case ipron.APIMethod.MAKECALL_RES: // make call
                    break;
                case ipron.APIMethod.ANSWERCALL_RES: // Answer Call
                    break;
                case ipron.APIMethod.CLEARCALL_RES: // clear call
                    break;
                case ipron.APIMethod.HOLDCALL_RES: // hold call
                    break;
                case ipron.APIMethod.RETRIEVECALL_RES: // retrieve call
                    break;
                case ipron.APIMethod.JOINCALL_RES: // join call
                    break;
                case ipron.APIMethod.GRPICKUP_RES: // group pickup
                    break;
                case ipron.APIMethod.SINGLESTEP_TRANSFER_RES: // singlestep transfer
                    if(data.result == 0) {
                        softPhoneObject.setStatus("calling");
                    }
                    if(transferWin){
                        transferWin.$("#transfer-refresh").trigger("click");
                    }
                    break;
                case ipron.APIMethod.MUTE_TRANSFER_RES: // mute transfer
                    if(data.result == 1){
                        softPhoneObject.transferFlag = false;
                        if(transferWin){
                            transferWin.$("#transfer-refresh").trigger("click");
                        }
                    }
                    break;
                case ipron.APIMethod.SINGLESTEP_CONFERENCE_RES: // singlestep conference
                    break;
                case ipron.APIMethod.CONFERENCE_RES: // mute conference call
                    if(data.result == 1){
                        if(transferWin)transferWin.close();
                    }else{
                        softPhoneObject.conferenceFlag = false;
                        if(transferWin){
                            transferWin.$("#transfer-refresh").trigger("click");
                        }
                    }
                    break;
                case ipron.APIMethod.DEFLECTCALL_RES: // deflect call
                    if(data.result == 1) softPhoneObject.setStatus("afterCall");                                        // 통화 거부 후처리로 상태 변경
                    break;
                case ipron.APIMethod.GETCONNECTION_RES: // get connection
                    break;
                case ipron.APIMethod.AGENTLOGIN_RES: // agent login
                    break;
                case ipron.APIMethod.AGENTLOGOUT_RES: // agent logout
                    if(data.result == 1)ipron.Unregister(USER_INFO.ctiStation,tenantName);                              // 상담사 로그아웃 성공시 unregister 실행
                    break;
                case ipron.APIMethod.GETSTATE_SUBCODE_RES: // get state sub code
                    break;
                case ipron.APIMethod.GETROUTEABLE_RES: // get routeable
                    break;
                case ipron.APIMethod.UPDATE_USERDATA_RES: // update userdata
                    break;
                case ipron.APIMethod.DELETE_KEY_USERDATA_RES: // delete key userdata
                    break;
                case ipron.APIMethod.DELETE_ALL_USERDATA_RES: // delete all userdata
                    break;
                case ipron.APIMethod.SEND_USEREVENT_RES: // send user event
                    break;
                case ipron.APIMethod.GET_USERDATA_RES: // get userdata
                    break;
                case ipron.APIMethod.GETCONNSTATE_RES: // get conn state
                    break;
                case ipron.APIMethod.SET_ANI_USERDATA_RES: // set ani userdata
                    break;
                case ipron.APIMethod.SETAGENTSTATE_RES: // set agent state
                    softPhoneObject.agentState = data;
                    let text = softPhoneObject.getStatusText();
                    let result;
                    if(data.result == 1){
                        if (data.agentstate == 3) {   // 이석상태
                            if(data.agentstatesub == 1){
                                result = softPhoneObject.ctiValue.reason.find(r => r.code === "rest");
                            }else if(data.agentstatesub == 2){
                                result = softPhoneObject.ctiValue.reason.find(r => r.code === "education");
                            }else if(data.agentstatesub == 3){
                                result = softPhoneObject.ctiValue.reason.find(r => r.code === "work");
                            }else if(data.agentstatesub == 4){
                                result = softPhoneObject.ctiValue.reason.find(r => r.code === "eat");
                            }
                        }else if(data.agentstate == 4){ // 레디
                            result = softPhoneObject.ctiValue.reason.find(r => r.code === "wait");
                        }else if(data.agentstate == 6){ //후처리
                            result = softPhoneObject.ctiValue.reason.find(r => r.code === "afterCall");
                        }
                        if (result.isSetStatus) {
                            if(result.buttons != undefined)softPhoneObject.setButton(result.buttons);
                            softPhoneObject.setStatusText(result.stataName);
                            if(!softPhoneObject.isCalling)softPhoneObject.timeCount();
                            if(text == "후처리")$("#cti-phone-number").data("kendoCpTextBox").value("");
                        }
                    }else if(data.result == 0){
                        message.notification({msg:"상태변경중 오류가 발생하였습니다.<br>잠시후 다시 시도해주세요."+ "( " + data.reason +" )" ,type:"error"} )
                    }
                    break;
                case ipron.APIMethod.GETAGENTSTATE_RES: // get agent state
                    break;
                case ipron.APIMethod.SETAFTCALLSTATE_RES: // set aft state
                    break;
                case ipron.APIMethod.SETSKILL_ENABLE_RES: // set skill enable
                    break;
                case ipron.APIMethod.FORCE_SETAGTSTATE_RES: // force set agent state
                    break;
                case ipron.APIMethod.GETGROUPLIST_RES: // get group list
                    break;
                case ipron.APIMethod.GETQUEUELIST_RES: // get queue list
                    break;
                case ipron.APIMethod.GETAGENTLIST_RES: // get agent list
                    break;
                case ipron.APIMethod.GETAGENTINFO_RES: // get agent info
                    break;
                case ipron.APIMethod.GETAGENT_SKILLLIST_RES: // get agent skill list
                    break;
                case ipron.APIMethod.GETAGENT_QUEUELIST_RES: // get agent queue list
                    break;
                case ipron.APIMethod.GETQUEUETRAFFIC_RES: // get queue traffic
                    break;
                case ipron.APIMethod.GETQUEUEORDER_RES: // get queue order
                    break;
                case ipron.APIMethod.AGENT_REPORT_RES: // agent report
                    setAgentCtiReport(data);
                    break;
                case ipron.APIMethod.GROUP_REPORT_RES: // group report
                    break;
                case ipron.APIMethod.TENANT_REPORT_RES: // tenant report
                    softPhoneObject.setTenantCtiReport(data);
                    break;
                case ipron.APIMethod.DNIS_REPORT_RES: // dnis report
                    break;
                case ipron.APIMethod.GETAGENTLIST_EX_RES: // get agent list ex
                    break;
                case ipron.APIMethod.SET_ACDAGENT_STATE_RES: // set acd agent state
                    break;
                case ipron.APIMethod.GET_ACDAGENT_STATE_RES: // get acd agent state
                    break;
                case ipron.APIMethod.INSTANT_MSGSEND_RES:
                    break;
                case ipron.APIMethod.CHANGEPASSWORD_RES:
                    break;
                case ipron.APIMethod.GET_AGENTGROUP_LIST_RES:
                    break;
                case ipron.APIMethod.GETQUEUE_TRAFFICEX_RES:
                    break;
                case ipron.APIMethod.AGENTLOGINEX_RES:
                    break;
                case ipron.APIMethod.CHANGEPASSWORDEX_RES:
                    break;
                case ipron.APIMethod.AGENTREPORTV3_RES:
                    break;
                case ipron.APIMethod.GROUPREPORTV3_RES:
                    break;
                case ipron.APIMethod.QUEUEREPORTV3_RES:
                    break;
                case ipron.APIMethod.SKILLREPORTV3_RES:
                    break;
                case ipron.APIMethod.TENANTREPORTV3_RES:
                    break;
                case ipron.APIMethod.GROUPREPORTV4_RES:
                    break;
                case ipron.APIMethod.QUEUEREPORTV4_RES:
                    break;
                case ipron.APIMethod.SKILLREPORTV4_RES:
                    break;
                case ipron.APIMethod.TENANTREPORTV4_RES:
                    break;
                case ipron.APIMethod.GROUPREPORTV5_RES:
                    break;
                case ipron.APIMethod.QUEUEREPORTV5_RES:
                    break;
                case ipron.APIMethod.SKILLREPORTV5_RES:
                    break;
                case ipron.APIMethod.TENANTREPORTV5_RES:
                    break;
                case ipron.APIMethod.SEQ_AGENTLOGIN_RES:
                    if(data.result == 1){
                        softPhoneObject.setCtiReportInterval();
                        softPhoneObject.connectServer();
                    }else if(data.result == 0){
                        message.callBackAlert({msg:"CTI 로그인을 실패하였습니다."});
                    }
                    break;
                case ipron.APIMethod.SEQ_CHANGEPASSWORD_RES:
                    break;
            }
            break;
        default:
            break;
    }

    if (data.extensionhandle > 0){
    };

}
const inboundWindowOpen = (data) =>{
    // 콜인입시 인입전화 정보 보여주는 kendowindow open
    if($("#main-cti-window").data("kendoWindow") == undefined){
        let $div = $(`<div id="main-cti-window"></div>`);
        $div.kendoWindow({
            width:270,
            height:195,
            position : {
                top : "30%",
                left:"40%"
            },
            actions : ["close"],
            title : "전화받기",
            visible : false,
            modal : true,
            draggable: false,
            animation: {
                open: {effects: "fade:in"},
                close: {effects: "fade:out"}
            },
            resizable: false,
            autoFocus:false,
            content : {
                template :`<div class="c-table" style="width:100%;text-align: center">
            <div style="font-size:25px;font-weight: bold;">${data.ani.formatterHpNo()}</div>
            <div style="text-align: center;margin-top: 30px">
                <button id="main-cti-answerCall" style="width: 50%">받기</button>
                <button id="main-cti-deflectCall" style="width: 35%;margin-left: 5px;display: none;">끊기</button>
            </div>
        </div>`
            },
            open : (e) =>{
                // $("#main-cti-inbound-telno").kendoTextBox({fillMode :"flat",readonly:true,value:})
                $("#main-cti-answerCall").kendoButton({
                    themeColor:"primary",
                    enabled: true,
                    customData: softPhoneObject.ctiValue.reason.find(e => e.code === 'answerCall'),
                    click : ()=>{
                        $("#main-cti-window").data("kendoWindow").close();
                        ipron.AnswerCall(USER_INFO.ctiStation,data.connectionid,0);
                    }
                }).data("kendoButton");
                $("#main-cti-deflectCall").kendoButton({
                    enabled: true,
                    click : ()=>{
                        $("#main-cti-window").data("kendoWindow").close();
                        if(subCode && boundCallType === "In"){
                            ipron.QueueDeflectCall(USER_INFO.ctiStation,callData.connectionid,subCode.UEI8[0],0,0,0,0);
                        }
                    }
                }).data("kendoButton");
                setTimeout(()=>{
                    e.sender.wrapper.find('#main-cti-answerCall').trigger('focus');
                },50)
            },
            close : (e) =>{
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();
    }
}
const setEstablishedCallData = (data)=>{
    // 통화 연결시 top callBound 정보 저장
    let callBoundF = $("#callBoundF");
    callBoundF.find("#boundFctiCallId").val(data.callid);
    callBoundF.find("#boundFconnId").val(data.connectionid);
    callBoundF.find("#boundFctiStation").val(data.thisdn);
    callBoundF.find("#boundFrecordingId").val(kendo.toString(new Date(), 'yyyyMMdd')+"_"+data.connectionid+"_"+USER_INFO.ctiStation);
    callBoundF.find("#boundFdnis").val(data.thisdn);
    callBoundF.find("#boundFcallStartDt").val(data.datetime);
    callBoundF.find("#boundFboundType").val(boundCallType);
    if(boundCallType == "In"){
        callBoundF.find("#boundFboundTelNo").val(data.ani);
        consultCustomerInfo.customerFindTelNo(data.ani).then(()=>{
            $("#consult-boundTel-number").val(data.ani.formatterHpNo());
        });
        setLastNumber(data.ani);
    }else{
        callBoundF.find("#boundFboundTelNo").val(data.dnis);
        consultCustomerInfo.customerFindTelNo(data.dnis).then(()=>{
            $("#consult-boundTel-number").val(data.dnis.formatterHpNo());
        });
        setLastNumber(data.dnis);
    }
}
const setLastNumber = (phoneNumber)=>{
    let lastNumbers = JSON.parse(localStorage.getItem("LAST_NUMBER"));
    if(lastNumbers.length < 10){
        lastNumbers.push({callType:boundCallType,telNo:phoneNumber});
        localStorage.setItem("LAST_NUMBER",JSON.stringify(lastNumbers));
    }else{
        lastNumbers = lastNumbers.slice(1);
        lastNumbers.push({callType:boundCallType,telNo:phoneNumber});
        localStorage.setItem("LAST_NUMBER",JSON.stringify(lastNumbers));
    }
    softPhoneObject.ctiPhoneNumber.setDataSource(lastNumbers);
}
const setReleasedCallData = (data)=>{
    // 통화 종료시 종료시간 저장
    let callBoundF = $("#callBoundF");
    callBoundF.find("#boundFcallEndDt").val(data.datetime);
}
const boundIns = async ()=>{
    // 통화 받은후 db boundIns 프로시져 호출
    let param = $("#callBoundF").serializeJSON();

    await $.ajax({
        url: "consult/v1/consult/bound-insert",
        type: METHOD.POST,
        dataType:"json",
        contentType : 'application/json; charset=utf-8',
        data:JSON.stringify(param),
        success : (res) =>{
            $("#callBoundF").find("#boundFboundId").val(res.data);
        }
    });
}

const boundUpt =  ()=>{
    // 통화 받은후 db boundIns 프로시져 호출
    let callBoundF = $("#callBoundF");
    if(!(callBoundF.find("#boundFboundId").val() === "" || callBoundF.find("#boundFboundId").val() == 0)) {
        let param = {
            boundId: callBoundF.find("#boundFboundId").val(),
            ctiStation: callBoundF.find("#boundFctiStation").val(),
            callDt: callBoundF.find("#boundFcallStartDt").val(),
            closeCallDt: callBoundF.find("#boundFcallEndDt").val()
        };

        $.ajax({
            url: "consult/v1/consult/bound-update",
            type: METHOD.POST,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(param),
            success: (res) => {
            }
        });
    }
}

const getExtensionValue =  (extension, key) =>{
    if (extension <= 0) {
        return;
    }
    let i = 0, j = 0, nRecord = 0, nField = 0;
    let strKey, strValue;

    nRecord = ipron.EXTGetRecordCount(extension);

    for (i = 0; i < nRecord; i++) {
        nField = ipron.EXTGetValueCountForRecord(extension, i);
        strKey = ipron.EXTGetKey(extension, i);

        if (strKey == key) {
            for (j = 0; j < nField; j++) {
                strValue = ipron.EXTGetValueForRecord(extension, i, j);
            }
            if (strValue == null) strValue = "";
            return strValue;
        }
    }
    return "";
}

// 폭언/욕설/성희롱 통화종료
const endScenario = (code)=> {
    message.callBackConfirm({msg:"통화종료 하시겠습니까?",callback: ()=>{
            let nExtension = ipron.EXTCreateExtension();
            ipron.EXTAddRecord(nExtension, "IVR_SEPARATOR", code); //userdata 생성
            ipron.UpdateUserdata(USER_INFO.ctiStation, USER_INFO.ctiId, callData.connectionid, nExtension); //userdata 업데이트
            ipron.SinglestepTransfer(USER_INFO.ctiStation, callData.connectionid, ivrDn, boundCallType =="Out" ? callData.dnis : callData.ani, nExtension);
        }
    });
}

const setVeloceUserInfo = () => {
    /// <summary>벨로체 유저 정보 설정</summary>
    let nExtension = ipron.EXTCreateExtension();
    ipron.EXTAddRecord(nExtension, "veloce", "2.2");
    ipron.EXTAddRecord(nExtension, "veloce", callData.connectionid);
    ipron.EXTAddRecord(nExtension, "veloce", boundCallType == "Out" ? callData.dnis : callData.ani );
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.EXTAddRecord(nExtension, "veloce", " ");
    ipron.UpdateUserdata(USER_INFO.ctiStation, USER_INFO.ctiId, callData.connectionid,nExtension);
}
const leadingZeros = (n, digits) => {
    // CTI resport 0 붙이기
    let zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

const setAgentCtiReport = (data)=>{
    // 상담사 전광판 셋팅
    $("#cti-agent-report-inSuccess").text(data.insuccess);
    $("#cti-agent-report-outSuccess").text(data.outsuccess);
    $("#cti-agent-report-callTime").text(getTimeStringSeconds(data.intalktime + data.outtalktime)); // 인바운드 아웃바운드 총 합 통화시간
    $("#cti-agent-report-readyTime").text(getTimeStringSeconds(data.readytimesum));
    $("#cti-agent-report-notReadyTime").text(getTimeStringSeconds(data.notreadytimesum));
    $("#cti-agent-report-afterCallTime").text(getTimeStringSeconds(data.acwtimesum));
}
const getTimeStringSeconds = (seconds) => {
    /// <summary>시간(초)를 시:분:초 문자열로 반환한다.</summary>
    /// <returns type="String">시:분:초 - 예) 15:12:56</returns>
    return leadingZeros(parseInt(seconds / 3600), 2) + ":" + leadingZeros(parseInt((seconds % 3600) / 60), 2)+ ":" +leadingZeros(seconds % 60, 2);
}


const singleStepConference = (inputId, buttonId)=>{
    // 행정망 주민번호입력 ARS 호출
    if(softPhoneObject.isCalling) {
        arsInputId = inputId;
        arsButtonId = buttonId;
        softPhoneObject.scenarioCallFlag =true;
        ipron.SinglestepConference(USER_INFO.ctiStation, callData.connectionid, thirdPartyDn, boundCallType == "Out" ? callData.dnis : callData.ani, 4, 0);
    }
}

// 담당자 찾기 popup 창에서 호출하기위한 func
const ctiTransferFunc = {
    singleStepTransfer: (transferCallDn) => {
        // 즉시 호전환 함수
        let nowState = softPhoneObject.getStatusText();
        if (nowState == "상담중" || nowState == "보류") {
            let destDn = transferCallDn.replaceAll("-", "").replaceAll(" ", "");
            if (destDn.length > 4) destDn = softPhoneObject.prefix + destDn;
            if (destDn != "") ipron.SinglestepTransfer(USER_INFO.ctiStation, callData.connectionid, destDn, boundCallType =="Out" ? callData.dnis : callData.ani, 0);
        }
    },
    transferConferenceFlag: (callDn,type) => {
        // 호전환시도 , 3자통화 시도 함수
        // type 에 따라 flag 설정 후 상담중이면 보류 후 makecall 이미 보류시 바로 makecall 진행
        let nowState = softPhoneObject.getStatusText();
        if(type == "transfer") softPhoneObject.transferFlag = true;
        else softPhoneObject.conferenceFlag = true;
        let destDn = callDn.replaceAll("-", "").replaceAll(" ", "");
        if (destDn.length > 4) destDn = softPhoneObject.prefix + destDn;
        if(nowState == "상담중"){
            ipron.HoldCall(USER_INFO.ctiStation,callData.connectionid,0);
            softPhoneObject.setStatus("holding");
            ipron.MakeCall(USER_INFO.ctiStation,destDn, boundCallType =="Out" ? callData.dnis : callData.ani,0,0, 0);
        }else if(nowState =="보류"){
            ipron.MakeCall(USER_INFO.ctiStation,destDn, boundCallType =="Out" ? callData.dnis : callData.ani,0,0, 0);
        }
    },
    agentTransferAgree : ()=>{
        // 협의 호전환 완료 함수 호전환 플래그 회수
        if(transferCallData && softPhoneObject.transferFlag){
            ipron.MuteTransfer(USER_INFO.ctiStation,callData.connectionid,transferCallData.dnis,0);
            softPhoneObject.transferFlag = false;
        }
    },
    agentTransferReject : ()=>{
        // 협의 호전환 전화끊기 함수 호전환 플래그 회수
        if(transferCallData && softPhoneObject.transferFlag){
            ipron.ClearCall(USER_INFO.ctiStation,transferCallData.connectionid,0); // 호전환시도로 걸었던 tarnsferCallData 통화종료
            softPhoneObject.transferFlag = false;
        }
    },
    agentConferenceAgree : ()=>{
        // 3자통화 완료 함수
        if(conferenceCallData && softPhoneObject.conferenceFlag){
            ipron.Conference(USER_INFO.ctiStation,callData.connectionid,conferenceCallData.dnis,0);
        }
    },
    agentConferenceReject : ()=>{
        // 3자통화 전화끊기 함수 플래그 회수
        if(conferenceCallData && softPhoneObject.conferenceFlag){
            ipron.ClearCall(USER_INFO.ctiStation,conferenceCallData.connectionid,0); // 호전환시도로 걸었던 conferenceCallData 통화종료
            softPhoneObject.conferenceFlag = false;
        }
    },
};

const ctiLogView = {
    findDate:(startDt , endDt)=>{
        if(startDt && endDt){
            clientDb.transaction("rw", clientDb.ctilog, function* () {
                let ctiLogs = yield clientDb.ctilog
                    .where("date")
                    .between(startDt +":00", endDt + ":59")
                    .toArray();
                ctiLogView.logPrint(ctiLogs);
            })
        }
    },
    findType : (type)=>{
        clientDb.transaction("rw", clientDb.ctilog, function* () {
            let ctiLogs = yield clientDb.ctilog
                .where("type")
                .equals(type)
                .toArray();
            ctiLogView.logPrint(ctiLogs);
        })
    },
    findEvnet : (event)=>{
        clientDb.transaction("rw", clientDb.ctilog, function* () {
            let ctiLogs = yield clientDb.ctilog
                .where("event")
                .equals(event)
                .toArray();
            ctiLogView.logPrint(ctiLogs);
        })
    },

    deleteLog : () =>{
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth()-1);
        clientDb.transaction("rw", clientDb.ctilog, function* () {
            yield clientDb.ctilog
                .where('date').below(kendo.toString(startDate , 'yyyy-MM-dd 23:59:59'))
                .delete();
        })
    },
    logPrint :(logList) =>{
        let logText = "";
        logList.forEach((log) => {
            logText += (`[ ${log.date} ] [${log.type} , ${log.event}] ${JSON.stringify(log.data)}`) + "\n\r";
        });
        console.log(logText);
    }
}

// popup창에서 opener의 함수 사용하기 위해 설정
if(!String.ctiTransferFunc)String.ctiTransferFunc = ctiTransferFunc;
if(!String.singleStepConference)String.singleStepConference = singleStepConference;