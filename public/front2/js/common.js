/**
 * Created by Jepson on 2018/5/12.
 */


$(function() {

  // 区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    // 是否显示滚动条
    indicators: false,
  });

  //获得slider插件对象, mui('选择器') 可以生成一个 mui 实例对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000 //自动轮播周期，若为0则不自动播放，默认为0；
  });

})