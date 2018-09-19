//文档运行后激活函数
$(document).ready(function () {
    //获取游戏版本数据
    var version = JSON.parse(window.sessionStorage.getItem("version"));
    //获取打乱数组数据 
    var all = JSON.parse(window.sessionStorage.getItem("all"));
    //获取身份状态数据
    var player = JSON.parse(window.sessionStorage.getItem("player"));
    console.log(player)
    //返回按钮
    $(".returm").click(function () {
        var ok = confirm("返回上一页")
        if (ok == true) {
            sessionStorage.clear();
            window.sessionStorage.setItem("version", JSON.stringify(version));
            window.sessionStorage.setItem("all", JSON.stringify(all));
            window.location.href = "./task-3-4.html";
        }
    });
    //查找读取点击事件，如果没有则创建一个
    if (JSON.parse(window.sessionStorage.getItem("click"))) {
        click = JSON.parse(window.sessionStorage.getItem("click"));
    } else {
        //创建一个空数组
        click = new Array();
    }
    //查找读取游戏天数，如果没有则创建一个
    if (JSON.parse(window.sessionStorage.getItem("day"))) {
        day = JSON.parse(window.sessionStorage.getItem("day"));
    } else {
        //创建一个长度为1的数组 
        day = [0];
    }
    // console.log(day)
    //添加天数副本用
    for (let x = 1; x < day.length; x++) {
        if (x > 0) {
            //遍历class为main-word的数组并取第一个，进行副本复制然后添加到main元素的内部开头
            $(".main-word").first().clone().prependTo($("main"));
            //讲UL元素里面的第（x-1)个给隐藏。
            $("#ul").eq(x - 1).hide();
        }
    }
    //随着天数改变标题的天数
    for (let y = 1; y <= day.length; y++) {
        $(".main-title").eq(y - 1).html("第" + y + "天");
        // console.log(y)
    }
    //每天天数的前一天元素隐藏
    $("#ul").eq(day.length - 1).show();
    $(".main-title").click(function () {
        //删选指定的元素给与状态更换
        $(this).siblings().toggle();
    });


    //判断是否是否有了背景色，没有则创建一个
    if (JSON.parse(window.sessionStorage.getItem("diarycolor"))) {
        diarycolor = JSON.parse(window.sessionStorage.getItem("diarycolor"))
    } else {
        diarycolor = new Array();
    }
    //激活背景色的变量
    if (JSON.parse(window.sessionStorage.getItem("activation"))) {
        activation = JSON.parse(window.sessionStorage.getItem("activation"));
    } else {
        activation = 0;
    }
    //设置判断条件，如果进入黑夜后（也就是activation改变后）保持
    if (activation !== 0) {
        //使每次跳转都能保持颜色
        for (let a = 0; a < diarycolor.length; a++) {
            console.log(a)
            $(".li").eq(a).css("background-color", "#83b09a");
            $(".li>span").eq(a).css("border-right-color", "#83b09a");
        }
    }
    //搜索一个死亡数组，没有则创建一个。
    if (JSON.parse(window.sessionStorage.getItem("dier"))) {
        dier = JSON.parse(window.sessionStorage.getItem("dier"));
    } else {
        //创建一个空数组
        dier = new Array();
    }
    //创建一个数组，表示晚上被选取身份的人
    if (JSON.parse(window.sessionStorage.getItem("lol"))) {
        lol = JSON.parse(window.sessionStorage.getItem("lol"));
    } else {
        //创建一个空数组
        lol = new Array();
    }
    //根据死亡素组里数值判断添加文本
    if (dier.length !== 0) {
        // console.log(dier)
        //根据死亡素组里数值判断添加文本
        if (lol.length !== 0) {
            //触发就表示死了人，所以for循环添加杀人信息
            for (let txt = 0; txt < lol.length; txt++) {
                // console.log(dier.length)
                let s = lol[txt].death;
                let S = lol[txt].num;
                console.log(S)
                //警察验人信息
                if (s == 0) {
                    $(".litext").eq(txt).after(`<p class="text-word">` + S + "号被杀害，他的身份是" + player[S - 1].name + '</p>');
                } else if (s == 1) {
                    $(".litext").eq(txt).after(`<p class="text-word">` + S + "号被查验，他的身份是" + player[S - 1].name + '</p>');
                } else if (s == 2) {
                    $(".litext").eq(txt).after(`<p class="text-word">` + S + "号被狙击，他的身份是" + player[S - 1].name + '</p>');
                } else if (s == 3) {
                    $("#btn-3").css("top", "5.2rem")
                    $(".litext").eq(txt).after(`<p class="text-word" style="margin-top:-.4rem">` + S + "号被医治，他的身份是" + player[S - 1].name + '</p>');
                } else if (s == 4) {
                    $(".litext").eq(txt).after(`<p class="text-word">` + S + "号被投死，他的身份是" + player[S - 1].name + '</p>');
                }
            }
        }
    }
    //创建函数没出发一次，给click数字里加一个0，在diarcolor数组里加一个0
    function boutton_operation() {
        //点击次数
        click.push(0);
        //背景色
        diarycolor.push(0);
    }
    //存储函数
    function seesionOver() {
        //点击数据储存
        window.sessionStorage.setItem("click", JSON.stringify(click));
        //乱序数据储存
        window.sessionStorage.setItem("all", JSON.stringify(all));
        //背景色数据储存
        window.sessionStorage.setItem("diarycolor", JSON.stringify(diarycolor));
        //背景色变量数据储存
        window.sessionStorage.setItem("activation", JSON.stringify(activation));
        //死亡数据储存
        window.sessionStorage.setItem("dier", JSON.stringify(dier));
        //选中组数据
        window.sessionStorage.setItem("lol", JSON.stringify(lol));
    }
    //设置杀人
    $(".li").eq(day.length * 7 - 7).click(function () {
        console.log(day)
        //判断点击次数，等于0则可以点击，否则就不行
        if (click.length == 0) {
            $(".li").eq(day.length * 7 - 7).css("background-color", "#83b09a");
            $("li>span").eq(day.length * 7 - 7).css("border-right-color", "#83b09a");
            alert("天黑了，杀手开始行动了")
            //将点击函数赋值为自加
            activation++;
            //储存数据并在点击次数和背景里面添加0；
            // console.log(diarycolor)
            // console.log(click)
            boutton_operation();
            seesionOver();
            window.location.href = "./task-3-6.html";
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //警察回合
    let policer = player.filter(function (item, index) {
        return item.name == "警察";
    })
    $(".li").eq(day.length * 7 - 6).click(function () {
        if (click.length == 1) {
            activation++;
            boutton_operation();
            seesionOver();
            if (policer[0].death == false && diarycolor.length > 4) {
                $(".li").eq(day.length * 7 - 6).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 6).css("border-right-color", "#83b09a");
                alert("警察已经被杀手干死了")
            } else {
                $(".li").eq(day.length * 7 - 6).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 6).css("border-right-color", "#83b09a");
                alert("警察独自一人开始验人.")
                window.location.href = "./task-3-6.html";
            }
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //狙击手回合
    let sniper = player.filter(function (item, index) {
        return item.name == "狙击手";
    })
    $(".li").eq(day.length * 7 - 5).click(function () {
        if (click.length == 2) {
            activation++;
            boutton_operation();
            seesionOver();
            if (sniper[0].death == false && diarycolor.length > 4) {
                $(".li").eq(day.length * 7 - 5).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 5).css("border-right-color", "#83b09a");
                alert("狙击手已经被干死了")
            } else {
                $(".li").eq(day.length * 7 - 5).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 5).css("border-right-color", "#83b09a");
                alert("狙击手开始狙击.")
                window.location.href = "./task-3-6.html";
            }
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //医生回合
    let doctor = player.filter(function (item, index) {
        return item.name == "医生";
    })
    $(".li").eq(day.length * 7 - 4).click(function () {
        if (click.length == 3) {
            activation++;
            boutton_operation();
            seesionOver();
            if (doctor[0].death == false && diarycolor.length > 4) {
                $(".li").eq(day.length * 7 - 4).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 4).css("border-right-color", "#83b09a");
                alert("医生已经被干死了")
            } else {
                $(".li").eq(day.length * 7 - 4).css("background-color", "#83b09a");
                $("li>span").eq(day.length * 7 - 4).css("border-right-color", "#83b09a");
                alert("医生开始救人.")
                window.location.href = "./task-3-6.html";
            }
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //遗言环节
    $(".li").eq(day.length * 7 - 3).click(function () {
        if (click.length == 4) {
            $(".li").eq(day.length * 7 - 3).css("background-color", "#83b09a");
            $("li>span").eq(day.length * 7 - 3).css("border-right-color", "#83b09a");
            alert("请死者发表遗言")
            boutton_operation();
            seesionOver();
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //讨论环节
    $(".li").eq(day.length * 7 - 2).click(function () {
        if (click.length == 5) {
            $(".li").eq(day.length * 7 - 2).css("background-color", "#83b09a");
            $("li>span").eq(day.length * 7 - 2).css("border-right-color", "#83b09a");
            alert("现在玩家开始讨论谁是杀手")
            boutton_operation();
            seesionOver();
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });
    //投票环节
    $(".li").eq(day.length * 7 - 1).click(function () {
        if (click.length == 6) {
            $(".li").eq(day.length * 4 - 1).css("background-color", "#83b09a");
            $("li>span").eq(day.length * 4 - 1).css("border-right-color", "#83b09a");
            alert("进入投票环节")
            boutton_operation();
            seesionOver();
            sessionStorage.setItem("day", JSON.stringify(day));
            window.location.href = "./task-3-6.html";
        } else {
            alert("请遵守游戏步骤进行游戏");
        }
    });

    //判断是否有了日记，没有则创建一个日记数组并存储（因为页面要复用）
    if (JSON.parse(window.sessionStorage.getItem("diary"))) {
        diary = JSON.parse(window.sessionStorage.getItem("diary"));
    } else {
        //创建一个空数组
        diary = new Array();
        sessionStorage.setItem("diary", JSON.stringify(diary));
    }
    //日志监听
    $("#gamer").click(function () {
        seesionOver();
        diary.push(0);
        sessionStorage.setItem("diary", JSON.stringify(diary));
        window.location.href = "./task-3-6.html";
    });
    //结束游戏
    $("#over").click(function () {
        let c = confirm("是否提前结束游戏")
        if (c == true) {
            sessionStorage.clear();
            window.location.href = "./task-2-1.html";
        }
    });
});