$(document).ready(() => {
    const manualRelAuth = userAuthRange("WORK_RELATE_MANUAL_MGR");
    const manualRelationElem = `manual-relation`;
    const manualRelSelectPageUrl = "/knowledge/v1/manual-relation/select/page";
    const manualRelSelectRelationUrl = "/knowledge/v1/manual-relation/select/relation";
    const manualRelInsertRelationUrl = "/knowledge/v1/manual-relation/insert/relation";
    const manualRelDeleteRelationUrl = "/knowledge/v1/manual-relation/delete/relation";
    const localStorageGridColumnsNm = 'localStorageRelationGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;
    let manualDragId;
    let manualIsDrop = false;
    let originManualRelationDatas = [];

    const manualRelationGrid = {
        sortTypeObj: {},
        gridColumns: [
            {
                field: "title",
                title: "매뉴얼제목",
                attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                sortable: false
            },
            {
                field: "callCatNm",
                title: "상담분류",
                sortable: false
            },
            {
                field: "regDt",
                title: "등록일",
                width: 150,
                attributes: {style: 'text-align:center'},
                sortable: true
            },
            {
                field: "mdfDt",
                title: "수정일",
                width: 150,
                attributes: {style: 'text-align:center'},
                sortable: true
            },
            {
                field: "useYn",
                title: "사용여부",
                width: 70,
                attributes: {style: 'text-align:center'},
                sortable: false,
                template: "#= useYn #"
            },
            {
                field: "manualRelationCnt",
                title: "건수",
                width: 70,
                attributes: {style: 'text-align:center'},
                sortable: true
            },
        ],
        gridWidth: 0,
        grid: `#${manualRelationElem}-grid`,
        searchExpansion: `#${manualRelationElem}-expansion-panel`,
        gridSplitter: `#${manualRelationElem}-splitter`,
        searchDefaultValues: [],
        useYnDataSource: [],
        isSearchBtn: false,

        init: () => {

            $(`#${manualRelationElem}-left-section-splitter`).kendoSplitter({
                orientation: "horizontal",
                panes: [
                    {collapsible: false, size: "65%", resizable: false, scrollable:false},
                    {collapsible: false, size: "35%", resizable: false, scrollable:false},

                ],

            });

            gridCommonUtils.init(manualRelationGrid.searchExpansion, manualRelationGrid.gridSplitter, manualRelationGrid.grid, localStorageGridColumnsNm);
            gridCommonUtils.gridExpansionPanel(manualRelationGrid.searchExpansion, manualRelationGrid.gridSplitter, manualRelationGrid.grid);

            $(manualRelationGrid.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });

            manualRelationGrid.gridWidth = gridCommonUtils.gridWidthSet(manualRelationGrid.gridWidth, !!localStorageGridColumns ? localStorageGridColumns : manualRelationGrid.gridColumns, manualRelationGrid.gridSplitter);

            $(manualRelationGrid.grid).kendoCpGrid({
                columns: !!localStorageGridColumns ? localStorageGridColumns : manualRelationGrid.gridColumns,
                height: '100%',
                width: manualRelationGrid.gridWidth,
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                pageable: {
                    refresh: true
                },
                autoBind: true,
                change: (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    manualDragId = selectRows.manualId;
                    $(`#${manualRelationElem}-manual-uuid`).val(selectRows.manualUuid);
                    $(`#${manualRelationElem}-manual-id`).val(selectRows.manualId);
                    $(`#${manualRelationElem}-detail-btn`).show();
                    $(`#${manualRelationElem}-reset-btn`).show();
                    $(`#${manualRelationElem}-save-btn`).show();
                    $(`#${manualRelationElem}-drop-target-guide-text`).text("연관시킬 메뉴얼을 드래그 해주세요");

                    $(`#${manualRelationElem}-detail-title`).data("kendoTextBox").value(selectRows.title);
                    $(`#${manualRelationElem}-detail-consult-cat`).data("kendoTextBox").value(selectRows.callCatNm);
                    $(`#${manualRelationElem}-detail-reg-dt`).data("kendoTextBox").value(selectRows.regDt);
                    $(`#${manualRelationElem}-detail-mdf-dt`).data("kendoTextBox").value(selectRows.mdfDt);
                    $(`#${manualRelationElem}-detail-dept`).data("kendoTextBox").value(selectRows.fullDeptNm);
                    $(`#${manualRelationElem}-detail-agent`).data("kendoTextBox").value(selectRows.chargeNm);

                        const relationManual = new cpDataSource(METHOD.GET, manualRelSelectRelationUrl, {
                            manualId: manualDragId,
                            outputYn: "Y",
                            sortType: ""
                        }).getDataSource();
                            relationManual.read().then(() => {
                                originManualRelationDatas = [...relationManual.data()]; //deep copy
                                $(`#${manualRelationElem}-drag-grid`).data('kendoCpGrid').dataSource.data(relationManual.data());
                        })
                },
                dataBound: () => {
                    if ($(manualRelationGrid.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block') {
                        $(manualRelationGrid.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(manualRelationGrid.gridSplitter, manualRelationGrid.grid);
                    }
                },

                sort: (e) => {
                    if (e.sort.field === "regDt") {
                        manualRelationGrid.sortTypeObj.field = "B.REG_DT";
                    } else if (e.sort.field === "mdfDt") {
                        manualRelationGrid.sortTypeObj.field = "B.MDF_DT";
                    }
                    manualRelationGrid.sortTypeObj.dir = e.sort.dir;
                },
                columnResize: () => {
                    const gridOptions = $(manualRelationGrid.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function () {
                        const gridOptions = $(manualRelationGrid.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                },
            });

            $(`#${manualRelationElem}-grid`).kendoDraggable({
                filter: '.k-master-row',
                dragstart: function (e) {
                    const grid = $(`#${manualRelationElem}-grid`).data('kendoCpGrid');
                    let draggedItem = grid.dataItem(e.currentTarget);
                    let hasItem = $(`#${manualRelationElem}-drag-grid`).data('kendoCpGrid').dataSource.data().find(e => e.manualId == draggedItem.manualId);
                    if (manualDragId === undefined || manualDragId === draggedItem.manualId ||
                        hasItem !== undefined) {
                        //선택된 메뉴얼id가 없거나, 선택된 메뉴얼id가 드래그한 메뉴얼id와 동일할 경우나, 드래그한 메뉴얼id가 이미 연관되어있는 메뉴얼 id들 중 하나라도 같다면
                        return;
                    }
                    $(`#${manualRelationElem}-drag-grid`).css({'border-color': '#ff6347'});
                },
                dragend: function (e) {
                    $(`#${manualRelationElem}-drag-grid`).css({'border-color': '#dee2e6'});
                },
                hint: function (element) {
                    const grid = $(`#${manualRelationElem}-grid`).data('kendoCpGrid');
                    let draggedItem = grid.dataItem(element);
                    let hasItem = $(`#${manualRelationElem}-drag-grid`).data('kendoCpGrid').dataSource.data().find(e => e.manualId == draggedItem.manualId);
                    if (manualDragId === undefined || manualDragId === draggedItem.manualId ||
                        hasItem !== undefined) {
                        //선택된 메뉴얼id가 없거나, 선택된 메뉴얼id가 드래그한 메뉴얼id와 동일할 경우나, 드래그한 메뉴얼id가 이미 연관되어있는 메뉴얼 id들 중 하나라도 같다면
                        manualIsDrop = false;
                        return;
                    }
                    manualIsDrop = true;
                    return $("<div><em style='font-size:32px' class='k-icon k-i-file-add'></em></div>");
                },
                cursorOffset: {top: -30, left: -35}
            });
        },
        gridSetting: async () => {
            manualRelationGrid.useYnDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/useYn", {}).getDataSource();
            await manualRelationGrid.useYnDataSource.read().then(() => {
                $(`#${manualRelationElem}-use-type`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(manualRelationGrid.useYnDataSource.data(), true),
                    index: 0,
                    size: 'small'
                });
            });

            let callCat = new cpCatDropDownTree(`#${manualRelationElem}-search-call-cat`, {
                value: "0", placeholder: "전체", clearButton: false, fillMode: 'solid', autoWidth: true
            });
            callCat.create();
            let data = await callCat.getData();
            let allObject = {
                catId: "0",
                catNm: "전체",
                fullCatNm: "전체",
                items: [],
            }
            let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject, ...data.options.data]});
            $(`#${manualRelationElem}-search-call-cat`).data("kendoDropDownTree").setDataSource(dataSource);

            $(`#${manualRelationElem}-search-type`).kendoDropDownList({
                fillMode: 'solid',
                dataSource: {
                    data: [
                        {codeNm: '제목', codeKey: 'Title'},
                        {codeNm: '내용', codeKey: 'Contents'},
                    ]
                },
                dataTextField: 'codeNm',
                dataValueField: 'codeKey'
            });
            $(`#${manualRelationElem}-search-text`).kendoTextBox({
                size: 'small',
            }).bind('keyup', function (e) {
                if (e.keyCode === 13) {
                    $(`#${manualRelationElem}-search-btn-button`).trigger('click');
                }
            })
            const manualRelationDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                let call = manualRelationUser.getDeptData(row.deptId);
                call.read().then(() => {
                    manualRelationUserCreate.setDataSource(call.data());
                    manualRelationUserCreate.value(0);
                });
            }

            const pageAuth = manualRelAuth === AUTH_RANG.NOTHING;
            const pageAuthSub = manualRelAuth !== AUTH_RANG.SUB;
            let setDeptId = !pageAuth && USER_INFO.topDeptId === 1 ? 1 : USER_INFO.deptId;
            if (pageAuth) setDeptId = USER_INFO.deptId;

            manualRelationUser = new cpUserDropDown("#manual-relation-charge-id", setDeptId, undefined, {
                value: 1,
                clearButton: false,
                fillMode: "solid",
            }, pageAuth);
            manualRelationUserCreate = manualRelationUser.create();
            await manualRelationUser.drawingList().then(() => {
                manualRelationUser.setEnable(pageAuth);
            });

            new cpDeptDropDownTree('#manual-relation-search-dept-id', {
                change: manualRelationDeptAutoCompleteEvent,setDeptId,pageAuthSub,
                clearButton: false,
                filter: "none",
                fillMode: "solid",
            }, "WORK_MANUAL_MGR",0,IS.TRUE).init();


            $(`#${manualRelationElem}-search-btn-button`).kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    manualRelationGrid.manualRelationGridSearch();
                }
            });

            manualRelationGrid.searchDefaultValues.type = 'Title';
            manualRelationGrid.searchDefaultValues.useYn = 0;

            $(`#${manualRelationElem}-search-btn-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function () {
                    $(`#${manualRelationElem}-search-call-cat`).data("kendoDropDownTree").value(0);
                    $(`#${manualRelationElem}-search-dept-id`).data("kendoDropDownTree").value(0);
                    $(`#${manualRelationElem}-charge-id`).data("kendoDropDownList").value(0);
                    $(`#${manualRelationElem}-search-type`).data("kendoDropDownList").value(manualRelationGrid.searchDefaultValues.type);
                    $(`#${manualRelationElem}-search-text`).data("kendoTextBox").value('');
                    $(`#${manualRelationElem}-use-type`).data("kendoButtonGroup").select(manualRelationGrid.searchDefaultValues.useYn);
                    manualRelationGrid.manualRelationGridSearch();
                }
            });
        },

        manualRelationDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: manualRelSelectPageUrl,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (manualRelationGrid.isSearchBtn) {
                                manualRelationGrid.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },

                    parameterMap: (options) => {
                        const param = {
                            manualType: "M",
                            callCatId: $(`#${manualRelationElem}-search-call-cat`).data('kendoDropDownTree').value(),
                            parentId: 0,
                            deptId: 0,
                            chargeId: 0,
                            useYn: buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualRelationElem}-use-type`) == 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualRelationElem}-use-type`),
                            searchType: $(`#${manualRelationElem}-search-type`).data('kendoDropDownList').value(),
                            searchTxt: $(`#${manualRelationElem}-search-text`).data('kendoTextBox').value(),
                            sortType: "",
                            outputYn: "Y",
                            page: options.page,
                            totalPage: options.pageSize
                        };

                        if (manualRelAuth == AUTH_RANG.NOTHING) {
                            param.deptId = USER_INFO.deptId;
                            param.chargeId = USER_INFO.userId;
                        } else if (manualRelAuth == AUTH_RANG.AGENT) {
                            param.deptId = USER_INFO.deptId;
                            param.chargeId = $(`#${manualRelationElem}-charge-id`).data('kendoDropDownList').value();
                        } else {
                            param.parentId = $(`#${manualRelationElem}-search-dept-id`).data('kendoDropDownTree').value();
                            param.chargeId = $(`#${manualRelationElem}-charge-id`).data('kendoDropDownList').value();
                        }

                        if (!!manualRelationGrid.sortTypeObj && !!manualRelationGrid.sortTypeObj.field && manualRelationGrid.sortTypeObj.dir) {
                            param.sortType = manualRelationGrid.sortTypeObj.field + " " + manualRelationGrid.sortTypeObj.dir;
                        }

                        return param;
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    parse: (res) => {
                        res.data.rows.forEach(row => {
                            row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd HH:mm");
                            row.mdfDt = kendo.toString(new Date(row.mdfDt), "yyyy-MM-dd HH:mm");
                            if (row.useYn === 'Y') {
                                row.useYn = '<input type="checkbox" class="k-checkbox-md" checked disabled />';
                            } else {
                                row.useYn = '<input type="checkbox" class="k-checkbox-md" disabled />';
                            }
                        });
                        return res;
                    },
                    model: {
                        title: {type: 'string'},
                        callCatNm: {type: 'string'},
                        regDt: {type: 'date'},
                        mdfDt: {type: 'date'},
                        useYn: {type: "string"},
                        manualRelationCnt: {type: "number"},
                    },
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            });
        },

        dropTargetDataSource: () => {
            return new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: 'manualId',
                        fields: {
                            manualId: {type: 'number'},
                            title: {type: 'string'},
                        }
                    }
                }
            });
        },
        manualRelationGridSearch: () => {
            manualRelationGrid.isSearchBtn = true;

            let callCat = $(`#${manualRelationElem}-search-call-cat`).data("kendoDropDownTree");
            let deptId = $(`#${manualRelationElem}-search-dept-id`).data("kendoDropDownTree");
            let chargeId = $(`#${manualRelationElem}-charge-id`).data("kendoDropDownList");
            let searchType = $(`#${manualRelationElem}-search-type`).data("kendoDropDownList");
            let searchTxt = $(`#${manualRelationElem}-search-text`).data("kendoTextBox");

            let searchData = [
                {label: '상담분류', text: callCat.text(), value: callCat.value()==="0" ? 'all':callCat.value()},
                {label: '담당부서', text: deptId.text() ? deptId.text() : '전체', value: deptId.value()== 0 ? 'all': deptId.value()},
                {label: '담당자', text: chargeId.text(), value: chargeId.value()==="0" ? 'all': chargeId.value()},
                {label: '사용여부', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${manualRelationElem}-use-type`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualRelationElem}-use-type`)},
                {label: searchType.text(), text: searchTxt.value(), value: searchTxt.value()}
            ]

            gridCommonUtils.gridSearchPrint(manualRelationGrid.searchExpansion, searchData);

            $(manualRelationGrid.grid).data("kendoCpGrid").setDataSource(manualRelationGrid.manualRelationDataSource());
        }
    };

    const relationDetail = {
        init: async () => {

            $(`#${manualRelationElem}-detail-title`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-consult-cat`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-reg-dt`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-mdf-dt`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-dept`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-tel-no`).kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

            $(`#${manualRelationElem}-detail-agent`).kendoTextBox({
                fillMode: "flat",
                readonly: true
            });

            $(`#${manualRelationElem}-detail-btn`).kendoButton({
                click: () => {
                    let manualUuid = $('#manual-relation-manual-uuid').val();
                    if (!!manualUuid) {
                        let detailOption = {
                            name: 'manual-detail',
                            height: 820,
                            width: 1400,
                            top: 100,
                            left: 100,
                        };
                        new popupWindow(`/manual-detail?manualUuid=${manualUuid}&level=1`, '_blank', detailOption).open();
                    } else {
                        message.notification({msg: "매뉴얼을 찾을 수 없습니다.", type: "error"})
                    }
                }
            });

            $(`#${manualRelationElem}-save-btn`).kendoButton({
                themeColor: 'primary',
                click: async () => {
                    const manualDatas = $(`#${manualRelationElem}-drag-grid`).data("kendoCpGrid").dataSource.data();
                    let addManual = [];
                    let delManual = [];

                    addManual = manualDatas.filter(relationDetail.addManualFilter); //연관 시킬 매뉴얼
                    delManual = originManualRelationDatas.filter(relationDetail.delManualFilter); //삭제 시킬 매뉴얼

                    if (addManual.length === 0 && delManual.length === 0) {
                        //추가 및 삭제할 매뉴얼이 없는 경우
                        message.notification({msg: "변경할 매뉴얼이 없습니다", type: "error"})
                    } else {
                        //추가 및 삭제할 매뉴얼이 있는 경우
                        if (addManual.length > 0) {
                            //추가할 매뉴얼이 있는 경우
                            const param = {};
                            const relManualIds = [];
                            param.manualId = Number($(`#${manualRelationElem}-manual-id`).val());
                            addManual.forEach((manual) => {
                                relManualIds.push(manual.manualId);
                            })
                            param.relationManualIds = relManualIds

                            const manualInsertDataSource = new cpDataSource(METHOD.POST, manualRelInsertRelationUrl, param).getDataSource();
                            await manualInsertDataSource.read();
                        }
                        if (delManual.length > 0) {
                            //삭제할 매뉴얼이 있는 경우
                            const param = {};
                            const relManualIds = [];
                            param.manualId = Number($(`#${manualRelationElem}-manual-id`).val());
                            delManual.forEach((manual) => {
                                relManualIds.push(manual.manualId);
                            })
                            param.relationManualIds = relManualIds

                            const manualDeleteDataSource = new cpDataSource(METHOD.DELETE, manualRelDeleteRelationUrl, param).getDataSource();
                            await manualDeleteDataSource.read();
                        }
                        $(`#${manualRelationElem}-grid`).data("kendoCpGrid").dataSource.read();
                        message.notification({msg: "연관 매뉴얼을 수정했습니다", type: "success"});
                    }
                }//click end
            });

            $(`#${manualRelationElem}-reset-btn`).kendoButton({
                click: () => {
                    relationDetail.detailClear();
                }
            });

            $(`#${manualRelationElem}-drag-grid`).kendoCpGrid({
                height: '300px',
                width: "100%",
                scrollable: true,
                dataSource: manualRelationGrid.dropTargetDataSource(),
                editable: {
                    mode: 'inline',
                    confirmation: false
                },
                columns: [
                    {
                        field: 'title',
                        title: '연관된 매뉴얼',
                        attributes: {style: ' text-overflow: ellipsis; overflow: hidden; white-space: nowrap; '}
                    },
                    {command: [{name: "destroy", text: ""}], attributes: {class: '!k-text-center'}, width: 50}
                ]
            });

            $(`#${manualRelationElem}-drag-grid`).kendoDropTarget({
                dragenter: manualDraggableFunc.onDropTargetStyling,
                dragleave: manualDraggableFunc.offDropTargetStyling,
                drop: (e) => {
                    const grid = $(`#${manualRelationElem}-grid`).data('kendoCpGrid');
                    let draggableElement = e.draggable.currentTarget;
                    let draggedItem = grid.dataItem(draggableElement);
                    if (!manualIsDrop) {
                        //선택된 메뉴얼id가 없거나, 선택된 메뉴얼id가 드래그한 메뉴얼id와 동일할 경우나, 드래그한 메뉴얼id가 이미 연관되어있는 메뉴얼 id들 중 하나라도 같다면
                        return;
                    }
                    $(`#${manualRelationElem}-drag-grid`).data('kendoCpGrid').dataSource.add(draggedItem);
                }
            });
        },
        /**
         * 이미 연관되어 있는 메뉴얼을 제외하고 추가하기 위한 함수
         * @param data 연관시킬 매뉴얼 data
         * @returns {boolean} 이미 연관된 매뉴얼일 경우에는 false(호출하는 filter함수에서 반환 X)
         */
        addManualFilter: (data) => {
            let dataCheck = true;
            for (let i = 0; i < originManualRelationDatas.length; i++) {
                if (originManualRelationDatas[i].manualId === data.manualId) {
                    dataCheck = false;
                    break;
                }
            }
            return dataCheck;
        },

        /**
         * 연관되어 있는 메뉴얼 중에서만 삭제할 수 있도록 하기 위한 함수
         * @param data 연관되어 있는 매뉴얼 data
         * @returns {boolean} 이미 연관된 매뉴얼일 경우에만 true(호출하는 filter함수에서 반환 O)
         */
        delManualFilter: (data) => {
            let dataCheck = true;
            const manualDatas = $(`#${manualRelationElem}-drag-grid`).data("kendoCpGrid").dataSource.data();

            for (let i = 0; i < manualDatas.length; i++) {
                if (manualDatas[i].manualId === data.manualId) {
                    dataCheck = false;
                    break;
                }
            }
            return dataCheck;
        },
        detailClear:() => {
            $(`#${manualRelationElem}-grid`).data("kendoCpGrid").dataSource.read();
            $(`#${manualRelationElem}-drag-grid`).data("kendoCpGrid").dataSource.read();
            $(`#${manualRelationElem}-detail-title`).data("kendoTextBox").value('');
            $(`#${manualRelationElem}-detail-consult-cat`).data("kendoTextBox").value('');
            $(`#${manualRelationElem}-detail-reg-dt`).data("kendoTextBox").value('');
            $(`#${manualRelationElem}-detail-mdf-dt`).data("kendoTextBox").value('');
            $(`#${manualRelationElem}-detail-dept`).data("kendoTextBox").value('');
            $(`#${manualRelationElem}-detail-agent`).data("kendoTextBox").value('');
        },
    };

    const manualDraggableFunc = {
        onDropTargetStyling: function (e) {
            if (manualIsDrop) {
                this.element.css({
                    "border-color": "#5cb85c"
                });
            }
        },
        offDropTargetStyling: function (e) {
            if (manualIsDrop) {
                this.element.css({
                    'border-color': '#ff6347'
                });
            }
        }
    }
    cpProgress(`${manualRelationElem}-layout`);
    manualRelationGrid.init();
    manualRelationGrid.gridSetting().then(() => {
        manualRelationGrid.manualRelationGridSearch();
        relationDetail.init();
        cpProgress(`${manualRelationElem}-layout`,false);
    });
});