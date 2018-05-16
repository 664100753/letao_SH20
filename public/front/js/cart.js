/**
 * Created by 张帅 on 2018/5/16.
 */
$(function(){
  function render(){
    //请求后台数据,发送ajax请求
    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/cart/queryCart',
        success:function( info){
          console.log(info);
          //判断用户是否登录
         if(info.error===400){
           //判断用户是否登录,并且跳转到来的页面
           location.href = 'login.html?retUrl='+location.href;
           return;
         }
          var obj ={
            list:info
          };
      
          var str = template('temp',obj);
          //渲染页面
          $('#cartList').html(str);
          // 数据请求完成后,关闭正在刷新状态
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      });
    },500)
  }
  
  //功能2:下拉刷新渲染
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto:true,
        callback : function(){
          //渲染页面
          render();
        }
      }
    }
  });
  
  //功能3: 点击删除按钮, 实现删除功能, 事件委托来实现
  //    注意: 要使用 tap 事件, 因为是 a 标签, 默认 click 被阻止了
  
  $('#cartList').on('tap','.btn-delete',function(){
    // alert(123)
    //点击获取对应的id,传递给后台
    var id = $(this).data('id');
    console.log(id);
    //发送ajax请求
    mui.confirm('您是否要删除该商品','温馨提示',['确认','取消'],function( e ){
      if(e.index === 0){
        $.ajax({
          type:'get',
          url:'/cart/deleteCart',
          data:{
            id:[id]
          },
          success:function( info ){
            console.log(info);
            if(info.success){
              // 说明删除成功了
              // 触发一次下拉刷新即可
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    })
   
  
    
  });
  
  //功能3:修改功能
  // (1) 给所有的修改按钮, 添加点击事件  (事件委托, tap事件)
  // (2) 弹出确认框
  $('#cartList').on('tap','.btn-edit',function(){
    alert(123)
    //获取对应的数据
    var id = this.dataset.id;
    // 需要拿到存在 编辑按钮中的所有数据, 通过自定义属性拿
    var str = template('temTpl',this.dataset);
    // 注意: mui.confirm 在进行渲染时, 会将传进来的模板中的 \n 替换成 br
    // 我们不需要这些 br, 我们只需要将所有的 \n 去掉即可
    str = str.replace(/\n/g,'');
    //模态框
    mui.confirm(str,'编辑商品',['确认','取消'],function(e){
      if(e.index === 0){
        // 发送ajax请求进行修改, 需要 id, 尺码, 数量
        var size = $('.lt_size span.current').text();
        var num = $('.lt_num input').val();
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id: id,
            size: size,
            num: num
          },
          success:function( info ){
            console.log(info);
            if(info.success){
              // 重新进行一次下拉刷新即可
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            };
            
            
          }
        })
      }
    });
  
    // 在confirm 生成后, 执行 numbox 进行初始化
    mui(".mui-numbox").numbox();
    
  });
  
  //功能4:添加尺码选择功能
  $('body').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  });
  
  //功能5:计算价格功能
  //注册点击事件,利用事件委托
  $('#cartList').on('click','.ck',function(){
    // alert(123)
    //总价格
    var total = 0;
    //获取选中的盒子
    var $chekedbox = $('#cartList .ck:checked');
    // console.log(chekedbox)
    $chekedbox.each(function(){
      //获取价格
      var price = $(this).data('price');
      console.log(price);
      //获取数量
      var num = $(this).data('num');
      total += price * num;
    });
    
    // toFixed 表示保留两位小数
    total = total.toFixed(2);
    //再把获取到的总价显示到表格中,供用户观看
    $('#totalPrice').text(total);
  })
});