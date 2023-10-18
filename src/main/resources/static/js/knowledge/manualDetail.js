$(document).attr("title","매뉴얼 상세");
const manualDetailUrl = new URLSearchParams(window.location.search);
let manualId;
let originOpener;
let manualSelectItemUrl;
let manualRequestInsertUrl;
let manualQnaSelectUrl;
let manualRelationSelectUrl;

const manualDetail = {
    init: async () => {
        manualDetail.setUrl();
        const manualContentsEditor = new CpEditor('manual-detail-contents');
        manualContentsEditor.create();
        manualContentsEditor.editorHide();
        manualDetail.getOriginOpener()


        $('#manual-detail-container-splitter').kendoSplitter({
            orientation: 'horizontal',
            panes: [
                {collapsible: true, size: '70%', scrollable: false},
                {collapsible: true, size: '30%', scrollable: false}
            ]
        });

        $('#manual-detail-splitter').kendoSplitter({
            orientation: 'vertical',
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '150px', resizable: false }
            ]
        });

        let detailOption = {
            fillMode: 'flat',
            readonly: true
        };

        $('#manual-detail-information-department').kendoTextBox(detailOption);
        $('#manual-detail-information-chargeNm').kendoTextBox(detailOption);
        $('#manual-detail-information-telNo').kendoTextBox(detailOption);
        $('#manual-detail-information-regDt').kendoTextBox(detailOption);
        $('#manual-detail-information-mdfDt').kendoTextBox(detailOption);

        let getManualDataSource = new cpDataSource(METHOD.GET, manualSelectItemUrl, {
            manualUuid: manualDetailUrl.get('manualUuid'),
            outputYn: 'Y'
        }).getDataSource();


        await getManualDataSource.read().then(() => {
            let data = getManualDataSource.data()[0];
            $("#manual-detail-call-cat-id").val(data.callCatId);
            manualId = data.manualId;
            data.telNo = data.telNo == null ? '' : formatterHpNo(data.telNo);
            data.regDt = data.regDt == null ? '' : kendo.toString(new Date(data.regDt), 'yyyy-MM-dd HH:mm');
            data.mdfDt = data.mdfDt == null ? '' : kendo.toString(new Date(data.mdfDt), 'yyyy-MM-dd HH:mm');
            $("#manual-detail-contents").data("kendoEditor").value(data.html);
            $('#manual-detail-title').text(data.title);
            $('#manual-detail-call-cat').text(data.fullCatNm)
            $('#manual-detail-importance').html(manualDetail.badgeImportance(data.importance));

            manualDetail.dataBindingToDetail(data);
            if(manualDetailUrl.get('parentType') === "consult-manual"){
                //상담DB에서 접근하는 경우에만 조회수 카운트
                const manualReadCnt =  new cpDataSource(METHOD.POST, `/knowledge/v1/manual-consult/read/insert/${manualId}`, {}).getDataSource();
                manualReadCnt.read();
            }

            if (data.requestReasonTypeNm !== '') {
                $('#manual-detail-btn-requesting-modify').kendoBadge({
                    themeColor: 'warning',
                    size: 'large',
                    text: data.requestReasonTypeNm
                });
                $('#manual-detail-btn-request-modify').hide();
            } else {
                $('#manual-detail-btn-requesting-modify').hide();
                $('#manual-detail-btn-request-modify').show();
            }
        });

        $('#manual-detail-btn-history').kendoButton({
           click: () => {
               manualDetailHistory.windowInitOpen();
           }
        });

        $('#manual-detail-btn-request-modify').kendoButton({
            click: () => {
                manualDetailHistory.manualRequestWindowInitOpen();
            }
        });

        $('#manual-detail-btn-attached-file').kendoButton();
    },
    badgeImportance: (importance) => {
        if (importance === 'H') {
            return '<span class="k-badge k-badge-solid k-badge-solid-error k-badge-md k-rounded-md k-badge-inline">상</span>';
        } else if (importance === 'M') {
            return '<span class="k-badge k-badge-solid k-badge-solid-warning k-badge-md k-rounded-md">중</span>';
        } else if (importance === 'L') {
            return '<span class="k-badge k-badge-solid k-badge-solid-success k-badge-md k-rounded-md">하</span>';
        }
    },
    dataBindingToDetail: (data) => {
        $('#manual-detail-information-department').data('kendoTextBox').value(data.deptNm);
        $('#manual-detail-information-chargeNm').data('kendoTextBox').value(data.chargeNm);
        $('#manual-detail-information-regDt').data('kendoTextBox').value(data.regDt);
        $('#manual-detail-information-mdfDt').data('kendoTextBox').value(data.mdfDt);
        if (data.telNo !== '') {
            $('#manual-detail-information-telNo').data('kendoTextBox').value(data.telNo);
            manualDetailCallFunction.call(data.telNo);
        }
    },
    getOriginOpener : () => {
        const level = Number(manualDetailUrl.get('level'));//Number(null) => 0 !!0=> false

        if(!!level && level < 3){
            //매뉴얼 상세보기 단계가 1,2인 경우에만 qna 클릭시 상댐메인에 할당
            originOpener = opener;//현재 창의 부모
            for(let i=1; i < level; i++){
                originOpener = originOpener.opener;
            }
            return originOpener;
        }else{
            return undefined;
        }
    },

    setUrl : () => {
        if(manualDetailUrl.get('parentType') === "consult-manual"){
            manualSelectItemUrl = '/knowledge/v1/manual-consult/manual/item/select';
            manualRequestInsertUrl = "/knowledge/v1/manual-consult/request/insert";
            manualQnaSelectUrl = '/knowledge/v1/manual-consult/qna/select';
            manualRelationSelectUrl = '/knowledge/v1/manual-consult/relation/select';
        }else if(manualDetailUrl.get('parentType') === "request-manual"){
            manualSelectItemUrl = '/knowledge/v1/manual-request/manual/item/select';
            manualRequestInsertUrl = "/knowledge/v1/manual-request/insert";
            manualQnaSelectUrl = '/knowledge/v1/manual-request/qna/select';
            manualRelationSelectUrl = '/knowledge/v1/manual-request/relation/select';
        }else{
            manualSelectItemUrl = '/knowledge/v1/manual-item/select';
            manualRequestInsertUrl = "/knowledge/v1/manual-request/insert";
            manualQnaSelectUrl = '/knowledge/v1/manual-qna/select';
            manualRelationSelectUrl = '/knowledge/v1/manual-relation/select';
        }
    }
}

const manualDetailHistory = {
    init: () => {
        $('#manual-detail-history-grid').kendoCpGrid({
            dataSource: manualDetailHistory.dataSource(),
            editable: false,
            autoBind: true,
            height: 'calc(100% - 10px)',
            scrollable: true,
            selectable: true,
            columns: [
                {field: 'regDt', title: '수정일시', headerAttributes: {class: 'k-text-center'}, attributes: {class: 'k-text-center'}, width: 70},
                {field: 'rgtrNm', title: '수정자', headerAttributes: {class: 'k-text-center'}, attributes: {class: 'k-text-center'}, width: 60},
                {field: 'requestReason', title: '요청사유', headerAttributes: {class: 'k-text-center'},width: 300}
            ],
            click: (e) => {
                const cell = e.sender.select();
                const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];

                $("#manual-detail-history-manual-id").val(selectRows.manualId);
                $("#manual-detail-history-manual-idx").val(selectRows.manualIdx);

                let editorOption ={
                    name: 'manual-history',
                    height: 840,
                    width: 850,
                    top: 100,
                    left: 100,
                }

                new popupWindow(`/manual-history`, 'manual-history', editorOption).open();

            },
        });
    },
    dataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: '/knowledge/v1/manual-history/select',
                    type: 'GET',
                    contentType: 'application/json',
                    dataType: 'json'
                },
                parameterMap: (data, type) => {
                    if (type === 'read') {
                        return {
                            manualId: manualId,
                            outputYn: 'Y'
                        };
                    }
                }
            },
            schema: {
                data: 'data',
                model: {
                    id: 'regDt',
                    fields: {
                        regDt: {type: 'string'},
                        rgtrNm: {type: 'string'},
                        requestReason: {type: 'string'},
                        manualId: {type: 'number'},
                        manualIdx: {type: 'number'},
                    }
                },
                parse: (result) => {
                    result.data.forEach(item => {
                        item.regDt = item.regDt == null ? '' : kendo.toString(new Date(item.regDt), 'yyyy-MM-dd HH:mm');
                        item.rgtrNm = item.rgtrNm == null ? '' : item.rgtrNm;
                        item.requestReason = item.requestReason == null ? '' : item.requestReason;
                    });
                    return result;
                }
            }
        });
    },
    windowInitOpen: () => {
        let $div = $('<div id="manual-detail-history-window"></div>');
        $div.kendoWindow({
            width: 1000,
            height: 400,
            modal: true,
            visible: false,
            actions: ['Close'],
            draggable: false,
            resizable: false,
            title: '수정이력',
            content: {
                template: kendo.template($('#manual-detail-history-window-template').html())
            },
            open: () => {
                manualDetailHistory.init();
            },
            close: (e) => {
                e.sender.destroy();
            }
        }).data('kendoWindow').refresh().center().open();
    },
    manualRequestWindowInitOpen : () =>{
        let $div = $(`<div id="manual-request-modify-window"></div>`);
        $div.kendoWindow({
            width:400,
            height:380,
            position : {
                top : "33%",
                left:"35%"
            },
            actions : [ "Close" ],
            title : "매뉴얼 수정요청",
            visible : false,
            modal : true,
            draggable: false,
            resizable: false,
            autoFocus:false,
            content : {
                template : kendo.template($("#manual-request-modify-window-template").html())
            },
            open : () => {
                manualDetailHistory.manualRequestWindowOpen();
            },
            close : (e) => {
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().center().open();
    },
    manualRequestWindowOpen : () =>{
        const manualDetailValid = $("#manual-request-modify-window-valid").kendoValidator({
            errorTemplate: '',
            rules : {
                rule : (input) => {
                    if(input.is("[name=manual-request-modify-user]")){
                        return $("#manual-request-modify-user").data("kendoDropDownList").value() !== '0';
                    }else if (input.is('[name=manual-request-modify-content]')) {
                        return $('#manual-request-modify-content').data('kendoTextArea').value() !== '';
                    }
                    return true;
                }
            }
        }).data("kendoValidator");

        let userDropDown = new cpUserDropDown("#manual-request-modify-user",USER_INFO.deptId,[{useYn:"Y"}],{
            optionLabel:{
                userNm:"선택하세요",
                userId:0,
                change:()=>{
                    manualDetailValid.reset()
                }
            }});
        let userDropDownCreate = userDropDown.init();
        const deptAutoCompleteEvent = (e) => {
            manualDetailValid.reset();
            let row = dropTreeRow(e);
            let call = userDropDown.getDeptData(row.deptId);
            call.read().then(()=>{
                userDropDownCreate.setDataSource(call.data());
            });
        }
        let userAuth = manualDetailUrl.get('parentType') === "consult-manual"?"CONSULT_MANUAL_DETAIL_VIEW":"WORK_REQUEST_MANUAL_LIST";
        new cpDeptDropDownTree('#manual-request-modify-dept',{change:deptAutoCompleteEvent},userAuth,USER_INFO.deptId,IS.FALSE).init();
        $("#manual-request-modify-content").kendoTextArea({rows: 3,placeholder: "요청내용 입력..."});
        $("#manual-request-modify-btn").kendoButton({
            themeColor: "primary",
            click : () =>{
                if(!manualDetailValid.validate()) {
                    return;
                }
                manualDetailHistory.manualRequestSave();
            }
        });
    },
    manualRequestSave : () => {
        let param = {
            deptId: $("#manual-request-modify-dept").data('kendoDropDownTree').value(),
            chargeId: $("#manual-request-modify-user").data('kendoDropDownList').value(),
            requestReasonType: "Update",
            requestReason: $("#manual-request-modify-content").data('kendoTextArea').value(),
            requestManualStatus: "Request",
            approvalYn: "N",
            manualId: manualId,
        }
        let manualRequest = new cpDataSource(METHOD.POST, manualRequestInsertUrl, param).getDataSource();
        manualRequest.read().then(() => {
            message.notification({msg: "요청이 등록되었습니다."});
            $("#manual-request-modify-window").data('kendoWindow').close();
            opener.$('#request-manual-grid').data('kendoCpGrid').dataSource.read();
        });

    }
};

const manualDetailCallFunction = {
    call: (telNo) => {
        telNo = telNo.replace(/-/gi, '');
    }
};

const manualDetailQna = {
    init: () => {
        $('#manual-detail-qna').kendoListView({
            autoBind: true,
            height: '100%',
            scrollable: false,
            dataSource: manualDetailQna.dataSource(),
            layout: "flex",
            flex: {
                direction: "column"
            },
            dataBound : (e) => {
                e.sender.dataItems().map((data)=>{
                    $(`#manual-detail-listview-div-${data.manualId}`).on("click", () => {
                        if(!!originOpener &&!!originOpener.$("#program-250").length){
                            //상담메인창이 열려있으면
                            e.sender.dataItems().map((dataStyle)=>{
                                //모든 listview 아이템 배경 제거
                                $(`#manual-detail-listview-div-${dataStyle.manualId}`).css("background-color","");
                            })
                            //선택한 listview 아이템만 배경 추가
                            $(`#manual-detail-listview-div-${data.manualId}`).css("background-color","rgba(60,64,67,.160)");
                            originOpener.$("#consult-callCat").data("kendoDropDownTree").value(Number($("#manual-detail-call-cat-id").val()));
                            originOpener.$("#consult-question").data("kendoTextArea").value(data.title);
                            originOpener.$("#consult-answer").data("kendoTextArea").value(data.contents);
                        }else{
                            //상담메인창이 닫혀있으면
                        }
                    });
                    if(manualDetailUrl.get('manualId')){
                        if(data.manualId === manualDetailUrl.get('manualId')){
                            $(`#manual-detail-listview-select-qna-${data.manualId}`).show();
                        }
                    }
                })
            },
            template: kendo.template($('#manual-detail-qna-template').html())
        });
    },
    dataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: manualQnaSelectUrl,
                    type:'GET',
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function () {
                    return {
                        manualId: manualId,
                        outputYn: 'Y'
                    };
                }
            },
            schema : {
                data: 'data',
                model: {
                    companyCd: {type: 'string'},
                    manualId: {type: 'number'},
                    title: {type: 'string'},
                    html: {type: 'string'},
                    contents: {type: 'string'}
                },
                parse : (res)=>{
                    res.data.forEach(data=>{
                        data.contents = data.contents.replaceAll("\n","<br>");
                    })
                    return res;
                }
            }
        });
    }
};

const manualDetailRelatedManual = {
    init: () => {
        $('#manual-detail-related-manual').kendoListView({
            autoBind: true,
            layout: 'grid',
            height: '100%',
            scrollable: false,
            selectable: 'multiple',
            dataSource: manualDetailRelatedManual.dataSource(),
            grid: {
                cols: 1
            },
            template: kendo.template($('#manual-detail-related-manual-template').html()),
            change: () => {
                const listview = $('#manual-detail-related-manual').data('kendoListView');
                const item = listview.dataItem(listview.select())

                let detailOption = {
                    name : 'manual-detail',
                    height : 820,
                    width : 1400,
                    top : 100,
                    left : 100,
                };
                if(manualDetailUrl.get('parentType') === "consult-manual") {
                    new popupWindow(`/manual-detail?manualUuid=${item.manualUuid}&parentType=consult-manual`, '_blank', detailOption).open();
                }else if(manualDetailUrl.get('parentType') === "request-manual"){
                    new popupWindow(`/manual-detail?manualUuid=${item.manualUuid}&parentType=request-manual`, '_blank', detailOption).open();
                }else{
                    new popupWindow(`/manual-detail?manualUuid=${item.manualUuid}`, '_blank', detailOption).open();
                }
            }
        });
    },
    dataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: manualRelationSelectUrl,
                    type:'GET',
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function () {
                    return {
                        manualId: manualId,
                        outputYn: 'Y',
                        sortType: ''
                    };
                }
            },
            schema : {
                data: 'data',
                model: {
                    manualId: {type: 'number'},
                    manualUuid: {type: 'string'},
                    title: {type: 'string'}
                }
            }
        });
    }
};

const manualDetailAttachedFile = {
    init: () => {
        let getAttachedFile = new cpDataSource(METHOD.GET, '/common/v1/file/select', {
            srcId1: 'MANUAL',
            srcId2: manualId
        }).getDataSource();
        getAttachedFile.read().then(() => {
            let data = getAttachedFile.data();
            $('#manual-detail-btn-attached-file').kendoButton({
                badge: {
                    text: data.length,
                    shape: 'circle',
                    themeColor: 'error'
                }
            });
            if (data.length > 0) {
                $('#manual-detail-btn-attached-file').kendoPopover({
                    showOn: 'click',
                    header: '첨부파일',
                    body: function () {
                        let result = '<div style="height: 230px; overflow:hidden; overflow-y:scroll;">'
                        for (let i = 0; i < data.length; i++) {
                            let file = `<div style="cursor: pointer;" onclick="manualDetailFileDownload(this)" title="${data[i].fileNm}"><span style="font-size: 30px;" class="k-icon k-i-file"></span>
                            <input style="width: 80%;" class="k-input k-textbox k-no-click k-input-flat k-input-md k-rounded-md" id="${data[i].fileUuid}" value="${data[i].fileNm}" disabled />
                            <div id="manual-editor-file-progress-${i}"></div></div><br />`;
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

const manualDetailFileDownload = (e) => {
    cpFileDown(e.childNodes[2].id);
}

manualDetail.init().then(() => {
    manualDetailAttachedFile.init();
    manualDetailQna.init();
    manualDetailRelatedManual.init();

    kendo.resize('#manual-detail-container-splitter');

    window.addEventListener("resize", function() {
        $("#manual-detail-qna").find(".k-listview-content").removeAttr("style");
        $("#manual-detail-related-manual").find(".k-listview-content").removeAttr("style");
    });
});
