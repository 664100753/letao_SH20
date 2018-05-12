/**
 * Created by 张帅 on 2018/5/11.
 */
//动态渲染数据,利用模板引擎和ajax发送请求
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function( info ) {
        console.log(info);
        
        //渲染模板
        var str = template('temp',info);
        //渲染到页面
        $('.lt_content tbody').html(str);
        
        //设置分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size),
          onPageClicked:function(a,b,c,page){
            //更新当前页
            currentPage = page;
            //渲染当前页
          
            render();
          }
        })
      }
    })
    
  }
  
  //一进入页面进行渲染
  render();
  
  
  //添加模态框
  $('#addBtn').click(function(){
    //莫泰框显示
    $('#secondModal').modal('show');
    
  //  发送ajax请求
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'GET',
      data: {
        page: 1,
        pageSize: 100
      },
      
      success:function(info){
        var strH = template('dropdownTpl',info);
        //渲染下拉框
        $('.dropdown-menu').html(strH);
      }
    })
  });
  
  //通过事件委托来进行绑定事件
  $('.dropdown-menu').on('click','a',function(){
    //获取当前元素的内容
    var txt = $(this).text();
    //添加文本框中
    $('#dropdownText').text(txt);
    
    //获取当前a的id,设置给input框中
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
  
    // 由于插件不会对隐藏域的修改进行监听, 所以我们需要手动设置隐藏域的校验状态
    // 参数1: 字段名
    // 参数2: 校验状态   VALID 成功  INVALID 失败
    // 参数3: 校验规则, 错误状态下的提示文本
    
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  });
  
  //配置文件上传
  
  /*
   * 完成图片上传思路
   * 1. 引包
   * 2. 写结构, input:file 配置 name 和 data-url
   * 3. 写js, 进行文件上传初始化, 配置回调函数, 进行图片上传回调处理
   * */
  
  $('#fileupload').fileupload({
    //指定返回回来的数据格式
    dataType:'json',
    //上传完成的回调函数
    done:function( e, data){
      //拿到上传完成得图片地址
      var picUrl = data.result.picAddr;
      
      //设置到图片src中
      $('#imgBox img').attr('src',picUrl);
      //还要设置到input中去
      $('[name="brandLogo"]').val(picUrl);
      
      //设置隐藏域的校验状态为VALID
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });
  
  // 5. 表单校验
  $('#form').bootstrapValidator({
    
    // 默认对隐藏域不进行校验, 我们需要重置
    excluded: [],
    
    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    // 配置校验的字段
    fields: {
      // categoryId 所属分类 id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      
      // brandName 品牌名称, 二级分类
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      
      // brandLogo 图片地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
      
    }
    
  });
  
  
  //注册表单校验成功事件,阻止默认提交,通过ajax进行提交
  $('#form').on('success.form.bv',function(e){
    //阻止默认表单提交
    e.preventDefault();
    var data = $('#form').serialize();
    
    
    $.ajax({
      type:'post',
      url: "/category/addSecondCategory",
      data:data,
      success:function(info){
        if(info.success){
          //隐藏模态框
          $('#secondModal').modal('hide');
          //重新渲染第一页
          currentPage = 1;
          render();
          
          //将表单内容重置
          $('#form').data('bootstrapValidator').resetForm( true );
          
          //将文本重置
          $('#dropdownText').text('请选择一级分类');
          //将图片重置
          $('#imgBox img').attr('src','./images/none.png');
        }
      }
      
    })
  })
  
  
});

