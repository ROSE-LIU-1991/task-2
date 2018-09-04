//文档运行后激活函数
$(document).ready(function () {
    //获取上一页已经做好了的打乱数组
    var player = JSON.parse(window.sessionStorage.getItem("all"));
    //返回按钮
    $(".returm").click(function () {
        var ok = confirm("返回上一页")
        if (ok == true) {
            sessionStorage.clear();
            window.location.href = "./task-2-4.html";
        }
    });

    //设置杀人
    var x = new Array();
    $(".li").eq(0).click(function () {
        if (x.length == 0) {
            $(".li").eq(0).css("background-color", "#83b09a");
            $("li>span").eq(0).css("border-right-color", "#83b09a");
            alert("天黑了，杀手开始行动了")
            // window.location.href = "./task-2-6.html";
            x.push("杀手杀人");
            // console.log(x);
            window.sessionStorage.setItem("click",JSON.stringify(x));
            window.location.href = "./task-2-6.html";
        } else {
            alert("本居请遵守杀人>遗言>讨论>投票的步骤进行游戏");
        }
    });
    //跳过没有的步骤
    $(".li").eq(1).click(function () {
        alert("本局没有警察，请遵守杀人>遗言>讨论>投票的步骤进行游戏");
    });
    $(".li").eq(2).click(function () {
        alert("本局没有狙击手，遵守杀人>遗言>讨论>投票的步骤进行游戏");
    });
    $(".li").eq(3).click(function () {
        alert("本局没有狙击手医生，请遵守杀人>遗言>讨论>投票的步骤进行游戏");
    });
    //遗言环节
    $(".li").eq(4).click(function () {
        if (x.length == 1) {
            $(".li").eq(4).css("background-color", "#83b09a");
            $("li>span").eq(4).css("border-right-color", "#83b09a");
            alert("请死者发表遗言")
            x.push("遗言");
            // console.log(x);
        } else {
            alert("本居请遵守杀人>遗言>讨论>投票的步骤进行游戏");
        }
    });

    //讨论环节
    $(".li").eq(5).click(function () {
        if (x.length == 2) {
            $(".li").eq(5).css("background-color", "#83b09a");
            $("li>span").eq(5).css("border-right-color", "#83b09a");
            alert("现在玩家开始讨论谁是杀手")
            x.push("玩家讨论");
            // console.log(x);
        } else {
            alert("本居请遵守杀人>遗言>讨论>投票的步骤进行游戏");
        }
    });
    //投票环节
    $(".li").eq(6).click(function () {
        if (x.length == 3) {
            $(".li").eq(6).css("background-color", "#83b09a");
            $("li>span").eq(6).css("border-right-color", "#83b09a");
            alert("进入投票环节")
            x.push("投票");
            // console.log(x);
        } else {
            alert("本居请遵守杀人>遗言>讨论>投票的步骤进行游戏");
        }
    });
});