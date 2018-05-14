/**
 * Created by 张帅 on 2018/5/14.
 */
$(function(){
  //在本地存储中存入数组数据,持久化到本地
  
  // var data = [1,2,3,4,4,5,6];
  // localStorage.setItem('search_list',JSON.stringify(data));
  function getHistory(){
    //获取本地存储的数据
    var str = localStorage.getItem('search_list') || '[]';
    // console.log(arr);
    //获取到字符串.转成数组
    var arr = JSON.parse(str);
    // console.log(arr);
    return arr;
  };
  // 封装了一个方法, 专门通过读取的到 本地历史记录数组, 通过模板引起进行页面更新
  function render(){
    var arr = getHistory();//这是获取到本地数据的方法
    // 通过模板引擎渲染
    // 模板引擎第二个参数必须是对象, 所以需要包装一下
    $('.lt_history').html(template('temple',{ arr: arr }) );
  };
  
  //已进入页面就需要渲染一下
  render();
//  总结以上两个方法:
    //1,get 方法是获取本地存储的数据(以字符串形式存储的),转成数组
  //2,render方法获取到本地数据之后,结合模板引擎进行渲染页面!
  
  
  // 功能2: 清空历史记录
  // (1) 给清空历史记录按钮添加点击事件, 注意: 是动态渲染, 需要通过事件委托
  // (2) 将本地存储中 search_list 删除
  // (3) 读取本地存储
  // (4) 重新渲染
  $('.lt_history').on('click', '.btn_empty', function(){
    // alert(123);
   
    // 添加确认框
    // 参数1: 提示框显示的内容
    // 参数2: 提示框标题
    // 参数3: 按钮文本的数组
    // 参数4: 回调函数
    mui.confirm('你确认要清空历史记录么','温馨提示',['取消','确认'],function( e ){
      //e.index表示数组中,按钮的顺序1代表确认
      if(e.index === 1){
        //清除本地存储
        localStorage.removeItem('search_list');
        //重新渲染页面
        render();
      }
      
    })
  });
  //功能2总结:
    //1,利用事件委托来绑定事件
    //2,添加消息提示框
    //3,删除本地存储的key名
    //4,渲染页面
  
  // 功能3: 删除某一条
  // (1) 添加点击事件(事件委托)
  // (2) 获取要删除的数组索引, 通过 data 方法可以获取索引
  // (3) 调用getHistory获取数组, 删除数组里面对应索引的项(?)
  // (4) 更新到本地存储中
  // (5) 调用 render() 方法重新进行渲染
  
  $('.lt_history').on('click','.btn_delete',function(){
    //获取删除的数组的索引,通过data方法获取索引
       var index = $(this).data('index');
    //添加提示框
    mui.confirm('你确认要清空这条记录吗?','温馨提示',['确认','取消'],function( e ){
      //根据数组的顺序判断哪个是确认按钮
      if(e.index === 0){
        //获取本地存储数据
        var arr = getHistory();
        //删除数组中的某一项
        arr.splice(index,1);
        // 将数组同步到 localStorage 中去, 持久化到本地存储到才行
        localStorage.setItem('search_list',JSON.stringify(arr));
        //重新渲染页面
        render();
      }
    })
    
  });
  
  //功能3总结:
    //1,删除数据的某一条不外乎就是根据id或者索引来到本地或者数据库中去删除对应的数据
    //2,如果是请求服务器就是根据id去删除数据库中的数据,如果是根据数组中的索引就是删除本地
    //中的数组的索引,最后把删除后的数据持久化到本地存储,再刷新页面!
  
  // 功能4: 添加一条搜索记录
  // (1) 给搜索按钮, 添加点击事件
  // (2) 获取搜索框输入的值
  // (3) 获取数组
  // (4) 添加到数组最前面
  // (5) 同步到本地存储中
  // (6) 重新渲染历史记录列表
  $('.lt_search button').click(function(){
    //获取搜索框中输入的值
    var key = $('.lt_search input').val().trim();
    if(key === ""){
      //添加消息提示框
      mui.toast('好好输入关键字,别闹!');
      return;
    }
  
    //获取本地数据
    var arr = getHistory();
    // 需求1: 如果有重复的项, 删除
    var index = arr.indexOf(key);
    if(index > -1){
      //删除
      arr.splice(index,1);
    }
    
    //如果数组中数据最大8条,多余的从后面删除
    if(arr.length > 8){
      //删除数组中的最后一项
      arr.pop();
    }
    //把数据添加到数组的最前面
    arr.unshift(key);
    
    
    //数据持久化到本地存储中
    localStorage.setItem('search_list',JSON.stringify(arr));
    //重新渲染
    render();
    
    //清空搜索框的记录
    $('.lt_search input').val('');
    
    // 跳转到搜索列表页, 通过地址栏, 可以进行页面与页面之间的传参
    location.href='searchList.html?key='+key;
  });
  
  
  
});