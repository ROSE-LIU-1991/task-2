//文档运行后激活函数
$(document).ready(function () {
    //获取上一页已经做好了的打乱数组
    var player = JSON.parse(window.sessionStorage.getItem("all"));
    //返回按钮
    $(".returm").click(function () {
        var ok = confirm("返回上一页")
        if (ok == true) {
            sessionStorage.clear();
            window.location.href = "./task-2-2.html";
        }
    });
    //添加游戏格子
    for (var x = 0; x < player.length; x++) {
        $("main").append('<div class="identity"></div>');
        $(".identity").eq(x).append('<p class="identity-top"></p>');
        $(".identity-top").eq(x).html(player[x]);
        $(".identity").eq(x).append('<p class="identity-bottom"></p>');
        $(".identity-bottom").eq(x).html((x + 1) + "号");
    }
    //进入游戏
    $("#3").click(function () {

        let y = [];
        for (let x = 0; x < player.length; x++) {
            if (player[x] == "平  民") {
                y.push({
                    name: "平民",
                    death: true
                })
            } else {
                y.push({
                    name: "杀手",
                    death: true
                })
            }
        }

        var next = confirm("准备就绪?")
        if (next == true) {
            sessionStorage.setItem("Player", JSON.stringify(y));
            window.location.href = "./task-2-5.html";
        }
    });
});