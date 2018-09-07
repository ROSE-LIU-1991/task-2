//文档运行后激活函数
$(document).ready(function () {
    //获取需要的数组
    var version = JSON.parse(window.sessionStorage.getItem("version"));
    var player = JSON.parse(window.sessionStorage.getItem("player"));
    var day = JSON.parse(window.sessionStorage.getItem("day"));
    var dier = JSON.parse(window.sessionStorage.getItem("dier"));
    var winter = window.sessionStorage.getItem("winter");
    var survivaler = JSON.parse(window.sessionStorage.getItem("survivaler"));
    var killer = JSON.parse(window.sessionStorage.getItem("killer"));
    var activation = JSON.parse(window.sessionStorage.getItem("activation"));
    //老规矩各个按钮的事件
    $(".home").click(function () {
        var a = confirm("确定回到主页？")
        if (a == true) {
            sessionStorage.clear();
            sessionStorage.setItem("version", JSON.stringify(version));
            window.location.href = "./task-2-1.html";
        };
    });
    $(".help").click(function () {
        var b = confirm("查看游戏帮助？")
        if (b == true) {
            window.location.href = "./task-2-0.html";
        }
    });
    //设置天数
    for (var c = 2; c <= day.length; c++) {
        if (c > 2) {
            $('.txt').first().clone().appendTo($(".text-bottom"));
            console.log(c)
        }
        $(".one").eq(c - 2).html("第" + (c - 1) + "天");
        console.log(c)
    };
    //设置杀人信息
    if (dier.length !== 0) {
        for (let d = 0; d < dier.length; d++) {
            let z = dier[d]
            if ((d + 1) % 2 == 0) {
                $(".event").eq(d).html("晚上" + z + "号被杀手杀死,他的身份是" + player[z - 1].name);
            } else {
                $(".event").eq(d).html("白天" + z + "号被投死杀死,他的身份是" + player[z - 1].name);
            }
        }
    }
    //判断胜利
    if (winter == "杀手胜利") {
        $("#image-2").css("opacity", "1");
    };
    //设置法官宣言
    $(".text").text("本轮游戏共抓出杀手" + killer.length + "人,共经历了" + (day.length - 1) + "个白天");
    //剩下的人数
    console.log(version)
    $("#num").text('剩余人数' + survivaler.length + '人');
    $("#num-1").text("杀手" + killer.length + "人")
    $("#num-2").text("平民" + killer.length + "人")
    //再来一局按钮
    $(".button").click(function () {
        let y = confirm("再来一局")
        if (y = true) {
            window.location.href = "./task-2-1.html"
        }
    });
});