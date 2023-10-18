$(document).ready(() => {
    const smsElem = 'sms-consult';
    const userAuthNm = 'CONSULT_SMS_CONSULT';
    const gridDataSourceUrl = 'consult/v1/sms/select-one-page';
    const localStorageSmsColumnsNm = 'localStorageSmsConsultGridColumns';
    const localStorageSmsColumns = !!window.localStorage.getItem(localStorageSmsColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageSmsColumnsNm)) : null;

    let smsConsultSearchParam = {};

    const smsConsultGridMain = {

        smsGridColumns : [
            {field: "smsRvStatusNm", title: "처리구분", width: 90, attributes: {style: "text-align:center"}},
            {field: "inTime", title: "수신일시", width: 130, attributes: {style: "text-align:center"}},
            {field: "telNo", title: "수신번호", width: 120, attributes: {style: "text-align:center"}},
            {field: "userNm", title: "상담사", width: 80, attributes: {style: "text-align:center"}},
            {
                field: "rvMessage",
                title: "수신내용",
                attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
            },
            {
                field: "snMessage",
                title: "발신내용",
                attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
            },
            {field: "processDt", title: "답변일시", width: 130, attributes: {style: "text-align:center"}},
            {field: "msgKindNm", title: "문자유형", width: 100, attributes: {style: "text-align:center"}},
            {field: "snResultNm", title: "전송상태", width: 100, attributes: {style: "text-align:center"}},
            {field: "smsReplyCnt", title: "발신건수", width: 80, attributes: {style: "text-align:center"}}
        ],
        gridWidth: 0,
        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),
        grid : `#${smsElem}-grid`,
        searchExpansion : `#${smsElem}-expansion-panel`,
        gridSplitter : `#${smsElem}-splitter`,
        detailSplitterWidth: '35%',
        isSearchBtn: true,
        searchDefaultValues: [],

        init: () => {
            gridCommonUtils.init(smsConsultGridMain.searchExpansion, smsConsultGridMain.gridSplitter, smsConsultGridMain.grid, localStorageSmsColumnsNm);
            gridCommonUtils.gridExpansionPanel(smsConsultGridMain.searchExpansion, smsConsultGridMain.gridSplitter, smsConsultGridMain.grid);

            $(smsConsultGridMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });

            smsConsultGridMain.gridWidth = gridCommonUtils.gridWidthSet(smsConsultGridMain.gridWidth, !!localStorageSmsColumns ? localStorageSmsColumns : smsConsultGridMain.smsGridColumns, smsConsultGridMain.gridSplitter);

            $(smsConsultGridMain.grid).kendoCpGrid({
                columns: !!localStorageSmsColumns ? localStorageSmsColumns : smsConsultGridMain.smsGridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                click: (e) => {
                    const grid = e.sender;
                    let item = grid.dataItem(grid.select());
                    smsGridDetail.detailShow(item);
                },
                height: '100%',
                width: smsConsultGridMain.gridWidth,
                dataBound: function(){
                    if($(smsConsultGridMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block'){
                        $(smsConsultGridMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        console.log(smsConsultGridMain.gridSplitter);
                        gridCommonUtils.gridResize(smsConsultGridMain.gridSplitter, smsConsultGridMain.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(smsConsultGridMain.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageSmsColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(smsConsultGridMain.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageSmsColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                }
            });

        },

        gridSetting: async () => {

            $(`#${smsElem}-search-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: smsConsultGridMain.searchStartDate,
                size: 'small'
            });

            $(`#${smsElem}-search-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: smsConsultGridMain.searchEndDate,
                size: 'small'
            });


            const userIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;
            const deptIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.AGENT || userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;


            let userDropDown = new cpUserDropDown(`#${smsElem}-search-user-id`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${smsElem}-search-user-check"> 퇴사자포함</div>`
            }, userIsReadOnly, '' );
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(()=>{
                userDropDown.setEnable(userIsReadOnly);
            });

            const deptAutoCompleteEvent =  (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            new cpDeptDropDownTree(`#${smsElem}-search-dept-id`, {change:deptAutoCompleteEvent, fillMode: 'solid', autoWidth: true}, userAuthNm, deptIsReadOnly?USER_INFO.deptId:1, IS.FALSE, IS.TRUE).init();

            const userCkeckEvent =  (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${smsElem}-search-user-check`).kendoCheckBox({
                change: function(e) {
                    const isChecked = $(`input:checkbox[id=${smsElem}-search-user-check]`).is(':checked');
                    const param = [
                        {useYn : ["Y"]}
                    ];
                    if(isChecked){
                        param[0] = {useYn : ["Y","N"]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${smsElem}-search-dept-id`).data('kendoDropDownTree').value());
                }
            });

            $(`#${smsElem}-sms-telno`).kendoTextBox({
                size: 'small',
                change : (e)=>{
                    let value = e.value;
                    if($(`#${smsElem}-search-type`).data("kendoDropDownTree").value() === "BOUND_TEL_NO"){
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).bind("keyup", function (e) {
                if (e.keyCode === 13) {
                    $(`#${smsElem}-search-button`).trigger('click');
                }
            });


            let status = new cpCodeDropDownTree(`#${smsElem}-sms-rv-status`, 'SmsCallStatus', {value: "all", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(status, `#${smsElem}-sms-rv-status`,IS.TRUE);

            let kind = new cpCodeDropDownTree(`#${smsElem}-sms-kind`, 'SmsKind', {value: "all", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(kind, `#${smsElem}-sms-kind`,IS.TRUE);

            let result = new cpCodeDropDownTree(`#${smsElem}-sms-result`, 'SmsResult', {value: "all", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(result, `#${smsElem}-sms-result`,IS.TRUE);


            $(`#${smsElem}-search-button`).kendoButton({
                themeColor: 'secondary',
                size: "small",
                icon: "search",
                click: () => {
                    smsConsultGridMain.isSearchBtn = true;
                    smsConsultGridMain.gridSearch();
                }
            });

            smsConsultGridMain.searchDefaultValues.deptId = $(`#${smsElem}-search-dept-id`).data('kendoDropDownTree').value();
            smsConsultGridMain.searchDefaultValues.userId = $(`#${smsElem}-search-user-id`).data('kendoDropDownList').value();
            smsConsultGridMain.searchDefaultValues.telNo = $(`#${smsElem}-sms-telno`).data("kendoTextBox").value();
            smsConsultGridMain.searchDefaultValues.smsRvStatus = $(`#${smsElem}-sms-rv-status`).data("kendoDropDownTree").value();
            smsConsultGridMain.searchDefaultValues.smsKind = $(`#${smsElem}-sms-kind`).data('kendoDropDownTree').value();
            smsConsultGridMain.searchDefaultValues.result = $(`#${smsElem}-sms-result`).data('kendoDropDownTree').value();

            $(`#${smsElem}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                size: "small",
                themeColor: 'none',
                click: function(){
                    $(`#${smsElem}-search-date-start`).data('kendoDatePicker').value(smsConsultGridMain.searchStartDate);
                    $(`#${smsElem}-search-date-end`).data('kendoDatePicker').value(smsConsultGridMain.searchEndDate);
                    $(`#${smsElem}-search-dept-id`).data('kendoDropDownTree').value(smsConsultGridMain.searchDefaultValues.deptId);
                    $(`#${smsElem}-search-user-id`).data('kendoDropDownList').value(smsConsultGridMain.searchDefaultValues.userId);
                    $(`#${smsElem}-sms-telno`).data("kendoTextBox").value(smsConsultGridMain.searchDefaultValues.telNo);
                    $(`#${smsElem}-sms-rv-status`).data("kendoDropDownTree").value(smsConsultGridMain.searchDefaultValues.smsRvStatus);
                    $(`#${smsElem}-sms-kind`).data('kendoDropDownTree').value(smsConsultGridMain.searchDefaultValues.smsKind);
                    $(`#${smsElem}-sms-result`).data('kendoDropDownTree').value(smsConsultGridMain.searchDefaultValues.result);

                    smsConsultGridMain.isSearchBtn = true;
                    smsConsultGridMain.gridSearch();
                }
            });
        },

        gridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: gridDataSourceUrl,
                        type: "GET",
                        contentType: "application/json",
                        dataType: "json",
                        complete: () => {
                            if (smsConsultGridMain.isSearchBtn) {
                                smsConsultGridMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        let status = $(`#${smsElem}-sms-rv-status`).data("kendoDropDownTree").value();
                        let kind = $(`#${smsElem}-sms-kind`).data('kendoDropDownTree').value();
                        let result = $(`#${smsElem}-sms-result`).data('kendoDropDownTree').value();

                        if(smsConsultGridMain.isSearchBtn){
                            const param = {
                                startDate: kendo.toString(new Date($(`#${smsElem}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                endDate: kendo.toString(new Date($(`#${smsElem}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                deptId: $(`#${smsElem}-search-dept-id`).data('kendoDropDownTree').value(),
                                userId: $(`#${smsElem}-search-user-id`).data('kendoDropDownList').value(),
                                telNo: $("#sms-consult-sms-telno").data("kendoTextBox").value().replaceAll('-', ''),
                                smsRvStatus: status === "all" ? "" : status,
                                smsKind: kind === "all" ? "" : kind,
                                result: result === "all" ? "" : result,
                                sortType: "",
                                page: options.page,
                                totalpage: options.pageSize
                            }
                            smsConsultSearchParam = {...param};
                            return param;
                        }else{
                            smsConsultSearchParam.page = options.page;
                            smsConsultSearchParam.totalPage = options.pageSize;
                            return smsConsultSearchParam;
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    data: "data.rows",
                    total: "data.totalCount",
                    model: {
                        smsRvId: {type: 'string'},
                        smsRvStatus: {type: 'string'},
                        smsRvStatusNm: {type: 'string'},
                        inTime: {type: 'string'},
                        telNo: {type: 'string'},
                        userId: {type: 'string'},
                        userNm: {type: 'string'},
                        processNm: {type: 'string'},
                        rvMessage: {type: 'string'},
                        snMessage: {type: 'string'},
                        processYn: {type: 'string'},
                        processDt: {type: 'string'},
                        msgKindNm: {type: 'string'},
                        snResultNm: {type: 'string'},
                        smsReplyCnt: {type: 'string'},
                        spamUuid: {type: 'string'}
                    },
                    parse : (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.inTime) {
                                row.inTime = kendo.toString(new Date(row.inTime), "yyyy-MM-dd H:mm");
                            }
                            if (row.processDt) {
                                row.processDt = kendo.toString(new Date(row.processDt), "yyyy-MM-dd H:mm");
                            }
                        })
                        return res;
                    }
                }
            });
        },

        gridSearch: () => {


            let startDate       = kendo.toString(new Date($(`#${smsElem}-search-date-start`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let endDate         = kendo.toString(new Date($(`#${smsElem}-search-date-end`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let deptId                  = $(`#${smsElem}-search-dept-id`).data('kendoDropDownTree');
            let userId                  = $(`#${smsElem}-search-user-id`).data('kendoDropDownList');
            let telNo                = $(`#${smsElem}-sms-telno`).data("kendoTextBox");
            let smsRvStatus               = $(`#${smsElem}-sms-rv-status`).data("kendoDropDownTree");
            let smsKind               = $(`#${smsElem}-sms-kind`).data('kendoDropDownTree');
            let result              = $(`#${smsElem}-sms-result`).data('kendoDropDownTree');


            let smsConsultSearchData = [
                { label: '최종수신일자', text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: '부서', text: deptId.text(), value: deptId.value() },
                { label: '상담사', text: userId.text(), value: userId.value() },
                { label: '수신번호', text: telNo.value(), value: telNo.value() },
                { label: '처리구분', text: smsRvStatus.text(), value: smsRvStatus.value() },
                { label: '문자유형', text: smsKind.text(), value: smsKind.value() },
                { label: '전송상태', text: result.text(), value: result.value() }
            ];

            gridCommonUtils.gridSearchPrint(smsConsultGridMain.searchExpansion, smsConsultSearchData);

            $(smsConsultGridMain.grid).data('kendoCpGrid').setDataSource(smsConsultGridMain.gridDataSource());

            smsGridDetail.detailHide();

        }

    }



    const smsGridDetail = {
        smsRvData: {},
        init: () => {

            $('#sms-consult-detail-section').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: 0, resizable: false},
                    {collapsible: false, size: 0, resizable: false},
                    {collapsible: false, size: "100%", resizable: false}
                ]
            });

            $('#sms-consult-detail-template-listview').kendoListView({
                autoBind: true,
                height: "150px",
                layout: "flex",
                flex: {
                    direction: "column",
                },
                scrollable: true,
                selectable: "single",
                template: kendo.template("<div style='padding: 5px;'><div style='padding: 3px;font-weight: bold;'>#:smsTemplateNm#</div> <div style='padding: 3px;text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'>#:smsTemplateContents#</div></div>"),
                change: () => {
                    let listView = $('#sms-consult-detail-template-listview').data("kendoListView");
                    let selected = listView.dataItem(listView.select());
                    $("#sms-consult-detail-message-input").data("kendoTextArea").value(selected.smsTemplateContents);
                }
            });
            let treeSelParam = {
                catGroupCd: "CatSmsTemplate",
                parentId: 0,
                useYn: "Y",
                delYn: "N",
                outputYn: "Y",
                sortType: "",
            }
            let tempList = new cpDataSource(METHOD.GET, "consult/v1/cat/treeSelect", treeSelParam).getDataSource();
            tempList.read().then(() => {
                let data = tempList.data().filter(e => e.catId != "Cat");
                $("#sms-consult-detail-template-select").kendoDropDownList({
                    dataSource: [{nm: "템플릿을 선택하세요.", catId: "0"}, ...data],
                    dataTextField: "nm",
                    dataValueField: "catId",
                    fillMode: "flat",
                    change: (e) => {
                        if (e.sender.element.val() != 0) {
                            let smsTemaplateData = new cpDataSource(METHOD.GET, "consult/v1/consult/sms-template-select/" + e.sender.element.val()).getDataSource();
                            smsTemaplateData.read().then(() => {
                                $('#sms-consult-detail-template-listview').data("kendoListView").setDataSource(smsTemaplateData);
                            })
                        }
                    }
                }).data("kendoDropDownList");
            });


            $('#sms-consult-detail-message-content').kendoTextArea({
                rows: 12,
                fillMode: 'flat',
                readonly: true
            });
            $("#sms-consult-detail-message-input").kendoTextArea({
                rows: 12,
                placeholder: "메세지를 입력하세요..."
            }).on('keydown', (e) => {
                if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                    if (smsGridDetail.filterExp() != "") {
                        smsGridDetail.chatSendMessage();
                    }
                    e.preventDefault();
                }
            });
            $("#sms-consult-detail-message-send-btn").kendoButton({
                icon: "c-send",
                click: () => {
                    if (smsGridDetail.filterExp() !== "") {
                        smsGridDetail.chatSendMessage();
                    }
                }
            });
            $("#sms-consult-detail-spam-ins-btn").kendoButton({
                click: () => {
                    smsGridDetail.smsSpamInsert();
                }
            });
            $("#sms-consult-detail-spam-release-btn").kendoButton({
                click: () => {
                    smsGridDetail.smsSpamRelease();
                }
            });
            $("#sms-consult-detail-sms-skip-btn").kendoButton({
                click: () => {
                    smsGridDetail.smsSkip();
                }
            });
            $("#sms-consult-detail-sms-resend-btn").kendoButton({
                click: () => {
                    $('#sms-consult-detail-sms-resend-btn').hide();
                    $("#sms-consult-detail-message-send-btn").removeAttr("disabled");
                    let messageInput = $("#sms-consult-detail-message-input").data("kendoTextArea");
                    messageInput.readonly(false);
                    messageInput.setOptions({fillMode: "solid"});
                    messageInput.value('');
                    $('#sms-consult-detail-template-select').data("kendoDropDownList").readonly(false);
                }
            });
            $("#sms-consult-detail-sms-catch-btn").kendoButton({
                themeColor: "primary",
                click: () => {
                    smsGridDetail.smsRvAllocate();
                }
            });
            $("#sms-consult-detail-sms-release-btn").kendoButton({
                click: () => {
                    smsGridDetail.smsRvAllocateRelease();
                }
            });
            $("#sms-consult-detail-info").kendoPopover({
                showOn: "mouseenter",
                position: "right",
                animation: false,
                width: "345px",
                height: "auto",
                body: function () {
                    return `<div>• 특수문자를 사용하려면 <i class="bi bi-windows"></i> + 마침표(.) 를 누르세요.
                    <br>
                    • 이모지는 사용이 불가합니다.
                    <br>
                    • 메세지 작성후 Ctrl + Enter 키 눌러 전송이 가능합니다.
                </div>`
                }
            });

            $("#sms-consult-detail-image-btn").kendoButton({
                badge: {
                    text: '0',
                    shape: 'circle',
                    themeColor: 'error'
                },
                click: () => {
                    let images = [];
                    if (!!smsGridDetail.smsRvData.attachImage1) images.push(smsGridDetail.smsRvData.attachImage1);
                    if (!!smsGridDetail.smsRvData.attachImage2) images.push(smsGridDetail.smsRvData.attachImage2);
                    if (!!smsGridDetail.smsRvData.attachImage3) images.push(smsGridDetail.smsRvData.attachImage3);

                    if (images.length > 0) {
                        $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-chat'), "0%");
                        $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-image'), "100%");
                        $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-content'), "0%");

                        $('#sms-consult-detail-image-div').html("");
                        let html = "";
                        images.forEach(image => {
                            html += `<div style="width:100%;"><img style='max-width: 90%;height:auto;' src='data:image/gif;base64,`;
                            html += image;
                            html += `' /></div>`;
                        });
                        $('#sms-consult-detail-image-div').html(html);
                    }
                }
            });

            $("#sms-consult-detail-image-close-btn").kendoButton({
                click: () => {
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-chat'), "0%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-image'), "0%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-content'), "100%");
                }
            });

            $("#sms-consult-detail-history-btn").kendoButton({
                click: () => {
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-chat'), "100%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-image'), "0%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-content'), "0%");

                    $("#sms-chat-list").html("");
                    cpProgress("sms-consult-detail-chat");

                    let contents = new cpDataSource(METHOD.GET, `/consult/v1/sms/contents/${smsGridDetail.smsRvData.smsRvId}`).getDataSource();
                    contents.read().then(() => {
                        let data = contents.data();
                        smsGridDetail.chatRenderMessage(data);
                    });
                }
            });
            $('#sms-consult-detail-history-close-btn').kendoButton({
                click: () => {
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-chat'), "0%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-image'), "0%");
                    $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-content'), "100%");
                }
            });

        },
        chatRenderMessage: (data) => {
            let sendDate;
            data.forEach((row) => {
                let msg;
                let timeStemp = "";
                if (sendDate == "" || sendDate != row.regYmd) {
                    timeStemp = `<div style="text-align: center;width: 100%;font-size: 14px;font-weight: 600;margin-top: 5px;"><span>${row.regYmd}</span></div>`;
                }
                sendDate = row.regYmd;
                if (row.type == "C") {
                    msg = `<div class="k-message-group k-no-avatar">
                        <div class="k-message k-only">
                            <p class="k-author">${row.userNm == null ? "고객" : row.userNm}</p>
                            <span class="k-bubble" style="display: inline-block">${row.message.replaceAll("\n", "</br>")}</span>
                            <span style="display: block">${row.regTime}</span>
                        </div>
                    </div>`
                } else if (row.type = "U") {
                    msg = `<div class="k-message-group k-alt k-no-avatar">
                        <div class="k-message k-only">
                            <p class="k-author">${row.userNm}</p>
                            <span class="k-bubble" style="display: inline-block;margin-left: 10px;text-align: left;">${row.message.replaceAll("\n", "</br>")}</span>
                            <span style="display: block">${row.regTime}</span>
                        </div>
                    </div>`
                }
                if (timeStemp != "") $("#sms-chat-list").append(timeStemp);
                $("#sms-chat-list").append(msg);
            });
            $(".k-message-list").scrollTop($(".k-message-list")[0].scrollHeight);
            cpProgress("sms-consult-detail-body", false);
        },
        chatSendMessage: () => {
            let listView = $('#sms-consult-detail-template-listview').data("kendoListView");
            let listViewData = listView.dataItem(listView.select());
            let sendMsgParam = {
                smsRvMid: "",
                smsRvId: smsGridDetail.smsRvData.smsRvId,
                toTelNo: smsGridDetail.smsRvData.telNo,
                smsTemplateId: listViewData ? listViewData.smsTemplateId : 0,
                message: smsGridDetail.filterExp(),
            };
            smsGridDetail.smsSend(sendMsgParam);
        },
        filterExp: () => {
            let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            return $("#sms-consult-detail-message-input").val().replace(regex, '');
        },
        buttonControl: () => {
            $("#sms-consult-detail-message-send-btn").attr("disabled", "");
            $("#sms-consult-detail-message-input").data("kendoTextArea").readonly(true);
            $("#sms-consult-detail-message-input").data("kendoTextArea").setOptions({fillMode: "flat"});
            let templete = $('#sms-consult-detail-template-select').data("kendoDropDownList");
            templete.readonly(true);
            templete.value(0);

            let lv = $('#sms-consult-detail-template-listview').data("kendoListView");
            lv.dataSource.data([]);

            $("#sms-consult-detail-spam-ins-btn").hide();
            $("#sms-consult-detail-spam-release-btn").hide();
            $("#sms-consult-detail-sms-skip-btn").hide();
            $('#sms-consult-detail-sms-release-btn').hide();
            $('#sms-consult-detail-sms-resend-btn').hide();
            $("#sms-consult-detail-sms-catch-btn").hide();

            let extend01 = USER_AUTHORITY.filter(auth => auth.authority.includes("ROLE_CONSULT_SMS_CONSULT_EXTEND_01")).length > 0;
            let rangeAll = USER_AUTHORITY.filter(auth => auth.authority.includes("ROLE_CONSULT_SMS_CONSULT_RANGE_ALL")).length > 0;

            let item = smsGridDetail.smsRvData;
            switch (item.smsRvStatus) {
                case "Receipt" :
                    $("#sms-consult-detail-spam-ins-btn").show();
                    $("#sms-consult-detail-sms-catch-btn").show();
                    $("#sms-consult-detail-sms-skip-btn").show();
                    break;
                case "Processing" :
                    $("#sms-consult-detail-spam-ins-btn").show();
                    $("#sms-consult-detail-sms-skip-btn").show();
                    if (item.userId == USER_INFO.userId || rangeAll) {
                        if (extend01) {
                            $('#sms-consult-detail-sms-release-btn').show();
                        }
                        $("#sms-consult-detail-message-send-btn").removeAttr("disabled");
                        $("#sms-consult-detail-message-input").data("kendoTextArea").readonly(false);
                        $("#sms-consult-detail-message-input").data("kendoTextArea").setOptions({fillMode: "solid"});
                        $('#sms-consult-detail-template-select').data("kendoDropDownList").readonly(false);
                    }
                    break;
                case "CallSuccess":
                case "Skip":
                case "Spam":
                    $('#sms-consult-detail-sms-resend-btn').show();
                    break;
                default:
                    break;
            }

            let path = [];
            if (!!item.attachImage1) path.push({path: item.attachImage1});
            if (!!item.attachImage2) path.push({path: item.attachImage2});
            if (!!item.attachImage3) path.push({path: item.attachImage3});

            $('#sms-consult-detail-image-btn > span').text(path.length);

        },
        smsRvAllocate: () => {
            let smsRvId = smsGridDetail.smsRvData.smsRvId;
            let allocate = new cpDataSource(METHOD.PUT, `/consult/v1/sms/allocate/${smsRvId}`).getDataSource();
            allocate.read().then(() => {
                $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                    smsGridDetail.gridRowReselect(smsRvId);
                    message.notification({msg: "지정되었습니다."});
                });
            });
        },
        smsRvAllocateRelease: () => {
            let smsRvId = smsGridDetail.smsRvData.smsRvId;
            let allocateRelease = new cpDataSource(METHOD.PUT, `/consult/v1/sms/allocate/released/${smsRvId}`).getDataSource();
            allocateRelease.read().then(() => {
                $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                    smsGridDetail.gridRowReselect(smsRvId);
                    message.notification({msg: "지정취소되었습니다."});
                });
            });
        },
        gridRowReselect: (smsRvId) => {
            let grid = $('#sms-consult-grid').data("kendoCpGrid");
            let data = grid.dataSource.data();
            let uid = "";

            data.forEach(row => {
                let id = row.smsRvId;
                if (smsRvId == id) uid = row.uid;
            });

            if (!!uid) {
                let row = grid.table.find("[data-uid=" + uid + "]");
                grid.select(row);
            }
        },
        smsSpamInsert: () => {
            message.callBackConfirm({
                msg: '스팸번호로 등록하시겠습니까?', callback: () => {
                    let smsRvId = smsGridDetail.smsRvData.smsRvId;
                    let param = {
                        spamTelNo: smsGridDetail.smsRvData.telNo.replaceAll("-", ""),
                        smsRvId: smsRvId
                    }

                    let spamIns = new cpDataSource(METHOD.POST, "/consult/v1/sms/spam/insert", param, "", "", 'application/json; charset=utf-8').getDataSource();
                    spamIns.read().then(() => {
                        $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                            smsGridDetail.gridRowReselect(smsRvId);
                            message.notification({msg: "스팸등록 되었습니다."});
                        });
                    });
                }
            });
        },
        smsSpamRelease: () => {
            let smsRvId = smsGridDetail.smsRvData.smsRvId;
            const spamRelease = new cpDataSource(METHOD.PUT, `/consult/v1/sms/spam-release/${smsGridDetail.smsRvData.spamUuid}`).getDataSource();
            spamRelease.read().then(() => {
                smsGridDetail.detailSelect(smsRvData);
                $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                    smsGridDetail.gridRowReselect(smsRvId);
                    message.notification({msg: "스팸해제 되었습니다."});
                });
            });
        },
        smsSkip: () => {
            message.callBackConfirm({
                msg: '문자상담을 스킵하시겠습니까?', callback: () => {
                    let smsRvId = smsGridDetail.smsRvData.smsRvId;
                    let skip = new cpDataSource(METHOD.PUT, `/consult/v1/sms/skip/${smsRvId}`).getDataSource();
                    skip.read().then(() => {
                        $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                            smsGridDetail.gridRowReselect(smsRvId);
                            message.notification({msg: "문자상담이 스킵되었습니다."});
                        });
                    });
                }
            });
        },
        smsSend: (sendMsgParam) => {
            message.callBackConfirm({
                msg: '문자를 전송하시겠습니까?', callback: () => {
                    const smsSend = new cpDataSource(METHOD.POST, "/consult/v1/sms/send", sendMsgParam).getDataSource();
                    smsSend.read().then(() => {
                        $('#sms-consult-grid').data('kendoCpGrid').dataSource.read().then(() => {
                            smsGridDetail.gridRowReselect(sendMsgParam.smsRvId);
                            message.notification({msg: "문자를 전송했습니다."});
                            smsGridDetail.buttonControl();
                        });
                    });
                }
            });
        },
        detailShow: (selected) => {
            const splitter = $(smsConsultGridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), `calc(100% - ${smsConsultGridMain.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), smsConsultGridMain.detailSplitterWidth);

            const gridSplitterCloseId = '#' + splitter.element.find('.k-i-close').parent().attr('id');
            $(gridSplitterCloseId).on('click', () => {
                smsGridDetail.detailHide();
            });

            smsGridDetail.detailSelect(selected);
        },
        detailHide: () => {

            const splitter = $(smsConsultGridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');

        },
        detailSelect: (item) => {

            $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-chat'), "0%");
            $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-image'), "0%");
            $("#sms-consult-detail-section").data("kendoSplitter").size($('#sms-consult-detail-content'), "100%");

            smsGridDetail.smsRvData = item;

            $('#sms-consult-detail-message-content').data("kendoTextArea").value(item.rvMessage);
            $('#sms-consult-detail-message-input').data("kendoTextArea").value(item.snMessage);

            smsGridDetail.buttonControl();
        },
    }

    cpProgress(`${smsElem}-layout`);
    smsConsultGridMain.init();
    smsConsultGridMain.gridSetting().then(()=>{
        smsConsultGridMain.gridSearch();
        smsGridDetail.init();
        cpProgress(`${smsElem}-layout`, false);
    });
});
