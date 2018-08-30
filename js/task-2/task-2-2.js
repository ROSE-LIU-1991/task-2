//获取Input节点
var textnumber = document.getElementById("TextNumber");
var rangenumber = document.getElementById("RangeNumber");


//让文本input和滑块Input关联,加了个限制
textnumber.onchange = function () {
    var player = this.textContent.value;
    var NUBM = /^\d+$/;
    if (NUBM.test(player)) {
        if (textnumber.value >= 4 && textnumber.value <= 18) {
            rangenumber.value = textnumber.value;
        } else {
            alert("玩家数不能小于4或大于18");
        }
    } else {
        alert("只接受数字");
    }
};

//让滑块input的默认值和文本Input的默认值关联
rangenumber.oninput = function () {
    textnumber.value = rangenumber.value;
}

//减号按钮监听
document.getElementById("btn-1").addEventListener("click", function () {
    var play = rangenumber;
    if (play.value >= 5) {
        play.value--;
        rangenumber.oninput();
    } else {
        alert("玩家数不能小于4或大于18");
    }
})

//加号按钮监听
document.getElementById("btn-3").addEventListener("click", function () {
    var play = rangenumber;
    if (play.value <= 17) {
        play.value++;
        rangenumber.oninput();
    } else {
        alert("玩家数不能小于4或大于18");
    }
})

//设置一个全局元素为后面的条件触发买下伏笔
var one = 0;

document.getElementById("2").addEventListener("click", function () {
    //获取人数
    var PeopleNumber = textnumber.value;
    //获取杀手数
    var KillerNumber = Math.floor(PeopleNumber / 3);
    //平民
    var CivilianNumber = PeopleNumber - KillerNumber;
    //设置点击还原
    var UL = document.getElementById("1");
    var LI2 = document.getElementsByTagName("li");
    for (var nub = LI2.length; nub > 0; nub--) {
        UL.removeChild(LI2[0]);
    }
    if (PeopleNumber < 4 || PeopleNumber > 18) {
        alert("玩家数量错误")
    } else {
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
});

//发牌按钮
document.getElementById("3").addEventListener("click", three);

function three() {
    //获取人数
    var PeopleNumber = textnumber.value;
    //获取杀手数
    var KillerNumber = Math.floor(PeopleNumber / 3);
    //平民
    var CivilianNumber = PeopleNumber - KillerNumber;
    if (one == 0) {
        alert("请配比好玩家人数");
    } else {
        //创建空数组
        var all = [];
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
            all[rand] = p;
        }
        //将数据存储到"all"里（数组）
        window.sessionStorage.setItem("all", JSON.stringify(all));
        window.location.href = "./task-2-3.html";
    }

}

//返回按钮的监听
var B = document.getElementsByClassName("returm");
B[0].addEventListener("click", home);

function home() {
    window.location.href = "./task-2-1.html"
}

// //2个全局函数
// var textnumber = document.getElementById("TextNumber");
// var rangenumber = document.getElementById("RangeNumber");

// //设置函数是否为4~18
// function check() {
//     var num = textnumber.value;
//     //设置成一个以数字开头，以数字结尾的字符串；
//     var reg = /^\d+$/;
//     if (reg.test(num)) {
//         if (num <= 18 && num >= 4) {
//             return num;
//         } else {
//             alert("4~18");
//             return false;
//         }
//     } else {
//         alert("请输入数字");
//         return false;
//     }
// }
// //根据输入的人数分配职业，并且保存在数组中第二种方法
// //输入框监听
// textnumber.addEventListener("change", change);

// function change() {
//     var player = check();
//     rangenumber.value = textnumber.value;
// }

// //设置框监听
// document.getElementById("2").addEventListener("click", function () {
//     var play = check();
//     var indentity = new Array();
//     var killnum = Math.floor(play / 4);
//     var civinum = play - killnum;
//     document.getElementById("a").innerHTML = "杀手" + killnum + "人";
//     document.getElementById("b").innerHTML = "平民" + civinum + "人";
// })

// //滑块监听
// rangenumber.oninput = function () {
//     textnumber.value = rangenumber.value;
// }
// //打乱数组Fisher-Yates Shuffle
// function shuffle(array) {
//     var _array = array.concat();
//     for (var i = _array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = _array[i];
//         _array[i] = _array[j];
//         _array[j] = temp;
//     }
//     return _array;
// }

// //发牌按钮监听
// document.getElementById("3").addEventListener("click", deal);
// function deal() {
//     var indentity = change();
//     if (indentity != false) {
//     var indentity = new Array();
//     var randomIndentity = shuffle(indentity);
//         //存储数据到obj里(数组)
//         window.sessionStorage.setItem('obj', JSON.stringify(randomIndentity));
//         window.sessionStorage.removeItem('status');
//         window.location.href = "./flip.html";
//     }
// }
