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
                ajax_findUsername($unameVal);
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

    let password = document.getElementById("password");
    let pmsg = document.getElementById("pmsg");
    /*光标移出password*/
    password.onblur = function () {
        let $upwdVal = this.value;
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
    password.onfocus = function () {
        pmsg.innerText = '密码长度为6-12'
    }

    /*单击login*/
    let login = document.getElementById("login");
    login.onclick = function () {
        let data = {username: username.value, password: password.value};
        let msg = validateLogin(data);
        if (msg === 'success') {
            ajax_login(data)
        } else {
            alert(msg)
        }
    }

    /*检测用户名是否存在*/
    function ajax_findUsername(username) {
        let url = '/user/findUsername';
        let formData = `username=${username}`;
        let xhr = getXhr({type: 'post', url: url, data: formData});
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                umsg.innerText = result.code === 200 ? "账号格式正确" : "该账号不存在，请注册。。。";
            }
        }
    }

    /*登录*/
    function ajax_login(data) {
        let url = '/user/login';
        let formData = `username=${data.username}&password=${data.password}`;
        let xhr = getXhr({type: 'post', url: url, data: formData});
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                if (result.code === 200) {
                    console.log(200)
                    open('../../book/book-index.html', "_self")
                } else {
                    alert(result.msg)
                }
            }
        }
    }

    /*格式验证*/
    function validateLogin({username, password}) {
        let msg;
        if (getType(username) !== 'error') {
            if (password) {
                msg = 'success';
            } else {
                msg = '密码格式错误';
            }
        } else {
            msg = '账号格式错误';
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
