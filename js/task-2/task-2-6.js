//文档运行后激活函数
$(document).ready(function () {
    //获取上一页已经做好了的打乱数组
    var player = JSON.parse(window.sessionStorage.getItem("all"));
    var x = JSON.parse(window.sessionStorage.getItem("X"));
    var Player = JSON.parse(window.sessionStorage.getItem("Player"));
    //
    //返回按钮
    $(".returm").click(function () {
        var ok = confirm("返回上一页")
        if (ok == true) {
            sessionStorage.clear();
            window.location.href = "./task-2-2.html";
        }
    });
    //进入游戏
    $("#3").click(function () {
        var next = confirm("确定杀死他？")
        if (next == true) {
            window.location.href = "./task-2-5.html";
        }
    });
    //添加游戏格子
    for (var y = 0; y < player.length; y++) {
        $("main").append('<div class="identity"></div>');
        $(".identity").eq(y).append('<p class="identity-top"></p>');
        $(".identity-top").eq(y).html(player[y]);
        $(".identity").eq(y).append('<p class="identity-bottom"></p>');
        $(".identity-bottom").eq(y).html((y + 1) + "号");
    }
    //选取身份然后变色并且判断
    var oClick;
    console.log(Player);
    $(".identity").click(function () {
        //用索引获取点击后的数组数值（下标）
        let s = $(".identity").index($(this));
        oClick = s;
        //重置按钮
        for (var re = 0; re < player.length; re++) {
            $(".identity").eq(re).removeClass("identity-hover");
            $(".identity-bottom").eq(re).removeClass("identity-bottom-hover");
        }
        //选取身份判断
        if (Player[s].name == "平民" && Player[s].death == true) {
            $(".identity").eq(s).addClass("identity-hover");
            $(".identity-bottom").eq(s).addClass("identity-bottom-hover");
        } //点击是死人就弹窗
        else if (Player[s].death !== true) {
            alert("他已经死了")
        } //如果状态不是死亡，则判定是杀手。
        else {
            alert("本游戏不能自杀");
        }
    });
    //确定杀人并跳转
    $("#3").click(function(){
        //将生存状态改成死亡
        Player[oClick].death = false;
        sessionStorage.setItem("click",JSON.stringify("oClick"));
        window.location.href = "./task-2-5.html";
    });
});