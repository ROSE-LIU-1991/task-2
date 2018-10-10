//声明变量myApp，给它Angular模块赖注入ui.router.
var myApp = angular.module("myApp", ['ngAnimate', 'ngSanitize', 'ui.bootstrap',"ui.router"]);
//声明把$stateProvider和$urlRouterProvider路由引擎作为函数参数传入，至此就可配置路由了
//$stateProvider 服务提供者，用来配置路由
//$urlRouterProvider 服务提供者，用来配置路由重定向
myApp.config(function ($stateProvider, $urlRouterProvider) {
    //如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至loginPage.html
    $urlRouterProvider.when("", "/loginPage");
    //定义第一个显示出来的的状态，作为页面被加载好以后第一个被使用的路由
    $stateProvider
        .state("loginPage", {//登陆页+++
            url: "/loginPage",
            templateUrl: "./loginPage.html",
            controller: 'loginCtrl'
        })
        .state("backstagpe", {//后台页+++
            url: "/backstagpe",
            templateUrl: "./backstagpe.html"
        })
        .state("backstagpe.text", {//后台欢迎界面
            url : "/backstagpe.text",
            templateUrl:"./text.html"
        })
        .state("backstagpe.list", {//Article列表页+++
            url: "/list?page&size&startAt&endAt&title&author&type&status",
            templateUrl: "./list.html",
            controller: 'ArticleListCtrl'
        })
        .state("backstagpe.details", {//Article详情页+++
            url: "/details",
            templateUrl: "./details.html"
        })
});
