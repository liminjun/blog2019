var fs = require('fs');

//保存个性化信息
module.exports.save = function (req, res) {
    var profile = req.body;
    debugger;
    fs.writeFileSync('./data/profile/' + req.params.id + '.json', JSON.stringify(profile));
    res.setHeader("Content-Type", "application/json");
    var result = {
        success: true,
        message: "保存个性化成功"
    };
    res.send(result);
};
//获取个性化信息
module.exports.get = function (req, res) {
    var userId = req.params.id;

    var blog = JSON.parse(fs.readFileSync('./data/profile/' + userId + '.json', 'utf8'));

    res.setHeader("Content-Type", "application/json");
    res.send(blog);
}