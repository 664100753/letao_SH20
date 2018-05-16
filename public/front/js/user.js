/**
 * Created by 张帅 on 2018/5/16.
 */
$(function(){
  
  //已进入页面就发送ajax请求后台数据
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function( info ){
      console.log(info);
      //如果用户未登录,跳转到登录页面
      if(info.error === 400){
        //跳转到登录页面
        location.href = "login.html";
        return;
      }
      //模板渲染页面
      var str= template('temp',info);
      //结合模板渲染页面
      $('.mui-scroll').html(str);
      
      
    }
  });
  
  //功能2
  $('.mui-scroll').on('click','#btn',function(){
    // alert(123)
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        // console.log(info)
        //如果用户退出成功,跳转到登录页面
        if(info.success){
          //跳转到登录页面
          location.href = 'login.html';
        }
      }
    })
  })
});