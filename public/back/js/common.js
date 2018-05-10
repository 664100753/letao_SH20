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

//分类管理二级菜单栏
$('.category').on('click',function(){
  $('.lt_aside .child').stop().slideToggle()
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