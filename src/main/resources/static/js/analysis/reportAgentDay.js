$(document).ready(() => {
    let prevData;
    const userPerDay={
        isSearchBtn : false,
        init :async ()=>{

            $("#agent-day-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "46px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#agent-day-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#agent-day-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#agent-day-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    userPerDay.isSearchBtn =true;
                    $("#agent-day-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#agent-day-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#agent-day-grid").data("kendoCpGrid").saveAsExcel();
                }
            });

            const userIsReadOnly = userAuthRange("REPORT_RECEIPT_LIST_AGENT_DAY") === AUTH_RANG.NOTHING;
            let userDropDown = new cpUserDropDown("#agent-day-user-list",USER_INFO.deptId, undefined,{clearButton: false, fillMode: 'solid', autoWidth: true}, userIsReadOnly);
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
            new cpDeptDropDownTree('#agent-day-department', {change:deptAutoCompleteEvent,clearButton: false, fillMode: 'solid', autoWidth: true},"REPORT_RECEIPT_LIST_AGENT_DAY",USER_INFO.deptId,IS.FALSE,IS.TRUE).init();

            const boundTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
            await boundTypeDataSource.read().then(() => {
                $(`#agent-day-callType`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(boundTypeDataSource.data(),true),
                    index: 0,
                    size: 'small'
                });
            });
        },
        gridInit : ()=>{
            const rowTemplateF = (dataItem) =>{
                let deptLegnth = $("#agent-day-grid").data("kendoCpGrid").dataItems().filter(data => data.deptId == dataItem.deptId).length;
                let userLegnth = $("#agent-day-grid").data("kendoCpGrid").dataItems().filter(data => data.userId == dataItem.userId).length;
                let returnTable ;
                if(dataItem.regYmd=="상담사계" || dataItem.regYmd =="계"){
                    returnTable = `<tr data-uid=${dataItem.uid} style="background-color: #9fbede30">`;
                }else{
                    returnTable = `<tr data-uid=${dataItem.uid}>`;
                }

                if(prevData === undefined || prevData.deptId != dataItem.deptId){
                    returnTable +=  `
                        <td style="text-align:center" role="gridcell" rowspan="${deptLegnth}">
                            ${dataItem.deptNm}
                        </td>`
                }
                if(prevData === undefined || prevData.userId != dataItem.userId){
                    returnTable +=  `
                        <td style="text-align:center" role="gridcell" rowspan="${userLegnth}">
                            ${dataItem.userNm}
                        </td>
                        `;
                }
                returnTable += `<td style="text-align:center" role="gridcell">
                        ${dataItem.regYmd}
                    </td>
                    <td style="text-align:center" role="gridcell">
                         ${String(dataItem.defaultCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.reservationCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.empTransferCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callTransferCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callTotalCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.ibCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.obCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.boundCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.rvCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callbackCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.campaignCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>`;
                prevData = dataItem;
                return returnTable;
            }

            $("#agent-day-grid").kendoCpGrid({
                autoBind : false,
                rowTemplate: rowTemplateF,
                columns: [
                    { field : "deptNm",title:"부서",width:60},
                    { field : "userNm",title:"상담사",width:60,attributes :{style : "text-align:center"}},
                    { field : "regYmd",title:"일자",width:100,attributes :{style : "text-align:center"}},
                    {
                        title:"전화접수",
                        columns:[
                            {field: "defaultCnt",title: "상담완료",width: 60,attributes :{style : "text-align:center"}},
                            {field: "reservationCnt",title: "예약상담",width:60,attributes :{style : "text-align:center"}},
                            {field: "empTransferCnt",title: "업무이관",width:60,attributes :{style : "text-align:center"}},
                            {field: "callTransferCnt",title: "호전환",width:60,attributes :{style : "text-align:center"}},
                            {field: "callTotalCnt",title: "계",width:60,attributes :{style : "text-align:center"}}
                        ]
                    },
                    {
                        title:"콜유형",
                        columns:[
                            {field: "ibCnt",title: "I/B",width: 60,attributes :{style : "text-align:center"}},
                            {field: "obCnt",title: "O/B",width:60,attributes :{style : "text-align:center"}},
                            {field: "boundCnt",title: "계",width:60,attributes :{style : "text-align:center"}}
                        ]
                    },
                    { field : "rvCnt",title:"문자상담",width:60,attributes :{style : "text-align:center"}},
                    { field : "callbackCnt",title:"콜백",width:60,attributes :{style : "text-align:center"}},
                    { field : "campaignCnt",title:"해피콜",width:60,attributes :{style : "text-align:center"}}
                ],
                dataSource: new kendo.data.DataSource({
                    transport : {
                        read : {
                            url : "/analysis/v1/report/agent-day",
                            type : "GET",
                            dataType: "json",
                            contentType: 'application/json',
                            complete : () =>{
                                if(userPerDay.isSearchBtn){
                                    userPerDay.isSearchBtn = false;
                                    message.notification({type:"info"});
                                }
                            }
                        },
                        parameterMap : (options) =>{
                            let auth = userAuthRange("REPORT_RECEIPT_LIST_AGENT_DAY")!== AUTH_RANG.NOTHING ? true : false;
                            return{
                                startDate : kendo.toString($("#agent-day-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                                endDate : kendo.toString($("#agent-day-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                                parentId: auth ? $("#agent-day-department").data("kendoDropDownTree").value():0,
                                deptId: auth ? 0:$("#agent-day-department").data("kendoDropDownTree").value(),
                                userId: $("#agent-day-user-list").data("kendoDropDownList").value() == "" ? 0 :$("#agent-day-user-list").data("kendoDropDownList").value() ,
                                boundType : buttonGroupUtils.buttonGroupGetSelectedValue('#agent-day-callType') === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue('#agent-day-callType'),
                                sortType : ""
                            }
                        }
                    },
                    schema: {
                        data : 'data',
                        parse : (res) => {
                            res.data.forEach((item,i)=> {
                                if(item.regYmd !== null){
                                    item.regYmd = item.regYmd.substring(0,4) + "-" + item.regYmd.substring(4,6) + "-" + item.regYmd.substring(6,8);
                                }

                                if (item.userId === null && item.regYmd === null) {
                                    res.data.splice(i, 1);
                                }else if (item.userId == 0 && item.regYmd === null) {
                                    item.regYmd = "계";
                                }else if (item.regYmd === null) {
                                    item.regYmd = "상담사계";
                                }
                            })
                            return res;
                        }
                    }
                }),
                height: '100%',
                resizable: false,
                dataBound : () =>{
                    prevData = undefined;
                },
                excelExport: (e) => {
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "상담사별접수현황(일별) " +rangedate+ ".xlsx";
                }
            });
        }
    }

    cpProgress("agent-day-layout");
    userPerDay.init().then(r=>{
        userPerDay.gridInit();
        cpProgress("agent-day-layout",false);
    });
});