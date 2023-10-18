$(document).ready(function(){

    const elemPrev = 'user';
    const userAuthNm = 'BASE_USER_MGR';
    const gridDataSourceUrl = '/base/v1/user-page/select';

    const userDeptAuth = userAuthRange(userAuthNm);

    const localStorageGridColumnsNm = 'localStorageUserGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;

    let userDetailCtiValidator = $('#user-detail-cti').kendoValidator({
        rules: {
            cti: (input) => {
                let isCtiChecked = $('#user-detail-ctiYn').data('kendoCheckBox').value();
                if (isCtiChecked) {
                    if (input.is('[name=ctiId]')) {
                        return input.val() !== '';
                    }
                    if (input.is('[name=ctiStation]')) {
                        return input.val() !== '';
                    }
                }
                return true;
            }
        }
    }).data('kendoValidator');

    let userDetailValidator = $('#user-detail-section').kendoValidator({
        errorTemplate: '',
        messages: {
            required: (input) => {
                return "";
            },
            email: (input) => {
                return '<div class="k-widget k-tooltip k-tooltip-error" >올바른 이메일 형식이 아닙니다.<div class="k-callout c-k-callout-n"></div></div>';
            }
        }
    }).data('kendoValidator');


    const gridMain = {

        gridColumns: [
            { field: 'userId', hidden: true },
            { field: 'userCd', title: '아이디', headerAttributes: {class: 'k-text-center'}, width: 130 },
            { field: 'userNm', title: '이름', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 100 },
            { field: 'deptNm', title: '부서', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 100 },
            { field: 'duty', title: '직책', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 100 },
            { field: 'useYnNm', title: '재직', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 50 },
            { field: 'groupNm', title: '사용자그룹', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 130 },
            { field: 'ctiYn', title: 'CTI사용', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 80,
                template: "<input type='checkbox' class='k-checkbox-md' disabled #= ctiYn == 'Y' ? 'checked' : '' # />"
            },
            { field: 'ctiId', title: 'CTI아이디', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 80 },
            { field: 'ctiStation', title: 'CTI내선번호', headerAttributes: {class: 'k-text-center'}, attributes: {class: '!k-text-center'}, width: 100 },
            { field: 'description', title: '담당업무', headerAttributes: {class: 'k-text-center'}, attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}, width: 200 }
        ],
        gridWidth: 0,

        grid : `#${elemPrev}-grid`,
        searchExpansion : `#${elemPrev}-expansion-panel`,
        gridSplitter : `#${elemPrev}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: true,

        searchDefaultValues: [],

        readType: true,
        pageMoveParam: {},

        init: () => {

            //  Search panel
            gridCommonUtils.init(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid, localStorageGridColumnsNm);
            gridCommonUtils.gridExpansionPanel(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid);

            //  Splitter
            $(gridMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });


            gridMain.gridWidth = gridCommonUtils.gridWidthSet(gridMain.gridWidth, !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns, gridMain.gridSplitter);


            //  Grid
            $(gridMain.grid).kendoCpGrid({
                toolbar: [
                    { template: kendo.template($(`#${elemPrev}-grid-toolbar-template`).html()) }
                ],
                columns: !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                click: (e) => {
                    let selectItem = e.sender.dataItem(e.sender.select());
                    gridDetail.detailShow(selectItem);
                },
                page: (e) => {
                    gridMain.readType = false;
                },
                height: '100%',
                width: gridMain.gridWidth,
                dataBound: function(){
                    if($(gridMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block'){
                        $(gridMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(gridMain.gridSplitter, gridMain.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                }
            });
            $(`#${elemPrev}-toolbar-button-user-insert`).kendoButton({
                icon: 'download',
                themeColor: 'primary',
                click: function(e){
                    $(`#${elemPrev}-grid`).data('kendoCpGrid').clearSelection();
                    userDetailCtiValidator.reset();
                    userDetailValidator.reset();
                    gridDetail.detailShow(0);
                    gridDetail.detailClear();
                    gridDetail.showInsertBox();
                }
            });
            $(`#${elemPrev}-toolbar-button-excel-down`).kendoButton({
                icon: 'download',
                themeColor: 'success',
                click: function(e){
                    cpProgress("consultList-layout");
                    $(`#${elemPrev}-excel-grid`).data('kendoCpGrid').dataSource.read().then(()=>{
                        $(`#${elemPrev}-excel-grid`).data('kendoCpGrid').saveAsExcel({});
                    });
                }
            });
            $(`#${elemPrev}-toolbar-button-excel-upload`).kendoButton({
                icon: 'upload',
                themeColor: 'success',
                click: () => {
                    userExcelUpload.windowInitOpen();
                }
            });
        },

        gridSetting: async () => {

            //  Dept
            let userDepartment;

            if (userDeptAuth !== AUTH_RANG.ALL) {
                userDepartment = new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {fillMode: 'solid', autoWidth: true}, userAuthNm, USER_INFO.deptId, IS.FALSE);
            } else {
                userDepartment = new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {fillMode: 'solid', autoWidth: true}, userAuthNm, USER_INFO.deptId);
            }
            userDepartment.object = userDepartment.create();
            await userDepartment.drawingTree().then(() => {
            });
            userDepartment.setEnable();
            const deptDataSource = new cpDataSource(METHOD.GET, '/common/v1/dept-all', {"deptId": 0}).getDataSource();
            deptDataSource.read().then(() => {
                let userDeptData = [...deptDataSource.data()];
                $("#user-detail-dept").kendoDropDownTree({
                    dataSource: userDeptData,
                    clearButton: false,
                    fillMode: "solid",
                    valueTemplate: '<span>#: fullDeptNm # </span>',
                    dataTextField: "deptNm",
                    dataValueField: "deptId",
                    filter: "contains"
                })
            });

            //  Group
            const groupDataSource = new cpDataSource(METHOD.GET, '/base/v1/user/group/select').getDataSource();
            await groupDataSource.read().then(() => {
                let data = groupDataSource.data();

                $('#user-detail-groupNm').kendoDropDownList({
                    dataSource: data,
                    dataTextField: 'groupNm',
                    dataValueField: 'groupUid',
                    fillMode: 'flat'
                    // ,
                    // select: (e) => {
                    //     let userDeptData = [...userGetDataSource.userDept.data()];
                    //     if (e.dataItem.groupNm === "총괄관리자" || e.dataItem.groupNm === "매니저" || e.dataItem.groupNm === "상담사") {
                    //         let deptDatas = userGetDataSource.userDept.data().filter(r => r.deptId === 1);
                    //         let deptDataSource = new kendo.data.HierarchicalDataSource({data: deptDatas});
                    //         $("#user-detail-dept").data("kendoDropDownTree").setDataSource(deptDataSource);
                    //     } else {
                    //         $("#user-detail-dept").data("kendoDropDownTree").setDataSource(userDeptData);
                    //     }
                    // }
                });
                $(`#${elemPrev}-search-group`).kendoDropDownList({
                    dataSource: data,
                    dataTextField: 'groupNm',
                    dataValueField: 'groupUid',
                    fillMode: 'solid'
                });

                if (userDeptAuth == AUTH_RANG.ALL) {
                    let allData = [...data];
                    allData.unshift({groupNm: '전체', groupUid: 0});
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList').setDataSource(allData);
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList').value(0);
                }

                if (userDeptAuth == AUTH_RANG.NOTHING) {
                    //권한이 nothing일 때
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList').value(USER_INFO.groupUid); //로그인한 사용자의 그룹으로 세팅
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList').readonly(true);
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList')._arrow.addClass('hidden');
                    $('#user-detail-groupNm').data('kendoDropDownList').readonly(true);
                    $('#user-detail-groupNm').data('kendoDropDownList')._arrow.addClass('hidden');
                }
            });

            //  UseYn
            const userUseYnRadioGroup =  new cpDataSource(METHOD.GET, "/common/v1/code/UserUseYn", {}).getDataSource();
            await userUseYnRadioGroup.read().then(() => {
                $(`#${elemPrev}-search-use-yn`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(userUseYnRadioGroup.data(),true),
                    index: 0,
                    size: 'small'
                });
                if (userDeptAuth === AUTH_RANG.NOTHING) {
                    $(`#${elemPrev}-search-use-yn`).data("kendoButtonGroup").enable(false);
                }
                $('#user-detail-useYn').kendoRadioGroup({
                    items: radioGroupUtils.radioGroupMakeItems(userUseYnRadioGroup.data(), false),
                    value: 'Y',
                    layout: 'horizontal'
                });
            });

            // CtiYn
            const userCtiYnRadioGroup =  new cpDataSource(METHOD.GET, "/common/v1/code/UserCtiYn", {}).getDataSource();
            await userCtiYnRadioGroup.read().then((res) => {
                $(`#${elemPrev}-search-cti-yn`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(userCtiYnRadioGroup.data(),true),
                    index: 0,
                    size: 'small'
                });
                if (userDeptAuth === AUTH_RANG.NOTHING) {
                    $(`#${elemPrev}-search-cti-yn`).data("kendoButtonGroup").enable(false);
                }
            });

            let searchType = new cpCodeDropDownTree(`#${elemPrev}-search-type`, 'UserEtcType', {value: "UserNm", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(searchType, `#${elemPrev}-search-type`);

            $(`#${elemPrev}-search-txt`).kendoTextBox({
                size: 'small'
            }).bind("keyup", function (e) {
                if (e.keyCode === 13) {
                    $(`#${elemPrev}-search-button`).trigger('click');
                }
            });

            $(`#${elemPrev}-search-button`).kendoButton({
                themeColor: 'secondary',
                icon: "search",
                size: 'small',
                click: () => {
                    gridMain.isSearchBtn = true;
                    gridMain.gridSaearch();
                }
            });

            gridMain.searchDefaultValues.deptId = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.group = $(`#${elemPrev}-search-group`).data('kendoDropDownList').value();
            gridMain.searchDefaultValues.useYn = 0;
            gridMain.searchDefaultValues.ctiYn = 0;
            gridMain.searchDefaultValues.type = 'UserNm';

            $(`#${elemPrev}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function(e){
                    $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.deptId);
                    $(`#${elemPrev}-search-group`).data('kendoDropDownList').value(gridMain.searchDefaultValues.group);
                    $(`#${elemPrev}-search-use-yn`).data('kendoButtonGroup').select(gridMain.searchDefaultValues.useYn);
                    $(`#${elemPrev}-search-cti-yn`).data('kendoButtonGroup').select(gridMain.searchDefaultValues.ctiYn);
                    $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.type);
                    $(`#${elemPrev}-search-txt`).data('kendoTextBox').value('');
                    gridMain.isSearchBtn = true;
                    gridMain.gridSaearch();
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
                            if (gridMain.isSearchBtn) {
                                gridMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (data, type) => {
                        if (type == 'read') {
                            if (gridMain.readType) {
                                let param = {
                                    parentId: 0,
                                    deptId: 0,
                                    userId: userDeptAuth == AUTH_RANG.NOTHING ? USER_INFO.userId : 0,
                                    useYn: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-use-yn`) == 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-use-yn`),
                                    groupUid: $(`#${elemPrev}-search-group`).data('kendoDropDownList').value(),
                                    ctiYn: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-cti-yn`) == 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-cti-yn`),
                                    searchType: $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(),
                                    searchTxt: $(`#${elemPrev}-search-txt`).data('kendoTextBox').value(),
                                    sortType: '',
                                    outputYn: 'Y',
                                    page: data.page,
                                    totalPage: data.pageSize
                                };
                                if (userDeptAuth == AUTH_RANG.ALL || userDeptAuth == AUTH_RANG.SUB) {
                                    param.parentId = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value();
                                } else if (userDeptAuth == AUTH_RANG.AGENT) {
                                    param.deptId = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value();
                                } else {
                                    param.searchTxt = USER_INFO.userNm;
                                }
                                gridMain.pageMoveParam = {...param};
                                return param;
                            } else {
                                gridMain.pageMoveParam.page = data.page;
                                gridMain.pageMoveParam.pageSize = data.pageSize;
                                return gridMain.pageMoveParam;

                            }
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    data: "data.rows",
                    total: "data.totalCount",
                    parse : (res) => {
                        res.data.rows.forEach((row) => {
                        })
                        return res;
                    }
                }
            });
        },
        gridSaearch: () => {

            let deptId                  = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree');
            let group                   = $(`#${elemPrev}-search-group`).data('kendoDropDownList');
            let searchType              = $(`#${elemPrev}-search-type`).data('kendoDropDownTree');
            let searchTxt               = $(`#${elemPrev}-search-txt`).data('kendoTextBox');

            let searchData = [
                { label: '부서', text: deptId.text(), value: deptId.value() },
                { label: '사용자그룹', text: group.text(), value: group.value() },
                { label: '재직여부', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${elemPrev}-search-use-yn`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-use-yn`) },
                { label: 'CTI사용', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${elemPrev}-search-cti-yn`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-cti-yn`) },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

            $(gridMain.grid).data('kendoCpGrid').setDataSource(gridMain.gridDataSource());

            gridDetail.detailHide();

        }
    }

    const gridDetail = {

        init : () =>{
            $('#user-detail-userCd').kendoTextBox();
            $('#user-detail-userNm').kendoTextBox();
            $('#user-detail-positionNm').kendoTextBox();
            $('#user-detail-duty').kendoTextBox();
            $('#user-detail-ctiYn').kendoCheckBox({
                change: (e) => {
                    let isChecked = e.checked; //체크박스 change event에서만 값 할당
                    let ctiIdTextBox = $('#user-detail-ctiId').data('kendoTextBox');
                    let ctiStationTextBox = $('#user-detail-ctiStation').data('kendoTextBox');
                    let ctiPwdTextBox = $('#user-detail-ctiPwd').data('kendoTextBox');
                    if (!isChecked) {
                        ctiIdTextBox.readonly(true);
                        ctiStationTextBox.readonly(true);
                        ctiPwdTextBox.readonly(true);
                        ctiIdTextBox.value('');
                        ctiStationTextBox.value('');
                        ctiPwdTextBox.value('');
                        userDetailCtiValidator.reset();
                    } else {
                        ctiIdTextBox.readonly(false);
                        ctiStationTextBox.readonly(false);
                        ctiPwdTextBox.readonly(false);
                    }
                }
            });
            $('#user-detail-enterYmd').kendoDatePicker({
                format: 'yyyy-MM-dd'
            });
            $('#user-detail-retireYmd').kendoDatePicker({
                format: 'yyyy-MM-dd'
            });
            $('#user-detail-email').kendoTextBox();
            $('#user-detail-telNo').kendoTextBox({
                change: (e) => {
                    let value = e.value.replaceAll("-","");
                    const maxLength = 11;
                    if (value.length > maxLength) {
                        value = value.substring(0, maxLength);
                    }
                    e.sender.element.val(formatterHpNo(value));
                }
            });
            $('#user-detail-hpNo').kendoTextBox({
                change: (e) => {
                    let value = e.value.replaceAll("-","");
                    const maxLength = 11;
                    if (value.length > maxLength) {
                        value = value.substring(0, maxLength);
                    }
                    e.sender.element.val(formatterHpNo(value));
                }
            });
            $('#user-detail-ctiId').kendoTextBox({});
            $('#user-detail-ctiPwd').kendoTextBox({});
            $('#user-detail-ctiStation').kendoTextBox({
                change: (e) => {
                    const regExp = /[^0-9]/g;
                    e.sender.element.val(e.value.replace(regExp, ""));
                }
            });
            $('#user-detail-description').kendoTextArea({
                rows: 4
            });

            $('#user-detail-btn-save').kendoButton({
                themeColor: 'primary',
                click: (e) => {
                    let ctiYn = $('#user-detail-ctiYn').data('kendoCheckBox') ? 'Y' : 'N';
                    if (!userDetailValidator.validate()) {
                        return;
                    }
                    if (ctiYn && !userDetailCtiValidator.validate()) {
                        return;
                    }
                    cpProgress('user-detail');
                    message.callBackConfirm({msg: '등록 하시겠습니까?', callback: insert, cancel: progressCancel});

                    function progressCancel() {
                        cpProgress('user-detail', false);
                    }

                    function insert() {
                        let param = {
                            userUuid: '',
                            userCd: $('#user-detail-userCd').data('kendoTextBox').value(),
                            userPwd: '',
                            userNm: $('#user-detail-userNm').data('kendoTextBox').value(),
                            userIdx: '',
                            telNo: $('#user-detail-telNo').data('kendoTextBox').value(),
                            hpNo: $('#user-detail-hpNo').data('kendoTextBox').value(),
                            email: $('#user-detail-email').data('kendoTextBox').value(),
                            deptId: $('#user-detail-dept').data('kendoDropDownTree').value(),
                            duty: $('#user-detail-duty').data('kendoTextBox').value(),
                            positionNm: $('#user-detail-positionNm').data('kendoTextBox').value(),
                            useYn: $('#user-detail-useYn').data('kendoRadioGroup').value(),
                            enterDt: kendo.toString($('#user-detail-enterYmd').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            retireDt: kendo.toString($('#user-detail-retireYmd').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            ctiYn: $('#user-detail-ctiYn').is(':checked') ? 'Y' : 'N',
                            ctiId: $('#user-detail-ctiId').data('kendoTextBox').value(),
                            ctiPwd: $('#user-detail-ctiPwd').data('kendoTextBox').value(),
                            ctiStation: $('#user-detail-ctiStation').data('kendoTextBox').value(),
                            groupUid: $('#user-detail-groupNm').data('kendoDropDownList').value(),
                            description: $('#user-detail-description').data('kendoTextArea').value()
                        }
                        const grid = $(gridMain.grid).data('kendoCpGrid');
                        let userCd = $('#user-detail-userCd').val();
                        let userInsertDataSource = new cpDataSource(METHOD.POST, '/base/v1/user/insert', param, '', '').getDataSource();
                        userInsertDataSource.read().then(() => {
                            grid.options.userCd = userCd;
                            grid.dataSource.read();
                            gridDetail.detailClear();
                        });
                        progressCancel();
                    }
                }
            });
            $('#user-detail-btn-update').kendoButton({
                themeColor: 'primary',
                click: (e) => {
                    let ctiYn = $('#user-detail-ctiYn').data('kendoCheckBox') ? 'Y' : 'N';
                    if (!userDetailValidator.validate()) {
                        return;
                    }
                    if (ctiYn && !userDetailCtiValidator.validate()) {
                        return;
                    }
                    const updateUser = () => {
                        const grid = $(gridMain.grid).data('kendoCpGrid');
                        let userCd = $('#user-detail-userCd').val();
                        let param = {
                            userId: $('#user-detail-userId').val(),
                            userIdx: $('#user-detail-userIdx').val(),
                            deptId: $('#user-detail-dept').data('kendoDropDownTree').value(),
                            delYn: 'N',
                            ctiPwd: $('#user-detail-ctiPwd').data('kendoTextBox').value(),
                            userCd: $('#user-detail-userCd').data('kendoTextBox').value(),
                            userNm: $('#user-detail-userNm').data('kendoTextBox').value(),
                            telNo: $('#user-detail-telNo').data('kendoTextBox').value(),
                            hpNo: $('#user-detail-hpNo').data('kendoTextBox').value(),
                            email: $('#user-detail-email').data('kendoTextBox').value(),
                            duty: $('#user-detail-duty').data('kendoTextBox').value(),
                            positionNm: $('#user-detail-positionNm').data('kendoTextBox').value(),
                            useYn: $('#user-detail-useYn').data('kendoRadioGroup').value(),
                            ctiYn: $('#user-detail-ctiYn').is(':checked') ? 'Y' : 'N',
                            ctiId: $('#user-detail-ctiId').data('kendoTextBox').value(),
                            ctiStation: $('#user-detail-ctiStation').data('kendoTextBox').value(),
                            enterDt: kendo.toString($('#user-detail-enterYmd').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            retireDt: kendo.toString($('#user-detail-retireYmd').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            groupUid: $('#user-detail-groupNm').data('kendoDropDownList').value(),
                            description: $('#user-detail-description').data('kendoTextArea').value()
                        };
                        let userUpdateDataSource = new cpDataSource(METHOD.PUT, '/base/v1/user/update', param,'', '').getDataSource();
                        userUpdateDataSource.read().then(() => {
                            grid.options.userCd = userCd;
                            grid.dataSource.read();
                            message.notification({msg: '수정되었습니다.', type: 'success'});
                            gridDetail.detailClear();
                        });
                        progressCancel();
                    }
                    cpProgress('user-detail');

                    function progressCancel() {
                        cpProgress('user-detail', false);
                    }

                    message.callBackConfirm({msg: '수정하시겠습니까?', callback: updateUser, cancel: progressCancel});
                }
            });
            $('#user-detail-btn-reset-password').kendoButton({
                click: () => {
                    cpProgress('user-detail');
                    message.callBackConfirm({msg: '초기화 하시겠습니까?', callback: resetPassword, cancel: progressCancel});

                    function progressCancel() {
                        cpProgress('user-detail', false);
                    }

                    function resetPassword() {
                        const grid = $(gridMain.grid).data('kendoCpGrid');
                        let userCd = $('#user-detail-userCd').val();
                        let param = {
                            userId: $('#user-detail-userId').val(),
                            userPwd: ''
                        }
                        let userPasswordReset = new cpDataSource(METHOD.PUT, '/base/v1/user-password/reset', param, '', '').getDataSource();
                        userPasswordReset.read().then(() => {
                            grid.options.userCd = userCd;
                            grid.dataSource.read();
                            gridDetail.detailClear();
                            progressCancel();
                            message.notification({msg: '비밀번호가 초기화되었습니다.', type: 'success'});
                        });
                        gridDetail.detailHide();
                    }
                }
            });
            $('#user-detail-btn-reset').kendoButton({
                click: (e) => {
                    $('#user-manager-grid').data('kendoCpGrid').refresh();
                    gridDetail.showInsertBox();
                }
            });
        },

        detailShow: (data) => {

            const splitter = $(gridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), `calc(100% - ${gridMain.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), gridMain.detailSplitterWidth);

            const gridSplitterCloseId = '#' + splitter.element.find('.k-i-close').parent().attr('id');
            $(gridSplitterCloseId).on('click', () => {
                gridDetail.detailHide();
            });

            userDetailCtiValidator.reset();
            userDetailValidator.reset();

            if(data !== 0){
                const getUserItem = new cpDataSource(METHOD.GET, `/base/v1/user-item/${data.userUuid}`).getDataSource();
                getUserItem.read().then(() => {
                    let item = getUserItem.data()[0];
                    $('#user-detail-insert-box').hide();
                    $('#user-detail-update-box').show();
                    gridDetail.detailClear();
                    gridDetail.detailDataBind(item);
                });
            }

        },
        detailClear: () => {
            $('#user-detail-userId').val('');
            $('#user-detail-userIdx').val('');
            $('#user-detail-userCd').data('kendoTextBox').value('');
            $('#user-detail-userNm').data('kendoTextBox').value('');
            $('#user-detail-positionNm').data('kendoTextBox').value('');
            $('#user-detail-duty').data('kendoTextBox').value('');
            $('#user-detail-useYn').data('kendoRadioGroup').value('Y');
            $('#user-detail-groupNm').data('kendoDropDownList').value('');
            $('#user-detail-enterYmd').data('kendoDatePicker').value(new Date());
            $('#user-detail-retireYmd').data('kendoDatePicker').value('');
            $('#user-detail-email').data('kendoTextBox').value('');
            $('#user-detail-telNo').data('kendoTextBox').value('');
            $('#user-detail-hpNo').data('kendoTextBox').value('');
            $('#user-detail-ctiYn').data('kendoCheckBox').check(false);
            let dtiId = $('#user-detail-ctiId').data('kendoTextBox');
            dtiId.value('');
            dtiId.readonly(true);
            let ctiStation = $('#user-detail-ctiStation').data('kendoTextBox');
            ctiStation.value('');
            ctiStation.readonly(true);
            let ctiPwd = $('#user-detail-ctiPwd').data('kendoTextBox');
            ctiPwd.value('');
            ctiPwd.readonly(true);
            $('#user-detail-description').data('kendoTextArea').value('');
            $('#user-detail-dept').data('kendoDropDownTree').value('');
            $('#user-detail-dept').data('kendoDropDownTree').treeview.collapse(".k-item");
            $("#user-detail-dept").data("kendoDropDownTree").readonly(false);
        },
        detailDataBind: (item) => {
            $('#user-detail-userId').val(item.userId);
            $('#user-detail-userIdx').val(item.userIdx);
            $('#user-detail-userCd').data('kendoTextBox').value(item.userCd);
            $('#user-detail-userNm').data('kendoTextBox').value(item.userNm);
            $('#user-detail-positionNm').data('kendoTextBox').value(item.positionNm);
            $('#user-detail-duty').data('kendoTextBox').value(item.duty);
            $('#user-detail-useYn').data('kendoRadioGroup').value(item.useYn);
            $('#user-detail-groupNm').data('kendoDropDownList').value(item.groupUid);
            $('#user-detail-enterYmd').data('kendoDatePicker').value(item.enterYmd);
            $('#user-detail-retireYmd').data('kendoDatePicker').value(item.retireYmd);
            $('#user-detail-email').data('kendoTextBox').value(item.email);
            $('#user-detail-telNo').data('kendoTextBox').value(item.telNo);
            $('#user-detail-hpNo').data('kendoTextBox').value(item.hpNo);
            $('#user-detail-ctiId').data('kendoTextBox').value(item.ctiId);
            $('#user-detail-ctiStation').data('kendoTextBox').value(item.ctiStation);
            $('#user-detail-ctiPwd').data('kendoTextBox').value(item.ctiPwd);
            $('#user-detail-description').data('kendoTextArea').value(item.description);
            let ctiYn = $('#user-detail-ctiYn').data('kendoCheckBox');
            if (item.ctiYn === 'Y') {
                $('#user-detail-ctiId').data('kendoTextBox').readonly(false);
                $('#user-detail-ctiStation').data('kendoTextBox').readonly(false);
                $('#user-detail-ctiPwd').data('kendoTextBox').readonly(false);
                $('#user-detail-ctiPwd').data('kendoTextBox').readonly(false);
                ctiYn.check(true);
                ctiYn.checked = true;
            } else {
                $('#user-detail-ctiId').data('kendoTextBox').readonly(true);
                $('#user-detail-ctiStation').data('kendoTextBox').readonly(true);
                $('#user-detail-ctiPwd').data('kendoTextBox').readonly(true);
                ctiYn.check(false);
                ctiYn.checked = false;
            }
            try {
                $('#user-detail-dept').data('kendoDropDownTree').value(item.deptId);
            } catch(e) {

            }
        },
        showInsertBox: () => {
            $('#user-detail-insert-box').show();
            $('#user-detail-update-box').hide();
            gridDetail.detailClear();
        },
        detailHide: () => {

            const splitter = $(gridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');

        }

    }

    const userExcelUpload = {
        init: () => {
            $('#user-manager-excel-upload').kendoUpload({
                multiple: false,
                select: userExcelUpload.readExcel,
                remove: (e) => {
                    $("#user-manager-excel-upload-grid").data("kendoCpGrid").setDataSource([]);
                    $("#user-manager-excel-upload-grid").data("kendoCpGrid").dataSource.read();
                }
            });

            $('#user-manager-excel-upload-grid').kendoCpGrid({
                columns: [
                    {field: 'userCd', title: '아이디', attributes: {style: 'text-align: center'}},
                    {field: 'userNm', title: '이름', attributes: {style: 'text-align: center'}},
                    {field: 'telNo', title: '전화번호', attributes: {style: 'text-align: center'}},
                    {field: 'hpNo', title: '핸드폰', attributes: {style: 'text-align: center'}},
                    {field: 'email', title: '이메일', attributes: {style: 'text-align: center'}},
                    {field: 'deptCd', title: '부서코드', attributes: {style: 'text-align: center'}},
                    {field: 'duty', title: '직위', attributes: {style: 'text-align: center'}},
                    {field: 'positionNm', title: '직책', attributes: {style: 'text-align: center'}},
                    {field: 'useYnNm', title: '재직여부', attributes: {style: 'text-align: center'}},
                    {field: 'enterDt', title: '입사일자', attributes: {style: 'text-align: center'}},
                    {field: 'retireDt', title: '퇴사일자', attributes: {style: 'text-align: center'}},
                    {field: 'description', title: '담당업무', attributes: {style: 'text-align: center'}}
                ],
                dataSource: {
                    serverPaging: true,
                    pageSize: 10
                },
                height: '95%',
                resizable: false,
                pageable: {
                    pageSize: 10,
                    refresh: true
                }
            });

            $('#user-manager-excel-upload-btn-save').kendoButton({
                themeColor: 'primary',
                click: () => {
                    const uploadUser = () => {
                        const gridItems = $('#user-manager-excel-upload-grid').data('kendoCpGrid').dataSource.data();
                        $.ajax({
                            type: METHOD.POST,
                            url: '/base/v1/user-upload',
                            data: JSON.stringify(gridItems),
                            contentType: "application/json; charset=utf-8",
                            success: function () {
                                message.notification({msg: '저장되었습니다.', type: 'info'});
                                $('#user-manager-window').data('kendoWindow').close();
                                $('#user-manager-grid').data('kendoCpGrid').dataSource.read();
                            }
                        });
                    }
                    message.callBackConfirm({msg: '업로드하시겠습니까?', callback: uploadUser});
                }
            });
        },
        windowInitOpen: () => {
            let $div = $('<div id="user-manager-window"></div>');
            $div.kendoWindow({
                width: 1500,
                height: 650,
                position: {
                    top: "15%",
                    left: "5%"
                },
                modal: true,
                visible: false,
                appendTo: $("#program-115").parent(),
                actions: ['Close'],
                draggable: false,
                resizable: false,
                title: '엑셀업로드',
                content: {
                    template: kendo.template($('#user-manager-window-template').html())
                },
                open: () => {
                    userExcelUpload.init();
                },
                close: (e) => {
                    e.sender.destroy();
                }
            }).data('kendoWindow').refresh().open();
        },
        readExcel: () => {
            let input = event.target;
            let reader = new FileReader();
            reader.onload = function () {
                let data = reader.result;
                let workBook = XLSX.read(data, {type: 'binary'});
                workBook.SheetNames.forEach(function (sheetName) {
                    const datas = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                    let excelJsonDatas = [];

                    datas.forEach((data) => {
                        const obj = {};
                        let validCheck = true;
                        let requiredDataCheck = false;
                        for (const key in data) {
                            if (key === '아이디') {
                                obj.userCd = String(data[key]);
                                if (!!obj.userCd) {
                                    requiredDataCheck = true;
                                } else {
                                    validCheck = false;
                                }
                            } else if (key === '이름') {
                                obj.userNm = String(data[key]);
                                if (!!obj.userNm) {
                                    requiredDataCheck = true;
                                } else {
                                    validCheck = false;
                                }
                            } else if (key === '전화번호') {
                                obj.telNo = String(data[key]);
                                if (!!obj.telNo.trim()) {
                                    obj.telNo = obj.telNo.formatterHpNo();
                                    if (obj.telNo.length < 11 || obj.telNo.length > 13) {
                                        validCheck = false;
                                    }
                                }
                            } else if (key === '핸드폰') {
                                obj.hpNo = String(data[key]);
                                if (!!obj.hpNo) {
                                    if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(obj.hpNo) !== true) {
                                        validCheck = false;
                                    }
                                }
                            } else if (key === '이메일') {
                                obj.email = String(data[key]);
                            } else if (key === '부서코드') {
                                obj.deptCd = String(data[key]);
                                if (!!obj.deptCd) {
                                    requiredDataCheck = true;
                                } else {
                                    validCheck = false;
                                }
                            } else if (key === '직위') {
                                obj.duty = String(data[key]);
                            } else if (key === '직책') {
                                obj.positionNm = String(data[key]);
                            } else if (key === '재직여부') {
                                obj.useYnNm = String(data[key]);
                            } else if (key === '입사일자') {
                                obj.enterDt = String(data[key]);
                                if (obj.enterDt.length != 10) {
                                    validCheck = false;
                                }
                            } else if (key === '퇴사일자') {
                                obj.retireDt = String(data[key]);
                                if (obj.retireDt.length != 10) {
                                    validCheck = false;
                                }
                            } else if (key == '담당업무') {
                                obj.description = String(data[key]);
                            }
                        }
                        if (validCheck && requiredDataCheck) excelJsonDatas.push(obj);
                    });
                    $("#user-manager-excel-upload-grid").data("kendoCpGrid").setDataSource([...excelJsonDatas]);
                });
            };
            reader.readAsBinaryString(input.files[0]);
        }
    };

    cpProgress(`${elemPrev}-layout`);
    gridMain.init();
    gridMain.gridSetting().then(()=>{
        gridMain.gridSaearch();
        gridDetail.init();
        cpProgress(`${elemPrev}-layout`, false);
    });

});