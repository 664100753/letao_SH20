/**
 * Created by 张帅 on 2018/5/16.
 */
$(function(){
  //获取用户用户名
  //获取密码
 $('#loginBtn').click(function(){
   var userName = $('[name="username"]').val().trim();
   // console.log(userName)
   var pwd = $('[name="password"]').val().trim();
  
   //判断用户输入是否为空
   if(userName ===''){
     mui.toast('请输入用户名');
     return;
   }
   
   if(pwd === ''){
     mui.toast('请输入密码');
     return;
   }
   
   //发送ajax请求
   $.ajax({
     type:'post',
     url:'/user/login',
     data:{
       username:userName,
       password:pwd
       
     },
     success:function(info ){
       console.log(info)
       //判断用户名是否存在
       if(info.error === 403){
         mui.toast('用户名或密码错误');
       }
       
       if(info.success === true){
         // 说明用户登录成功
         // (1) 如果是从其他页面拦截过来的, 比如商品详情页, 将来要跳回去
         // (2) 如果是直接访问的 login.html, 跳转到会员中心
         // 通过 判断地址栏参数, 有没有 retUrl 进行区分
         if(location.href.indexOf('retUrl') > -1){
           //说明有,需要跳转到之前的页面
           var url = location.search.replace('?retUrl=','');
           // console.log(url)
           location.href = url;
         }
         else{
           //否则不存在,跳转到会员中心
           location.href = 'user.html';
         }
         
       }
     }
   })
   
 })
});