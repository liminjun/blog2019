var fs = require('fs');

module.exports.get = function (req, res) {
    var blogId = req.params.id;
    var blog = JSON.parse(fs.readFileSync('./public_html/data/blog/' + blogId + '.json', 'utf8'));

    fs.exists('./public_html/data/comment/' + blogId + '.json', function (exists) {
        
        if (exists) {
            var comment = JSON.parse(fs.readFileSync('./public_html/data/comment/' + blogId + '.json', 'utf8'));
            blog["comments"] = comment;
        } else {
            blog["comments"] = [];
        }
        console.log(blog);
        res.setHeader("Content-Type", "application/json");
        res.send(blog);
    });




}

module.exports.post = function (req, res) {
    var blog = req.body;
    blog["_id"] = req.params.id;
    blog["date"] = req.params.id;

    fs.writeFileSync('./public_html/data/blog/' + req.params.id + '.json', JSON.stringify(blog));
    res.setHeader("Content-Type", "application/json");
    res.send(blog);
};
//保存评论
module.exports.saveComment = function (req, res) {
    var reqBody = req.body;
    var success = false;
    var id = -1;

    if (req.is('application/json')) {
        var comment = req.body;
        comment["id"] = Date.now();
        id = comment["id"];
        var commentArr = [];
        commentArr.push(comment);
        var commentJson = JSON.stringify(commentArr);
        console.log("new comment: " + commentJson);
        var blogId = req.params.id;

        fs.exists('./public_html/data/comment/' + blogId + '.json', function (exists) {
            
            if (exists) {
                var commentList = JSON.parse(fs.readFileSync('./public_html/data/comment/' + blogId + '.json', 'utf8'));
                commentList.push(comment);
                fs.writeFileSync('./public_html/data/comment/' + blogId + '.json', JSON.stringify(commentList));
            } else {
                fs.writeFileSync('./public_html/data/comment/' + blogId + '.json', commentJson);
            }
        });
        //评论文件已经存在，追加评论到评论列表

        res.setHeader("Content-Type", "application/json");
        success = true;
        res.status(200);
    } else {
        res.status(415);
    }

    var returnVal = {
        "success": success,
        "id": id
    };
    res.send(returnVal);
}
//获取所有blog数据
module.exports.getAll = function (req, res) {
    var path = './public_html/data/blog';

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