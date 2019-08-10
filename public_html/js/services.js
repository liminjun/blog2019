'use strict';

/* Services */

var blogServices = angular.module('blogServices', ['ngResource']);

var serverUrl=".";
//发表博客
blogServices.factory('BlogPost', ['$resource',
    function ($resource) {
        return $resource(serverUrl+"/api/blog/:id", {}, {
            get: { method: 'GET', cache: false, isArray: false },
            save: { method: 'POST', cache: false, isArray: false },
            update: { method: 'PUT', cache: false, isArray: false },
            delete: { method: 'DELETE', cache: false, isArray: false }
        });
    }]);
//博客列表
blogServices.factory('BlogList', ['$resource', function ($resource) {
    return $resource(serverUrl+"/api/blogs", {}, {
        get: { method: 'GET', cache: false, isArray: true }
    });
}]);
//用户登录
blogServices.factory('Login', ['$resource', function ($resource) {
    return $resource(serverUrl+"/api/login", {}, {
        login: { method: "POST", cache: false, isArray: false }
    });
}]);
//发表评论
blogServices.factory('BlogPostComments', ['$resource', function ($resource) {
    return $resource(serverUrl+"/api/comment/:id", {}, {
        save: { method: "POST", cache: false, isArray: false }
    });
}]);