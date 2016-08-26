/**
 * Created by Administrator on 2016/7/18.
 */
$(document).ready(function () {
    $(window).on('scroll', function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        //console.log(scrollTop);
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0;
        var landingHeight = parseInt($('.landing').css('height'));
        var ladingTop = scrollTop + (clientHeight - landingHeight) / 2;
        $('.landing').animate({'top': ladingTop}, 10);
    });
    $('.A-hadd2-L').on('click', function () {
        $('.landing').css({'display': 'block', transform: 'rotateY(0deg)', 'zIndex': 9999});
        $('.landing2').css('zIndex', 0);
        $('.lmask').css({'opacity': .6, 'zIndex': 1})
    });
    $('.landing-T>a').on('click', function () {
        $('.landing').css({'transform': 'rotateY(90deg)', 'zIndex': 0});
        $('.lmask').css({'opacity': 0, zIndex: -1});
    });
    $('#landing-B-A').on('click', function () {
        $('.landing1').css('zIndex', 0);
        $(".landing2").css('zIndex', 9999);
    });
    setInterval(function () {
        $.ajax({
            url: '../data/landing.txt',
            success: function (e) {
                var arr = eval(e);
                var num = Math.floor(Math.random() * arr.length);
                $('.A-hadd3>p').html('当前在线人数：' + arr[num]);
            }
        });
    }, 500);
});

function login(ev) {
    var ev = ev || window.event;
    var name = window.localStorage.getItem("name");
    console.log(name);
    var pass = window.localStorage.getItem("pass");
    if ($(".name").val() == name && $(".pass").val() == pass) {
        ev.stopPropagation();
        alert("hello");
        window.location.href = 'body.html';
        document.querySelector('.A-hadd2-L').textContent = name;
    } else if ($(".name").val() != name) {
        alert("账号错误");
    } else {
        alert("密码错误");
    }
}