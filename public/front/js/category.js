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
      // console.log(info);
      var str = template('temp',info);
      
      $('#cates').html(str);
      //获取第一条信息
      renderId(info.rows[0].id);
    }
  });
  
  
  //二级分类页面渲染
  //注册事件委托
  $('#cates').on('click','a',function(){
    //获取id
    var id = $(this).data('id');
    // console.log(id);
    //排他
    $(this).addClass('current').parent().siblings().children().removeClass('current');
    
    //发送ajax请求
    renderId(id);
    
  });
  
  function renderId(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var str = template('tempRight',info);
      
        $('#ul_right').html(str);
      }
    })
    
  }
 
});