/*光标移出username*/
function username_blur() {
    let $unameVal = username.value;
    let msg;
    if ($unameVal) {
        msg = getType($unameVal)
        if (msg !== 'error') {
            //进入ajax验证
            msg = '账号格式正确';
            if (ajax_username($unameVal, umsg)) {
                msg = '该账号已注册，请登录。。。';
            }
        } else {
            msg = '账号格式错误';
        }
    } else {
        msg = '账号不能为空'
    }
    umsg.innerText = msg
}

/*光标进入username*/
function username_focus() {
    umsg.innerText = '可使用 账号/手机号/邮箱/身份证号登录'
}

/*光标移出password1*/
function password1_blur() {
    let $upwdVal = password1.value;
    let msg = '';
    if ($upwdVal) {
        // 正则验证密码
        if (msg !== 'error') {
            let $upwd2Val = password2.value;
            if ($upwd2Val) {
                password_consistent($upwd2Val, $upwdVal);
                return;
            } else {
                msg = '密码格式正确'
            }
        } else {
            msg = '密码格式错误';
        }
    } else {
        msg = '密码不能为空'
    }
    p1msg.innerText = msg

}

/*光标进入password1*/
function password1_focus() {
    p1msg.innerText = '密码长度为6-12'
}

/*光标移出password2*/
function password2_blur() {
    let $upwdVal = password2.value;
    let msg = '';
    if ($upwdVal) {
        // msg = getType($upwdVal)
        if (msg !== 'error') {
            let $upwd1Val = password1.value;
            if ($upwd1Val) {
                password_consistent($upwd1Val, $upwdVal);
                return;
            } else {
                msg = '密码格式正确'
            }
        } else {
            msg = '密码格式错误';
        }
    } else {
        msg = '密码不能为空'
    }
    p2msg.innerText = msg

}

/*光标进入password2*/
function password2_focus() {
    p2msg.innerText = '密码长度为6-12'
}

/*判断密码是否一致*/
function password_consistent($upwd1Val, $upwd2Val) {
    let msg;
    if ($upwd1Val === $upwd2Val) {
        msg = '密码格式正确'
    } else {
        msg = '两次密码不一致'
    }
    p1msg.innerText = msg
    p2msg.innerText = msg
}

function register() {
    let $unameVal = username.value;
    let $upwd1Val = password1.value;
    let $upwd2Val = password2.value;
    let data = {
        username: $unameVal,
        password1: $upwd1Val,
        password2: $upwd2Val
    }
    let msg = validateRegister(data);
    if (msg === 'success') {
        delete data.msg;
        ajax_register(data);
    } else {
        alert(msg)
    }
}

/*登录格式验证*/
function validateRegister(data) {
    let username = data.username;
    let password1 = data.password1;
    let password2 = data.password2;
    let msg = 'error';
    if (getType(username) !== 'error') {
        if (password1 && password2) {
            if (password1 === password2) {
                msg = 'success';
            } else {
                msg = '两次密码不一致';
            }
        } else {
            msg = '密码格式不正确';
        }
    } else {
        msg = '用户名格式不正确';
    }
    return msg;
}

function ajax_username(username, msg) {
    let url = 'user/findUsername';
    let data = `username=${username}`;
    let xhr = getXhr('post', url, data);
    xhr.onload = function () {
        let result = JSON.parse(this.responseText);
        return msg.innerText = result.code === 200 ? '该账号已注册，请登录。。。' : '账号格式正确';
    }
}

function ajax_register(data) {
    let url = '/user/register'
    let formData = `username=${data.username}&password=${data.password1}`;
    let xhr = getXhr('post', url, formData);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            //暂未处理返回数据  跳转到首页
        }
    }
}

function getType(param) {
    if (/^\d{10}$/.test(param)) {
        return 'username';
    } else if (/^1[34578]\d{9}$/.test(param)) {
        return 'phone';
    } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(param)) {
        return 'card';
    } else if (/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/.test(param)) {
        return 'email';
    } else {
        return 'error';
    }
}

//简单封装xhr
function getXhr(type, url, data) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    if (type === 'post') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }
    xhr.send(data);
    return xhr;
}