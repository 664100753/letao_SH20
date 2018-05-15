/**
 * Created by 张帅 on 2018/5/14.
 */
$(function(){
  // 功能1 一进入页面, 解析地址栏参数, 将搜索关键字赋值到 搜索框中
  var str = getKey('key');
  // console.log(str);
  var data = $('.lt_search input').val(str);
  
  //已进入页面调用一次render方法
  // render();
 
  //封装一个渲染页面方法
  function render(){
    // //一进入页面就显示刷新的方框,// 在每次需要更新新数据时, 先将 lt_product 置成 loading 状态
    // $('.lt_product').html('<div class="loading"></div>');//用下拉刷新和上啦加载做,不需要方框了
    
    //定义一个对象
    var parmas = {};
    parmas.proName = $('.lt_search input').val();
    parmas.page = 1;
    parmas.pageSize =100;
  
    // 如果选择了价格或者库存, 进行了高亮, 就说明需要排序, 就意味着需要传更多的参数
    // price 价格
    // num   库存
    
    var $current = $('.lt_sort a.current');
    if($current.length > 0){
      //需要进行排序
      // 有高亮的元素, 需要进行排序, 需要传更多的参数
      // 按照价格排序 params.price = 2
      // 排序的键, price 或 num
      var sortName = $current.data('type');
      // 排序的值, （1升序，2降序）, 通过 箭头的类名可以判断
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
      
      parmas[sortName] = sortValue;
    }
    //设置一个定时器
    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:parmas,
        success:function(info){
          // console.log(info);
          //根据请求回来的数据进行模板渲染
          var str= template('temp',info);
          //渲染页面
          $('.lt_product').html(str);
        //  数据请求回来之后,要关闭下拉刷新的状态
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(true);
        }
      });
    },500);
  };
  //搜索渲染功能总结:
    //1,根据地址栏的传值,通过location.search拿到地址栏的值,是个字符串,
    //2,封装一个方法,把拿到的字符串转成对象,最后返回对象中的键名,得到键名对应的值
    //3,已进入页面就获取地址的值,把值赋值给搜索框,获取到搜索框的值,根据该值,发送ajax请求
    //4,请求对应的数据
    //5,如果需要传多个参数,就需要拿到对应的参数,根据自定义属性data-type来获取对应的值
    //6,再判断当前元素高亮的个数,如果大于零,获取对应自定义属性的值,再大于零的情况下
    //7,拿到当前高亮的类进行判断是升序还是降序,最后把键名 = 键值 赋值到对象中;
  
  //下拉刷新功能:
  
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback:function(){
          
          render();
         
         
        }
      }
    }
  });
  
  
  
  
  
  
  
  
  
  // 功能2: 点击搜索按钮, 进行搜索渲染
  
  // $('.lt_search button').click(function(){
  //   //渲染页面
  //   render();
  //   //搜索完成, 还需要加搜索关键字存储到 本地历史记录中
  //   // 获取搜索关键字
  //   var key = $('.lt_search input').val();
  //   //获取本地存贮的数据
  //   var str = localStorage.getItem("search_list") || '[]';
  //   var arr = JSON.parse(str);
  //   //如果有重复的项删除
  //   var index = arr.indexOf(key);
  //   if(index > -1){
  //     //删除
  //     arr.splice(index,1);
  //   }
  //
  //   //如果超过8个,删除最后一个
  //   if(arr.length > 8){
  //     arr.pop();
  //   }
  //
  //   //在数组前面添加
  //   arr.unshift(key);
  //   //同步到本地存贮中去也就是数据持久化
  //   localStorage.setItem('search_list',JSON.stringify(arr));
  //
  // });
  //功能2小结:
    //1,点击按钮,调用render方法渲染整个页面,然后获取到搜索框的值,进行本地存储,进行取数据,转字数组,然后进行数组的操作和判断
    //2,最后保存到本地存储中去,做到数据持久化
  
  
  // 功能3: 点击排序按钮, 进行排序
  // (1) 给所有需要添加排序功能的按钮, 添加点击事件
  // (2) 如果当前的 a 标签, 有 current, 只需要切换箭头方向即可
  //     如果当前的 a 标签, 没有 current类, 让当前的添加 current, 其他的移除 current 类
  // $('.lt_sort a[data-type]').click(function(){
  //   //判断有没有current类
  //   if($(this).hasClass('current')){
  //     // 说明有current 类, 切换子元素 i 的类, 以切换箭头方向  fa-angle-down  fa-angle-up
  //     $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
  //   }else{
  //     //说明没有类current类
  //     $(this).addClass('current').siblings().removeClass('current');
  //     // 将其他的 a 里面子元素 i, 箭头方向重置成向下
  //     $(this).siblings().find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
  //   }
  //
  //   // 只需要调用 render方法, 在 render 方法, 会找到有 current 类的 a 进行 排序参数添加
  //   render();
  //
  // });
  
  
});