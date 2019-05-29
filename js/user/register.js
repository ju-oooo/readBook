(function () {
    let username = document.getElementById("username");
    let umsg = document.getElementById("umsg");
    /*光标移出username*/
    username.onblur = function () {
        let msg = '';
        let $unameVal = this.value;
        if ($unameVal) {
            msg = getType($unameVal);
            if (msg !== 'error') {
                msg = '账号格式正确';
                ajax_findUsername.call(umsg, $unameVal);
            } else {
                msg = '账号格式错误';
            }
        } else {
            msg = '账号不能为空'
        }
        umsg.innerText = msg
    }
    /*光标进入username*/
    username.onfocus = function () {
        umsg.innerText = '可使用 账号/手机号/邮箱/身份证号登录'
    }

    let password1 = document.getElementById("password1");
    let p1msg = document.getElementById("p1msg");
    /*光标移出password1*/
    password1.onblur = function () {
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
    password1.onfocus = function () {
        p1msg.innerText = '密码长度为6-12'
    }
    let password2 = document.getElementById("password2");
    let p2msg = document.getElementById("p2msg");
    /*光标移出password2*/
    password2.onblur = function () {
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
    password2.onfocus = function () {
        p2msg.innerText = '密码长度为6-12';
    }
    /*单击register*/
    let register = document.getElementById("register");
    register.onclick = function () {
        let data = {
            username: username.value,
            password1: password1.value,
            password2: password2.value
        }
        let msg = validateRegister(data);
        if (msg === 'success') {
            delete data.msg;
            ajax_register(data);
        } else {
            alert(msg)
        }
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


    /*格式验证*/
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

    /*检测用户名是否存在*/

    function ajax_findUsername(username) {
        let url = '/user/findUsername';
        let data = `username=${username}`;
        let xhr = getXhr({type: 'post', url: url, data: data});
        xhr.onload = function () {
            let result = JSON.parse(this.responseText);
            umsg.innerText = result.code === 200 ? '该账号已注册，请登录。。。' : '账号格式正确';
        }
    }

    /*注册*/
    function ajax_register(data) {
        let url = '/user/register'
        let formData = `username=${data.username}&password=${data.password1}`;
        let xhr = getXhr({type: 'post', url: url, data: formData});
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText)
                //暂未处理返回数据  跳转到首页
            }
        }
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

    /*封装xhr*/
    function getXhr({type, url, data}) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        if (type === 'post') {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);
        return xhr;
    }
})();