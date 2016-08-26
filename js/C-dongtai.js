
$(function(){

	// 导航栏开始
//
    // 导航栏结束
	//广告轮播图
		var banertime=setInterval(function(){
			$(".C-banner-one").fadeOut(4000).delay(4000).fadeIn(4000).delay(4000);
		},100)	;
   
	//切换页面
	$(".C-link-jin").on("click",function(){
		changeimg2();
	});
	$(".C-link-new").on("click",function(){
		changeimg1();
	});
	$(".C-banner-one").on("click",function(){
		changeimg2();
	});
	$(".C-banner-two").on("click",function(){
		changeimg1();
	});

		//第一个页面遮罩层
	$("#C-countWrap").children().each(function(index,element){
			$(element).on("mouseenter",function(){
				$(this).children(".C-ahover").stop().fadeIn(1000);
			});

			$(element).on("mouseleave",function(){
				$(this).children(".C-ahover").stop().fadeOut(1000);
			})
	});
	//动态数据获取
	$(".C-loading").on("click",function(){
		var $_thisNum=$(this).attr("pageNum");
		var $_this=$(this);		
 	 $.ajax({
  			url:"../PHP/QQdt.php",
  			type:"get",
  			data:{pages:$_thisNum},
  			success:function(data){
  			var datas=JSON.parse(data);	  			
  		  $_this.attr("pageNum",datas.page);  		 
  		 var html=template("template01",datas);
		 $(".C-loading").before(html); 			
  		}  	    
 	 });
	});

   //第二内容页面鼠标移入效果
   $(".C-count-new>ul").on("mouseenter","li",function(){   	    
   	    $(this).css("background-color","#fafafa").siblings("li").css("background-color","#ffffff");
   	    $(this).children().children("div").css("color","#03A9F4");
   	   $(this).children().children("p").css("color","#333");
   	  
   });
    $(".C-count-new>ul").on("mouseleave","li",function(){   	    
   	    $(this).css("background-color","#fff").siblings("li").css("background-color","#ffffff");
   	    $(this).children().children("div").css("color","#727373");
   	   $(this).children().children("p").css("color","#727373");
   	  
   })

})

function changeimg1(){
	$(".C-count-new").show(1000).siblings(".C-count").hide(800);
}
function changeimg2(){
	$(".C-count").show(1000).siblings(".C-count-new").hide(800);
}