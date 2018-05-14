/**
 * Created by 张帅 on 2018/5/12.
 */
//区域滚动
$(function () {
  
  //区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators:false//是否显示滚动条
  });
  
  
  //图片轮播
// /获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
});

//根据地址栏里的拼接的数据,进行获取,然后赋值给搜索框,点击搜索按钮,根据搜索框的内容,发送ajax请求,
//渲染页面
function getKey(key){
  //拿到地址栏的数据?key=%E9%98%BF%E8%BF%AA&age=18&name=%27zs%27
  var str = location.search;
  // console.log(str);
  //把里面的汉子进行解码 ?key=阿迪&age=18&name='zs'
  str = decodeURI( str );
  // console.log(str)
  //去掉前面的? key=阿迪&age=18&name='zs'
 str = str.slice(1);
 //把字符串转成数组,以&分隔 ["key=阿迪", "age=18", "name='zs'"]
  var arr = str.split('&');
  // console.log(arr);
  //遍历数组中的每一项
  //定义一个空对象
  var obj = {};
  arr.forEach(function(item,index){
    var k = item.split('=')[0];//分别拿到数组中的每一项,键名
    var v = item.split('=')[1];//分别拿到对应的值,键值
    
    obj[k] = v;
  });
  

  return obj[key];
}



