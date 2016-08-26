/**
 * Created by cms on 2016/7/18.
 */
//input 聚焦事件
$ (function () {
    $ ("input").focus (function () {
        $ (this).css ("border", "1px solid #22A0C8");
    });
    //单独设置生日失焦事件
    $ (".date").blur (function () {
        $ (this).css ("border", "1px solid #A7B6C4");
    })
})

//input:text事件
function textShow (_this, text, position) {
    if (arguments.length == 1) {
        return;
    } else if (arguments.length == 2) {
        $ (_this).next ()
            .css ("backgroundPosition", position)
            .animate ({'opacity': 1}, 100);
        $ (_this).css ("border", "1px solid red")
    } else if (text == "") {
        $ (_this).next ()
            .animate ({'opacity': 1}, 100)
            .html ('　')
            .css ("backgroundPosition", position);
        $ (_this).css ("border", "1px solid #A7B6C4");
    } else {
        $ (_this).next ()
            .html (text)
            .animate ({'opacity': 1}, 100)
            .css ("backgroundPosition", position);
        $ (_this).css ("border", "1px solid red")
    }
}
function textHide (_this) {
    $ (_this).next ().animate ({'opacity': 0}, 100);
    $ (_this).css ("border", "1px solid #A7B6C4");
}
//input:password事件
function pswShow (_this, text) {
    if (arguments.length == 1) {
        $ (_this).next ()
            .animate ({'opacity': 1}, 100); //显示错误框
        $ (_this).next ().children ()
            .animate ({'opacity': 1}, 100)
        $ (_this).css ("border", "1px soleid red") //边框变红
    }
}
function pswHide (_this, text) {
    $ (_this).next ().animate ({'opacity': 0}, 100);  //隐藏提示框
    $ (_this).next ().children ().animate ({'opacity': 0}, 100)
    $ (_this).css ("border", "1px solid #A7B6C4");   //边框颜色还原
}
//阅读协议事件
$ (function () {
    $ (".read").click (function () {
        if ($ (this).hasClass ("checked")) {
            $ (this).removeClass ("checked");
            $ (".submit").addClass ("disabled");
        } else {
            $ (this).addClass ("checked");
            $ (".submit").removeClass ("disabled");
        }
    })
})
//隐私协议事件
$ (function () {
    $ (".protocol").on ('click', function () {
        //阻止冒泡,允许点击协议
        $ (".protocol").children ("div").on ('click', function (ev) {
            var ev = ev || event;
            ev.stopPropagation (true);
        });
        $ (this).css ("backgroundPosition", "-15px -319px")
        if ($ (this).children ("div").css ("display") == "none") {
            $ (this).children ("div").slideDown ();
        } else {
            $ (this).children ("div").hide (600);
            $ (this).css ("backgroundPosition", "-35px -319px")
        }
    })
})