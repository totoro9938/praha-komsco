class CpEditor {
    defaultOptions = {
        messages: {
            fontNameInherit: '굴림체',
            fontSizeInherit: '기본(10pt)'
        },
        tools: [
            {
                name: "fontName",
                items: [
                    { text: "본고딕", value: "Noto Sans KR" },
                    { text: "나눔고딕", value: "NanumGothic" },
                    { text: "고운바탕", value: "고운바탕"},
                    { text: "궁서체", value: "궁서체" }
                ]
            },
            {
                name: "fontSize",
                items: [
                    { text: "9pt", value: "9pt" },
                    { text: "10pt", value: "10pt" },
                    { text: "11pt", value: "11pt" },
                    { text: "12pt", value: "12pt" },
                    { text: "13pt", value: "13pt" },
                    { text: "14pt", value: "14pt" },
                    { text: "15pt", value: "15pt" },
                    { text: "16pt", value: "16pt" },
                    { text: "17pt", value: "17pt" },
                    { text: "18pt", value: "18pt" },
                    { text: "24pt", value: "24pt" },
                    { text: "36pt", value: "36pt" }
                ],
            },
            "bold",
            "italic",
            "underline",
            "undo",
            "redo",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "insertUnorderedList",
            "createLink",
            "unlink",
            "tableWizard",
            "tableProperties",
            "tableCellProperties",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "mergeCellsHorizontally",
            "mergeCellsVertically",
            "splitCellHorizontally",
            "splitCellVertically",
            "tableAlignLeft",
            "tableAlignCenter",
            "tableAlignRight",
            "viewHtml",
            {
                name: "foreColor",
                palette: "basic",
                columns: 10
            },
            {
                name: "backColor",
                palette: "basic",
                columns: 10
            }
        ],
        execute: function (e) {
            let editor = this;
            if (e.name == "createtable") {
                setTimeout(function () {
                    var table = $(editor.body).find("table:not(.custom-table)");
                    table.addClass("custom-table");
                    table.attr("style", "border: 1px solid black; border-collapse: collapse;");
                    table.find("tr td").each(function () {
                        var currentStyle = $(this).attr("style");
                        $(this).attr("style", currentStyle + " border: 1px solid black;");
                    });
                }, 0);
            }
        },
        pasteCleanup: {
            none: true,
            custom: function(html) {
                return html.replaceAll('<td ', '<td style="border:1px solid black;" ');
            }
        }
        // ,
        // paste: function(e) {
        //     console.log(e.html);
        // }
    }

    constructor(selector,options={}) {
        this.selector = selector;
        this.defaultOptions.tools.push({
                    name: "c-cardImage",
                    tooltip: "이미지추가",
                    exec: function(e) {
                        let uploadInput = $("<input type='file' />");
                        uploadInput.click();
                        uploadInput.on("change", uploadInputChange);
                        function uploadInputChange (ev) {
                            if (this.files && this.files[0]) {
                                let reader = new FileReader();

                                reader.onload = imageIsLoaded;
                                reader.readAsDataURL(this.files[0]);
                                window.UPLOAD_TO_DESTROY = this;
                            }
                        }

                        function imageIsLoaded (ev) {
                            console.log(selector);
                            let editor = $(`#${selector}`).data("kendoEditor");
                            let base64Src = ev.target.result;
                            let img = $("<img src='" + base64Src + "' />")[0];

                            editor.paste(img.outerHTML);
                            img.remove();

                            if (UPLOAD_TO_DESTROY) {
                                $(UPLOAD_TO_DESTROY).off("change");
                                $(UPLOAD_TO_DESTROY).remove();
                            }
                        }
                    }
                });
        this.options = $.extend(this.defaultOptions,options);
    }

    create() {
        const editor = $(`#${this.selector}`).kendoEditor(this.options);
        $(editor.data("kendoEditor").body)
            .prevAll("head")
            .append("<link rel='stylesheet' href='/css/editor/nanum-gothic.css'>")
            .append("<link rel='stylesheet' href='/css/editor/gowun-batang.css'>")
        let editorBody = $('.k-editable-area iframe').contents().find('body');
        editorBody.css('font-family', '굴림체');
        editorBody.css('font-size', '10pt');

        return editor;
    }

    editorHide() {
        const editor = $(`#${this.selector}`).data("kendoEditor");
        const editorBody = $(editor.body);
        editorBody.removeAttr("contenteditable").find("a").on("click.readonly", false);
        $('.k-editor-toolbar').hide();
    }

    editorShow() {
        const editor = $(`#${this.selector}`).data("kendoEditor");
        const editorBody = $(editor.body);
        editorBody.attr("contenteditable", true).find("a").off("click.readonly");
        $('.k-editor-toolbar').show();
    }

}

