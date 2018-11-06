myApp.controller('ArticleListCtrl', function ($scope, $http, $state, $stateParams, $location) {
    var pathUrl = $location.path()
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

    $http({
        method: "get",
        url: "/carrots-admin-ajax/a/article/search",
        params: {
            page: $stateParams.page,
            size: $stateParams.size,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            title: $stateParams.title,
            author: $stateParams.author,
            type: $stateParams.type,
            status: $stateParams.status
        }
    }).then(function (res) {
            console.log(res);
            console.log("获取成功");
            //列表数据
            $scope.articleList = res.data.data.articleList;
            $scope.totalItems = res.data.data.total;
            //分页数据
            $scope.size = res.data.data.size;
            $scope.inputsize = res.data.data.size;
            $scope.maxSize = 5;
            $scope.currentPage = $stateParams.page;
            $scope.inputPage = $stateParams.page;
            //搜索数据
            $scope.dt1 = parseInt($stateParams.startAt);
            $scope.dt2 = parseInt($stateParams.endAt);
            $scope.title = $stateParams.title;
            $scope.author = $stateParams.author;
        },
        function (res) {
            console.log("获取失败")
        });


    $scope.changes = function () {
        $state.go('backstagpe.list', {
            page: $scope.currentPage
        }, {
            reload: true
        });
    }
    //分页跳转
    $scope.submit = function () {
        $state.go('backstagpe.list', {
            page: $scope.inputPage,
            size: $scope.size
        }, {
            reload: true
        });
    }
    //日历控件
    $scope.dateOptions1 = {
        //设置日期面板中每个日期是否可选传入参数，为一个json对象{date: obj1, mode: obj2}，返回值为bool类型
        dateDisabled: disabled,
        //年份的格式化形式
        formatYear: 'yy',
        //可选择的最小日期
        minDate: $scope.dt1,
        //初始一周从星期几开始数值为0-6，0是周末，6是周6
        startingDay: 1
    };
    $scope.dateOptions2 = {
        //设置日期面板中每个日期是否可选传入参数，为一个json对象{date: obj1, mode: obj2}，返回值为bool类型
        dateDisabled: disabled,
        //年份的格式化形式
        formatYear: 'yy',
        //可选择的最大日期
        maxDate: $scope.dt2,
        //初始一周从星期几开始数值为0-6，0是周末，6是周6
        startingDay: 1
    };
    // dateDisabled的函数
    function disabled(data) {
        //这data参数为data里面的data
        var date = data.date,
            //这里mode的参数为data里面的mode
            mode = data.mode;
        //     下面代码为禁用周末2天不能选入
        // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt1 = new Date(year, month, day);
        $scope.dt2 = new Date(year, month, day);
    };
    //设置日期逻辑
    $scope.$watch("dt1", function (designate, ddd) {
        $scope.dateOptions2.minDate = designate;
    })
    //设置日期逻辑
    $scope.$watch("dt2", function (designate, ddd) {
        $scope.dateOptions1.maxDate = designate;
    })

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    //状态
    $scope.statusselect = [{
        id: null,
        name: "全部"
    }, {
        id: 2,
        name: "上线"
    }, {
        id: 1,
        name: "草稿"
    }];
    //默认初始值
    // if ($stateParams.status) {
    //     $scope.status = parseInt($stateParams.status);
    // }else{
    //     $scope.status = $scope.statusselect[0].id;
    // }
    $scope.status = $stateParams.status == undefined ? $scope.statusselect[0].id : parseInt($stateParams.status);
    //类型
    $scope.typeselect = [{
        id: null,
        name: "全部"
    }, {
        id: 0,
        name: "首页banner"
    }, {
        id: 1,
        name: "找职位banner"
    }, {
        id: 2,
        name: "找精英banner"
    }, {
        id: 3,
        name: "行业大图"
    }];
    $scope.type = $stateParams.type == undefined ? $scope.typeselect[0].id : parseInt($stateParams.type);
    //搜索跳转
    $scope.search = function () {
        var date1, time1, date2, time2
        //时间转换
        if ($scope.dt1) {
            date1 = new Date($scope.dt1)
            time1 = date1.valueOf()
        }
        if ($scope.dt2) {
            date2 = new Date($scope.dt2)
            //判断第一个条件，2个取值的日期是不是同一天
            if (time1 == date2.valueOf()) {
                //一天的事件戳是60*60*24 =86400，不过我们js里是一毫秒为单位，所以要加3个0
                time2 = date1.valueOf() + 86399000
            } //再进行第二个条件的判断，2个取值的日期是不是相邻的一天
            else if (date2.valueOf - time1 <= 86400000) {
                time2 = date2.valueOf() + 86399000
            } //都不是则是正常赋值
            else {
                time2 = date2.valueOf()
            }
        }
        // console.log(time1)
        // console.log(time2)
        $state.go('backstagpe.list', {
            title: $scope.title,
            author: $scope.author,
            startAt: time1,
            endAt: time2,
            status: $scope.status,
            type: $scope.type
        }, {
            reload: true
        });
    }
    //清空跳转
    $scope.empty = function () {
        $state.go('backstagpe.list', {
            title: "",
            author: "",
            startAt: "",
            endAt: "",
            type: "",
            status: ""
        }, {
            reload: true
        });
    }

    //article上下线
    $scope.onlinenet = function () {
        var id = this.list.id;
        var Status
        this.list.status == 1 ? Status = 2 : Status = 1;
        console.log(id)
        console.log(Status)
        $http({
            method: "put",
            url: "/carrots-admin-ajax/a/u/article/status",
            params: {
                id: id,
                status: Status
            }
        }).then(function (res) {
            $state.reload();
            var dialog = bootbox.dialog({
                message: Status == 2 ? "上架成功" : "下架成功",
                closeButton: false
            });
            setTimeout(function () {
                dialog.modal('hide');
            }, 800);
        })
    }
    //article图片删除
    $scope.delete = function () {
        var id = this.list.id;
        console.log(id);
        bootbox.confirm({
            message: "确定删除图片?",
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                // console.log(result)
                if (result == true) {
                    $http({
                        method: "delete",
                        url: "/carrots-admin-ajax/a/u/article/" + id,
                    }).then(function (res) {
                        if (res.data.message == "success") {
                            $state.reload();
                            var dialog = bootbox.dialog({
                                message: "删除成功",
                                closeButton: false
                            });
                            setTimeout(function () {
                                dialog.modal('hide');
                            }, 800);
                        } else {
                            var dialog = bootbox.dialog({
                                message: "删除失败",
                                closeButton: false
                            });
                            setTimeout(function () {
                                dialog.modal('hide');
                            }, 800);
                        }
                    })
                } else {}
            }
        });
    }
    //新增页面的跳转
    $scope.add = function () {
        $state.go('backstagpe.add');
    }
    //编辑页面
    $scope.compile = function (id) {
        $state.go('backstagpe.add', {
            id: id
        })
    }
});