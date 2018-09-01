//文档运行后激活函数
$(document).ready(function () {
    //获取上一页已经做好了的打乱数组
    var player = JSON.parse(window.sessionStorage.getItem("all"));
    //返回按钮
    $(".returm").click(function () {
        window.location.href = "./task-2-2.html";
    });
    //设置点击初始次数
    var sCount = 0;
    //设置数组下标
    var x = 0;
    //设置查看身份点击监听

    $("#3").click(function () {
        if (sCount == 0) {
            //更改样式.
            $("#dwra").css('transform', "rotateY(0deg)");
            $(".dwra-button").css('transform', "rotateY(0deg)");
            $("#dwra-image").css('opacity', "0");
            $(".dwra-word").css('opacity', "1");
            $(".dwra-word-2").css('opacity', "1");
            //更改分身序号
            $("#3").text("点击隐藏并传递给" + (x + 2) + "号");
            $(".btn-txt").text(x + 1);
            console.log(x);
            //再检查随机数组里的分身
            if (player[x] == "平  民") {
                $("#dwra-images").css('opacity', "1");
                $(".dwra-word").text("角色：平民");
            } else {
                $("#dwra-images-2").css('opacity', "1");
                $(".dwra-word").text("角色：杀手");
            }
            sCount = 1;
            x++;
        } else {
            //更改样式.
            $("#dwra").css('transform', "rotateY(180deg)");
            $(".dwra-button").css('transform', "rotateY(180deg)");
            $("#dwra-image").css('opacity', "1");
            $("#dwra-images").css('opacity', "0");
            $("#dwra-images-2").css('opacity', "0");
            $(".dwra-word").css('opacity', "0");
            $(".dwra-word-2").css('opacity', "0");
            //更改分身序号
            $("#3").text("查看" + (x + 1) + "号身份");
            $(".btn-txt").text(x + 1);
            sCount = 0;
        }
        if ((x) == player.length) {
            $(".btn-txt").text(x);
            $("#3").text("法官接管");
            $("#3").click(function () {
                window.location.href = "./task-2-4.html";
            });
        }
    })
})