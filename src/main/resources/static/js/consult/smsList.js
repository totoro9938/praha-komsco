$(document).ready(() => {
    
    const smsListElem = `smsList`;
    const smsListSelectPageUrl = `/consult/v1/sms-list/select/page`;
    const smsListInsertReSendUrl = `/consult/v1/sms-list/insert/re-send`;
    const smsListAuth = `CONSULT_SMS_LIST`;
    const smsListAuthCheck = userAuthRange(smsListAuth);

    const reSendParam = {};
    let smsListSearchParam = {};

    const localStorageSmsListColumnsNm = 'localStorageSmsListGridColumns';
    const localStorageSmsListColumns = !!window.localStorage.getItem(localStorageSmsListColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageSmsListColumnsNm)) : null;

    const smsList = {
        isSearchBtn : true,
        gridColumns : [
            {
                field: `regDt`,
                title: `발송일시`,
                attributes: {class: '!k-text-center'},
                width: 160,
            },
            {
                field: `toTelNo`,
                title: `발송 전화번호`,
                attributes: {class: '!k-text-center'},
                width: 140,

            },
            {
                field: `custNm`,
                title: `고객명`,
                attributes: {class: '!k-text-center'},
                width: 100,
            },
            {
                field: `smsTypeNm`,
                title: `문자구분`,
                attributes: {class: '!k-text-center'},
                width: 150,
            },
            {
                field: `message`,
                title: `발송문자`,
                attributes: {style: `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`},
            },
            {
                field: `resultNm`,
                title: `발송결과`,
                attributes: {class: '!k-text-center'},
                width: 100,
            },
            {
                field: `rgtrNm`,
                title: `발송자`,
                attributes: {class: '!k-text-center'},
                width: 100,
            }
        ],
        gridWidth : 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${smsListElem}-grid`,
        searchExpansion : `#${smsListElem}-expansion-panel`,
        gridSplitter : `#${smsListElem}-splitter`,
        detailSplitterWidth : `35%`,

        searchDefaultValues : [],

        init: async () => {

            gridCommonUtils.init(smsList.searchExpansion, smsList.gridSplitter, smsList.grid, localStorageSmsListColumnsNm);
            gridCommonUtils.gridExpansionPanel(smsList.searchExpansion, smsList.gridSplitter, smsList.grid);

            $(smsList.gridSplitter).kendoSplitter({
                orientation : 'horizontal',
                panes : [
                    {collapsible : false, size : '100%', resizable : false},
                    {collapsible : false, size : '0%', resizable : false},
                ]
            });

            smsList.gridWidth = gridCommonUtils.gridWidthSet(smsList.gridWidth, !!localStorageSmsListColumns ? localStorageSmsListColumns : smsList.gridColumns, smsList.gridSplitter);

            $(smsList.grid).kendoCpGrid({
                toolbar: [
                    { template: kendo.template($(`#smsList-toolbar-template`).html()) }
                ],
                columns: !!localStorageSmsListColumns ? localStorageSmsListColumns : smsList.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                height: '100%',
                width: smsList.gridWidth,
                excel: {allPages: true},
                click: (e) => {
                    let selectItem = e.sender.dataItem(e.sender.select());
                    smsListDetail.detailShow(selectItem);
                },
                dataBound: function(){
                    if($(smsList.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block'){
                        $(smsList.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(smsList.gridSplitter, smsList.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(smsList.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageSmsListColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(smsList.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageSmsListColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                },
                excelExport: (e) => {
                    let programId = MENU_ARRAY.find(r => r.roleNm === smsListAuth).programId;
                    let dataCnt = $(smsList.grid).data('kendoCpGrid').dataSource.total();
                    let description = $(smsList.searchExpansion).data('kendoExpansionPanel').header.find('.k-expander-title').html();
                    description = description.replace(/(<([^>]+)>)/gi, '');
                    let excelParam = {
                        programId: programId,
                        dataCnt: dataCnt,
                        description: description
                    }
                    new cpDataSource(METHOD.POST, "/log/v1/excel/loginsert", excelParam).getDataSource().read();
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "메시지발송리스트 " + rangedate + ".xlsx";
                }
            });

            $(`#${smsListElem}-toolbar-button-excel-down`).kendoButton({
                icon: `download`,
                size: "small",
                themeColor: `success`,
                click: () => {
                    $(smsList.grid).data(`kendoCpGrid`).saveAsExcel();
                }
            });
        }
    }
    /**
     * smsList grid 관련 세팅
     */
    const smsListGrid = {
        gridSetting : async ()=>{
            $(`#${smsListElem}-search-date-start`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: smsList.searchStartDate,
                size: 'small'
            });

            $(`#${smsListElem}-search-date-end`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: smsList.searchEndDate,
                size: 'small'
            });

            const pageAuth = smsListAuthCheck === AUTH_RANG.NOTHING;
            const deptAuth = smsListAuthCheck === AUTH_RANG.AGENT || smsListAuthCheck === AUTH_RANG.NOTHING;

            let userDropDown = new cpUserDropDown(`#${smsListElem}-user-list`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${smsListElem}-user-check"/> 퇴사자포함</div>`
            },pageAuth,'');
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(() => {
                userDropDown.setEnable(pageAuth);
            });

            const deptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            new cpDeptDropDownTree(`#${smsListElem}-department`, {
                change: deptAutoCompleteEvent,
                fillMode: 'solid',
                autoWidth: true
            }, smsListAuth, deptAuth?USER_INFO.deptId:1,IS.FALSE, IS.TRUE).init();

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${smsListElem}-user-check`).kendoCheckBox({
                change: ()=>{
                    const isChecked = $(`input:checkbox[id=${smsListElem}-user-check]`).is(":checked");
                    const param = [{useYn : ["Y"]}];
                    if (isChecked){
                        param[0] = {useYn : ["Y","N"]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${smsListElem}-department`).data("kendoDropDownTree").value());
                }
            });

            let searchType = new cpCodeDropDownTree(`#${smsListElem}-etc-search-dropdown`, `SmsSearchType`, {
                value: "ToHpNo",
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            await dropDownTreeUtils.makeDropDownTree(searchType, `#${smsListElem}-etc-search-dropdown`);

            $(`#${smsListElem}-etc-search-textbox`).kendoTextBox({
                size: "small",
                change: (e) => {
                    let value = e.value;
                    if ($(`#${smsListElem}-etc-search-dropdown`).data(`kendoDropDownTree`).value() === `ToHpNo`) {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).on(`keyup`, (e) => {
                if (e.which === 13) $(`#${smsListElem}-search-button`).trigger('click');
            });

            $(`#${smsListElem}-search-button`).kendoButton({
                themeColor: 'secondary',
                size: "small",
                icon: "search",
                click: () => {
                    smsList.isSearchBtn = true;
                    smsListGrid.gridSearch();
                }
            });

            smsList.searchDefaultValues.deptId = $(`#${smsListElem}-department`).data('kendoDropDownTree').value();
            smsList.searchDefaultValues.userId = $(`#${smsListElem}-user-list`).data('kendoDropDownList').value();
            smsList.searchDefaultValues.type = $(`#${smsListElem}-etc-search-dropdown`).data(`kendoDropDownTree`).value();

            $(`#${smsListElem}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                size: "small",
                themeColor: 'none',
                click: ()=> {
                    $(`#${smsListElem}-search-date-start`).data('kendoDatePicker').value(smsList.searchStartDate);
                    $(`#${smsListElem}-search-date-end`).data('kendoDatePicker').value(smsList.searchEndDate);
                    $(`#${smsListElem}-department`).data('kendoDropDownTree').value(smsList.searchDefaultValues.deptId);
                    $(`#${smsListElem}-user-list`).data('kendoDropDownList').value(smsList.searchDefaultValues.userId);
                    $(`#${smsListElem}-etc-search-dropdown`).data('kendoDropDownTree').value(smsList.searchDefaultValues.type);
                    $(`#${smsListElem}-etc-search-textbox`).data('kendoTextBox').value('');
                    smsList.isSearchBtn = true;
                    smsListGrid.gridSearch();
                }
            });
        },
        smsGridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: smsListSelectPageUrl,
                        type: `GET`,
                        dataType: `json`,
                        contentType: `application/json; charset=utf-8`,
                        complete: () => {
                            if (smsList.isSearchBtn) {
                                smsList.isSearchBtn = false;
                                message.notification({type: `info`});
                            }
                        }
                    },

                    parameterMap: (options) => {
                        if (smsList.isSearchBtn) {
                            const param = {
                                parentId: 0,
                                deptId: 0,
                                userId: 0,
                                custId: 0,
                                startDt: kendo.toString(new Date($(`#${smsListElem}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                endDt: kendo.toString(new Date($(`#${smsListElem}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                searchType: $(`#${smsListElem}-etc-search-dropdown`).data(`kendoDropDownTree`).value(),
                                searchTxt: $(`#${smsListElem}-etc-search-textbox`).data(`kendoTextBox`).value(),
                                outputYn: `Y`,
                                sortType: ``,
                                page: options.page,
                                totalPage: options.pageSize,
                            };

                            if (smsListAuthCheck === AUTH_RANG.NOTHING) {
                                param.deptId = USER_INFO.deptId;
                                param.userId = USER_INFO.userId;
                            } else if (smsListAuthCheck === AUTH_RANG.AGENT) {
                                param.deptId = USER_INFO.deptId;
                                param.userId = $(`#${smsListElem}-user-list`).data(`kendoDropDownList`).value();
                            } else {
                                param.parentId = $(`#${smsListElem}-department`).data(`kendoDropDownTree`).value();
                                param.userId = $(`#${smsListElem}-user-list`).data(`kendoDropDownList`).value();
                            }
                            smsListSearchParam = {...param};
                            return param;
                        } else {
                            smsListSearchParam.page = options.page;
                            smsListSearchParam.totalPage = options.pageSize;
                            return smsListSearchParam;
                        }
                    }
                },
                schema: {
                    data: `data.rows`,
                    total: `data.totalCount`,
                    model: {
                        regDt: {type: `date`},
                        toTelNo: {type: `string`},
                        custNm: {type: `string`},
                        smsTypeNm: {type: `string`},
                        message: {type: `string`},
                        resultNm: {type: `string`},
                        rgtrNm: {type: `string`}
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            row.regDt = kendo.toString(new Date(row.regDt), `yyyy-MM-dd HH:mm`)
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            })
        },
        gridSearch: () => {
            smsList.isSearchBtn = true;

            let startDt = kendo.toString(new Date($(`#${smsListElem}-search-date-start`).data("kendoDatePicker").value()),"yyyy-MM-dd");
            let endDt = kendo.toString(new Date($(`#${smsListElem}-search-date-end`).data("kendoDatePicker").value()),"yyyy-MM-dd");
            let dept = $(`#${smsListElem}-department`).data("kendoDropDownTree");
            let user = $(`#${smsListElem}-user-list`).data("kendoDropDownList");
            let searchType = $(`#${smsListElem}-etc-search-dropdown`).data("kendoDropDownTree");
            let searchTxt = $(`#${smsListElem}-etc-search-textbox`).data("kendoTextBox");

            let smsListSearchData = [
                { label: '발송일자', text: `${startDt} ~ ${endDt}`, value: `${startDt} ~ ${endDt}` },
                { label: '부서', text: dept.text(), value: dept.value()},
                { label: '발송자', text: user.text(), value: user.value()?user.value():'전체'},
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(smsList.searchExpansion, smsListSearchData);

            $(smsList.grid).data("kendoCpGrid").setDataSource(smsListGrid.smsGridDataSource());

            smsListDetail.detailHide();
        }
    }

    const smsListDetail = {
        init : ()=>{

            $(`#${smsListElem}-detail-send-date`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });

            $(`#${smsListElem}-detail-send-message`).kendoTextArea({
                readonly: true,
                rows: 20,
                cols: 30,
                resizable: `none`,
                fillMode: `flat`,
            });

            $(`#${smsListElem}-phone-number-textbox`).kendoTextBox({
                change: (e) => {
                    let value = e.value.replaceAll(`-`,``);
                    const maxLength = 11;
                    if (value.length > maxLength) {
                        value = value.substring(0, maxLength);
                    }
                    e.sender.element.val(value.formatterHpNo());
                }
            });

            $(`#${smsListElem}-re-send-btn`).kendoButton({
                themeColor: `primary`,
                click: () => {
                    reSendParam.toTelNo = $(`#${smsListElem}-phone-number-textbox`).data(`kendoTextBox`).value();
                    const smsResend = new cpDataSource(`POST`, smsListInsertReSendUrl, reSendParam).getDataSource();
                    smsResend.read().then(() => {
                        $(smsList.grid).data(`kendoCpGrid`).dataSource.read();
                        const obj = {msg: `문자가 재발송 되었습니다.`, type: `success`};
                        message.notification(obj);
                    })
                }
            });

            $(`#${smsListElem}-resend-date`).kendoTextBox({
                fillMode: `flat`,
                readonly: true
            });

            $(`#${smsListElem}-resend-number`).kendoTextBox({
                fillMode: `flat`,
                readonly: true
            });
        },
        detailShow : ()=>{

            const splitter = $(smsList.gridSplitter).data("kendoSplitter");
            const gridSplitterMainId = `#${splitter.element.find('.c-splitter-grid').attr('id')}`;
            const gridSplitterDetailId = `#${splitter.element.find('.c-splitter-detail').attr('id')}`;

            splitter.size($(gridSplitterMainId), `calc(100% - ${smsList.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), smsList.detailSplitterWidth);

            const gridDetailSplitterCloseId = `#${splitter.element.find('.k-i-close').parent().attr('id')}`;
            $(gridDetailSplitterCloseId).on('click', ()=>{
                smsListDetail.detailHide();
            })

            const skeleton = $(`#${smsListElem}-detail-body dd`);
            const skeleton2 = $(`#${smsListElem}-resend-box input`);
            skeletonClass(skeleton);
            skeletonClass(skeleton2);
            const grid = $(smsList.grid).data("kendoCpGrid");
            const selectRows = grid.dataItem(grid.select());
            Object.assign(reSendParam, selectRows);
            //예약발송일 및 이미지경로 null값으로 할당해도 된다면 지워도 됨
            reSendParam.smsGroupId = 0; //재발송일 때는 0
            reSendParam.smsId = 0; //재발송일 때는 0
            reSendParam.srcId01 = `RESEND`;
            reSendParam.srcId02 = selectRows.smsGroupId;
            reSendParam.srcId03 = selectRows.smsId;
            reSendParam.reservationDt = ``; //예약발송일
            reSendParam.imagePath_01 = ``;
            reSendParam.imagePath_02 = ``;
            reSendParam.imagePath_03 = ``;
            reSendParam.resultMessage = selectRows.resultNm;

            $(`#${smsListElem}-detail-send-date`).data(`kendoTextBox`).value(selectRows.regDt);
            $(`#${smsListElem}-detail-send-message`).data(`kendoTextArea`).value(selectRows.message);
            $(`#${smsListElem}-phone-number-textbox`).data(`kendoTextBox`).value(selectRows.toTelNo);

            const smsSelectItem = new cpDataSource(METHOD.GET, `/consult/v1/sms-list/select/item/${selectRows.smsUuid}`, {}).getDataSource();
            smsSelectItem.read().then(() => {
                skeletonClass(skeleton, false);
                skeletonClass(skeleton2, false);
                const resendData = smsSelectItem.data()[0];
                //재발송한 문자인 경우
                if (!!resendData.oriPhoneNumber && !!resendData.oriSendDt) {
                    $(`#${smsListElem}-resend-box`).show();
                    resendData.oriSendDt = kendo.toString(new Date(resendData.oriSendDt), `yyyy-MM-dd HH:mm`)
                    $(`#${smsListElem}-resend-date`).data(`kendoTextBox`).value(resendData.oriSendDt);
                    $(`#${smsListElem}-resend-number`).data(`kendoTextBox`).value(resendData.oriPhoneNumber);
                } else {
                    $(`#${smsListElem}-resend-box`).hide();
                }
            })
        },
        detailHide : ()=>{
            const splitter = $(smsList.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');
        }
    }

    cpProgress(`${smsListElem}-layout`);
    smsList.init();
    smsListGrid.gridSetting().then(() => {
        smsListGrid.gridSearch();
        smsListDetail.init();
        cpProgress(`${smsListElem}-layout`, false);
    });
});
