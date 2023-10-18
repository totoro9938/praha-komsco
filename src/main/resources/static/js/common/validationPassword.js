const validationPassword = (input, form = undefined,userCd = undefined) => {
    let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}$/;
    let reg2 = /(\w)\1\1\1/;
    let comUserCd = userCd ? userCd:USER_INFO.userCd;
    if (form) {
        let param = $(`#${form}`).serializeJSON();

        if (param.password !== param.userPwdChange) {
            return msg("패스워드가 일치하지 않습니다.");
        }
    }
    if (!reg.test(input.val())) {
        return msg("비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상이어야 합니다.");
    }
    if (reg2.test(input.val())) {
        return msg("비밀번호에 동일한 문자를 과도하게 연속해서 사용할 수 없습니다.");
    }
    if (input.val().indexOf(comUserCd) >= 0) {
        return msg("비밀번호에 ID를 포함할 수 없습니다.");
    }
    function msg(msg){
        input.attr("data-greaterdate-msg", msg);
        return false;
    }
    return true;
}
