## 1.angularjs-blog
AngularJS Blog according to Learning AngularJS.

## 2.架构
AngularJS+BootStrap


## 3.部署平台
[BAE](http://cloud.baidu.com)

## 4.API

api地址：http://angularjsblog.duapp.com/api/
### 用户模块
- 注册
- 登录
- 注销

### 博客模块
- 博客列表
- 创建博客
- 博客详情
- 编辑博客
- 删除博客

### 博客评论
- 添加评论
- 删除评论


### 4.1登录
url:
`login`
参数：
username
password

测试账号必须是：admin 123456
### 4.2文章

#### 4.2.1获取文章详细信息
url:
`blog/blogId`

method:"GET"

返回数据：

```
{
    "introText": "文章标题",
    "blogText": "文章内容",
    "languageId": 1,
    "_id": "1471829247017",
    "date": "1471829247017",
    "comments": [
        {
            "commentText": "添加评论",
            "blog": "1471829247017",
            "id": 1471830144317
        }
    ]
}
```
id和date是通过`Date.now()`生成utc时间戳
===
#### 4.2.2新建文章

url:
`blog/blogId`

method:"POST"

参数：

```
{
    "introText": "文章标题",
    "blogText": "文章内容",
    "languageId": 1
}
```
#### 4.2.3获取文章列表

url:
`blogs`

method:"GET"

参数：
无

### 4.3评论
#### 4.3.1新建评论
url:
`comment/commentId`

method:"POST"

参数：

```
{
    "commentText": "评论内容",
    "blog": "blogId"//通过路由参数获取到博客的id
}
```