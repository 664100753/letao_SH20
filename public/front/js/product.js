/**
 * Created by 张帅 on 2018/5/15.
 */
$(function(){
  //获取地址栏传递过来的id
  var id = getKey('productId');
  // console.log(id)
  //发送ajax请求
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function(info){
      console.log(info);
      var str = template('temp',info);
      //模板渲染页面
      $('.lt_main .mui-scroll').html(str);
      //手动初始化轮播图,动态渲染的也要手动初始化
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 手动初始化 输入框,动态渲染的要手动初始化
      mui(".mui-numbox").numbox();
    }
  });
  
  //选择尺码,注册点击事件
  $('.lt_main').on('click','.lt_product li:nth-child(3) span',function(){
    // console.log(111);
    //当被选中的时候,对应的span应该高亮
    $(this).addClass('current').siblings().removeClass('current');
  });
  
  // 4. 加入购物车功能
  // (1) 获取用户选择的尺码
  // (2) 获取用户选择的数量
  // (3) 产品 id, 本身已经在地址栏解析时已经得到了
  // (4) 发送 ajax 请求, 进行添加购物车操作
  
  $('#addCart').click(function(){
    //获取用户选择的尺码
    var size = $('.lt_product li:nth-child(3) span.current').text();
    // console.log(size);
    //获取数量
    var num = $('.mui-numbox-input').val();
    // console.log(num)
    //发送ajax请求
    if(size === null){
      //说明用户没有选择尺码
      mui.toast('请选择尺码');//提示用户选择尺码
      return;
    }
    //发送ajax请求
    $.ajax({
      type:'POST',
      url:'/cart/addCart',
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function(info){
        console.log(info);
        if(info.success === true){
          //说请求成功
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index === 0){
              location.href = 'cart.html';
            }
            
            if(info.error === 400){
              // 说明没有登陆, 跳转到登录页,
              // 因为是在商品页, 拦截到登录页的, 将来登录完成还要跳回来 (需要地址才能跳回来)
              // 在进行跳转到 login.html 的同时, 就还需要将当前页面的地址也传递过去
              location.href = 'login.html?retUrl='+ location.href;
            }
          })
        }
      }
    })
    
  })
  
  
  
  
});