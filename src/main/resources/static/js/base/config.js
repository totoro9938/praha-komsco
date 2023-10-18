$(document).ready(() => {
    const baseUrl = "base/v1";
    const saveMsg = {msg: '저장 되었습니다.', type: 'success'};

    const configMgr = {
        init: async () => {
            $('#config-splitter').kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, size: '46px', resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });

            configSearch.init();
            configGrid.init();
        }
    };

    const configSearch = {
        init: () => {

            $('#config-dropdown-tree').kendoDropDownTree({
                placeholder: "전체",
                dataTextField: "configNm",
                dataValueField: "configId",
                filter: "startswith",
                fillMode: "solid",
                autoWidth: true,
                messages: {
                    noData: "검색된 내용이 없습니다."
                },
                height: 300,
                clearButton: true,
                change: (e) => {
                    $('#config-grid').data("kendoCpGrid").dataSource.read();
                }
            }).data("kendoDropDownTree");

            configSearch.treeBind();

            $("#config-add-button").kendoButton({
                click: (e) => {

                    let grid = $('#config-grid').data("kendoCpGrid");

                    let valid = $("#config-grid").kendoValidator().data("kendoValidator");

                    if (valid.validate()) {
                        grid.addRow();
                    }
                }
            });

            $("#config-save-button").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    let valid = $('#config-grid').kendoValidator().data("kendoValidator");
                    let grid = $('#config-grid').data("kendoCpGrid");
                    if (valid.validate()) {
                        grid.saveChanges();
                    }
                }
            });

            $("#config-cancel-button").kendoButton({
                click: (e) => {
                    configGrid.refresh();
                }
            });

            $('#config-search-useYn').on('click', () => {
                //configSearch.treeBind();
                configGrid.refresh();
            });

            $('#config-search-delYn').on('click', () => {
                //configSearch.treeBind();
                configGrid.refresh();
            });

        },
        treeBind: () => {
            let item = $('#config-dropdown-tree').data("kendoDropDownTree");

            let treeParam = {
                treeYn: "Y",
                parentId: 0,
                useYn: "Y",
                delYn: "N",
                outputYn: "Y"
            };

            let configTreeDs = new cpDataSource(METHOD.GET, baseUrl + "/config", treeParam).getDataSource();
            configTreeDs.read().then(() => {
                let data = configSearch.listToTree(configTreeDs.data());
                let treeDs = new kendo.data.HierarchicalDataSource({
                    data: [...data]
                });
                item.setDataSource(treeDs);
            });
        },
        listToTree: (list) => {
            let map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i += 1) {
                map[list[i].configId] = i; //initialize the map
                list[i].items = []; //initialize the children
            }
            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.parentId !== "0") {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parentId]].items.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }
    };

    const configGrid = {
        init: () => {

            let gridDs = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: baseUrl + "/config",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8'
                    },
                    create: {
                        url: baseUrl + "/config",
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            configGrid.refresh();
                            configSearch.treeBind();
                            message.notification(saveMsg);
                        }
                    },
                    update: {
                        url: baseUrl + "/config",
                        type: "PUT",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            configGrid.refresh();
                            configSearch.treeBind();
                            message.notification(saveMsg);
                        }
                    },
                    parameterMap: (options, type) => {
                        let arr;
                        switch (type) {
                            case "read" :
                                let param = {
                                    treeYn: "N",
                                    parentId: $('#config-dropdown-tree').data("kendoDropDownTree").value(),
                                    useYn: $('#config-search-useYn').is(':checked') ? "" : "Y",
                                    delYn: $('#config-search-delYn').is(':checked') ? "" : "N",
                                    outputYn: "Y"
                                };
                                return param;
                                break;
                            case "create":
                                arr = new Array();
                                options.models.forEach((data) => {
                                    let param = {
                                        parentId: $('#config-dropdown-tree').data("kendoDropDownTree").value(),
                                        configNm: data.configNm,
                                        configKey: data.configKey,
                                        configValue: data.configValue,
                                        sysYn: data.sysYn,
                                        useYn: data.useYn,
                                        delYn: data.delYn,
                                        description: data.description
                                    };
                                    arr.push(param);
                                });
                                return JSON.stringify(arr);
                                break;
                            case "update":
                                arr = new Array();
                                options.models.forEach((data) => {
                                    let param = {
                                        configId: data.configId,
                                        configIdx: data.configIdx,
                                        configNm: data.configNm,
                                        configKey: data.configKey,
                                        configValue: data.configValue,
                                        sysYn: data.sysYn,
                                        useYn: data.useYn,
                                        delYn: data.delYn,
                                        description: data.description
                                    };
                                    arr.push(param);
                                });
                                return JSON.stringify(arr);
                                break;
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                        let g = {msg: error.message, type: 'error'};
                        message.notification(g);
                    }
                },
                batch: true,
                schema: {
                    data: "data",
                    model: {
                        id: "configId",
                        fields: {
                            configId: {type: "number", nullable: false, editable: false},
                            configUuid: {type: "string", editable: false},
                            parentId: {type: "number", defaultValue: "0", editable: false},
                            configLvl: {type: "number", editable: false},
                            configPath: {type: "string", editable: false},
                            sortPath: {type: "string", editable: false},
                            keyPath: {type: "string", editable: false},
                            configNm: {
                                type: "string",
                                editable: true,
                                validation: {
                                    required: {
                                        message: "환경변수명은 필수 입니다."
                                    }
                                }
                            },
                            configKey: {
                                type: "string",
                                editable: true,
                                validation: {
                                    required: {
                                        message: "환경변수키는 필수 입니다."
                                    }
                                }
                            },
                            configValue: {type: "string", editable: true},
                            sysYn: {type: "string", defaultValue: "N", editable: false},
                            inheritSysYn: {type: "string", defaultValue: "N", editable: false},
                            useYn: {type: "string", defaultValue: "Y", editable: false},
                            inheritUseYn: {type: "string", defaultValue: "Y", editable: false},
                            delYn: {type: "string", defaultValue: "N", editable: false},
                            inheritDelYn: {type: "string", defaultValue: "N", editable: false},
                            description: {type: "string"},
                            rgtrId: {editable: false, nullable: true},
                            regDt: {editable: false, nullable: true},
                            mdfrId: {editable: false, nullable: true},
                            mdfDt: {editable: false, nullable: true}
                        }
                    }
                }
            });

            $('#config-grid').kendoCpGrid({
                autoBind: true,
                dataSource: gridDs,
                height: '100%',
                editable: 'incell',
                selectable: true,
                batch: true,
                columns: [
                    {field: 'configId', hidden: true},
                    {field: 'configNm', title: '환경변수명', width: 300},
                    {field: 'configKey', title: 'KEY', width: 300},
                    {field: 'configValue', title: 'VALUE', width: 300},
                    {field: 'description', title: '비고'},
                    {
                        field: "useYn",
                        title: "사용",
                        template: '<input type="checkbox" class="k-checkbox-md configGridCheckBox" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" #></input>',
                        width: 80,
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md configGridCheckBox" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" #></input>',
                        width: 80,
                        attributes: {class: '!k-text-center'}
                    }
                ],
                saveChanges: (e) => {
                    const grid = e.sender;
                    const saveDatas = grid.dataSource.data();
                    const configNm = $(`#config-grid th[data-field=configNm]`).attr("data-index");
                    const configKey = $(`#config-grid th[data-field=configKey]`).attr("data-index");
                    saveDatas.forEach((data) => {
                        if (!data.configNm) {
                            grid.editCell(grid.tbody.find("td").eq(configNm));
                            e.preventDefault();
                        } else if (!data.configKey) {
                            grid.editCell(grid.tbody.find("td").eq(configKey));
                            e.preventDefault();
                        }
                    })
                }
            }).on("click", ".configGridCheckBox", (e) => {
                let filed = $(e.target).data('filed');
                let list = $("#config-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = list.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            });
        },
        refresh: () => {
            $('#config-grid').data("kendoCpGrid").dataSource.read();
        }
    };

    cpProgress('config-layout');
    configMgr.init().then(() => {
        cpProgress('config-layout', false)
    });
});
