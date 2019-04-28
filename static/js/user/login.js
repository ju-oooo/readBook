/*光标移出username*/
function username_blur() {
    let $unameVal = username.value;
    let msg;
    if ($unameVal) {
        msg = getType($unameVal)
        if (msg !== 'error') {
            msg = '账号格式正确';

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

/*光标移出password*/
function password_blur() {
    let $upwdVal = password.value;
    let msg = '';
    if ($upwdVal) {
        // msg = getType($upwdVal)
        if (msg === 'error') {
            msg = '密码格式错误';
        } else {
            msg = '密码格式正确'
        }
    } else {
        msg = '密码不能为空'
    }
    pmsg.innerText = msg

}

/*光标进入password*/
function password_focus() {
    pmsg.innerText = '密码长度为6-12'
}

function login() {
    let $uname = username.value;
    let $upwd = password.value;
    let data = {username: $uname, password: $upwd};
    let msg = validateLogin(data);
    if (msg === 'success') {
        ajax_login(data)
    } else {
        alert(msg)
    }

}

function ajax_login(data) {

    let url = '/user/login';
    let formData = `username=${data.username}&password=${data.password}`;
    let xhr = getXhr('post',url,formData);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
            //    暂未处理返回数据  跳转到首页
        }
    }
}


/*登录格式验证*/
function validateLogin(data) {
    let msg;
    if (getType(data.username) !== 'error') {
        if (data.password) {
            msg = 'success';
        } else {
            msg = '密码格式不正确';
        }
    } else {
        msg = '用户名格式不正确';
    }
    return msg;
}

/*获取username类型*/
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