
/*1.定义画布大小*/
var WDH;
var WDW;
// 2.定义绘画圆的大小
var R;
//3.定义数字与画布的间距
var MARGIN_left;
var MARGIN_top;

// 4.设置倒计时截止时间
var endTime=new Date();
endTime=endTime.getTime()+3*60*1000;
// 5.定义一个变量保存当前倒计时，总共有多少秒钟数
var curShowTimeSencond=0;
//9.定义一个数组存储生成的小球
var balls=[];
// 10定义一个数组放小球颜色
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
//定时器时间
var timeout=null;
window.onload=function(){
  clearInterval(timeout);  
  //自适应优化
   WDW = document.body.clientWidth; 
    WDH = document.body.clientHeight+100;
   MARGIN_left = Math.round(WDW /10);
    R = Math.round(WDW * 4 / 5 / 108)-1;
    MARGIN_top = Math.round(WDW /25);
	// 定义canvas
	var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width=WDW;
    canvas.height=WDH;    
	//6.在绘制前将时间获取到,使用函数计算
	curShowTimeSencond=GetcurShowTimeSencond();  
  //7.让时间动态变化
 timeout=setInterval(  
    function(){      
    render(context);
    //8.获取更新的时间
    update();
  }
  ,50);
    
}   

//获取更新时间
function update(){
  // 调用时间获取函数，得到下次需要显示的时间值
  var nexShowtimeSencond=GetcurShowTimeSencond();
  //将时间分解
  var nexhours=parseInt(nexShowtimeSencond/3600);
  var nexminutes=parseInt((nexShowtimeSencond-nexhours*3600)/60);
  var nexsenconds=parseInt(nexShowtimeSencond%60);

  //当前显示的时间值
   var curhours=parseInt(curShowTimeSencond/3600);
   var curminutes=parseInt((curShowTimeSencond-curhours*3600)/60);
   var cursenconds=parseInt(curShowTimeSencond%60);
// 跳转页面
if (nexShowtimeSencond==0) {
    clearInterval(timeout);
    window.location.href = "html/c-dongtai.html";
  }
   // 判断当前时间和显示时间是否不相同了
   if(nexsenconds!=cursenconds){
    //说明时间需要改变了
      // 11.生成小球是在时间变化时开始，所以我还要获取现在的时间中每个位置的个位和十位不同生成小球
      //小时
      if(parseInt(nexhours/10)!=parseInt(curhours/10)){
        // 调用添加小球的函数
        addBalls(MARGIN_left+0,MARGIN_top,parseInt(curhours/10));
      }
       if(parseInt(nexhours%10)!=parseInt(curhours%10)){
        // 调用添加小球的函数
        addBalls(MARGIN_left+15*(R+1),MARGIN_top,parseInt(curhours%10));
      }
      //分钟
       if(parseInt(curminutes/10)!=parseInt(nexminutes/10)){
        // 调用添加小球的函数
        addBalls(MARGIN_left+39*(R+1),MARGIN_top,parseInt(curminutes/10));
      }
       if(parseInt(curminutes%10)!=parseInt(nexminutes%10)){
        // 调用添加小球的函数
        addBalls(MARGIN_left+54*(R+1),MARGIN_top,parseInt(curminutes%10));
      }
      // 秒钟
        if(parseInt(cursenconds/10)!=parseInt(nexsenconds/10)){
        // 调用添加小球的函数
        addBalls(MARGIN_left+78*(R+1),MARGIN_top,parseInt(cursenconds/10));
      }
       if(parseInt(cursenconds%10)!=parseInt(nexsenconds%10)){
        // 调用添加小球的函数       

        addBalls(MARGIN_left+93*(R+1),MARGIN_top,parseInt(cursenconds%10));
      }

      curShowTimeSencond=nexShowtimeSencond;
    
   }
  // 更新小球
  updateballs();
}

//彩色小球的更新物理运动,然后下班就是去绘制
function updateballs(){
  // 把数组中的每个球那出来
  for (var i = 0; i < balls.length; i++) {
    // console.log(balls[2]);
    balls[i].x+=balls[i].vx;
    balls[i].y+=balls[i].vy;
    balls[i].vy+=balls[i].g;

  //判断小球是否触底
  if(balls[i].y>=WDH-R){
      balls[i].y=WDH-R;
      balls[i].vy=-balls[i].vy*0.75;
   }

  }


  //长时间运行会导致内存损耗，故删除多余了
  // 判断小球是否还在画面内
  var cnt=0;
  for (var i = 0; i < balls.length; i++) 
      if(balls[i].x+R>0 && balls[i].x-R<WDW){
          // cnt++;
          balls[cnt++]=balls[i];
      }

  while(balls.length>Math.min(300,cnt)){
    balls.pop();
  }
 // console.log(balls.length);
}





// 添加小球的函数，x:小球x的位置，y:表示小球yd 位置，num:当前的数字
function addBalls(x,y,num){
    // 循环数组找到当前的数字
    for (var i = 0; i < digit[num].length; i++) {
     for (var j = 0; j < digit[num][i].length; j++) {
         if (digit[num][i][j]==1) {
              //创建一个小球对象,vx:x方向速度，vy:方向速度,x:小球的位置，y:小球的位置,半径用之前的
              var aball={
                  x:x+j*2*(R+1)+(R+1),
                  y:y+i*2*(R+1)+(R+1),
                  vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                  vy:-5,
                  g:1.5+Math.random(),
                 color:colors[Math.floor( Math.random()*colors.length )]
              }
                 balls.push(aball);
         }
      
         // console.log(balls);
     }
    }
 }

function GetcurShowTimeSencond(){
	// 获取当前时间
	var curTime=new Date();
	// 计算出当前时间距离截止时间有多少毫秒
	var ret=endTime-curTime;
	// 将时间转换成秒
	ret=Math.round(ret/1000);
	// 返回这个时间,为了不出乱，将这个时间判断定格在0
	// 时间大于0秒这时间动，否则给个0

	return ret>0?ret:0;
}



    //一绘制试验 图像绘制函数
    function render(cxt){
    	//8. 将上次的画布内容清除    
       cxt.clearRect(0,0,WDW,WDH);
    // 将时间算出来
       var hours=parseInt(curShowTimeSencond/3600);
       var minutes=parseInt((curShowTimeSencond-hours*3600)/60);
       var senconds=parseInt(curShowTimeSencond%60);
    	//调用绘制函数-绘制小时十位
    	// renderDigit(0,0,parseInt(hours/10),cxt);
    	//调整距离-绘制小时十位
    	renderDigit(MARGIN_left,MARGIN_top,parseInt(hours/10),cxt);
    	// 绘制小时个位    	
    	renderDigit(MARGIN_left+15*(R+1),MARGIN_top,parseInt(hours%10),cxt);
    	// 绘制冒号
    	renderDigit(MARGIN_left+30*(R+1),MARGIN_top,10,cxt);
    	// 绘制分钟十位和个位
    	renderDigit(MARGIN_left+39*(R+1),MARGIN_top,parseInt(minutes/10),cxt);
    	renderDigit(MARGIN_left+54*(R+1),MARGIN_top,parseInt(minutes%10),cxt);
    	// 绘制冒号
    	renderDigit(MARGIN_left+69*(R+1),MARGIN_top,10,cxt);
    	//绘制秒钟
    	renderDigit(MARGIN_left+78*(R+1),MARGIN_top,parseInt(senconds/10),cxt);
    	renderDigit(MARGIN_left+93*(R+1),MARGIN_top,parseInt(senconds%10),cxt);


      //每次更新数据后还要画小球
     for (var i = 0; i < balls.length; i++) {
      // 将小球的颜色拿来
            cxt.fillStyle=balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
            cxt.closePath();
             cxt.fill();
     }
  }
// 二、参数说明x:水平开始距离，y垂直开始距离，num:绘制的数字,cxt:绘制方法
  function renderDigit(x,y,num,cxt){
    //绘制图形填充的颜色
    // cxt.fillStyle=rgb(0,102,153);
    cxt.fillStyle="red";
    //循环遍历digit数组
    for (var i = 0; i < digit[num].length; i++) {
      for (var j = 0; j < digit[num][i].length; j++) {
        if(digit[num][i][j]==1){
          //绘画开始方法
          cxt.beginPath();
           //绘画圆的函数
           cxt.arc(x+2*j*(R+1)+(R+1),y+2*i*(R+1)+(R+1),R,0,2*Math.PI);
           //绘画结束方法
           cxt.closePath();
            // 调用填充
           cxt.fill();
        }
      }
    }
  }
