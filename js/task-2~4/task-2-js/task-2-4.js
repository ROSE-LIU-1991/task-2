//文档运行后激活函数
$(document).ready(function () {
    //获取已经储存的数组
    var version =JSON.parse(window.sessionStorage.getItem("version"));
    var all = JSON.parse(window.sessionStorage.getItem("all"));
    //返回按钮
    $(".returm").click(function () {
        var ok = confirm("返回上一页")
        if (ok == true) {
            sessionStorage.clear();
            window.sessionStorage.setItem("version", JSON.stringify(version));
            window.sessionStorage.setItem("all", JSON.stringify(all));
            window.location.href = "./task-2-3.html";
        }
    });
    //添加游戏格子
    for (var x = 0; x < all.length; x++) {
        $("main").append('<div class="identity"></div>');
        $(".identity").eq(x).append('<p class="identity-top"></p>');
        $(".identity-top").eq(x).html(all[x]);
        $(".identity").eq(x).append('<p class="identity-bottom"></p>');
        $(".identity-bottom").eq(x).html((x + 1) + "号");
    }
    //进入游戏
    $("#3").click(function () {

        let player = [];
        for (let x = 0; x < all.length; x++) {
            if (all[x] == "平  民") {
                player.push({
                    name: "平民",
                    death: true
                })
            } else {
                player.push({
                    name: "杀手",
                    death: true
                })
            }
        }

        var next = confirm("准备就绪?")
        if (next == true) {
            sessionStorage.setItem("player", JSON.stringify(player));
            window.location.href = "./task-2-5.html";
        }
    });
});