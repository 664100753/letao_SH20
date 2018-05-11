/**
 * Created by 张帅 on 2018/5/11.
 */
//发送ajax,动态渲染数据
$(function(){
  
  var currentPage;
  var pageSize;
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage || 1,
        pageSize:pageSize || 5
      },
      dataType:'json',
      success:function( info ){
        console.log(info);
        //获取后台返回的数据
        var str = template('tpl',info);
        //渲染数据到页面
        $('.lt_content tbody').html(str);
        //设置分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages: Math.ceil(info.total / info.size ),
          onPageClicked:function(a,b,c,page){
            //更新当前页面
            currentPage = page;
            //重新渲染页面
            render();
          }
        })
      
      }
    })
  
  }
  
  //一进入页面就渲染一次
   render();
  
  //点击添加分类按钮模态框显示
  $('.lt_content .btn').on('click',function(){
    //让模态框显示
    $('#addModal').modal('show');
  })
  

});
