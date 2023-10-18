const idName = "resource-board";
const TITLE = "업무자료실";
const freeBoardInsertUrl = `/board/v1/${idName}/insert`;
const freeBoardUpdateUrl = `/board/v1/${idName}/update`;
const boardEditorUrl = new URLSearchParams(window.location.search);
const hasUuid = boardEditorUrl.get('docUuid');
const CABINET_CD = boardEditorUrl.get('cabinetCd');
const freeBoardEditorFile = new cpUpload();

const freeBoardEditor = {
    init : async () => {
        await freeBoardEditorSetting.widgetSetting();
        if(hasUuid){
            //등록이 아닌 수정인 경우
            $(document).attr("title",`${TITLE} 수정`);
            await freeBoardEditorUpdateSetting.updateDataBinding();
            freeBoardEditorFileObj.attachFile();

        }else{
            $(document).attr("title",`${TITLE} 등록`);
            $(`#${idName}-editor-file-list-btn`).hide(); //첨부파일 버튼
        }
    }
}

const freeBoardEditorSetting = {
    widgetSetting : async () => {

        $(`#${idName}-editor-popup-title`).text(`${TITLE} 등록`);
        $(`#${idName}-editor-title`).kendoTextBox();
        new CpEditor(`${idName}-editor-editor`).create();

        $(`#${idName}-editor-editor`).data("kendoEditor").bind("keyup", () => {
            $(`#${idName}-editor-splitter`).find(".k-editable-area").css("border", "none");
        })

        freeBoardEditorFile.createBadge(`${idName}-editor-btn-upload-file`);
        $(`#${idName}-editor-file-list-btn`).kendoButton({});

        $(`#${idName}-editor-btn-save`).kendoButton({
            themeColor: 'primary',
            click: () => {
                const valid = $(`#${idName}-editor-validator`).data("kendoValidator");
                if(!valid.validate()){
                    return;
                }

                if (hasUuid) {
                    freeBoardEditorFunc.updateFreeBoard();
                } else {
                    freeBoardEditorFunc.insertFreeBoard();
                }
            }
        });

        $(`#${idName}-editor-validator`).kendoValidator({
            rules:{
                required : (input)=>{
                    if(input.is(`[name=${idName}-editor-title]`)){return input.data("kendoTextBox").value() !== "";}

                    if(input.is(`[name=${idName}-editor-editor]`)) {
                        if(input.data("kendoEditor").value() === ""){
                            $(`#${idName}-editor-splitter`).find(".k-editable-area").css("border", "1px solid red");
                            return false;
                        }else{
                            $(`#${idName}-editor-splitter`).find(".k-editable-area").css("border", "none");
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
    },
};

const freeBoardEditorUpdateSetting = {
    updateDataBinding : async () => {
        $(`#${idName}-editor-popup-title`).text(`${TITLE} 수정`);

        const param = {
            docUuid : hasUuid,
            loginUserId : USER_INFO.userId
        };
        const freeBoardSelectItem =  new cpDataSource(METHOD.GET, `/board/v1/${idName}/select/item`, param).getDataSource();
        await freeBoardSelectItem.read().then(()=>{
            const item = freeBoardSelectItem.data()[0];
            $(`#${idName}-editor-doc-id`).val(item.docId);
            $(`#${idName}-editor-title`).data("kendoTextBox").value(item.docNm);
            $(`#${idName}-editor-editor`).data("kendoEditor").value(item.html);
        })
    },
};

const freeBoardEditorFileObj = {
    deleteFileIds : [],

    attachFile : () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: CABINET_CD,
            srcId2: $(`#${idName}-editor-doc-id`).val(),
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();

            $(`#${idName}-editor-file-list-btn`).kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            if (data.length > 0) {
                $(`#${idName}-editor-file-list-btn`).kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function (e) {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `<div style="display: flex; align-items: center;"><div style="cursor: pointer;" onclick="freeBoardEditorFileObj.freeBoardEditorFileDownload(this)" title="${data[i].fileNm}"><span style="font-size: 30px;" class="k-icon k-i-file"></span>
                            <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${data[i].fileUuid}" value="${data[i].fileNm}" disabled />
                            </div><div style="cursor: pointer; margin-left: 5px;" class="k-icon k-i-close" value="${data[i].fileId}" onclick="freeBoardEditorFileObj.freeBoardEditorFileDelete(this)"></div></div><br />`;
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

    freeBoardEditorFileDownload : (e) => {
        cpFileDown(e.childNodes[2].id);
    },

    freeBoardEditorFileDelete : (e) => {
        freeBoardEditorFileObj.deleteFileIds.push(Number($(e).attr("value")));
        $(e).parent().next().remove(); //<br /> 태그 제거
        $(e).parent().remove(); //file div 태그 제거

        //제거한 개수 뱃지에 반영
        const fileCount =  Number($(`#${idName}-editor-file-list-btn`).data("kendoButton").badge.text())
        $(`#${idName}-editor-file-list-btn`).data("kendoButton").badge.text(fileCount-1);
    }
};

const freeBoardEditorFunc = {
    insertFreeBoard : () => {
        const param = {
            cabinetCd : CABINET_CD,
            parentId : 0,
            deptId : 1,
            chargeId : 0,
            workType : '',
            noticeYn : 'N',
            noticeScope : '',
            docNm : $(`#${idName}-editor-title`).data("kendoTextBox").value(),
            contents : $(`#${idName}-editor-editor`).data('kendoEditor').value().replace(/(<([^>]+)>)/gi,""),
            html: $(`#${idName}-editor-editor`).data('kendoEditor').value(),
        };

        let uploadBadge = $($(`#${idName}-editor-btn-upload-file`).find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
            param.files = freeBoardEditorFile.getFileInfo();
        }

        const saveFreeBoardCallback = () => {
            const saveFreeBoardDataSource = new cpDataSource(METHOD.POST, freeBoardInsertUrl, param).getDataSource();
            saveFreeBoardDataSource.read().then(()=>{
                opener.$(`#${idName}-grid`).data('kendoCpGrid').dataSource.read();
                window.close();
            })
        }

        message.callBackConfirm({msg: "등록하시겠습니까?", callback: saveFreeBoardCallback});


    },

    updateFreeBoard : () => {
        const param = {
            cabinetCd : CABINET_CD,
            docId : Number($(`#${idName}-editor-doc-id`).val()),
            deptId : 1,
            chargeId : 0,
            workType : '',
            noticeYn : 'N',
            noticeScope : '',
            docNm : $(`#${idName}-editor-title`).data("kendoTextBox").value(),
            contents : $(`#${idName}-editor-editor`).data('kendoEditor').value().replace(/(<([^>]+)>)/gi,""),
            html: $(`#${idName}-editor-editor`).data('kendoEditor').value(),
        };

        let uploadBadge = $($(`#${idName}-editor-btn-upload-file`).find('span')[1]).attr('id');
        if ($("#"+uploadBadge).data('kendoBadge').text() != '0') {
            param.files = freeBoardEditorFile.getFileInfo(); //업로드한 파일 list
        }

        if(freeBoardEditorFileObj.deleteFileIds.length > 0){
            //삭제하고자 하는 파일이 존재하는 경우
            param.deleteFileIds = freeBoardEditorFileObj.deleteFileIds; //삭제할 파일 list
        }

        const updateFreeBoardCallback = () => {
            const updateFreeBoardDataSource = new cpDataSource(METHOD.PUT, freeBoardUpdateUrl, param).getDataSource();
            updateFreeBoardDataSource.read().then(()=>{
                opener.opener.$(`#${idName}-grid`).data('kendoCpGrid').dataSource.read();
                window.close(); //게시글 수정 close
                opener.window.close(); //게시글 상세보기 close
            })
        }

        message.callBackConfirm({msg: "수정하시겠습니까?", callback: updateFreeBoardCallback});

    },
};

cpProgress(`${idName}-editor-layout`);
freeBoardEditor.init().then(()=>{
    cpProgress(`${idName}-editor-layout`, false);
});