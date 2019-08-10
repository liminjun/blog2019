'use strict';

/* Directives */

var blogDirectives = angular.module('blogDirectives', []);

blogDirectives.directive('blogMenu',function(){
    return {
        restrict:"A",
        templateUrl:'partials/menu.html',
        link:function(scope,element,attrs){
            scope.label=attrs.menuTitle;
        }
    }
})