$(document).ready(function() {
    const manualManagerElem = `manual-manager`;
    const manualManagerDeptAuth = userAuthRange('WORK_MANUAL_MGR');
    const manualManagerSelectUrl = '/knowledge/v1/manual/select';
    const localStorageGridColumnsNm = 'localStorageManualManagerGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;
    let manualManagerUser;
    let manualManagerUserCreate;
    const manualManagerGrid = {
        sortTypeObj: {},
        gridColumns : [
            {
                field: "chk",
                headerTemplate: "<input type='checkbox' id='manual-grid-check-all' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md header-checkbox'>",
                template: "<input type='checkbox' name='manual-grid-chk' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md manual-grid-chk'>",
                attributes: {style: 'text-align:center'},
                width:20,
                sortable: false,
                selectable: false
            },
                {field: 'title', title: '제목', width: 300, sortable: false},
                {field: 'callCatNm', title: '상담분류', attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}, width: 180, sortable: false},
                {field: 'fullDeptNm', title: '담당부서', attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}, width: 180, sortable: false},
                {field: 'chargeNm', title: '담당자', attributes: {class: '!k-text-center'}, width: 70, sortable: false},
                {field: 'regDt', title: '등록일', attributes: {class: '!k-text-center'}, width: 60, sortable: true},
                {field: 'mdfDt', title: '수정일', attributes: {class: '!k-text-center'}, width: 60, sortable: true},
                {field: 'useYn', title: '사용여부', attributes: {class: '!k-text-center'}, width: 40, sortable: false, template: "#= useYn #"},
                {field: 'manualQnaCnt', title: 'Q&A', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 40},
        ],
        gridWidth : 0,
        grid : `#${manualManagerElem}-grid`,
        searchExpansion : `#${manualManagerElem}-expansion-panel`,
        gridSplitter : `#${manualManagerElem}-splitter`,
        searchDefaultValues : [],
        useYnDataSource: [],
        isSearchBtn : false,

        init : () => {

            gridCommonUtils.init(manualManagerGrid.searchExpansion, manualManagerGrid.gridSplitter, manualManagerGrid.grid, localStorageGridColumnsNm);
            gridCommonUtils.gridExpansionPanel(manualManagerGrid.searchExpansion, manualManagerGrid.gridSplitter, manualManagerGrid.grid);

            $(manualManagerGrid.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });

            manualManagerGrid.gridWidth = gridCommonUtils.gridWidthSet(manualManagerGrid.gridWidth, !!localStorageGridColumns ? localStorageGridColumns : manualManagerGrid.gridColumns, manualManagerGrid.gridSplitter);

            $(manualManagerGrid.grid).kendoCpGrid({
                toolbar: [
                    {template: kendo.template($(`#${manualManagerElem}-grid-toolbar-template`).html())}
                ],
                columns: !!localStorageGridColumns ? localStorageGridColumns : manualManagerGrid.gridColumns,
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                pageable: {
                    refresh: true
                },
                autoBind: true,
                click: (e) => {
                    let selectItem = e.sender.dataItem(e.sender.select());
                        let editorOption ={
                            name: 'manual-editor',
                            height: 820,
                            width: 1100,
                            top: 100,
                            left: 100,
                        }

                        new popupWindow(`/manual-editor?parentPage=manual-manager&manualUuid=${selectItem.manualUuid}`, 'manual-editor', editorOption).open();

                },
                height: '100%',
                width: manualManagerGrid.gridWidth,
                dataSource: [],
                dataBound: () => {
                    if ($(manualManagerGrid.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block') {
                        $(manualManagerGrid.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(manualManagerGrid.gridSplitter, manualManagerGrid.grid);
                    }
                },
                sort: (e) => {
                    if (e.sort.field === "regDt") {
                        manualManagerGrid.sortTypeObj.field = "B.REG_DT";
                    } else if (e.sort.field === "mdfDt") {
                        manualManagerGrid.sortTypeObj.field = "B.MDF_DT";
                    }
                    manualManagerGrid.sortTypeObj.dir = e.sort.dir;
                },
            columnResize : () => {
                const gridOptions = $(manualManagerGrid.grid).data("kendoCpGrid").getOptions();
                window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
            },
            columnReorder:() => {
                setTimeout(function () {
                    const gridOptions = $(manualManagerGrid.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                },
            }).on("click", "#manual-grid-check-all", (e) => {
                let dataItems = $(`#${manualManagerElem}-grid`).data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        $("input:checkbox[name=manual-grid-chk]").eq(index).prop("checked", true);
                        data["chk"] = true;
                    });
                } else {
                    $("input:checkbox[name=manual-grid-chk]").prop("checked", false);
                    dataItems.forEach(data => {
                        data["chk"] = false;
                    })
                }
            });

            $(`#${manualManagerElem}-btn-batch-update`).kendoButton({
                click: () => {
                    manualManagerGrid.windowInitOpen();
                }
            });

            $(`#${manualManagerElem}-btn-insert-manual`).kendoButton({
                click: () => {
                    let editorOption = {
                        name: 'manual-editor',
                        height: 900,
                        width: 1300,
                        top: 150,
                        left: 150,
                    }
                    new popupWindow("/manual-editor?parentPage=manual-manager", 'manual-editor', editorOption).open();
                }
            });
        },

        gridSetting : async () => {

            manualManagerGrid.useYnDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/useYn", {}).getDataSource();
            await manualManagerGrid.useYnDataSource.read().then(() => {
                $(`#${manualManagerElem}-use-type`).kendoButtonGroup({
                    items : buttonGroupUtils.buttonGroupMakeItems(manualManagerGrid.useYnDataSource.data(),true),
                    index:0,
                    size: 'small'
                });
            });

            let callCat = new cpCatDropDownTree(`#${manualManagerElem}-search-call-cat`,{
                value: "0", placeholder: "전체", clearButton: false, fillMode: 'solid', autoWidth: true,
            });

            callCat.create();
            let data = await callCat.getData();
            let allObject = {
                catId: "0",
                catNm: "전체",
                fullCatNm: "전체",
                items: [],
            }
            let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject,...data.options.data]});
            $(`#${manualManagerElem}-search-call-cat`).data("kendoDropDownTree").setDataSource(dataSource);

            $(`#${manualManagerElem}-search-type`).kendoDropDownList({
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

            $(`#${manualManagerElem}-search-text`).kendoTextBox({
                size: 'small',
            }).bind('keyup', function (e) {
                if (e.keyCode === 13) {
                    $(`#${manualManagerElem}-search-btn-button`).trigger('click');
                }
            });
                const manualManagerDeptAutoCompleteEvent = (e) => {
                    let row = dropTreeRow(e);
                    let call = manualManagerUser.getDeptData(row.deptId);
                    call.read().then(()=>{
                        manualManagerUserCreate.setDataSource(call.data());
                        manualManagerUserCreate.value(0);
                    });
                }

                const pageAuth = manualManagerDeptAuth === AUTH_RANG.NOTHING;
                const pageAuthSub = manualManagerDeptAuth !== AUTH_RANG.SUB;
                let setDeptId = !pageAuth && USER_INFO.topDeptId===1?1:USER_INFO.deptId;
                if (pageAuth) setDeptId = USER_INFO.deptId;

                manualManagerUser = new cpUserDropDown("#manual-manager-charge-id",setDeptId, undefined,{value: 1,clearButton: false,fillMode:'solid'}, pageAuth);
                manualManagerUserCreate = manualManagerUser.create();
                await manualManagerUser.drawingList().then(()=>{
                    manualManagerUser.setEnable(pageAuth);
                });

                new cpDeptDropDownTree('#manual-manager-search-dept-id', {
                    change: manualManagerDeptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    fillMode:"solid",
                },"WORK_MANUAL_MGR",setDeptId,pageAuthSub,IS.FALSE).init();

            $(`#${manualManagerElem}-search-btn-button`).kendoButton({
                themeColor : 'secondary',
                icon : 'search',
                size: 'small',
                click : () => {
                    manualManagerGrid.manualManagerGridSearch();
                }
            });

            manualManagerGrid.searchDefaultValues.type = 'Title';
            manualManagerGrid.searchDefaultValues.useYn = 0;

            $(`#${manualManagerElem}-search-btn-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function() {
                    $(`#${manualManagerElem}-search-call-cat`).data("kendoDropDownTree").value(0);
                    $(`#${manualManagerElem}-search-dept-id`).data("kendoDropDownTree").value(1);
                    $(`#${manualManagerElem}-charge-id`).data("kendoDropDownList").value(0);
                    $(`#${manualManagerElem}-search-type`).data("kendoDropDownList").value(manualManagerGrid.searchDefaultValues.type);
                    $(`#${manualManagerElem}-search-text`).data("kendoTextBox").value('');
                    $(`#${manualManagerElem}-use-type`).data("kendoButtonGroup").select(manualManagerGrid.searchDefaultValues.useYn);
                    manualManagerGrid.manualManagerGridSearch();
                }
            });
        },

        manualManagerDataSource : () => {
            return new kendo.data.DataSource({
                transport : {
                    read: {
                        url: manualManagerSelectUrl,
                        type:"GET",
                        contentType: "application/json",
                        dataType: "json",
                        complete: () => {
                            if (manualManagerGrid.isSearchBtn) {
                                manualManagerGrid.isSearchBtn = false;
                                message.notification({type : "info"});
                            }
                        }
                    },
                    parameterMap : (data, type) => {
                        if (type === 'read') {
                            let param = {
                                manualType: 'M',
                                callCatId: $(`#${manualManagerElem}-search-call-cat`).data('kendoDropDownTree').value(),
                                parentId: 0,
                                deptId: 0,
                                chargeId: 0,
                                useYn: buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualManagerElem}-use-type`) == 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualManagerElem}-use-type`),
                                searchType:$(`#${manualManagerElem}-search-type`).data("kendoDropDownList").value(),
                                searchTxt: $(`#${manualManagerElem}-search-text`).data("kendoTextBox").value(),
                                sortType: '',
                                outputYn: 'Y',
                                page: data.page,
                                totalPage: data.pageSize
                            }

                            if (manualManagerDeptAuth == AUTH_RANG.NOTHING) {
                                param.deptId = USER_INFO.deptId;
                                param.chargeId = USER_INFO.userId;
                            } else if (manualManagerDeptAuth == AUTH_RANG.AGENT) {
                                param.deptId = USER_INFO.deptId;
                                param.chargeId = $(`#${manualManagerElem}-charge-id`).data('kendoDropDownList').value();
                            } else {
                                param.parentId = $(`#${manualManagerElem}-search-dept-id`).data('kendoDropDownTree').value();
                                param.chargeId = $(`#${manualManagerElem}-charge-id`).data('kendoDropDownList').value();
                            }

                            if(!!manualManagerGrid.isSearchBtn && !!manualManagerGrid.isSearchBtn.field && manualManagerGrid.isSearchBtn.dir){
                                param.sortType = manualManagerGrid.isSearchBtn.field + " " + manualManagerGrid.isSearchBtn.dir;
                        }
                            return param;
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message :'오류가 발생하였습니다.'};
                        let g = {msg: error.message , type: 'error'};
                        message.notification(g);
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    parse: (result) => {
                        result.data.rows.forEach(item => {
                            item.regDt = item.regDt == null ? '' : kendo.toString(new Date(item.regDt), 'yyyy-MM-dd');
                            item.mdfDt = item.mdfDt == null ? '' : kendo.toString(new Date(item.mdfDt), 'yyyy-MM-dd');
                            if (item.useYn === 'Y') {
                                item.useYn = '<input type="checkbox" class="k-checkbox-md" checked disabled />';
                            } else {
                                item.useYn = '<input type="checkbox" class="k-checkbox-md" disabled />';
                            }
                        });
                        return result;
                    },
                    model: {
                        id: 'manualId',
                        fields: {
                            companyCd: {type: 'string'},
                            manualId: {type: 'number'},
                            deptId: {type: 'number'},
                            deptNm: {type: 'string'},
                            fullDeptNm: {type: 'string'},
                            chargeId: {type: 'number'},
                            chargeNm: {type: 'string'},
                            callCatId: {type: 'number'},
                            callCatNm: {type: 'string'},
                            title: {type: 'string'},
                            useYn: {type: 'string'},
                            manualQnaCnt: {type: 'number'},
                            regDt: {type: 'string'},
                            regYmd: {type: 'string'},
                            mdfDt: {type: 'string'},
                            mdfYmd: {type: 'string'}
                        }
                    }
                }
            });
        },
        manualManagerGridSearch:() => {
            manualManagerGrid.isSearchBtn = true;

            let callCat = $(`#${manualManagerElem}-search-call-cat`).data("kendoDropDownTree");
            let chargeId = $(`#${manualManagerElem}-charge-id`).data("kendoDropDownList");
            let searchType = $(`#${manualManagerElem}-search-type`).data("kendoDropDownList");
            let searchTxt = $(`#${manualManagerElem}-search-text`).data("kendoTextBox");

            let searchData = [
                { label: '상담분류', text: callCat.text(), value: callCat.value()?callCat.value: '전체'},
                { label: '담당자', text: chargeId.text(), value: chargeId.value()?chargeId.value: '전체'},
                { label: '사용여부', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${manualManagerElem}-use-type`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${manualManagerElem}-use-type`) },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }

            ]

            gridCommonUtils.gridSearchPrint(manualManagerGrid.searchExpansion, searchData);

            $(manualManagerGrid.grid).data("kendoCpGrid").setDataSource(manualManagerGrid.manualManagerDataSource());

        },
        windowInitOpen: () => {
            let dataItems = $(`#${manualManagerElem}-grid`).data("kendoCpGrid").dataItems();
            let checked = false;
            dataItems.forEach((data, index) => {
                if ($("input:checkbox[name=manual-grid-chk]").eq(index).prop("checked")) {
                    checked = true;
                }
            });

            if (checked) {
                let $div = $(`<div id="manual-manager-window"></div>`);
                $div.kendoWindow({
                    width: 450,
                    height: 210,
                    position: {
                        top: "35%",
                        left: "35%"
                    },
                    actions: ["Close"],
                    title: "매뉴얼 일괄수정",
                    visible: false,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    autoFocus: false,
                    content: {
                        template: kendo.template($(`#${manualManagerElem}-window-template`).html())
                    },
                    open: () => {
                        manualManagerGrid.windowOpen();
                    },
                    close: (e) => {
                        e.sender.destroy();
                    }
                }).data("kendoWindow").refresh().open();
            } else {
                message.notification({type: 'info', msg: "일괄수정할 매뉴얼을 선택해주세요."});
            }
        },
        windowOpen: () => {

            new cpCatDropDownTree('#manual-manager-update-callcat', {placeholder: '상담분류를 선택하세요.'}).init();

            let updateUserDropDown = new cpUserDropDown("#manual-manager-update-user", 0, [{useYn: 'Y'}], { optionLabel:{userNm:"담당자를 선택하세요.",userId:0} });
            let updateUserDropDownCreate = updateUserDropDown.init();

            const deptCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                let call = updateUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    updateUserDropDownCreate.setDataSource(call.data());
                    updateUserDropDownCreate.value(0);
                });
            }

            let deptOptions = {placeholder: '담당부서를 선택하세요.', change: deptCompleteEvent};

            new cpDeptDropDownTree('#manual-manager-update-dept', deptOptions, 'WORK_MANUAL_MGR', 0, IS.FALSE).init();

            let updateValidator = $(`#${manualManagerElem}-update-validator`).kendoValidator({
                rules: {
                    rule: (input) => {
                        let callCat = $(`#${manualManagerElem}-update-callcat`).data("kendoDropDownTree").value();
                        let dept = $(`#${manualManagerElem}-update-dept`).data("kendoDropDownTree").value();

                        if (input.is("[name=manual-manager-update-callcat]")) {
                            return callCat !== '' || dept !== 0;
                        } else if (input.is("[name=manual-manager-update-dept]")) {
                            return callCat !== '' || dept !== 0;
                        } else return true;
                    },
                    leaf: (input) => {
                        let dept = $(`#${manualManagerElem}-update-dept`).data("kendoDropDownTree").value();

                        if (input.is("[name=manual-manager-update-callcat]") && dept === 0) {
                            if (input.data("kendoDropDownTree").value() !== "") {
                                let dropTree = input.data("kendoDropDownTree");
                                let selectItem = dropTree.treeview.select();
                                return !dropTree.dataItem(selectItem).hasChildren;
                            }
                        } else return true;
                    }
                },
                errorTemplate: (e) => {
                    if (e.field === "manual-manager-update-callcat") {
                        if (e.message !== "") {
                            return '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 0% 0% 20%;">' +
                                e.message + '<div class="k-callout c-k-callout-n"></div></div>';
                        }
                    }
                },
                messages: {
                    required: (input) => {
                        return "";
                    },
                    leaf: (input) => {
                        if (input.is("[name=manual-manager-update-callcat]")) {
                            if (input.data("kendoDropDownTree").value() !== "") {
                                return "마지막 단계까지 선택해 주세요."
                            }
                        }
                    }
                }
            }).data('kendoValidator');

            $(`#${manualManagerElem}-btn-update-save`).kendoButton({
                themeColor: 'primary',
                click: () => {
                    if (!updateValidator.validate()) {
                        return;
                    }
                    manualManagerGrid.updateManual();
                }
            });
        },
        updateManual: ()=> {
            let paramArr = new Array();
            let callCatId = $(`#${manualManagerElem}-update-callcat`).data("kendoDropDownTree").value();
            let deptId = $(`#${manualManagerElem}-update-dept`).data("kendoDropDownTree").value();
            let chargeId = $(`#${manualManagerElem}-update-user`).data("kendoDropDownList").value();

            let dataItems = $(`#${manualManagerElem}-grid`).data("kendoCpGrid").dataItems();
            dataItems.forEach((data,index) =>{
                if($("input:checkbox[name=manual-grid-chk]").eq(index).prop("checked")) {
                    let param = { manualId: data.manualId, callCatId: callCatId, deptId: deptId, chargeId: chargeId };
                    paramArr.push(param);
                }
            });

            let batchDs = new cpDataSource(METHOD.PUT, "/knowledge/v1/manual/update-batch", paramArr).getDataSource();
            batchDs.read().then(()=>{
                $(`#${manualManagerElem}-grid`).data('kendoCpGrid').dataSource.read();
                $('#manual-manager-window').data('kendoWindow').close();
                message.notification({msg: '저장되었습니다.', type: 'success'});
            });
        },
    };
    cpProgress(`${manualManagerElem}-layout`);
    manualManagerGrid.init();
    manualManagerGrid.gridSetting().then(() => {
        manualManagerGrid.manualManagerGridSearch();
        cpProgress(`${manualManagerElem}-layout`,false);
    });
});