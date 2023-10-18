const noticeDeptUserSelectUrl = "/board/v1/notice/dept/user/select";
const noticeBoardInsertUrl = "/board/v1/notice/insert";
const noticeBoardUpdateUrl = "/board/v1/notice/update";
const noticeEditorUrl = new URLSearchParams(window.location.search);
const hasUuid = noticeEditorUrl.get('docUuid');
const noticeEditorFile = new cpUpload();

const noticeEditor = {
    init :async () => {
        await noticeEditorSetting.widgetSetting();
        if(hasUuid){
            //등록이 아닌 수정인 경우
            $(document).attr("title","공지사항 수정");
            await noticeEditorUpdateSetting.updateDataBinding();
            noticeEditorFileObj.attachFile();
        }else{
            $(document).attr("title","공지사항 등록");
            $('#notice-editor-file-list-btn').hide(); //첨부파일 버튼
        }
    }
}

const noticeEditorSetting = {
    widgetSetting :async () => {
        $('#notice-editor-splitter').kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '80px', resizable: false }
            ]
        });

        $('#notice-editor-popup-title').text('공지사항 등록');

        $('#notice-editor-title').kendoTextBox();

        new CpEditor('notice-editor-editor').create();

        $("#notice-editor-editor").data("kendoEditor").bind("keyup", () => {
            $("#notice-editor-splitter").find(".k-editable-area").css("border", "none");
        })

        const noticeImportance =  new cpDataSource(METHOD.GET, "/common/v1/code/DocImportance", {}).getDataSource();
        await noticeImportance.read().then(()=>{
            let radioItem = [];

            noticeImportance.data().forEach((e) =>{
                let items = {};
                items.value = e.codeKey;
                items.label = e.codeNm;
                radioItem.push(items);
            })
            $("#notice-editor-importance-radio-group").kendoRadioGroup({
                items: radioItem,
                value: "Normal",
                layout: "horizontal"
            });
        })


        noticeEditorFile.createBadge('notice-editor-btn-upload-file');

        $("#notice-editor-target-drop-down-tree").kendoDropDownTree({
            placeholder : "공지대상 선택...",
            dataSource: [],
            dataTextField: "targetNm",
            autoClose: false,
            checkboxes: {
                template: "<div style='display:flex;'>#if(item.targetValue.deptId){#<span class='k-icon k-i-folder'></span> #}else if(item.targetValue.userId){# <span class='k-icon k-i-user'></span> #}#<input type='checkbox' name='checkedFiles[#= item.id #]' value='true' /></div>",
                checkChildren: true,
            },
        })

        const param ={
            docId : 0,
            parentId : 1, //콜센터
            deptId : 0,
            useYn : 'Y',
            delYn : 'N',
            outputYn : 'Y',
            sortType : ''
        };

        const deptData = new cpDataSource(METHOD.GET, `/common/v1/dept-all?deptId=1`).getDataSource();//deptId 1 -> 콜센터
        const userData = new cpDataSource(METHOD.GET, noticeDeptUserSelectUrl, param).getDataSource();
        deptData.read().then(()=>{
            userData.read().then(()=>{
                let noticeTargetUser = userData.data();
                noticeTargetUser = noticeTargetUser.map((target)=>{
                    delete target.checked;
                    target.targetNm = target.userNm;
                    target.targetValue = {userId : target.userId};
                    return target;
                })

                let dataSource = new kendo.data.HierarchicalDataSource({
                    data : noticeEditorSetting.noticeTargetMakeTree(deptData.data(), noticeTargetUser)
                });
                $("#notice-editor-target-drop-down-tree").data("kendoDropDownTree").setDataSource(dataSource);
            })
        })

        $('#notice-editor-file-list-btn').kendoButton({});

        $('#notice-editor-validator').kendoValidator({
            errorTemplate: "",
            rules:{
                required : (input)=>{

                    if(input.is("[name=notice-editor-title]")){
                        return input.data("kendoTextBox").value() !== "";
                    }

                    if(input.is("[name=notice-editor-editor]")) {
                        if(input.data("kendoEditor").value() === ""){
                            $("#notice-editor-splitter").find(".k-editable-area").css("border", "1px solid red");
                            return false;
                        }else{
                            $("#notice-editor-splitter").find(".k-editable-area").css("border", "none");
                            return true;
                        }
                    }
                    return true;
                },
            },
            messages:{
                required : (input)=>{
                    return "";
                },
            }
        })

        $('#notice-editor-btn-save').kendoButton({
            themeColor: 'primary',
            click: () => {
                const valid = $("#notice-editor-validator").data("kendoValidator");
                if(!valid.validate()){
                    return;
                }

                if (hasUuid) {
                    noticeEditorFunc.updateNotice();
                } else {
                    noticeEditorFunc.insertNotice();
                }

            }
        });
    },

    /**
     * targetNm -> treeView의 textField, targetValue -> treeView에서 부서(targetValue.deptId)와 사용자(targetValue.userId) 구분
     * @param deptDatas 부서 data
     * @param userDatas 유저 data
     * @returns {*}
     */
    noticeTargetMakeTree : (deptDatas, userDatas) => {
        deptDatas.forEach((deptData) => {
            deptData.expanded = true;
            deptData.targetNm = deptData.deptNm;
            deptData.targetValue = {deptId : deptData.deptId};
            if(!!deptData.items){
                //부서의 하위부서가 있을경우 재귀함수 호출
                noticeEditorSetting.noticeTargetMakeTree(deptData.items, userDatas);
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
     * treeView에 체크된 node 저장
     * @param nodes 현 level node
     * @param checkedNodes 체크된 node 저장
     */
    getTreeViewCheckedItems : (nodes, checkedNodes) => {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) {
                checkedNodes.push(nodes[i]);
            }

            if (nodes[i].hasChildren) {
                noticeEditorSetting.getTreeViewCheckedItems(nodes[i].children.view(), checkedNodes);
            }
        }
    },
};

const noticeEditorUpdateSetting = {
    updateDataBinding :async () => {
        $('#notice-editor-popup-title').text('공지사항 수정');

        const param = {
            docUuid : noticeEditorUrl.get("docUuid"),
            loginUserId : USER_INFO.userId
        };
        const noticeSelectItem =  new cpDataSource(METHOD.GET, `/board/v1/notice/select/item`, param).getDataSource();
        await noticeSelectItem.read().then(()=>{
            const item = noticeSelectItem.data()[0];
            $("#notice-editor-doc-id").val(item.docId);
            $("#notice-editor-title").data("kendoTextBox").value(item.docNm);
            $("#notice-editor-editor").data("kendoEditor").value(item.html);
            $("#notice-editor-importance-radio-group").data("kendoRadioGroup").value(item.importance);

            const param ={
                docId : Number($("#notice-editor-doc-id").val()),
                parentId : 1, //콜센터
                deptId : 0,
                useYn : 'Y',
                delYn : 'N',
                outputYn : 'Y',
                sortType : ''
            };
            const userCheckData = new cpDataSource(METHOD.GET, noticeDeptUserSelectUrl, param).getDataSource();
            userCheckData.read().then(()=>{
                noticeEditorUpdateSetting.setTreeViewCheckItems(userCheckData.data());
            })

        })
    },

    setTreeViewCheckItems : (checkedUsers) => {
        const treeView = $("#notice-editor-target-drop-down-tree").data("kendoDropDownTree").treeview;

        checkedUsers.forEach((user)=>{
            if(!!user.userNm && user.checked === "Y"){
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
                    treeView.dataItem(findUser).set("checked", true);
                }
            }
        })
    }
};

const noticeEditorFileObj = {
    deleteFileIds : [],

    attachFile : () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: 'Notice',
            srcId2: $("#notice-editor-doc-id").val(),
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $('#notice-editor-file-list-btn').kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            if (data.length > 0) {
                $('#notice-editor-file-list-btn').kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function (e) {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `<div style="display: flex; align-items: center;"><div style="cursor: pointer;" onclick="noticeEditorFileObj.noticeEditorFileDownload(this)" title="${data[i].fileNm}"><span style="font-size: 30px;" class="k-icon k-i-file"></span>
                            <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${data[i].fileUuid}" value="${data[i].fileNm}" disabled />
                            </div><div style="cursor: pointer; margin-left: 5px;" class="k-icon k-i-close" value="${data[i].fileId}" onclick="noticeEditorFileObj.noticeEditorFileDelete(this)"></div></div><br />`;
                            result += file;
                        }
                        result += '</div>'
                        return result;
                    },
                    actionsLayout: 'center',
                    height: 300,
                    width: 300,
                    position: POSITION.TOP
                });

            }
        });
    },

    noticeEditorFileDownload : (e) => {
        cpFileDown(e.childNodes[2].id);
    },

    noticeEditorFileDelete : (e) => {
        noticeEditorFileObj.deleteFileIds.push(Number($(e).attr("value")));
        $(e).parent().next().remove(); //<br /> 태그 제거
        $(e).parent().remove(); //file div 태그 제거

        //제거한 개수 뱃지에 반영
        const fileCount =  Number($('#notice-editor-file-list-btn').data("kendoButton").badge.text())
        $('#notice-editor-file-list-btn').data("kendoButton").badge.text(fileCount-1);
    }
};

const noticeEditorFunc = {
    insertNotice : () => {
        let checkedNodes = [];
        let receiverIds = '';
        let receiverIdsCount = 0;
        let receiverDeptIds = '';
        let receiverDeptIdsCount = 0;
        const treeView = $("#notice-editor-target-drop-down-tree").data("kendoDropDownTree");
        noticeEditorSetting.getTreeViewCheckedItems(treeView.dataSource.view(), checkedNodes);


        checkedNodes.forEach((node)=>{
            if(!!node.targetValue.deptId){
                //체크된 node가 부서인 경우
                receiverDeptIds += '`' + node.targetValue.deptId;
                receiverDeptIdsCount += 1;
            }else if(!!node.targetValue.userId){
                //체크된 node가 사용자인 경우
                receiverIds += '`' + node.targetValue.userId;
                receiverIdsCount += 1;
            }
        })

        receiverDeptIds = receiverDeptIds.substring(1, receiverDeptIds.length);
        receiverIds = receiverIds.substring(1, receiverIds.length);

        const param = {
            cabinetCd : "Notice",
            parentId : 0,
            deptId : 1,
            chargeId : 0,
            workType : '',
            noticeYn : 'Y',
            noticeScope : '',
            receiverIdList : receiverIds,
            receiverCnt : receiverIdsCount,
            receiverDeptIdList : receiverDeptIds,
            receiverDeptCnt : receiverDeptIdsCount,
            importance : $("#notice-editor-importance-radio-group").data("kendoRadioGroup").value(),
            docNm : $("#notice-editor-title").data("kendoTextBox").value(),
            contents : $('#notice-editor-editor').data('kendoEditor').value().replace(/(<([^>]+)>)/gi,""),
            html: $('#notice-editor-editor').data('kendoEditor').value(),
        };

        let uploadBadge = $($('#notice-editor-btn-upload-file').find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
            param.files = noticeEditorFile.getFileInfo();
        }

        const saveNoticeCallback = () => {
            const saveNoticeDataSource = new cpDataSource(METHOD.POST, noticeBoardInsertUrl, param).getDataSource();
            saveNoticeDataSource.read().then(()=>{
                opener.$('#notice-grid').data('kendoCpGrid').dataSource.read();
                window.close();
            })
        }

        if(receiverIds === ''){
            message.notification({msg:"대상을 선택해 주세요", type:'error'})
        }else{
            message.callBackConfirm({msg: "등록하시겠습니까?", callback: saveNoticeCallback});
        }
    },
    updateNotice : () => {

        let checkedNodes = [];
        let receiverIds = '';
        let receiverIdsCount = 0;
        let receiverDeptIds = '';
        let receiverDeptIdsCount = 0;
        const treeView = $("#notice-editor-target-drop-down-tree").data("kendoDropDownTree");
        noticeEditorSetting.getTreeViewCheckedItems(treeView.dataSource.view(), checkedNodes);

        checkedNodes.forEach((node)=>{
            if(!!node.targetValue.deptId){
                //체크된 node가 부서인 경우
                receiverDeptIds += '`' + node.targetValue.deptId;
                receiverDeptIdsCount += 1;
            }else if(!!node.targetValue.userId){
                //체크된 node가 사용자인 경우
                receiverIds += '`' + node.targetValue.userId;
                receiverIdsCount += 1;
            }
        })

        receiverDeptIds = receiverDeptIds.substring(1, receiverDeptIds.length);
        receiverIds = receiverIds.substring(1, receiverIds.length);

        const param = {
            docId : Number($("#notice-editor-doc-id").val()),
            deptId : 1,
            chargeId : 0,
            docUuid: noticeEditorUrl.get("docUuid"),
            workType : '',
            noticeYn : 'Y',
            noticeScope : '',
            receiverIdList : receiverIds,
            receiverCnt : receiverIdsCount,
            receiverDeptIdList : receiverDeptIds,
            receiverDeptCnt : receiverDeptIdsCount,
            importance : $("#notice-editor-importance-radio-group").data("kendoRadioGroup").value(),
            docNm : $("#notice-editor-title").data("kendoTextBox").value(),
            contents : $('#notice-editor-editor').data('kendoEditor').value().replace(/(<([^>]+)>)/gi,""),
            html: $('#notice-editor-editor').data('kendoEditor').value(),
        };

        let uploadBadge = $($('#notice-editor-btn-upload-file').find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
            param.files = noticeEditorFile.getFileInfo();
        }

        if(noticeEditorFileObj.deleteFileIds.length > 0){
            //삭제하고자 하는 파일이 존재하는 경우
            param.deleteFileIds = noticeEditorFileObj.deleteFileIds; //삭제할 파일 list
        }

        const saveNoticeCallback = () => {
            const saveNoticeDataSource = new cpDataSource(METHOD.PUT, noticeBoardUpdateUrl, param).getDataSource();
            saveNoticeDataSource.read().then(()=>{
                opener.opener.$('#notice-grid').data('kendoCpGrid').dataSource.read();
                window.close(); //공지사항 수정 close
                opener.window.close(); //상세보기 close
            })
        }

        if(receiverIds === ''){
            message.notification({msg:"대상을 선택해 주세요", type:'error'})
        }else{
            message.callBackConfirm({msg: "수정하시겠습니까?", callback: saveNoticeCallback});
        }
    },
};

cpProgress('notice-editor-layout');
noticeEditor.init().then(()=>{
    cpProgress('notice-editor-layout', false);
});