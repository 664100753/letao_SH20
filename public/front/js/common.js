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

