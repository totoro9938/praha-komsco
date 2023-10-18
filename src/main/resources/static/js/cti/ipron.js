(function (module, global) {

    function GetBrowser() {
        var script;
        var browser = navigator.userAgent.toLowerCase();
        if (-1 != browser.indexOf('chrome')) {
            return "chrome";
        }
        else if (-1 != browser.indexOf('msie')) {
            return "msie";
        }
        else {
            return "unknown"
        }
    }

    // function ImportJQuery(browser) {
    //     if (browser == "msie") {
    //         script = "<script src = 'js/jquery-1.11.2.min.js'></script>";
    //         script += "<script src = 'js/jquery.xdomainrequest.min.js'></script>";
    //     }
    //     else {
    //         script = "<script src = 'js/jquery-2.1.3.min.js'></script>";
    //     }
    //     document.write(script);
    // }

    // ImportJQuery(GetBrowser());

    var ipron = module;

    // Variable
    var Version = '3.1.3.0.0';
    var baseURL = '/ic/';
    var arrAjax = new Array();
    var protocol = 'http';
    var ErrCnt = 0;
    ipron.SessionKey = '';
    ipron.Handle = -1;

    // Connect State
    ServerConnectState = {
        Null: 0,
        Trying_1st: 1,
        Trying_2nd: 2,
        Connected: 3,
        Disconnected: 4,
        Error: 5
    }
    var ConnectedState = ServerConnectState.Null;

    // Message Type
    ipron.MsgType = {
        Null: 0,
        AjaxResponse: 1,
        ICResponse: 2,
        ICEvent: 3,
        Heartbeat: 4
    }

    // Request
    ipron.Request = {
        Heartbeat: "heartbeat",
        OpenServer: "openserver",
        CloseServer: "closeserver",
        Register: "register",
        Unregister: "unregister",
        GroupRegister: "groupregister",
        GroupUnregister: "groupunregister",
        AnswerCall: "answercall",
        ClearCall: "clearcall",
        MakeCall: "makecall",
        GroupPickup: "grouppickup",
        HoldCall: "holdcall",
        RetrieveCall: "retrievecall",
        SinglestepTransfer: "singlesteptransfer",
        SinglestepQueueTransfer: "singlestepqueuetransfer",
        MuteTransfer: "mutetransfer",
        SinglestepConference: "singlestepconference",
        Conference: "conference",
        SetACDAgentState: "setacdagentstate",
        GetACDAgentState: "getacdagentstate",
        GetStateSubcode: "getstatesubcode",
        AgentLogin: "agentlogin",
        AgentLogout: "agentlogout",
        GetGroupList: "getgrouplist",
        GetQueueList: "getqueuelist",
        GetAgentList: "getagentlist",
        GetAgentInfo: "getagentinfo",
        GetRouteable: "getrouteable",
        SetAFTCallState: "setaftcallstate",
        SetAgentState: "setagentstate",
        GetAgentState: "getagentstate",
        ForceSetAgentState: "forcesetagentstate",
        GetQueueTraffic: "getqueuetraffic",
        InstantMsgSend: "instantmsgsend",
        UpdateUserdata: "updateuserdata",
        DeleteKeyUserdata: "deletekeyuserdata",
        DeleteAllUserdata: "deletealluserdata",
        SendUserEvent: "senduserevent",
        ChangePassword: "changepassword",
        AgentReport: "agentreport",
        JoinCall: "joincall",
        TenantReport: "tenantreport",
        DeflectCall: "deflectcall",
        QueueDeflectCall: "queuedeflectcall",
        SetSkillEnable: "setskillenable",
        GetAgentSkillList: "getagentskilllist",
        GetConnection: "getconnection",
        GetUserdata: "getuserdata",
        GetConnState: "getconnstate",
        GetAgentGroupList: "getagentgrouplist",
        GroupReport: "groupreport",
        GetAgentQueueList: "getagentqueuelist",
        GetQueueOrder: "getqueueorder",
        GetQueueTrafficEx: "getqueuetrafficex",
        AgentLoginEx: "agentloginex",
        ChangePasswordEx: "changepasswordex",
        SetANIUserdata: "setaniuserdata",
        QueueReportV3: "queuereportv3",
        SkillReportV3: "skillreportv3",
        GroupReportV3: "groupreportv3",
        AgentReportV3: "agentreportv3",
        TenantReportV3: "tenantreportv3",
        GroupReportV4: "groupreportv4",
        QueueReportV4: "queuereportv4",
        SkillReportV4: "skillreportv4",
        TenantReportV4: "tenantreportv4",
        GroupReportV5: "groupreportv5",
        QueueReportV5: "queuereportv5",
        SkillReportV5: "skillreportv5",
        TenantReportV5: "tenantreportv5",
        GetAgentListEx: "getagentlistex",
        SeqAgentLogin: "seqagentlogin",
        SeqChangePassword: "seqchangepassword",
        DNISReport: "dnisreport"
    }

    // Request Parameter
    ipron.Parameter = {
        MessageType: "messagetype",
        Method: "method",
        Result: "result",
        Key: "key",
        Handle: "handle",
        StartDn: "startdn",
        EndDn: "enddn",
        TenantName: "tenantname",
        ThisDn: "thisdn",
        DestDn: "destdn",
        ObCallingDn: "obcallingdn",
        ConnectionId: "connectionid",
        SkillLevel: "skilllevel",
        Priority: "priority",
        RelationAgentDn: "relationagentdn",
        ExtensionData: "extensiondata",
        PartyType: "partytype",
        ConnectionCnt: "connectioncnt",
        ConnectionId1: "connectionid1",
        ConnectionId2: "connectionid2",
        ConnectionState: "connectionstate",
        AgentDn: "agentdn",
        AgentId: "agentid",
        AgentPassword: "agentpassword",
        AgentState: "agentstate",
        AgentStateSub: "agentstatesub",
        SubcodeCount: "subcodecount",
        ReasonCode: "reasoncode",
        GroupCount: "groupcount",
        QueueCount: "queuecount",
        DestAgentId: "destagentid",
        SkillCount: "skillcount",
        GroupId: "groupid",
        GroupIdSet: "groupidset",
        QueueDn: "queuedn",
        QueueDnSet: "queuednset",
        AgentCount: "agentcount",
        AgentName: "agentname",
        AgentPosition: "agentposition",
        AgentLevel: "agentlevel",
        AniNumber: "aninumber",
        Dnis: "dnis",
        DnisSet: "dnisset",
        SkillId: "skillid",
        SkillEnable: "skillenable",
        SvcLvlTime: "svclvltime",
        SvcLevel: "svclevel",
        WaitCount: "waitcount",
        AllAgentCount: "allagentcount",
        LoginAgentCount: "loginagentcount",
        ReadyAgentCount: "readyagentcount",
        InbusyAgentCount: "inbusyagentcount",
        OutbusyAgentCount: "outbusyagentcount",
        AftworkAgentCount: "aftworkagentcount",
        NotreadyAgentCount: "notreadyagentcount",
        RingingCount: "ringingcount",
        DaialingCount: "daialingcount",
        InboundTotal: "inboundtotal",
        AcceptTotal: "accepttotal",
        AbandonTotal: "abandontotal",
        RejectTotal: "rejecttotal",
        NonSvcTotal: "nonsvctotal",
        TimeoutTotal: "timeouttotal",
        AnswerCountAvr: "answercountavr",
        TalktimeCountAvr: "talktimecountavr",
        WaitTime: "waittime",
        MaxWaitTime: "maxwaittime",
        MinWaitTime: "minwaittime",
        WaitTimeAvr: "waittimeavr",
        WaitTimeSum: "waittimesum",
        DateTime: "datetime",
        OtherLoginIpaddr: "otherloginipaddr",
        DistributeWaitCount: "distributewaitcount",
        CallId: "callid",
        InTotal: "intotal",
        InSuccess: "insuccess",
        InTalkTime: "intalktime",
        OutTotal: "outtotal",
        OutSuccess: "outsuccess",
        OutIntTot: "outinttot",
        OutExtTot: "outexttot",
        OutSubTot: "outsubtot",
        OutTalkTime: "outtalktime",
        TransferCalls: "transfercalls",
        LoginTime: "logintime",
        LogoutTime: "logouttime",
        PrivateData: "privatedata",
        MediaType: "mediatype",
        CallState: "callstate",
        CallType: "calltype",
        MediaType: "mediatype",
        CallCharacteristic: "callcharacteristic",
        PrevconnId: "prevconnid",
        Ani: "ani",
        OtherDn: "otherdn",
        OtherQueue: "otherqueue",
        ThirdpartyDn: "thirdpartydn",
        LastDn: "lastdn",
        ServerName: "servername",
        UpdateUserId: "updateuserid",
        EventDn: "eventdn",
        ErrorCode: "errorcode",
        ErrorMessage: "errormessage",
        AddrType: "addrtype",
        RegMode: "regmode",
        PasswdType: "passwdtype",

        UserDn: "userdn",
        DestQueueDn: "destqueuedn",
        OldPassword: "oldpassword",
        NewPassword: "newpassword",
        SeqPassword: "seqpassword",
        SkillIdSet: "skillidset",
        AgentType: "agenttype",
        RequestState: "requeststate",
        MessageLevel: "messagelevel",
        MessageTitle: "messagetitle",
        MessageMode: "messagemode",
        MessageBody: "messagebody",
        LoggedOnState: "loggedonstate",
        ExtensionCount: "extensioncount",
        BusyAgentCount: "busyagentcount",
        Reason: "reason",
        SenderUserId: "senderuserid",
        SenderDn: "senderdn",
        ReadyTimeSum: "readytimesum",
        NotReadyTimeSum: "notreadytimesum",
        AcwTimeSum: "acwtimesum"
    }

    // ICAPI Method
    ipron.APIMethod = {
        INSTANT_MSG_ARRIVED: 3002,
        OPENSERVER_RES: 4001,
        CLOSESERVER_RES: 4002,
        REGIADDR_RES: 4003,
        UNREGIADDR_RES: 4004,
        GROUP_REGIADDR_RES: 4005,
        GROUP_UNREGIADDR_RES: 4006,
        ANSWERCALL_RES: 4007,
        CLEARCALL_RES: 4008,
        MAKECALL_RES: 4009,
        HOLDCALL_RES: 4010,
        RETRIEVECALL_RES: 4011,
        SINGLESTEP_TRANSFER_RES: 4012,
        MUTE_TRANSFER_RES: 4013,
        SINGLESTEP_CONFERENCE_RES: 4014,
        CONFERENCE_RES: 4015,
        SET_ACDAGENT_STATE_RES: 4016,
        GET_ACDAGENT_STATE_RES: 4017,
        AGENTLOGIN_RES: 4018,
        AGENTLOGOUT_RES: 4019,
        SETAGENTSTATE_RES: 4020,
        GETAGENTSTATE_RES: 4021,
        GETSTATE_SUBCODE_RES: 4022,
        GETAGENTLIST_RES: 4023,
        GETAGENTINFO_RES: 4024,
        GETROUTEABLE_RES: 4025,
        SETAFTCALLSTATE_RES: 4026,
        GETQUEUETRAFFIC_RES: 4027,
        INSTANT_MSGSEND_RES: 4028,
        GETGROUPLIST_RES: 4029,
        GETQUEUELIST_RES: 4030,
        UPDATE_USERDATA_RES: 4031,
        DELETE_KEY_USERDATA_RES: 4032,
        DELETE_ALL_USERDATA_RES: 4033,
        SEND_USEREVENT_RES: 4034,
        GRPICKUP_RES: 4035,
        CHANGEPASSWORD_RES: 4036,
        AGENT_REPORT_RES: 4037,
        JOINCALL_RES: 4038,
        TENANT_REPORT_RES: 4039,
        DEFLECTCALL_RES: 4040,
        SETSKILL_ENABLE_RES: 4041,
        GETAGENT_SKILLLIST_RES: 4042,
        GETCONNECTION_RES: 4043,
        GET_USERDATA_RES: 4044,
        GETCONNSTATE_RES: 4045,
        FORCE_SETAGTSTATE_RES: 4046,
        GET_AGENTGROUP_LIST_RES: 4047,
        GROUP_REPORT_RES: 4048,

        GETAGENT_QUEUELIST_RES: 4050,
        GETQUEUEORDER_RES: 4051,
        GETQUEUE_TRAFFICEX_RES: 4052,
        AGENTLOGINEX_RES: 4053,
        CHANGEPASSWORDEX_RES: 4054,
        SET_ANI_USERDATA_RES: 4055,
        AGENTREPORTV3_RES: 4056,
        GROUPREPORTV3_RES: 4057,
        QUEUEREPORTV3_RES: 4058,
        SKILLREPORTV3_RES: 4059,
        TENANTREPORTV3_RES: 4060,
        GROUPREPORTV4_RES: 4061,
        QUEUEREPORTV4_RES: 4062,
        SKILLREPORTV4_RES: 4063,
        TENANTREPORTV4_RES: 4064,
        GROUPREPORTV5_RES: 4065,
        QUEUEREPORTV5_RES: 4066,
        SKILLREPORTV5_RES: 4067,
        TENANTREPORTV5_RES: 4068,
        GETAGENTLIST_EX_RES: 4069,
        SEQ_AGENTLOGIN_RES: 4070,
        SEQ_CHANGEPASSWORD_RES: 4071,
        DNIS_REPORT_RES: 4072
    }

    // ICAPI Event
    ipron.APIEvent = {
        RINGING: 5001,
        ESTABLISHED: 5002,
        RELEASED: 5003,
        DIALING: 5004,
        ABANDONED: 5005,
        DESTBUSY: 5006,
        HELD: 5007,
        RETRIEVED: 5008,
        PARTYADDED: 5009,
        PARTYCHANGED: 5010,
        PARTYDELETED: 5011,
        QUEUED: 5012,
        DIVERTED: 5013,
        ACDAGENT_LOGGEDON: 5014,
        ACDAGENT_LOGGEDOFF: 5015,
        ACDAGENT_NOTREADY: 5016,
        ACDAGENT_READY: 5017,
        ACDAGENT_WORKAFTCALL: 5018,
        AGENTLOGIN: 5019,
        AGENTLOGOUT: 5020,
        AGENTREADY: 5021,
        AGENTNOTREADY: 5022,
        AGENTACW: 5023,
        LINKCONNECTED: 5024,
        LINKDISCONNECTED: 5025,
        CTIDISCONNECTED: 5026,
        REGISTERED: 5027,
        UNREGISTERED: 5028,
        UPDATE_USERDATA: 5029,
        USEREVENT: 5030,
        HBTIMEOUTEVT: 5031,
        RETRY_CONNECT: 5032,
        RETRY_CONN_SUC: 5033,
        RETRY_CONN_FAIL: 5034,
        INITIATED: 5035,
        BANISHMENT: 5036,
        OPENSRVSUCCESS: 5037
    }

    // Event
    ipron.WebEvent = {
        ERR_OPENSERVER: 6000,
        ERR_HEARTBEAT: 6001,
        ERR_DISCONNECT: 6002
    }

    // Advance List Option Values
    ipron.ListOption = {
        ID: 0,
        DN: 1,
        LOGIN_ID: 2,
        NAME: 3,
        STATE: 4,
        STATE_SUB: 5,
        STATE_KEEP_TIME: 6,
        IN_OUT: 7,
        SKILL_LEVEL: 8,
        SKILL_ID: 9,
        SKILL_ENABLE: 10
    }

    // JSON Key
    ipron.JSONKey = {
        Method: "method",
        Result: "result",
        key: "key"
    }

    // JSON Value
    ipron.JSONValue = {
        True: "true",
        False: "false"
    }

    // AppName
    ipron.app_name = '';

    // Heartbeat Info
    ipron.hbPeriod = 10; // sec
    ipron.hbErrCnt = 18;

    // Server 01 Info
    ipron.ip1 = '';
    ipron.port1 = '';

    // Connected ServerInfo
    ipron.ConnectedServerIndex = -1;

    // Set Protocol
    ipron.SetProtocol = function (prt) {
        if (prt == "http") {
            protocol = "http";
        }
        else {
            protocol = "https";
        }
    }

    // Get WebAPI Version
    ipron.GetWebAPIVersion = function () {
        return Version;
    }

    // Set Heartbeat Info
    ipron.SetHeartbeatInfo = function (period, errCnt) {
        ipron.hbPeriod = period;
        ipron.hbErrCnt = errCnt;
    }

    // Set Server Info
    ipron.SetServerInfo = function (ip1, port1) {
        ipron.ip1 = ip1;
        ipron.port1 = port1;
    }

    // Heartbeat
    ipron.Heartbeat = function () {
        ipron.SendData(baseURL + ipron.Request.Heartbeat + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey, 'GET');
    }

    // OpenServer
    ipron.OpenServer = function (name, cb_evt, cb_res) {
        if (ConnectedState != ServerConnectState.Connected && ConnectedState != ServerConnectState.Trying_1st) {
            if (ConnectedState != ServerConnectState.Trying_2nd) {
                ConnectedState = ServerConnectState.Trying_1st;
            }
            ipron.app_name = name;

            if (ipron.ConnectedServerIndex < 0) {
                ipron.ConnectedServerIndex = 1;
            }

            ipron.cb_evt = cb_evt;
            ipron.cb_res = cb_res;
            var data = baseURL + ipron.Request.OpenServer + '?' + ipron.Parameter.AppName + '=' + name;
            ipron.SendData(encodeURI(data));
        }
    }

    // CloseServer
    ipron.CloseServer = function () {
        if (ipron.IsConnected()) {
            var data = baseURL + ipron.Request.CloseServer + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle;
            ipron.SendData(encodeURI(data));

            ipron.SessionKey = '';
            ConnectedState = ServerConnectState.Disconnected;
        }
    }

    // Register
    ipron.Register = function (dn, tenant, addrtype, regmode) {
        if (ipron.IsConnected()) {
            var data = baseURL + ipron.Request.Register + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            ipron.Parameter.ThisDn + '=' + dn + '&' +
            ipron.Parameter.TenantName + '=' + tenant + '&' +
            ipron.Parameter.RegMode + '=' + regmode + '&' +
            ipron.Parameter.AddrType + '=' + addrtype;

            ipron.SendData(encodeURI(data));
        }
    }

    // Unregister
    ipron.Unregister = function (dn, tenant) {
        if (ipron.IsConnected()) {
            var data = baseURL + ipron.Request.Unregister + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            ipron.Parameter.ThisDn + '=' + dn + '&' +
            ipron.Parameter.TenantName + '=' + tenant;
            ipron.SendData(encodeURI(data));
        }
    }

    // Group Register
    ipron.GroupRegister = function (startDn, endDn, tenant, addrtype, regmode) {
        if (ipron.IsConnected()) {
            var data = baseURL + ipron.Request.GroupRegister + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            ipron.Parameter.StartDn + '=' + startDn + '&' +
            ipron.Parameter.EndDn + '=' + endDn + '&' +
            ipron.Parameter.TenantName + '=' + tenant + '&' +
            ipron.Parameter.RegMode + '=' + regmode + '&' +
            ipron.Parameter.AddrType + '=' + addrtype;

            ipron.SendData(encodeURI(data));
        }
    }

    // Group Unregister
    ipron.GroupUnregister = function (startDn, endDn, tenant) {
        if (ipron.IsConnected()) {
            var data = baseURL + ipron.Request.GroupUnregister + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            ipron.Parameter.StartDn + '=' + startDn + '&' +
            ipron.Parameter.EndDn + '=' + endDn + '&' +
            ipron.Parameter.TenantName + '=' + tenant;
            ipron.SendData(encodeURI(data));
        }
    }

    ipron.AnswerCall = function (dn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + dn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.AnswerCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.ClearCall = function (dn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + dn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.ClearCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.MakeCall = function (thisDn, destDn, obCallingDn, mediatype, callcharacteristic, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ObCallingDn + '=' + obCallingDn + '&';
            data += ipron.Parameter.MediaType + '=' + mediatype + '&';
            data += ipron.Parameter.CallCharacteristic + '=' + callcharacteristic;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.MakeCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.HoldCall = function (dn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + dn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.HoldCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.RetrieveCall = function (dn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + dn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.RetrieveCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GroupPickup = function (dn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + dn;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GroupPickup + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.JoinCall = function (thisDn, destDn, partyType, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.PartyType + '=' + partyType;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.JoinCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SinglestepTransfer = function (thisDn, connectionId, destDn, obCallingDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ObCallingDn + '=' + obCallingDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;

            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SinglestepTransfer + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.MuteTransfer = function (thisDn, connectionId, destDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.MuteTransfer + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SinglestepConference = function (thisDn, connectionId, destDn, obCallingDn, partyType, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ObCallingDn + '=' + obCallingDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId + '&';
            data += ipron.Parameter.PartyType + '=' + partyType;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SinglestepConference + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.Conference = function (thisDn, connectionId, destDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;

            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.Conference + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.DeflectCall = function (thisDn, connectionId, destDn, obCallingDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.ObCallingDn + '=' + obCallingDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;

            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.DeflectCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.AgentLogin = function (agentDn, agentType, agentId, agentPassword, tenantName, agentState, agentStateSub, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentPassword + '=' + agentPassword + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub;

            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.AgentLogin + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.AgentLogout = function (agentDn, agentId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.AgentLogout + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SetAFTCallState = function (agentDn, agentId, tenantName, agentState, agentStateSub) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SetAFTCallState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SetAgentState = function (agentDn, agentId, agentState, agentStateSub, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SetAgentState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.ForceSetAgentState = function (agentId, tenantName, agentState, agentStateSub, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.ForceSetAgentState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.AgentReport = function (agentDn, agentId, tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentId + '=' + agentId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.AgentReport + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GroupReport = function (agentDn, agentId, tenantName, groupId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupId + '=' + groupId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GroupReport + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.TenantReport = function (tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.TenantReport + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.DNISReport = function (dnisSet, privateData) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.DnisSet + '=' + dnisSet + '&';
            data += ipron.Parameter.PrivateData + '=' + privateData;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.DNISReport + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SetSkillEnable = function (agentDn, agentId, skillId, skillEnable) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.SkillId + '=' + skillId + '&';
            data += ipron.Parameter.SkillEnable + '=' + skillEnable;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SetSkillEnable + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetGroupList = function (agentDn, agentId, tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName;

            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetGroupList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetQueueList = function (agentDn, agentId, tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetQueueList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentList = function (agentDn, agentId, tenantName, groupId, queueDn, agentState) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.GroupId + '=' + groupId + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn + '&';
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentInfo = function (agentDn, agentId, tenantName, destDn, destAgentId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId + '&';
            data += ipron.Parameter.DestDn + '=' + destDn;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentInfo + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetRouteable = function (agentDn, agentId, tenantName, destDn, destAgentId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetRouteable + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentState = function (agentDn, agentId, tenantName, destDn, destAgentId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId + '&';
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetAgentState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetQueueTraffic = function (agentDn, agentId, tenantName, queueDn, skillId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn + '&';
            data += ipron.Parameter.SkillId + '=' + skillId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetQueueTraffic + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetStateSubcode = function (agentDn, tenantName, agentState) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentState + '=' + agentState;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetStateSubcode + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentSkillList = function (agentDn, agentId, tenantName, destAgentId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentSkillList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetConnection = function (thisDn, destDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetConnection + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentQueueList = function (agentDn, agentId, tenantName, destAgentId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentQueueList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetQueueOrder = function (agentDn, agentId, tenantName, destQueueDn, skillId, priority, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestQueueDn + '=' + destQueueDn + '&';
            data += ipron.Parameter.SkillId + '=' + skillId + '&';
            data += ipron.Parameter.Priority + '=' + priority;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetQueueOrder + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.UpdateUserdata = function (agentDn, agentId, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.UpdateUserdata + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.DeleteKeyUserdata = function (agentDn, agentId, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.DeleteKeyUserdata + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.DeleteAllUserdata = function (agentDn, agentId, connectionId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.DeleteAllUserdata + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SendUserEvent = function (agentDn, agentId, destDn, destAgentId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SendUserEvent + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetUserdata = function (userDn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.UserDn + '=' + userDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetUserdata + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetConnState = function (thisDn, connectionId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connectionId;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetConnState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SetANIUserdata = function (agentDn, aniNumber, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AniNumber + '=' + aniNumber;
            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SetANIUserdata + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SinglestepQueueTransfer = function (thisDn, connId, destDn, skillLevel, priority, relAgentDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connId + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.SkillLevel + '=' + skillLevel + '&';
            data += ipron.Parameter.Priority + '=' + priority + '&';
            data += ipron.Parameter.ReleationAgentDn + '=' + relAgentDn;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SinglestepQueueTransfer + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SetACDAgentState = function(agentDn, destDn, queueDn, agentId, agentPassword, requeststate) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentPassword + '=' + agentPassword + '&';
            data += ipron.Parameter.RequestState + '=' + requeststate;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SetACDAgentState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetACDAgentState = function(agentDn, destDn, queueDn) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetACDAgentState + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.InstantMsgSend = function(agentDn, agentId, msgType, msgLevel, msgTitle, msgBody, tenantName, groupId, queueDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.MessageType + '=' + msgType + '&';
            data += ipron.Parameter.MessageLevel + '=' + msgLevel + '&';
            data += ipron.Parameter.MessageTitle + '=' + msgTitle + '&';
            data += ipron.Parameter.MessageBody + '=' + msgBody + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupId + '=' + groupId + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.InstantMsgSend + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.ChangePassword = function(agentId, tenantName, oldPasswd, newPasswd) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.OldPassword + '=' + oldPasswd + '&';
            data += ipron.Parameter.NewPassword + '=' + newPasswd;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.ChangePassword + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.QueueDeflectCall = function(thisDn, connId, destDn, skillLevel, priority, relAgentDn, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.ThisDn + '=' + thisDn + '&';
            data += ipron.Parameter.ConnectionId + '=' + connId + '&';
            data += ipron.Parameter.DestDn + '=' + destDn + '&';
            data += ipron.Parameter.SkillLevel + '=' + skillLevel + '&';
            data += ipron.Parameter.Priority + '=' + priority + '&';
            data += ipron.Parameter.RelationAgentDn + '=' + relAgentDn;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.QueueDeflectCall + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentGroupList = function(agentDn, agentId, tenantName, destAgentId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.DestAgentId + '=' + destAgentId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentGroupList + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetQueueTrafficEx = function(agentDn, agentId, tenantName, queueDn, skillId, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn + '&';
            data += ipron.Parameter.SkillId + '=' + skillId;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.GetQueueTrafficEx + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.AgentLoginEx = function(agentDn, agentId, agentType, agentPassword, tenantName, agentState, agentStateSub, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.AgentType + '=' + agentType + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentPassword + '=' + agentPassword + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub;
            data = encodeURI(data);

            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.AgentLoginEx + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.ChangePasswordEx = function(agentId, tenantName, oldpasswd, newpasswd) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.OldPassword + '=' + oldpasswd + '&';
            data += ipron.Parameter.NewPassword + '=' + newpasswd;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.ChangePasswordEx + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.QueueReportV3 = function(tenantName, queueDn) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.QueueReportV3 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SkillReportV3 = function(tenantName, skillId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.SkillId + '=' + skillId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SkillReportV3 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GroupReportV3 = function(tenantName, groupId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupId + '=' + groupId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GroupReportV3 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.AgentReportV3 = function(agentDn, agentId, tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentId + '=' + agentId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.AgentReportV3 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.TenantReportV3 = function(tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.TenantReportV3 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GroupReportV4 = function(tenantName, groupId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupId + '=' + groupId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GroupReportV4 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.QueueReportV4 = function(tenantName, queueDn) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.QueueDn + '=' + queueDn;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.QueueReportV4 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SkillReportV4 = function(tenantName, skillId) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.SkillId + '=' + skillId;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SkillReportV4 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.TenantReportV4 = function(tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.TenantReportV4 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GroupReportV5 = function(tenantName, groupIdSet) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupIdSet + '=' + groupIdSet;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GroupReportV5 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.QueueReportV5 = function(tenantName, queueDnSet) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.QueueDnSet + '=' + queueDnSet;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.QueueReportV5 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SkillReportV5 = function(tenantName, skillIdSet) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.SkillIdSet + '=' + skillIdSet;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.SkillReportV5 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.TenantReportV5 = function(tenantName) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.TenantReportV5 + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.GetAgentListEx = function(agentDn, agentId, tenantName, groupIdSet, queueDnSet, agentState) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.GroupIdSet + '=' + groupIdSet + '&';
            data += ipron.Parameter.QueueDnSet + '=' + queueDnSet + '&';
            data += ipron.Parameter.AgentState + '=' + agentState;
            data = encodeURI(data);

            ipron.SendData(baseURL + ipron.Request.GetAgentListEx + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SeqAgentLogin = function(agentDn, agentType, agentId, seqPassword, tenantName, agentState, agentStateSub, passwdType, extension) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentDn + '=' + agentDn + '&';
            data += ipron.Parameter.AgentType + '=' + agentType + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.SeqPassword + '=' + seqPassword + '&';
            data += ipron.Parameter.AgentState + '=' + agentState + '&';
            data += ipron.Parameter.AgentStateSub + '=' + agentStateSub + '&';
            data += ipron.Parameter.PasswdType + '=' + passwdType;

            data = encodeURI(data);
            if (IsValidExtHdl(extension)) {
                data += '&' + ipron.Parameter.ExtensionData + '=' + encodeURIComponent(ipron.GetExtensionData(extension));
            }

            ipron.SendData(baseURL + ipron.Request.SeqAgentLogin + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    ipron.SeqChangePassword = function(agentId, tenantName, oldPasswd, newPasswd, passwdType) {
        if (ipron.IsConnected()) {
            var data = '';
            data += ipron.Parameter.TenantName + '=' + tenantName + '&';
            data += ipron.Parameter.AgentId + '=' + agentId + '&';
            data += ipron.Parameter.OldPassword + '=' + oldPasswd + '&';
            data += ipron.Parameter.NewPassword + '=' + newPasswd + '&';
            data += ipron.Parameter.PasswdType + '=' + passwdType;

            ipron.SendData(baseURL + ipron.Request.SeqChangePassword + '?' + ipron.Parameter.Key + '=' + ipron.SessionKey + '&' +
            ipron.Parameter.Handle + '=' + ipron.Handle + '&' +
            data);
        }
    }

    // Common Function - SendData
    ipron.SendData = function (url, type) {
        //console.log("SendData[" + url + "]");

        if (ipron.ConnectedServerIndex == 1) {
            url = protocol + '://' + ipron.ip1 + ':' + ipron.port1 + url;
        }
        else {
            return;
        }

        var nTimeout = 0;
        if (type == undefined) { // Request
            type = 'POST';
            nTimeout = 3000;
        }
        else { // Heartbeat
            nTimeout = (ipron.hbPeriod * 1000) + 2000;
        }

        if(!url.includes("heartbeat") && !url.includes("tenantreport") ){
            try{
                clientDb.transaction("rw", clientDb.ctilog, function* () {
                    yield clientDb.ctilog.add({
                        data:url,
                        date:kendo.toString(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        type:"request",
                        event:"SendData"
                    });
                });
            }catch (e){
                console.log(e.message);
            }
        }
        $.support.cors = true;
        var ajax = $.ajax({
            cache: false,
            crossDomain: true,
            url: url,
            type: type,
            dataType: 'json',
            data: '',
            timeout: nTimeout,
            success: CBAJAXSucc,
            failure: function (data) {
                //console.log("ajax failure. data[" + data + "]");
                CBAJAXErr(data);
            },
            error: function (data, temp, error) {
                //console.log(data);

                DeleteAllAjaxRequest();

                if (type == 'GET') {
                    if (data.statusText == 'abort') {
                    }
                    else {
                        ErrCnt = ErrCnt + 1;
                        if (ErrCnt >= ipron.hbErrCnt) {
                            ErrCnt = 0;
                            CBAJAXErr(data, error);
                            return;
                        }

                        if (data.statusText == 'timeout') {
                            ipron.Heartbeat();
                        }
                        else if (data.statusText == 'error') {
                            setTimeout("ipron.Heartbeat()", ipron.hbPeriod * 1000);
                        }
                        else {
                            ipron.Heartbeat();
                        }
                    }
                }
                else if (type == 'POST') {
                    var cbResult = {};
                    cbResult.method = GetRequest(url);
                    if (cbResult.method == ipron.Request.OpenServer) {
                        CBAJAXErr(data, error);
                        return;
                    }

                    cbResult.messagetype = ipron.MsgType.AjaxResponse;
                    cbResult.result = ipron.JSONValue.False;
                    ipron.cb_res(cbResult);

                    if (data.statusText == 'abort') {
                    }
                    else {
                        if (data.statusText == 'timeout') {
                            ipron.Heartbeat();
                        }
                        else if (data.statusText == 'error') {
                            setTimeout("ipron.Heartbeat()", ipron.hbPeriod * 1000);
                        }
                        else {
                            ipron.Heartbeat();
                        }
                    }
                }
            }
        });

        arrAjax.push(ajax);
    }

    // AJAX Success Callback Function
    CBAJAXSucc = function (data) {
        //console.log(data);
        ErrCnt = 0;

        switch (data.messagetype) {
            case ipron.MsgType.AjaxResponse:
                AjaxResponseProcess(data);
                break;
            case ipron.MsgType.ICResponse:
                ICResponseProcess(data);
                break;
            case ipron.MsgType.ICEvent:
                ICEventProcess(data);
                break;
            case ipron.MsgType.Heartbeat:
                ipron.Heartbeat();
                break;
            default:
                break;
        }
    }

    AjaxResponseProcess = function (data) {
        if (data.method == ipron.Request.OpenServer) {
            if (data.result == ipron.JSONValue.True) {

                ipron.SessionKey = data.key;
                ConnectedState = ServerConnectState.Connected;
                ipron.Handle = data.handle;

                //console.log("ipron.Handle[" + ipron.Handle + "]");

                ipron.Heartbeat();
            }
            else {
                ConnectedState = ServerConnectState.Disconnected;
            }
        }

        if (data.method == ipron.Request.CloseServer && data.result == ipron.JSONValue.True) {
            ipron.SessionKey = '';
            ConnectedState = ServerConnectState.Disconnected;
            DeleteAllAjaxRequest();
        }
        ipron.cb_res(data);
    }

    ICResponseProcess = function (data) {
        // Extension
        if (data.extensiondata != undefined) {
            data.extensionhandle = SetExtensionData(data.extensiondata);
        }
        ipron.Heartbeat();

        ipron.cb_res(data);
    }

    ICEventProcess = function (data) {
        if (data.method == ipron.APIEvent.ACTIVE_TIMEOUT) {
            ConnectedState = ServerConnectState.Disconnected;
        }
        else {
            // Extension
            if (data.extensiondata != undefined) {
                data.extensionhandle = SetExtensionData(data.extensiondata);
            }
            ipron.Heartbeat();
        }
        ipron.cb_evt(data);
    }

    // AJAX Error Callback Function
    CBAJAXErr = function (data, error) {
        DeleteAllAjaxRequest();

        if (error != "abort") {
            if (ConnectedState == ServerConnectState.Connected) {
                ConnectedState = ServerConnectState.Disconnected;
                data.method = ipron.WebEvent.ERR_DISCONNECT;
                ipron.cb_evt(data);
            }
            else if (ConnectedState == ServerConnectState.Trying_1st) {
                ConnectedState = ServerConnectState.Trying_2nd;
                ipron.OpenServer(ipron.app_name, ipron.cb_evt, ipron.cb_res);
            }
            else if (ConnectedState == ServerConnectState.Trying_2nd) {
                ConnectedState = ServerConnectState.Disconnected;
                data.method = ipron.WebEvent.ERR_OPENSERVER;
                ipron.cb_evt(data);
            }
        }
    }

    // Delete All Ajax Request
    DeleteAllAjaxRequest = function () {
        for (var i = 0; i < arrAjax.length; i++) {
            arrAjax[i].abort();
        }
        arrAjax.length = 0;
    }

    // Check Connect State
    ipron.IsConnected = function () {
        if (ConnectedState == ServerConnectState.Connected) {
            return true;
        }
        else {
            return false;
        }
    }

    // --- Extension Function ---
    var arrExt = {};
    var extensionIndex = 0;
    function SetExtensionData(data) {
        var handle = ipron.EXTCreateExtension();
        arrExt[handle] = data;
        return handle;
    }
    function IsValidExtHdl(handle) {
        if (handle > 0 && handle < 101)
            return true;
        else
            return false;
    }
    ipron.EXTCreateExtension = function () {
        extensionIndex++;
        if (extensionIndex > 100) {
            extensionIndex = 1;
        }
        arrExt[extensionIndex] = {};
        return extensionIndex;
    }
    ipron.EXTDeleteExtension = function (handle) {
        arrExt[handle] = {};
    }
    ipron.GetExtensionData = function (handle) {
        return JSON.stringify(arrExt[handle]);
    }
    ipron.EXTAddRecord = function (handle, key, value) {
        var extension = arrExt[handle];
        if (extension == undefined) {
            extension = {};
        }
        if (extension["" + key] == undefined) {
            extension["" + key] = value;
        }
        else {
            if (isArray(extension["" + key])) {
                extension["" + key].push(value);
            }
            else {
                var arr = new Array();
                arr.push(extension["" + key]);
                arr.push(value);

                extension["" + key] = arr;
            }
        }
        arrExt[handle] = extension;
        //console.log(extension);
    }
    ipron.EXTDeleteRecord = function (handle, key) {
        var extension = arrExt[handle];
        if (extension["" + key] == undefined) {
        }
        else {
            delete extension["" + key];
        }
        arrExt[handle] = extension;
        //console.log(extension);
    }
    ipron.EXTDeleteValue = function (handle, key, value) {
        var extension = arrExt[handle];
        if (Array.isArray(extension["" + key])) {
            extension["" + key] = extension["" + key].filter(function (x) { return x != value; });
            if (extension["" + key].length == 0) {
                delete extension["" + key];
            }
        }
        else {
            delete extension["" + key];
        }
        arrExt[handle] = extension;
        //console.log(extension);
    }
    ipron.EXTGetRecordCount = function (handle) {
        if (handle == undefined || handle == 0)
            return 0;
        var extension = arrExt[handle];

        if (Object.keys) {
            return Object.keys(extension).length;
        }
        else {
            var cnt = 0;
            for (var i in extension) {
                cnt++;
            }
            return cnt;
        }
    }
    ipron.EXTGetValueCountForRecord = function (handle, record) {
        return ipron.EXTGetValueCountForKey(handle, ipron.EXTGetKey(handle, record));
    }
    ipron.EXTGetValueCountForKey = function (handle, key) {
        var extension = arrExt[handle];
        if (isArray(extension["" + key])) {
            return extension["" + key].length;
        }
        else {
            if (extension["" + key] == undefined) {
                return 0;
            }
            else {
                return 1;
            }
        }
    }
    ipron.EXTGetKey = function (handle, record) {
        var extension = arrExt[handle];

        if (Object.keys) {
            return Object.keys(extension)[record];
        }
        else {
            var cnt = 0;
            for (var i in extension) {
                if (cnt == record) {
                    return i;
                }
                cnt++;
            }
            return cnt;
        }


        return Object.keys(extension)[record];
    }
    ipron.EXTGetValueForRecord = function (handle, record, field) {
        return ipron.EXTGetValueForKey(handle, ipron.EXTGetKey(handle, record), field);
    }
    ipron.EXTGetValueForKey = function (handle, key, field) {
        var extension = arrExt[handle];
        if (isArray(extension["" + key])) {
            return extension["" + key][field];
        }
        else {
            if (field == 0) {
                return extension["" + key];
            }
            else {
                return undefined;
            }
        }
    }

    // Advance List
    //var listOptionCnt = 11;
    var arrAdList = {};
    var adListIndex = 0; // 1 ~ 512
    function AdLstCreateList() {
        adListIndex++;
        if (adListIndex > 512) {
            adListIndex = 1;
        }
        arrAdList[adListIndex] = {};
        return adListIndex;
    }
    function AdLstAddRow(handle, id, dn, loginId, name, state, stateSub, stateKeepTime, inOut, skillLevel, skillId, skillEnable) {
        var adList = arrAdList[handle];
        if (adList == undefined) {
            adList = {};
        }

        var rowArr = new Array(id, dn, loginId, name, state, stateSub, stateKeepTime, inOut, skillLevel, skillId, skillEnable);

        var cnt = AdLstGetCount(handle);
        if (cnt != undefined) {
            adList[cnt] = rowArr;
        }
    }
    function AdLstAddRowArray(handle, arr) {
        var adList = arrAdList[handle];
        if (adList == undefined) {
            adList = {};
        }

        var cnt = AdLstGetCount(handle);
        if (cnt != undefined) {
            adList[cnt] = arr;
        }
    }
    function AdLstGetRow(handle, row) {
        var adList = arrAdList[handle];
        return adList[row];
    }
    function AdLstGetCount(handle) {
        if (handle == undefined || handle == 0)
            return;

        var rowArr = arrAdList[handle];
        if (Object.keys) {
            return Object.keys(rowArr).length;
        }
        else {
            var cnt = 0;
            for (var i in rowArr) {
                cnt++;
            }
            return cnt;
        }
    }
    ipron.GetListItem = function (listId, listIndex, listOption) {
        var adList = arrAdList[listId];
        var rowArr = adList[listIndex];
        return rowArr[listOption];
    }
    ipron.GetListItemFilter = function (listId, listOption, listFilter) {
        if (!((typeof listFilter == "string") && (listFilter.length > 0))) {
            return;
        }

        var filterHandle = 0;
        var filterLen = listFilter.length;
        var firstString = listFilter[0];
        var lastString = listFilter[filterLen - 1];
        var existData = false;

        if (firstString == "%" && lastString != "%") {
            var filterStr = listFilter.substring(1, filterLen);
            for (var i = 0; i < AdLstGetCount(listId); i++) {
                var listItem = ipron.GetListItem(listId, i, listOption);
                if (listItem.lastIndexOf(filterStr) >= 0) {
                    if (listItem.lastIndexOf(filterStr) + filterStr.length == listItem.length) {
                        if (existData == false) {
                            filterHandle = AdLstCreateList();
                            existData = true;
                        }
                        var rowArr = AdLstGetRow(listId, i);
                        AdLstAddRowArray(filterHandle, rowArr);
                    }
                }
            }
        }
        else if (firstString != "%" && lastString == "%") {
            var filterStr = listFilter.substring(0, filterLen - 1);
            for (var i = 0; i < AdLstGetCount(listId); i++) {
                var listItem = ipron.GetListItem(listId, i, listOption);
                if (listItem.indexOf(filterStr) == 0) {
                    if (existData == false) {
                        filterHandle = AdLstCreateList();
                        existData = true;
                    }
                    var rowArr = AdLstGetRow(listId, i);
                    AdLstAddRowArray(filterHandle, rowArr);
                }
            }
        }
        else if (firstString == "%" && lastString == "%") {
            var filterStr = listFilter.substring(1, filterLen - 1);
            for (var i = 0; i < AdLstGetCount(listId); i++) {
                var listItem = ipron.GetListItem(listId, i, listOption);
                if (listItem.indexOf(filterStr) != -1) {
                    if (existData == false) {
                        filterHandle = AdLstCreateList();
                        existData = true;
                    }
                    var rowArr = AdLstGetRow(listId, i);
                    AdLstAddRowArray(filterHandle, rowArr);
                }
            }
        }
        else if (firstString != "%" && lastString != "%") {
            var filterStr = listFilter;
            for (var i = 0; i < AdLstGetCount(listId); i++) {
                var listItem = ipron.GetListItem(listId, i, listOption);
                if (listItem == filterStr) {
                    if (existData == false) {
                        filterHandle = AdLstCreateList();
                        existData = true;
                    }
                    var rowArr = AdLstGetRow(listId, i);
                    AdLstAddRowArray(filterHandle, rowArr);
                }
            }
        }

        return filterHandle;
    }
    ipron.GetListItemCnt = function (listId) {
        return AdLstGetCount(listId);
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    }

    function GetRequest(url) {
        var nStart = url.indexOf('/ic/');
        var nLast = url.indexOf('?');
        return url.substring(nStart + 4, nLast);
    }
})((this.ipron = {}), this);
