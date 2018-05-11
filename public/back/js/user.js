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
   
   
   //点击禁用,启用使用模态框,设置模态框
  $('.lt_content tbody').on('click','.btn',function(){
    $('#userModal').modal('show');
    
    //当点击按钮的时候,获取id发送ajax请求
    //获取当前用户id
    var id = $(this).parent().data('id');
    //判断当前用户的状态,是禁用还是启用按钮
    //判断用户需要设置成什么状态
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    
    //点击确认按钮(模态框)
    // 添加点击事件, 让某个用户启用禁用, 说白了, 就是重复注册了
    // 之前注册的还存在, 导致代码重复执行了
    // 通过 off() 可以将之前重复注册的事件移除, 再进行事件绑定, 可以保证只有一个事件绑定了
    $('#userBtn').off().click(function(){
      //发送ajax请求
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        dataType:'json',
        success:function( info ){
          //判断返回的状态
          if(info.success){
            //隐藏模态框
            $('#userModal').modal('hide');
            //重新渲染页面
            render();
          }
        }
      })
    })
   
   
  })
});
