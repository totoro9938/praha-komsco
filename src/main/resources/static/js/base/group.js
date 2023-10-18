$(document).ready(() => {
    /**
     * 그룹권한관리
     */
    const groupAuth = {
        init: async () => {
            $('#group-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '46px', resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });

            $('#group-not-used').kendoCheckBox({
                change: () => {
                    $('#group-auth-grid').data('kendoCpGrid').dataSource.read();
                }
            });

            $('#group-auth-grid-btn-save').kendoButton({
                themeColor: 'primary',
                click: () => {
                    $('#group-auth-grid').data('kendoCpGrid').saveChanges();
                }
            });

            $('#group-auth-grid-btn-cancel').kendoButton({
                click: () => {
                    $('#group-auth-grid').data('kendoCpGrid').cancelChanges();
                }
            });


            let groupDataSource = new cpDataSource(METHOD.GET, `/base/v1/group/select`, {
                outputYn: 'Y'
            }, '', '').getDataSource();

            await groupDataSource.read().then(() => {
                let data = groupDataSource.data();
                $('#group-group-dropdown').kendoDropDownList({
                    dataSource: data,
                    fillMode: 'solid',
                    autoWidth: true,
                    change: function (e) {
                        $('#group-auth-grid').data('kendoCpGrid').dataSource.read();
                    },
                    dataTextField: 'groupNm',
                    dataValueField: 'groupUid',
                    optionLabel: '선택'
                });
            });

            let consultAppDataSource = new cpDataSource(METHOD.GET, '/base/v1/group-program/select', {
                treeYn: 'N',
                parentId: 1,
                useYn: 'Y',
                delYn: 'N',
                outputYn: 'Y',
                sortType: ''
            }, '', '').getDataSource();

            let webAppDataSource = new cpDataSource(METHOD.GET, '/base/v1/group-program/select', {
                treeYn: 'N',
                parentId: 2,
                useYn: 'Y',
                delYn: 'N',
                outputYn: 'Y',
                sortType: ''
            }, '', '').getDataSource();

            let consultAppData;

            await consultAppDataSource.read().then(() => {
                consultAppData = consultAppDataSource.data();
            });

            await webAppDataSource.read().then(() => {
                const webAppData = webAppDataSource.data();
                const programData = [...consultAppData, ...webAppData];
                $('#group-program-dropdown').kendoDropDownList({
                    dataSource: programData,
                    fillMode: 'solid',
                    autoWidth: true,
                    change: function (e) {
                        $('#group-auth-grid').data('kendoCpGrid').dataSource.read();
                    },
                    dataTextField: 'fullProgramNm',
                    dataValueField: 'programId',
                    optionLabel: {fullProgramNm: '전체', programId: 1}
                });
            })

        },

    };
    const groupAuthGrid = {
        init: async () => {
            $('#group-auth-grid').kendoCpGrid({
                dataSource: groupAuthGrid.dataSource(),
                editable: true,
                height: '100%',
                scrollable: true,
                columns: [
                    {field: 'programId', hidden: true},
                    {
                        field: 'fullProgramNm',
                        title: '프로그램명',
                        headerAttributes: {class: 'k-text-center'},
                        width: 250,
                        editable: (dataItem) => {
                            return false;
                        },
                        locked: true
                    },
                    {
                        field: 'grantSelect',
                        title: '사용',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: function (data) {
                            if (data.grantSelect == 'Y') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantSelect' checked />";
                            } else if (data.grantSelect == 'N') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantSelect' />";
                            } else {
                                return "<input type='checkbox' class='k-checkbox-md' disabled />";
                            }
                        }
                    },
                    {
                        field: 'grantInsert',
                        title: '저장',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: function (data) {
                            if (data.grantInsert == 'Y') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantInsert' checked />";
                            } else if (data.grantInsert == 'N') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantInsert' />";
                            } else {
                                return "<input type='checkbox' class='k-checkbox-md' disabled />";
                            }
                        }
                    },
                    {
                        field: 'grantUpdate',
                        title: '수정',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: function (data) {
                            if (data.grantUpdate == 'Y') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantUpdate' checked />";
                            } else if (data.grantUpdate == 'N') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantUpdate' />";
                            } else {
                                return "<input type='checkbox' class='k-checkbox-md' disabled />";
                            }
                        }
                    },
                    {
                        field: 'grantDelete',
                        title: '삭제',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: function (data) {
                            if (data.grantDelete == 'Y') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantDelete' checked />";
                            } else if (data.grantDelete == 'N') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantDelete' />";
                            } else {
                                return "<input type='checkbox' class='k-checkbox-md' disabled />";
                            }
                        }
                    },
                    {
                        field: 'grantDown',
                        title: '엑셀',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: function (data) {
                            if (data.grantDown == 'Y') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantDown' checked />";
                            } else if (data.grantDown == 'N') {
                                return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantDown' />";
                            } else {
                                return "<input type='checkbox' class='k-checkbox-md' disabled />";
                            }
                        }
                    },
                    {
                        title: '조회',
                        headerAttributes: {class: 'k-text-center'},
                        columns: [
                            {
                                field: 'grantRangeAll',
                                title: '전체부서',
                                width: 100,
                                headerAttributes: {class: 'k-text-center'},
                                attributes: {class: '!k-text-center'},
                                template: function (data) {
                                    if (data.grantRangeAll == 'Y') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantRangeAll' checked />";
                                    } else if (data.grantRangeAll == 'N') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantRangeAll' />";
                                    } else {
                                        return "<input type='checkbox' class='k-checkbox-md' disabled />";
                                    }
                                }
                            },
                            {
                                field: 'grantRangeSub',
                                title: '하위부서',
                                width: 100,
                                headerAttributes: {class: 'k-text-center'},
                                attributes: {class: '!k-text-center'},
                                template: function (data) {
                                    if (data.grantRangeSub == 'Y') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantRangeSub' checked />";
                                    } else if (data.grantRangeSub == 'N') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantRangeSub' />";
                                    } else {
                                        return "<input type='checkbox' class='k-checkbox-md' disabled />";
                                    }
                                }
                            },
                            {
                                field: 'grantAgent',
                                title: '사용자선택',
                                width: 100,
                                headerAttributes: {class: 'k-text-center'},
                                attributes: {class: '!k-text-center'},
                                template: function (data) {
                                    if (data.grantAgent == 'Y') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantAgent' checked />";
                                    } else if (data.grantAgent == 'N') {
                                        return "<input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantAgent' />";
                                    } else {
                                        return "<input type='checkbox' class='k-checkbox-md' disabled />";
                                    }
                                }
                            },
                        ],
                    },
                    {
                        field: 'grantExtend_01',
                        title: '확장1',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_01) {
                                if (data.grantExtend_01 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_01' checked />${data.programExtend_01}</div>`;
                                } else if (data.grantExtend_01 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_01' />${data.programExtend_01}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_01}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_02',
                        title: '확장2',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_02) {
                                if (data.grantExtend_02 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_02' checked />${data.programExtend_02}</div>`;
                                } else if (data.grantExtend_02 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_02' />${data.programExtend_02}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_02}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_03',
                        title: '확장3',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_03) {
                                if (data.grantExtend_03 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_03' checked />${data.programExtend_03}</div>`;
                                } else if (data.grantExtend_03 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_03' />${data.programExtend_03}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_03}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_04',
                        title: '확장4',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_04) {
                                if (data.grantExtend_04 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_04' checked />${data.programExtend_04}</div>`;
                                } else if (data.grantExtend_04 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_04' />${data.programExtend_04}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_04}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_05',
                        title: '확장5',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_05) {
                                if (data.grantExtend_05 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_05' checked />${data.programExtend_05}</div>`;
                                } else if (data.grantExtend_05 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_05' />${data.programExtend_05}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_05}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_06',
                        title: '확장6',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_06) {
                                if (data.grantExtend_06 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_06' checked />${data.programExtend_06}</div>`;
                                } else if (data.grantExtend_06 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_06' />${data.programExtend_06}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_06}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_07',
                        title: '확장7',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_07) {
                                if (data.grantExtend_07 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_07' checked />${data.programExtend_07}</div>`;
                                } else if (data.grantExtend_07 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_07' />${data.programExtend_07}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_07}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_08',
                        title: '확장8',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_08) {
                                if (data.grantExtend_08 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_08' checked />${data.programExtend_08}</div>`;
                                } else if (data.grantExtend_08 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_08' />${data.programExtend_08}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_08}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_09',
                        title: '확장9',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_09) {
                                if (data.grantExtend_09 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_09' checked />${data.programExtend_09}</div>`;
                                } else if (data.grantExtend_09 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_09' />${data.programExtend_09}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_09}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field: 'grantExtend_10',
                        title: '확장10',
                        width: 120,
                        template: function (data) {
                            if (!!data.programExtend_10) {
                                if (data.grantExtend_10 == 'Y') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_10' checked />${data.programExtend_10}</div>`;
                                } else if (data.grantExtend_10 == 'N') {
                                    return `<div><input type='checkbox' class='k-checkbox-md editCheckbox' data-filed='grantExtend_10' />${data.programExtend_10}</div>`;
                                } else {
                                    return `<input type='checkbox' class='k-checkbox-md' disabled />${data.programExtend_10}`;
                                }
                            } else {
                                return "";
                            }
                        }
                    }
                ]
            }).on('click', '.editCheckbox', function (e) {
                let list = $('#group-auth-grid').data('kendoCpGrid');
                let dataRow = $(e.target).closest('tr');
                let dataItem = list.dataItem(dataRow);
                let filed = $(this).data('filed');

                if ($(this).is(':checked')) {
                    dataItem[filed] = 'Y';
                } else {
                    dataItem[filed] = 'N';
                }
                dataItem.dirty = true;
            });
        },

        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: '/base/v1/program-auth/select',
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json'
                    },
                    update: {
                        url: '/base/v1/program-auth/save',
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $('#group-auth-grid').data('kendoCpGrid').dataSource.read();
                        }

                    },
                    parameterMap: (data, type) => {

                        if (type == 'read') {

                            let param = {
                                actorType: 'Group',
                                actorId: $('#group-group-dropdown').data('kendoDropDownList').value(),
                                authGroupUid: USER_INFO.groupUid,
                                programId: $('#group-program-dropdown').data('kendoDropDownList').value(),
                                useYn: $('#group-not-used').is(':checked') ? 'N' : 'Y'
                            }
                            return param;

                        } else if (type == 'update') {

                            let model = data.models;
                            let jArray = new Array();

                            for (let i = 0; i < model.length; i++) {
                                jArray.push($.extend(model[i], {actorId: $('#group-group-dropdown').data('kendoDropDownList').value()}));
                            }

                            return JSON.stringify(jArray);
                        }
                    }
                },
                batch: true,
                schema: {
                    data: 'data',
                    model: {
                        id: 'programId',
                        fields: {
                            adminYn: {type: 'string', editable: false},
                            programId: {type: 'number', editable: false},
                            fullProgramName: {type: 'string'},
                            grantSelect: {type: 'string', editable: false},
                            grantInsert: {type: 'string', editable: false},
                            grantUpdate: {type: 'string', editable: false},
                            grantDelete: {type: 'string', editable: false},
                            grantPrint: {type: 'string', editable: false},
                            grantDown: {type: 'string', editable: false},
                            grantRangeAll: {type: 'string', editable: false},
                            grantRangeSub: {type: 'string', editable: false},
                            agentSelect: {type: 'string', editable: false},
                            grantAgent: {type: 'string', editable: false},
                            grantExtend_01: {type: 'string', editable: false},
                            grantExtend_02: {type: 'string', editable: false},
                            grantExtend_03: {type: 'string', editable: false},
                            grantExtend_04: {type: 'string', editable: false},
                            grantExtend_05: {type: 'string', editable: false},
                            grantExtend_06: {type: 'string', editable: false},
                            grantExtend_07: {type: 'string', editable: false},
                            grantExtend_08: {type: 'string', editable: false},
                            grantExtend_09: {type: 'string', editable: false},
                            grantExtend_10: {type: 'string', editable: false},
                            programExtend_01: {type: 'string', editable: false},
                            programExtend_02: {type: 'string', editable: false},
                            programExtend_03: {type: 'string', editable: false},
                            programExtend_04: {type: 'string', editable: false},
                            programExtend_05: {type: 'string', editable: false},
                            programExtend_06: {type: 'string', editable: false},
                            programExtend_07: {type: 'string', editable: false},
                            programExtend_08: {type: 'string', editable: false},
                            programExtend_09: {type: 'string', editable: false},
                            programExtend_10: {type: 'string', editable: false}
                        }
                    }
                }
            });
        }
    };

    /**
     * 그룹관리 클릭시 팝업창
     */
    const groupManager = {
        init: () => {
            $('#group-manager-window-btn-open').kendoButton({
                click: (e) => {
                    groupManager.windowInitOpen();
                }
            });
        },
        windowInitOpen: () => {
            let $div = $('<div id="group-manager-window"></div>');
            $div.kendoWindow({
                width: 1000,
                height: 370,
                position: {
                    top: "25%",
                    left: "20%"
                },
                modal: true,
                visible: false,
                appendTo: $("#program-110").parent(),
                actions: ['Close'],
                draggable: false,
                resizable: false,
                title: '그룹권한관리',
                content: {
                    template: kendo.template($('#group-manager-window-template').html())
                },
                open: () => {
                    groupManagerGrid.init();
                    groupManager.groupManagerWindowOpen();
                },
                close: (e) => {
                    e.sender.destroy();
                    let groupDataSource = new cpDataSource(METHOD.GET, `/base/v1/group/select`, {
                        outputYn: 'Y'
                    }, '', '').getDataSource();

                    groupDataSource.read().then(() => {
                        let data = groupDataSource.data();
                        $('#group-group-dropdown').data('kendoDropDownList').setDataSource(data);
                    });
                }
            }).data('kendoWindow').refresh().open();
        },
        groupManagerWindowOpen: () => {
            $('#group-manager-window-btn-addRow').kendoButton({
                click: () => {
                    const grid = $('#group-manager-grid').data('kendoCpGrid');
                    let list = grid.dataItem($('#group-manager-grid tbody > tr:eq(0)'));
                    let groupNm = $('#group-manager-grid th[data-field=groupNm]').attr('data-index');
                    let parentId = $('#group-manager-grid th[data-field=parentId]').attr('data-index');

                    if (list) {
                        if (!list.parentId) {
                            grid.editCell(grid.tbody.find('td').eq(parentId));
                        } else if (!list.groupNm) {
                            grid.editCell(grid.tbody.find('td').eq(groupNm));
                        } else {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(parentId));
                        }
                    } else {
                        grid.addRow();
                        grid.editCell(grid.tbody.find("td").eq(groupNm));
                    }
                    grid.select('tr:eq(0)');
                }
            });

            $('#group-manager-window-btn-save').kendoButton({
                themeColor: 'primary',
                click: () => {
                    const grid = $('#group-manager-grid').data('kendoCpGrid');
                    let list = grid.dataItem($('#group-manager-grid tbody > tr:eq(0)'));
                    let groupNm = $('#group-manager-grid th[data-field=groupNm]').attr('data-index');
                    let parentId = $('#group-manager-grid th[data-field=parentId]').attr('data-index');

                    if (list) {
                        if (!list.parentId) {
                            grid.editCell(grid.tbody.find('td').eq(parentId));
                        } else if (!list.groupNm) {
                            grid.editCell(grid.tbody.find('td').eq(groupNm));
                        } else {
                            $('#group-manager-grid').data('kendoCpGrid').saveChanges();
                        }
                    }

                }
            });

            $('#group-manager-window-btn-cancel').kendoButton({
                themeColor: 'warning',
                click: () => {
                    $('#group-manager-grid').data('kendoCpGrid').cancelChanges();
                }
            });

        }
    };
    const groupManagerGrid = {
        init: () => {
            $('#group-manager-grid').kendoCpGrid({
                dataSource: groupManagerGrid.dataSource(),
                editable: "incell",
                selectable: true,
                height: '85%',
                columns: [
                    {
                        field: 'groupUid',
                        title: 'ID',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 30,
                        editable: (dataItem) => {
                            return false;
                        }
                    },
                    {
                        field: 'groupIdx',
                        hidden: true
                    },
                    {
                        field: 'groupNm',
                        title: '그룹명',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 40
                    },
                    {
                        field: 'parentId',
                        title: '상위그룹명',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 40,
                        template: "#=parentNm#",
                        editor: groupEditFunction.groupDropdownEditor,
                    },
                    {
                        field: 'adminYn',
                        title: '관리자',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 30,
                        template: "<input type='checkbox' style='vertical-align: middle;' class='k-checkbox-md group-edit-check-box' data-filed='adminYn' #= adminYn=='Y' || adminYn == null ? 'checked' : '' # />",
                        editor: groupEditFunction.checkboxEditor
                    },
                    {
                        field: 'description',
                        title: '비고',
                        headerAttributes: {class: 'k-text-center'},
                        width: 120
                    },
                    {
                        command: {
                            name: 'remove', text: '삭제', iconClass: 'k-icon k-i-close', themeColor: 'error',
                            click: (e) => {
                                const grid = $('#group-manager-grid').data('kendoCpGrid');
                                let dataRow = $(e.target).closest('tr');
                                grid.select(dataRow);
                                message.callBackConfirm({msg: '삭제하시겠습니까?', callback: groupManagerGrid.removeGroup})
                            }
                        },
                        width: 40, attributes: {class: '!k-text-center'}
                    }
                ]
            }).on('click', '.group-edit-check-box', (e) => {
                let list = $('#group-manager-grid').data('kendoCpGrid');
                let field = $(e.target).data('filed');
                let dataRow = $(e.target).closest('tr');
                let dataItem = list.dataItem(dataRow);

                if ($(e.target).is(':checked')) {
                    dataItem[field] = 'Y';
                } else {
                    dataItem[field] = 'N';
                }
                dataItem.dirty = true;
                list.editCell();
            });
        },
        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/base/v1/group/select`,
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json'
                    },
                    update: {
                        url: `/base/v1/group/update`,
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $('#group-manager-grid').data('kendoCpGrid').dataSource.read();
                        }

                    },
                    create: {
                        url: `/base/v1/group/insert`,
                        type: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $('#group-manager-grid').data('kendoCpGrid').dataSource.read();
                        }
                    },
                    destroy: {
                        url: `/base/v1/group/delete`,
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "삭제되었습니다.", type: "success"});
                            $('#group-manager-grid').data('kendoCpGrid').dataSource.read();
                        }
                    },
                    parameterMap: (data, type) => {
                        if (type == 'read') {
                            let param = {}
                            param.outputYn = 'Y';

                            return param;
                        } else if (type == 'update') {

                            return JSON.stringify(data.models);

                        } else if (type == 'create') {

                            return JSON.stringify(data.models);

                        } else if (type == 'destroy') {

                            return JSON.stringify(data.models);
                        }
                    }
                },
                batch: true,
                schema: {
                    data: 'data',
                    model: {
                        id: 'groupUid',
                        fields: {
                            groupUid: {type: 'number'},
                            groupIdx: {type: 'number'},
                            parentId: {type: 'number'},
                            groupNm: {type: 'string', validation: {required: {message: '그룹명은 필수입니다.'}}},
                            parentNm: {type: 'string'},
                            adminYn: {type: 'string', defaultValue: 'N'},
                            description: {type: 'string'},
                        }
                    }
                }
            });
        },
        removeGroup: function () {
            const grid = $('#group-manager-grid').data('kendoCpGrid');
            const item = grid.dataItem(grid.select());

            let removeGroup = new cpDataSource(METHOD.DELETE, '/base/v1/group/delete', {
                groupUid: item.groupUid
            }).getDataSource();
            removeGroup.read().then(() => {
                message.notification({msg: '삭제되었습니다.', type: 'success'});
                grid.dataSource.read();
            });
        }
    };

    const groupEditFunction = {
        checkboxEditor: function (container, options) {
            let fieldNm = options.field;
            let input = '';
            if (options.model[fieldNm] == 'Y') {
                input = `<input type='checkbox' class='k-checkbox-md group-edit-check-box' style="margin-left: 0" data-filed='${fieldNm}' checked='checked' />`;
            } else {
                input = `<input type='checkbox' class='k-checkbox-md group-edit-check-box'  style="margin-left: 0" data-filed='${fieldNm}' />`;
            }
            $(input).appendTo(container);
        },
        groupDropdownEditor: function (container, options) {
            let input = $(`<input required validationMessage="상위그룹명은 필수입니다." name="${options.field}" />`);
            input.appendTo(container);
            input.kendoDropDownList({
                dataSource: {
                    transport: {
                        read: {
                            url: `/base/v1/group-all/select`,
                            type: 'GET',
                            contentType: 'application/json',
                            dataType: 'json'
                        },
                        parameterMap: function (data, type) {
                            if (type == 'read') {
                                let param = {
                                    outputYn: 'Y'
                                }

                                return param;
                            }
                        }
                    },
                    schema: {
                        data: 'data'
                    }
                },
                fillMode: 'flat',
                dataTextField: 'groupNm',
                dataValueField: 'groupUid',
                change: function (e) {
                    const grid = $('#group-manager-grid').data('kendoCpGrid');
                    const item = grid.dataItem(grid.select());
                    item.parentNm = e.sender.text();
                }
            });
        }
    };

    cpProgress('group-layout');
    groupAuth.init().then(() => {
        groupAuthGrid.init().then(() => {
            cpProgress('group-layout', false);
        });
    });
    groupManager.init();
    groupManager.groupManagerWindowOpen();
    groupManagerGrid.init();
});

