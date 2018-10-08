myApp.controller('ArticleListCtrl', function ($scope, $http) {
    $scope.list = [{
            a: '序号'
        },
        {
            a: '图片'
        },
        {
            a: '标题'
        },
        {
            a: '类型'
        },
        {
            a: '创建者'
        },
        {
            a: '创建时间'
        },
        {
            a: '修改时间'
        },
        {
            a: '状态'
        },
        {
            a: '操作'
        }
    ];

    function article() {
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/search",
        }).then(function (res) {
                console.log(res);
                console.log("获取成功");
                $scope.articleList = res.data.data.articleList;
                console.log($scope.articleList);
            },
            function (res) {
                console.log("获取失败")
            });
    }
    article();
});
myApp.constant('onLine',{
    1:'上线',
    2:'草稿'
});

myApp.filter('putaway',function(onLine){
    return function(index){
        return onLine[index]
    }
})
//状态过滤
