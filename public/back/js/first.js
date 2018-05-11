/**
 * Created by 张帅 on 2018/5/11.
 */
//发送ajax,动态渲染数据
$(function(){
  
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
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
  $('#addBtn').click(function(){
    //让模态框显示
    $('#addModal').modal('show');
    
  });
  
  //点击确认按钮,进行表单校验
  $('#form').bootstrapValidator({
    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段 categoryName
    fields: {
      categoryName:{
        validators:{
          //非空校验
          notEmpty:{
            message:'请输入一级分类'
          }
        }
      }
    }
  })
  
  //阻止表单默认提交,利用ajax进行数据请求
  $('#form').on('success.form.bv',function( e ){
    //阻止form表单默认发送
    e.preventDefault();
    //获取添加的数据
    var data = $('#form').serialize();
    //发送ajax请求
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:data,
      dataType:'json',
      success:function( info ){
        // console.log(info)
        if(info.success){
          //隐藏模态框
          $('#addModal').modal('hide');
          //重新渲染页面
          //当前页
          currentPage = 1;
          render();
          
          
          //重置表单
          //获取表单实例,再调用其它方法
          //传true表示内容和状态都进行重置
          var validator = $('#form').data('bootstrapValidator').resetForm( true );
        }
      }
    })
  })
  

});
