/**
 * Created by 张帅 on 2018/5/11.
 */
//用户页面动态渲染功能
$(function(){
  //发送ajax请求
  
  var currentPage = 1;
  var pageSize = 5;
   function render(){
     $.ajax({
       type:'get',
       url:'/user/queryUser',
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       dataType:'json',
       success:function( info ) {
         console.log(info);
         var htmlStr = template('userTpl',info);
         //添加数据到页面
         $('.lt_content tbody').html(htmlStr);
         //设置分页
      
         $('#paginator').bootstrapPaginator({
           bootstrapMajorVersion: 3,
           //设置当前页
           currentPage: info.page,
           //设置页数
           totalPages: Math.ceil(info.total / info.size ),
           //点击分页事件
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
   
   //已进入页面就渲染一次
  render();
});
