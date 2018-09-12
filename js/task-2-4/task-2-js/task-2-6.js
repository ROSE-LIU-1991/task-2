//文档运行后激活函数
$(document).ready(function () {
    //获取需要的数组
    var version = JSON.parse(window.sessionStorage.getItem("version"));
    var player = JSON.parse(window.sessionStorage.getItem("player"));
    let click = JSON.parse(window.sessionStorage.getItem("click"));
    var diarycolor = JSON.parse(window.sessionStorage.getItem("diarycolor"));
    var activation = JSON.parse(window.sessionStorage.getItem("activation"));
    var day = JSON.parse(window.sessionStorage.getItem("day"));
    var dier = JSON.parse(window.sessionStorage.getItem("dier"));
    var diary = JSON.parse(window.sessionStorage.getItem("diary"));

    //返回主页
    $(".home").click(function () {
        var next = confirm("结束游戏并回到主页？")
        if (next == true) {
            sessionStorage.clear();
            window.sessionStorage.setItem("version", JSON.stringify(version));
            window.location.href = "./task-2-1.html";
        }
    });
    //添加游戏格子
    for (var y = 0; y < player.length; y++) {
        $("main").append('<div class="identity"></div>');
        $(".identity").eq(y).append('<p class="identity-top"></p>');
        $(".identity-top").eq(y).html(player[y].name);
        $(".identity").eq(y).append('<p class="identity-bottom"></p>');
        $(".identity-bottom").eq(y).html((y + 1) + "号");
    }
    //依靠获取的click来判别是否为杀手的回合
    if (diary.length !== 1) {
        if (click == 0) {
            $(".container > p").html("天黑请闭眼");
            $(".title").html("杀手请睁眼");
            $("#3").html("确定杀死他")
        } else {
            $(".container > p").html("投票环节");
            $(".title").html("请平民投票");
            $("#3").html("确定放逐他")
        }
    } else {
        $(".container > p").html("死亡情况");
        $(".title").html("身份牌改变的选手为死亡状态");
        $(".text").html("");
        $("#3").html("返回游戏");
        // for (let a = 0; a < player.length; a++) {
        //     $(".identity").eq(a).addClass("death");
        // }
    }
    //如果已经有死亡的人，则改变状态
    for (let b = 0; b < player.length; b++) {
        if (player[b].death == false) {
            let p = $(".ppt").index($(this));
            console.log(this)
            $(".identity").eq(b).append('<p class="ptt"></p>');
            $(".identity").eq(b).addClass("death");
            $(".ptt").eq(p).html((b + 1) + "号可怜虫死了");
        };
    }
    //选取身份然后变色并且判断
    //新建变量是为了后面方便存储 
    var oClick;
    $(".identity").click(function () {
        //用索引获取点击后的数组数值（下标）
        let c = $(".identity").index($(this));
        //关联索引值
        oClick = c;
        //重置按钮
        for (let re = 0; re < player.length; re++) {
            $(".identity").eq(re).removeClass("identity-hover");
            $(".identity-bottom").eq(re).removeClass("identity-bottom-hover");
        }
        //开始干
        if (diary.length !== 1) {
            //先判断白天还是晚上
            if (click.length == 1) {
                //判断身份和状态
                if (player[c].name == "平民" && player[c].death == true) {
                    $(".identity").eq(c).addClass("identity-hover");
                    $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
                } //状态死亡就给出提示
                else if (player[c].death !== true) {
                    alert("他已经死了")
                } //不是平民和死亡状态就只剩下杀手了，给提示
                else {
                    alert("本游戏不能自杀");
                }
            }
            //再次设置投票
            else {
                if (player[c].death == true) {
                    $(".identity").eq(c).addClass("identity-hover");
                    $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
                } else {
                    alert("你选的人已经死了");
                }
            }
        } else {
            for (let d = 0; d < player.length; d++) {
                $(".identity").eq(c).addClass("identity-hover");
                $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
            }
        }
    });
    //符合条件即胜利，并跳转
    function win() {
        let survivaler = player.filter(function (item, index, array) {
            return (item.death == true)
        });
        //存活的杀手
        let killer = survivaler.filter(function (item, index, array) {
            return (item.name == '杀手')
        });
        //胜利的条件
        if (killer.length == 0) {
            sessionAbc();
            let winter = "平民获胜";
            //将winer存储到winer字段
            sessionStorage.setItem("winter", winter);
            //储存survivaler
            sessionStorage.setItem("survivaler", JSON.stringify(survivaler));
            //储存killer
            sessionStorage.setItem("killer", JSON.stringify(killer));
            //跳转胜利页面
            window.location.href = "./task-2-7.html";
        }
        //失败条件
        else if (killer.length >= (survivaler.length - killer.length)) {
            sessionAbc();
            let winter = "杀手胜利"
            //因为杀手胜利要到第二天揭晓，所以得增加一天的天数
            if ((click.length - 1) == 0) {
                day.push(0);
                console.log(day);
                sessionStorage.setItem("day", JSON.stringify(day)); //将winer存储到winer字段
                sessionStorage.setItem("winter", winter);
                //储存survivaler
                sessionStorage.setItem("survivaler", JSON.stringify(survivaler));
                //储存killer
                sessionStorage.setItem("killer", JSON.stringify(killer));
                //跳转胜利页面
                window.location.href = "./task-2-7.html";
            } else {
                sessionStorage.setItem("day", JSON.stringify(day)); //将winer存储到winer字段
                sessionStorage.setItem("winter", winter);
                //储存survivaler
                sessionStorage.setItem("survivaler", JSON.stringify(survivaler));
                //储存killer
                sessionStorage.setItem("killer", JSON.stringify(killer));
                //跳转胜利页面
                window.location.href = "./task-2-7.html";
            }
        } else {
            window.location.href = "./task-2-5.html";
        }
    }
    //确定杀人并跳转
    //先设置一个操作结束的函数
    function operation() {
        //将生存状态改成死亡
        player[oClick].death = false;
        //死了一个人，死亡数组添加其数据
        dier.push(oClick + 1);
    }
    //别忘记还要储存数据
    function sessionAbc() {
        sessionStorage.setItem("player", JSON.stringify(player));
        sessionStorage.setItem("click", JSON.stringify(click));
        sessionStorage.setItem("diarycolor", JSON.stringify(diarycolor));
        sessionStorage.setItem("activation", JSON.stringify(activation));
        sessionStorage.setItem("day", JSON.stringify(day));
        sessionStorage.setItem("dier", JSON.stringify(dier));
    };
    //设置确定操作点击事件
    $("#3").click(function () {
        if (diary.length !== 1) {
            //判断操作为晚上还是白天
            if (oClick !== undefined && (click.length - 1) == 0 && player[oClick].name == "平民" && player[oClick].death == true) {
                //调用前面函数
                operation();
                sessionAbc();
                win();
            }
            //判断是白天
            else if (oClick !== undefined && (click.length - 1) == 3 && player[oClick].death == true) {
                //投票完成，一天结束
                day.push(0);
                //清空点击数组,数组只有0，把0干掉就Ok
                click.splice(0, click.length);
                //调用函数
                operation();
                sessionAbc();
                win();
            }
            //剩下的就是没有选取一个身份就点击
            else {
                alert("请选取一个目标");
            }
        } else {
            if (diary.length == 1) {
                sessionAbc();
                //清空日记数组
                diary.splice(0, diary.length);
                //反手在来一记储存
                sessionStorage.setItem("diary", JSON.stringify(diary));
                //跳转页面
                window.location.href = "./task-2-5.html";
            }
        }
    });
});