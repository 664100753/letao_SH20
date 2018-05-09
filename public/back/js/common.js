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