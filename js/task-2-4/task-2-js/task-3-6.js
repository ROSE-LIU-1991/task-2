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
    var lol = JSON.parse(window.sessionStorage.getItem("lol"));

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
        if (click.length == 1) {
            $(".container > p").html("天黑请闭眼");
            $(".title").html("杀手请睁眼");
            $("#3").html("确定杀死他")
        } else if (click.length == 2) {
            $(".container > p").html("警察出来验人");
            $(".title").html("警察请睁眼");
            $("#3").html("想知道他的身份吗？")
        } else if (click.length == 3) {
            $(".container > p").html("狙击手狙人");
            $(".title").html("狙击手请睁眼");
            $("#3").html("选一个人狙死")
        } else if (click.length == 4) {
            $(".container > p").html("医生救人了");
            $(".title").html("医生请睁眼");
            $("#3").html("选一个人进行救治")
        } else {
            $(".container > p").html("投票环节");
            $(".title").html("请大家投票");
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
            //先判断回合
            if (click.length == 1) {
                //判断身份和状态
                if (player[c].name == "杀手" && player[c].death == true) {
                    alert("本游戏不能自杀");
                } //状态死亡就给出提示
                else if (player[c].death !== true) {
                    alert("他已经死了")
                } //不是杀手和死亡状态就是剩下的幸存者了。
                else {
                    $(".identity").eq(c).addClass("identity-hover");
                    $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
                }
            }
            //判断回合
            else if (click.length == 2) {
                if (player[c].name == "警察" && player[c].death == true) {
                    alert("你验你自己干啥？");
                } else if (player[c].death !== true) {
                    alert("请尊重死者")
                } else {
                    $(".identity").eq(c).addClass("identity-hover");
                    $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
                }
            }
            //狙击手杀人
            else if (click.length == 3) {
                if (player[c].name == "狙击手" && player[c].death == true) {
                    alert("不准自杀");
                } else if (player[c].death !== true) {
                    alert("请尊重死者")
                } else {
                    $(".identity").eq(c).addClass("identity-hover");
                    $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
                }
            }
            //医生救人
            else if (click.length == 4) {
                $(".identity").eq(c).addClass("identity-hover");
                $(".identity-bottom").eq(c).addClass("identity-bottom-hover");
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
        //存活的警察
        let police = survivaler.filter(function (item, index, array) {
            return (item.name == '警察')
        });
        //存活的狙击手
        let sniper = survivaler.filter(function (item, index, array) {
            return (item.name == '狙击手')
        });
        //存活的医生
        let doctor = survivaler.filter(function (item, index, array) {
            return (item.name == '医生')
        });
        //存活的平民
        let civier = survivaler.filter(function (item, index, array) {
            return (item.name == '平民')
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
            //警察
            sessionStorage.setItem("police", JSON.stringify(police));
            //狙击手
            sessionStorage.setItem("sniper", JSON.stringify(sniper));
            //医生
            sessionStorage.setItem("doctor", JSON.stringify(doctor));
            //平民
            sessionStorage.setItem("civier", JSON.stringify(civier));
            //跳转胜利页面
            window.location.href = "./task-3-7.html";
        }
        //失败条件
        else if (killer.length >= (survivaler.length - killer.length) ||
            (police.length + sniper.length + doctor.length == 0) || (civier.length == 0)) {
            sessionAbc();
            let winter = "杀手胜利"
            //因为杀手胜利要到第二天揭晓，所以得增加一天的天数
            if ((click.length - 1) == 0) {
                day.push(0);
                console.log(day);
                sessionStorage.setItem("day", JSON.stringify(day));
                //将winer存储到winer字段
                sessionStorage.setItem("winter", winter);
                //储存survivaler
                sessionStorage.setItem("survivaler", JSON.stringify(survivaler));
                //储存killer
                sessionStorage.setItem("killer", JSON.stringify(killer));
                //警察
                sessionStorage.setItem("police", JSON.stringify(police));
                //狙击手
                sessionStorage.setItem("sniper", JSON.stringify(sniper));
                //医生
                sessionStorage.setItem("doctor", JSON.stringify(doctor));
                //平民
                sessionStorage.setItem("civier", JSON.stringify(civier));
                //跳转胜利页面
                window.location.href = "./task-3-7.html";
            } else {
                sessionStorage.setItem("day", JSON.stringify(day));
                //将winer存储到winer字段
                sessionStorage.setItem("winter", winter);
                //储存survivaler
                sessionStorage.setItem("survivaler", JSON.stringify(survivaler));
                //储存killer
                sessionStorage.setItem("killer", JSON.stringify(killer));
                //警察
                sessionStorage.setItem("police", JSON.stringify(police));
                //狙击手
                sessionStorage.setItem("sniper", JSON.stringify(sniper));
                //医生
                sessionStorage.setItem("doctor", JSON.stringify(doctor));
                //平民
                sessionStorage.setItem("civier", JSON.stringify(civier));
                //跳转胜利页面
                window.location.href = "./task-3-7.html";
            }
        } else {
            window.location.href = "./task-3-5.html";
        }
    }
    //确定杀人并跳转
    //先设置一个操作结束的函数
    function operation() {
        if (click.length == 1) {
            //将生存状态改成死亡
            player[oClick].death = false;
            //死了一个人，死亡数组添加其数据
            dier.push(oClick + 1);
            lol.push({
                num: (oClick + 1),
                death: 0
            });
        } else if (click.length == 2) {
            //这个是验人，没有死人
            lol.push({
                num: (oClick + 1),
                death: 1
            });
        } else if (click.length == 3) {
            //狙死了
            player[oClick].death = false;
            dier.push(oClick + 1);
            lol.push({
                num: (oClick + 1),
                death: 2
            });
        } else if (click.length == 4) {
            if (player[oClick].death == false) {
                //死人救活
                player[oClick].death = true
                lol.push({
                    num: (oClick + 1),
                    death: 3
                });
                //活了死人组要少一个人
                dier = dier.filter(function (item, index) {
                    return item != (oClick + 1);
                })
            } else {
                //活人就不管了
                lol.push({
                    num: (oClick + 1),
                    death: 3
                });
            }
        } else {
            //投死的
            player[oClick].death = false;
            dier.push(oClick + 1);
            lol.push({
                num: (oClick + 1),
                death: 4
            });
        }
    }
    //别忘记还要储存数据
    function sessionAbc() {
        sessionStorage.setItem("player", JSON.stringify(player));
        sessionStorage.setItem("click", JSON.stringify(click));
        sessionStorage.setItem("diarycolor", JSON.stringify(diarycolor));
        sessionStorage.setItem("activation", JSON.stringify(activation));
        sessionStorage.setItem("day", JSON.stringify(day));
        sessionStorage.setItem("dier", JSON.stringify(dier));
        sessionStorage.setItem("lol", JSON.stringify(lol));
    };
    //设置确定操作点击事件
    $("#3").click(function () {
        if (diary.length !== 1) {
            //判断杀手环节
            if (oClick !== undefined && (click.length - 1) == 0 &&
                player[oClick].name !== "杀手" && player[oClick].death == true) {
                //调用前面函数
                operation();
                sessionAbc();
                win();
            }
            //判断警察环节
            if (oClick !== undefined && (click.length - 2) == 0 &&
                player[oClick].name !== "警察" && player[oClick].death == true) {
                //调用前面函数
                operation();
                sessionAbc();
                win();
            }
            //判断狙击手环节
            if (oClick !== undefined && (click.length - 3) == 0 &&
                player[oClick].name !== "狙击手" && player[oClick].death == true) {
                //调用前面函数
                operation();
                sessionAbc();
                win();
            }
            //判断医生环节
            if (oClick !== undefined && (click.length - 4) == 0) {
                //调用前面函数
                operation();
                sessionAbc();
                win();
            }
            //判断投票环节
            else if (oClick !== undefined && (click.length - 7) == 0 &&
                player[oClick].death == true) {
                //投票完成，一天结束
                day.push(0);
                //清空点击数组,数组只有0，把0干掉就Ok
                click.splice(0, click.length);
                //调用函数
                operation();
                sessionAbc();
                win();
            }
        } else {
            if (diary.length == 1) {
                sessionAbc();
                //清空日记数组
                diary.splice(0, diary.length);
                //反手在来一记储存
                sessionStorage.setItem("diary", JSON.stringify(diary));
                //跳转页面
                window.location.href = "./task-3-5.html";
            }
        }
    });
});