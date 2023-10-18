$(document).ready(() => {
    const deptServiceBaseUrl = "base/v1";
    const deptMgrAuth = "BASE_DEPT_MGR";
    let deptSearchTree;
    const deptSaveSuccessMassage = {msg: '저장 되었습니다.', type: 'success'};
    const deptMoveSuccessMassage = {msg: '이동 되었습니다.', type: 'success'};

    const deptMgr = {
        init: async () => {
            deptDropDownTree.deptDropDownTreeInit("dept-dropdown-tree");
            deptGrid.deptGridInit();
            deptPageControl.init();
        },
    };

    const deptGrid = {
        deptGridParam: () => {
            let parentId = $("#dept-dropdown-tree").val();
            let param = {
                treeYn: "N",
                parentId: parentId != null && parentId != "" ? parentId : USER_INFO.deptId,
                useYn: $("input:checkbox[id='dept-search-useYn']").is(":checked") ? "" : "Y",
                delYn: $("input:checkbox[id='dept-search-delYn']").is(":checked") ? "" : "N",
                outputYn: "Y",
                sortType: ""
            };
            return param;
        },
        deptGridInit: () => {
            let dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: deptServiceBaseUrl + "/dept",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8'
                    },
                    create: {
                        url: deptServiceBaseUrl + "/dept",
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $('#dept-grid').data("kendoCpGrid").dataSource.read();
                            deptDropDownTree.deptDropDownTreeRefresh();
                            message.notification(deptSaveSuccessMassage);
                        }
                    },
                    update: {
                        url: deptServiceBaseUrl + "/dept",
                        type: "PUT",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $('#dept-grid').data("kendoCpGrid").dataSource.read();
                            deptDropDownTree.deptDropDownTreeRefresh();
                            message.notification(deptSaveSuccessMassage);
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == "read") {
                            return deptGrid.deptGridParam();
                        } else if (type == "create") {
                            let dataArray = new Array();
                            let dropDownTreeId = $("#dept-dropdown-tree").val();
                            let parentId = dropDownTreeId != '' && dropDownTreeId != null ? dropDownTreeId : 0;
                            $.each(options.models, (i, data) => {
                                data.parentId = parentId;
                                dataArray.push(data);
                            })
                            return JSON.stringify(dataArray);
                        } else if (type == "update") {
                            let dataArray = new Array();
                            $.each(options.models, (i, data) => {
                                dataArray.push(data);
                            });
                            return JSON.stringify(dataArray);
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                        let g = {msg: error.message, type: 'error'};
                        message.notification(g);
                    }
                },
                schema: {
                    data: "data",
                    model: {
                        id: "deptId",
                        fields: {
                            deptId: {type: "number", nullable: false, editable: false},
                            deptUuid: {type: "string", editable: false},
                            deptCd: {type: "string"},
                            topDeptId: {type: "number", defaultValue: "0", editable: false},
                            parentId: {type: "number", defaultValue: "0", editable: false},
                            deptLvl: {type: "number", editable: false},
                            deptIdx: {type: "string", validation: {min: 0}, defaultValue: "0"},
                            deptPath: {type: "string", editable: false},
                            sortPath: {type: "string", editable: false},
                            deptNm: {
                                type: "string",
                                editable: true,
                                validation: {
                                    required: {
                                        message: "조직명은 필수입니다"
                                    }
                                }
                            },
                            fullDeptNm: {type: "string", editable: false},
                            telNo: {type: "string"},
                            faxNo: {type: "string"},
                            deptValue_01: {type: "string"},
                            deptValue_02: {type: "string"},
                            deptValue_03: {type: "string"},
                            deptValue_04: {type: "string"},
                            deptValue_05: {type: "string"},
                            deptValue_06: {type: "string"},
                            deptValue_07: {type: "string"},
                            deptValue_08: {type: "string"},
                            deptValue_09: {type: "string"},
                            deptValue_10: {type: "string"},
                            validationYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            sysYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            inheritSysYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            useYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            inheritUseYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            delYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            inheritDelYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            description: {type: "string"},
                        }
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                }
            });

            $('#dept-grid').kendoCpGrid({
                dataSource: dataSource,
                height: '100%',
                editable: "incell",
                filterable: false,
                selectable: true,
                sort: {field: "deptIdx", dir: "asc"},
                batch: true,
                columns: [{field: "deptId", hidden: true},
                    {field: "deptLvl", hidden: true},
                    {field: "deptIdx", title: "순서", width: 20, attributes: {style: "text-align:center"}},
                    {field: "deptNm", title: "조직명", width: 80, attributes: {style: "text-align:left"}},
                    {field: "deptCd", title: "조직코드", width: 80, attributes: {style: "text-align:left"}},
                    {field: "description", title: "비고", width: 120, attributes: {style: "text-align:left"}},
                    {
                        field: "useYn",
                        title: "사용",
                        template: '<input type="checkbox" class="k-checkbox-md dept-grid-checkbox" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md dept-grid-checkbox" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        }
                    },
                    {
                        command: [{
                            name: "dept-move",
                            template: "<span style='cursor: pointer' class='k-icon k-i-redo k-icon k-grid-dept-move'></span>",
                            click: function (e) {
                                let tr = $(e.target).closest("tr");
                                let data = this.dataItem(tr);
                                let authStrings = 'ROLE_BASE_DEPT_MGR_EXTEND_01';
                                let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                                if (data.deptId != null && data.deptId != "" && auths.length > 0) {
                                    deptMoveMgr.open(data.deptId, data.deptPath, data.deptNm, data.deptLvl);
                                } else {
                                    e.preventDefault(false);
                                }
                            },
                            visible: function (dataItem) {
                                let authStrings = 'ROLE_BASE_DEPT_MGR_EXTEND_01';
                                let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                                return auths.length > 0;
                            }
                        }],
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        },
                        title: "이동"
                    }
                ]
            }).on("click", ".dept-grid-checkbox", (e) => {
                let filed = $(e.target).data('filed');
                deptGplist = $("#dept-grid").data("kendoCpGrid");
                dataRow = $(e.target).closest("tr");
                dataItem = deptGplist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            })
        },
    }

    const deptDropDownTree = {
        deptDropDownTreeInit: (id) => {
            if (id == "dept-dropdown-tree") {
                let options = {
                    fillMode: 'solid',
                    change: (e) => {
                        $('#dept-grid').data("kendoCpGrid").dataSource.read();
                    }
                };
                deptSearchTree = new cpDeptDropDownTree("#" + id, options, deptMgrAuth, USER_INFO.deptId, IS.TRUE, IS.FALSE);
                deptSearchTree.init();
            } else if (id == "dept-move-drop-down-tree") {
                let data = {
                    filter: "startswith",
                    placeholder: "선택하세요.",
                    fillMode: "solid",
                    messages: {
                        noData: "검색된 내용이 없습니다."
                    },
                    dataTextField: "deptNm",
                    dataValueField: "deptId",
                    height: 300,
                    clearButton: true,
                }
                $("#" + id).kendoDropDownTree(data);
            }
        },
        deptDropDownTreeRefresh: (deptId, deptPath, deptNm, deptLvl) => {
            if (deptId === undefined) {
                deptSearchTree.drawingTree();
            } else {
                let deptDropDownData = new cpDataSource(METHOD.GET, deptServiceBaseUrl + "/dept/select-tree", {}).getDataSource();
                deptDropDownData.read().then(() => {
                    let exceptData = deptDropDownData.data().filter(e => e.deptPath.split('.')[deptLvl - 1] != deptPath.split('.')[deptLvl - 1]);
                    let deptFormatData = deptDropDownTree.dropDownFormat(exceptData).items;
                    let data = new kendo.data.HierarchicalDataSource({
                        data: [{
                            delYn: "N",
                            deptCd: "root",
                            deptId: 0,
                            deptIdx: 0,
                            deptLvl: 0,
                            deptNm: "전체",
                            deptPath: "000000000",
                            deptUuid: "0",
                            fullDeptNm: "전체",
                            items: [],
                            parentId: 0,
                            sortPath: "000000000",
                            topDeptId: "1",
                            useYn: "Y"
                        }, ...deptFormatData]
                    });
                    $("#dept-move-drop-down-tree").data("kendoDropDownTree").setDataSource(data);
                    $("#dept-move-drop-down-tree").data("kendoDropDownTree").search("");

                });
            }
        },
        deptMoveTreeFormat: (inputData, tree, count = 0) => {
            const splitPath = inputData.deptPath.split('.');
            if (inputData.deptLvl == count) {
                return;
            } else if (!tree.items.find((element) => element.deptPath.split('.')[count] === splitPath[count])) {
                tree.items.push(inputData);
                return;
            } else {
                const nextTree = tree.items.find((element) => element.deptPath.split('.')[count] === splitPath[count])
                count += 1;
                return deptDropDownTree.deptMoveTreeFormat(inputData, nextTree, count);
            }
        },
        dropDownFormat: (data) => {
            let tree = {items: []}
            data.forEach((element) => {
                element.items = [];
                deptDropDownTree.deptMoveTreeFormat(element, tree);
            });
            return tree;
        },
        clearDropDownTree: (selectorId) => {
            $("#" + selectorId).data("kendoDropDownTree").value('');
            $("#" + selectorId).data("kendoDropDownTree").trigger("change");
        }
    }

    const deptMoveMgr = {
        deptMoveWindowInitOpen: () => {
            let $div = $(` <div id="dept-move-window"></div>`);
            $div.kendoWindow({
                width: 600,
                height: 150,
                position: {
                    top: "40%",
                    left: "30%"
                },
                actions: ["Close"],
                title: "조직 이동",
                visible: false,
                appendTo: $("#program-108").parent(),
                modal: true,
                draggable: false,
                resizable: false,
                autoFocus: false,
                content: {
                    template: kendo.template($("#dept-move-window-template").html())
                },
                open: (e) => {
                    deptMoveMgr.deptWindowOpen();
                },
                close: (e) => {
                    $("#dept-grid").data("kendoCpGrid").dataSource.read();
                    $("#dept-move-form").clearForm();
                    e.sender.destroy();
                }
            }).data("kendoWindow").refresh().open();
        },
        open: (deptId, deptPath, deptNm, deptLvl) => {
            $("#dept-move-targetDeptId").val(deptId);
            $("#dept-move-deptPath").val(deptPath);
            $("#dept-move-deptNm").val(deptNm);
            $("#dept-move-deptLvl").val(deptLvl);

            deptMoveMgr.deptMoveWindowInitOpen();

        },
        deptWindowOpen: () => {
            let formdata = $("#dept-move-form").serializeJSON();
            $("#move-dept-id").val(formdata.deptId);
            deptDropDownTree.deptDropDownTreeInit("dept-move-drop-down-tree");
            deptDropDownTree.deptDropDownTreeRefresh(formdata.deptId, formdata.deptPath, formdata.deptNm, formdata.deptLvl);
            $('#select-move-dept-name').html("[ " + formdata.deptNm + " ] 를(을)");
            $("#dept-move-Btn").kendoButton({
                themeColor: "primary",
                //icon: "check",
                click: (e) => {
                    let errorTemplate = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:2% 2% 2% 28%;">' +
                        '#=message#<div class="k-callout c-k-callout-n"></div></div>';
                    let valid = $("#dept-move-valid").kendoValidator({
                        errorTemplate: errorTemplate,
                        rules: {
                            required: (input) => {
                                if (input.is("[name=targetDeptId]")) return input.data("kendoDropDownTree").value() != "";
                                else return true;
                            }
                        }
                    }).data("kendoValidator");
                    if (valid.validate()) deptMoveMgr.deptMoveSave();
                }
            });
        },
        deptMoveSave: () => {
            let deptMove = new cpDataSource(METHOD.PUT, deptServiceBaseUrl + "/dept/dept-Move", deptMoveMgr.deptMoveParam()).getDataSource();
            deptMove.read().then(() => {
                $("#dept-move-window").data("kendoWindow").close();
                $('#dept-grid').data("kendoCpGrid").dataSource.read();
                deptDropDownTree.deptDropDownTreeRefresh();
                message.notification(deptMoveSuccessMassage);
            });
        },
        deptMoveParam: () => {
            let targetDeptId = $("#dept-move-drop-down-tree").val() != '' ? $("#dept-move-drop-down-tree").val() : 0;
            let param = {
                objectDeptId: $("#move-dept-id").val(),
                targetDeptId: targetDeptId,
                moveType: "",
            };
            return param;
        }
    }

    const deptPageControl = {
        init: () => {
            $("#dept-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, size: "46px", resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });
            $('.dept_search_check_box').on("click", (e) => {
                $('#dept-grid').data("kendoCpGrid").dataSource.read();
            });

            $("#dept-add-button").kendoButton({

                click: (e) => {
                    grid = $("#dept-grid").data("kendoCpGrid");
                    list = grid.dataItem($("#dept-grid tbody>tr:eq(0)"));
                    deptNm = $("#dept-grid th[data-field=deptNm]").attr("data-index");

                    let valid = $("#dept-grid").kendoValidator().data("kendoValidator");

                    if (list) {
                        if (!list.deptNm) {
                            grid.editCell(grid.tbody.find("td").eq(deptNm));
                        } else if (valid.validate()) {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(deptNm));
                        }
                    } else {
                        grid.addRow();
                        grid.editCell(grid.tbody.find("td").eq(deptNm));
                    }
                }
            });

            $("#dept-save-button").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    $('#dept-grid').data("kendoCpGrid").saveChanges();
                }
            });

            $("#dept-cancel-button").kendoButton({
                click: (e) => {
                    $('#dept-grid').data("kendoCpGrid").cancelChanges();
                }
            });

        },
    }

    cpProgress('dept-layout');
    deptMgr.init().then(() => {
        cpProgress('dept-layout', false);
    });
});

