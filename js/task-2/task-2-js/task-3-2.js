//读取上个网页数据
var version = JSON.parse(window.sessionStorage.getItem("version"));
//获取Input节点
var textnumber = document.getElementById("TextNumber");
var rangenumber = document.getElementById("RangeNumber");

//返回按钮的监听
var B = document.getElementsByClassName("returm");
B[0].addEventListener("click", home);

//帮助按钮
$(".help").click(function () {
    var help = confirm("观看游戏说明？")
    if (help == true) {
        window.location.href = "./task-2-0.html";
    }
});

function home() {
    sessionStorage.clear();
    window.sessionStorage.setItem("version", JSON.stringify(version));
    window.location.href = "./task-2-1.html"
}

//让文本input和滑块Input关联,加了个限制
textnumber.addEventListener("change", fChang);

function fChang() {
    var nPlayer = textnumber.value;
    var NUBM = /^\d+$/;
    if (NUBM.test(nPlayer)) {
        if (textnumber.value >= 12 && textnumber.value <= 18) {
            rangenumber.value = textnumber.value;
        } else {
            alert("玩家数不能小于12或大于18");
        }
    } else {
        alert("只接受数字");
        return true;
    }
};

//让滑块input的默认值和文本Input的默认值关联
rangenumber.oninput = function () {
    textnumber.value = rangenumber.value;
}

//减号按钮监听
document.getElementById("btn-1").addEventListener("click", oBtn);

function oBtn() {
    var play = rangenumber;
    if (play.value >= 13) {
        play.value--;
        rangenumber.oninput();
    } else {
        alert("玩家数最少为12人");
    }
}

//加号按钮监听
document.getElementById("btn-3").addEventListener("click", oBTN);

function oBTN() {
    var play = rangenumber;
    if (play.value <= 17) {
        play.value++;
        rangenumber.oninput();
    } else {
        alert("玩家数最大为18人");
    }
}

//设置一个全局元素为后面的条件触发买下伏笔
var one = 0;

document.getElementById("2").addEventListener("click", oPlayers);

function oPlayers() {
    //获取人数
    var PeopleNumber = textnumber.value;
    //获取杀手数
    var KillerNumber = Math.floor(PeopleNumber / 3);
    //设置警察数
    var policeNumber = 1;
    //设置狙击手数
    var sniperNumber = 1;
    //设置医生数
    var doctorNumber = 1;
    //平民torNumber;
    var CivilianNumber = PeopleNumber - KillerNumber - policeNumber - sniperNumber - doctorNumber
    //设置点击还原
    var UL = document.getElementById("1");
    var LI2 = document.getElementsByTagName("li");
    for (var nub = LI2.length; nub > 0; nub--) {
        UL.removeChild(LI2[0]);
    }
    if (PeopleNumber < 12 || PeopleNumber > 18) {
        alert("玩家数量错误");
        one = 0;
    } else {
        //添加警察
        for (var NUB = 0; NUB < policeNumber; NUB++) {
            var node = document.createElement("li");
            var text = document.createTextNode("    警 察 1人");
            var Square = document.createElement("span");
            node.appendChild(Square);
            node.appendChild(text);
            node.className = "accountant";
            document.getElementById("1").appendChild(node);
        }
        //添加狙击手
        for (var NUB = 0; NUB < sniperNumber; NUB++) {
            var node = document.createElement("li");
            var text = document.createTextNode("    狙击手 1人");
            var Square = document.createElement("span");
            node.appendChild(Square);
            node.appendChild(text);
            node.className = "accountant";
            document.getElementById("1").appendChild(node);
        }
        //添加医生
        for (var NUB = 0; NUB < doctorNumber; NUB++) {
            var node = document.createElement("li");
            var text = document.createTextNode("    医 生 1人");
            var Square = document.createElement("span");
            node.appendChild(Square);
            node.appendChild(text);
            node.className = "accountant";
            document.getElementById("1").appendChild(node);
        }
        //添加杀手
        for (var NUB = 0; NUB < KillerNumber; NUB++) {
            var node = document.createElement("li");
            var text = document.createTextNode("    杀  手 1人");
            var Square = document.createElement("span");
            node.appendChild(Square);
            node.appendChild(text);
            node.className = "accountant";
            document.getElementById("1").appendChild(node);
        }
        //添加平民
        for (var Nub = 0; Nub < CivilianNumber; Nub++) {
            var nade = document.createElement("li");
            var text = document.createTextNode("    平  民 1人");
            var Square = document.createElement("span");
            nade.appendChild(Square);
            nade.appendChild(text);
            nade.className = "accountants";
            document.getElementById("1").appendChild(nade);
        }
        //one值
        one = 1;
    }
};

//发牌按钮
document.getElementById("3").addEventListener("click", three);

function three() {
    //获取人数
    var PeopleNumber = textnumber.value;
    //设置警察数
    var policeNumber = 1;
    //设置狙击手数
    var sniperNumber = 1;
    //设置医生数
    var doctorNumber = 1;
    //获取杀手数
    var KillerNumber = Math.floor(PeopleNumber / 3);
    //平民
    var CivilianNumber = PeopleNumber - policeNumber - sniperNumber - doctorNumber - KillerNumber;
    if (one == 1) {
        //创建空数组
        var all = [];
        //将警察加入数组
        for (var k = 0; k < policeNumber; k++) {
            all.push("警 察");
        }
        //将狙击手加入数组
        for (var k = 0; k < sniperNumber; k++) {
            all.push("狙击手");
        }
        //将医生加入数组
        for (var k = 0; k < doctorNumber; k++) {
            all.push("医 生");
        }
        //将杀手加入数组
        for (var k = 0; k < KillerNumber; k++) {
            all.push("杀  手");
        }
        //平民加入数组
        for (var c = 0; c < CivilianNumber; c++) {
            all.push("平  民");
        }
        //console.log(all);
        //洗牌
        for (var p = all.length - 1; p >= 0; p--) {
            var rand = Math.floor(Math.random() * (p + 1))
            var i = all[p];
            all[p] = all[rand];
            all[rand] = i;
        }
        console.log(all);
        //将数据存储到"all"里（数组）
        window.sessionStorage.setItem("all", JSON.stringify(all));
        window.location.href = "./task-3-3.html";
    } else {
        alert("请配比好玩家人数");
    }
}