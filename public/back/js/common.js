/**
 * Created by 张帅 on 2018/5/9.
 */
// 5. 登录拦截分析, 现在注意: 我们是前后端分离的, 前端并不知道当前用户有没有登录
//    不知道, 问呗, 需要一进入页面, 就调用接口, 来判断当前用户有没有登录
//    (1) 如果没有登陆, 不需要下面的操作了, 直接拦截到登录页面即可
//    (2) 如果当前用户登录, 啥都不用干, 让用户继续访问即可
//    (3) 我们需要将不需要用户登录的页面 (登录页, 进行排除)
$(function(){
  if(location.href.indexOf('login.html') === -1){
  
    // 如果当前地址栏中没有 login.html, 需要判断当前用户状态
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.error === 400){
          location.href = 'login.html';
        }
      }
    })
  }
});








//进度条功能的实现

//禁用进度环
NProgress.configure({ showSpinner: false });

$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();//开启进度条
  });
  
  $(document).ajaxStop(function(){
    NProgress.done();//关闭进度条
  })
});

//分类管理二级菜单栏
$(function(){
  $('.category').on('click',function(){
    $('.lt_aside .child').stop().slideToggle()
  });
});




//侧边栏动画效果
$(function(){
  $('.lt_topbar .icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_main .lt_topbar').toggleClass('hidemenu');
  })
});

//模态框显示

$(function(){
  $('.icon_logout').on('click',function(){
    $('#logoutModal').modal('show');
  })
});

//点击模态框退出按钮,退出当前页面
$('#logoutBtn').on('click',function(){
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    dataType:'json',
    success:function(info){
     //判断当前是否成功
      if(info.success){
        //跳转到登录页面
        location.href = 'login.html';
      }
    }
  })
});