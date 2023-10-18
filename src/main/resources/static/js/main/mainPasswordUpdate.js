$(document).ready(function () {

    let $loginForm = $("#home-user-password-out-form");
    let validatable = $loginForm.kendoValidator({
        validationSummary: false,
        validateOnBlur: true,
        validate: function (e) {
            console.debug(e);
        },
        rules: {
            greaterdate: function (input) {
                if (input.is("[name='userPwdChange']") && input.val() !== "") {
                    let userCd = $('#userCd').val();
                    return validationPassword(input,'home-user-password-out-form',userCd);
                }
                return true;
            }
        }
    }).data("kendoValidator");

    $("#loginBtn").kendoButton({
        themeColor: "primary",
        badge: {
            size: 300
        },
        click: function () {
            if (validatable.validate()) {
                let msg = {title: document.title, msg: '패스워드 변경 하겠습니까?', callback: update};
                message.callBackConfirm(msg);
            }
        }
    });

    const update = () => {
        let passwordUpdateUrl = '/auth/user/password';
        new kendo.data.DataSource({
            transport: {
                read: {
                    "url": passwordUpdateUrl,
                    "type": 'PUT',
                    "dataType": "json",
                    "contentType":'application/json'
                },
                parameterMap: function (data, type) {
                    if (type === 'read') {
                        return JSON.stringify($(`#home-user-password-out-form`).serializeJSON());
                    }
                }
            },
            schema: {
                data: function (response) {
                    if (response?.success) {
                        message.callBackAlert({msg: '패스워드가 변경 되었습니다. 재 로그인을 하십시요' , callback: goAuth})
                    } else if (response?.success === false){
                        message.callBackAlert({msg: response.message})
                    }
                    return [];
                }
            },
            error:function (e){
                let error = e.xhr?.responseJSON || e.responseJSON || {message: '오류가 발생하였습니다.'};
                message.callBackAlert({msg: error.message})
            }
        }).read();
    }

    const goAuth = () => {
      window.location.href='/auth';
    }

    const message = {
        callBackAlert: function (obj) {
            let opt = $.extend({title: document.title, msg: '처리하겠습니까?', callback: ''}, obj);
            let $div = $('<div id = "callBackAlert"></div>');
            $('body').append($div);
            $($div).kendoDialog({
                title: opt.title,
                content: opt.msg,
                minWidth: 300,
                minHeight: 100,
                closable: false,
                actions: [
                    {
                        text: '확인',
                        action: function () {
                            if (typeof (opt.callback) === 'function') {
                                opt.callback.call();
                            }
                            return true;
                        },
                        primary: true
                    }
                ],
                close: function () {
                    $($div).data('kendoDialog').destroy();
                }
            });
        },
        callBackConfirm: function (obj) {
            let opt = $.extend({title: document.title, msg: '처리하겠습니까?', callback: ''}, obj);
            let $div = $('<div id="callBackConfirm"></div>');
            $('body').append($div);
            $($div).kendoDialog({
                title: opt.title,
                content: opt.msg,
                minWidth: 300,
                minHeight: 150,
                closable: false,
                actions: [
                    {text: '취소'},
                    {
                        text: '확인',
                        action: function () {

                            if (typeof opt.callback === 'function') {
                                opt.callback.call();

                            }

                            return true;
                        },
                        primary: true
                    }
                ],
                close: function () {
                    $($div).data('kendoDialog').destroy();
                }
            });
        }
    }
    message.callBackAlert({msg: '패스워드를 변경 하여야 합니다.'});
});
