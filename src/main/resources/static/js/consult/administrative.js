const waterSupplyUrl = "/consult/v1/water-supply/api";
const waterSupplyDetailUrl = "/consult/v1/water-supply/detail/api";
const localTaxNonPaymentUrl = "/consult/v1/local-tax/non-payment/api";
const localTaxPaymentUrl = "/consult/v1/local-tax/payment/api";
const nonTaxNonPaymentUrl = "/consult/v1/non-tax/non-payment/api";
const nonTaxPaymentUrl = "/consult/v1/non-tax/payment/api";
const environmentNonPaymentUrl = "/consult/v1/environment/non-payment/api";
const environmentPaymentUrl = "/consult/v1/environment/payment/api";
const parkingNonPaymentUrl = "/consult/v1/parking/non-payment/api";
const parkingPaymentUrl = "/consult/v1/parking/payment/api";
const privateLogInsertUrl = "/log/v1/private/loginsert";
const PARAM_0 = 60; //행망서버 유지시간(60초)
const PARAM_NAPBU_MONTH = 60; //납부개월수(60개월)
const WATER_BASE_DATE = 12; //상하수도 기준년월(12개월)


const administrative = {
    init : async () => {
        $("#administ-tab-strip").kendoTabStrip({
            animation: { open: { effects: "fadeIn" } },
            select : (e) => {
                if(!!$("#administ-reg-no").val() && !!$("#administ-search-tpye").val()){
                    //다른 탭에서 주민번호로 조회했을 경우
                    const selectTabValue = $(e.item).find(".administ-tab-strip-value-class").attr("value");

                    if(selectTabValue === "1"){
                        if($("#local-tax").children(".k-loading-mask").length === 0){
                            $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").value($("#administ-search-tpye").val());
                            $("#local-tax-search-btn").trigger("click");
                        }
                    }else if(selectTabValue === "2"){
                        if($("#non-tax").children(".k-loading-mask").length === 0){
                            $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").value($("#administ-search-tpye").val());
                            $("#non-tax-search-btn").trigger("click");
                        }
                    }else if(selectTabValue === "3"){
                        if($("#environment").children(".k-loading-mask").length === 0){
                            $("#environment-search-condition-drop-down-list").data("kendoDropDownList").value($("#administ-search-tpye").val());
                            $("#environment-search-btn").trigger("click");
                        }
                    }else if(selectTabValue === "4"){
                        if($("#parking").children(".k-loading-mask").length === 0){
                            $("#parking-search-condition-drop-down-list").data("kendoDropDownList").value($("#administ-search-tpye").val());
                            $("#parking-search-btn").trigger("click");
                        }
                    }
                }
            },
        });

        if(!!$("#administ-sms-from-tel-no").val() === false){
            //발신번호 세팅
            let call = new cpDataSource(METHOD.GET,"common/v1/config/CompanySmsTelNo").getDataSource();
            call.read().then(function () {
                let data = call.data();
                $("#administ-sms-from-tel-no").val(data[0].configValue);
            });
        }

        waterSupplySetting.widgetSetting();
        waterSupplySetting.fareGrid();
        waterSupplySetting.numberGrid();

        administSmsSetting.smsWindowPopupSetting();

        localTaxSetting.widgetSetting();
        localTaxSetting.nonPayGrid();
        localTaxSetting.payGrid();

        nonTaxSetting.widgetSetting();
        nonTaxSetting.nonPayGrid();
        nonTaxSetting.payGrid();

        environmentSetting.widgetSetting();
        environmentSetting.nonPayGrid();
        environmentSetting.payGrid();

        parkingSetting.widgetSetting();
        parkingSetting.nonPayGrid();
        parkingSetting.payGrid();

        administCode.smsBaseTextSetting();
    }
}

const waterSupplySetting = {
    waterNumberCheckedItems : [],
    smsText : "",
    widgetSetting : () => {
        $("#water-supply-fare-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#water-supply-fare-search-btn").trigger("click");
            }
        });

        $("#water-supply-fare-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {
                const grid = $("#water-supply-fare-grid").data("kendoCpGrid");
                if(!!$("#water-supply-fare-search-text").data("kendoTextBox").value().trim()){
                    if(grid){
                        cpProgress('water-supply');
                        grid.setDataSource(waterSupplySetting.fareSetDataSource());
                    }
                }else{
                    message.notification({msg : "검색어는 필수입니다.", type : "error"});
                }
            },
        });

        $("#water-supply-number-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#water-supply-number-search-btn").trigger("click");
            }
        });

        $("#water-supply-number-month").kendoDatePicker({
            start: "year",
            depth: "year",
            format: "yyyy년 MMMM",
            culture: "ko-KR",
            dateInput: true,
            value : new Date(),
            size: 'small'
        });

        $("#water-supply-number-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {

                const grid = $("#water-supply-number-grid").data("kendoCpGrid");
                if(!!$("#water-supply-number-search-text").data("kendoTextBox").value().trim()){
                    if(grid){
                        cpProgress('water-supply');
                        grid.setDataSource(waterSupplySetting.numberSetDataSource());
                        $("#water-supply-number-checked-total-samt").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-hamt").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-tamt").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-ichehal").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-inamt").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-gaamt").data("kendoTextBox").value("0원");
                        $("#water-supply-number-checked-total-afamt").data("kendoTextBox").value("0원");
                    }
                }else{
                    message.notification({msg : "검색어는 필수입니다.", type : "error"});
                }

            },
        });

        $("#water-supply-number-total-samt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-hamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-tamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-ichehal").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-inamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-gaamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#water-supply-number-total-afamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });



        $("#water-supply-number-checked-total-samt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-hamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-tamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-ichehal").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-inamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-gaamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-number-checked-total-afamt").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#water-supply-customer-info-bank-number").kendoTextBox({
            size:"small",
            readonly : true,
        });


        $("#water-supply-customer-info-bank-drop-down-list").kendoDropDownList({
            dataSource: [],
            dataTextField: "bank",
            dataValueField: "bankNumber",
            fillMode: "solid",
            enable : false,
            width:"85%",
            size:"small",
            optionLabel: {bank: '가상계좌', bankNumber: ""},
            change : (e) => {
                $("#water-supply-customer-info-bank-number").data("kendoTextBox").value(e.sender.value());
            },
        });

        $("#water-supply-customer-info-suynm").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-suyad").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-ercNo").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-junja").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-sastop").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-inamt").kendoTextBox({
            size:"small",
            readonly : true,
        });
        $("#water-supply-customer-info-afamt").kendoTextBox({
            size:"small",
            readonly : true,
        });

        $("#water-supply-sms-btn").kendoButton({
            themeColor : "primary",
            size : "small",
            click : () => {
                const bank = $("#water-supply-customer-info-bank-drop-down-list").data("kendoDropDownList").text();
                const bankNumber = $("#water-supply-customer-info-bank-number").data("kendoTextBox").value();
                 if(!!bank && !!bankNumber){
                    const napgiBef = $("#water-supply-number-checked-total-inamt").data("kendoTextBox").value();
                    const napgiAft = $("#water-supply-number-checked-total-afamt").data("kendoTextBox").value();
                    const text = bank + " : " + bankNumber + "\n" + "납기내 : " + napgiBef + "\n" + "납기후 : " + napgiAft;
                    waterSupplySetting.smsText = administCode.SMS_BASE_TEXT["WATER_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["WATER_SMS_BOTTOM_TEXT"];
                    $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                    $("#administ-sms-send-content").data("kendoTextArea").value(waterSupplySetting.smsText);
                    $("#administ-sms-send-content").trigger("keyup");
                    administSmsSetting.smsPhoneNumberSetting();
                }else{
                    message.notification({msg: "가상계좌가 존재하지 않습니다.", type:"error"});
                }
            },
        });
    },

    fareGrid : () => {
        $("#water-supply-fare-grid").kendoCpGrid({
            columns: [
                {
                    field: "no",
                    title:"번호",
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "suyno",
                    title: "수용가번호",
                    attributes: {style: 'text-align:center'},
                    width: 200,
                    template: function (dataItem) {
                        return`<span>${dataItem.suyno}</span>`;
                    }
                },
                {
                    field: "suynm",
                    title: "수용가명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                },
                {
                    field: "suyad",
                    title: "수용가주소",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                }
            ],
            dataSource: [],
            change: (e) => {
                const cell = e.sender.select();
                const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                $("#water-supply-number-search-text").data("kendoTextBox").value(selectRows.suyno);
                $("#water-supply-number-search-btn").trigger("click");
            },
            height: "92%",
            resizable: false,
            selectable: "single"
        });
    },

    fareSetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: waterSupplyUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "명 또는 주소 : ",
                            description : "상하수도 요금 수용가 조회",
                        }
                        logParam.dataGb = logParam.dataGb + $("#water-supply-fare-search-text").data("kendoTextBox").value();

                        if(!!$("#water-supply-fare-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param1 : $("#water-supply-fare-search-text").data("kendoTextBox").value().trim(),
                        requiredUrlIndex : 0,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    no : {type : 'number'},
                    suyad : {type : 'string'},
                    suynm : {type : 'string'},
                    suyno : {type : 'string'}
                },
                parse : (res) => {
                    for(let i = 0; i < res.data.rows.length; i++){
                        //번호 setting
                        res.data.rows[i].no = i+1;
                    }
                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('water-supply', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },

    numberGrid : () => {
        $("#water-supply-number-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='water-supply-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md water-supply-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "nabgi",
                    title: "고지년월",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "jicim",
                    title: "당월지침",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "use",
                    title: "사용량",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "samt",
                    title: "상수도",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.samt)}</span>`;
                    }
                },
                {
                    field: "hamt",
                    title: "하수도",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.hamt)}</span>`;
                    }
                },
                {
                    field: "tamt",
                    title: "계",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.tamt)}</span>`;
                    }
                },
                {
                    field: "ichehal",
                    title: "이체할인액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.ichehal)}</span>`;
                    }
                },
                {
                    field: "inamt",
                    title: "납기내금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.inamt)}</span>`;
                    }
                },
                {
                    field: "gaamt",
                    title: "가산금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.gaamt)}</span>`;
                    }
                },
                {
                    field: "afamt",
                    title: "납기후금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.afamt)}</span>`;
                    }
                },
                {
                    field: "sugbn",
                    title: "수납여부",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        if(dataItem.sugbn === "미납"){
                            return`<span style="color:red;">${dataItem.sugbn}</span>`;
                        }else{
                            return`<span style="color:#6293d9;">${dataItem.sugbn}</span>`;
                        }
                    }
                },
                {
                    field: "soindt",
                    title: "수납일자",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "sugwannm",
                    title: "수납처",
                    attributes: {style: 'text-align:center'}
                }
            ],
            dataSource: [],
            page : (e) => {
                $("#water-supply-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, waterSupplySetting.waterNumberCheckedItems);
            },
            change : (e) => {
                const cell = e.sender.select();
                const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
            },
            height: "92%",
            resizable: false,
        }).on("click", ".water-supply-check", function (e) {
            waterSupplySetting.waterNumberCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#water-supply-number-grid",
                waterSupplySetting.waterNumberCheckedItems,
                "#water-supply-check-all"
            );
            waterSupplySetting.checkedTotalValue(waterSupplySetting.waterNumberCheckedItems);
        }).on("change", "#water-supply-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.water-supply-check');
        });
    },

    numberSetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: waterSupplyDetailUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "고객번호 : ",
                            description : "상하수도 요금 상세 조회",
                        }

                        logParam.dataGb = logParam.dataGb + $("#water-supply-number-search-text").data("kendoTextBox").value();

                        if(!!$("#water-supply-number-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param1 : $("#water-supply-number-search-text").data("kendoTextBox").value().trim(),
                        param2 : waterSupplySetting.waterDateCalc(), //기준년월
                        param3 : kendo.toString($("#water-supply-number-month").data("kendoDatePicker").value(),"yyyyMM"), //기준년월로부터 -1년
                        requiredUrlIndex : 1,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    nabgi : {type : 'string'},
                    jicim : {type : 'string'},
                    use : {type : 'string'},
                    samt : {type : 'string'},
                    hamt : {type : 'string'},
                    tamt : {type : 'string'},
                    ichehal : {type : 'string'},
                    inamt : {type : 'string'},
                    gaamt : {type : 'string'},
                    afamt : {type : 'string'},
                    sugbn : {type : 'string'},
                    soindt : {type : 'string'},
                    sugwannm : {type : 'string'},
                },
                parse : (res) => {
                    let totalSamt = 0;
                    let totalHamt = 0;
                    let totalTamt = 0;
                    let totalIchehal = 0;
                    let totalInamt = 0;
                    let totalGaamt = 0;
                    let totalAfamt = 0;
                    let idIdx = 1;

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        data.nabgi = data.nabgi.substring(0,4) + '-' + data.nabgi.substring(4,6);
                        data.soindt = data.soindt.substring(0,4) + '-' + data.soindt.substring(4,6) + '-' + data.soindt.substring(6,8);
                        if(data.sugbn === "미납"){
                            totalSamt += Number(data.samt);
                            totalHamt += Number(data.hamt);
                            totalTamt += Number(data.tamt);
                            totalIchehal += Number(data.ichehal);
                            totalInamt += Number(data.inamt);
                            totalGaamt += Number(data.gaamt);
                            totalAfamt += Number(data.afamt);
                        }
                    })
                    !!totalSamt ? $("#water-supply-number-total-samt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalSamt + "원")) : $("#water-supply-number-total-samt").data("kendoTextBox").value("0원");
                    !!totalHamt ? $("#water-supply-number-total-hamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalHamt + "원")) : $("#water-supply-number-total-hamt").data("kendoTextBox").value("0원");
                    !!totalTamt ? $("#water-supply-number-total-tamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalTamt + "원")) : $("#water-supply-number-total-tamt").data("kendoTextBox").value("0원");
                    !!totalIchehal ? $("#water-supply-number-total-ichehal").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalIchehal + "원")) : $("#water-supply-number-total-ichehal").data("kendoTextBox").value("0원");
                    !!totalInamt ? $("#water-supply-number-total-inamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalInamt + "원")) : $("#water-supply-number-total-inamt").data("kendoTextBox").value("0원");
                    !!totalGaamt ? $("#water-supply-number-total-gaamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalGaamt + "원")) : $("#water-supply-number-total-gaamt").data("kendoTextBox").value("0원");
                    !!totalAfamt ? $("#water-supply-number-total-afamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalAfamt + "원")) : $("#water-supply-number-total-afamt").data("kendoTextBox").value("0원");

                    waterSupplySetting.waterNumberCheckedItems = [];
                    $("#water-supply-check-all").prop("checked", false); //check all checkbox 빼기

                    waterSupplySetting.waterCustomerInfo(res.data.rows);

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('water-supply', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },

    //기준년월 계산
    waterDateCalc : () => {
        let supplyDate  = new Date($("#water-supply-number-month").data("kendoDatePicker").value());
        supplyDate.setMonth(supplyDate.getMonth() - WATER_BASE_DATE);
        return kendo.toString(supplyDate,"yyyyMM");
    },

    checkedTotalValue : (checkedItem) => {
        let totalSamt = 0;
        let totalHamt = 0;
        let totalTamt = 0;
        let totalIchehal = 0;
        let totalInamt = 0;
        let totalGaamt = 0;
        let totalAfamt = 0;
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalSamt += Number(checkedItem[i].data.samt);
                totalHamt += Number(checkedItem[i].data.hamt);
                totalTamt += Number(checkedItem[i].data.tamt);
                totalIchehal += Number(checkedItem[i].data.ichehal);
                totalInamt += Number(checkedItem[i].data.inamt);
                totalGaamt += Number(checkedItem[i].data.gaamt);
                totalAfamt += Number(checkedItem[i].data.afamt);
            }
        }

        !!totalSamt ? $("#water-supply-number-checked-total-samt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalSamt + "원")) : $("#water-supply-number-checked-total-samt").data("kendoTextBox").value("0원");
        !!totalHamt ? $("#water-supply-number-checked-total-hamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalHamt + "원")) : $("#water-supply-number-checked-total-hamt").data("kendoTextBox").value("0원");
        !!totalTamt ? $("#water-supply-number-checked-total-tamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalTamt + "원")) : $("#water-supply-number-checked-total-tamt").data("kendoTextBox").value("0원");
        !!totalIchehal ? $("#water-supply-number-checked-total-ichehal").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalIchehal + "원")) : $("#water-supply-number-checked-total-ichehal").data("kendoTextBox").value("0원");
        !!totalInamt ? $("#water-supply-number-checked-total-inamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalInamt + "원")) : $("#water-supply-number-checked-total-inamt").data("kendoTextBox").value("0원");
        !!totalGaamt ? $("#water-supply-number-checked-total-gaamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalGaamt + "원")) : $("#water-supply-number-checked-total-gaamt").data("kendoTextBox").value("0원");
        !!totalAfamt ? $("#water-supply-number-checked-total-afamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalAfamt + "원")) : $("#water-supply-number-checked-total-afamt").data("kendoTextBox").value("0원");
    },

    waterCustomerInfo : (datas) => {
        if(datas.length > 0){
            let inamt = 0;
            let afamt = 0;
            let bankDataSource = [];

            datas.forEach((data)=>{
                if(data.soindt === "" || data.soindt === null || data.soindt === undefined){
                    inamt += Number(data.inamt);
                    afamt += Number(data.afamt);
                }
            })

            if(!!datas[0].vacc){
                bankDataSource.push({bank : "신한", bankNumber : datas[0].vacc});
            }

            if(!!datas[0].vacc1){
                bankDataSource.push({bank : "농협", bankNumber : datas[0].vacc1});
            }

            if(bankDataSource.length > 0){
                const bankDropDownList = $("#water-supply-customer-info-bank-drop-down-list").data("kendoDropDownList");
                bankDropDownList.setDataSource(bankDataSource);
                bankDropDownList.enable(true);
                bankDropDownList.select(0);
                bankDropDownList.trigger("change");

            }

            $("#water-supply-customer-info-suynm").data("kendoTextBox").value(datas[0].suynm);
            $("#water-supply-customer-info-suyad").data("kendoTextBox").value(datas[0].suyad);
            $("#water-supply-customer-info-ercNo").data("kendoTextBox").value(datas[0].ercNo);
            $("#water-supply-customer-info-junja").data("kendoTextBox").value(datas[0].junja);
            $("#water-supply-customer-info-sastop").data("kendoTextBox").value(datas[0].sastop);
            $("#water-supply-customer-info-inamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(inamt + "원"));
            $("#water-supply-customer-info-afamt").data("kendoTextBox").value(administUtils.commonNumberFormatting(afamt + "원"));
        }else{
            $("#water-supply-customer-info-bank-drop-down-list").data("kendoDropDownList").setDataSource([]);
            $("#water-supply-customer-info-bank-drop-down-list").data("kendoDropDownList").enable(false);
            $("#water-supply-customer-info-suynm").data("kendoTextBox").value("");
            $("#water-supply-customer-info-suyad").data("kendoTextBox").value("");
            $("#water-supply-customer-info-ercNo").data("kendoTextBox").value("");
            $("#water-supply-customer-info-junja").data("kendoTextBox").value("");
            $("#water-supply-customer-info-sastop").data("kendoTextBox").value("");
            $("#water-supply-customer-info-inamt").data("kendoTextBox").value("");
            $("#water-supply-customer-info-afamt").data("kendoTextBox").value("");
        }
    }

};

const localTaxSetting = {
    nonPayCheckedItems : [],
    payCheckedItems : [],
    searchText : "", //주민번호 마스킹 처리전 검색값
    localTaxDocumentIds : {
        pageTypeRadioGroup : "#local-tax-pay-type",

        nonPayGridDiv : "#local-tax-non-payment-grid-div",
        nonPayTotalDiv : "#local-tax-non-payment-total-div",
        nonPayGrid : "#local-tax-non-payment-grid",

        payGridDiv : "#local-tax-payment-grid-div",
        payTotalDiv : "#local-tax-payment-total-div",
        payGrid : "#local-tax-payment-grid",
    },
    smsText : "",

    widgetSetting : () => {
        $("#local-tax-search-condition-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : "주민번호", codeKey : "regNumber"},{codeNm : "법인번호", codeKey : "corporateNumber"},{codeNm : "사업자등록번호", codeKey : "businessNumber"}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            size: 'small',
            autoWidth: true,
            change : (e) => {
                $("#local-tax-search-text").data("kendoTextBox").value("");
                localTaxSetting.searchText = ""; //검색 타입이 변할 경우 clear
                $("#administ-reg-no").val("");
            }
        });
        $("#local-tax-search-text").kendoTextBox({
            size: 'small',
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#local-tax-search-btn").trigger("click");
            }else{
                localTaxSetting.searchText = ""; //마스킹 된 값이 변할 경우 clear
                $("#administ-reg-no").val("");
                let words =  administUtils.commonSearchNumberFormatting(
                    $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#local-tax-search-text"
                );
                $("#local-tax-search-text").data("kendoTextBox").value(words);
            }
        });

        $("#local-tax-ars-btn").kendoButton({
            themeColor: "primary",
            click : () => {
                //dropdownlist 주민번호로 변경
                const dropDownList = $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList");
                dropDownList.select(0);
                dropDownList.trigger("change");

                opener.String.singleStepConference("#administ-reg-no", "#local-tax-search-btn");
            }
        });
        $("#local-tax-reg-no-clear-btn").kendoButton({
            click : () => {
                $("#administ-reg-no").val("");
                $("#local-tax-search-text").data("kendoTextBox").value("");
            }
        });


        $("#local-tax-name-search-text").kendoTextBox({
            fillMode : "solid",
            size: 'small',
            readonly : true
        });

        $("#local-tax-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {
                $("#local-tax-checked-vir-acc-no").val(""); //새로운 검색에 따른 미납 가상게좌 초기화

                if(!!$("#administ-reg-no").val()){
                    $("#local-tax-search-text").data("kendoTextBox").value($("#administ-reg-no").val());
                }

                let flag = administUtils.commonSearchNumberCheck(
                    $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#local-tax-search-text"
                );

                if(!!$("#local-tax-search-text").data("kendoTextBox").value().trim() && flag){
                    cpProgress('local-tax');
                    administUtils.commonPageChange(localTaxSetting.localTaxDocumentIds, localTaxSetting.nonPayCheckedTotalDivClear, localTaxSetting.payCheckedTotalDivClear, localTaxSetting.nonPaySetDataSource, localTaxSetting.paySetDataSource);
                    //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                    localTaxSetting.searchText = administUtils.commonMaskingRegNumber($("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),"#local-tax-search-text", localTaxSetting.searchText);
                }
            }
        });

        $("#local-tax-pay-type").kendoButtonGroup({
            items: [ {text: "미납", attributes: 'data-value=nonPay'}, {text:"납부", attributes: 'data-value=pay'} ],
            index: 0,
            layout: "horizontal"
        });

        $("#local-tax-total-non-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-total-non-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });


        $("#local-tax-checked-total-non-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-checked-total-non-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-checked-total").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#local-tax-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#local-tax-payment-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#local-tax-non-sms-btn").kendoButton({
            themeColor : "primary",
            size : "small",
            click : () => {
                if(buttonGroupUtils.buttonGroupGetSelectedText(localTaxSetting.localTaxDocumentIds.pageTypeRadioGroup) === "미납") {
                    const bank = $("#local-tax-checked-vir-acc-no").val();
                    if (!!bank) {
                        const chenapNo = $("#local-tax-checked-total-non-pay").data("kendoTextBox").value();
                        const chenapYes = $("#local-tax-checked-total-pay").data("kendoTextBox").value();
                        const text = bank + "\n" + "미납 : " + chenapNo + "\n" + "체납 : " + chenapYes;
                        localTaxSetting.smsText = administCode.SMS_BASE_TEXT["LOCAL_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["LOCAL_SMS_BOTTOM_TEXT"];
                        $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                        $("#administ-sms-send-content").data("kendoTextArea").value(localTaxSetting.smsText);
                        $("#administ-sms-send-content").trigger("keyup");
                        administSmsSetting.smsPhoneNumberSetting();
                    } else {
                        message.notification({msg: "가상계좌가 존재하지 않습니다.", type: "error"});
                    }
                }else{
                    const napbuPay = $("#local-tax-payment-checked-total-pay").data("kendoTextBox").value();
                    const text = "수납금액 : " + napbuPay;
                    localTaxSetting.smsText = administCode.SMS_BASE_TEXT["LOCAL_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["LOCAL_SMS_BOTTOM_TEXT"];
                    $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                    $("#administ-sms-send-content").data("kendoTextArea").value(localTaxSetting.smsText);
                    $("#administ-sms-send-content").trigger("keyup");
                    administSmsSetting.smsPhoneNumberSetting();
                }
            },
        });
    },

    nonPayGrid : () => {
        $("#local-tax-non-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='local-tax-non-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md local-tax-non-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50,
                },
                {
                    field: "ercNo",
                    title: "전자납부번호",
                    attributes: {style: 'text-align:center'},
                    width:200,
                },
                {
                    field: "chenapGubun",
                    title: "수납진행",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
                {
                    field: "amt",
                    title: "잔액",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.amt)}</span>`;
                    }
                },
                {
                    field: "semokName",
                    title: "세목명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                },
                {
                    field: "objNm",
                    title: "물건명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                },
                {
                    field: "napgiDate",
                    title: "최초납기",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "napgiDate2",
                    title: "가산납기",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "virAccNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'},
                },
                {
                    field: "attGbn",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:70,
                    template: function (dataItem) {
                        if(dataItem.attGbn === "1") {
                            return `<span>압류</span>`;
                        }else{
                            return `<span>미압류</span>`;
                        }
                    }
                },
            ],
            dataSource: [],
            page : (e) => {
                $("#local-tax-non-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, localTaxSetting.nonPayCheckedItems);
            },
            height: "90%",
            resizable: false,
        }).on("click", ".local-tax-non-payment-check", function (e) {
            localTaxSetting.nonPayCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#local-tax-non-payment-grid",
                localTaxSetting.nonPayCheckedItems,
                "#local-tax-non-payment-check-all"
            );
            localTaxSetting.checkedNonPayTotalValue(localTaxSetting.nonPayCheckedItems);
        }).on("change", "#local-tax-non-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.local-tax-non-payment-check');
        });
    },
    nonPaySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: localTaxNonPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "지방세 미납 조회",
                        }
                        logParam.dataGb = $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#local-tax-search-text").data("kendoTextBox").value();


                        if(!!$("#local-tax-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!localTaxSetting.searchText ? localTaxSetting.searchText : $("#local-tax-search-text").data("kendoTextBox").value(),
                        requiredUrlIndex : 2,
                    };

                    param.param1 = btoa(encodeURIComponent(param.param1));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    amt : {type : 'string'},
                    attGbn : {type : 'string'},
                    chenapGubun : {type : 'string'},
                    ercNo : {type : 'string'},
                    gwaseObj : {type : 'string'},
                    napgiDate : {type : 'string'},
                    napgiDate2 : {type : 'string'},
                    napseNo : {type : 'string'},
                    objNm : {type : 'string'},
                    perName : {type : 'string'},
                    semokCode : {type : 'string'},
                    semokName : {type : 'string'},
                    virAccNo : {type : 'string'},
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //미납금액
                    let totalNonPayCase = 0; //미납건수
                    let totalPayAmt = 0; //체납금액
                    let totalPayCase = 0; //체납건수
                    let idIdx = 1;
                    let name = "";

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        !!data.perName ? (name = data.perName) : (name = "");
                        data.napgiDate = data.napgiDate.substring(0,4) + '-' + data.napgiDate.substring(4,6) + '-' + data.napgiDate.substring(6,8);
                        data.napgiDate2 = data.napgiDate2.substring(0,4) + '-' + data.napgiDate2.substring(4,6) + '-' + data.napgiDate2.substring(6,8);
                        if(data.chenapGubun === "미납"){
                            totalNonPayAmt += Number(data.amt);
                            totalNonPayCase += 1;
                        }else if(data.chenapGubun === "체납"){
                            totalPayAmt += Number(data.amt);
                            totalPayCase += 1;
                        }
                    })
                    !!totalNonPayAmt ? $("#local-tax-total-non-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) : $("#local-tax-total-non-pay").data("kendoTextBox").value("0원");
                    !!totalNonPayCase ? $("#local-tax-total-non-pay-case").data("kendoTextBox").value(totalNonPayCase + "건") : $("#local-tax-total-non-pay-case").data("kendoTextBox").value("0건");
                    !!totalPayAmt ? $("#local-tax-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#local-tax-total-pay").data("kendoTextBox").value("0원");
                    !!totalPayCase ? $("#local-tax-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#local-tax-total-pay-case").data("kendoTextBox").value("0건");

                    !!name ? $("#local-tax-name-search-text").data("kendoTextBox").value(name) : $("#local-tax-name-search-text").data("kendoTextBox").value(""); //성명
                    localTaxSetting.nonPayCheckedItems = [];
                    $("#local-tax-non-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('local-tax', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedNonPayTotalValue : (checkedItem) => {
        let totalNonPayAmt = 0;
        let totalNonPayCase = 0;
        let totalPayAmt = 0;
        let totalPayCase = 0;

        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                $("#local-tax-checked-vir-acc-no").val(checkedItem[i].data.virAccNo); //가상계좌(모든 아이템 동일)
                if(checkedItem[i].data.chenapGubun === "미납"){
                    totalNonPayAmt += Number(checkedItem[i].data.amt);
                    totalNonPayCase += 1;
                }else if(checkedItem[i].data.chenapGubun === "체납"){
                    totalPayAmt += Number(checkedItem[i].data.amt);
                    totalPayCase += 1;
                }
            }
        }
        !!totalNonPayAmt ? $("#local-tax-checked-total-non-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) : $("#local-tax-checked-total-non-pay").data("kendoTextBox").value("0원");
        !!totalNonPayCase ? $("#local-tax-checked-total-non-pay-case").data("kendoTextBox").value(totalNonPayCase + "건") : $("#local-tax-checked-total-non-pay-case").data("kendoTextBox").value("0건");
        !!totalPayAmt ? $("#local-tax-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#local-tax-checked-total-pay").data("kendoTextBox").value("0원");
        !!totalPayCase ? $("#local-tax-checked-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#local-tax-checked-total-pay-case").data("kendoTextBox").value("0건");
        (!!totalNonPayAmt || !!totalPayAmt) ? $("#local-tax-checked-total").data("kendoTextBox").value(administUtils.commonNumberFormatting((totalNonPayAmt + totalPayAmt) + "원")) : $("#local-tax-checked-total").data("kendoTextBox").value("0원");
    },
    nonPayCheckedTotalDivClear : () => {
        $("#local-tax-checked-total-non-pay").data("kendoTextBox").value("0원");
        $("#local-tax-checked-total-non-pay-case").data("kendoTextBox").value("0건");
        $("#local-tax-checked-total-pay").data("kendoTextBox").value("0원");
        $("#local-tax-checked-total-pay-case").data("kendoTextBox").value("0건");
        $("#local-tax-checked-total").data("kendoTextBox").value("0원");
    },

    payGrid : () => {
        $("#local-tax-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='local-tax-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md local-tax-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50,
                },
                {
                    field: "gwaseYm",
                    title: "과세년월",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "gwaseObj",
                    title: "과세물건",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "amt",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.amt)}</span>`;
                    }
                },
                {
                    field: "gasanGum",
                    title: "가산금",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.gasanGum)}</span>`;
                    }
                },
                {
                    field: "napbuKind",
                    title: "납부유형",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "sunapGbn",
                    title: "수납구분",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "sunapBank",
                    title: "수납은행",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "napgiDate",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "napbuDate",
                    title: "납부일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
            ],
            dataSource: [],
            page : (e) => {
                $("#local-tax-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, localTaxSetting.payCheckedItems);
            },
            height: "90%",
            resizable: false,
        }).on("click", ".local-tax-payment-check", function (e) {
            localTaxSetting.payCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#local-tax-payment-grid",
                localTaxSetting.payCheckedItems,
                "#local-tax-payment-check-all"
            );
            localTaxSetting.checkedPayTotalValue(localTaxSetting.payCheckedItems);
        }).on("change", "#local-tax-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.local-tax-payment-check');
        });
    },
    paySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: localTaxPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "지방세 납부 조회",
                        }
                        logParam.dataGb = $("#local-tax-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#local-tax-search-text").data("kendoTextBox").value();

                        if(!!$("#local-tax-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!localTaxSetting.searchText ? localTaxSetting.searchText : $("#local-tax-search-text").data("kendoTextBox").value(),
                        param2 : "",
                        param3 : PARAM_NAPBU_MONTH,
                        requiredUrlIndex : 3,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    amt : {type : 'string'},
                    gasanGum : {type : 'string'},
                    gwaseKbn : {type : 'string'},
                    gwaseNo : {type : 'string'},
                    gwaseObj : {type : 'string'},
                    gwaseYm : {type : 'string'},
                    napbuDate : {type : 'string'},
                    napbuKind : {type : 'string'},
                    napgiDate : {type : 'string'},
                    perName : {type : 'string'},
                    sunapBank : {type : 'string'},
                    sunapGbn : {type : 'string'},
                },
                parse : (res) => {
                    let totalPayAmt = 0; //전체항목 금액
                    let totalPayCase = 0; //전체항목 건수
                    let idIdx = 1;
                    let name = "";

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        !!data.perName ? (name = data.perName) : (name = "");
                        data.napgiDate = data.napgiDate.substring(0,4) + '-' + data.napgiDate.substring(4,6) + '-' + data.napgiDate.substring(6,8);
                        data.napbuDate = data.napbuDate.substring(0,4) + '-' + data.napbuDate.substring(4,6) + '-' + data.napbuDate.substring(6,8);

                        totalPayAmt += Number(data.amt);
                        totalPayCase += 1;
                    })
                    !!totalPayAmt ? $("#local-tax-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#local-tax-payment-total-pay").data("kendoTextBox").value("0원");
                    !!totalPayCase ? $("#local-tax-payment-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#local-tax-payment-total-pay-case").data("kendoTextBox").value("0건");

                    !!name ? $("#local-tax-name-search-text").data("kendoTextBox").value(name) : $("#local-tax-name-search-text").data("kendoTextBox").value(""); //성명
                    localTaxSetting.payCheckedItems = [];
                    $("#local-tax-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('local-tax', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedPayTotalValue : (checkedItem) => {
        let totalPayAmt = 0;
        let totalPayCase = 0;
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalPayAmt += Number(checkedItem[i].data.amt);
                totalPayCase += 1;
            }
        }
        !!totalPayAmt ? $("#local-tax-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#local-tax-payment-checked-total-pay").data("kendoTextBox").value("0원");
        !!totalPayCase ? $("#local-tax-payment-checked-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#local-tax-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
    },
    payCheckedTotalDivClear : () => {
        $("#local-tax-payment-checked-total-pay").data("kendoTextBox").value("0원");
        $("#local-tax-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
    },
};

const nonTaxSetting = {
    nonPayCheckedItems : [],
    payCheckedItems : [],
    searchText : "", //주민번호 마스킹 처리전 검색값
    nonTaxDocumentIds : {
        pageTypeRadioGroup : "#non-tax-pay-type",

        nonPayGridDiv : "#non-tax-non-payment-grid-div",
        nonPayTotalDiv : "#non-tax-non-payment-total-div",
        nonPayGrid : "#non-tax-non-payment-grid",

        payGridDiv : "#non-tax-payment-grid-div",
        payTotalDiv : "#non-tax-payment-total-div",
        payGrid : "#non-tax-payment-grid",
    },
    smsText : "",

    widgetSetting : () => {
        $("#non-tax-search-condition-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : "주민번호", codeKey : "regNumber"},{codeNm : "법인번호", codeKey : "corporateNumber"},{codeNm : "사업자등록번호", codeKey : "businessNumber"}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            autoWidth: true,
            change : (e) => {
                $("#non-tax-search-text").data("kendoTextBox").value("");
                nonTaxSetting.searchText = ""; //검색 타입이 변할 경우 clear
                $("#administ-reg-no").val("");
            }
        });

        $("#non-tax-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#non-tax-search-btn").trigger("click");
            }else{
                nonTaxSetting.searchText = ""; //마스킹 된 값이 변할 경우 clear
                $("#administ-reg-no").val("");
                let words =  administUtils.commonSearchNumberFormatting(
                    $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#non-tax-search-text"
                );
                $("#non-tax-search-text").data("kendoTextBox").value(words);
            }
        });

        $("#non-tax-ars-btn").kendoButton({
            themeColor: "primary",
            click : () => {
                //dropdownlist 주민번호로 변경
                const dropDownList = $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList");
                dropDownList.select(0);
                dropDownList.trigger("change");

                opener.String.singleStepConference("#administ-reg-no", "#non-tax-search-btn");
            }
        });
        $("#non-tax-reg-no-clear-btn").kendoButton({
            click : () => {
                $("#administ-reg-no").val("");
                $("#non-tax-search-text").data("kendoTextBox").value("");
            }
        });

        $("#non-tax-name-search-text").kendoTextBox({
            fillMode : "solid",
            size: 'small',
            readonly : true
        });

        $("#non-tax-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {

                if(!!$("#administ-reg-no").val()){
                    $("#non-tax-search-text").data("kendoTextBox").value($("#administ-reg-no").val());
                }

                let flag = administUtils.commonSearchNumberCheck(
                    $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#non-tax-search-text"
                );

                if(!!$("#non-tax-search-text").data("kendoTextBox").value().trim() && flag){
                    cpProgress('non-tax');
                    administUtils.commonPageChange(nonTaxSetting.nonTaxDocumentIds, nonTaxSetting.nonPayCheckedTotalDivClear, nonTaxSetting.payCheckedTotalDivClear, nonTaxSetting.nonPaySetDataSource, nonTaxSetting.paySetDataSource);
                    //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                    nonTaxSetting.searchText = administUtils.commonMaskingRegNumber($("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").value(),"#non-tax-search-text", nonTaxSetting.searchText);
                }

            },
        });

        $("#non-tax-pay-type").kendoButtonGroup({
            items: [ {text: "미납", attributes: 'data-value=nonPay'}, {text:"납부", attributes: 'data-value=pay'} ],
            index: 0,
            layout: "horizontal"
        });

        $("#non-tax-non-payment-total").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-non-payment-total-non-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-non-payment-total-non-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-non-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-non-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-non-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });

        $("#non-tax-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-payment-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#non-tax-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });

        $("#non-tax-non-sms-btn").kendoButton({
            themeColor : "primary",
            size : "small",
            click : () => {
                if(buttonGroupUtils.buttonGroupGetSelectedText(nonTaxSetting.nonTaxDocumentIds.pageTypeRadioGroup) === "미납") {
                    const rows = nonTaxSetting.checkedNonPaySms(nonTaxSetting.nonPayCheckedItems);
                    let smsText = "";

                    for(key in rows){
                        if(rows[key][0] !== 0) smsText +=  key + " / " + rows[key][0] +"원" + "\n";
                    }
                    if(!!smsText){
                        nonTaxSetting.smsText = administCode.SMS_BASE_TEXT["NONTAX_SMS_TOP_TEXT"] + smsText + administCode.SMS_BASE_TEXT["NONTAX_SMS_BOTTOM_TEXT"];
                        $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                        $("#administ-sms-send-content").data("kendoTextArea").value(nonTaxSetting.smsText);
                        $("#administ-sms-send-content").trigger("keyup");
                        administSmsSetting.smsPhoneNumberSetting();
                    }else{
                        message.notification({msg: "가상계좌가 존재하지 않습니다.", type:"error"});
                    }
                }else{
                    const napbuPay = $("#non-tax-payment-checked-total-pay").data("kendoTextBox").value();
                    const text = "수납금액 : " + napbuPay;
                    nonTaxSetting.smsText = administCode.SMS_BASE_TEXT["NONTAX_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["NONTAX_SMS_BOTTOM_TEXT"];
                    $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                    $("#administ-sms-send-content").data("kendoTextArea").value(nonTaxSetting.smsText);
                    $("#administ-sms-send-content").trigger("keyup");
                    administSmsSetting.smsPhoneNumberSetting();
                }
            },
        });
    },

    nonPayGrid : () => {
        $("#non-tax-non-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='non-tax-non-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md non-tax-non-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "depName",
                    title: "부서명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "accYear",
                    title: "회계연도",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
                {
                    field: "semokName",
                    title: "회계과목",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "objNm",
                    title: "물건명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "bukwaDate",
                    title: "부과일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "amt",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.amt)}</span>`;
                    }
                },
                {
                    field: "napgiDate",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "accountNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "ercNo",
                    title: "전자납부번호",
                    attributes: {style: 'text-align:center'}
                },
                {
                    field: "attGbn",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:70
                }
            ],
            dataSource: [],
            page : (e) => {
                //isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                $("#non-tax-non-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, nonTaxSetting.nonPayCheckedItems);
            },
            height: "90%",
            resizable: false,
            selectable: false,
        }).on("click", ".non-tax-non-payment-check", function (e) {
            nonTaxSetting.nonPayCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#non-tax-non-payment-grid",
                nonTaxSetting.nonPayCheckedItems,
                "#non-tax-non-payment-check-all"
            );
            nonTaxSetting.checkedNonPayTotalValue(nonTaxSetting.nonPayCheckedItems);
        }).on("change", "#non-tax-non-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.non-tax-non-payment-check');
        });

        $("#non-tax-non-payment-grid").kendoTooltip({
            filter: "td:nth-child(5)",
            position: "top",
            width: 300,
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 200
                },
                close: {
                    effects: "fade:out",
                    duration: 200
                }
            },
            offSet : 5,
            show: function (e) {
            },
            hide: function () {
            },
            content: function(e){
                let dataItem =  $("#non-tax-non-payment-grid").data("kendoCpGrid").dataItem(e.target.closest("tr"));
                let content = dataItem.objNm;

                return content;
            }
        });

    },
    nonPaySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: nonTaxNonPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "세외수입 미납 조회",
                        }
                        logParam.dataGb = $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#non-tax-search-text").data("kendoTextBox").value();

                        if(!!$("#non-tax-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!nonTaxSetting.searchText ? nonTaxSetting.searchText : $("#non-tax-search-text").data("kendoTextBox").value(),
                        requiredUrlIndex : 4,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    depName : {type : 'string'},
                    accYear : {type : 'string'},
                    semokName : {type : 'string'},
                    objNm : {type : 'string'},
                    bukwaDate : {type : 'string'},
                    amt : {type : 'string'},
                    napgiDate : {type : 'string'},
                    accountNo : {type : 'string'},
                    ercNo : {type : 'string'},
                    attGbn : {type : 'string'},
                    chenapGubun : {type : 'string'},
                    perName : {type : 'string'},
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //미납금액
                    let totalNonPayCase = 0; //미납건수
                    let totalPayAmt = 0; //체납금액
                    let totalPayCase = 0; //체납건수
                    let idIdx = 1;
                    let name = "";

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        !!data.perName ? (name = data.perName) : (name = "");
                        data.bukwaDate = data.bukwaDate.substring(0,4) + '-' + data.bukwaDate.substring(4,6) + '-' + data.bukwaDate.substring(6,8);
                        data.napgiDate = data.napgiDate.substring(0,4) + '-' + data.napgiDate.substring(4,6) + '-' + data.napgiDate.substring(6,8);
                        if(data.chenapGubun === "1"){
                            //미납
                            totalNonPayAmt += Number(data.amt);
                            totalNonPayCase += 1;
                        }else if(data.chenapGubun === "2"){
                            //체납
                            totalPayAmt += Number(data.amt);
                            totalPayCase += 1;
                        }
                    })
                    !!totalNonPayAmt ? $("#non-tax-non-payment-total-non-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) : $("#non-tax-non-payment-total-non-pay").data("kendoTextBox").value("0원");
                    !!totalNonPayCase ? $("#non-tax-non-payment-total-non-pay-case").data("kendoTextBox").value(totalNonPayCase + "건") : $("#non-tax-non-payment-total-non-pay-case").data("kendoTextBox").value("0건");
                    !!totalPayAmt ? $("#non-tax-non-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#non-tax-non-payment-total-pay").data("kendoTextBox").value("0원");
                    !!totalPayCase ? $("#non-tax-non-payment-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#non-tax-non-payment-total-pay-case").data("kendoTextBox").value("0건");
                    $("#non-tax-non-payment-total").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + totalPayAmt + "원")); //총계 합계 금액

                    !!name ? $("#non-tax-name-search-text").data("kendoTextBox").value(name) : $("#non-tax-name-search-text").data("kendoTextBox").value(""); //성명
                    nonTaxSetting.nonPayCheckedItems = [];
                    $("#non-tax-non-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('non-tax', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedNonPayTotalValue : (checkedItem) => {
        let totalAmt = 0;
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalAmt += Number(checkedItem[i].data.amt);
            }
        }

        !!totalAmt ? $("#non-tax-non-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalAmt + "원")) : $("#non-tax-non-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },

    checkedNonPaySms : (checkedItem) => {
        const accNoGroup = {};
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                if(accNoGroup.hasOwnProperty(checkedItem[i].data.accountNo)){
                    accNoGroup[checkedItem[i].data.accountNo][0] += Number(checkedItem[i].data.amt); //총계
                }else{
                    //새로운 계좌번호일 경우
                    accNoGroup[checkedItem[i].data.accountNo] = [];
                    accNoGroup[checkedItem[i].data.accountNo][0] = Number(checkedItem[i].data.amt); //총계
                }
            }
        }
        return accNoGroup;
    },


    nonPayCheckedTotalDivClear : () => {
        $("#non-tax-non-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },

    payGrid : () => {
        $("#non-tax-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='non-tax-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md non-tax-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50,
                },
                {
                    field: "depName",
                    title: "부서명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                    width:200
                },
                {
                    field: "accYear",
                    title: "회계연도",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
                {
                    field: "semokName",
                    title: "회계과목",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                },
                {
                    field: "objNm",
                    title: "물건명",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
                },
                {
                    field: "payYmd",
                    title: "수납일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "amt",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.amt)}</span>`;
                    }
                },
                {
                    field: "napgiDate",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "napGbnName",
                    title: "납부구분",
                    attributes: {style: 'text-align:center'},
                    width:180
                },
                {
                    field: "ercNo",
                    title: "전자납부번호",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
            ],
            dataSource: [],
            page : (e) => {
                $("#non-tax-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, nonTaxSetting.payCheckedItems);
            },
            height: "90%",
            resizable: true,
        }).on("click", ".non-tax-payment-check", function (e) {
            nonTaxSetting.payCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#non-tax-payment-grid",
                nonTaxSetting.payCheckedItems,
                "#non-tax-payment-check-all"
            );
            nonTaxSetting.checkedPayTotalValue(nonTaxSetting.payCheckedItems);
        }).on("change", "#non-tax-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.non-tax-payment-check');
        });

        $("#non-tax-payment-grid").kendoTooltip({
            filter: "td:nth-child(5)",
            position: "top",
            width: 350,
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 200
                },
                close: {
                    effects: "fade:out",
                    duration: 200
                }
            },
            offSet : 5,
            show: function (e) {
            },
            hide: function () {
            },
            content: function(e){
                let dataItem =  $("#non-tax-payment-grid").data("kendoCpGrid").dataItem(e.target.closest("tr"));
                let content = dataItem.objNm;

                return content;
            }
        });
    },
    paySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: nonTaxPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "세외수입 납부 조회",
                        }
                        logParam.dataGb = $("#non-tax-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#non-tax-search-text").data("kendoTextBox").value();

                        if(!!$("#non-tax-search-text").data("kendoTextBox").value()){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!nonTaxSetting.searchText ? nonTaxSetting.searchText : $("#non-tax-search-text").data("kendoTextBox").value(),
                        param2 : "",
                        param3 : PARAM_NAPBU_MONTH,
                        requiredUrlIndex : 5,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    accYear : {type : 'string'}, //회계연도
                    accountNo : {type : 'string'},
                    amt : {type : 'string'}, //금액
                    bukwaDate : {type : 'string'},
                    depCode : {type : 'string'},
                    depName : {type : 'string'}, //부서명
                    ercNo : {type : 'string'}, //전자납부번호
                    napGbn : {type : 'string'}, //납부구분
                    napgiDate : {type : 'string'}, //납기일자
                    objNm : {type : 'string'}, //물건명
                    payAddAmt : {type : 'string'},
                    payAmt : {type : 'string'},
                    payGbn : {type : 'string'},
                    payIja : {type : 'string'},
                    payYmd : {type : 'string'}, //수납일자
                    perName : {type : 'string'},
                    semokCode : {type : 'string'},
                    semokName : {type : 'string'}, //회계과목
                },
                parse : (res) => {
                    let totalPayAmt = 0; //전체항목 금액
                    let totalPayCase = 0; //전체항목 건수
                    let idIdx = 1;
                    let name = "";

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        !!data.perName ? (name = data.perName) : (name = "");
                        data.payYmd = data.payYmd.substring(0,4) + '-' + data.payYmd.substring(4,6) + '-' + data.payYmd.substring(6,8);
                        data.napgiDate = data.napgiDate.substring(0,4) + '-' + data.napgiDate.substring(4,6) + '-' + data.napgiDate.substring(6,8);
                        data.napGbnName = administCode.NAPBUGUBUN[data.napGbn];

                        totalPayAmt += Number(data.amt);
                        totalPayCase += 1;
                    })
                    !!totalPayAmt ? $("#non-tax-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#non-tax-payment-total-pay").data("kendoTextBox").value("0원");
                    !!totalPayCase ? $("#non-tax-payment-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#non-tax-payment-total-pay-case").data("kendoTextBox").value("0건");

                    !!name ? $("#non-tax-name-search-text").data("kendoTextBox").value(name) : $("#non-tax-name-search-text").data("kendoTextBox").value(""); //성명
                    nonTaxSetting.payCheckedItems = [];
                    $("#non-tax-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('non-tax', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedPayTotalValue : (checkedItem) => {
        let totalPayAmt = 0;
        let totalPayCase = 0;
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalPayAmt += Number(checkedItem[i].data.amt);
                totalPayCase += 1;
            }
        }
        !!totalPayAmt ? $("#non-tax-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#non-tax-payment-checked-total-pay").data("kendoTextBox").value("0원");
        !!totalPayCase ? $("#non-tax-payment-checked-total-pay-case").data("kendoTextBox").value(totalPayCase + "건") : $("#non-tax-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
    },
    payCheckedTotalDivClear : () => {
        $("#non-tax-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        $("#non-tax-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
};

const environmentSetting = {
    nonPayCheckedItems : [],
    payCheckedItems : [],
    searchText : "", //주민번호 마스킹 처리전 검색값
    environmentDocumentIds : {
        pageTypeRadioGroup : "#environment-tax-pay-type",

        nonPayGridDiv : "#environment-non-payment-grid-div",
        nonPayTotalDiv : "#environment-non-payment-total-div",
        nonPayGrid : "#environment-non-payment-grid",

        payGridDiv : "#environment-payment-grid-div",
        payTotalDiv : "#environment-payment-total-div",
        payGrid : "#environment-payment-grid",
    },
    smsText : "",

    widgetSetting : () => {
        $("#environment-search-condition-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : "주민번호", codeKey : "regNumber"},{codeNm : "법인번호", codeKey : "corporateNumber"},{codeNm : "사업자등록번호", codeKey : "businessNumber"}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            autoWidth: true,
            change : (e) => {
                $("#environment-search-text").data("kendoTextBox").value("");
                environmentSetting.searchText = ""; //검색 타입이 변할 경우 clear
                $("#administ-reg-no").val("");
            }
        });
        $("#environment-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#environment-search-btn").trigger("click");
            }else{
                environmentSetting.searchText = ""; //마스킹 된 값이 변할 경우 clear
                $("#administ-reg-no").val("");
                let words =  administUtils.commonSearchNumberFormatting(
                    $("#environment-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#environment-search-text"
                );
                $("#environment-search-text").data("kendoTextBox").value(words);
            }
        });

        $("#environment-ars-btn").kendoButton({
            themeColor: "primary",
            click : () => {
                //dropdownlist 주민번호로 변경
                const dropDownList = $("#environment-search-condition-drop-down-list").data("kendoDropDownList");
                dropDownList.select(0);
                dropDownList.trigger("change");

                opener.String.singleStepConference("#administ-reg-no", "#environment-search-btn");
            }
        });
        $("#environment-reg-no-clear-btn").kendoButton({
            click : () => {
                $("#administ-reg-no").val("");
                $("#environment-search-text").data("kendoTextBox").value("");
                $("#environment-car-number-search-text").data("kendoTextBox").value("");
            }
        });

        $("#environment-car-number-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#environment-search-btn").trigger("click");
            }
        });

        $("#environment-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {

                if(!!$("#administ-reg-no").val()){
                    $("#environment-search-text").data("kendoTextBox").value($("#administ-reg-no").val());
                }

                const searchType = $("#environment-search-condition-drop-down-list").data("kendoDropDownList").value();
                let words = String($("#environment-search-text").val());

                if(searchType === "regNumber") {
                    if (words.length === 13) {
                        if ($("#administ-reg-no").val() === "") {
                            //주민번호에 13자리를 만족하며, 키보드로 주민번호를 입력하는 경우
                            $("#administ-reg-no").val(words);
                        }
                    }
                }

                if(!!$("#environment-search-text").data("kendoTextBox").value().trim() || $("#environment-car-number-search-text").data("kendoTextBox").value().trim()){
                    let numberCheck = false;
                    if(!!$("#environment-search-text").data("kendoTextBox").value().trim()){
                        //번호에 검색값이 있을 경우 자리수 체크
                        numberCheck = administUtils.commonSearchNumberCheck(
                            $("#environment-search-condition-drop-down-list").data("kendoDropDownList").value(),
                            "#environment-search-text"
                        );

                        if(numberCheck){
                            //입력한 번호의 유효성이 맞는 경우
                            cpProgress('environment');
                            administUtils.commonPageChange(environmentSetting.environmentDocumentIds, environmentSetting.nonPayCheckedTotalDivClear, environmentSetting.payCheckedTotalDivClear, environmentSetting.nonPaySetDataSource, environmentSetting.paySetDataSource);
                            //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                            environmentSetting.searchText = administUtils.commonMaskingRegNumber($("#environment-search-condition-drop-down-list").data("kendoDropDownList").value(),"#environment-search-text", environmentSetting.searchText);
                        }
                    }else{
                        //번호에 검색값이 없는 경우
                        cpProgress('environment');
                        administUtils.commonPageChange(environmentSetting.environmentDocumentIds, environmentSetting.nonPayCheckedTotalDivClear, environmentSetting.payCheckedTotalDivClear, environmentSetting.nonPaySetDataSource, environmentSetting.paySetDataSource);
                        //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                        environmentSetting.searchText = administUtils.commonMaskingRegNumber($("#environment-search-condition-drop-down-list").data("kendoDropDownList").value(),"#environment-search-text", environmentSetting.searchText);
                    }
                }else{
                    message.notification({msg : "검색어는 필수입니다.", type : "error"});
                }

            },
        });

        $("#environment-tax-pay-type").kendoButtonGroup({
            items: [ {text: "미납", attributes: 'data-value=nonPay'}, {text:"납부", attributes: 'data-value=pay'} ],
            index: 0,
            layout: "horizontal"
        });

        $("#environment-non-payment-total-non-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-non-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-non-payment-total").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#environment-non-payment-total-checked-non-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-non-payment-total-checked-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-non-payment-total-checked").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#environment-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-payment-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });
        $("#environment-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true,
        });

        $("#environment-non-sms-btn").kendoButton({
            themeColor : "primary",
            size : "small",
            click : () => {
                if(buttonGroupUtils.buttonGroupGetSelectedText(environmentSetting.environmentDocumentIds.pageTypeRadioGroup) === "미납") {
                    const rows = environmentSetting.checkedNonPaySms(environmentSetting.nonPayCheckedItems);
                    let smsText = "";
                    const today = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

                    for (key in rows) {
                        const payDtArr = rows[key][2].split("-");
                        const payDt = new Date(payDtArr[0], payDtArr[1], payDtArr[2]);

                        if (payDt < today) {
                            if (rows[key][1] !== 0) smsText += "신한: " + key + " 납기후: " + rows[key][1] + "원" + "\n";
                        } else {
                            if (!(rows[key][0] === 0 && rows[key][1] === 0)) smsText += "신한: " + key + " 납기내: " + rows[key][0] + " 납기후: " + rows[key][1] + "원" + "\n";
                        }
                    }

                    if (!!smsText) {
                        environmentSetting.smsText = administCode.SMS_BASE_TEXT["ENVIRONMENT_SMS_TOP_TEXT"] + "\n" + smsText + administCode.SMS_BASE_TEXT["ENVIRONMENT_SMS_BOTTOM_TEXT"];
                        $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                        $("#administ-sms-send-content").data("kendoTextArea").value(environmentSetting.smsText);
                        $("#administ-sms-send-content").trigger("keyup");
                        administSmsSetting.smsPhoneNumberSetting();
                    } else {
                        message.notification({msg: "가상계좌가 존재하지 않습니다.", type: "error"});
                    }
                }else{
                    const napbuPay = $("#environment-payment-checked-total-pay").data("kendoTextBox").value();
                    const text = "수납금액 : " + napbuPay;
                    environmentSetting.smsText = administCode.SMS_BASE_TEXT["ENVIRONMENT_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["ENVIRONMENT_SMS_BOTTOM_TEXT"];
                    $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                    $("#administ-sms-send-content").data("kendoTextArea").value(environmentSetting.smsText);
                    $("#administ-sms-send-content").trigger("keyup");
                    administSmsSetting.smsPhoneNumberSetting();
                }
            },
        });
    },

    nonPayGrid : () => {
        $("#environment-non-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='environment-non-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md environment-non-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "ownrNm",
                    title: "납세자명",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "lvyNo",
                    title: "납세번호",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "taxName",
                    title: "세목",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "rtnValue",
                    title: "기분",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "napGbn",
                    title: "구분",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "beaMneyNo",
                    title: "부과대상내역",
                    attributes: {style: 'text-align:center'},
                    width:180
                },
                {
                    field: "lvyYmd",
                    title: "부과일자",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "lvyMney",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.lvyMney)}</span>`;
                    }
                },
                {
                    field: "hadMney",
                    title: "가산금",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.hadMney)}</span>`;
                    }
                },
                {
                    field: "totalAmt",
                    title: "총계",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.totalAmt)}</span>`;
                    }
                },
                {
                    field: "pymntDlnYmd",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "napbuYn",
                    title: "납부여부",
                    attributes: {style: 'text-align:center'},
                    width:80
                },
                {
                    field: "accNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'},
                    width:220
                },
                {
                    field: "elecNo",
                    title: "전자납부번호",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "atmtGbn",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
            ],
            dataSource: [],
            page : (e) => {
                //isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                $("#environment-non-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, environmentSetting.nonPayCheckedItems);
            },
            change : (e) => {
            },
            height: "100%",
            resizable: false,
            selectable: false,
        }).on("click", ".environment-non-payment-check", function (e) {
            environmentSetting.nonPayCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#environment-non-payment-grid",
                environmentSetting.nonPayCheckedItems,
                "#environment-non-payment-check-all"
            );
            environmentSetting.checkedNonPayTotalValue(environmentSetting.nonPayCheckedItems);
        }).on("change", "#environment-non-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.environment-non-payment-check');
        });
    },
    nonPaySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: environmentNonPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "환경개선부담금 미납 조회",
                        }
                        logParam.dataGb = $("#environment-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#environment-search-text").data("kendoTextBox").value();

                        if(!!$("#environment-car-number-search-text").data("kendoTextBox").value()){
                            logParam.dataGb = logParam.dataGb + " 물건명 : " + $("#environment-car-number-search-text").data("kendoTextBox").value();
                        }

                        if(!!logParam.dataGb){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!environmentSetting.searchText ? environmentSetting.searchText : $("#environment-search-text").data("kendoTextBox").value(),
                        param2 : $("#environment-car-number-search-text").data("kendoTextBox").value().trim(),
                        param3 : "N",
                        param4 : "",
                        requiredUrlIndex : 6,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    ownrNm : {type : 'string'}, //납세자명
                    lvyNo : {type : 'string'}, //납세번호
                    taxCode : {type : 'string'}, //세목코드 12595921:자동차 12595922:시설물
                    perd : {type : 'string'}, //기분 앞 숫자
                    useDate : {type : 'string'}, //기분 괄호 숫자
                    lvyGbn : {type : 'string'}, //구분 1:미고지 2:고지(미체납) 3:체납
                    beaMneyNo : {type : 'string'}, //부과대상내역
                    lvyYmd : {type : 'string'}, //부과일자
                    lvyMney : {type : 'string'}, //금액
                    hadMney : {type : 'string'}, //가산금
                    pymntDlnYmd : {type : 'string'}, //납기일자
                    recptYmd : {type : 'string'}, //수납일자
                    accNo : {type : 'string'}, //가상계좌
                    elecNo : {type : 'string'}, //전자납부번호
                    atmtYn : {type : 'string'}, //압류여부 : 0:미압류 1:압류
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //미납금액
                    let totalPayAmt = 0; //체납금액
                    let idIdx = 1;

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;

                        data.taxName = administCode.TAX_CODE[data.taxCode]; //세목명
                        data.rtnValue = environmentSetting.rtnValueProcessing(data.perd, data.useDate); //기분
                        data.totalAmt = Number(data.lvyMney) + Number(data.hadMney); //총계 -> 금액 + 가산금
                        switch (data.lvyGbn) //구분
                        {
                            case "1":
                                data.napGbn = "미고지";
                                totalNonPayAmt += data.totalAmt;
                                break;
                            case "2":
                                data.napGbn = "미체납";
                                totalNonPayAmt += data.totalAmt;
                                break;
                            case "3":
                                data.napGbn = "체납";
                                totalPayAmt += data.totalAmt;
                                break;
                        }
                        data.totalAmt = String(data.totalAmt);
                        data.napbuYn = !!data.recptYmd ? "납부" : "미납"; //납부여부 -> 납부여부 : 수납일자(RECPT_YMD) 존재여부
                        switch (data.atmtYn) //압류여부
                        {
                            case "0":
                                data.atmtGbn = "미압류";
                                break;
                            case "1":
                                data.atmtGbn = "압류";
                                break;
                        }
                        data.lvyYmd = data.lvyYmd.substring(0,4) + '-' + data.lvyYmd.substring(4,6) + '-' + data.lvyYmd.substring(6,8);
                        data.pymntDlnYmd = data.pymntDlnYmd.substring(0,4) + '-' + data.pymntDlnYmd.substring(4,6) + '-' + data.pymntDlnYmd.substring(6,8);
                    })
                    !!totalNonPayAmt ? $("#environment-non-payment-total-non-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) : $("#environment-non-payment-total-non-pay").data("kendoTextBox").value("0원");
                    !!totalPayAmt ? $("#environment-non-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#environment-non-payment-total-pay").data("kendoTextBox").value("0원");
                    !!(totalNonPayAmt + totalPayAmt) ? $("#environment-non-payment-total").data("kendoTextBox").value(administUtils.commonNumberFormatting((totalNonPayAmt + totalPayAmt) + "원")) :  $("#environment-non-payment-total").data("kendoTextBox").value("0원");

                    environmentSetting.nonPayCheckedItems = [];
                    $("#environment-non-payment-check-all").prop("checked", false); //check all checkbox 빼기
                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('environment', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedNonPayTotalValue : (checkedItem) => {
        let totalNonPayAmt = 0; //미납금액
        let totalPayAmt = 0; //체납금액
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                if(checkedItem[i].data.napGbn === "미고지" || checkedItem[i].data.napGbn === "미체납"){
                    totalNonPayAmt += Number(checkedItem[i].data.totalAmt);
                }else if(checkedItem[i].data.napGbn === "체납"){
                    totalPayAmt += Number(checkedItem[i].data.totalAmt);
                }
            }
        }

        !!totalNonPayAmt ? $("#environment-non-payment-total-checked-non-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) : $("#environment-non-payment-total-checked-non-pay").data("kendoTextBox").value("0원");
        !!totalPayAmt ? $("#environment-non-payment-total-checked-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) : $("#environment-non-payment-total-checked-pay").data("kendoTextBox").value("0원");
        !!(totalNonPayAmt + totalPayAmt) ? $("#environment-non-payment-total-checked").data("kendoTextBox").value(administUtils.commonNumberFormatting((totalNonPayAmt + totalPayAmt) + "원")) : $("#environment-non-payment-total-checked").data("kendoTextBox").value("0원");
    },
    checkedNonPaySms : (checkedItem) => {
        const accNoGroup = {};
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                if(accNoGroup.hasOwnProperty(checkedItem[i].data.accNo)){
                    accNoGroup[checkedItem[i].data.accNo][0] += Number(checkedItem[i].data.lvyMney); //금액
                    accNoGroup[checkedItem[i].data.accNo][1] += Number(checkedItem[i].data.totalAmt); //총계
                }else{
                    //새로운 계좌번호일 경우
                    accNoGroup[checkedItem[i].data.accNo] = [];
                    accNoGroup[checkedItem[i].data.accNo][0] = Number(checkedItem[i].data.lvyMney); //금액
                    accNoGroup[checkedItem[i].data.accNo][1] = Number(checkedItem[i].data.totalAmt); //총계
                    accNoGroup[checkedItem[i].data.accNo][2] = checkedItem[i].data.pymntDlnYmd; //납기일자
                }
            }
        }
        return accNoGroup;
    },
    nonPayCheckedTotalDivClear : () => {
        $("#environment-non-payment-total-checked-non-pay").data("kendoTextBox").value("0원");
        $("#environment-non-payment-total-checked-pay").data("kendoTextBox").value("0원");
        $("#environment-non-payment-total-checked").data("kendoTextBox").value("0원");
    },
    rtnValueProcessing : (perd, useDate) => {
        let rtnValue = "";
        perd = perd.substring(perd.length-1, perd.length); // 마지막 숫자
        rtnValue = `${perd} (${useDate})`;
        return rtnValue;
    },

    payGrid : () => {
        $("#environment-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='environment-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md environment-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "ownrNm",
                    title: "납세자명",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "lvyNo",
                    title: "납세번호",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "taxName",
                    title: "세목",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "rtnValue",
                    title: "기분",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "napGbn",
                    title: "구분",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "beaMneyNo",
                    title: "부과대상내역",
                    attributes: {style: 'text-align:center'},
                    width:180
                },
                {
                    field: "lvyYmd",
                    title: "부과일자",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "lvyMney",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.lvyMney)}</span>`;
                    }
                },
                {
                    field: "hadMney",
                    title: "가산금",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.hadMney)}</span>`;
                    }
                },
                {
                    field: "totalAmt",
                    title: "총계",
                    attributes: {style: 'text-align:center'},
                    width:150,
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.totalAmt)}</span>`;
                    }
                },
                {
                    field: "pymntDlnYmd",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "napbuYn",
                    title: "납부여부",
                    attributes: {style: 'text-align:center'},
                    width:80
                },
                {
                    field: "recptYmd",
                    title: "납부일자",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "accNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'},
                    width:220
                },
                {
                    field: "elecNo",
                    title: "전자납부번호",
                    attributes: {style: 'text-align:center'},
                    width:200
                },
                {
                    field: "atmtGbn",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
            ],
            dataSource: [],
            page : (e) => {
                //isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                $("#environment-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, environmentSetting.payCheckedItems);
            },
            change : (e) => {
            },
            height: "100%",
            resizable: false,
            selectable: false,
        }).on("click", ".environment-payment-check", function (e) {
            environmentSetting.payCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#environment-payment-grid",
                environmentSetting.payCheckedItems,
                "#environment-payment-check-all"
            );
            environmentSetting.checkedPayTotalValue(environmentSetting.payCheckedItems);
        }).on("change", "#environment-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.environment-payment-check');
        });
    },
    paySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: environmentPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "환경개선부담금 납부 조회",
                        }
                        logParam.dataGb = $("#environment-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#environment-search-text").data("kendoTextBox").value();

                        if(!!$("#environment-car-number-search-text").data("kendoTextBox").value()){
                            logParam.dataGb = logParam.dataGb + " 물건명 : " + $("#environment-car-number-search-text").data("kendoTextBox").value();
                        }

                        if(!!logParam.dataGb){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!environmentSetting.searchText ? environmentSetting.searchText : $("#environment-search-text").data("kendoTextBox").value(),
                        param2 : $("#environment-car-number-search-text").data("kendoTextBox").value().trim(),
                        param3 : "Y",
                        param4 : PARAM_NAPBU_MONTH,
                        requiredUrlIndex : 7,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    param.param4 = btoa(encodeURIComponent(param.param4));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    ownrNm : {type : 'string'}, //납세자명
                    lvyNo : {type : 'string'}, //납세번호
                    taxCode : {type : 'string'}, //세목코드 12595921:자동차 12595922:시설물
                    perd : {type : 'string'}, //기분 앞 숫자
                    useDate : {type : 'string'}, //기분 괄호 숫자
                    lvyGbn : {type : 'string'}, //구분 1:미고지 2:고지(미체납) 3:체납
                    beaMneyNo : {type : 'string'}, //부과대상내역
                    lvyYmd : {type : 'string'}, //부과일자
                    lvyMney : {type : 'string'}, //금액
                    hadMney : {type : 'string'}, //가산금
                    pymntDlnYmd : {type : 'string'}, //납기일자
                    recptYmd : {type : 'string'}, //수납일자
                    accNo : {type : 'string'}, //가상계좌
                    elecNo : {type : 'string'}, //전자납부번호
                    atmtYn : {type : 'string'}, //압류여부 : 0:미압류 1:압류
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //미납금액
                    let totalPayAmt = 0; //체납금액
                    let totalCase = 0; //건수
                    let idIdx = 1;

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        totalCase += 1;

                        data.taxName = administCode.TAX_CODE[data.taxCode]; //세목명
                        data.rtnValue = environmentSetting.rtnValueProcessing(data.perd, data.useDate); //기분
                        data.totalAmt = Number(data.lvyMney) + Number(data.hadMney); //총계 -> 금액 + 가산금
                        switch (data.lvyGbn) //구분
                        {
                            case "1":
                                data.napGbn = "미고지";
                                totalNonPayAmt += data.totalAmt;
                                break;
                            case "2":
                                data.napGbn = "미체납";
                                totalNonPayAmt += data.totalAmt;
                                break;
                            case "3":
                                data.napGbn = "체납";
                                totalPayAmt += data.totalAmt;
                                break;
                        }
                        data.totalAmt = String(data.totalAmt);
                        data.napbuYn = !!data.recptYmd ? "납부" : "미납"; //납부여부 -> 납부여부 : 수납일자(RECPT_YMD) 존재여부
                        switch (data.atmtYn) //압류여부
                        {
                            case "0":
                                data.atmtGbn = "미압류";
                                break;
                            case "1":
                                data.atmtGbn = "압류";
                                break;
                        }
                        data.lvyYmd = data.lvyYmd.substring(0,4) + '-' + data.lvyYmd.substring(4,6) + '-' + data.lvyYmd.substring(6,8);
                        data.pymntDlnYmd = data.pymntDlnYmd.substring(0,4) + '-' + data.pymntDlnYmd.substring(4,6) + '-' + data.pymntDlnYmd.substring(6,8);
                        data.recptYmd = data.recptYmd.substring(0,4) + '-' + data.recptYmd.substring(4,6) + '-' + data.recptYmd.substring(6,8);
                    })
                    !!totalCase ? $("#environment-payment-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalCase + "건")) : $("#environment-payment-total-pay-case").data("kendoTextBox").value("0건");
                    !!(totalNonPayAmt + totalPayAmt) ? $("#environment-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting((totalNonPayAmt + totalPayAmt) + "원")) :  $("#environment-payment-total-pay").data("kendoTextBox").value("0원");

                    environmentSetting.payCheckedItems = [];
                    $("#environment-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('environment', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedPayTotalValue : (checkedItem) => {
        let totalNonPayAmt = 0; //미납금액
        let totalPayAmt = 0; //체납금액
        let totalCase = 0;
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalCase += 1;
                if(checkedItem[i].data.napGbn === "미고지" || checkedItem[i].data.napGbn === "미체납"){
                    totalNonPayAmt += Number(checkedItem[i].data.totalAmt);
                }else if(checkedItem[i].data.napGbn === "체납"){
                    totalPayAmt += Number(checkedItem[i].data.totalAmt);
                }
            }
        }

        !!totalCase ? $("#environment-payment-checked-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalCase + "건")) : $("#environment-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        !!(totalNonPayAmt + totalPayAmt) ? $("#environment-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting((totalNonPayAmt + totalPayAmt) + "원")) :  $("#environment-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
    payCheckedTotalDivClear : () => {
        $("#environment-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        $("#environment-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
};

const parkingSetting = {
    nonPayCheckedItems : [],
    payCheckedItems : [],
    searchText : "", //주민번호 마스킹 처리전 검색값
    parkingDocumentIds : {
        pageTypeRadioGroup : "#parking-tax-pay-type",

        nonPayGridDiv : "#parking-non-payment-grid-div",
        nonPayTotalDiv : "#parking-non-payment-total-div",
        nonPayGrid : "#parking-non-payment-grid",

        payGridDiv : "#parking-payment-grid-div",
        payTotalDiv : "#parking-payment-total-div",
        payGrid : "#parking-payment-grid",
    },
    smsText : "",

    widgetSetting : () => {
        $("#parking-search-condition-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : "주민번호", codeKey : "regNumber"},{codeNm : "법인번호", codeKey : "corporateNumber"},{codeNm : "사업자등록번호", codeKey : "businessNumber"}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            autoWidth: true,
            change : (e) => {
                $("#parking-search-text").data("kendoTextBox").value("");
                parkingSetting.searchText = ""; //검색 타입이 변할 경우 clear
                $("#administ-reg-no").val("");
            }
        });
        $("#parking-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#parking-search-btn").trigger("click");
            }else{
                parkingSetting.searchText = ""; //마스킹 된 값이 변할 경우 clear
                $("#administ-reg-no").val("");
                let words =  administUtils.commonSearchNumberFormatting(
                    $("#parking-search-condition-drop-down-list").data("kendoDropDownList").value(),
                    "#parking-search-text"
                );
                $("#parking-search-text").data("kendoTextBox").value(words);
            }
        });

        $("#parking-ars-btn").kendoButton({
            themeColor: "primary",
            click : () => {
                //dropdownlist 주민번호로 변경
                const dropDownList = $("#parking-search-condition-drop-down-list").data("kendoDropDownList");
                dropDownList.select(0);
                dropDownList.trigger("change");

                opener.String.singleStepConference("#administ-reg-no", "#parking-search-btn");
            }
        });
        $("#parking-reg-no-clear-btn").kendoButton({
            click : () => {
                $("#administ-reg-no").val("");
                $("#parking-search-text").data("kendoTextBox").value("");
                $("#parking-car-number-search-text").data("kendoTextBox").value("");
            }
        });

        $("#parking-car-number-search-text").kendoTextBox({
            size: 'small'
        }).on("keyup",(e) => {
            if (e.keyCode == 13) {
                $("#parking-search-btn").trigger("click");
            }
        });

        $("#parking-search-btn").kendoButton({
            themeColor:"secondary",
            icon: 'search',
            click : () => {

                if(!!$("#administ-reg-no").val()){
                    $("#parking-search-text").data("kendoTextBox").value($("#administ-reg-no").val());
                }

                const searchType = $("#parking-search-condition-drop-down-list").data("kendoDropDownList").value();
                let words = String($("#parking-search-text").val());

                if(searchType === "regNumber") {
                    if (words.length === 13) {
                        if ($("#administ-reg-no").val() === "") {
                            //주민번호에 13자리를 만족하며, 키보드로 주민번호를 입력하는 경우
                            $("#administ-reg-no").val(words);
                        }
                    }
                }

                if(!!$("#parking-search-text").data("kendoTextBox").value().trim() || $("#parking-car-number-search-text").data("kendoTextBox").value().trim()){
                    let numberCheck = false;
                    if(!!$("#parking-search-text").data("kendoTextBox").value().trim()){
                        //번호에 검색값이 있을 경우 자리수 체크
                        numberCheck = administUtils.commonSearchNumberCheck(
                            $("#parking-search-condition-drop-down-list").data("kendoDropDownList").value(),
                            "#parking-search-text"
                        );

                        if(numberCheck){
                            //입력한 번호의 유효성이 맞는 경우
                            cpProgress('parking');
                            administUtils.commonPageChange(parkingSetting.parkingDocumentIds, parkingSetting.nonPayCheckedTotalDivClear, parkingSetting.payCheckedTotalDivClear, parkingSetting.nonPaySetDataSource, parkingSetting.paySetDataSource);
                            //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                            parkingSetting.searchText = administUtils.commonMaskingRegNumber($("#parking-search-condition-drop-down-list").data("kendoDropDownList").value(),"#parking-search-text", parkingSetting.searchText);
                        }
                    }else{
                        cpProgress('parking');
                        administUtils.commonPageChange(parkingSetting.parkingDocumentIds, parkingSetting.nonPayCheckedTotalDivClear, parkingSetting.payCheckedTotalDivClear, parkingSetting.nonPaySetDataSource, parkingSetting.paySetDataSource);
                        //주민등록번호일 경우 마스킹 처리 후 마스킹 이전의 검색 값 저장
                        parkingSetting.searchText = administUtils.commonMaskingRegNumber($("#parking-search-condition-drop-down-list").data("kendoDropDownList").value(),"#parking-search-text", parkingSetting.searchText);
                    }
                }else{
                    message.notification({msg : "검색어는 필수입니다.", type : "error"});
                }

            },
        });

        $("#parking-tax-pay-type").kendoButtonGroup({
            items: [ {text: "미납", attributes: 'data-value=nonPay'}, {text:"납부", attributes: 'data-value=pay'} ],
            index: 0,
            layout: "horizontal"
        });

        $("#parking-non-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-non-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-non-payment-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-non-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });

        $("#parking-payment-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-payment-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-payment-checked-total-pay-case").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });
        $("#parking-payment-checked-total-pay").kendoTextBox({
            fillMode : "flat",
            readonly : true
        });

        $("#parking-non-sms-btn").kendoButton({
            themeColor : "primary",
            size : "small",
            click : () => {
                if(buttonGroupUtils.buttonGroupGetSelectedText(parkingSetting.parkingDocumentIds.pageTypeRadioGroup) === "미납") {
                    const rows = parkingSetting.checkedNonPaySms(parkingSetting.nonPayCheckedItems);
                    let smsText = "";

                    for (key in rows) {
                        if (rows[key][0] !== 0) smsText += "신한: " + key + " 납기후: " + rows[key][0] + "원" + "\n";
                    }

                    if (!!smsText) {
                        parkingSetting.smsText = administCode.SMS_BASE_TEXT["PARKING_SMS_TOP_TEXT"] + "\n" + smsText + administCode.SMS_BASE_TEXT["PARKING_SMS_BOTTOM_TEXT"];
                        $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                        $("#administ-sms-send-content").data("kendoTextArea").value(parkingSetting.smsText);
                        $("#administ-sms-send-content").trigger("keyup");
                        administSmsSetting.smsPhoneNumberSetting();
                    } else {
                        message.notification({msg: "가상계좌가 존재하지 않습니다.", type: "error"});
                    }
                }else{
                    const napbuPay = $("#parking-payment-checked-total-pay").data("kendoTextBox").value();
                    const text = "수납금액 : " + napbuPay;
                    parkingSetting.smsText = administCode.SMS_BASE_TEXT["PARKING_SMS_TOP_TEXT"] + text + administCode.SMS_BASE_TEXT["PARKING_SMS_BOTTOM_TEXT"];
                    $("#administ-sms-window").data("kendoWindow").refresh().center().open();
                    $("#administ-sms-send-content").data("kendoTextArea").value(parkingSetting.smsText);
                    $("#administ-sms-send-content").trigger("keyup");
                    administSmsSetting.smsPhoneNumberSetting();
                }
            },
        });
    },

    nonPayGrid : () => {
        $("#parking-non-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='parking-non-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md parking-non-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50
                },
                {
                    field: "violManNm",
                    title: "납세자명",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
                {
                    field: "mtrRegNo",
                    title: "차량번호",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "jbYmd",
                    title: "위반일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "violPlcNm",
                    title: "위반장소",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "ancYmd",
                    title: "고지일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "ancAmt",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.ancAmt)}</span>`;
                    },
                    width:150
                },
                {
                    field: "totalAmt",
                    title: "총액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.totalAmt)}</span>`;
                    },
                    width:150
                },
                {
                    field: "pymntDlnYmd",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "virAccNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'},
                },
                {
                    field: "atmtGubun",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
            ],
            dataSource: [],
            page : (e) => {
                //isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                $("#parking-non-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, parkingSetting.nonPayCheckedItems);
            },
            change : (e) => {
            },
            height: "90%",
            resizable: false,
            selectable: false,
        }).on("click", ".parking-non-payment-check", function (e) {
            parkingSetting.nonPayCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#parking-non-payment-grid",
                parkingSetting.nonPayCheckedItems,
                "#parking-non-payment-check-all"
            );
            parkingSetting.checkedNonPayTotalValue(parkingSetting.nonPayCheckedItems);
        }).on("change", "#parking-non-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.parking-non-payment-check');
        });
    },
    nonPaySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: parkingNonPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "주 정차 위반 과태료 미납 조회",
                        }
                        logParam.dataGb = $("#parking-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#parking-search-text").data("kendoTextBox").value();

                        if(!!$("#parking-car-number-search-text").data("kendoTextBox").value()){
                            logParam.dataGb = logParam.dataGb + " 차량번호 : " + $("#parking-car-number-search-text").data("kendoTextBox").value();
                        }

                        if(!!logParam.dataGb){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!parkingSetting.searchText ? parkingSetting.searchText : $("#parking-search-text").data("kendoTextBox").value(),
                        param2 : $("#parking-car-number-search-text").data("kendoTextBox").value().trim(),
                        param3 : "N",
                        param4 : "",
                        requiredUrlIndex : 8,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    violManNm : {type : 'string'}, //납세자명
                    mtrRegNo : {type : 'string'}, //차량번호
                    jbYmd : {type : 'string'}, //위반일자
                    violPlcNm : {type : 'string'}, //위반장소
                    ancYmd : {type : 'string'}, //고지일자
                    ancAmt : {type : 'string'}, //고지 금액
                    hadAmt : {type : 'string'}, //중가산금
                    addAmt : {type : 'string'}, //가산금
                    pymntDlnYmd : {type : 'string'}, //납기일자
                    virAccNo : {type : 'string'}, //가상계좌
                    atmtYn : {type : 'string'}, //압류여부 : 0:미압류 1:압류
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //전체금액
                    let totalNonPayCase = 0; //전체건수
                    let idIdx = 1;

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        switch (data.atmtYn) //압류여부
                        {
                            case "0":
                                data.atmtGubun = "미압류";
                                break;
                            case "1":
                                data.atmtGubun = "압류";
                                break;
                        }
                        data.totalAmt = Number(data.ancAmt) + Number(data.hadAmt) + Number(data.addAmt);
                        totalNonPayAmt += data.totalAmt;
                        data.totalAmt = String(data.totalAmt);
                        totalNonPayCase += 1;
                        data.jbYmd = data.jbYmd.substring(0,4) + '-' + data.jbYmd.substring(4,6) + '-' + data.jbYmd.substring(6,8);
                        data.ancYmd = data.ancYmd.substring(0,4) + '-' + data.ancYmd.substring(4,6) + '-' + data.ancYmd.substring(6,8);
                        data.pymntDlnYmd = data.pymntDlnYmd.substring(0,4) + '-' + data.pymntDlnYmd.substring(4,6) + '-' + data.pymntDlnYmd.substring(6,8);

                    })
                    !!totalNonPayCase ? $("#parking-non-payment-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayCase + "건")) : $("#parking-non-payment-total-pay-case").data("kendoTextBox").value("0건");
                    !!totalNonPayAmt ? $("#parking-non-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) :  $("#parking-non-payment-total-pay").data("kendoTextBox").value("0원");

                    parkingSetting.nonPayCheckedItems = [];
                    $("#parking-non-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('parking', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedNonPayTotalValue : (checkedItem) => {
        let totalNonPayAmt = 0; //전체금액
        let totalNonPayCase = 0; //전체건수

        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalNonPayAmt += Number(checkedItem[i].data.totalAmt);
                totalNonPayCase += 1;
            }
        }

        !!totalNonPayCase ? $("#parking-non-payment-checked-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayCase + "건")) : $("#parking-non-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        !!totalNonPayAmt ? $("#parking-non-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) :  $("#parking-non-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
    checkedNonPaySms : (checkedItem) => {
        const virAccNoGroup = {};
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                if(virAccNoGroup.hasOwnProperty(checkedItem[i].data.virAccNo)){
                    virAccNoGroup[checkedItem[i].data.virAccNo][0] += Number(checkedItem[i].data.totalAmt); //금액
                }else{
                    //새로운 계좌번호일 경우
                    virAccNoGroup[checkedItem[i].data.virAccNo] = [];
                    virAccNoGroup[checkedItem[i].data.virAccNo][0] = Number(checkedItem[i].data.totalAmt); //금액
                }
            }
        }
        return virAccNoGroup;
    },
    nonPayCheckedTotalDivClear : () => {
        $("#parking-non-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        $("#parking-non-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },

    payGrid : () => {
        $("#parking-payment-grid").kendoCpGrid({
            columns: [
                {
                    field: "select All",
                    headerTemplate: "<input type='checkbox' id='parking-payment-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md parking-payment-check'>";
                    },
                    attributes: {style: 'text-align:center'},
                    width:50,
                },
                {
                    field: "violManNm",
                    title: "납세자명",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
                {
                    field: "mtrRegNo",
                    title: "차량번호",
                    attributes: {style: 'text-align:center'},
                    width:120
                },
                {
                    field: "jbYmd",
                    title: "위반일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "violPlcNm",
                    title: "위반장소",
                    attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                },
                {
                    field: "ancYmd",
                    title: "고지일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "pymntDlnYmd",
                    title: "납기일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "ancAmt",
                    title: "금액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.ancAmt)}</span>`;
                    },
                    width:150
                },
                {
                    field: "totalAmt",
                    title: "총액",
                    attributes: {style: 'text-align:center'},
                    template: function (dataItem) {
                        return`<span>${administUtils.commonNumberFormatting(dataItem.totalAmt)}</span>`;
                    },
                    width:150
                },
                {
                    field: "recptYmd",
                    title: "납부일자",
                    attributes: {style: 'text-align:center'},
                    width:100
                },
                {
                    field: "virAccNo",
                    title: "가상계좌",
                    attributes: {style: 'text-align:center'},
                },
                {
                    field: "atmtGubun",
                    title: "압류여부",
                    attributes: {style: 'text-align:center'},
                    width:70
                },
            ],
            dataSource: [],
            page : (e) => {
                //isMessageReadType = false; //현재 grid 검색한 파라미터 유지
                $("#parking-payment-check-all").prop("checked", false); //check all checkbox 빼기
            },
            dataBound : (e) => {
                administUtils.commonGridDataBound(e, parkingSetting.payCheckedItems);
            },
            change : (e) => {
            },
            height: "90%",
            resizable: false,
            selectable: false,
        }).on("click", ".parking-payment-check", function (e) {
            parkingSetting.payCheckedItems = administUtils.commonGridSelectClick(
                this,
                "#parking-payment-grid",
                parkingSetting.payCheckedItems,
                "#parking-payment-check-all"
            );
            parkingSetting.checkedPayTotalValue(parkingSetting.payCheckedItems);
        }).on("change", "#parking-payment-check-all", (e) => {
            const checked = e.target.checked;
            administUtils.commonGridCheckAll(checked, '.parking-payment-check');
        });
    },
    paySetDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url: parkingPaymentUrl,
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    complete : (e) => {
                        const logParam = {
                            dataGb : "",
                            description : "주 정차 위반 과태료 미납 조회",
                        }
                        logParam.dataGb = $("#parking-search-condition-drop-down-list").data("kendoDropDownList").text() + " : " + $("#parking-search-text").data("kendoTextBox").value();

                        if(!!$("#parking-car-number-search-text").data("kendoTextBox").value()){
                            logParam.dataGb = logParam.dataGb + " 차량번호 : " + $("#parking-car-number-search-text").data("kendoTextBox").value();
                        }

                        if(!!logParam.dataGb){
                            new cpDataSource(METHOD.POST,privateLogInsertUrl,logParam).getDataSource().read();
                        }
                    }
                },

                parameterMap : (options) =>{
                    const param = {
                        param0 : PARAM_0,
                        //마스킹된 값으로 재검색할 시에 마스킹 이전의 값으로 검색
                        param1 : !!parkingSetting.searchText ? parkingSetting.searchText : $("#parking-search-text").data("kendoTextBox").value(),
                        param2 : $("#parking-car-number-search-text").data("kendoTextBox").value().trim(),
                        param3 : "Y",
                        param4 : PARAM_NAPBU_MONTH,
                        requiredUrlIndex : 9,
                    };
                    param.param1 = btoa(encodeURIComponent(param.param1));
                    param.param2 = btoa(encodeURIComponent(param.param2));
                    param.param3 = btoa(encodeURIComponent(param.param3));
                    param.param4 = btoa(encodeURIComponent(param.param4));
                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                model : {
                    violManNm : {type : 'string'}, //납세자명
                    mtrRegNo : {type : 'string'}, //차량번호
                    jbYmd : {type : 'string'}, //위반일자
                    violPlcNm : {type : 'string'}, //위반장소
                    ancYmd : {type : 'string'}, //고지일자
                    ancAmt : {type : 'string'}, //고지 금액
                    hadAmt : {type : 'string'}, //중가산금
                    addAmt : {type : 'string'}, //가산금
                    pymntDlnYmd : {type : 'string'}, //납기일자
                    recptYmd : {type : 'string'}, //납부일자
                    virAccNo : {type : 'string'}, //가상계좌
                    atmtYn : {type : 'string'}, //압류여부 : 0:미압류 1:압류
                },
                parse : (res) => {
                    let totalNonPayAmt = 0; //전체금액
                    let totalNonPayCase = 0; //전체건수
                    let idIdx = 1;

                    res.data.rows.forEach((data)=>{
                        data.id = idIdx;
                        idIdx += 1;
                        switch (data.atmtYn) //압류여부
                        {
                            case "0":
                                data.atmtGubun = "미압류";
                                break;
                            case "1":
                                data.atmtGubun = "압류";
                                break;
                        }
                        data.totalAmt = Number(data.ancAmt) + Number(data.hadAmt) + Number(data.addAmt);
                        totalNonPayAmt += data.totalAmt;
                        data.totalAmt = String(data.totalAmt);
                        totalNonPayCase += 1;
                        data.jbYmd = data.jbYmd.substring(0,4) + '-' + data.jbYmd.substring(4,6) + '-' + data.jbYmd.substring(6,8);
                        data.ancYmd = data.ancYmd.substring(0,4) + '-' + data.ancYmd.substring(4,6) + '-' + data.ancYmd.substring(6,8);
                        data.pymntDlnYmd = data.pymntDlnYmd.substring(0,4) + '-' + data.pymntDlnYmd.substring(4,6) + '-' + data.pymntDlnYmd.substring(6,8);
                        data.recptYmd = data.recptYmd.substring(0,4) + '-' + data.recptYmd.substring(4,6) + '-' + data.recptYmd.substring(6,8);

                    })
                    !!totalNonPayCase ? $("#parking-payment-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayCase + "건")) : $("#parking-payment-total-pay-case").data("kendoTextBox").value("0건");
                    !!totalNonPayAmt ? $("#parking-payment-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalNonPayAmt + "원")) :  $("#parking-payment-total-pay").data("kendoTextBox").value("0원");

                    parkingSetting.payCheckedItems = [];
                    $("#parking-payment-check-all").prop("checked", false); //check all checkbox 빼기

                    return res;
                }
            },
            requestEnd : (e) => {
                cpProgress('parking', false);
                if(e.response.data.resultCode === "9000" || e.response.data.resultCode === "9100"){
                    message.notification({msg:e.response.data.resultCode, type: "error"});
                }
            },
        })
    },
    checkedPayTotalValue : (checkedItem) => {
        let totalPayAmt = 0; //전체금액
        let totalPayCase = 0; //전체건수
        for(let i = 0; i<checkedItem.length; i++){
            if(checkedItem[i] === undefined){
                //값이 있는 배열인덱스까지
                continue;
            }else if(checkedItem[i].checked) {
                totalPayAmt += Number(checkedItem[i].data.totalAmt);
                totalPayCase += 1;
            }
        }

        !!totalPayCase ? $("#parking-payment-checked-total-pay-case").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayCase + "건")) : $("#parking-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        !!totalPayAmt ? $("#parking-payment-checked-total-pay").data("kendoTextBox").value(administUtils.commonNumberFormatting(totalPayAmt + "원")) :  $("#parking-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
    payCheckedTotalDivClear : () => {
        $("#parking-payment-checked-total-pay-case").data("kendoTextBox").value("0건");
        $("#parking-payment-checked-total-pay").data("kendoTextBox").value("0원");
    },
};

const administSmsSetting = {
    smsWindowPopupSetting : () => {
        $("#administ-sms-window").kendoWindow({
            width: "25%",
            height: "47%",
            visible : false,
            draggable: false,
            modal : true,
            title: "문자발송",
            content : {
                template: kendo.template($("#administ-sms-window-template").html())
            },
            open : () => {
                administSmsSetting.smsSendWindowOpen();
            }
        });
    },

    smsSendWindowOpen : () => {
        $("#administ-sms-condition-drop-down-list").kendoDropDownList({
            dataSource: [],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "flat",
            change : (e) => {
                const valid = $("#administ-sms-send-valid").data("kendoValidator");
                valid.reset();

                $("#administ-sms-receiver-number").data("kendoTextBox").value("");
                if(e.sender.value() === "telNumber"){
                    //수/발신번호
                    $("#administ-sms-receiver-number").data("kendoTextBox").value(opener.$("#consult-boundTel-number").val());
                    $("#administ-sms-receiver-number").data("kendoTextBox").readonly(true);
                }else if(e.sender.value() === "phoneNumber"){
                    //전화번호
                    $("#administ-sms-receiver-number").data("kendoTextBox").value(opener.$("#consult-phone-number").val());
                    $("#administ-sms-receiver-number").data("kendoTextBox").readonly(true);
                }else{
                    $("#administ-sms-receiver-number").data("kendoTextBox").readonly(false);
                }
            }
        });

        administSmsSetting.smsDropDownListSetting();


        $("#administ-sms-receiver-number").kendoTextBox({
            change : (e) =>{
                let value = e.value.replaceAll("-","");
                const maxLength = 11;
                if (value.length > maxLength) {
                    value = value.substring(0, maxLength);
                }
                e.sender.element.val(value.formatterHpNo());
            }
        });

        let valid = $("#administ-sms-send-valid").kendoValidator({
            errorTemplate: "",
            rules : {
                rule : (input) =>{
                    if(input.is("[name = administ-sms-condition-drop-down-list]")) {
                        if (input.data("kendoDropDownList").value() === "telNumber") {
                            if ($("#administ-sms-receiver-number").data("kendoTextBox").value() == "") return false;
                        }else if (input.data("kendoDropDownList").value() === "phoneNumber") {
                            if ($("#administ-sms-receiver-number").data("kendoTextBox").value() == "") return false;
                        }
                    }else if (input.is("[name = administ-sms-receiver-number]")){
                        if(input.val() === "") return false;
                    }else if (input.is("[name = administ-sms-send-content]")){
                        if(input.val() == "") return false;
                    }
                    return true;
                }
            },
        }).data("kendoValidator");

        $("#administ-sms-send-content").kendoTextArea({
            rows: 8,
            placeholder: "문자내용 입력..."
        }).on("keyup", (e)=>{
            valid.reset();
            administSmsSetting.calcContentByteLength();
        });

        $("#administ-sms-send-save").kendoButton({
            themeColor: "primary",
            click : (e) =>{
                if(valid.validate()) message.callBackConfirm({msg: "발송 하시겠습니까?", callback: administSmsSetting.smsSendInsert});
            }
        });
    },
    //sms byte check
    calcContentByteLength : () =>{
        const contents = $("#administ-sms-send-content").val();
        let cutString = administSmsSetting.smsContentsSet(contents);
        $("#administ-sms-send-content").val(cutString);
        $("#administ-sms-bytes").html("[" + byteCheck(cutString) + " / 2000] Bytes")
        if(byteCheck(cutString) >80){
            $("#administ-sms-type").html("LMS")
        }else{
            $("#administ-sms-type").html("SMS")
        }
    },
    smsContentsSet : (contents) =>{
        let str = contents;
        let sstr = '';
        for (let i=0; i<=str.length; i++) {
            if (byteCheck(str.substring(0,i)) > 2000) return sstr;
            sstr = str.substring(0,i);
        }
        return str;
    },

    smsSendInsert : () =>{
        let param = {
            custId : 0,
            custNm : "",
            smsTemplateId : 0,
            toTelNo : $("#administ-sms-receiver-number").val(),
            fromTelNo : $("#administ-sms-from-tel-no").val(),
            message : $("#administ-sms-send-content").val(),
            smsKind : $("#administ-sms-type").text() == "SMS" ? "Sms" : "Lms",
            srcId01 : "",
            srcId02 : "",
            srcId03 : ""
        }
        new cpDataSource(METHOD.POST, "consult/v1/administ/smsInsert",param).getDataSource().read().then(()=>{
            message.notification({msg:"발송 되었습니다." ,type:"success"});
            $("#administ-sms-window").data("kendoWindow").refresh().close();
        });
    },
    smsPhoneNumberSetting : () => {
        let telNumber = "";
        let phoneNumber = "";
        if(!!opener.$("#program-250").length){
            //상담메인이 열려있을 경우
            if(!!opener.$("#consult-boundTel-number").data("kendoTextBox") && !!opener.$("#consult-boundTel-number").val()){
                //휴대폰 textBox 존재 여부
                telNumber = opener.$("#consult-boundTel-number").val();
            }

            if(!!opener.$("#consult-phone-number").data("kendoTextBox") && !!opener.$("#consult-phone-number").val()){
                //휴대폰 textBox 존재 여부
                phoneNumber = opener.$("#consult-phone-number").val();
            }
        }
        if(!!telNumber){
            //값이 존재할 경우
            $("#administ-sms-receiver-number").data("kendoTextBox").value(telNumber);
            $("#administ-sms-receiver-number").trigger("change");
            $("#administ-sms-condition-drop-down-list").data("kendoDropDownList").value("telNumber"); //dropdownlist 전화번호로 변경
            $("#administ-sms-receiver-number").data("kendoTextBox").readonly(true);
        }else if(!!phoneNumber){
            //값이 존재할 경우
            $("#administ-sms-receiver-number").data("kendoTextBox").value(phoneNumber);
            $("#administ-sms-receiver-number").trigger("change");
            $("#administ-sms-condition-drop-down-list").data("kendoDropDownList").value("phoneNumber"); //dropdownlist 전화번호로 변경
            $("#administ-sms-receiver-number").data("kendoTextBox").readonly(true);
        }else{
            $("#administ-sms-condition-drop-down-list").data("kendoDropDownList").value("setNumber"); //dropdownlist 전화번호로 변경
        }
    },

    //상담메인의 수/발신번호, 휴대폰번호 여부에 따른 리스트 세팅
    smsDropDownListSetting : () => {
        const smsDropDownList = $("#administ-sms-condition-drop-down-list").data("kendoDropDownList");
        const smsDataSource = [{codeNm : "직접입력", codeKey : "setNumber"}]; //기본값

        if(!!opener.$("#program-250").length){
            //상담메인이 열려있을 경우
            if(!!opener.$("#consult-boundTel-number").data("kendoTextBox") && !!opener.$("#consult-boundTel-number").val()){
                //휴대폰 textBox 존재 여부
                smsDataSource.push({codeNm : "수/발신번호", codeKey : "telNumber"});
            }

            if(!!opener.$("#consult-phone-number").data("kendoTextBox") && !!opener.$("#consult-phone-number").val()){
                //휴대폰 textBox 존재 여부
                smsDataSource.push({codeNm : "전화번호", codeKey : "phoneNumber"});
            }
        }

        smsDropDownList.setDataSource(smsDataSource);
    }
};

const administUtils = {
    commonGridSelectClick : (thisObject, gridId, checkedItems, checkAllId) => {
        const checked = thisObject.checked;
        const row = $(thisObject).closest("tr");
        const grid = $(gridId).data("kendoCpGrid");
        const dataItem = grid.dataItem(row);
        checkedItems[dataItem.id] = {data : dataItem, checked : checked};
        if (checked) {
            row.addClass("k-state-selected");
            let checkHeader = true;

            $.each(grid.items(), function (index, item) {
                if (!($(item).hasClass("k-state-selected"))) {
                    checkHeader = false;
                }
            });
            $(checkAllId)[0].checked = checkHeader;
        } else {
            row.removeClass("k-state-selected");
            $(checkAllId)[0].checked = false;
        }
        return checkedItems;
    },

    commonGridCheckAll : (checked, selectCheckClass) => {
        $(selectCheckClass).each(function (idx, item) {
            if (checked) {
                if (!($(item).closest('tr').is('.k-state-selected'))) {
                    $(item).click();
                }
            } else {
                if ($(item).closest('tr').is('.k-state-selected')) {
                    $(item).click();
                }
            }
        });
    },

    //다른 grid page에 대한 체크여부 (callId required)
    commonGridDataBound : (e, checkedItems) => {
        const view = e.sender.dataSource.view();
        for (var i = 0; i < view.length; i++) {
            if (checkedItems[view[i].id] && checkedItems[view[i].id].checked) {
                e.sender.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".k-checkbox-md")
                    .attr("checked", "checked");
            }
        }
    },

    //1000단위 콤마 표시
    commonNumberFormatting : (numberString) => {
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    //주민번호(13), 법인번호(13), 사업자등록번호(10) 글자 수 제한
    commonSearchNumberFormatting : (searchType, textBoxId) => {
        let words = String($(textBoxId).val());
        words = words.replace(/[^0-9]/g,"");
        if(searchType === "regNumber" || searchType === "corporateNumber"){
            //주민번호 or 법인번호
            return words.substr(0,13);
        }else if(searchType === "businessNumber"){
            //사업자 등록번호
            return words.substr(0,10);
        }
    },

    //주민번호(13), 법인번호(13), 사업자등록번호(10) 글자 수 체크
    commonSearchNumberCheck : (searchType, textBoxId) => {
        let words = String($(textBoxId).val());
        let flag = false;
        let msg = "";
        $("#administ-search-tpye").val(searchType);
        if(searchType === "regNumber" || searchType === "corporateNumber"){
            //주민번호 or 법인번호
            if(words.length === 13){
                flag = true;
                $("#administ-reg-no").val(words);
            }else{
                flag = false;
                msg = "13자리를 입력해야 합니다.";
            }
        }else if(searchType === "businessNumber"){
            //사업자 등록번호
            if(words.length === 10){
                flag = true;
                $("#administ-reg-no").val(words);
            }else{
                flag = false;
                msg = "10자리를 입력해야 합니다.";
            }
        }else{
            flag = false;
            msg = "오류가 발생했습니다.";
        }

        if(flag === false){
            message.notification({msg : msg, type: "error"});
        }

        return flag;
    },

    //주민등록번호 마스킹
    commonMaskingRegNumber : (searchType, textBoxId, maskingBefText) => {
        let words = ($(textBoxId).data("kendoTextBox").value());
        if(searchType === "regNumber" && words.length === 13 && !words.includes("*******")){
            //검색타입이 주민번호이며, 13글자이며, 마스킹 처리가 안된 경우
            $(textBoxId).data("kendoTextBox").value(words.replace(/.{7}$/,"*******"));
            return words; //마스킹 이전의 검색값
        }else if(words.includes("*******")){
            //이미 마스킹 처리가 되어 있는 경우
            return maskingBefText;
        }else{
            return "";
        }
    },

    /**
     * 미납, 납부 변경 시
     * @param documentObj document Id obj
     * @param nonPayClearFunc 미납 선택항목 초기화 func
     * @param payClearFunc 납부 선택항목 초기화 func
     * @param nonPaySetDataSource 미납 grid dataSource
     * @param paySetDataSource 납부 grid dataSource
     */
    commonPageChange : (documentObj, nonPayClearFunc, payClearFunc, nonPaySetDataSource, paySetDataSource) => {
        if(buttonGroupUtils.buttonGroupGetSelectedText(documentObj.pageTypeRadioGroup) === "미납"){
            if($(documentObj.nonPayGridDiv).is(':visible') && $(documentObj.nonPayTotalDiv).is(':visible')){
                //이미 미납에 대한 화면인 경우
                $(documentObj.nonPayGrid).data("kendoCpGrid").setDataSource(nonPaySetDataSource());
                nonPayClearFunc();
            }else{
                //납부 화면이었던 경우(납부 -> 미납)
                $(documentObj.payGridDiv).hide();
                $(documentObj.payTotalDiv).hide();
                $(documentObj.payGrid).data("kendoCpGrid").setDataSource([]);

                $(documentObj.nonPayGridDiv).show();
                $(documentObj.nonPayTotalDiv).show();
                $(documentObj.nonPayGrid).data("kendoCpGrid").setDataSource(nonPaySetDataSource());
                nonPayClearFunc();
            }
        }else if(buttonGroupUtils.buttonGroupGetSelectedText(documentObj.pageTypeRadioGroup) === "납부"){
            if($(documentObj.payGridDiv).is(':visible') && $(documentObj.payTotalDiv).is(':visible')){
                //이미 납부에 대한 화면인 경우
                $(documentObj.payGrid).data("kendoCpGrid").setDataSource(paySetDataSource());
                payClearFunc();
            }else{
                //미납 화면이었던 경우(미납 -> 납부)
                $(documentObj.nonPayGridDiv).hide();
                $(documentObj.nonPayTotalDiv).hide();
                $(documentObj.nonPayGrid).data("kendoCpGrid").setDataSource([]);

                $(documentObj.payGridDiv).show();
                $(documentObj.payTotalDiv).show();
                $(documentObj.payGrid).data("kendoCpGrid").setDataSource(paySetDataSource());
                payClearFunc();
            }
            $(documentObj.payGrid).data("kendoCpGrid").refresh();
        }
    },

};

const administCode = {
    //세외수입 납부 -> 납부구분
    NAPBUGUBUN : {
        "01" : "OCR수납",
        "02" : "수기수납",
        "03" : "계좌이체",
        "04" : "세입정정",
        "05" : "배당",
        "06" : "자동이체",
        "07": "충당",
        "08" : "신용카드결제",
        "09" : "물납",
        "10" : "기타",
        "23" : "인터넷뱅킹수납",
        "31" : "금융결제원 인터넷지로",
        "32" : "CD/ATM기수납",
        "33" : "가상계좌수납",
        "41" : "신용카드단말기수납",
        "44" : "휴대폰수납",
        "50" : "간단e납부수납",
        "51" : "간단e납부수납 신용카드"
    },

    //환경개선부담금 세목코드
    TAX_CODE : {
        "12595921" : "자동차",
        "12595922" : "시설물",
    },

    SMS_BASE_TEXT : {
        WATER_SMS_TOP_TEXT : "",
        WATER_SMS_BOTTOM_TEXT : "",
        LOCAL_SMS_TOP_TEXT : "",
        LOCAL_SMS_BOTTOM_TEXT : "",
        NONTAX_SMS_TOP_TEXT : "",
        NONTAX_SMS_BOTTOM_TEXT : "",
        ENVIRONMENT_SMS_TOP_TEXT : "",
        ENVIRONMENT_SMS_BOTTOM_TEXT : "",
        PARKING_SMS_TOP_TEXT : "",
        PARKING_SMS_BOTTOM_TEXT : ""
    },

    smsBaseTextSetting : () => {
        let taxSmsMessage =  new cpDataSource(METHOD.GET, "/common/v1/code/TaxSmsMessage", {}).getDataSource();
        taxSmsMessage.read().then(()=>{
            const taxSmsDatas = taxSmsMessage.data();

            taxSmsDatas.forEach((data) => {
                switch (data.codeKey) //구분
                {
                    case "WaterFee":
                        administCode.SMS_BASE_TEXT.WATER_SMS_TOP_TEXT = data.codeValue_01;
                        administCode.SMS_BASE_TEXT.WATER_SMS_BOTTOM_TEXT = "\n" + data.codeValue_02;
                        break;
                    case "Local":
                        administCode.SMS_BASE_TEXT.LOCAL_SMS_TOP_TEXT = data.codeValue_01 + "\n";
                        administCode.SMS_BASE_TEXT.LOCAL_SMS_BOTTOM_TEXT ="\n" +  data.codeValue_02;
                        break;
                    case "NonTax":
                        administCode.SMS_BASE_TEXT.NONTAX_SMS_TOP_TEXT = data.codeValue_01 + "\n";
                        administCode.SMS_BASE_TEXT.NONTAX_SMS_BOTTOM_TEXT ="\n" +  data.codeValue_02;
                        break;
                    case "Environment":
                        administCode.SMS_BASE_TEXT.ENVIRONMENT_SMS_TOP_TEXT = data.codeValue_01;
                        administCode.SMS_BASE_TEXT.ENVIRONMENT_SMS_BOTTOM_TEXT ="\n" +  data.codeValue_02;
                        break;
                    case "CarViolation":
                        administCode.SMS_BASE_TEXT.PARKING_SMS_TOP_TEXT = data.codeValue_01;
                        administCode.SMS_BASE_TEXT.PARKING_SMS_BOTTOM_TEXT ="\n" +  data.codeValue_02;
                        break;
                }
            });

        })

    }

};


cpProgress('administ-layout');
administrative.init().then(()=>{
    cpProgress('administ-layout', false);
});