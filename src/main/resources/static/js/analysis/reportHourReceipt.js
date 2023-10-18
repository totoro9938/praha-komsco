$(document).ready(() => {
    let prevData;
    const hourPerReceipt={
        isSearchBtn : false,
        init :async ()=>{

            $("#hour-receipt-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "45px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#hour-receipt-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#hour-receipt-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#hour-receipt-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    hourPerReceipt.isSearchBtn =true;
                    $("#hour-receipt-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#hour-receipt-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#hour-receipt-grid").data("kendoCpGrid").saveAsExcel();
                }
            });

            const userIsReadOnly = userAuthRange("REPORT_RECEIPT_LIST_HOUR") === AUTH_RANG.NOTHING;
            let userDropDown = new cpUserDropDown("#hour-receipt-user-list",USER_INFO.deptId, undefined,{clearButton: false, fillMode: 'solid', autoWidth: true}, userIsReadOnly);
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(()=>{
                userDropDown.setEnable(userIsReadOnly);
            });

            let callClassCallCat  = new cpCatDropDownTree('#hour-receipt-callcat',{value:"0",placeholder:"전체", fillMode: 'solid', autoWidth: true});
            callClassCallCat.create();
            let callCatData = await callClassCallCat.getData();
            let allObject = {
                catId: "0",
                catNm: "전체",
                fullCatNm: "전체",
                items: []
            }
            let callCatDataSource = new kendo.data.HierarchicalDataSource({data: [allObject,...callCatData.options.data]});
            $("#hour-receipt-callcat").data("kendoDropDownTree").setDataSource(callCatDataSource);

            const deptAutoCompleteEvent =  (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            new cpDeptDropDownTree('#hour-receipt-department', {change:deptAutoCompleteEvent,clearButton: false, fillMode: 'solid', autoWidth: true},"REPORT_RECEIPT_LIST_HOUR",USER_INFO.deptId,IS.FALSE,IS.TRUE).init();

            const boundTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
            await boundTypeDataSource.read().then(() => {
                $(`#hour-receipt-callType`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(boundTypeDataSource.data(),true),
                    index: 0,
                    size: 'small'
                });
            });
        },
        gridInit : ()=>{
            const rowTemplateF = (dataItem) =>{
                let deptLegnth = $("#hour-receipt-grid").data("kendoCpGrid").dataItems().filter(data => data.deptId == dataItem.deptId).length;
                let userLegnth = $("#hour-receipt-grid").data("kendoCpGrid").dataItems().filter(data => data.rgtrId == dataItem.rgtrId).length;
                let returnTable ;
                if(dataItem.callYmd==""){
                    returnTable = `<tr data-uid=${dataItem.uid} style="background-color: #9fbede30">`;
                }else{
                    returnTable = `<tr data-uid=${dataItem.uid}>`;
                }

                if(prevData === undefined || prevData.deptId != dataItem.deptId){
                    if(dataItem.deptId == 999999){
                        returnTable +=  `
                        <td style="text-align:center" role="gridcell" colspan="3">
                            ${dataItem.deptNm}
                        </td>`
                    }else{
                        returnTable +=  `
                        <td style="text-align:center" role="gridcell" rowspan="${deptLegnth}">
                            ${dataItem.deptNm}
                        </td>`
                    }
                }
                if(prevData === undefined || prevData.rgtrId != dataItem.rgtrId){
                    if(dataItem.deptId != 999999){
                        returnTable +=  `
                        <td style="text-align:center" role="gridcell" rowspan="${userLegnth}">
                            ${dataItem.userNm}
                        </td>
                        `;
                    }
                }
                if(dataItem.deptId != 999999){
                    returnTable +=  `
                    <td style="text-align:center" role="gridcell">
                        ${dataItem.callYmd}
                    </td>`
                }
                returnTable += `
                    <td style="text-align:center" role="gridcell">
                         ${String(dataItem.t_08)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_09)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_10)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_11)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_12)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_13)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_14)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_15)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_16)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_17)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_18)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.t_19)}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.totalCnt)}
                    </td>
                </tr>`;
                prevData = dataItem;
                return returnTable;
            }

            $("#hour-receipt-grid").kendoCpGrid({
                autoBind : false,
                rowTemplate: rowTemplateF,
                columns: [
                    { field : "deptNm",title:"부서",width:60},
                    { field : "userNm",title:"상담사",width:60,attributes :{style : "text-align:center"}},
                    { field : "callYmd",title:"일자",width:60,attributes :{style : "text-align:center"}},
                    { field : "t_08",title:"08시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_09",title:"09시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_10",title:"10시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_11",title:"11시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_12",title:"12시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_13",title:"13시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_14",title:"14시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_15",title:"15시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_16",title:"16시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_17",title:"17시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_18",title:"18시",width:30,attributes :{style : "text-align:center"}},
                    { field : "t_19",title:"19시",width:30,attributes :{style : "text-align:center"}},
                    { field : "totalCnt",title:"계",width:30,attributes :{style : "text-align:center"}}
                ],
                dataSource: new kendo.data.DataSource({
                    transport : {
                        read : {
                            url : "/analysis/v1/report/hour-receipt",
                            type : "GET",
                            dataType: "json",
                            contentType: 'application/json',
                            complete : (e) =>{
                                if(hourPerReceipt.isSearchBtn){
                                    hourPerReceipt.isSearchBtn = false;
                                    message.notification({type:"info"});
                                }
                            }
                        },
                        parameterMap : (options) =>{
                            let auth = userAuthRange("REPORT_RECEIPT_LIST_HOUR")!== AUTH_RANG.NOTHING ? true : false;
                            return{
                                startDate : kendo.toString($("#hour-receipt-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                                endDate : kendo.toString($("#hour-receipt-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                                callCatId : $("#hour-receipt-callcat").data("kendoDropDownTree").value(),
                                parentId: auth ? $("#hour-receipt-department").data("kendoDropDownTree").value():0,
                                deptId:auth ? 0:$("#hour-receipt-department").data("kendoDropDownTree").value(),
                                userId: $("#hour-receipt-user-list").data("kendoDropDownList").value() == "" ? 0 :$("#hour-receipt-user-list").data("kendoDropDownList").value() ,
                                boundType : buttonGroupUtils.buttonGroupGetSelectedValue('#hour-receipt-callType') === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue('#hour-receipt-callType'),
                            }
                        }
                    },
                    schema: {
                        data : 'data',
                        parse : (res) => {
                            res.data.forEach((item,i)=> {
                                if(item.callYmd !== ""){
                                    item.callYmd = item.callYmd.substring(0,4) + "-" + item.callYmd.substring(4,6) + "-" + item.callYmd.substring(6,8);
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
                    e.workbook.fileName = "시간대별접수현황" +rangedate+ ".xlsx";
                }
            });
        }
    }
    cpProgress("hour-receipt-layout");
    hourPerReceipt.init().then(r=>{
        hourPerReceipt.gridInit();
        cpProgress("hour-receipt-layout",false);
    });
});