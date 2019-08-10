var username="admin";
var password="123456";


module.exports.login = function (req, res) {
    var reqBody = req.body;
    var auth = false;
    if (!req.is('application/json')) {
        res.status(415);
    } else {
        if (reqBody.username === username && reqBody.password === password) {
            auth = true;
        }
    }
    var returnVal = {
        "authenticated": auth
    };
    res.send(returnVal);
}