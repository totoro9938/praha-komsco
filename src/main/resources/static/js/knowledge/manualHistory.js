const manualHistorySelectItemUrl = "/knowledge/v1/manual-history/select/item";

const manualHistory = {
    init :async () => {
        manualHistorySetting.widgetSetting();
        await manualHistorySetting.dataSetting();
    }
}

const manualHistorySetting = {
    widgetSetting : () => {
        const manualContentsEditor = new CpEditor('manual-history-contents');
        manualContentsEditor.create();
        manualContentsEditor.editorHide();

        $('#manual-history-splitter').kendoSplitter({
            orientation: 'vertical',
            panes: [
                { collapsible: false, resizable: false },
                { collapsible: false, size: '150px', resizable: false }
            ]
        });

        $('#manual-history-information-department').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#manual-history-information-chargeNm').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#manual-history-information-telNo').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#manual-history-information-regDt').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });

        $('#manual-history-information-mdfDt').kendoTextBox({
            fillMode: 'flat',
            readonly: true
        });
    },

    dataSetting :async () => {
        let getManualDataSource = new cpDataSource(METHOD.GET, manualHistorySelectItemUrl, {
            manualId: Number(opener.$("#manual-detail-history-manual-id").val()),
            manualIdx: Number(opener.$("#manual-detail-history-manual-idx").val()),
        }).getDataSource();

        await getManualDataSource.read().then(() => {
            let data = getManualDataSource.data()[0];
            $("#manual-history-contents").data("kendoEditor").value(data.html);
            $('#manual-history-title').text(data.title);
            $('#manual-history-call-cat').text(data.fullCatNm)
            $('#manual-history-importance').html(manualHistorySetting.badgeImportance(data.importance));

            data.telNo = data.telNo == null ? '' : formatterHpNo(data.telNo);
            data.regDt = data.regDt == null ? '' : kendo.toString(new Date(data.regDt), 'yyyy-MM-dd HH:mm');
            data.mdfDt = data.mdfDt == null ? '' : kendo.toString(new Date(data.mdfDt), 'yyyy-MM-dd HH:mm');

            $('#manual-history-information-department').data('kendoTextBox').value(data.deptNm);
            $('#manual-history-information-chargeNm').data('kendoTextBox').value(data.chargeNm);
            $('#manual-history-information-regDt').data('kendoTextBox').value(data.regDt);
            $('#manual-history-information-mdfDt').data('kendoTextBox').value(data.mdfDt);
            $('#manual-history-information-telNo').data('kendoTextBox').value(data.telNo);
        });


    },

    badgeImportance: (importance) => {
        if (importance === 'H') {
            return '<span class="k-badge k-badge-solid k-badge-error k-badge-md k-badge-rounded k-badge-inline">상</span>';
        } else if (importance === 'M') {
            return '<span class="k-badge k-badge-solid k-badge-warning k-badge-md k-badge-rounded k-badge-inline">중</span>';
        } else if (importance === 'L') {
            return '<span class="k-badge k-badge-solid k-badge-success k-badge-md k-badge-rounded k-badge-inline">하</span>';
        }
    },
}

cpProgress('manual-history-layout');
manualHistory.init().then(()=>{
    cpProgress('manual-history-layout', false);
});