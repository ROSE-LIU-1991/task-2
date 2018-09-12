$(document).ready(function () {
    //关联2个input
    $(".gin").click(function () {
        let name = $("#ipt-1").val();
        let pass = $("#ipt-2").val();
        console.log(name);
        console.log(pass);
    })
});