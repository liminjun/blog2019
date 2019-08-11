var http = require('http');
var session = require('express-session');

var port = 5050;

var express = require('express');

var path = require('path');

var blogs = require('./blogs');
var user = require('./user');


var expense = require('./expense');
var profile = require('./profile');


var bodyParser = require('body-parser');

var app = express();
var rootPath = path.normalize(__dirname + "/");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/public_html'));


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.post('/api/login', user.login);
app.post('/api/register',user.register)
// app.post('/api/logout',user.logout);

app.get('/api/blog/:id', blogs.get);
app.post('/api/blog/:id', blogs.post);
app.get('/api/blogs/', blogs.getAll);


app.get('/api/blog/:id', blogs.get);
app.post('/api/blog/:id', blogs.post);
app.get('/api/blogs/', blogs.getAll);

//profile
app.get('/api/profile/:id', profile.get);
app.post('/api/profile/:id', profile.save);


app.post('/api/comment/:id', blogs.saveComment);
// app.post('/api/comment/list',blogs.commentList);

app.get('/api/test/', function (req, res) {

    var returnVal = {
        "status": "ok"
    };
    res.send(returnVal);
});

app.get("*", function (req, res) {
    res.sendFile(rootPath + '/public_html');
})

app.listen(port);
console.log("Listening on port:5050,entery Ctrl+C to stop the server.");