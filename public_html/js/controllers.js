'use strict';

/* Controllers */

var blogControllers = angular.module('blogControllers', []);



blogControllers.controller('BlogCtrl', ['$scope', 'BlogList', 'checkCreds', '$location',
    function BlogList($scope, BlogList, checkCreds, $location) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        BlogList.get({}, function (response) {
            if (response.success) {
                $scope.blogList = response.entity;
            } else {
                $scope.blogList = [];
            }

        }, function (error) {
            console.log("Error:" + JSON.stringify(error));
        });
        // $scope.blogList = [
        //     {
        //         "_id": 1,
        //         "date": 1400623623107,
        //         "introText": "This is a blog post about AngularJS. We will cover how to build",
        //         "blogText": "This is a blog post about AngularJS. We will cover how to build a blog and how to add comments to the blog post."
        //     },
        //     {
        //         "_id": 2,
        //         "date": 1400267723107,
        //         "introText": "In this blog post we will learn how to build applications based on REST",
        //         "blogText": "In this blog post we will learn how to build applications based on REST web services that contain most of the business logic needed for the application."
        //     }
        // ];



    }]);

blogControllers.controller('BlogViewCtrl', ['$scope', '$routeParams', 'BlogPost', 'BlogPostComments', '$location', 'checkCreds', '$http', 'getToken', '$route',
    function BlogViewCtrl($scope, $routeParams, BlogPost, BlogPostComments, $location, checkCreds, $http, getToken, $route) {
        // if (!checkCreds()) {
        //     $location.path('/login');
        // }

        var blogId = $routeParams.id;
        $scope.blg = 1;

        BlogPost.get({ id: blogId }, function (response) {
            $scope.blogEntry = response;
            $scope.blogId = response._id;
        }, function (error) {
            console.log("Error:" + JSON.stringify(error));
        });

        //提交评论
        $scope.submit = function () {
            $scope.sub = true;
            $http.defaults.headers.common['Authorization'] = 'Basic' + getToken();
            var postData = {
                "commentText": $scope.commentText,
                "blog": $scope.blogId
            };
            BlogPostComments.save({ id: $scope.blogId }, postData, function (response) {
                $location.path("/blogPost/" + $scope.blogId);
                $route.reload();
            }, function (error) {
                console.log("Error:" + JSON.stringify(error));
            });
        }

    }]);

//新建博客控制器
blogControllers.controller('NewBlogPostCtrl', ['$scope', '$routeParams', 'BlogPost', 'checkCreds', '$http', 'getToken', '$location', function ($scope, $routeParams, BlogPost, checkCreds, $http, getToken, $location) {
    if (!checkCreds()) {
        $location.path("/login");
    }
    $scope.languageList = [
        {
            "id": 1,
            "name": "中文简体"
        },
        {
            "id": 2,
            "name": "English"
        }
    ];
    $scope.languageId = 1;
    $scope.newACtiveClass = "active";
    $scope.submit = function () {
        $scope.sub = true;

        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
        var postData = {
            "introText": $scope.introText,
            "blogText": $scope.blogText,
            "languageId": $scope.languageId
        };
        var blogId = Date.now();
        BlogPost.save({ id: blogId }, postData, function (response) {
            console.log("Success:" + JSON.stringify(response));
            $location.path("/");
        }, function (errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        });
    }
}]);

blogControllers.controller('LoginCtrl', ['$scope', '$location', 'Login', 'setCreds', function BlogViewCtrl($scope, $location, Login, setCreds) {
    $scope.submit = function () {
        $scope.sub = true;
        var postData = {
            "username": $scope.username,
            "password": $scope.password
        };

        Login.login({}, postData, function (response) {
            if (response.success) {
                setCreds($scope.username, $scope.password);
                $location.path("/");
            } else {
                $scope.error = "Login Failed";
            }
        }, function (error) {
            console.log("Error:" + JSON.stringify(error));
        })
    }
}]);


blogControllers.controller('LogoutCtrl', ['$scope', '$location', 'Loginout', 'deleteCreds', function ($scope, $location, Loginout, deleteCreds) {
    Loginout.logout({}, function (response) {
        debugger;
        if (response.success) {
            debugger;
            deleteCreds();
            $location.path("/login");
        } else {
            alert("注销失败");
        }
    }, function (error) {
        console.log("Error:" + JSON.stringify(error));
    })



}]);


blogControllers.controller('AboutCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.version="v2.0";
}]);