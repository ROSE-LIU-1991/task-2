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
    var civier = JSON.parse(window.sessionStorage.getItem("civier"));
    var police = JSON.parse(window.sessionStorage.getItem("police"));
    var sniper = JSON.parse(window.sessionStorage.getItem("sniper"));
    var doctor = JSON.parse(window.sessionStorage.getItem("doctor"));
    var activation = JSON.parse(window.sessionStorage.getItem("activation"));
    var lol = JSON.parse(window.sessionStorage.getItem("lol"));
    //老规矩各个按钮的事件
    $(".home").click(function () {
        var a = confirm("确定回到主页？")
        if (a == true) {
            sessionStorage.clear();
            sessionStorage.setItem("version", JSON.stringify(version));
            window.location.href = "./task-2-1.html";
        };
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
        $(".text").text("本轮游戏共死掉掉了" + dier.length + "人,共经历了" + (day.length - 1) + "个白天");

    } else {
        $("#image-2").css("opacity", "0");
        $(".text").text("本轮游戏共抓出杀手" + killer - killer.length + "人,共经历了" + (day.length - 1) + "个白天");
    };
    //剩下的人数
    console.log(version)
    $("#num").text('剩余人数' + survivaler.length + '人');
    $("#num-1").text("杀手" + killer.length + "人")
    $("#num-2").text("平民" + civier.length + "人")
    console.log(police)
    $("#num-3").text("警察" + police.length + "人")
    $("#num-4").text("狙击手" + sniper.length + "人")
    $("#num-5").text("医生" + doctor.length + "人")
    //再来一局按钮
    $(".button").click(function () {
        let y = confirm("再来一局")
        if (y = true) {
            sessionStorage.clear();
            sessionStorage.setItem("version", JSON.stringify(version));
            window.location.href = "./task-2-1.html"
        }
    });
});