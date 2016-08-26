/**
 * Created by 谢康炎 on 2016/7/18.
 */

    $(function(){
        $(window).scroll(function(){
            var a=$(document).scrollTop();
            //console.log(a);
            if(a<560){
                $(".A-htbox").removeClass("fixed");
                $(".A-htbox a").css("color","#ffffff");
                $(".A-htbox p").css("color","#ffffff");
                $(".A-hlogo").css("background","url('../images/imlogo.png') no-repeat center center");
            }else if(a>560&&a<1375){
                $(".A-htbox").addClass("fixed");
                $(".A-htbox a").css("color","#000000");
                $(".A-htbox p").css("color","#000000");
                $(".A-hlogo").css("background","url('../images/imlogob.png') no-repeat center center");

                $(".a-backgI").css("background","url('../images/bg1_1600.jpg') no-repeat center top");
            }else if(a>1375&&a<2530){
                $(".A-htbox").addClass("fixed");
                $(".A-htbox a").css("color","#000000");
                $(".A-htbox p").css("color","#000000");
                $(".A-hlogo").css("background","url('../images/imlogob.png') no-repeat center center");

                $(".a-backgI").css("background","url('../images/avds.jpg') no-repeat center top");
            }else if(a>2530){
                $(".A-htbox").addClass("fixed");
                $(".A-htbox a").css("color","#000000");
                $(".A-htbox p").css("color","#000000");
                $(".A-hlogo").css("background","url('../images/imlogob.png') no-repeat center center");

                $(".a-backgI").css("background","url('../images/bg3_1600.jpg') no-repeat center top");
            }
            if(a>3600){
                $(".A-div div").addClass("A-div11");
            }else {
                $(".A-div div").removeClass("A-div11");
            }

        })
    })











