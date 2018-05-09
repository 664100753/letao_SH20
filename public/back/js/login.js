/**
 * Created by 张帅 on 2018/5/9.
 */
//表单校验的功能
//bootstrap-validator插件会在表单提交的时候进行校验，
// 如果校验成功了，表单会继续提交，但是如果校验失败了，
// 就会阻止表单的提交。

$(function(){
  $('#form').bootstrapValidator({
    //指定校验时的图标显示,默认是bootstrap风格
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
      
    },
    
    //指定校验字段
    fields: {
      //校验用户名,对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //校验长度
          stringLength: {
            min:2,
            max: 6,
            message:'用户名长度必须在2到6之间'
          },
          callback:{
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:'密码长度必须在6到12之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });
  
  
  /*
   * 2 基本登录功能
   * (1) 我们想要通过 ajax 进行登录请求, 这样如果密码错误, 可以很友好的提示
   * (2) 我们又想要使用表单校验插件, 会在表单提交的时候, 进行校验
   *
   * 表单校验插件,
   * 如果在提交时校验成功了, 会自动继续提交, 需要阻止这次提交, 通过 ajax 请求
   * 如果校验失败了, 直接提示用户输入有误, 不会提交
   * */
  
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    //阻止form表单的默认提交
    //使用ajax发送请求
    var dataS = $('#form').serialize();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:dataS,
      dataType:'json',
      success:function(info){
        // console.log(info)
        
        if(info.success){
          //登录成功
          location.href = 'index.html'
        }
        
        
        if(info.error === 1000){
          alert('用户不存在');
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
        
        if(info.error === 1001){
          alert('密码错误');
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
      }
    })
  });
  
  //表单重置按钮
  $('button[type="reset"]').click(function(){
    //点击重置按钮,隐藏所有的图标和提示信息
    $('#form').data('bootstrapValidator').resetForm();
  })
});
