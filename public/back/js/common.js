/**
 * Created by 张帅 on 2018/5/9.
 */
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

//侧边栏动画效果
$(function(){
  $('.lt_topbar .icon_menu').click(function(){
    $('.lt_aside').addClass('hidemenu');
    $('.lt_main').addClass('hidemenu');
    $('.lt_main .lt_topbar').addClass('hidemenu');
  })
});

//模态框显示

$(function(){
  $('.icon_logout').on('click',function(){
    $('#logoutModal').modal('show');
  })
});

//点击模态框退出按钮,退出当前页面
