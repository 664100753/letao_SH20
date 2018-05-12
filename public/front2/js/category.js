/**
 * Created by Jepson on 2018/5/12.
 */


$(function() {

  // 一进入页面发送 ajax 请求, 获取左侧列表数据, 进行渲染

  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function( info ) {
      console.log( info );
      // 根据数据进行渲染页面
      var htmlStr = template("leftTpl", info);
      $('.lt_category_left ul').html( htmlStr );
    }
  })

})