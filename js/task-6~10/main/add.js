myApp.controller('addCtrl', function ($scope, $http, $state, $stateParams, $timeout) {
    $scope.typeselect = [{
        id: null,
        name: "请选择"
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
    $scope.type = $scope.typeselect[0].id;
    $scope.industryselect = [{
        id: null,
        name: "请选择"
    }, {
        id: 0,
        name: "移动互联网"
    }, {
        id: 1,
        name: "电子商务"
    }, {
        id: 2,
        name: "企业服务"
    }, {
        id: 3,
        name: "O2O"
    }, {
        id: 4,
        name: "教育 "
    }, {
        id: 5,
        name: "金融  "
    }, {
        id: 6,
        name: "游戏 "
    }];
    $scope.industry = $scope.industryselect[0].id;
    //富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.create()
    // $scope.type = $stateParams.type == undefined ? $scope.typeselect[0].id : parseInt($stateParams.type);
    //图片预览
    console.log($scope.img)
    $scope.inputchange = function () {
        //获取file的值
        var file = $("#uoload").get(0).files[0];
        //给$scope赋值
        $scope.file = file;
        console.log($scope.file)
        $scope.ImageName = file.name;
        //文件大小的初始单位是B，我们需要给它转换成MB，所以要进行2次的1024相除。
        $scope.ImageSize = file.size / 1024 / 1024;
        //toFixed（2），保留小数点后面2位
        var size = $scope.ImageSize.toFixed(2);
        //加上单位
        $scope.ImageSize = size + "MB";
        //构造
        if (window.FileReader) {
            //获取当前生成的图片数据
            var fr = new FileReader();
            //onloadend表示在加载资源时停止进度时启用。
            fr.onloadend = function (e) {
                //将预览的数据绑定 target 事件属性可返回事件的目标节点（触发该事件的节点）
                document.getElementById("images").src = e.target.result;
                $scope.img = e.target.result;
            };
            //readAsDataURL方法可以将读取到的文件编码成Data URL,将图片内嵌到网页
            fr.readAsDataURL(file);
        }
        $("#progress").css("width", "0%");
        $scope.$apply();
    }
    //图片上传
    $scope.loading = function () {
        //用FormData来初始化fr
        var fr = new FormData();
        //然后添加数据进去，数据就是前面的$scope.file.
        fr.append("file", $scope.file);
        console.log(fr)
        $("#progress").css("width", "60%");
        $http({
            method: "post",
            url: "/carrots-admin-ajax/a/u/img/task",
            data: fr,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (res) {
            console.log(res);
            if (res.data.code == 0) {
                $("#progress").css("width", "100%");
                $scope.message = "上传成功";
                console.log("上传成功")
                $scope.imgUrl = res.data.data.url;
                $scope.loaddisabled = true;

            } else if (res.data.code != 0) {
                $("#progress").css("background", "#ff0000");
                $scope.message = "上传异常";
                console.log("上传异常")
            }
        }, function (res) {
            $("#progress").css("width", "100%")
            $scope.timeout = $timeout(function () {
                $("#progress").css("background", "#ff0000");
                $("#progress").css("width", "0%")
                $scope.message = "上传失败";
                alert("上传失败，请确认图片大小不能大于2MB，或者其他原因")
            }, 1000);
            console.log("上传失败")
        })
    }
    //放弃上传
    $scope.abandon = function () {
        //数据清空
        $scope.ImageName = "";
        $scope.ImageSize = "";
        $("#progress").css("width", "0%");
        $scope.message = "";
        document.getElementById("images").src = "";
        $scope.file = null;
        $scope.message = "";
        $scope.loaddisabled = false;
        $scope.imgUrl = undefined;
    }
    //取消按钮
    $scope.cancel = function () {
        $state.go('backstagpe.list')
    }
    //编辑渲染
    if ($stateParams.id) {
        console.log($stateParams.id)
        $scope.AddTop = "编辑";
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/" + $stateParams.id
        }).then(function (res) {
            console.log(res);
            $scope.AddTitle = res.data.data.article.title;
            $scope.type = res.data.data.article.type;
            $scope.industry = res.data.data.article.industry;
            editor.txt.text(res.data.data.article.content);
            $scope.Addurl = res.data.data.article.url;
            $scope.imgUrl = res.data.data.article.img;
            document.getElementById("images").src = $scope.imgUrl;
            $scope.createAt = res.data.data.article.createAt;
            console.log($scope.type);
        });
        $scope.online = function (x) {
            console.log(x);
            var Status;
            if (x == 1) {
                Status = 2;
            } else {
                Status = 1;
            }
            $http({
                method: "put",
                url: "/carrots-admin-ajax/a/u/article/" + $stateParams.id,
                params: {
                    title: $scope.AddTitle,
                    status: Status,
                    industry: $scope.industry,
                    content: editor.txt.text(),
                    img: $scope.imgUrl,
                    url: $scope.Addurl,
                    type: $scope.type,
                    createAt: $scope.createAt
                }
            }).then(function (res) {
                console.log(res);
                if (res.data.code == 0) {
                    $state.go('backstagpe.list');
                } else if (res.data.code != 0) {
                    alert(res.data.message);
                }
            })
        }
    } else {
        $scope.AddTop = "新增"
        //立即上线草稿按钮
        $scope.online = function (x) {
            console.log(x);
            var Status;
            if (x == 1) {
                Status = 2;
            } else {
                Status = 1;
            }
            $http({
                method: "post",
                url: "/carrots-admin-ajax/a/u/article",
                params: {
                    title: $scope.AddTitle,
                    type: $scope.type,
                    status: Status,
                    industry: $scope.industry,
                    content: editor.txt.text(),
                    img: $scope.imgUrl,
                    url: $scope.Addurl
                }
            }).then(function (res) {
                console.log(res);
                if (res.data.code == 0) {
                    $state.go('backstagpe.list');
                } else if (res.data.code != 0) {
                    alert(res.data.message);
                }
            })
        }
    }
});