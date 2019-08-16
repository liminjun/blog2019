var username = "admin";
var password = "123456";
var session = require('express-session');
var fs = require('fs');

//用户注册
module.exports.register = function (req, res) {
    var reqBody = req.body;

    var result = {};

    if (!req.is('application/json')) {
        res.status(415);
    } else {

        if (reqBody.username && reqBody.password) {
            var userItem = reqBody;
            const userList = JSON.parse(fs.readFileSync('./public_html/data/user/user.json', 'utf8'));

            result = {
                result: false,
                message: "当前用户名已经被注册!"
            }
            var isExist = false;//是否存在相同用户名的账号信息
            userList.forEach(element => {
                if (element.username == reqBody.username) {
                    isExist = true;
                } else {
                    isExist = false;
                }
            });


            if (!isExist) {
                userList.push(userItem);
                fs.writeFileSync('./public_html/data/user/user.json', JSON.stringify(userList));

                result = {
                    result: true,
                    message: "注册成功"
                }
            }



        } else {
            result = {
                result: false,
                message: "用户名和密码不能为空!"
            }
        }
    }

    res.send(result);
};
//用户登录
var findUser = function (username, password) {
    const userList = JSON.parse(fs.readFileSync('./public_html/data/user/user.json', 'utf8'));
    return userList.find(function (item) {
        return item.username === username && item.password === password;
    });
}
module.exports.login = function (req, res) {
    var reqBody = req.body;
    var session = req.session;
    var auth = false;
    if (!req.is('application/json')) {
        res.status(415);
    } else {
        if (findUser(reqBody.username, reqBody.password)) {
            session.regenerate(function (err) {
                if (err) {
                    return res.json({ success: false, message: '登录失败' });
                }
                req.session.loginUser = reqBody.username;
                res.json({ success: true, message: '登录成功' });
            })
        } else {
            res.json({ success: false, message: '账号或密码错误' });
        }
    }

}

//用户注销
module.exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.json({ success: false, message: '注销失败' });

        } else {
            res.clearCookie();
            //res.redirect('/');
            return res.json({ success: true, message: '注销成功' });
        }

    });
}