$(document).attr("title","공지사항 상세");
const noticeDetailUrl = new URLSearchParams(window.location.search);



const noticeDetail = {
    init :async () => {
        noticeDetailSetting.widgetSetting();
        await noticeDetailSetting.widgetDataBinding();
        noticeDetailSetting.noticeReadCount();
        noticeDetailFile.attachFile();
        noticeDetailSetting.visitorReadPopupSetting();
    }
}

const noticeDetailSetting = {
    widgetSetting : () => {
        $('#notice-detail-body-splitter').kendoSplitter({
            orientation: 'vertical',
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '100px', resizable: false }
            ]
        });

        const editor = new CpEditor('notice-detail-contents');
        editor.create();
        editor.editorHide();

        $('#notice-detail-reg-dept').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#notice-detail-reg-user-date').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#notice-detail-mdf-user-date').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#notice-detail-file-list-btn').kendoButton({});

        $("#notice-detail-read-visitor-call-btn").kendoButton({
            click : () => {
                $("#notice-detail-visitor-window").data("kendoWindow").refresh().center().open();
            }
        });

        $('#notice-detail-delete-btn').kendoButton({
            click: () => {

                const deleteNotice = () => {
                    const docid = Number($("#notice-detail-doc-id").val());
                    const noticeDelete =  new cpDataSource(METHOD.PUT, `/board/v1/notice/delete/${docid}`, {}).getDataSource();
                    noticeDelete.read().then(()=>{
                        opener.$('#notice-grid').data('kendoCpGrid').dataSource.read();
                        window.close();
                    });
                }

                message.callBackConfirm({msg: '삭제 하시겠습니까?', callback: deleteNotice});

            }
        });
        $('#notice-detail-update-btn').kendoButton({
            themeColor : "primary",
            click: () => {
                let editorOption ={
                    name: 'notice-editor',
                    height: 820,
                    width: 1020,
                    top: 100,
                    left: 100,
                }

                new popupWindow(`/notice-editor?docUuid=${noticeDetailUrl.get("docUuid")}`, 'notice-editor', editorOption).open();
            }
        });

        if (noticeDetailUrl.get('parentPage') === 'dashboard')$("#notice-detail-btn-div").hide();
    },

    widgetDataBinding :async () => {
        const param = {
            docUuid : noticeDetailUrl.get("docUuid"),
            loginUserId : USER_INFO.userId
        };
        const noticeSelectItem = new cpDataSource(METHOD.GET, `/board/v1/notice/select/item`, param).getDataSource();
        await noticeSelectItem.read().then(()=>{
            const item = noticeSelectItem.data()[0];

            $("#notice-detail-doc-id").val(item.docId);
            item.regDt = kendo.toString(new Date(item.regDt),"yyyy-MM-dd H:mm");
            item.mdfDt = kendo.toString(new Date(item.mdfDt),"yyyy-MM-dd H:mm");
            $("#notice-detail-title").text(item.docNm);
            $("#notice-detail-contents").data("kendoEditor").value(item.html);
            $("#notice-detail-reg-dept").data("kendoTextBox").value(item.fullDeptNm);
            $("#notice-detail-reg-user-date").data("kendoTextBox").value(item.rgtrNm + ' / ' + item.regDt);
            $("#notice-detail-mdf-user-date").data("kendoTextBox").value(item.mdfrNm + ' / ' + item.mdfDt);
            $('#notice-detail-importance').html(noticeDetailSetting.badgeImportance(item.importance));

            if(item.adminYn === "Y" || USER_INFO.userId === item.rgtrId){
                //공지사항 삭제 및 수정은 관리자권한이 있거나 작성자만 가능
                $("#notice-detail-delete-btn").show();
                $("#notice-detail-update-btn").show();
            }else{
                $("#notice-detail-delete-btn").hide();
                $("#notice-detail-update-btn").hide();
            }
        })
    },

    visitorReadPopupSetting : () => {
        $("#notice-detail-visitor-window").kendoWindow({
            width: "50%",
            height: "80%",
            visible : false,
            draggable: false,
            modal : true,
            title: "열람자리스트",
            content : {
                template: kendo.template($("#notice-detail-visitor-template").html())
            },
            open : () => {
                noticeDetailGridSetting.visitorWindowGrid.drawGrid();
            }
        });
    },

    badgeImportance: (importance) => {
        if (importance == 'Emergency') {
            return '<span class="k-badge k-badge-solid-error k-badge-md k-rounded-md k-badge-inline">긴급</span>';
        } else if (importance == 'Importance') {
            return '<span class="k-badge k-badge-solid-warning k-badge-md k-rounded-md k-badge-inline">중요</span>';
        } else if (importance == 'Normal') {
            return '<span class="k-badge k-badge-solid-success k-badge-md k-rounded-md k-badge-inline">일반</span>';
        }
    },

    //공지사항 조회수 +1
    noticeReadCount : () => {
        const docId = Number($("#notice-detail-doc-id").val());
        const noticeReadCnt =  new cpDataSource(METHOD.POST, `/board/v1/notice/read/insert/${docId}`, {}).getDataSource();
        noticeReadCnt.read();
    }
};

const noticeDetailFile = {
    attachFile : () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: 'Notice',
            srcId2: $("#notice-detail-doc-id").val(),
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $('#notice-detail-file-list-btn').kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            if (data.length > 0) {
                $('#notice-detail-file-list-btn').kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function (e) {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `<div style="display: flex; align-items: center;"><div style="cursor: pointer;" onclick="noticeDetailFile.noticeDetailFileDownload(this)" title="${data[i].fileNm}"><span style="font-size: 30px;" class="k-icon k-i-file"></span>
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

    noticeDetailFileDownload : (e) => {
        cpFileDown(e.childNodes[2].id);
    },
};

const noticeDetailGridSetting = {
    visitorWindowGrid : {
        drawGrid : () => {
            $("#notice-detail-visitor-grid").kendoCpGrid({
                columns: [
                    {
                        field: "fullDeptNm",
                        title:"부서",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "rgtrNm",
                        title: "열람자",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "regDt",
                        title: "열람일시",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: noticeDetailDataSource.visitorWindowDataSource(),
                scrollable: false,
                resizable: false,

            });
        },
    }
};

const noticeDetailDataSource = {
    visitorWindowDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : `/board/v1/notice/read/select/${Number($("#notice-detail-doc-id").val())}`,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },
            },
            schema: {
                data : 'data',
                model : {
                    fullDeptNm: {type: 'string'},
                    rgtrNm: {type: 'string'},
                    regDt: {type: 'date'},
                },
                parse : (res) => {
                    res.data.forEach((data) => {
                        if(!!data.regDt) data.regDt = kendo.toString(new Date(data.regDt), "yyyy-MM-dd HH:mm")
                    })
                    return res;
                },
            },
        })
    },
}



cpProgress('notice-detail-layout');
noticeDetail.init().then(()=>{
    cpProgress('notice-detail-layout', false);
});