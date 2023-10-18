$(document).ready(() => {
    const campaignElem = `campaign-consult`;

    const campaignAuth = `CONSULT_HAPPYCALL_LIST`;
    const campaignConsultAuth = userAuthRange(campaignAuth);

    const campaignConsultSelectPageUrl = `/consult/v1/campaign-consult/select/page`;
    const campaignConsultSelectUrl = `/consult/v1/campaign-consult/select`;
    const campaignConsultCustSelectPageUrl = `/consult/v1/campaign-consult/cust/select/page`;
    const campaignConsultCustSelectItemUrl = `/consult/v1/campaign-consult/cust/select/item`;
    const campaignConsultVisitorSelectUrl = `/consult/v1/campaign-consult/visitor/select`;
    const campaignConsultVisitorInsertUrl = `/consult/v1/campaign-consult/visitor/insert`;
    const campaignConsultCustUpdateUrl = `/consult/v1/campaign-consult/cust/update`;

    let satisfactionType = [];
    let campaignConsultSearchParam = {}; //검색한 파라미터 저장 변수

    const localStorageHappyCallColumnsNm = `localStorageHappyCallColumns`;
    const localStorageHappyCallColumns = !!window.localStorage.getItem(localStorageHappyCallColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageHappyCallColumnsNm)) : null;

    const campaignConsult = {
        gridColumns : [
            {field: `campaignNm`, title: `해피콜명`, attributes: {class: `!k-text-center`}},
            {field: `startYmd`, title: `시작일자`, attributes: {class: `!k-text-center`}},
            {field: `endYmd`, title: `종료일자`, attributes: {class: `!k-text-center`}},
            {field: `campaignStatusNm`, title: `진행상태`, attributes: {class: `!k-text-center`}},
            {field: `totalCnt`, title: `총건수`, attributes: {class: `!k-text-center`}},
            {field: `noprocessingCnt`, title: `할당`, attributes: {class: `!k-text-center`}},
            {field: `doneCnt`, title: `완료`, attributes: {class: `!k-text-center`}},
            {field: `nodoneCnt`, title: `미완료`, attributes: {class: `!k-text-center`}}
        ],
        gridWidth: 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${campaignElem}-grid`,
        searchExpansion : `#${campaignElem}-expansion-panel`,
        gridSplitter : `#${campaignElem}-splitter`,
        detailSplitterWidth: `100%`,

        isSearchBtn: true,

        searchDefaultValues: [],

        init: async () => {

            gridCommonUtils.init(campaignConsult.searchExpansion, campaignConsult.gridSplitter, campaignConsult.grid, localStorageHappyCallColumnsNm);
            gridCommonUtils.gridExpansionPanel(campaignConsult.searchExpansion, campaignConsult.gridSplitter, campaignConsult.grid);

            //  Splitter
            $(campaignConsult.gridSplitter).kendoSplitter({
                orientation: `horizontal`,
                panes: [
                    {collapsible: false, size: `100%`, resizable: false},
                    {collapsible: false, size: `0%`, resizable: false}
                ]
            });

            campaignConsult.gridWidth = gridCommonUtils.gridWidthSet(campaignConsult.gridWidth, !!localStorageHappyCallColumns ? localStorageHappyCallColumns : campaignConsult.gridColumns, campaignConsult.gridSplitter);

            //  Grid
            $(campaignConsult.grid).kendoCpGrid({
                columns: !!localStorageHappyCallColumns ? localStorageHappyCallColumns : campaignConsult.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                click: (e) => {

                    campaignConsultSetting.detailOpen();

                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest(`tr`).index()];
                    if (selectRows) {
                        $(`#${campaignElem}-target-detail-btn-save`).hide();
                    }
                    if (selectRows.campaignStatus !== `Processing`) {
                        let statusNm = selectRows.campaignStatusNm;
                        if (selectRows.campaignStatus === `Ready`) statusNm = statusNm.slice(0, 2);
                        $(`#${campaignElem}-detail-campagin-status-text`).text(`${statusNm}상태인 캠페인은 처리가 불가합니다.`);
                    } else {
                        $(`#${campaignElem}-detail-campagin-status-text`).text(``);
                    }
                    $(`#${campaignElem}-campaign-id`).val(selectRows.campaignId);
                    $(`#${campaignElem}-campaign-status`).val(selectRows.campaignStatus);
                    $(`#${campaignElem}-detail-header-title`).text(selectRows.campaignNm);
                    const data = {
                        totalCnt: selectRows.totalCnt,
                        noprocessingCnt: selectRows.noprocessingCnt,
                        doneCnt: selectRows.doneCnt,
                        nodoneCnt: selectRows.nodoneCnt,
                    };
                    $(`#${campaignElem}-detail-count-grid`).data(`kendoCpGrid`).setDataSource([data]);
                    $(`#${campaignElem}-detail-target-grid`).data(`kendoCpGrid`).setDataSource(campaignConsultDataSource.custSelectDataSource());
                    rightSectionSplitterSetting.cardReset();
                },
                height: `100%`,
                width: campaignConsult.gridWidth,
                dataBound: function(){
                    if($(campaignConsult.searchExpansion).closest(`.k-expander-content-wrapper`).css(`display`) === `block`){
                        $(campaignConsult.searchExpansion).data(`kendoExpansionPanel`).toggle();
                        gridCommonUtils.gridResize(campaignConsult.gridSplitter, campaignConsult.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(campaignConsult.grid).data(`kendoCpGrid`).getOptions();
                    window.localStorage.setItem(localStorageHappyCallColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(campaignConsult.grid).data(`kendoCpGrid`).getOptions();
                        window.localStorage.setItem(localStorageHappyCallColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                }
            });
        }
    }

    const campaignConsultSetting = {
        detailOpen: () => {
            $(`#${campaignElem}-layout > .k-expander`).hide();

            let splitterTop = $(campaignConsult.gridSplitter).offset().top + 10;
            $(campaignConsult.gridSplitter).height(`calc(100vh - ${splitterTop}px)`);
            kendo.resize($(campaignConsult.gridSplitter));
            kendo.resize($(campaignConsult.grid));

            const splitter = $(campaignConsult.gridSplitter).data(`kendoSplitter`);
            const gridSplitterMainId = `#` + splitter.element.find(`.c-splitter-grid`).attr(`id`);
            const gridSplitterDetailId = `#` + splitter.element.find(`.c-splitter-detail`).attr(`id`);

            splitter.size($(gridSplitterMainId), `calc(100% - ${campaignConsult.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), campaignConsult.detailSplitterWidth);

            const gridSplitterCloseId = `#` + splitter.element.find(`.k-i-close`).parent().attr(`id`);
            $(gridSplitterCloseId).on(`click`, () => {
                campaignConsultSetting.detailClose();
            });
        },

        detailClose: () => {
            $(`#${campaignElem}-layout > .k-expander`).show();

            let splitterTop = $(campaignConsult.gridSplitter).offset().top + 10;
            $(campaignConsult.gridSplitter).height(`calc(100vh - ${splitterTop}px)`);
            kendo.resize($(campaignConsult.gridSplitter));
            kendo.resize($(campaignConsult.grid));

            const splitter = $(campaignConsult.gridSplitter).data(`kendoSplitter`);
            const gridSplitterMainId = `#` + splitter.element.find(`.c-splitter-grid`).attr(`id`);
            const gridSplitterDetailId = `#` + splitter.element.find(`.c-splitter-detail`).attr(`id`);

            splitter.size($(gridSplitterMainId), `100%`);
            splitter.size($(gridSplitterDetailId), `0%`);
        }
    }

    /**
     * 검색 및 그리드 영역
     */
    const leftSectionSplitterSetting = {
        kendoWidgetInitSetting: async () => {
            $(`#${campaignElem}-search-date-start`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: [`yyyy-MM-dd`,`yyyyMMdd`],
                value: campaignConsult.searchStartDate,
                size: `small`
            });

            $(`#${campaignElem}-search-date-end`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: [`yyyy-MM-dd`,`yyyyMMdd`],
                value: campaignConsult.searchEndDate,
                size: `small`
            });

            let campaignStatus = new cpCodeDropDownTree(`#${campaignElem}-search-status`, `CampaignStatus`, {
                value: `all`,
                clearButton: false,
                fillMode: `solid`,
                autoWidth: true
            });
            await dropDownTreeUtils.makeDropDownTree(campaignStatus, `#${campaignElem}-search-status`, IS.TRUE);

            const pageAuth = campaignConsultAuth === AUTH_RANG.NOTHING;
            const deptAuth = campaignConsultAuth === AUTH_RANG.AGENT || campaignConsultAuth === AUTH_RANG.NOTHING;

            let userDropDown = new cpUserDropDown(`#${campaignElem}-user-list`, USER_INFO.deptId, undefined, {
                fillMode: `solid`,
                autoWidth: true,
                size: `small`,
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${campaignElem}-user-check"/> 퇴사자포함</div>`
            },pageAuth,``);
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

            new cpDeptDropDownTree(`#${campaignElem}-department`, {
                change: deptAutoCompleteEvent,
                fillMode: `solid`,
                autoWidth: true
            }, campaignAuth, deptAuth?USER_INFO.deptId:1,IS.FALSE, IS.TRUE).init();

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${campaignElem}-user-check`).kendoCheckBox({
                change: ()=>{
                    const isChecked = $(`input:checkbox[id=${campaignElem}-user-check]`).is(`:checked`);
                    const param = [{useYn : [`Y`]}];
                    if (isChecked){
                        param[0] = {useYn : [`Y`,`N`]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${campaignElem}-department`).data(`kendoDropDownTree`).value());
                }
            });

            $(`#${campaignElem}-etc-search-textbox`).kendoTextBox({
                size: `small`
            }).on(`keyup`, (e) => {
                if (e.which === 13) $(`#${campaignElem}-search-button`).trigger(`click`);
            });

            $(`#${campaignElem}-search-button`).kendoButton({
                themeColor: `secondary`,
                size: "small",
                icon: `search`,
                click: () => {
                    campaignConsult.isSearchBtn = true;
                    leftSectionSplitterSetting.gridSearch();
                }
            });

            campaignConsult.searchDefaultValues.deptId = $(`#${campaignElem}-department`).data(`kendoDropDownTree`).value();
            campaignConsult.searchDefaultValues.userId = $(`#${campaignElem}-user-list`).data(`kendoDropDownList`).value();
            campaignConsult.searchDefaultValues.status = $(`#${campaignElem}-search-status`).data(`kendoDropDownTree`).value();

            $(`#${campaignElem}-search-reset`).kendoButton({
                icon: `arrow-rotate-ccw`,
                size: "small",
                themeColor: `none`,
                click: ()=> {
                    $(`#${campaignElem}-search-date-start`).data(`kendoDatePicker`).value(campaignConsult.searchStartDate);
                    $(`#${campaignElem}-search-date-end`).data(`kendoDatePicker`).value(campaignConsult.searchEndDate);
                    $(`#${campaignElem}-search-status`).data(`kendoDropDownTree`).value(campaignConsult.searchDefaultValues.status);
                    $(`#${campaignElem}-department`).data(`kendoDropDownTree`).value(campaignConsult.searchDefaultValues.deptId);
                    $(`#${campaignElem}-user-list`).data(`kendoDropDownList`).value(campaignConsult.searchDefaultValues.userId);
                    $(`#${campaignElem}-etc-search-textbox`).data(`kendoTextBox`).value(``);
                    campaignConsult.isSearchBtn = true;
                    leftSectionSplitterSetting.gridSearch();
                }
            });
        },
        gridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: campaignConsultSelectPageUrl,
                        type: `GET`,
                        dataType: `json`,
                        contentType: `application/json; charset=utf-8`,
                        complete: () => {
                            if (campaignConsult.isSearchBtn) {
                                campaignConsult.isSearchBtn = false;
                                message.notification({type: `info`});
                            }
                        }
                    },

                    parameterMap: (options) => {
                        if (campaignConsult.isSearchBtn){
                            const searchStatus = $(`#${campaignElem}-search-status`).data(`kendoDropDownTree`).value();
                            const param = {
                                parentId: 0,
                                deptId: 0,
                                userId: 0,
                                startDate: kendo.toString(new Date($(`#${campaignElem}-search-date-start`).data(`kendoDatePicker`).value()), `yyyy-MM-dd`),
                                endDate: kendo.toString(new Date($(`#${campaignElem}-search-date-end`).data(`kendoDatePicker`).value()), `yyyy-MM-dd`),
                                campaignStatus: searchStatus === `all`?``:searchStatus,
                                campaignNm: $(`#${campaignElem}-etc-search-textbox`).data(`kendoTextBox`).value(),
                                sortType: ``,
                                outputYn: `Y`,
                                page: options.page,
                                totalPage: options.pageSize,
                            };

                            if (campaignConsultAuth === AUTH_RANG.NOTHING) {
                                param.deptId = USER_INFO.deptId;
                                param.userId = USER_INFO.userId;
                            } else if (campaignConsultAuth === AUTH_RANG.AGENT) {
                                param.deptId = USER_INFO.deptId;
                                param.userId = $(`#${campaignElem}-user-list`).data(`kendoDropDownList`).value();
                            } else {
                                param.parentId = $(`#${campaignElem}-department`).data(`kendoDropDownTree`).value();
                                param.userId = $(`#${campaignElem}-user-list`).data(`kendoDropDownList`).value();
                            }

                            campaignConsultSearchParam = {...param};
                            return param;
                        } else {
                            campaignConsultSearchParam.page = options.page;
                            campaignConsultSearchParam.totalPage = options.pageSize;
                            return campaignConsultSearchParam;
                        }
                    }
                },
                schema: {
                    data: `data.rows`,
                    total: `data.totalCount`,
                    model: {
                        campaignNm: {type: `string`},
                        startYmd: {type: `date`},
                        endYmd: {type: `date`},
                        campaignStatusNm: {type: `string`},
                        totalCnt: {type: `number`},
                        noprocessingCnt: {type: `number`},
                        doneCnt: {type: `number`},
                        nodoneCnt: {type: `number`},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            row.startYmd = row.startYmd.substring(0, 4) + `-` + row.startYmd.substring(4, 6) + `-` + row.startYmd.substring(6, 8);
                            row.endYmd = row.endYmd.substring(0, 4) + `-` + row.endYmd.substring(4, 6) + `-` + row.endYmd.substring(6, 8);
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            })
        },
        gridSearch: ()=>{
            campaignConsult.isSearchBtn = true;

            let startDt = kendo.toString(new Date($(`#${campaignElem}-search-date-start`).data(`kendoDatePicker`).value()),`yyyy-MM-dd`);
            let endDt = kendo.toString(new Date($(`#${campaignElem}-search-date-end`).data(`kendoDatePicker`).value()),`yyyy-MM-dd`);
            let dept = $(`#${campaignElem}-department`).data(`kendoDropDownTree`);
            let user = $(`#${campaignElem}-user-list`).data(`kendoDropDownList`);
            let status = $(`#${campaignElem}-search-status`).data(`kendoDropDownTree`);
            let searchTxt = $(`#${campaignElem}-etc-search-textbox`).data(`kendoTextBox`);

            let searchData = [
                { label: `발송일자`, text: `${startDt} ~ ${endDt}`, value: `${startDt} ~ ${endDt}` },
                { label: `진행상태`, text: status.text(), value: status.value()},
                { label: `부서`, text: dept.text()?dept.text():`전체`, value: `${dept.value()}`},
                { label: `상담사`, text: user.text(), value: user.value() === `0`?`전체`:user.value()},
                { label: `캠페인명`, text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(campaignConsult.searchExpansion, searchData);

            $(campaignConsult.grid).data(`kendoCpGrid`).setDataSource(leftSectionSplitterSetting.gridDataSource());

            campaignConsultSetting.detailClose();
        }
    }

    /**
     * 그리드 행 클릭시 나오는 splitter 영역
     */
    const rightSectionSplitterSetting = {
        kendoWidgetInitSetting: () => {
            let satisfactionStatusSource = new cpDataSource(METHOD.GET, `/common/v1/code/CampaignCustStatus`, {}).getDataSource();
            satisfactionStatusSource.read().then(() => {
                let statusData = [...satisfactionStatusSource.data()];
                //처리결과 중 미완료 하위아이템 중 미분배 값 제거
                for (let i = 0; i < statusData.length; i++) {
                    if (statusData[i].codeNm === `미완료`) {
                        for (let j = 0; j < statusData[i].items.length; j++) {
                            if (statusData[i].items[j].codeNm === `미분배`) {
                                statusData[i].items.splice(j, 1);
                                break;
                            }
                        }
                        break;
                    }
                }
                statusData.unshift({codeNm: `전체`, codeKey: `all`});
                $(`#${campaignElem}-detail-target-processing-result`).kendoDropDownTree({
                    dataSource: statusData,
                    dataTextField: `codeNm`,
                    dataValueField: `codeKey`,
                    clearButton: false,
                    value: `all`,
                    fillMode: `solid`,
                    size: 'small',
                    change: () => {
                        $(`#${campaignElem}-detail-target-grid`).data(`kendoCpGrid`).dataSource.read();
                    }
                })

                //처리결과 중 미완료 하위아이템 중 미진행 값 제거
                for (let i = 0; i < statusData.length; i++) {
                    if (statusData[i].codeNm === `미완료`) {
                        for (let j = 0; j < statusData[i].items.length; j++) {
                            if (statusData[i].items[j].codeNm === `미진행`) {
                                statusData[i].items.splice(j, 1);
                                break;
                            }
                        }
                        break;
                    }
                }

                $(`#${campaignElem}-target-detail-processing-rating`).kendoRating({
                    min: 1,
                    max: 5,
                    value: 3,
                    label: {template: kendo.template(`<span> # if(value === 1){#매우불만족#}else if(value === 2){#불만족#}else if(value === 3){#보통#}else if(value === 4){#만족#}else if(value === 5){#매우만족#}#</span>`)},
                });

                statusData.splice(0, 1);
                $(`#${campaignElem}-target-detail-processing-result`).kendoDropDownTree({
                    dataSource: statusData,
                    dataTextField: `codeNm`,
                    dataValueField: `codeKey`,
                    fillMode: `flat`,
                    clearButton: false,
                    select: function (e) {
                        const targetDetailRating = $(`#${campaignElem}-target-detail-processing-rating`).data(`kendoRating`);
                        if ($(e.node).text().includes(`처리완료`) || $(e.node).text().includes(`미완료`)) {
                            e.preventDefault();
                        } else if ($(e.node).text() === `통화완료`) {
                            $(`#${campaignElem}-rating-div`).show();
                            //추가하기 --- 통화완료일 경우에는 rating 값 받아서 세팅하기
                            targetDetailRating.readonly(false);
                            targetDetailRating.value(3); //만족도 보통
                        } else {
                            $(`#${campaignElem}-rating-div`).hide()
                        }
                    },
                })
            }) //read end

            $(`#${campaignElem}-target-detail-consult-date`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-call-type`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-consult-type`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-consult-result`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-consult-category`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-question`).kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: `none`,
                fillMode: `flat`,
            });
            $(`#${campaignElem}-target-detail-answer`).kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: `none`,
                fillMode: `flat`,
            });
            $(`#${campaignElem}-target-detail-memo`).kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: `none`,
                fillMode: `flat`,
            });

            $(`#${campaignElem}-target-detail-bound-tel-no`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-tel-no`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-hp-no`).kendoTextBox({
                fillMode: `flat`,
                readonly: true,
            });
            $(`#${campaignElem}-target-detail-processing-reason`).kendoTextArea({
                rows: 3,
                resizable: `none`,
            });

            $(`#${campaignElem}-target-detail-btn-call-try`).kendoButton({
                click: () => {
                    $(`#${campaignElem}-visitor-window`).data(`kendoWindow`).refresh().center().open();
                }
            });

            $(`#${campaignElem}-save-validator`).kendoValidator({
                rules: {
                    required: (input) => {
                        if (input.is(`[name=processResult]`)) {
                            return input.data(`kendoDropDownTree`).value() !== ``;
                        }
                        if (input.is(`[name=processReason]`)) {
                            //통화완료 외에는 필수입력
                            if ($(`#${campaignElem}-target-detail-processing-result`).data(`kendoDropDownTree`).value() !== `CallSuccess`) {
                                return input.data(`kendoTextArea`).value() !== ``;
                            }
                        }
                        return true;
                    },
                },
                messages: {
                    required: () => {
                        return ``;
                    },
                }
            }).data(`kendoValidator`);

            $(`#${campaignElem}-target-detail-btn-save`).kendoButton({
                themeColor: `primary`,
                enable: false,
                click: () => {
                    const valid = $(`#${campaignElem}-save-validator`).data(`kendoValidator`);

                    if (valid.validate()) {
                        const param = {};
                        param.campaignId = Number($(`#${campaignElem}-campaign-id`).val());
                        param.campaignCustId = Number($(`#${campaignElem}-campaign-cust-id`).val());
                        param.boundId = Number($(`#${campaignElem}-campaign-bound-id`).val());
                        param.callId = Number($(`#${campaignElem}-campaign-call-id`).val());
                        param.campaignCustStatus = $(`#${campaignElem}-target-detail-processing-result`).data(`kendoDropDownTree`).value();
                        param.description = $(`#${campaignElem}-target-detail-processing-reason`).data(`kendoTextArea`).value();
                        if (param.campaignCustStatus === `CallSuccess`) {
                            //진행상태가 통화완료일 경우에만
                            const processingRatingValue = $(`#${campaignElem}-target-detail-processing-rating`).data(`kendoRating`).value();
                            param.satisfaction = satisfactionType[processingRatingValue - 1].codeKey;
                            rightSectionSplitterSetting.camapignConsultSave(param);
                        } else {
                            rightSectionSplitterSetting.camapignConsultSave(param);
                        }
                    }
                }
            });

            $(`#${campaignElem}-target-detail-btn-call-bound-tel-no`).on(`click`, () => {
                campaignCallFunc.call($(`#${campaignElem}-target-detail-bound-tel-no`).data(`kendoTextBox`).value());
            })

            $(`#${campaignElem}-target-detail-btn-call-tel-no`).on(`click`, () => {
                campaignCallFunc.call($(`#${campaignElem}-target-detail-tel-no`).data(`kendoTextBox`).value());
            })

            $(`#${campaignElem}-target-detail-btn-call-hp-no`).on(`click`, () => {
                campaignCallFunc.call($(`#${campaignElem}-target-detail-hp-no`).data(`kendoTextBox`).value());
            })

            $(`#${campaignElem}-detail-close`).on(`click`, () => {
                $(`#${campaignElem}-grid`).data(`kendoCpGrid`).dataSource.read();
                campaignConsultSetting.detailClose();
            })
        },

        visitorWindowPopupSetting: () => {
            $(`#${campaignElem}-visitor-window`).kendoWindow({
                width: `25%`,
                height: `60%`,
                visible: false,
                draggable: false,
                modal: true,
                title: `통화시도이력`,
                content: {
                    template: kendo.template($(`#${campaignElem}-visitor-template`).html())
                },
                open: () => {
                    campaignConsultGridSetting.visitorWindowGrid.drawGrid();
                }
            });
        },

        /**
         * 만족도타입 코드 저장
         */
        satisfactionTypeDataCall: () => {
            const satisfactionTypeSource = new cpDataSource(METHOD.GET, `/common/v1/code/SatisfactionType`, {}).getDataSource();
            satisfactionTypeSource.read().then(() => {
                satisfactionType = satisfactionTypeSource.data().sort((a, b) => b.codeIdx - a.codeIdx); //만족도 데이터 역순으로 정
            })
        },

        /**
         * 상담이력, 캠페인 처리 value 초기화
         */
        cardReset: () => {
            const targetDetailResult = $(`#${campaignElem}-target-detail-processing-result`).data(`kendoDropDownTree`);
            const targetDetailReason = $(`#${campaignElem}-target-detail-processing-reason`).data(`kendoTextArea`);
            $(`#${campaignElem}-target-detail-consult-date`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-call-type`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-consult-type`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-consult-result`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-consult-category`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-question`).data(`kendoTextArea`).value(``);
            $(`#${campaignElem}-target-detail-answer`).data(`kendoTextArea`).value(``);
            $(`#${campaignElem}-target-detail-memo`).data(`kendoTextArea`).value(``);
            $(`#${campaignElem}-target-detail-bound-tel-no`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-tel-no`).data(`kendoTextBox`).value(``);
            $(`#${campaignElem}-target-detail-hp-no`).data(`kendoTextBox`).value(``);
            targetDetailResult.value(``);
            targetDetailResult.readonly(true);
            targetDetailResult._arrow.addClass(`hidden`);
            targetDetailReason.readonly(true);
            targetDetailReason.value(``);
            $(`#${campaignElem}-target-detail-btn-call-bound-tel-no`).hide();
            $(`#${campaignElem}-target-detail-btn-call-tel-no`).hide();
            $(`#${campaignElem}-target-detail-btn-call-hp-no`).hide();
            $(`#${campaignElem}-rating-div`).hide();
            $(`#${campaignElem}-target-detail-btn-call-try`).hide(); //통화시도이력
            $(`#${campaignElem}-save-validator`).data(`kendoValidator`).reset(); //valid 초기화
        },
        /**
         * 상담이력, 캠페인 처리 value setting
         */
        cardSetting: (selectdata, selectRows) => {
            const callDt = $(`#${campaignElem}-target-detail-consult-date`).data(`kendoTextBox`);
            const boundTypeNm = $(`#${campaignElem}-target-detail-call-type`).data(`kendoTextBox`);
            const callClassNm = $(`#${campaignElem}-target-detail-consult-type`).data(`kendoTextBox`);
            const callTypeNm = $(`#${campaignElem}-target-detail-consult-result`).data(`kendoTextBox`);
            const fullCallCatNm = $(`#${campaignElem}-target-detail-consult-category`).data(`kendoTextBox`);
            const question = $(`#${campaignElem}-target-detail-question`).data(`kendoTextArea`);
            const answer = $(`#${campaignElem}-target-detail-answer`).data(`kendoTextArea`);
            const memo = $(`#${campaignElem}-target-detail-memo`).data(`kendoTextArea`);

            !!selectdata.callDt ? callDt.value(kendo.toString(new Date(selectdata.callDt), `yyyy-MM-dd H:mm`)) : callDt.value(``);
            !!selectdata.boundTypeNm ? boundTypeNm.value(selectdata.boundTypeNm) : boundTypeNm.value(``);
            !!selectdata.callClassNm ? callClassNm.value(selectdata.callClassNm) : callClassNm.value(``);
            !!selectdata.callTypeNm ? callTypeNm.value(selectdata.callTypeNm) : callTypeNm.value(``);
            !!selectdata.fullCallCatNm ? fullCallCatNm.value(selectdata.fullCallCatNm) : fullCallCatNm.value(``);
            !!selectdata.question ? question.value(selectdata.question) : question.value(``);
            !!selectdata.answer ? answer.value(selectdata.answer) : answer.value(``);
            !!selectdata.memo ? memo.value(selectdata.memo) : memo.value(``);

            // 수/발신번호, 일반전화, 휴대폰번호 유효성 체크 후 값 setting
            if (!!selectRows.boundTelNo) {
                selectRows.boundTelNo = selectRows.boundTelNo.formatterHpNo();
                if (selectRows.boundTelNo.length >= 11 && selectRows.boundTelNo.length <= 13) {
                    $(`#${campaignElem}-target-detail-bound-tel-no`).data(`kendoTextBox`).value(selectRows.boundTelNo);
                }
            } else {
                $(`#${campaignElem}-target-detail-bound-tel-no`).data(`kendoTextBox`).value(``)
            }

            if (!!selectRows.telNo) {
                selectRows.telNo = selectRows.telNo.formatterHpNo();
                if (selectRows.telNo.length >= 11 || selectRows.telNo.length <= 13) {
                    $(`#${campaignElem}-target-detail-tel-no`).data(`kendoTextBox`).value(selectRows.telNo);
                }
            } else {
                $(`#${campaignElem}-target-detail-tel-no`).data(`kendoTextBox`).value(``);
            }
            if (!!selectRows.hpNo) {
                if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(selectRows.hpNo) === true) {
                    $(`#${campaignElem}-target-detail-hp-no`).data(`kendoTextBox`).value(selectRows.hpNo);
                }
            } else {
                $(`#${campaignElem}-target-detail-hp-no`).data(`kendoTextBox`).value(``);
            }

            const targetDetailResult = $(`#${campaignElem}-target-detail-processing-result`).data(`kendoDropDownTree`);
            //미진행,처리중이 아닌 경우(처리완료)에만 dropDownTree value 세팅
            (selectRows.campaignCustStatus === `Distribution` || selectRows.campaignCustStatus === `Processing`) ? targetDetailResult.value(``) : targetDetailResult.value(selectRows.campaignCustStatus);

            if (selectRows.campaignCustStatus === `CallSuccess`) {
                const targetDetailRating = $(`#${campaignElem}-target-detail-processing-rating`).data(`kendoRating`);
                $(`#${campaignElem}-rating-div`).show();
                targetDetailRating.readonly(true);
                for (let i = 0; i < satisfactionType.length; i++) {
                    if (satisfactionType[i].codeKey === selectRows.satisfaction) {
                        targetDetailRating.value(i + 1);
                        break;
                    }
                }
            } else {
                $(`#${campaignElem}-rating-div`).hide();
            }
            const targetDetailReason = $(`#${campaignElem}-target-detail-processing-reason`).data(`kendoTextArea`);
            !!selectRows.description ? targetDetailReason.value(selectRows.description) : targetDetailReason.value(``);
        },

        /**
         * 캠페인 상담내역 저장(처리)
         */
        camapignConsultSave: (param) => {
            const campaignConsultSource = new cpDataSource(METHOD.PUT, campaignConsultCustUpdateUrl, param).getDataSource();
            campaignConsultSource.read().then(() => {
                //건수 데이터 조회
                campaignConsultSearchParam.campaignId = Number($(`#${campaignElem}-campaign-id`).val());
                const campaignSumSelect = new cpDataSource(METHOD.GET, campaignConsultSelectUrl, campaignConsultSearchParam).getDataSource();
                campaignSumSelect.read().then(() => {
                    const data = {
                        totalCnt: campaignSumSelect.data()[0].totalCnt,
                        noprocessingCnt: campaignSumSelect.data()[0].noprocessingCnt,
                        doneCnt: campaignSumSelect.data()[0].doneCnt,
                        nodoneCnt: campaignSumSelect.data()[0].nodoneCnt,
                    };
                    $(`#${campaignElem}-detail-count-grid`).data(`kendoCpGrid`).setDataSource([data]);
                    $(`#${campaignElem}-detail-target-grid`).data(`kendoCpGrid`).dataSource.read();
                    rightSectionSplitterSetting.cardReset();
                    message.notification({msg: `처리가 완료되었습니다.`, type: `success`});
                })
            })
        }
    }

    /**
     * 캠페인상담 관련 그리드 setting
     */
    const campaignConsultGridSetting = {
        detailCountGrid: {
            drawGrid: () => {
                $(`#${campaignElem}-detail-count-grid`).kendoCpGrid({
                    columns: [
                        {
                            field: `totalCnt`,
                            title: `총건수`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `noprocessingCnt`,
                            title: `할당`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `doneCnt`,
                            title: `완료`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `nodoneCnt`,
                            title: `미완료`,
                            attributes: {class: `!k-text-center`},
                        },
                    ],
                    dataSource: [{totalCnt: `0`, noprocessingCnt: `0`, doneCnt: `0`, nodoneCnt: `0`}],
                    scrollable: false,
                });
            },
        }, //detailCountGrid

        detailTargetGrid: {
            drawGrid: () => {
                $(`#${campaignElem}-detail-target-grid`).kendoCpGrid({
                    columns: [
                        {
                            field: `custNm`,
                            title: `고객명`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `boundTelNo`,
                            title: `수/발신번호`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `telNo`,
                            title: `일반전화`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `hpNo`,
                            title: `휴대폰번호`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `userNm`,
                            title: `상담원`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `boundDt`,
                            title: `해피콜일시`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `doneCnt`,
                            title: `통화시도`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `campaignCustStatusNm`,
                            title: `처리결과`,
                            attributes: {class: `!k-text-center`},
                        },
                    ],
                    dataSource: [],
                    change: (e) => {
                        const cell = e.sender.select();
                        const selectRows = e.sender.dataSource.view()[cell.closest(`tr`).index()];
                        $(`#${campaignElem}-campaign-cust-id`).val(selectRows.campaignCustId);
                        $(`#${campaignElem}-campaign-bound-id`).val(selectRows.boundId);
                        $(`#${campaignElem}-campaign-call-id`).val(selectRows.callId);
                        $(`#${campaignElem}-save-validator`).data(`kendoValidator`).reset(); //valid 초기화
                        const custSelectItemDataSource = new cpDataSource(METHOD.GET, campaignConsultCustSelectItemUrl, {
                            campaignId: selectRows.campaignId,
                            campaignCustId: selectRows.campaignCustId
                        }).getDataSource();
                        custSelectItemDataSource.read().then(() => {
                            const targetDetailSave = $(`#${campaignElem}-target-detail-btn-save`);
                            const targetDetailResult = $(`#${campaignElem}-target-detail-processing-result`).data(`kendoDropDownTree`);
                            const targetDetailBtnBoundNo = $(`#${campaignElem}-target-detail-btn-call-bound-tel-no`);
                            const targetDetailBtnTelNo = $(`#${campaignElem}-target-detail-btn-call-tel-no`);
                            const targetDetailBtnHpNo = $(`#${campaignElem}-target-detail-btn-call-hp-no`);
                            const selectdata = custSelectItemDataSource.data()[0];
                            rightSectionSplitterSetting.cardSetting(selectdata, selectRows);
                            $(`#${campaignElem}-target-detail-btn-call-try`).show(); //통화시도이력
                            targetDetailSave.show(); //내역저장
                            //캠페인 진행상태가 진행중일 경우에만
                            if ($(`#${campaignElem}-campaign-status`).val() === `Processing`) {
                                if (selectRows.campaignCustStatus === `Distribution` || selectRows.campaignCustStatus === `Processing`) {
                                    !!$(`#${campaignElem}-target-detail-bound-tel-no`).data(`kendoTextBox`).value() ? targetDetailBtnBoundNo.show() : targetDetailBtnBoundNo.hide();
                                    !!$(`#${campaignElem}-target-detail-tel-no`).data(`kendoTextBox`).value() ? targetDetailBtnTelNo.show() : targetDetailBtnTelNo.hide();
                                    !!$(`#${campaignElem}-target-detail-hp-no`).data(`kendoTextBox`).value() ? targetDetailBtnHpNo.show() : targetDetailBtnHpNo.hide();
                                    targetDetailSave.data(`kendoButton`).enable(true);
                                    $(`#${campaignElem}-target-detail-processing-reason`).data(`kendoTextArea`).readonly(false);
                                    targetDetailResult.readonly(false);
                                    targetDetailResult._arrow.removeClass(`hidden`);
                                    //미완료(미진행 or 처리중)일 경우
                                } else {
                                    //처리완료 중 하나의 값일 경우
                                    targetDetailBtnBoundNo.hide();
                                    targetDetailBtnTelNo.hide();
                                    targetDetailBtnHpNo.hide();
                                    targetDetailSave.hide();
                                    $(`#${campaignElem}-target-detail-processing-reason`).data(`kendoTextArea`).readonly(true);
                                    targetDetailResult.readonly(true);
                                    targetDetailResult._arrow.addClass(`hidden`);
                                }
                            }
                        })
                    },
                    height: `100%`,
                    resizable: false,
                    selectable: `single`,
                    pageable: {
                        refresh: true
                    },
                });
            },
        },

        visitorWindowGrid: {
            drawGrid: () => {
                $(`#${campaignElem}-visitor-grid`).kendoCpGrid({
                    columns: [
                        {
                            field: `boundDt`,
                            title: `시도일시`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `boundTelNo`,
                            title: `전화번호`,
                            attributes: {class: `!k-text-center`},
                        },
                        {
                            field: `rgtrNm`,
                            title: `상담사`,
                            attributes: {class: `!k-text-center`},
                        },
                    ],
                    dataSource: campaignConsultDataSource.visitorWindowDataSource(),
                    scrollable: false,
                    resizable: false,
                });
            },
        }
    }

    /**
     * dataSource 정의
     */
    const campaignConsultDataSource = {
        custSelectDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: campaignConsultCustSelectPageUrl,
                        type: `GET`,
                        dataType: `json`,
                        contentType: `application/json; charset=utf-8`,
                    },

                    parameterMap: (options) => {
                        const targetDetailResult = $(`#${campaignElem}-detail-target-processing-result`).data(`kendoDropDownTree`);
                        return {
                            campaignId: Number($(`#${campaignElem}-campaign-id`).val()),
                            campaignCustStatus: targetDetailResult.value() === `all` ? `` : targetDetailResult.value(),
                            parentId: campaignConsultSearchParam.parentId,
                            deptId: campaignConsultSearchParam.deptId,
                            userId: campaignConsultSearchParam.userId,
                            page: options.page,
                            totalPage: options.pageSize,
                        };
                    }
                },
                schema: {
                    data: `data.rows`,
                    total: `data.totalCount`,
                    model: {
                        custNm: {type: `string`},
                        boundTelNo: {type: `string`},
                        telNo: {type: `string`},
                        hpNo: {type: `string`},
                        userNm: {type: `string`},
                        boundDt: {type: `string`},
                        doneCnt: {type: `number`},
                        campaignCustStatusNm: {type: `number`},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (!!row.boundDt) row.boundDt = kendo.toString(new Date(row.boundDt), `yyyy-MM-dd HH:mm`)
                        })
                        return res;
                    },
                },
                serverPaging: true,
                pageSize: 15,
            })
        },
        visitorWindowDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: campaignConsultVisitorSelectUrl,
                        type: `GET`,
                        dataType: `json`,
                        contentType: `application/json; charset=utf-8`,
                    },

                    parameterMap: () => {
                        return {
                            campaignId: Number($(`#${campaignElem}-campaign-id`).val()),
                            campaignCustId: Number($(`#${campaignElem}-campaign-cust-id`).val()),
                        };
                    }
                },
                schema: {
                    data: `data`,
                    model: {
                        boundDt: {type: `string`},
                        boundTelNo: {type: `string`},
                        rgtrNm: {type: `string`},
                    },
                    parse: (res) => {
                        res.data.forEach((data) => {
                            if (!!data.boundDt) data.boundDt = kendo.toString(new Date(data.boundDt), `yyyy-MM-dd HH:mm`)
                        })
                        return res;
                    },
                },
            })
        },
    }

    const campaignCallFunc = {
        call: (telNo) => {
            if (ctiBtnAct.isMakeCall()) {
                const campaignId = $(`#${campaignElem}-campaign-id`).val();
                const campaignCustId = $(`#${campaignElem}-campaign-cust-id`).val();
                const insertVisitorCampaign = new cpDataSource(METHOD.POST, campaignConsultVisitorInsertUrl, {
                    campaignId: campaignId,
                    campaignCustId: campaignCustId,
                    boundTelNo: telNo,
                }).getDataSource();
                insertVisitorCampaign.read().then(() => {
                    $(`#${campaignElem}-detail-target-grid`).data(`kendoCpGrid`).dataSource.read();
                    ctiBtnAct.campaignSendTel(telNo, campaignId, campaignCustId);
                });
            }
        },
    }

    cpProgress(`campaign-consult-layout`);
    campaignConsult.init();
    leftSectionSplitterSetting.kendoWidgetInitSetting().then(() => {
        leftSectionSplitterSetting.gridSearch();
        rightSectionSplitterSetting.kendoWidgetInitSetting();
        rightSectionSplitterSetting.visitorWindowPopupSetting();
        rightSectionSplitterSetting.satisfactionTypeDataCall();
        campaignConsultGridSetting.detailTargetGrid.drawGrid();
        campaignConsultGridSetting.detailCountGrid.drawGrid();
        cpProgress(`campaign-consult-layout`, false);
    });
});
