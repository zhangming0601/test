/**
 * Created by cms on 2016/7/18.
 */
$(function () {
    var $name, $pass, $repass, $date, $mobile, $code, grade, $verify, $code;
    //昵称 ajax
    $(".name").on('blur', function () {
        var _this = this;
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: 'php/name.php',
            type: 'get',
            beforeSend: function (xhr) {
                if (!$(_this).val()) {
                    textShow(_this, "昵称不可以为空", "0 -342px");
                    return false;
                } else {
                    textShow(_this, "", "0 -241px");
                }
            },
            success: function (data) {
                $name = data;
                console.log($name);
            }
        })
    });
    //密码
    $(".pass").on('keyup', function () {
        var _this = this;
        textHide($(this).next()[0]);
        pswShow(this);   //密码提示框显示
        var value = $(this).val();
        var arr = ["试试字母、数字、标点的组合吧", "复杂度还行，再加强一下等级？", "密码强度好，请记牢！"];
        var index = 0;
        //以下是对密码强度进行判断
        //长度是否达标
        if (value.length > 5 && value.length < 17) {
            $(this).next()[0].firstElementChild.style.backgroundPosition = "0 -245px";
            $(this).next()[0].firstElementChild.style.color = "#000";
        } else {
            $(this).next()[0].firstElementChild.style.backgroundPosition = "0 -280px";
            $(this).next()[0].firstElementChild.style.color = "red";
        }
        //长度是否够长
        if (value.length > 9 && value.length < 17) {
            index++;
        }
        //是否有空格
        if (/[ \t\n\x0B\f\r]/.test($(_this).val())) {
            $(this).next()[0].lastElementChild.style.backgroundPosition = "0 -280px";
            $(this).next()[0].lastElementChild.style.color = "red";
        } else {
            $(this).next()[0].lastElementChild.style.backgroundPosition = "0 -245px"
            $(this).next()[0].lastElementChild.style.color = "#000";
        }
        //是否纯数字和纯字母判断
        if (/^[1-9]+$/.test($(_this).val()) || /^[A-Za-z]+$/.test($(_this).val())) {
            $(this).next()[0].children[1].style.backgroundPosition = "0 -280px";
            $(this).next()[0].children[1].style.color = "red";
        } else {
            $(this).next()[0].children[1].style.backgroundPosition = "0 -245px";
            $(this).next()[0].children[1].style.color = "#000";
        }
        //英文大写判断
        if (/[A-Z]/.test($(_this).val())) {
            index++;
        }
        //根据密码强度不同显示不一样的提示,事件在blur里
        grade = index;
    });
    $(".pass").on('blur', function () {
        var _this = this;
        var arr = [["试试字母、数字、标点的组合吧", "0 -90px"], ["复杂度还行，再加强一下等级", "0 -134px"], ["密码强度好，请记牢", "0 -179px"]];
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: 'php/pass.php',
            type: 'get',
            beforeSend: function (xhr) {
                //密码由6位以上的字母和数字组成，至少包含一个字母和数字
                if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test($(_this).val()))) {
                    pswShow(_this);            //密码格式提示框显示
                    $(_this)[0].style.border = "1px solid red";
                    //$ ($ (this)).css ("border", "1px solid red");
                    return false;
                } else {
                    pswHide(_this, "");         //密码提示框隐藏
                    textShow(                  //密码强度显示
                        $(_this).next()[0],
                        "<span class='tips'>" + arr[grade][0] + "</span>",
                        arr[grade][1]
                    );
                }
            },
            success: function (data) {
                $pass = data;
                console.log($pass);
            }
        });
    });
    $(".repass").on('blur', function () {
        var _this = this;
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: 'php/pass.php',
            type: 'get',
            beforeSend: function (xhr) {
                if ($(_this).val() !== $pass) {
                    pswShow(_this);
                    $(_this).css("border", "1px solid red");
                    textShow(_this, "密码不一致", "0 -275px");
                    return false
                } else {
                    textShow(_this, "", "0 -245px");
                }
            },
            success: function (data) {
                $repass = data;
                console.log(data);
            }
        });
    });
    //生日
    $(".date").on('blur', function () {
        var _this = this;
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: "php/date.php",
            type: "get",
            beforeSend: function (xhr) {
                if (!$(_this).val()) {
                    textShow(_this, "请选择生日", "0 -342px");
                    return false;
                } else {
                    textShow(_this, "", "0 -241px");
                }
            },
            success: function (data) {
                $date = data;
                console.log($date);
            }
        });

    });
    //手机
    $(".mobile").on('blur', function () {
        var _this = this;
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: 'php/mobile.php',
            type: 'get',
            beforeSend: function (xhr) {
                //alert ($ (_this));input
                if (!(/^1[3|4|5|7|8]\d{9}$/.test($(_this).val()))) {
                    textShow(_this, "请输入正确的手机号", "0 -342px");
                    return false;
                } else {
                    //alert ("手机正确");
                    textShow(_this, "", "0 -241px");
                }
            },
            success: function (data) {
                $mobile = data;
                console.log(data);
            }
        })
    });
    //验证码
    $(".getcode").on('click', function () {
        $.ajax({
            url: 'php/getcode.php',
            type: 'get',
            success: function (data) {
                $(".getcode").val(data);
                $verify = data;
                console.log($verify);
            },
        })
    })
    $(".code").on('blur', function () {
        if ($(this).val() != $verify) {
            textShow(this, "验证码错误", "0 -342px");
        } else {
            textShow(this, "", "0 -241px");
        }
    })
    //立即注册ajax
    $(".submit").on('click', function () {
        var $code = $(".code").val();
        var _this = this;
        var arr = [
            [$name, "用户名不能为空"],
            [$pass, "密码不能为空"],
            [$repass, "请核对密码"],
            [$date, "请选择生日"],
            [$mobile, "手机号码无效"],
            [$code, "验证码错误"]
        ];
        if ($(".submit").hasClass("disabled")) {
            return;
        }
        $.ajax({
            data: $("#ajaxForm").serialize(),
            url: 'php/messages.php',
            beforeSend: function (xhr) {
                if (!$name || !$pass || !$repass || !$date || !$mobile || !$code) {
                    $(".getcode").val("获取验证码");
                    clearTimeout(_this.timer);
                    for (var i = 0; i < arr.length; i++) {
                        if (!arr[i][0]) {
                            break;
                        }
                    }
                    $(_this).addClass("disabled");
                    $(_this)[0].value = arr[i][1];
                    _this.timer = setTimeout(function () {
                        $(".submit").removeClass("disabled");
                        $(_this)[0].value = "立即注册";
                    }, 500)
                    return false;
                }
                if ($verify != $code) {
                    return false;
                }
            },

            success: function (data) {
                alert(data);
                window.localStorage.setItem('name', $name);
                window.localStorage.setItem('pass', $pass);
                window.localStorage.setItem('date', $date);
                window.localStorage.setItem('mobili', $mobile);
                $("#ajaxForm ul li input[type='text']").val("");
                $("#ajaxForm ul li input[type='password']").val("");
                pswHide($(".name")[0], "");
                textHide($(".pass").next()[0], "");
                pswHide($(".repass")[0], "");
                pswHide($(".date")[0], "");
                pswHide($(".mobile")[0], "");
                pswHide($(".code")[0], "");
                alert("你的帐号是："+window.localStorage.getItem("name"));
                window.location.href = "html/body.html";
            },
            data: $("#ajaxForm").serialize(),
            type: 'get'
        });
    })
})