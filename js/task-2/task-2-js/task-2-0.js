$(document).ready(function () {
    $(".returm").click(function () {
        window.location.href = "./task-2-2.html"
    });
    $("#btn-1").click(function () {
        window.location.href = "./task-2-2.html"
    });
    $("#btn-2").click(function () {
        var home = confirm("确定回到主页重新开始游戏？");
        if (home == true) {
            window.location.href = "./task-2-1.html"
        };
    });
});