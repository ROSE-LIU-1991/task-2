//声明一个函数，给它一个参数
function Shuffle(n) {
    //设置一个变量，它的值为参数n的长度，即位为n的实际长度
    var length = n.length;
    //设置for循环，变量N=0，和一个空值，循环第一条件为0，
    //执行第二条件，N是否小于length，小于则继续执行，每执行一次循环后执行一次N++
    for (var N = 0, rand; N < length; N++) {
        //给刚刚设置的变量rand赋值，赋值的值为Math.random，此为0.0~1.0的数
        //根据Math.floor，这句为向下取整，所以为0-1的数
        // * 即为数学的乘号，所以给rand赋值为（0~1）*（i+1）
        //意思就是第一次循环给rand赋值为（0~1）*（0+1）就是随机赋值为0~1之间的数，第二次就是0~2之间的数，直到退出循环
        rand = Math.floor(Math.random() * (N + 1));
        var temp = n[N];
        n[N] = n[rand];
        n[rand] = temp;
    }
}
//参数n设置数组0~8；
n = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//随机运行函数
Shuffle(n);

//随机生成颜色
function color() { //随机生成RGB颜色
    var rgb;
    var r = Math.floor(Math.random() * 256); //随机生成256以内r值
    var g = Math.floor(Math.random() * 256); //随机生成256以内g值
    var b = Math.floor(Math.random() * 256); //随机生成256以内b值
    rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

//重置颜色，随机抽取3个量，赋予颜色


function clear() {
    var a = document.getElementsByClassName("my");
    for (var i = 0; i < a.length; i++) {
        a[i].style.backgroundColor = "#ff8c00";
    }
    a[n.slice(0, 3)[0]].style.backgroundColor = color();
    a[n.slice(0, 3)[1]].style.backgroundColor = color();
    a[n.slice(0, 3)[2]].style.backgroundColor = color();
    console.log(n.slice(0, 3)[0], n.slice(0, 3)[1], n.slice(0, 3)[2])
}

//设置定时运行函数Shuffle(n)和clear()
function Timer() {
    Shuffle(n);
    clear();
    t = setTimeout("Timer()", 1000);
}
//开始闪
function start() {
    if (status == 0) {
        Timer();
        status = 1;
    } else {
        return;
    }
}

//结束闪
function end() {
    clearTimeout(t);
    status = 0;
    units = document.getElementsByClassName("my");
    for (i = 0; i < units.length; i++) {
        units[i].style.backgroundColor = "#ff8c00";
    }
}