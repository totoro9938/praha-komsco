const manualEditorUrl = new URLSearchParams(window.location.search);
const hasUuid = manualEditorUrl.get('manualUuid');
let manualId;
let requestManualId;

const manualEditor = {
    init: () => {
        $('#manual-editor-splitter').kendoSplitter({
            orientation: "vertical",
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '160px', resizable: false }
            ]
        });

        $('#manual-editor-window-title').text('매뉴얼 등록');

        $('#manual-editor-title').kendoTextBox();

        new CpEditor('manual-editor-editor').create();

        $('#manual-editor-btn-save').kendoButton({
            themeColor: 'primary',
            click: () => {
                if (!manualEditorValidator.validate()) {
                    return;
                }

                if (hasUuid) {
                    //manualEditor.updateManual();
                    manualEditor.updateWindowInitOpen();
                } else {
                    manualEditor.insertManual();
                }
            }
        });

        $('#manual-editor-btn-delete').kendoButton({
            click: ()=> {
                message.callBackConfirm({msg: '삭제하시겠습니까?', callback: manualEditor.deleteManual});
            }
        });

        if(!hasUuid) {
            $('#manual-editor-btn-delete').hide();
        }

        $('#manual-editor-btn-attached-file').kendoButton();

        let manualEditorValidator = $('#manual-editor-validator').kendoValidator({
            rules: {
                rule: (input) => {
                    if (input.is("[name=manual-editor-title]")) {
                        return $('#manual-editor-title').data('kendoTextBox').value() !== '';
                    }
                    if (input.is("[name=manual-editor-editor]")) {
                        if(input.data("kendoEditor").value() === ""){
                            $("#manual-editor-splitter").find(".k-editable-area").css("border", "1px solid red");
                            return false;
                        }else{
                            $("#manual-editor-splitter").find(".k-editable-area").css("border", "none");
                            return true;
                        }
                    }
                    if (input.is("[name=manual-editor-agent]")) {
                        return $('#manual-editor-agent').data('kendoDropDownList').value() != 0;
                    }
                    if (input.is("[name=manual-editor-reason]")) {
                        if ($('#manual-editor-reason-box').is(':visible')) {
                            return $('#manual-editor-reason').data('kendoTextArea').value() !== '';
                        } else {
                            return true;
                        }
                    }
                    if (input.is('[name=manual-editor-consult-category]')) {
                        return $('#manual-editor-consult-category').data('kendoDropDownTree').value() !== '';
                    }
                    if (input.is("[name=manual-editor-department]")) {
                        return $('#manual-editor-department').data('kendoDropDownTree').value() !== '';
                    }
                    return true;
                },
                leaf: (input) => {
                    if (input.is("[name=manual-editor-consult-category]") ) {
                        if(input.data("kendoDropDownTree").value() !== ""){
                            let dropTree =input.data("kendoDropDownTree");
                            let selectItem = dropTree.treeview.select();
                            return !dropTree.dataItem(selectItem).hasChildren;
                        } else return false;
                    }

                    return true;
                }
            },
            errorTemplate : (e)=>{
                if(e.field === "manual-editor-consult-category"){
                    if(e.message !== ""){
                        let message = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 0% 0% 20%;">' +
                            e.message+'<div class="k-callout c-k-callout-n"></div></div>';
                        return message;
                    }
                }
            },
            messages:{
                required : ()=>{
                    return "";
                },
                leaf : (input) =>{
                    if(input.is("[name=manual-editor-consult-category]")){
                        if(input.data("kendoDropDownTree").value() !== ""){
                            return "마지막 단계까지 선택해 주세요."
                        }
                    }
                }
            }
        }).data('kendoValidator');
    },
    insertManual: () => {
        let content = $('#manual-editor-editor').data('kendoEditor').value().replace(/(<([^>]+)>)/gi,"");
        let telNo = $('#manual-editor-agent').data('kendoDropDownList').dataItem().telNo == null ? '' : $('#manual-editor-agent').data('kendoDropDownList').dataItem().telNo;
        let param = {
            manualType: 'M',
            parentId: 0,
            importance: $('#manual-editor-importance').data('kendoRadioGroup').value(),
            fontColor: '',
            callCatId: $('#manual-editor-consult-category').data('kendoDropDownTree').value(),
            title: $('#manual-editor-title').data('kendoTextBox').value(),
            deptId: $('#manual-editor-department').data('kendoDropDownTree').value(),
            chargeId: $('#manual-editor-agent').data('kendoDropDownList').value(),
            telNo: telNo,
            description: '',
            contents: content,
            html: $('#manual-editor-editor').data('kendoEditor').value(),
            requestManualId: requestManualId,
            startDate: '',//kendo.toString($('#manual-editor-used-date').data('kendoDateRangePicker').range().start, 'yyyy-MM-dd'),
            endDate: '',//kendo.toString($('#manual-editor-used-date').data('kendoDateRangePicker').range().end, 'yyyy-MM-dd'),
            useYn: $('#manual-editor-useYn').data('kendoCheckBox').value() ? 'Y' : 'N',
            approvalYn: 'Y'
        }

        let uploadBadge = $($('#manual-editor-btn-upload-file').find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != 0) {
            param.files = manualEditorFile.getFileInfo();
        }

        let saveManualCallback;
        let grid;

        if (manualEditorUrl.get('parentPage') === 'request-manual') {
            grid = opener.$('#request-manual-grid').data('kendoCpGrid');
        } else if (manualEditorUrl.get('parentPage') === 'manual-manager') {
            grid = opener.$('#manual-manager-grid').data('kendoCpGrid');
        }

        saveManualCallback = () => {
            let saveManualDataSource = new cpDataSource(METHOD.POST, '/knowledge/v1/manual/insert', param).getDataSource();
            saveManualDataSource.read().then(() => {
                grid.dataSource.read();
                if (manualEditorUrl.get('parentPage') === 'request-manual'){
                    opener.$(`#request-manual-detail-header-btn-close`).trigger(`click`);
                }
                window.close();
            });
        }

        message.callBackConfirm({msg: '저장하시겠습니까?', callback: saveManualCallback});
    },
    updateManual: () => {
        let content = $('#manual-editor-editor').data('kendoEditor').value().replace(/(<([^>]+)>)/gi,"");
        let telNo = $('#manual-editor-agent').data('kendoDropDownList').dataItem().telNo == null ? '' : $('#manual-editor-agent').data('kendoDropDownList').dataItem().telNo;
        let param = {
            manualId: manualId,
            manualType: 'M',
            importance: $('#manual-editor-importance').data('kendoRadioGroup').value(),
            fontColor: '',
            callCatId: $('#manual-editor-consult-category').data('kendoDropDownTree').value(),
            title: $('#manual-editor-title').data('kendoTextBox').value(),
            deptId: $('#manual-editor-department').data('kendoDropDownTree').value(),
            chargeId: $('#manual-editor-agent').data('kendoDropDownList').value(),
            telNo: telNo,
            description: '',
            contents: content,
            html: $('#manual-editor-editor').data('kendoEditor').value(),
            requestManualId: requestManualId,
            startDate: '',//kendo.toString($('#manual-editor-used-date').data('kendoDateRangePicker').range().start, 'yyyy-MM-dd'),
            endDate: '',//kendo.toString($('#manual-editor-used-date').data('kendoDateRangePicker').range().end, 'yyyy-MM-dd'),
            useYn: $('#manual-editor-useYn').data('kendoCheckBox').value() ? 'Y' : 'N',
            requestReason: $('#manual-editor-reason').data('kendoTextArea').value(),
            approvalYn: 'Y'
        }
        let uploadBadge = $($('#manual-editor-btn-upload-file').find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != 0) {
            param.files = manualEditorFile.getFileInfo();
        }

        if(manualEditorFileObj.deleteFileIds.length > 0){
            //삭제하고자 하는 파일이 존재하는 경우
            param.deleteFileIds = manualEditorFileObj.deleteFileIds; //삭제할 파일 list
        }

        let saveManualCallback;
        let grid;

        if (manualEditorUrl.get('parentPage') === 'request-manual') {
            grid = opener.$('#request-manual-grid').data('kendoCpGrid');
        } else if (manualEditorUrl.get('parentPage') === 'manual-manager') {
            grid = opener.$('#manual-manager-grid').data('kendoCpGrid');
        }

        param.manualId = manualId;
        saveManualCallback = () => {
            let saveManualDataSource = new cpDataSource(METHOD.PUT, '/knowledge/v1/manual/update', param).getDataSource();
            saveManualDataSource.read().then(() => {
                grid.dataSource.read();
                if (manualEditorUrl.get('parentPage') === 'request-manual'){
                    opener.$(`#request-manual-detail-header-btn-close`).trigger(`click`);
                }
                window.close();
            });
        }

        message.callBackConfirm({msg: '수정하시겠습니까?', callback: saveManualCallback});

    },
    deleteManual: () => {
        let param = {
            manualId: manualId,
            manualType: 'M',
            requestReason: '삭제',
            approvalYn: 'Y'
        };
        let deleteDs = new cpDataSource(METHOD.DELETE, '/knowledge/v1/manual/delete',param).getDataSource();
        deleteDs.read().then(() => {
            opener.$('#manual-manager-grid').data('kendoCpGrid').dataSource.read();
            window.close();
        });
    },
    dataBinding: (data) => {
        manualId = data.manualId;
        $('#manual-editor-window-title').text('매뉴얼 수정');
        $('#manual-editor-title').data('kendoTextBox').value(data.title)
        $('#manual-editor-importance').data('kendoRadioGroup').value(data.importance);
        //$('#manual-editor-consult-category').data('kendoDropDownTree').value(data.callCatId);
        //$('#manual-editor-department').data('kendoDropDownTree').value(data.deptId);
        //$('#manual-editor-agent').data('kendoDropDownList').value(data.chargeId);
        $('#manual-editor-editor').data('kendoEditor').value(data.html);
        let useYn = $('#manual-editor-useYn').data('kendoCheckBox');
        data.useYn === 'Y' ? useYn.check(true) : useYn.check(false);
        // $('#manual-editor-used-date').data('kendoDateRangePicker').setOptions({
        //     range: {
        //         start: new Date(formatterYmdToDate(data.startYmd)),
        //         end: new Date(formatterYmdToDate(data.endYmd))
        //     }
        // });
        $('#manual-editor-resist-date').data('kendoTextBox').value(data.rgtrNm + ' / ' + kendo.toString(new Date(data.regDt), 'yyyy-MM-dd HH:mm'));
        $('#manual-editor-modify-date').data('kendoTextBox').value(data.mdfrNm + ' / ' + kendo.toString(new Date(data.mdfDt), 'yyyy-MM-dd HH:mm'));

    },
    updateWindowInitOpen: () => {
        let $div = $(`<div id="manual-update-window"></div>`);
        $div.kendoWindow({
            width:350,
            height:180,
            position : {
                top : "35%",
                left:"35%"
            },
            actions : [ "Close" ],
            title : "수정사유입력",
            visible : false,
            modal : true,
            draggable: false,
            resizable: false,
            autoFocus:false,
            content : {
                template : kendo.template($("#manual-update-window-template").html())
            },
            open : () =>{
                manualEditor.manualUpdateWindowOpen();
            },
            close : (e) =>{
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();
    },
    manualUpdateWindowOpen: () => {

        $('#manual-editor-reason').kendoTextArea({
            rows: 3
        });

        let updateValidator = $('#manual-editor-update-validator').kendoValidator({
            rules: {
                rule: (input) => {
                    if (input.is("[name=manual-editor-reason]")) {
                        return $('#manual-editor-reason').data('kendoTextArea').value() !== '';
                    }
                }
            },
            errorTemplate: ''
        }).data('kendoValidator');

        $('#manual-editor-btn-update-save').kendoButton({
            themeColor: 'primary',
            click: () => {
                if (!updateValidator.validate()) {
                    return;
                }

                manualEditor.updateManual();
            }
        });
    }
};

const manualEditorFile = new cpUpload();
manualEditorFile.createBadge('manual-editor-btn-upload-file');

const manualEditorDetail = {
    init: async () => {
        const getImportanceRadioGroup = new cpDataSource(METHOD.GET, '/common/v1/code/ManualImportance').getDataSource();
        let importanceRadioItems = [];

        await getImportanceRadioGroup.read().then(() => {
            let data = getImportanceRadioGroup.data();
            let importanceItem = {};
            for (let i = 0; i < data.length; i++) {
                importanceItem.value = data[i].codeKey;
                importanceItem.label = data[i].codeNm;
                importanceRadioItems.push({...importanceItem});
            }
            $('#manual-editor-importance').kendoRadioGroup({
                items: importanceRadioItems,
                value: 'H',
                layout: 'horizontal'
            });
        });
        if(!hasUuid) {
            let manualUserDropDown = new cpUserDropDown("#manual-editor-agent",USER_INFO.deptId, [{useYn: 'Y'}], {optionLabel:{userNm:"선택",userId:0}},IS.FALSE,'N',IS.TRUE);
            let manualUserDropDownCreate = manualUserDropDown.init();
            const manualEditorDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                let call = manualUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    manualUserDropDownCreate.setDataSource(call.data());
                    manualUserDropDownCreate.value(0);
                });
            }
            let manualEditorDepartmentOptions = {change: manualEditorDeptAutoCompleteEvent};
            new cpCatDropDownTree('#manual-editor-consult-category', {placeholder: '선택하세요.'}).init();
            new cpDeptDropDownTree('#manual-editor-department', manualEditorDepartmentOptions, 'WORK_MANUAL_MGR', USER_INFO.deptId, IS.FALSE).init();
        }

        $('#manual-editor-useYn').kendoCheckBox({
            checked : true,
        });

        // $('#manual-editor-used-date').kendoDateRangePicker({
        //     culture: "ko-KR",
        //     format: 'yyyy-MM-dd',
        //     labels: false
        // });

        $("#manual-editor-resist-date").kendoTextBox({fillMode:"flat",readonly:true});
        $("#manual-editor-modify-date").kendoTextBox({fillMode:"flat",readonly:true});

        // if (hasUuid) {
        //     $('#manual-editor-reason-box').show();
        // } else {
        //     $('#manual-editor-reason-box').hide();
        // }
    }
};

const manualEditorAttachedFile = {
    init: () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: 'MANUAL',
            srcId2: manualId
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $('#manual-editor-btn-attached-file').kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });

            if (data.length > 0) {
                $('#manual-editor-btn-attached-file').kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function () {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `
                                        <div style="display: flex; align-items: center;cursor: pointer;">
                                            <div onclick="manualEditorFileObj.manualEditorFileDownload(this)" title="${data[i].fileNm}">
                                                <span style="font-size: 30px;" class="k-icon k-i-file"></span>
                                                <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${data[i].fileUuid}" value="${data[i].fileNm}" disabled />
                                            </div>
                                            <div style="cursor: pointer; margin-left: 5px;" class="k-icon k-i-close" value="${data[i].fileId}" onclick="manualEditorFileObj.manualEditorFileDelete(this)"></div>
                                        </div><br />`;
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

    }
};

const manualEditorFileObj = {
    deleteFileIds : [],
    manualEditorFileDownload : (e) => {
        cpFileDown(e.childNodes[3].id);
    },
    manualEditorFileDelete : (e) => {
        manualEditorFileObj.deleteFileIds.push(Number($(e).attr("value")));
        $(e).parent().next().remove(); //<br /> 태그 제거
        $(e).parent().remove(); //file div 태그 제거

        //제거한 개수 뱃지에 반영
        const fileCount =  Number($('#manual-editor-btn-attached-file').data("kendoButton").badge.text())
        $('#manual-editor-btn-attached-file').data("kendoButton").badge.text(fileCount-1);
    }
};

cpProgress('manual-editor-layout');
manualEditor.init();
manualEditorDetail.init().then(() => {
    if (hasUuid) {
        $(document).attr("title","매뉴얼 수정");
        let getManualItem = new cpDataSource(METHOD.GET, '/knowledge/v1/manual-item/select', {
            manualUuid: manualEditorUrl.get('manualUuid'),
            outputYn: 'Y'
        }).getDataSource();

        getManualItem.read().then(() => {
            let data = getManualItem.data()[0];
            manualEditor.dataBinding(data);

            new cpCatDropDownTree('#manual-editor-consult-category', {placeholder: '선택하세요.',value:data.callCatId}).init();

            let manualUserDropDown = new cpUserDropDown("#manual-editor-agent",data.deptId, [{useYn: 'Y'}], {optionLabel:{userNm:"선택",userId:0}, value:data.chargeId },IS.FALSE,'N',IS.TRUE);
            let manualUserDropDownCreate = manualUserDropDown.init();

            const manualEditorDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                let call = manualUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    manualUserDropDownCreate.setDataSource(call.data());
                    manualUserDropDownCreate.value(0);
                });
            }
            let manualEditorDepartmentOptions = {change: manualEditorDeptAutoCompleteEvent};
            new cpDeptDropDownTree('#manual-editor-department', manualEditorDepartmentOptions, 'WORK_MANUAL_MGR', data.deptId, IS.FALSE).init();

            manualEditorAttachedFile.init();
        });
    } else {
        $(document).attr("title","매뉴얼 등록");
        $('#manual-editor-btn-attached-file').hide();
    }

    if (manualEditorUrl.get('parentPage') === 'request-manual') {
        requestManualId = opener.$('#request-manual-requestManualId').val();
    } else if (manualEditorUrl.get('parentPage') === 'manual-manager') {
        requestManualId = 0;
    }

    cpProgress('manual-editor-layout', false);
});

