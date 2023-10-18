const idName = "resource-board";
const TITLE = "업무자료실";
$(document).attr("title",`${TITLE} 상세`);
const BoardDetailUrl = new URLSearchParams(window.location.search);
const CABINET_CD = BoardDetailUrl.get('cabinetCd');
const freeBoardReplyInsertUrl = `/board/v1/${idName}/reply/insert`; //댓글 등록
const freeBoardReplyUpdateUrl = `/board/v1/${idName}/reply/update`; //댓글 수정

const freeBoardDetail = {
    init :async () => {
        freeBoardDetailSetting.widgetSetting();
        await freeBoardDetailSetting.widgetDataBinding();
        freeBoardDetailFile.attachFile();
    }
};

const freeBoardDetailSetting = {
    widgetSetting : () => {
        $(`#${idName}-detail-popup-title`).text(`${TITLE} 상세보기`);

        $(`#${idName}-detail-body-splitter`).kendoSplitter({
            orientation: 'vertical',
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '100px', resizable: false }
            ]
        });

        const editor = new CpEditor(`${idName}-detail-contents`);
        editor.create();
        editor.editorHide();


        $(`#${idName}-detail-reg-dept`).kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $(`#${idName}-detail-reg-user-date`).kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $(`#${idName}-detail-mdf-user-date`).kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $(`#${idName}-detail-comment-write`).kendoTextBox({
            placeholder : "댓글을 입력해 주세요.",
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $(`#${idName}-detail-comment-btn`).trigger("click");
            }
        });
        $(`#${idName}-detail-comment-btn`).kendoButton({
            click : () => {
                const valid = $(`#${idName}-detail-comment-validator`).data("kendoValidator");
                if(!valid.validate()){
                    return;
                }

                const param = {
                    parentId : Number($(`#${idName}-detail-doc-id`).val()),
                    contents : $(`#${idName}-detail-comment-write`).data("kendoTextBox").value(),
                }

                const replyInsert = new cpDataSource(METHOD.POST, freeBoardReplyInsertUrl, param).getDataSource();
                replyInsert.read().then(()=>{
                    $(`#${idName}-detail-comment-write`).data("kendoTextBox").value("");
                    $(`#${idName}-detail-comment-list-view`).data("kendoListView").dataSource.read();
                })
            }
        });

        $(`#${idName}-detail-file-list-btn`).kendoButton({});
        $(`#${idName}-detail-delete-btn`).kendoButton({
            click: () => {
                const deleteNotice = () => {
                    const docid = Number($(`#${idName}-detail-doc-id`).val());
                    const freeBoardDelete =  new cpDataSource(METHOD.PUT, `/board/v1/${idName}/delete/${docid}`, {}).getDataSource();
                    freeBoardDelete.read().then(()=>{
                        opener.$(`#${idName}-grid`).data('kendoCpGrid').dataSource.read();
                        window.close();
                    });
                }

                message.callBackConfirm({msg: '삭제 하시겠습니까?', callback: deleteNotice});
            }
        });
        $(`#${idName}-detail-update-btn`).kendoButton({
            themeColor : "primary",
            click: () => {
                let editorOption ={
                    name: `${idName}-editor`,
                    height: 820,
                    width: 1020,
                    top: 100,
                    left: 100,
                }

                new popupWindow(`/${idName}-editor?docUuid=${BoardDetailUrl.get("docUuid")}&cabinetCd=${CABINET_CD}`, `${idName}-editor`, editorOption).open();
            }
        });

        $(`#${idName}-detail-comment-validator`).kendoValidator({
            rules:{
                required : (input)=>{
                    if(input.is(`[name=${idName}-detail-comment-write]`)){return input.data("kendoTextBox").value() !== "";}
                    return true;
                },
            },
            messages:{
                required : (input)=>{
                    return "";
                },
            }
        })

        $(`#${idName}-detail-comment-list-view`).kendoListView({
            height : "90%",
            dataSource: freeBoardDetailDataSource.replySelectDataSource(),
            layout: "flex",
            scrollable : true,
            flex: {
                direction: "column"
            },
            template: kendo.template($(`#${idName}-comment-listview`).html()),
            dataBound : (e) => {
                $(`.${idName}-command-contents-textarea-class`).kendoTextBox({
                    fillMode: 'flat',
                });

                e.sender.dataItems().forEach((item)=>{
                    $(`#${idName}-comment-contents-text-box-${item.docId}`).hide();

                    if(item.rgtrId !== USER_INFO.userId){
                        //자신이 쓴 댓글이 아닌 경우 삭제 버튼 hide
                        $(`#${idName}-comment-update-btn-${item.docId}`).hide();
                        $(`#${idName}-comment-delete-btn-${item.docId}`).hide();
                    }else{
                        //자신이 쓴 댓글인 경우 수정 및 삭제 기능 추가
                        $(`#${idName}-comment-delete-btn-${item.docId}`).on("click", () => {
                            const deleteReply = () => {
                                const replyDeleteCall =  new cpDataSource(METHOD.PUT, `/board/v1/${idName}/delete/${item.docId}`, {}).getDataSource();
                                replyDeleteCall.read().then(()=>{
                                    e.sender.dataSource.read();
                                });
                            }
                            message.callBackConfirm({msg: '삭제 하시겠습니까?', callback: deleteReply});
                        })
                        //연필 아이콘 클릭이벤트
                        $(`#${idName}-comment-update-btn-${item.docId}`).on("click", () => {
                            $(`#${idName}-comment-btn-div1-${item.docId}`).hide();
                            $(`#${idName}-comment-btn-div2-${item.docId}`).show();
                            $(`#${idName}-comment-contents-${item.docId}`).hide();
                            $(`#${idName}-comment-contents-text-box-${item.docId}`).show();
                            $(`#${idName}-comment-contents-text-box-${item.docId}`).data('kendoTextBox').value(item.contents);
                        })

                        //수정 체크 아이콘 클릭이벤트
                        $(`#${idName}-comment-update-btn-ok-${item.docId}`).on("click", () => {
                            const param = {
                                docId : item.docId,
                                contents : $(`#${idName}-comment-contents-text-box-${item.docId}`).data('kendoTextBox').value(),
                            };

                            const replyUpdateCall =  new cpDataSource(METHOD.PUT, freeBoardReplyUpdateUrl, param).getDataSource();
                            replyUpdateCall.read().then(()=>{
                                message.notification({msg:"댓글이 수정되었습니다."})
                                e.sender.dataSource.read();
                            });
                        })

                        //수정 취소 아이콘 클릭이벤트
                        $(`#${idName}-comment-update-btn-cancel-${item.docId}`).on("click", () => {
                            $(`#${idName}-comment-btn-div1-${item.docId}`).show();
                            $(`#${idName}-comment-btn-div2-${item.docId}`).hide();
                            $(`#${idName}-comment-contents-${item.docId}`).show();
                            $(`#${idName}-comment-contents-text-box-${item.docId}`).hide();
                        })
                    }
                })


            }
        });

    },

    widgetDataBinding : async () => {
        const param = {
            docUuid : BoardDetailUrl.get("docUuid"),
            loginUserId : USER_INFO.userId
        };
        const freeBoardSelectItem =  new cpDataSource(METHOD.GET, `/board/v1/${idName}/select/item`, param).getDataSource();
        await freeBoardSelectItem.read().then((()=>{
            const item = freeBoardSelectItem.data()[0];

            $(`#${idName}-detail-doc-id`).val(item.docId);
            item.regDt = kendo.toString(new Date(item.regDt),"yyyy-MM-dd H:mm");
            item.mdfDt = kendo.toString(new Date(item.mdfDt),"yyyy-MM-dd H:mm");

            $(`#${idName}-detail-title`).text(item.docNm);
            $(`#${idName}-detail-contents`).data("kendoEditor").value(item.html);
            $(`#${idName}-detail-reg-dept`).data("kendoTextBox").value(item.fullDeptNm);
            $(`#${idName}-detail-reg-user-date`).data("kendoTextBox").value(item.rgtrNm + ' / ' + item.regDt);
            $(`#${idName}-detail-mdf-user-date`).data("kendoTextBox").value(item.mdfrNm + ' / ' + item.mdfDt);

            if(item.adminYn === "Y" || USER_INFO.userId === item.rgtrId){
                //게시글 삭제 및 수정은 관리자권한이 있거나 작성자만 가능
                $(`#${idName}-detail-delete-btn`).show();
                $(`#${idName}-detail-update-btn`).show();
            }else{
                $(`#${idName}-detail-delete-btn`).hide();
                $(`#${idName}-detail-update-btn`).hide();
            }
        }))
    },
};

const freeBoardDetailFile = {
    attachFile : () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: CABINET_CD,
            srcId2: $(`#${idName}-detail-doc-id`).val(),
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $(`#${idName}-detail-file-list-btn`).kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            if (data.length > 0) {
                $(`#${idName}-detail-file-list-btn`).kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function (e) {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `<div style="display: flex; align-items: center;"><div style="cursor: pointer;" onclick="freeBoardDetailFile.freeBoardFileDownload(this)" title="${data[i].fileNm}"><span style="font-size: 30px;" class="k-icon k-i-file"></span>
                            <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${data[i].fileUuid}" value="${data[i].fileNm}" disabled />
                            </div></div><br />`;
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

    freeBoardFileDownload : (e) => {
        cpFileDown(e.childNodes[2].id);
    },
};

const freeBoardDetailDataSource = {
    replySelectDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : `/board/v1/${idName}/reply/select/${BoardDetailUrl.get("docUuid")}`,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },
            },
            schema: {
                data : 'data',
                model : {
                    contents : {type : 'string'},
                    mdfDt : {type : 'date'},
                    mdfrNm : {type : 'string'},
                },
                parse : (res) => {
                    res.data.forEach((data)=>{
                        data.mdfDt = kendo.toString(new Date(data.mdfDt), "yyyy-MM-dd H:mm");
                    })
                    return res;
                }
            },
        })
    },
}

cpProgress(`${idName}-detail-layout`);
freeBoardDetail.init().then(()=>{
    cpProgress(`${idName}-detail-layout`, false);
});
