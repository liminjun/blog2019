'use strict';

/* Services */

var blogBusinessServices = angular.module('blogBusinessServices', ['ngCookies']);

//保存用户凭证
blogBusinessServices.factory('setCreds',['$cookies',function($cookies){
    return function(username,password){
        var token=username.concat(":",password);
        $cookies.blogCreds=token;
        $cookies.blogUsername=username;
    }
}]);

//检查用户凭证
blogBusinessServices.factory('checkCreds',['$cookies',function($cookies){
    return function(){
        var result=false;
        var blogCreds=$cookies.blogCreds;
        if(blogCreds!==undefined&&blogCreds!==""){
            result=true;
        }
        return result;
    }
}]);
//删除用户凭证
blogBusinessServices.factory('deleteCreds',['$cookies',function($cookies){
    return function(){
        $cookies.blogCreds="";
        $cookies.blogUserName="";
    }
}]);

//获取用户认证凭据
blogBusinessServices.factory('getToken',['$cookies',function($cookies){
    return function(){
        var result="";
        var blogCreds=$cookies.blogCreds;
        if(blogCreds!==undefined&&blogCreds!==""){
            result=btoa(blogCreds);
        }
        return result;
    }
}]);

//获取用户认证凭据
blogBusinessServices.factory('getUsername',['$cookies',function($cookies){
    return function(){
        var result="";
        var blogUsername=$cookies.blogUsername;
        if(blogUsername!==undefined&&blogUsername!==""){
            result=blogUsername;
        }
        return result;
    }
}]);