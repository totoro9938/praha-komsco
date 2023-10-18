$(document).ready(function(){

    const elemPrev = 'consultList';
    const userAuthNm = 'CONSULT_CONSULT_LIST';
    const gridDataSourceUrl = '/consult/v1/consultList/consultList-select-page';

    let callChangeDay;
    let consultListSearchParam = {};

    const localStorageGridColumnsNm = 'localStorageConsultListGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;

    const gridMain = {

        gridColumns : [
            { field: "callId", hidden: true },
            { field: "boundId", hidden: true },
            { field: "callDt", title: "상담일시", width: 60, attributes: {class: '!k-text-center'} },
            { field: "boundTelNo", title: "수/발신번호", width: 60, attributes: {class: '!k-text-center'} },
            { field: "callClassNm", title: "상담유형", width: 45, attributes: {class: '!k-text-center'} },
            { field: "fullCallCatNm", title: "상담분류", width: 100, attributes: {style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"} },
            { field: "question", title: "문의내용", width: 150, attributes: {style: "text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"} },
            { field: "callTypeNm", title: "상담결과", width: 45, attributes: {class: '!k-text-center'} },
            { field: "callStatusNm", title: "진행상태", width: 45, attributes: {class: '!k-text-center'} },
            { field: "rgtrNm", title: "상담사", width: 40, attributes: {class: '!k-text-center'} },
            { field: "callTm", title: "통화시간", width: 45, attributes: {class: '!k-text-center'} },
            { field: "boundTypeNm", title: "콜유형", width: 40, attributes: {class: '!k-text-center'} }
        ],
        gridWidth: 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${elemPrev}-grid`,
        searchExpansion : `#${elemPrev}-expansion-panel`,
        gridSplitter : `#${elemPrev}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: true,

        searchDefaultValues: [],

        boundTypeDataSource: [],

        init: () => {

            let call = new cpDataSource(METHOD.GET,"common/v1/config/CallChangeDay").getDataSource();
            call.read().then(function () {
                let data = call.data();
                callChangeDay = data[0].configValue;
            });

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
                    { template: kendo.template($(`#grid-toolbar-template`).html()) }
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
            $(`#${elemPrev}-toollbar-button-excel-down`).kendoButton({
                icon: 'download',
                themeColor: 'success',
                size: 'small',
                click: function(e){
                    cpProgress("consultList-layout");
                    $(`#${elemPrev}-excel-grid`).data('kendoCpGrid').dataSource.read().then(()=>{
                        $(`#${elemPrev}-excel-grid`).data('kendoCpGrid').saveAsExcel({});
                    });
                }
            });

            //엑셀 다운로드용 그리드
            $(`#${elemPrev}-excel-grid`).kendoCpGrid({
                autoBind : false,
                columns: [
                    { field: "callId", hidden: true },
                    { field: "boundId",hidden: true },
                    { field: "custNm", title: "고객명", width: 80 },
                    { field: "telNo", title: "일반전화", width: 110 },
                    { field: "hpNo", title: "휴대폰번호", width: 110 },
                    { field: "callDt", title: "상담일시", width: 130 },
                    { field: "boundTelNo", title: "수/발신번호", width: 110 },
                    { field: "callClassNm", title: "상담유형", width: 60 },
                    { field: "fullCallCatNm", title: "상담분류", width: 300 },
                    { field: "question", title: "문의내용", width: 350 },
                    { field: "answer", title: "답변내용", width: 350 },
                    { field: "callTypeNm", title: "상담결과", width: 80 },
                    { field: "callStatusNm", title: "진행상태", width: 80 },
                    { field: "rgtrNm", title: "상담사", width: 80 },
                    { field: "callTm", title: "통화시간", width: 100 },
                    { field: "boundTypeNm", title: "콜유형", width: 60 }
                ],
                dataSource: gridMain.gridDataSource(),
                pageable: {
                    refresh: true
                },
                excel : {allPages : true},
                excelExport: (e) => {
                    let programId = MENU_ARRAY.find(r => r.roleNm === userAuthNm).programId;
                    let dataCnt = $(gridMain.grid).data('kendoCpGrid').dataSource.total();
                    let description = $(gridMain.searchExpansion).data('kendoExpansionPanel').header.find('.k-expander-title').html();
                    description = description.replace(/(<([^>]+)>)/gi, '');
                    let excelParam = {
                        programId : programId,
                        dataCnt : dataCnt,
                        description : description
                    }
                    new cpDataSource(METHOD.POST,'/log/v1/excel/loginsert', excelParam).getDataSource().read();
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = `상담리스트 ${rangedate}.xlsx`;
                    cpProgress("consultList-layout", false);
                }
            });
        },

        gridSetting: async () => {

            $(`#${elemPrev}-search-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: gridMain.searchStartDate,
                size: 'small'
            });

            $(`#${elemPrev}-search-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: gridMain.searchEndDate,
                size: 'small'
            });


            const userIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;
            const deptIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.AGENT || userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;


            let userDropDown = new cpUserDropDown(`#${elemPrev}-search-user-id`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${elemPrev}-search-user-check"> 퇴사자포함</div>`
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
            new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {change:deptAutoCompleteEvent, fillMode: 'solid', autoWidth: true}, userAuthNm, deptIsReadOnly?USER_INFO.deptId:1, IS.FALSE, IS.TRUE).init();

            const userCkeckEvent =  (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${elemPrev}-search-user-check`).kendoCheckBox({
                change: function(e) {
                    const isChecked = $(`input:checkbox[id=${elemPrev}-search-user-check]`).is(':checked');
                    const param = [
                        {useYn : ["Y"]}
                    ];
                    if(isChecked){
                        param[0] = {useYn : ["Y","N"]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value());
                }
            });

            let callType = new cpCodeDropDownTree(`#${elemPrev}-search-call-type`, 'CallType', {value: "all", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(callType, `#${elemPrev}-search-call-type`,IS.TRUE);

            let callClass= new cpCodeDropDownTree(`#${elemPrev}-search-call-class`, 'CallClass', {value: "all" ,clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(callClass, `#${elemPrev}-search-call-class`,IS.TRUE);

            let callCat  = new cpCatDropDownTree(`#${elemPrev}-search-call-cat`, {value: "all", placeholder: "전체", clearButton: false, fillMode: 'solid', autoWidth: true});
            callCat.create();
            let data = await callCat.getData();
            let allObject = {
                catId: "all",
                catNm: "전체",
                fullCatNm: "전체",
                items: []
            }
            let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject,...data.options.data]});
            $(`#${elemPrev}-search-call-cat`).data("kendoDropDownTree").setDataSource(dataSource);

            gridMain.boundTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
            await gridMain.boundTypeDataSource.read().then(() => {
                $(`#${elemPrev}-search-bound-type`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(gridMain.boundTypeDataSource.data(),true),
                    index: 0,
                    size: 'small'
                });
            });

            let searchType = new cpCodeDropDownTree(`#${elemPrev}-search-type`, 'CallSearchType', {value: "BOUND_TEL_NO", clearButton: false, fillMode: 'solid', autoWidth: true});
            await dropDownTreeUtils.makeDropDownTree(searchType, `#${elemPrev}-search-type`);

            $(`#${elemPrev}-search-txt`).kendoTextBox({
                size: 'small',
                change : (e)=>{
                    let value = e.value;
                    if($(`#${elemPrev}-search-type`).data("kendoDropDownTree").value() === "BOUND_TEL_NO"){
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
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
            gridMain.searchDefaultValues.userId = $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value();
            gridMain.searchDefaultValues.callType = $(`#${elemPrev}-search-call-type`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.callClass = $(`#${elemPrev}-search-call-class`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.callCat = $(`#${elemPrev}-search-call-cat`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.boundType = 0;
            gridMain.searchDefaultValues.type = 'BOUND_TEL_NO';

            $(`#${elemPrev}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function(e){
                    $(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value(gridMain.searchStartDate);
                    $(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value(gridMain.searchEndDate);
                    $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.deptId);
                    $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value(gridMain.searchDefaultValues.userId);
                    $(`#${elemPrev}-search-call-type`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.callType);
                    $(`#${elemPrev}-search-call-class`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.callClass);
                    $(`#${elemPrev}-search-call-cat`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.callCat);
                    $(`#${elemPrev}-search-bound-type`).data('kendoButtonGroup').select(gridMain.searchDefaultValues.boundType);
                    $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.type);
                    $(`#${elemPrev}-search-txt`).data('kendoTextBox').value('');
                    gridMain.isSearchBtn = true;
                    gridMain.gridSaearch();
                }
            });
        },

        updateAuthCheck : (item) =>{
            if(item.adminYn === "Y") {
                return false;
            }else if(item.rgtrId === USER_INFO.userId){
                if(USER_AUTHORITY.find((auth)=> auth.authority === "ROLE_CONSULT_CONSULT_LIST_EXTEND_05")) {
                    return false;
                }else{
                    let setTime = new Date();
                    setTime.setDate(setTime.getDate() - callChangeDay);
                    return setTime > new Date(item.callDt);
                }
            }else {
                return true;
            }
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
                    parameterMap: (options) => {
                        if(gridMain.isSearchBtn){
                            const param = {
                                startDate: kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                endDate: kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),

                                custId: 0,
                                deptId: $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value(),
                                userId: $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value(),
                                callType: $(`#${elemPrev}-search-call-type`).data('kendoDropDownTree').value() === 'all' ? '' : $(`#${elemPrev}-search-call-type`).data('kendoDropDownTree').value(),
                                callClass: $(`#${elemPrev}-search-call-class`).data('kendoDropDownTree').value() === 'all' ? '' : $(`#${elemPrev}-search-call-class`).data('kendoDropDownTree').value(),
                                callCatId: $(`#${elemPrev}-search-call-cat`).data('kendoDropDownTree').value() === 'all' ? 0 : $(`#${elemPrev}-search-call-cat`).data('kendoDropDownTree').value(),
                                boundType: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-bound-type`) === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-bound-type`),
                                searchType: $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(),
                                searchTxt: $(`#${elemPrev}-search-txt`).data('kendoTextBox').value(),
                                callStatus: '',
                                parentId: 0,
                                completeYn: '',
                                sortType: '',
                                page: options.page,
                                totalPage: options.pageSize
                            }
                            consultListSearchParam = {...param};
                            return param;
                        }else{
                            consultListSearchParam.page = options.page;
                            consultListSearchParam.totalPage = options.pageSize;
                            return consultListSearchParam;
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
                            if(row.callDt){
                                row.callDt = kendo.toString(new Date(row.callDt),"yyyy-MM-dd HH:mm");
                            }
                            if(row.processDt){
                                row.processDt = kendo.toString(new Date(row.processDt),"yyyy-MM-dd HH:mm");
                            }else{
                                row.processDt = ""
                            }
                            if(row.processNm == null){
                                row.processNm = ""
                            }
                        })
                        return res;
                    }
                }
            });
        },
        gridSaearch: () => {

            let startDate       = kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let endDate         = kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let deptId                  = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree');
            let userId                  = $(`#${elemPrev}-search-user-id`).data('kendoDropDownList');
            let callType                = $(`#${elemPrev}-search-call-type`).data('kendoDropDownTree');
            let callClass               = $(`#${elemPrev}-search-call-class`).data('kendoDropDownTree');
            let callCatId               = $(`#${elemPrev}-search-call-cat`).data('kendoDropDownTree');
            let searchType              = $(`#${elemPrev}-search-type`).data('kendoDropDownTree');
            let searchTxt               = $(`#${elemPrev}-search-txt`).data('kendoTextBox');

            let searchData = [
                { label: '상담기간', text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: '부서', text: deptId.text(), value: deptId.value() },
                { label: '상담사', text: userId.text(), value: userId.value() },
                { label: '상담결과', text: callType.text(), value: callType.value() },
                { label: '상담분류', text: callClass.text(), value: callClass.value() },
                { label: '상담유형', text: callCatId.text(), value: callCatId.value() },
                { label: '콜유형', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${elemPrev}-search-bound-type`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-bound-type`) },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

            $(gridMain.grid).data('kendoCpGrid').setDataSource(gridMain.gridDataSource());

            gridDetail.detailHide();

        }
    }

    const gridDetail = {

        init : () =>{
            let callClassData = new cpDataSource(METHOD.GET, '/common/v1/code/CallClass').getDataSource();
            callClassData.read().then(function () {
                let treeData = new kendo.data.HierarchicalDataSource({
                    data: callClassData.data()
                });
                let data = {
                    dataSource: treeData,
                    filter: "startswith",
                    fillMode: "flat",
                    messages: {
                        noData: "검색된 내용이 없습니다."
                    },
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    height: 300,
                    clearButton: false,
                }
                $("#consultList-detail-callClass").kendoDropDownTree(data);
            });
            const catSelect = (e) => {
                if (e.sender.dataItem(e.node).hasChildren) {
                    if (e.sender.dataItem(e.node).expanded) {
                        e.preventDefault();
                        e.sender.treeview.collapse(e.node);
                    } else {
                        e.preventDefault();
                        e.sender.treeview.expand(e.node);
                    }
                }
            };
            new cpCatDropDownTree('#consultList-detail-callCat',{select: catSelect}).init();
            $("#consultList-detail-callCat").data("kendoDropDownTree");
            $("#consultList-detail-callDt").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-boundTelNo").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-hpNo").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-telNo").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-boundType").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-callTm").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-callType").kendoTextBox({fillMode:"flat",readonly:true});
            $("#consultList-detail-question").kendoTextArea({rows: 3});
            $("#consultList-detail-answer").kendoTextArea({rows: 3});
            $("#consultList-detail-memo").kendoTextArea({rows: 3});

            $('#consultList-sendCall').on('click', (e) => {
                let telNo = $("#consultList-detail-boundTelNo").val();
                ctiBtnAct.outBoundSendTel(telNo);
            });
            $('#consultList-sendCall-hpNo').on('click', (e) => {
                let telNo = $("#consultList-detail-hpNo").val();
                ctiBtnAct.outBoundSendTel(telNo);
            });
            $('#consultList-sendCall-telNo').on('click', (e) => {
                let telNo = $("#consultList-detail-telNo").val();
                ctiBtnAct.outBoundSendTel(telNo);
            });

            $('#consultList-main-set-btn').kendoButton({
                click: () => {
                    ctiBtnAct.isOpenMainConsult();
                    setTimeout( ()=>{
                        gridDetail.consultListSetCustInfo();
                    },1500)
                }
            });

            $("#consultList-detail-update").kendoButton({
                themeColor: 'primary',
                click: () => {
                    let valid = $("#consultList-detail-form").kendoValidator({
                        errorTemplate : (e)=>{
                            if(e.field === "callCatId"){
                                if(e.message !== ""){
                                    return '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 0% 0% 20%;">' +
                                        e.message + '<div class="k-callout c-k-callout-n"></div></div>';
                                }
                            }
                        },
                        rules:{
                            required : (input)=>{
                                if(input.is("[name=callClass]")) return input.data("kendoDropDownTree").value() !== "" ;
                                else if(input.is("[name=callCatId]")) return input.data("kendoDropDownTree").value() !== "";
                                else if(input.is("[name=question]")) return input.val() !== "";
                                else if(input.is("[name=answer]")) return input.val() !== "";
                                return true;
                            },
                            callCat : (input) =>{
                                if(input.is("[name=callCatId]")){
                                    if(input.data("kendoDropDownTree").value() !== ""){
                                        let dropTree =input.data("kendoDropDownTree");
                                        let selectItem = dropTree.treeview.select();
                                        return !dropTree.dataItem(selectItem).hasChildren;
                                    }else return false
                                }
                                return true;
                            }
                        },
                        messages:{
                            required : ()=>{
                                return "";
                            },
                            callCat : (input) =>{
                                if(input.is("[name=callCatId]")){
                                    if(input.data("kendoDropDownTree").value() !== ""){
                                        return "상담분류를 마지막 단계까지 선택해 주세요."
                                    }
                                }
                            }
                        }
                    }).data("kendoValidator");
                    if(valid.validate()){
                        cpProgress("consultList-detail");
                        message.callBackConfirm({msg: '수정하시겠습니까?',
                            callback: gridDetail.consultListDetailUpdate,
                            cancel : ()=>{
                                cpProgress("consultList-detail",false);
                            }
                        });
                    }
                }
            });
        },
        consultListDetailSet : (item,updateAuth) =>{
            gridDetail.consultListDetailsetReadonly(updateAuth);
            $("#consultList-detail-boundId").val(item.boundId);
            $("#consultList-detail-callId").val(item.callId);
            $("#consultList-detail-custId").val(item.custId);
            $("#consultList-detail-callDt").data("kendoTextBox").value(item.callDt);
            $("#consultList-detail-boundType").data("kendoTextBox").value(item.boundTypeNm);
            $("#consultList-detail-boundTelNo").data("kendoTextBox").value(item.boundTelNo.formatterHpNo());
            $("#consultList-detail-hpNo").data("kendoTextBox").value(item.custHpNo.formatterHpNo());
            $("#consultList-detail-telNo").data("kendoTextBox").value(item.custTelNo.formatterHpNo());
            $("#consultList-detail-callTm").data("kendoTextBox").value(item.closeCallTm);
            if(item.boundTelNo === "") $("#consultList-sendCall").hide();
            else $("#consultList-sendCall").show();
            if(item.custHpNo === "") $("#consultList-sendCall-hpNo").hide();
            else $("#consultList-sendCall-hpNo").show();
            if(item.custTelNo === "") $("#consultList-sendCall-telNo").hide();
            else $("#consultList-sendCall-telNo").show();
            if(item.closeCallTm === "00:00:00") $("#consultList-recodeListen").hide();
            else gridDetail.consultListRecSet(item);
            $("#consultList-detail-callClass").data("kendoDropDownTree").value(item.callClass);
            $("#consultList-detail-callCat").data("kendoDropDownTree").value(item.callCatId);
            $("#consultList-detail-question").val(item.question);
            $("#consultList-detail-answer").val(item.answer);
            $("#consultList-detail-memo").val(item.memo);
            $("#consultList-detail-callType").data("kendoTextBox").value(item.callTypeNm);
            let returnText = "";
            if(item.callType === "Reservation"){
                returnText = item.reservationDt
                returnText += item.reservationChargeNm ?" / "+item.reservationChargeNm : "";
                returnText += item.reservationTelNo? " / "+item.reservationTelNo.formatterHpNo() :"";
                $("#consultList-detail-textField").html(returnText);
            }else if(item.callType ==="EmpTransfer"){
                returnText = item.transferDt +" / "+item.transferFullDeptNm + " / "+item.transferNm;
                $("#consultList-detail-textField").html(returnText);
            }
        },
        consultListDetailClear : ()=>{
            $("#consultList-detail-boundId").val(0);
            $("#consultList-detail-callId").val(0);
            $("#consultList-detail-callDt").val("");
            $("#consultList-detail-boundType").html("");
            $("#consultList-detail-boundTelNo").html("");
            $("#consultList-detail-hpNo").html("");
            $("#consultList-detail-telNo").html("");
            $("#consultList-detail-callTm").html("");
            $("#consultList-sendCall").hide();
            $("#consultList-sendCall-hpNo").hide();
            $("#consultList-sendCall-telNo").hide();
            $("#consultList-recodeListen").hide();
            $("#consultList-detail-callClass").data("kendoDropDownTree").value("");
            $("#consultList-detail-callCat").data("kendoDropDownTree").value("");
            $("#consultList-detail-question").val("");
            $("#consultList-detail-answer").val("");
            $("#consultList-detail-memo").val("");
            $("#consultList-detail-callType").html("");
            $("#consultList-detail-textField").html("");
            if($("#consultList-detail-form").data("kendoValidator") !== undefined) $("#consultList-detail-form").data("kendoValidator").reset();
        },
        consultListRecSet : (data) =>{
            let auth = USER_AUTHORITY.filter(auth => auth.authority.includes("ROLE_CONSULT_CONSULT_LIST_EXTEND_03"));
            if(data.recordingId !==""){
                if(data.rgtrId === USER_INFO.userId || auth.length>0){
                    $("#consultList-recodeListen").show();
                    $('#consultList-recodeListen').unbind("click");
                    $('#consultList-recodeListen').bind('click', () => {
                        let url =`http://${recIp}:8080/BT-VELOCE/recording/STTPlayCF.do?`;
                        url +=`tenant_id=${tenantName}`;
                        url +=`&ip=${recIp}`;
                        url +=`&port=${recPort}`;
                        url +=`&manager_id=managerId`;
                        url +=`&dn_no=`;
                        url +=`&call_id=${data.recordingId}`;
                        url +=`&rec_time=${kendo.toString(new Date(data.ctiCallTm), 'yyyy-MM-dd HH:mm:ss')}`;
                        url +=`&AutoPlay=0&app_use=1`;
                        let width = 595;
                        let height = 135;
                        let left = parseInt((screen.availWidth - width) / 2, 10) - 10;
                        let topP = parseInt((screen.availHeight - height) / 2, 10) - 20;
                        let opt = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + topP;
                        opt += ",toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes";
                        window.open(url, "consultRecRead"+data.recordingId, opt);
                    });
                }else{
                    $("#consultList-recodeListen").hide();
                }
            }else{
                $("#consultList-recodeListen").hide();
            }
        },
        consultListDetailsetReadonly : (auth)=>{
            $("#consultList-detail-callClass").data("kendoDropDownTree").readonly(auth);
            $("#consultList-detail-callCat").data("kendoDropDownTree").readonly(auth);
            let callClassArrow = $("#consultList-detail-callClass").data("kendoDropDownTree")._arrow;
            let callCatArrow =$("#consultList-detail-callCat").data("kendoDropDownTree")._arrow;
            $("#consultList-detail-question").data("kendoTextArea").readonly(auth);
            $("#consultList-detail-answer").data("kendoTextArea").readonly(auth);
            $("#consultList-detail-memo").data("kendoTextArea").readonly(auth);
            $("#consultList-detail-question").data("kendoTextArea").readonly(auth);
            $("#consultList-detail-answer").data("kendoTextArea").readonly(auth);
            $("#consultList-detail-memo").data("kendoTextArea").readonly(auth);
            if(auth){
                $("#consultList-detail-question").data("kendoTextArea").setOptions({fillMode:"flat"});
                $("#consultList-detail-answer").data("kendoTextArea").setOptions({fillMode:"flat"});
                $("#consultList-detail-memo").data("kendoTextArea").setOptions({fillMode:"flat"});
                $("#consultList-detail-update").hide();
                callClassArrow.addClass('hidden');
                callCatArrow.addClass('hidden');
            }else{
                $("#consultList-detail-question").data("kendoTextArea").setOptions({fillMode:"solid",readonly:false});
                $("#consultList-detail-answer").data("kendoTextArea").setOptions({fillMode:"solid",readonly:false});
                $("#consultList-detail-memo").data("kendoTextArea").setOptions({fillMode:"solid",readonly:false});
                $("#consultList-detail-update").show();
                callClassArrow.removeClass('hidden');
                callCatArrow.removeClass('hidden');
            }
        },
        consultListDetailUpdate : ()=>{
            let param = $("#consultList-detail-form").serializeJSON();
            param.callCatId = $("#consultList-detail-callCat").data("kendoDropDownTree").value();
            param.callClass = $("#consultList-detail-callClass").data("kendoDropDownTree").value();
            console.log(param);
            let callUpdate = new cpDataSource(METHOD.PUT,"/consult/v1/consultList/call-update",param).getDataSource();
            callUpdate.read().then(()=>{
                message.notification({msg:"저장되었습니다.",type:"success"});
                cpProgress("consultList-detail",false);
                $('#consultList-grid').data('kendoCpGrid').dataSource.read();
            });
        },
        consultListSetCustInfo : ()=>{
            let custId = $("#consultList-detail-custId").val();
            if(!!custId){
                consultCustomerInfo.customerFindCustId(custId);
            }
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

            const skeleton = $('#consultList-detail-form dd');
            skeletonClass(skeleton);
            const grid = $(gridMain.grid).data('kendoCpGrid');
            let item = grid.dataItem(grid.select());
            let getCallItem = new cpDataSource(METHOD.GET, '/consult/v1/list/item/'+item.callUuid).getDataSource();
            getCallItem.read().then(() => {
                skeletonClass(skeleton,false);
                let data = getCallItem.data();
                let item = data[0];
                if(item.callDt) {
                    item.ctiCallTm =item.callDt;
                    item.callDt = kendo.toString(new Date(item.callDt), "yyyy-MM-dd HH:mm");
                };
                if(item.reservationDt)item.reservationDt = kendo.toString(new Date(item.reservationDt),"yyyy-MM-dd HH:mm");
                if(item.transferDt)item.transferDt = kendo.toString(new Date(item.transferDt),"yyyy-MM-dd HH:mm");
                if(item.closeCallTm !== "00:00:00")item.closeCallTm = item.closeCallTm.substring(0, 8);

                let updateAuth = gridMain.updateAuthCheck(item);
                gridDetail.consultListDetailClear();
                gridDetail.consultListDetailSet(item,updateAuth);
            });

        },
        detailHide: () => {

            const splitter = $(gridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');

        },
        consultListSetCustInfo : ()=>{
            let custId = $(`#${elemPrev}-detail-custId`).val();
            if(!!custId){
                consultCustomerInfo.customerFindCustId(custId);
            }
        }

    }


    cpProgress(`${elemPrev}-layout`);
    gridMain.init();
    gridMain.gridSetting().then(()=>{
        gridMain.gridSaearch();
        gridDetail.init();
        cpProgress(`${elemPrev}-layout`, false);
    });

});