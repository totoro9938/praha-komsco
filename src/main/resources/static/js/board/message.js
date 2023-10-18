$(document).ready(()=> {
const messagePageSelectUrl = "/board/v1/message/select/page";
const messageDeptUserSelectUrl = "/board/v1/message/dept/user/select";
const messageGroupMemberSelectUrl = "/board/v1/message/group/member/select";
const messageGroupInsertUrl = "/board/v1/message/group/insert";
const messageGroupSelectUrl = "/board/v1/message/group/select";
const messageGroupDeleteUrl = "/board/v1/message/group/delete";
const messageInsertUrl = "/board/v1/message/insert";
const messageImportanceUpdateUrl = "/board/v1/message/importance/update";
const messageReceiveImportanceUpdateUrl = "/board/v1/message/receive/importance/update";
const messageDeleteUrl = "/board/v1/message/delete";

let isMessageReadType = true;// true -> 이전 검색 조건 유지 X, false -> 이전 검색 조건을 유지한 채 read
let receiveSearchText;
let sendSearchText;


const messagePage = {
    isSearchBtn : false,
    init : async () => {
        $("#message-tab-strip").kendoTabStrip({
            tabPosition: "left",
            animation: { open: { effects: "fadeIn" } },
            select : (e) => {
                const selectTabText = $(e.item).find(".message-tab-strip-name").attr("value");
                
                if(selectTabText === '0'){
                    //받은쪽지 tab 클릭 시
                    isMessageReadType = false;
                    $("#message-receive-grid").data("kendoCpGrid").dataSource.page($("#message-receive-grid").data("kendoCpGrid").dataSource.page());
                }else if(selectTabText === '1'){
                    //보낸쪽지 tab 클릭 시
                    isMessageReadType = false;
                    $("#message-send-grid").data("kendoCpGrid").dataSource.page($("#message-send-grid").data("kendoCpGrid").dataSource.page());
                }
            },
        });
        await receiveMessageSetting.widgetSetting();//받은쪽지 tab
        messageGridSetting.receivePageGrid.drawGrid();

        await sendMessageSetting.widgetSetting(); //보낸쪽지 tab
        messageGridSetting.sendPageGrid.drawGrid();
        messageGridSetting.receiverListGrid.drawGrid();//수신자리스트 grid
        
        writeMessageSetting.widgetSetting();//쪽지작성 tab
        messageGridSetting.groupGrid.drawGrid();//쪽지작성 group grid

    }
};

//받은쪽지 tab
const receiveMessageSetting = {
    receiveFileUpload : new cpUpload(),
    widgetSetting : () => {
        $("#message-receive-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: false, size: "46px", resizable:false, scrollable: false },
                { collapsible: false, scrollable: false}
            ]
        });

        $("#message-receive-grid-splitter").kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: false, size: "100%" },
                { collapsible: false, resizable: false },
            ]
        });

        $("#message-receive-search-button").kendoButton({
            themeColor: "secondary",
            icon: 'search',
            size: 'small',
            click: function (e) {
                const grid = $("#message-receive-grid").data("kendoCpGrid");
                if(grid){
                    messagePage.isSearchBtn = true;
                    isMessageReadType = true;
                    grid.dataSource.page(1);
                }
            },
        });

        $("#message-receive-message-del-btn").kendoButton({
            themeColor : 'primary',
            click : () => {
                const checkedMessages = [...messageGridSetting.receivePageGrid.receiveCheckedItems];
                let messageIds = '';
                let messageIdsCount = 0;

                for(let i = 0; i < checkedMessages.length; i++){
                    if(checkedMessages[i] === undefined){
                        continue;
                    }else if(checkedMessages[i].checked){
                        messageIds += '`' + checkedMessages[i].data.messageId;
                        messageIdsCount += 1;
                    }
                }

                messageIds = messageIds.substring(1, messageIds.length);

                const param = {
                    type : "Rcv",
                    messageCnt : messageIdsCount,
                    messageIdList : messageIds,
                }

                const deleteMessageCallback = () => {
                    const deleteMessage = new cpDataSource(METHOD.PUT, messageDeleteUrl, param).getDataSource();
                    deleteMessage.read().then(()=>{
                        message.notification({msg:"쪽지를 삭제했습니다."});
                        messageGridSetting.receivePageGrid.receiveCheckedItems = []; //삭제 후 초기화
                        isMessageReadType = false;
                        $("#message-receive-grid").data("kendoCpGrid").dataSource.page(1);
                        $("#receive-check-all").prop("checked", false); //check all checkbox 빼기
                    })
                }

                if(messageIds === ''){
                    message.notification({msg:"삭제할 쪽지를 선택해 주세요", type:'error'})
                }else{
                    message.callBackConfirm({msg: "삭제 하시겠습니까?", callback: deleteMessageCallback});
                }

            },
        });

        $("#message-receive-detail-receive-contents").kendoTextArea({
            readonly : true,
            rows: 10,
            resizable: "none",
            fillMode : "flat",
        })

        $("#message-receive-detail-send-contents").kendoTextArea({
            rows: 10,
            resizable: "none",
            placeholder: "답장내용 입력..."
        })

        $("#message-receive-detail-close").on("click",(e) => {
            receiveMessageSetting.detailClose();
        })

        $("#message-receive-detail-importance-ok-btn").kendoButton({
            click : () => {
                const param = {
                    messageId : Number($("#message-receive-select-message-id").val()),
                    messageReceiveId : Number(USER_INFO.userId),
                    importance : "Y",
                }
                const importanceCheck = new cpDataSource(METHOD.PUT, messageReceiveImportanceUpdateUrl, param).getDataSource();
                importanceCheck.read().then(()=>{
                    isMessageReadType = false;
                    $("#message-receive-grid").data("kendoCpGrid").dataSource.page($("#message-receive-grid").data("kendoCpGrid").dataSource.page());
                    $("#message-receive-detail-importance-ok-btn").hide();
                    $("#message-receive-detail-importance-del-btn").show();
                })
            },
        });
        $("#message-receive-detail-importance-del-btn").kendoButton({
            click : () => {
                const param = {
                    messageId : Number($("#message-receive-select-message-id").val()),
                    messageReceiveId : Number(USER_INFO.userId),
                    importance : "N",
                }
                const importanceUnCheck = new cpDataSource(METHOD.PUT, messageReceiveImportanceUpdateUrl, param).getDataSource();
                importanceUnCheck.read().then(()=>{
                    isMessageReadType = false;
                    $("#message-receive-grid").data("kendoCpGrid").dataSource.page($("#message-receive-grid").data("kendoCpGrid").dataSource.page());
                    $("#message-receive-detail-importance-ok-btn").show();
                    $("#message-receive-detail-importance-del-btn").hide();
                })
            },
        });
        $("#message-receive-detail-file-list-btn").kendoButton({});

        $("#message-receive-detail-send-btn").kendoButton({
            themeColor : 'primary',
            click : () => {
                const param = {
                    parentId : Number($("#message-receive-select-message-id").val()),
                    contents :  $("#message-receive-detail-send-contents").data("kendoTextArea").value(),
                    receiverCnt : 1,
                    messageReceiverIdList : $("#message-receive-select-message-rgtr-id").val(),
                    messageReceiverNmList : $("#message-receive-select-message-rgtr-nm").val(),
                    description: '',
                };

                let uploadBadge = $($('#message-receive-detail-insert-file-btn').find('span')[1]).attr('id');
                if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
                    param.files = receiveMessageSetting.receiveFileUpload.getFileInfo();
                }

                const insertMessageCallback = () => {
                    const insertMessageDataSource = new cpDataSource(METHOD.POST, messageInsertUrl, param).getDataSource();
                    insertMessageDataSource.read().then(()=>{
                        message.notification({msg:"쪽지를 전송하였습니다."});
                        isMessageReadType = false;
                        $("#message-receive-grid").data("kendoCpGrid").dataSource.page(1);
                        receiveMessageSetting.detailClose();
                    })
                }

                if(param.messageReceiverIdList === ''){
                    message.notification({msg:"발신자가 존재하지 않습니다.", type:'error'})
                }else{
                    message.callBackConfirm({msg: "전송 하시겠습니까?", callback: insertMessageCallback});
                }


            },
        });

        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $("#message-receive-search-date-start").kendoDatePicker({
            format: "yyyy-MM-dd",
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: startDate,
            size: 'small'
        });
        $("#message-receive-search-date-end").kendoDatePicker({
            format: "yyyy-MM-dd",
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: new Date(),
            size: 'small'
        });

        $("#message-receive-search-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : '발신자', codeKey : 'Name'},{codeNm : '내용', codeKey : 'Contents'}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            value : "Name",
        })

        $("#message-receive-search-textbox").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#message-receive-search-button1").trigger("click");
            }
        });

        $("#message-receive-importance-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : '전체', codeKey : ''},{codeNm : '표시', codeKey : 'Y'},{codeNm : '표시안함', codeKey : 'N'}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            value : '',
        })
    },
    detailOpen : () => {
        const splitter = $("#message-receive-grid-splitter").data("kendoSplitter");
        splitter.size($("#message-receive-grid-section"), "70%");
        $("#message-receive-detail-send-contents").data("kendoTextArea").value("");
    },
    detailClose : () => {
        const splitter = $("#message-receive-grid-splitter").data("kendoSplitter");
        splitter.size($("#message-receive-grid-section"), "100%");
    },
};

//보낸쪽지 tab
const sendMessageSetting = {
    widgetSetting : () => {
        $("#message-send-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: false, size: "46px", resizable: false, scrollable: false },
                { collapsible: false, scrollable: false }
            ]
        });

        $("#message-send-grid-splitter").kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: false, size: "100%" },
                { collapsible: false, resizable: false },
            ]
        });

        $("#message-send-search-button").kendoButton({
            themeColor: "secondary",
            icon: 'search',
            size: 'small',
            click: function (e) {
                const grid = $("#message-send-grid").data("kendoCpGrid");
                if(grid){
                    messagePage.isSearchBtn = true;
                    isMessageReadType = true;
                    grid.dataSource.page(1);
                }
            },
        });

        $("#message-send-message-del-btn").kendoButton({
            themeColor : 'primary',
            click : () => {
                const checkedMessages = [...messageGridSetting.sendPageGrid.sendCheckedItems];
                let messageIds = '';
                let messageIdsCount = 0;

                for(let i = 0; i < checkedMessages.length; i++){
                    if(checkedMessages[i] === undefined){
                        continue;
                    }else if(checkedMessages[i].checked){
                        messageIds += '`' + checkedMessages[i].data.messageId;
                        messageIdsCount += 1;
                    }
                }

                messageIds = messageIds.substring(1, messageIds.length);

                const param = {
                    type : "Snd",
                    messageCnt : messageIdsCount,
                    messageIdList : messageIds,
                }

                const deleteMessageCallback = () => {
                    const deleteMessage = new cpDataSource(METHOD.PUT, messageDeleteUrl, param).getDataSource();
                    deleteMessage.read().then(()=>{
                        message.notification({msg:"쪽지를 삭제했습니다."});
                        messageGridSetting.sendPageGrid.sendCheckedItems = []; //삭제 후 초기화
                        isMessageReadType = false;
                        $("#message-send-grid").data("kendoCpGrid").dataSource.page(1);
                        $("#send-check-all").prop("checked", false); //check all checkbox 빼기
                    })
                }

                if(messageIds === ''){
                    message.notification({msg:"삭제할 쪽지를 선택해 주세요", type:'error'})
                }else{
                    message.callBackConfirm({msg: "삭제 하시겠습니까?", callback: deleteMessageCallback});
                }

            },
        });

        $("#message-send-detail-send-contents").kendoTextArea({
            readonly : true,
            rows: 10,
            resizable: "none",
            fillMode : "flat",
        })

        $("#message-send-detail-close").on("click",(e) => {
            sendMessageSetting.detailClose();
        })

        $("#message-send-detail-importance-ok-btn").kendoButton({
            click : () => {
                const param = {
                    messageId : Number($("#message-send-select-message-id").val()),
                    importance : "Y",
                }
                const importanceCheck = new cpDataSource(METHOD.PUT, messageImportanceUpdateUrl, param).getDataSource();
                importanceCheck.read().then(()=>{
                    isMessageReadType = false;
                    $("#message-send-grid").data("kendoCpGrid").dataSource.page($("#message-send-grid").data("kendoCpGrid").dataSource.page());
                    $("#message-send-detail-importance-ok-btn").hide();
                    $("#message-send-detail-importance-del-btn").show();
                })
            },
        });
        $("#message-send-detail-importance-del-btn").kendoButton({
            click : () => {
                const param = {
                    messageId : Number($("#message-send-select-message-id").val()),
                    importance : "N",
                }
                const importanceUnCheck = new cpDataSource(METHOD.PUT, messageImportanceUpdateUrl, param).getDataSource();
                importanceUnCheck.read().then(()=>{
                    isMessageReadType = false;
                    $("#message-send-grid").data("kendoCpGrid").dataSource.page($("#message-send-grid").data("kendoCpGrid").dataSource.page());
                    $("#message-send-detail-importance-ok-btn").show();
                    $("#message-send-detail-importance-del-btn").hide();
                })
            },
        });
        $("#message-send-detail-file-list-btn").kendoButton({});


        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $("#message-send-search-date-start").kendoDatePicker({
            format: "yyyy-MM-dd",
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: startDate,
            size: 'small'
        });
        $("#message-send-search-date-end").kendoDatePicker({
            format: "yyyy-MM-dd",
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: new Date(),
            size: 'small'
        });

        $("#message-send-search-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : '수신자', codeKey : 'Name'},{codeNm : '내용', codeKey : 'Contents'}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "flat",
            value : "Name",
        })

        $("#message-send-search-textbox").kendoTextBox({}).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#message-send-search-button1").trigger("click");
            }
        });

        $("#message-send-importance-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : '전체', codeKey : ''},{codeNm : '표시', codeKey : 'Y'},{codeNm : '표시안함', codeKey : 'N'}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "flat",
            value : '',
        })
    }, //widgetSetting end
    detailOpen : () => {
        const splitter = $("#message-send-grid-splitter").data("kendoSplitter");
        splitter.size($("#message-send-grid-section"), "70%");
    },
    detailClose : () => {
        const splitter = $("#message-send-grid-splitter").data("kendoSplitter");
        splitter.size($("#message-send-grid-section"), "100%");
    },
};

//쪽지작성 tab
const writeMessageSetting = {
    writeFileUpload : new cpUpload(),
    widgetSetting : () => {
        writeMessageSetting.writeFileUpload.createBadge('message-write-insert-file-btn');

        $("#message-write-group-name").kendoTextBox({})

        $('#message-write-clear-btn').kendoButton({
            click : () => {
                //--------------파일 업로드 태그 삭제 후 재생성--------------
                writeMessageSetting.writeFileUpload = new cpUpload();
                $("#message-write-insert-file-btn").remove();
                const div = $(`<div id="message-write-insert-file-btn"></div>`);
                $("#message-write-btn-list").prepend(div);
                writeMessageSetting.writeFileUpload.createBadge('message-write-insert-file-btn');
                //----------------------------------------------------------------------
                $("#message-write-contents").data("kendoTextArea").value('');
                const valid = $("#message-write-contents-validator").data("kendoValidator");
                valid.reset();

                let checkedNodes = [];
                const agentTreeView = $("#message-write-agent-tree-view").data("kendoTreeView");
                const groupTreeView = $("#message-write-group-tree-view").data("kendoTreeView");
                writeMessageSetting.getTreeCheckedItems(agentTreeView.dataSource.view(), checkedNodes);//체크된 사용자 get
                writeMessageSetting.setGroupTreeCheckItems(checkedNodes, agentTreeView); //조직에서 체크된 사용자들 빼기
                writeMessageSetting.setGroupTreeCheckItems(checkedNodes, groupTreeView); //그룹에서 체크된 사용자들 빼기
                writeMessageSetting.senderListSetting(); //수신자 list 초기화

            }
        });
        $('#message-write-send-btn').kendoButton({
          themeColor: 'primary',
            click : () => {
                const valid = $("#message-write-contents-validator").data("kendoValidator");
                if(!valid.validate()){
                    return;
                }

                writeMessageSetting.insertMessage();
            }
        });

        $('#message-write-group-delete-btn').kendoButton({
            click : () => {
                const checkedGroups = [...messageGridSetting.groupGrid.groupCheckedItems];
                const messageGroupIds = [];

                for(let i = 0; i < checkedGroups.length; i++){
                    if(checkedGroups[i] === undefined){
                        continue;
                    }else if(checkedGroups[i].checked){
                        messageGroupIds.push(checkedGroups[i].data.messageGroupId);
                    }
                }

                const groupDelete =new cpDataSource(METHOD.DELETE, messageGroupDeleteUrl, {messageGroupIds}).getDataSource();
                groupDelete.read().then(()=>{
                    $("#message-write-group-clear-btn").trigger("click"); //초기화
                    writeMessageSetting.groupTreeViewDataSetting(); //그룹 treeView 렌더링
                    $("#message-write-clear-btn").trigger("click"); //쪽지작성 card 초기화
                    message.notification({msg:"그룹을 삭제했습니다."});
                })

            }
        });
        $('#message-write-group-clear-btn').kendoButton({
            click : () => {
                $("#message-write-group-name").data("kendoTextBox").value('');
                $("#message-write-group-drop-down-tree").siblings('.k-clear-value').trigger("click"); // dropdowntree clear
                $("#message-write-group-grid").data("kendoCpGrid").dataSource.read(); //checkbox clear
                $("#group-check-all").prop("checked", false); //check all checkbox 빼기
                messageGridSetting.groupGrid.groupCheckedItems = []; //체크한 item clear
                $("#message-group-id").val('');//선택한 그룹의 id clear
            }
        });
        $('#message-write-group-save-btn').kendoButton({
            themeColor: 'primary',
            click : () => {
                const valid = $("#message-group-save-validator").data("kendoValidator");
                if(!valid.validate()){
                    return;
                }

                writeMessageSetting.saveMessageGroup();

            }
        });

        $("#message-write-contents").kendoTextArea({
            rows: 15,
            placeholder: "쪽지내용 입력..."
        }).on("keyup", (e)=>{
            $("#message-write-contents-validator").data("kendoValidator").reset();
            writeMessageSetting.calcContentByteLength();
        });

        $('#message-write-contents-validator').kendoValidator({
            rules:{
                required : (input)=>{
                    if(input.is("[name=message-write-contents]")){return input.data("kendoTextArea").value() !== "";}
                    return true;
                },
            },
            messages:{
                required : (input)=>{
                    return "";
                },
            }
        })

        $('#message-group-save-validator').kendoValidator({
            rules:{
                required : (input)=>{
                    if(input.is("[name=message-write-group-name]")){return input.data("kendoTextBox").value() !== "";}
                    return true;
                },
            },
            messages:{
                required : (input)=>{
                    return "";
                },
            }
        })

        $("#message-write-agent-tree-view").kendoTreeView({
            dataSource: [],
            dataTextField: "targetNm",
            autoScroll : true,
            checkboxes: {
                template: "<div style='display:flex;'>#if(item.targetValue.deptId){#<span class='k-icon k-i-folder'></span> #}else if(item.targetValue.userId){# <span class='k-icon k-i-user'></span> #}#<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' /></div>",
                checkChildren: true,
            },
            check : (e) => {
                let checkedNodes = [];
                const thisTreeView = e.sender;
                const groupTreeView = $("#message-write-group-tree-view").data("kendoTreeView");
                writeMessageSetting.getTreeCheckedItems(thisTreeView.dataSource.view(), checkedNodes);
                if ($(e.node).attr("aria-checked") === "false") {
                    //checkbox 뺄 때
                    if (!!thisTreeView.dataItem(e.node).targetValue.deptId) {
                        //뺀 체크박스가 부서인 경우
                        writeMessageSetting.setGroupTreeCheckItems(thisTreeView.dataItem(e.node).items, groupTreeView);
                    } else {
                        const nodeArr = [thisTreeView.dataItem(e.node)];
                        writeMessageSetting.setGroupTreeCheckItems(nodeArr, groupTreeView);
                    }
                } else {
                    writeMessageSetting.setTreeCheckItems(checkedNodes, groupTreeView); //그룹에 속한 사용자들 check
                }

                writeMessageSetting.senderListSetting(); //수신자 list 렌더링
            }
        })

        $("#message-write-group-drop-down-tree").kendoDropDownTree({
            placeholder : "대상 선택...",
            dataSource: [],
            dataTextField: "targetNm",
            autoClose: false,
            checkboxes: {
                template: "<div style='display:flex;'>#if(item.targetValue.deptId){#<span class='k-icon k-i-folder'></span> #}else if(item.targetValue.userId){# <span class='k-icon k-i-user'></span> #}#<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' /></div>",
                checkChildren: true,
            },
        })

        const param ={
            parentId : 1, //콜센터
            deptId : 0,
            useYn : 'Y',
            delYn : 'N',
            outputYn : 'Y',
            sortType : ''
        };

        const deptData = new cpDataSource(METHOD.GET, `/common/v1/dept-all?deptId=1`).getDataSource();//deptId 1 -> 콜센터
        const userData = new cpDataSource(METHOD.GET, messageDeptUserSelectUrl, param).getDataSource();
        deptData.read().then(()=>{
            userData.read().then(()=>{
                let messageUser = userData.data();

                messageUser = messageUser.filter((target) => {
                    if(target.userId !== USER_INFO.userId){
                        return true;
                    }
                })

                messageUser = messageUser.map((target)=>{
                    target.targetNm = target.userNm;
                    target.targetValue = {userId : target.userId};
                    return target;
                })

                const treeViewDataSource =  writeMessageSetting.messageTargetMakeTree(deptData.data(), messageUser);
                const dropdownTreeDataSource = new kendo.data.HierarchicalDataSource({
                    data : [...treeViewDataSource],
                });
                $("#message-write-agent-tree-view").data("kendoTreeView").setDataSource(treeViewDataSource);
                $("#message-write-group-drop-down-tree").data("kendoDropDownTree").setDataSource(dropdownTreeDataSource);
                $("#message-write-agent-tree-view").data("kendoTreeView").expand(".k-item"); //treeView 모든 노드 열림

            })
        })

        $("#message-write-group-tree-view").kendoTreeView({
            dataSource: [],
            dataTextField: "targetNm",
            autoScroll : true,
            checkboxes: {
                template: "<div style='display:flex;'>#if(item.targetValue.messageGroupId){#<span class='k-icon k-i-folder'></span> #}else if(item.targetValue.userId){# <span class='k-icon k-i-user'></span> #}#<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' /></div>",
                checkChildren: true,
            },
            check : (e) => {
                let checkedNodes = []; //자신의 treeView로 check할 때까지는 check이벤트에서 checkedNodes 는 빈 배열로 나오지만 check이벤트 밖에서 getTreeCheckedItems 하면 정상적으로 체크된 데이터 출력
                const thisTreeView = e.sender;
                const agentTreeView = $("#message-write-agent-tree-view").data("kendoTreeView");

                writeMessageSetting.getTreeCheckedItems(thisTreeView.dataSource.view(), checkedNodes);
                if($(e.node).attr("aria-checked") === "false"){
                    //checkbox 뺄 때
                    if(thisTreeView.dataItem(e.node).targetValue.messageGroupId){
                        //뺀 체크박스가 그룹인 경우
                        writeMessageSetting.setGroupTreeCheckItems(thisTreeView.dataItem(e.node).items, thisTreeView);
                        writeMessageSetting.setGroupTreeCheckItems(thisTreeView.dataItem(e.node).items, agentTreeView);
                    }else{
                        const nodeArr = [thisTreeView.dataItem(e.node)];
                        writeMessageSetting.setGroupTreeCheckItems(nodeArr, thisTreeView);
                        writeMessageSetting.setGroupTreeCheckItems(nodeArr, agentTreeView);
                    }
                }else{
                    writeMessageSetting.setTreeCheckItems(checkedNodes, thisTreeView); //다른 그룹의 같은 대상자 check
                    writeMessageSetting.setTreeCheckItems(checkedNodes, agentTreeView); //조직 treeView 체크박스 true인 체크박스 연동
                }

                writeMessageSetting.senderListSetting(); //수신자 list 렌더링
            }
        })

        writeMessageSetting.groupTreeViewDataSetting();
    },
    /**
     * 조직 수신자 및 그룹 대상 트리 구조 make
     */
    messageTargetMakeTree : (deptDatas, userDatas) =>{
        deptDatas.forEach((deptData) => {
            deptData.expanded = true;
            deptData.targetNm = deptData.deptNm;
            deptData.targetValue = {deptId : deptData.deptId};
            if(!!deptData.items){
                //부서의 하위부서가 있을경우 재귀함수 호출
                writeMessageSetting.messageTargetMakeTree(deptData.items, userDatas);
            }

            userDatas.forEach((userData) => {
                if(userData.deptId === deptData.deptId){
                    //사용자가 해당 부서에 속한 경우
                    if(deptData.items === undefined){
                        //부서의 하위계층이 없을 경우 생성
                        deptData.items = [];
                    }
                    deptData.items.push(userData);
                }
            })
        })
        return deptDatas;
    },

    /**
     * 그룹 수신자 treeView make
     */
    messageGroupTargetMakeTree : (groupDatas, userDatas) =>{
        groupDatas.forEach((groupData) => {
            groupData.targetNm = groupData.messageGroupNm;
            groupData.targetValue = {messageGroupId : groupData.messageGroupId};

            userDatas.forEach((userData) => {
                if(userData.messageGroupId === groupData.messageGroupId){
                    //사용자가 해당 그룹에 속한 경우
                    if(groupData.items === undefined){
                        //그룹의 하위계층이 없을 경우 생성
                        groupData.items = [];
                    }
                    groupData.items.push(userData);
                }
            })
        })
        return groupDatas;
    },

    /**
     * treeView에 체크된 node 저장
     * @param nodes 현 level node
     * @param checkedNodes 체크된 node 저장
     */
    getTreeCheckedItems : (nodes, checkedNodes) => {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) {
                checkedNodes.push(nodes[i]);
            }

            if (nodes[i].hasChildren) {
                writeMessageSetting.getTreeCheckedItems(nodes[i].children.view(), checkedNodes);
            }
        }
    },

    setTreeCheckItems : (checkedUsers, treeView) => {

        checkedUsers.forEach((user)=>{
            if(!!user.userNm){
                const findUser = treeView.findByText(user.userNm);
                if(findUser.length > 1){
                    //체크 해야하는 대상 중 같은 이름이 존재하는 경우
                    for(let i = 0; i < findUser.length; i++){
                        if(treeView.dataItem(findUser[i]).userId === user.userId){
                            //같은 이름 중에 현재 체크 대상인 대상자만 check
                            treeView.dataItem(findUser[i]).set("checked", true);
                        }
                    }
                }else{
                    if(findUser.length !== 0) treeView.dataItem(findUser).set("checked", true);
                }
            }
        })
    },

    //TreeView 체크박스 뺄 때 동일한 userId도 같이
    setGroupTreeCheckItems : (checkedUsers, treeView) => {
        checkedUsers.forEach((user)=> {
            if (!!user.userNm) {
                const findUser = treeView.findByText(user.userNm);
                if (findUser.length > 1) {
                    //체크를 빼야하는 대상 중 같은 이름이 존재하는 경우
                    for (let i = 0; i < findUser.length; i++) {
                        if (treeView.dataItem(findUser[i]).userId === user.userId) {
                            treeView.dataItem(findUser[i]).set("checked", false);
                        }
                    }
                } else {
                    if(findUser.length !== 0)treeView.dataItem(findUser).set("checked", false);
                }
            }
        })
    },

    saveMessageGroup : () => {
        let checkedNodes = [];
        let groupIds = '';
        let groupIdsCount = 0;
        const treeView = $("#message-write-group-drop-down-tree").data("kendoDropDownTree");
        writeMessageSetting.getTreeCheckedItems(treeView.dataSource.view(), checkedNodes);

        checkedNodes.forEach((node)=>{
            if(!!node.targetValue.userId){
                //체크된 node가 사용자인 경우
                groupIds += '`' + node.targetValue.userId;
                groupIdsCount += 1;
            }
        })

        groupIds = groupIds.substring(1, groupIds.length);

        const param = {
            messageGroupId : !!$("#message-group-id").val() ? Number($("#message-group-id").val()) : 0 , //신규 그룹일 경우 0
            messageGroupNm : $("#message-write-group-name").data("kendoTextBox").value(),
            messageGroupMemberCnt : groupIdsCount,
            messageGroupMemberIdList : groupIds,
        };
        
        const saveNoticeCallback = () => {
            const saveGroupDataSource = new cpDataSource(METHOD.POST, messageGroupInsertUrl, param).getDataSource();
            saveGroupDataSource.read().then(()=>{
                $("#message-write-group-grid").data("kendoCpGrid").dataSource.read();
                $("#message-write-group-name").data("kendoTextBox").value('');
                $("#message-write-group-drop-down-tree").siblings('.k-clear-value').trigger("click"); // dropdowntree clear
                $("#message-write-clear-btn").trigger("click"); //쪽지작성 card 초기화
                writeMessageSetting.groupTreeViewDataSetting(); //그룹 treeView 렌더링
                message.notification({msg:"지정되었습니다."})
            })
        }

        if(groupIds === ''){
            message.notification({msg:"대상을 선택해 주세요", type:'error'})
        }else{
            message.callBackConfirm({msg: "그룹으로 지정하시겠습니까?", callback: saveNoticeCallback});
        }
    },

    insertMessage : () => {
        let checkedNodes = [];
        let receiverIds = '';
        let receiverNms = '';
        let receiverIdsCount = 0;
        const treeView = $("#message-write-agent-tree-view").data("kendoTreeView");
        writeMessageSetting.getTreeCheckedItems(treeView.dataSource.view(), checkedNodes);

        checkedNodes.forEach((node)=>{
            if(!!node.userNm) {
                //체크된 node가 부서인 경우
                receiverNms += '`' + node.userNm;
            }
            if(!!node.targetValue.userId){
                //체크된 node가 사용자인 경우
                receiverIds += '`' + node.targetValue.userId;
                receiverIdsCount += 1;
            }
        })

        receiverNms = receiverNms.substring(1, receiverNms.length);
        receiverIds = receiverIds.substring(1, receiverIds.length);


        const param = {
            parentId : 0,
            contents : $("#message-write-contents").data("kendoTextArea").value(),
            receiverCnt : receiverIdsCount,
            messageReceiverIdList : receiverIds,
            messageReceiverNmList : receiverNms,
            description : '',
        };

        let uploadBadge = $($('#message-write-insert-file-btn').find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
            param.files = writeMessageSetting.writeFileUpload.getFileInfo();
        }

        const insertMessageCallback = () => {
            const insertMessageDataSource = new cpDataSource(METHOD.POST, messageInsertUrl, param).getDataSource();
            insertMessageDataSource.read().then(()=>{
                message.notification({msg:"쪽지를 전송하였습니다."})
                //초기화 버튼 trigger
                $("#message-write-clear-btn").trigger("click");
            })
        }

        if(receiverIds === ''){
            message.notification({msg:"대상을 선택해 주세요", type:'error'})
        }else{
            message.callBackConfirm({msg: "전송하시겠습니까?", callback: insertMessageCallback});
        }
    },
    
    //첫 화면, 그룹 삭제 및 추가 시 그룹 treeView 렌더링
    groupTreeViewDataSetting : () => {
        const memberParam = {
            messageGroupId : 0,
            parentId: 0,
            deptId: 0,
            outputYn: 'Y',
        }

        const groupMember = new cpDataSource(METHOD.GET, messageGroupMemberSelectUrl, memberParam).getDataSource();
        const groupData = new cpDataSource(METHOD.GET, messageGroupSelectUrl, {}).getDataSource();

        groupData.read().then(()=>{
            groupMember.read().then(()=>{
                let groupUser = groupMember.data();

                groupUser = groupUser.map((target)=>{
                    target.targetNm = target.userNm;
                    target.targetValue = {userId : target.userId};
                    return target;
                });

                const treeViewDataSource =  writeMessageSetting.messageGroupTargetMakeTree(groupData.data(), groupUser);

                $("#message-write-group-tree-view").data("kendoTreeView").setDataSource(treeViewDataSource);
                $("#message-write-group-tree-view").data("kendoTreeView").expand(".k-item"); //treeView 모든 노드 열림

            })
        })
    },

    //수신자 list 렌더링
    senderListSetting : () => {
        let checkedNodes = [];
        let chipListTags = $("<div>");
        const treeView = $("#message-write-agent-tree-view").data("kendoTreeView");
        writeMessageSetting.getTreeCheckedItems(treeView.dataSource.view(), checkedNodes);

        checkedNodes.forEach((checkedNode) => {
            if(!!checkedNode.targetValue.userId) chipListTags.append(`<span class="k-chip k-rounded-md k-chip-solid-base" style="margin: 2px;"><span class="k-chip-content">${checkedNode.userNm}</span></span>`);
        })

        $("#message-write-sender-list-div").html(chipListTags);
    },

    calcContentByteLength : () => {
        const contents = $("#message-write-contents").val();
        let cutString = writeMessageSetting.smsContentsSet(contents);
        $("#message-write-contents").val(cutString);
        $("#message-write-contents-bytes").html("[" + byteCheck(cutString) + " / 4000] Bytes")
    },

    smsContentsSet : (contents) =>{
        let str = contents;
        let sstr = '';
        for (let i=0; i<=str.length; i++) {
            if (byteCheck(str.substring(0,i)) > 4000) return sstr;
            sstr = str.substring(0,i);
        }
        return str;
    },
};

const messageUtilsFunc = {
    commonGridSelectClick : (thisObject, gridId, checkedItems, checkAllId) => {
        const checked = thisObject.checked;
        const row = $(thisObject).closest("tr");
        const grid = $(gridId).data("kendoCpGrid");
        const dataItem = grid.dataItem(row);
        checkedItems[dataItem.id] = {data : dataItem, checked : checked};
        if (checked) {
            row.addClass("k-state-selected");
            let checkHeader = true;

            $.each(grid.items(), function (index, item) {
                if (!($(item).hasClass("k-state-selected"))) {
                    checkHeader = false;
                }
            });
            $(checkAllId)[0].checked = checkHeader;
        } else {
            row.removeClass("k-state-selected");
            $(checkAllId)[0].checked = false;
        }
        return checkedItems;
    },

    commonGridCheckAll : (checked, selectCheckClass) => {
        $(selectCheckClass).each(function (idx, item) {
            if (checked) {
                if (!($(item).closest('tr').is('.k-state-selected'))) {
                    $(item).click();
                }
            } else {
                if ($(item).closest('tr').is('.k-state-selected')) {
                    $(item).click();
                }
            }
        });
    },

    //다른 grid page에 대한 체크여부 (callId required)
    commonGridDataBound : (e, checkedItems) => {
        const view = e.sender.dataSource.view();
        for (var i = 0; i < view.length; i++) {
            if (checkedItems[view[i].id] && checkedItems[view[i].id].checked) {
                e.sender.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".k-checkbox-md")
                    .attr("checked", "checked");
            }
        }
    },

    commonAttachFile : (messageId, buttonId) => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: 'MESSAGE',
            srcId2: messageId,
        }).getDataSource();

        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $(buttonId).kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            $(buttonId).kendoPopover({
                showOn: 'click',
                header: '첨부파일',
                body: function () {
                    let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                    data.forEach(r => {
                        result += `
                                <div style="display: flex; align-items: center;">
                                  <div id="message-file-down-${r.fileUuid}" title="${r.fileNm}" style="cursor: pointer;">
                                    <span style="font-size: 30px;" class="k-icon k-i-file"></span>
                                    <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${r.fileUuid}" value="${r.fileNm}" disabled />
                                     </div>`;
                        result += `</div> <br />`;
                    })
                    result += '</div>'
                    return result;
                },
                actionsLayout: 'center',
                height: 300,
                width: 300,
                position: POSITION.TOP,
                show : () => {
                    data.forEach(r => {
                        $(`#message-file-down-${r.fileUuid}`).unbind("click");
                        $(`#message-file-down-${r.fileUuid}`).on("click", () => {messageUtilsFunc.messageFileDownload(r)});
                    })
                }
            });
        });
    },

    messageFileDownload: (r) => {
        cpFileDown(r.fileUuid);
    },

    messageReceiverPopover : (receivers) => {
        const receiversArr = receivers.split(", ");
        receiversArr.splice(receiversArr.indexOf(USER_INFO.userNm), 1); //자기 자신 제외

        if(receiversArr.length  < 1){
            $("#message-receive-detail-info").hide();
        }else{
            $("#message-receive-detail-info").show();
            $("#message-receive-detail-info").kendoPopover({
                showOn: "mouseenter",
                position: "right",
                animation: false,
                width: "320px",
                height: "auto",
                body: function () {
                    let result = `<div>`;
                    let resultLength = "";
                    receiversArr.forEach((item) => {
                        if(resultLength.length > 25){
                            result += `<br>`;
                            resultLength = "";
                        }
                        result += item + ", ";
                        resultLength = item + ", ";
                    })
                    result = result.substring(0, result.length -2);
                    result += `</div>`
                    return result;
                }
            });
        }

    }

}

//쪽지에서 사용되는 grid
const messageGridSetting = {
    groupGrid : {
        groupCheckedItems : [],

        drawGrid : () => {
            $("#message-write-group-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='group-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md group-check'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width:50,
                    },
                    {
                        field: "messageGroupNm",
                        title: "쪽지그룹",
                        attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                    },
                    {
                        field: "messageGroupMemberCnt",
                        title: "사용자",
                        width: 80,
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: messageDataSource.groupSelectDataSource(),
                change: (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    $("#message-write-group-name").data("kendoTextBox").value(selectRows.messageGroupNm);
                    $("#message-group-id").val(selectRows.messageGroupId);

                    const param = {
                        messageGroupId : selectRows.messageGroupId,
                        parentId: 0,
                        deptId: 0,
                        outputYn: 'Y',
                    }

                    const groupMember = new cpDataSource(METHOD.GET, messageGroupMemberSelectUrl, param).getDataSource();
                    groupMember.read().then(()=>{
                        const memberItems = groupMember.data();
                        $("#message-write-group-drop-down-tree").siblings('.k-clear-value').trigger("click"); // dropdowntree clear
                        const treeView = $("#message-write-group-drop-down-tree").data("kendoDropDownTree").treeview;
                        writeMessageSetting.setTreeCheckItems(memberItems, treeView); //그룹에 속한 사용자들 check
                    })
                },
                height: "100%",
                resizable: false,
                selectable: true,
            }).on("click", ".group-check", function (e) {
                messageGridSetting.groupGrid.groupCheckedItems = messageUtilsFunc.commonGridSelectClick(
                    this,
                    "#message-write-group-grid",
                    messageGridSetting.groupGrid.groupCheckedItems,
                    "#group-check-all"
                );
            }).on("change", "#group-check-all", (e) => {
                const checked = e.target.checked;
                messageUtilsFunc.commonGridCheckAll(checked, '.group-check');
            });
        }
    },

    receivePageGrid : {
        receiveCheckedItems : [],
        searchParam : {},

        drawGrid : () => {
            $("#message-receive-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='receive-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md receive-check'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width:50,
                    },
                    {
                        field: "importanceRcv",
                        title: "중요",
                        width:70,
                        attributes: {style: 'text-align:center'},
                        template: function (data) {
                            if (data.importanceRcv === 'N') {
                                return '<span class="bi bi-star"></span>';
                            } else if (data.importanceRcv == 'Y') {
                                return '<span class="bi bi-star-fill" style="color:orange;"></span>';
                            }else{
                                return ''
                            }
                        },
                    },
                    {
                        field: "contents",
                        title: "내용",
                        attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                        template: function (data) {
                            let contents = "";
                            if(data.rcvOpenYn === "N"){
                                contents += `<span style="margin-right:5px; color : red;" class="bi-exclamation-circle" id="new-${data.messageId}"></span>`
                            }
                            if (data.fileYn === 'N') {
                                contents += `<span>${data.contents}</span>`;
                            }else if (data.fileYn == 'Y') {
                                contents += `<span class="k-badge k-badge-solid k-badge-md k-badge-rounded k-badge-inline" style="width:25px; height: 25px; margin-right: 5px;">
                                            <span class="k-icon k-i-floppy"></span>
                                        </span>
                                        <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${data.contents}</span>`;
                            }
                            return contents;
                        },
                    },
                    {
                        field: "rgtrNm",
                        title: "발신자",
                        width: 100,
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "regDt",
                        title: "발신일시",
                        width: 150,
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: messageDataSource.receiveSelectDataSource(),
                page : (e) => {
                    isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                    $("#receive-check-all").prop("checked", false); //check all checkbox 빼기
                },
                dataBound : (e) => {
                    messageUtilsFunc.commonGridDataBound(e, messageGridSetting.receivePageGrid.receiveCheckedItems);
                },
                click : (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];

                    $("#message-receive-select-message-id").val(selectRows.messageId);
                    $("#message-receive-select-message-rgtr-id").val(selectRows.rgtrId);
                    $("#message-receive-select-message-rgtr-nm").val(selectRows.rgtrNm);
                    $("#message-receive-detail-receive-contents").data("kendoTextArea").value(selectRows.contents);

                    //--------------파일 업로드 태그 삭제 후 재생성--------------
                    receiveMessageSetting.receiveFileUpload = new cpUpload();
                    $("#message-receive-detail-insert-file-btn").remove();
                    const div = $(`<div id="message-receive-detail-insert-file-btn"></div>`);
                    $("#message-receive-detail-send-btn-div").prepend(div);
                    receiveMessageSetting.receiveFileUpload.createBadge('message-receive-detail-insert-file-btn');
                    //----------------------------------------------------------------------
                    //첨부파일
                    if($("#message-receive-detail-file-list-btn").data("kendoPopover") !== undefined){
                        //show를 해야 popOver가 생성, 이후 destroy
                        $("#message-receive-detail-file-list-btn").data("kendoPopover").show();
                        $("#message-receive-detail-file-list-btn").data("kendoPopover").destroy();
                    }
                    messageUtilsFunc.commonAttachFile($("#message-receive-select-message-id").val(),"#message-receive-detail-file-list-btn");

                    //쪽지 확인
                    const readInsert = new cpDataSource(METHOD.GET,`/board/v1/message/read/insert/${selectRows.messageId}`).getDataSource();
                    readInsert.read();

                    if(selectRows.importanceRcv === "N"){
                        $("#message-receive-detail-importance-ok-btn").show();
                        $("#message-receive-detail-importance-del-btn").hide();
                    }else if(selectRows.importanceRcv === "Y"){
                        $("#message-receive-detail-importance-ok-btn").hide();
                        $("#message-receive-detail-importance-del-btn").show();
                    }
                    if($("#message-receive-detail-info").data("kendoPopover") !== undefined){
                        $("#message-receive-detail-info").data("kendoPopover").show();
                        $("#message-receive-detail-info").data("kendoPopover").destroy();
                    }
                    if(selectRows.openYn === "N"){
                        //선택한 쪽지가 처음 여는 경우
                        $(`#new-${selectRows.messageId}`).hide();
                    }
                    messageUtilsFunc.messageReceiverPopover(selectRows.messageReceiverNmList);
                    receiveMessageSetting.detailOpen();
                },
                height: "100%",
                resizable: false,
                selectable: true,
                pageable: {
                    refresh: true
                },
            }).on("click", ".receive-check", function (e) {
                messageGridSetting.receivePageGrid.receiveCheckedItems = messageUtilsFunc.commonGridSelectClick(
                    this,
                    "#message-receive-grid",
                    messageGridSetting.receivePageGrid.receiveCheckedItems,
                    "#receive-check-all"
                );
            }).on("change", "#receive-check-all", (e) => {
                const checked = e.target.checked;
                messageUtilsFunc.commonGridCheckAll(checked, '.receive-check');
            });
        }
    },

    sendPageGrid : {
        sendCheckedItems : [],
        searchParam : {},

        drawGrid : () => {
            $("#message-send-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='send-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md send-check'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width:50,
                    },
                    {
                        field: "importanceSnd",
                        title: "중요",
                        width:70,
                        attributes: {style: 'text-align:center'},
                        template: function (data) {
                            if (data.importanceSnd === 'N') {
                                return '<span class="bi bi-star"></span>';
                            } else if (data.importanceSnd == 'Y') {
                                return '<span class="bi bi-star-fill" style="color:orange;"></span>';
                            }else{
                                return ''
                            }
                        },
                    },
                    {
                        field: "contents",
                        title: "내용",
                        attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                        template: function (data) {
                            if (data.fileYn === 'N') {
                                return `<span>${data.contents}</span>`;
                            }else if (data.fileYn == 'Y') {
                                return `<span class="k-badge k-badge-solid k-badge-md k-badge-rounded k-badge-inline" style="width:25px; height: 25px; margin-right: 5px;">
                                            <span class="k-icon k-i-floppy"></span>
                                        </span>
                                        <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${data.contents}</span>`;
                            }
                        },
                    },
                    {
                        field: "receiverList",
                        title: "수신자",
                        width: 120,
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "regDt",
                        title: "발신일시",
                        width: 150,
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: messageDataSource.sendSelectDataSource(),
                page : (e) => {
                    isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                    $("#send-check-all").prop("checked", false); //check all checkbox 빼기
                },
                dataBound : (e) => {
                    messageUtilsFunc.commonGridDataBound(e, messageGridSetting.sendPageGrid.sendCheckedItems);
                },
                click : (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    $("#message-send-select-message-id").val(selectRows.messageId);
                    $("#message-send-detail-send-contents").data("kendoTextArea").value(selectRows.contents);

                    //첨부파일
                    if($("#message-send-detail-file-list-btn").data("kendoPopover") !== undefined){
                        //show를 해야 popOver가 생성, 이후 destroy
                        $("#message-send-detail-file-list-btn").data("kendoPopover").show();
                        $("#message-send-detail-file-list-btn").data("kendoPopover").destroy();
                    }
                    messageUtilsFunc.commonAttachFile($("#message-send-select-message-id").val(),"#message-send-detail-file-list-btn");

                    //수신자 리스트 grid set data
                    const receiverList = new cpDataSource(METHOD.GET,`/board/v1/message/select/rcv/${selectRows.messageUuid}`).getDataSource();
                    receiverList.read().then(()=>{
                        let datas = receiverList.data();
                        datas.forEach((data)=>{
                            if(data.openYn === 'Y'){
                                data.openDt = kendo.toString(new Date(data.openDt), "yyyy-MM-dd HH:mm");
                            }else{
                                data.openDt = "";
                            }

                        })
                        $('#message-send-receiver-list-grid').data('kendoCpGrid').dataSource.data(datas);
                    })

                    if(selectRows.importanceSnd === "N"){
                        $("#message-send-detail-importance-ok-btn").show();
                        $("#message-send-detail-importance-del-btn").hide();
                    }else if(selectRows.importanceSnd === "Y") {
                        $("#message-send-detail-importance-ok-btn").hide();
                        $("#message-send-detail-importance-del-btn").show();
                    }

                    sendMessageSetting.detailOpen();
                },
                height: "100%",
                resizable: false,
                selectable: true,
                pageable: {
                    refresh: true
                },
            }).on("click", ".send-check", function (e) {
                messageGridSetting.sendPageGrid.sendCheckedItems = messageUtilsFunc.commonGridSelectClick(
                    this,
                    "#message-send-grid",
                    messageGridSetting.sendPageGrid.sendCheckedItems,
                    "#send-check-all"
                );
            }).on("change", "#send-check-all", (e) => {
                const checked = e.target.checked;
                messageUtilsFunc.commonGridCheckAll(checked, '.send-check');
            });
        }
    },

    receiverListGrid : {
        drawGrid : () => {
            $("#message-send-receiver-list-grid").kendoCpGrid({
                editable: false,
                resizable: false,
                height: "85%",
                columns: [
                    {field: 'fullDeptNm', title: '부서',  attributes: {class: 'k-text-center'}},
                    {field: 'userNm', title: '수신자',  attributes: {class: 'k-text-center'}},
                    {field: 'openDt', title: '수신일시', attributes: {class: 'k-text-center'}}
                ]
            })
        },
    },

};


const messageDataSource = {
    groupSelectDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : messageGroupSelectUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },
            },
            schema: {
                data : 'data',
                model : {
                    id : "messageGroupId",
                },
                parse : (res) => {
                    res.data.forEach((data)=>{
                        data.messageGroupMemberCnt = data.messageGroupMemberCnt + '명'
                    })
                    return res;
                }
            },
        })
    },

    receiveSelectDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : messagePageSelectUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : () => {
                        if(messagePage.isSearchBtn){
                            messagePage.isSearchBtn = false;
                            message.notification({type:"info"});
                        }
                    },
                },
                parameterMap : (options) =>{
                    if(isMessageReadType){
                        const param = {
                            startDate: kendo.toString($("#message-receive-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            endDate : kendo.toString($("#message-receive-search-date-end").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            type : "Rcv",
                            searchType : $("#message-receive-search-drop-down-list").data("kendoDropDownList").value(),
                            searchTxt : $("#message-receive-search-textbox").data("kendoTextBox").value(),
                            importance : $("#message-receive-importance-drop-down-list").data("kendoDropDownList").value(),
                            sortType: '',
                            outputYn : "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        };

                        messageGridSetting.receivePageGrid.searchParam = {...param};

                        return param;
                    }else{
                        messageGridSetting.receivePageGrid.searchParam.page = options.page;
                        messageGridSetting.receivePageGrid.searchParam.pageSize = options.pageSize;
                        return messageGridSetting.receivePageGrid.searchParam;
                    }

                }
            },
            schema: {
                data : 'data.rows',
                total : 'data.totalCount',
                model : {
                    id : "messageId",
                },
                parse : (res) => {
                    res.data.rows.forEach((row)=>{
                        row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd HH:mm");
                    })

                    messageGridSetting.receivePageGrid.receiveCheckedItems = [];
                    $("#receive-check-all").prop("checked", false); //check all checkbox 빼기
                    return res;
                }
            },
            serverPaging: true,
            pageSize : DEFAULT_PAGE_SIZE
        })
    },

    sendSelectDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : messagePageSelectUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : () => {
                        if(messagePage.isSearchBtn){
                            messagePage.isSearchBtn = false;
                            message.notification({type:"info"});
                        }
                    },
                },
                parameterMap : (options) =>{
                    if(isMessageReadType){
                        const param = {
                            startDate: kendo.toString($("#message-send-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            endDate : kendo.toString($("#message-send-search-date-end").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            type : "Snd",
                            searchType : $("#message-send-search-drop-down-list").data("kendoDropDownList").value(),
                            searchTxt : $("#message-send-search-textbox").data("kendoTextBox").value(),
                            importance : $("#message-send-importance-drop-down-list").data("kendoDropDownList").value(),
                            sortType: '',
                            outputYn : "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        };

                        messageGridSetting.sendPageGrid.searchParam = {...param};

                        return param;
                    }else{
                        messageGridSetting.sendPageGrid.searchParam.page = options.page;
                        messageGridSetting.sendPageGrid.searchParam.pageSize = options.pageSize;
                        return messageGridSetting.sendPageGrid.searchParam;
                    }
                }
            },
            schema: {
                data : 'data.rows',
                total : 'data.totalCount',
                model : {
                    id : "messageId",
                },
                parse : (res) => {
                    res.data.rows.forEach((row)=>{
                        row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd HH:mm");
                        let receiverList = row.messageReceiverNmList.split(',');
                        if(receiverList.length -1 === 0) {
                            row.receiverList = receiverList[0];
                        }else{
                            row.receiverList = receiverList[0] + ' 외 ' + (receiverList.length -1) + ' 명';
                        }
                    })
                    messageGridSetting.sendPageGrid.sendCheckedItems = [];
                    $("#send-check-all").prop("checked", false); //check all checkbox 빼기
                    return res;
                }
            },
            serverPaging: true,
            pageSize : DEFAULT_PAGE_SIZE
        })
    }
}

cpProgress('message-layout');
messagePage.init().then(()=>{
    cpProgress('message-layout', false);
});

});