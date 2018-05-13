/**
 * Created by 张帅 on 2018/5/12.
 */
//动态生成侧边栏
$(function(){
  
  //发送ajax请求
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function( info ){
      console.log(info);
      var str = template('temp',info);
      
      $('#cates').html(str);
    }
  })
});