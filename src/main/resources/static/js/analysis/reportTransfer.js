$(document).ready(() => {
    let prevData;
    const transferReceipt={
        isSearchBtn : false,
        init :async ()=>{

            $("#transfer-receipt-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "45px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#transfer-receipt-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#transfer-receipt-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#transfer-receipt-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    transferReceipt.isSearchBtn =true;
                    $("#transfer-receipt-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#transfer-receipt-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#transfer-receipt-grid").data("kendoCpGrid").saveAsExcel();
                }
            });

            const userIsReadOnly = userAuthRange("REPORT_TRANSFER_LIST") === AUTH_RANG.NOTHING;
            let userDropDown = new cpUserDropDown("#transfer-receipt-user-list",0, undefined,{clearButton: false, fillMode: 'solid', autoWidth: true}, userIsReadOnly);
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
            new cpDeptDropDownTree('#transfer-receipt-department', {change:deptAutoCompleteEvent,clearButton: false, fillMode: 'solid', autoWidth: true},"REPORT_TRANSFER_LIST",0,IS.TRUE).init();

            const boundTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
            await boundTypeDataSource.read().then(() => {
                $(`#transfer-receipt-callType`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(boundTypeDataSource.data(),true),
                    index: 0,
                    size: 'small'
                });
            });
        },
        gridInit : ()=>{
            const rowTemplateF = (dataItem) =>{
                let deptLegnth = $("#transfer-receipt-grid").data("kendoCpGrid").dataItems().filter(data => data.deptId == dataItem.deptId).length;
                let userLegnth = $("#transfer-receipt-grid").data("kendoCpGrid").dataItems().filter(data => data.transferId == dataItem.transferId).length;
                let returnTable ;
                if(dataItem.transferId == 999999){
                    returnTable = `<tr data-uid=${dataItem.uid} style="background-color: #9fbede30">`;
                }else{
                    returnTable = `<tr data-uid=${dataItem.uid}>`;
                }

                if(prevData === undefined || prevData.deptId != dataItem.deptId){
                    if(dataItem.transferId == 999999){
                        returnTable +=  `
                    <td style="text-align:center" role="gridcell" colspan="2">
                        ${dataItem.deptNm}
                    </td>`
                    }else{
                        returnTable +=  `
                    <td style="text-align:center" role="gridcell" rowspan="${deptLegnth}">
                        ${dataItem.deptNm}
                    </td>`
                    }
                }
                if(dataItem.transferId != 999999){
                    returnTable +=  `
                <td style="text-align:center" role="gridcell" rowspan="${1}">
                    ${dataItem.userNm}
                </td>
                `;
                }
                returnTable += `
                <td style="text-align:center" role="gridcell">
                     ${String(dataItem.transferCnt)}
                </td>
                <td style="text-align:center" role="gridcell">
                    ${String(dataItem.processingCnt)}
                </td>
                <td style="text-align:center" role="gridcell">
                    ${String(dataItem.processCnt)}
                </td>
                <td style="text-align:center" role="gridcell">
                    ${String(dataItem.processAvg)}
                </td>
                <td style="text-align:center" role="gridcell">
                    ${String(dataItem.processMin)}
                </td>
                <td style="text-align:center" role="gridcell">
                    ${String(dataItem.processMax)}
                </td>
            </tr>`;
                prevData = dataItem;
                return returnTable;
            }

            $("#transfer-receipt-grid").kendoCpGrid({
                autoBind : false,
                rowTemplate: rowTemplateF,
                columns: [
                    { field : "deptNm",title:"부서",width:90},
                    { field : "userNm",title:"담당자",width:60,attributes :{style : "text-align:center"}},
                    { field : "transferCnt",title:"이관건수",width:60,attributes :{style : "text-align:center"}},
                    { field : "processingCnt",title:"처리중건수",width:60,attributes :{style : "text-align:center"}},
                    { field : "processCnt",title:"처리완료건수",width:60,attributes :{style : "text-align:center"}},
                    { field : "processAvg",title:"평균처리시간",width:60,attributes :{style : "text-align:center"}},
                    { field : "processMin",title:"최소처리시간",width:60,attributes :{style : "text-align:center"}},
                    { field : "processMax",title:"최대처리시간",width:60,attributes :{style : "text-align:center"}},
                ],
                dataSource: new kendo.data.DataSource({
                    transport : {
                        read : {
                            url : "/analysis/v1/report/transfer",
                            type : "GET",
                            dataType: "json",
                            contentType: 'application/json',
                            complete : (e) =>{
                                if(transferReceipt.isSearchBtn){
                                    transferReceipt.isSearchBtn = false;
                                    message.notification({type:"info"});
                                }
                            }
                        },
                        parameterMap : (options) =>{
                            let auth = userAuthRange("REPORT_TRANSFER_LIST")!== AUTH_RANG.NOTHING ? true : false;
                            return{
                                startDate : kendo.toString($("#transfer-receipt-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                                endDate : kendo.toString($("#transfer-receipt-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                                callCatId : 0,
                                parentId: auth ? $("#transfer-receipt-department").data("kendoDropDownTree").value():0,
                                deptId:auth ? 0:$("#transfer-receipt-department").data("kendoDropDownTree").value(),
                                userId: $("#transfer-receipt-user-list").data("kendoDropDownList").value() == "" ? 0 :$("#transfer-receipt-user-list").data("kendoDropDownList").value() ,
                                boundType : buttonGroupUtils.buttonGroupGetSelectedValue('#transfer-receipt-callType') === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue('#transfer-receipt-callType'),
                            }
                        }
                    },
                    schema: {
                        data : 'data',
                        parse : (res) => {
                            res.data = res.data.sort((a,b) => a.deptId - b.deptId);
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
                    e.workbook.fileName = "업무이관처리현황" +rangedate+ ".xlsx";
                }
            });
        }
    }

    cpProgress("transfer-receipt-layout");
    transferReceipt.init().then(r=>{
        transferReceipt.gridInit();
        cpProgress("transfer-receipt-layout",false);
    });
});