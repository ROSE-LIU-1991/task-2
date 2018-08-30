//第一种跳转页面的方法
function b() {
    window.location.href = "./task-2-2.html";
};

// 第二种跳转页面的方法
var a = document.getElementsByClassName("version")[1];
a.onclick = function () {
    window.location.href = "./task-2-2.html";
    console.log(a);
};

//第三种跳转页面的方法，
var d = document.getElementsByClassName("version")[2];
d.addEventListener("click", function () {
    window.location.href = "./task-2-2.html";
});

