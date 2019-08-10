var fs = require('fs');


//保存开支
module.exports.save = function (req, res) {
    var expense = req.body;
    expense["id"] = req.params.id;
    fs.writeFileSync('./data/expense/' + req.params.id + '.json', JSON.stringify(expense));
    res.setHeader("Content-Type", "application/json");
    res.send(expense);
};
//获取所有的开支
module.exports.getAll = function (req, res) {
    var path = './data/expense';

    var files = [];
    try {
        files = fs.readdirSync(path);
    }
    catch (e) {
        console.log("error:" + e);
        res.send('[]');
        res.end();
    }
    var results = "[";
    if (files.length>0){
        for (var i = 0; i < files.length; i++) {
            if (files[i].indexOf(".json") == files[i].length - 5) {
                results += fs.readFileSync(path + "/" + files[i]) + ",";
            }
        }
        results = results.substr(0, results.length - 1);
    }

    results += "]";

    res.setHeader("Content-Type", "application/json");
    res.send(results);
    res.end();
}