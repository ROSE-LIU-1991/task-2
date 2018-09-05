//文档运行后激活函数
$(document).ready(function () {
    var Version = JSON.parse(window.sessionStorage.getItem("version"));
    console.log(Version)
    //做一个游戏标题数值，下面要用
    var title = ["捉鬼游戏版本：4", "捉鬼游戏版本：3", "捉鬼游戏版本：2", "捉鬼游戏版本：1"];
    //直接设置左箭头点击，并在第一页的时候隐藏
    $("#tge-2").addClass("hidden");
    var sCount = 3;
    //创建右箭头函数
    $("#tge-1").click(function () {
        if (sCount > 0) {
            $(".mode-1").eq(sCount).css("transform", "translateX(-100%)")
            $(".mode-1").eq(sCount).css("opacity", "0");
            // console.log(sCount);
            $(".top").html(title[sCount - 1]);
            $(".round-sm").eq(4 - sCount).addClass("active");
            $(".round-sm").eq(3 - sCount).removeClass("active");
            sCount--;
            console.log(sCount);
            if (sCount != 3) {
                $("#tge-2").css("opacity", "1");
            } else {
                $("#tge-2").css("opacity", "0");
            }
        }
        if (sCount != 0) {
            $("#tge-1").css("opacity", "1");
        } else {
            $("#tge-1").css("opacity", "0");
        }
    });
    //创建左箭头
    $("#tge-2").click(function () {
        if (sCount < 3) {
            console.log(sCount);
            $(".mode-1").eq(sCount + 1).css("transform", "translateX(0%)")
            $(".mode-1").eq(sCount + 1).css("opacity", "1");
            $(".top").html(title[sCount + 1]);
            sCount++;
            // console.log(sCount);
            $(".round-sm").eq(3 - sCount).addClass("active");
            $(".round-sm").eq(4 - sCount).removeClass("active");
            if (sCount == 3) {
                $(".mode-1").eq(sCount + 1).css("opacity:0");
            } else {
                $(".mode-1").eq(sCount + 1).css("opacity:1");
            }
            if (sCount != 3) {
                $("#tge-2").removeClass("hidden");
            } else {
                $("#tge-2").addClass("hidden");
            }
        }
        if (sCount != 0) {
            $("#tge-1").css("opacity", "1");
        } else {
            $("#tge-1").css("opacity", "0");
        }
    });
    //查找按钮索引值
    $(".round-sm").mouseenter(function () {
        let sNub = $(".round-sm").index($(this));
        // console.log(sNub);
        for (let S = 0; S < title.length; S++) {
            $(".round-sm").eq(S).removeClass("active");
            // console.log(S);
        }
        $(".round-sm").eq(sNub).addClass("active");
        sCount = 3 - sNub;
        console.log(sCount);
        $(".top").html(title[sCount]);
        for (let a = 0; a <= 3; a++) {
            $(".mode-1").eq(4 - a).css("transform", "translateX(-100%)")
            $(".mode-1").eq(4 - a).css("opacity", "0");

        }
        for (let b = 3; b > sNub; b--) {
            $(".mode-1").eq(4 - b).css("transform", "translateX(0%)")
            $(".mode-1").eq(4 - b).css("opacity", "1");
            // console.log(b)
        }
        if (sCount == 0) {
            $("#tge-1").css("opacity", "0");
            $("#tge-2").css("opacity", "1");
        } else if (sCount == 3) {
            $("#tge-1").css("opacity", "1");
            $("#tge-2").css("opacity", "0");
        } else {
            $("#tge-1").css("opacity", "1");
            $("#tge-2").css("opacity", "1");
        }
    });
    $(".version").click(function () {
        var version = 1;
        window.location.href = "./task-2-2.html";
        window.sessionStorage.setItem("version", JSON.stringify(version));

    });
    $(".home").click(function () {
        var next = confirm("回到主页?")
        if (next == true) {
            window.location.href = "./task-2-1.html";
        }
    });
    if(Version == 1){
        $(".title").html("上次游戏：简化版1");
        $(".next").click(function(){
            window.location.href = "./task-2-2.html";
        });
    }
});