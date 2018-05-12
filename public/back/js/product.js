/**
 * Created by 张帅 on 2018/5/12.
 */
//请求后台接口,发送ajax请求
$(function(){
  
  var currentPage = 1;
  var pageSize = 2;
  //定义一个空数组
  var picArr = [];
  function render() {
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function( info ){
        // console.log(info);
        var str = template('productTemp',info);
        
        //模板渲染到页面
        $('.lt_content tbody').html(str);
        
        //分页设置
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          //设置总页数
          totalPages: Math.ceil(info.total / info.size ),
          //当前页
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            //更新当前页
            currentPage = page;
            //重新渲染
            render();
          },
          // type 用于标记按钮的功能类型, page 普通页码, first prev next last
          itemTexts:function(type,page,current){
            // console.log(arguments);
            switch(type){
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
  
          // 设置了 tooltipTitles 之后, 每个按钮都会调用这个方法
          // 将返回值, 作为提示信息
          
          tooltipTitles:function(type,page,current){
            switch (type){
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return '前往第'+page+'页';
            }
          },
          // 使用 bootstrap 提供的提示框组件
          useBootstrapTooltip: true,
          
        })
        
        
      }
    })
  }
  
  //已进入页面就执行一次
  render();
  
  
  
  
  
//  点击让模态框显示
  $('.lt_content .btn').click(function(){
    //让模态框显示
    $('#addModal').modal('show');
    
    //当点击添加按钮的时候,就发送ajax请求,渲染到页面
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function( info ){
        console.log(info);
        
        var str = template('temp',info);
        
        //渲染到页面中
        $('.dropdown-menu').html(str);
        
        
      }
    })
    
    
    
  });
  
  
  
  //给选择二级分类按钮注册点击事件,因为里面元素是动态生成的,所以用事件委托来注册
  $('.dropdown-menu').on('click','a',function(){
    //点击获取a内容
    var txt = $(this).text();
    //赋值给当前选择框
    $('#dropdownText').text(txt);
    //获取自定义属性id,赋值给文本框
    var id = $(this).data('id');
    //赋值给隐藏的文本框
    $('[name="brandId"]').val(id);
  
    // 如果用户选择了二级分类, 需要更新 brandId 隐藏域的校验状态 为 VALID
    // 参数1: 校验的字段
    // 参数2: 校验的状态
    // 参数3: 校验的规则, 失败时的提示信息
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    
    
  });
  
  
  // 4. 多文件上传步骤
  // 1. 引入插件包
  // 2. 配置结构, name, data-url multiple(配置可以选择多文件)
  // 3. 进行插件初始化
  
  // 在 jquery.fileupload 内部已经对文件上传的 ajax 操作进行了封装
  // 如果是单文件, 发送一次图片上传请求
  // 如果是多文件, 发送多次图片上传请求, 会遍历所选择的图片, 进行多次请求 (意味着会有多次响应)
  
  $('#fileupload').fileupload({
      dataType:'json',
      done:function(e,data){
        console.log(data);
        //获取图片返回的地址
        var picUrl = data.result.picAddr;
        //获取图片对象
        var picObj = data.result;
        //添加到对应的元素中去
        $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" alt="">');
        // 还需要加图片对象, 添加到数组中
        // 数组常用操作: unshift, shift, push, pop, ( map reduce forEach every some filter 了解 )
        picArr.unshift(picObj);
        // 如果超过 3 张, 将最后的一张, 最老的一张, 删掉
        
        if(picArr.length > 3){
          
          picArr.pop();//只是删除了数组里的最后一项,同时需要删除dom元素上的最后一项
          //注意:dom元素上也要删除对应的元素
          // 删除图片中的最后一个
          // 需求: 获取盒子中的最后一个图片子元素
          // img:last-of-type 找到最后一个img类型的子元素, 让他自杀
          $('#imgBox img:last-of-type').remove();
        }
  
        // 说明满足上传 3 张的图片的条件了, 手动更新 picStatus 隐藏域的校验状态
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    
  });
  
  
  
  
  //表单校验
  
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //指定校验字段
    fields: {
      //选择二级分类
        brandId:{
          validators:{
              //不能为空
            notEmpty:{
              message:'请选择二级分类'
            }
          }
        },
      
      proName:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请输入商品名称'
            }
          }
      },
      
      //请输入商品描述
      proDesc:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请输入商品描述'
            }
          }
      },
  
      // 商品库存要求, 必须是非零开头的数字
      // \d 表示数字
      // * 表示零个或多个
      // + 表示1个或多个
      // ? 表示0个或1个
      // {n} 表示出现 n 次
      
      //商品库存
      num:{
          validators:{
            //不能为空
            notEmpty:{
              
              message:'请输入商品库存'
            },
            //正则校验
            regexp:{
              regexp:/^[1-9]\d*$/,
              message:'商品库存要求,必须是非零开头的数字'
            }
          }
      },
      
      //商品尺码
      size:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请输入商品尺码'
            },
            //正则校验
            //要求:两位数-两位数字
            regexp:{
              regexp:/^\d{2}-\d{2}$/,
              message:'商品库存要求, 两位数字-两位数字,例如: 32-40'
            }
          }
      },
      
      //商品原价
      oldPrice:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请输入商品原价'
            }
          }
      },
      
      //商品现价
      price:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请输入商品现价'
            }
          }
      },
      
      //上传图片是否满三张图片
      picStatus:{
          validators:{
            //不能为空
            notEmpty:{
              message:'请上传3张图片'
            }
          }
      }
      
    }
    
    
  });
  
  
  //完成表单发送的请求
  $('#form').on('success.form.bv',function( e ){
    //阻止表单的默认提交,使用ajax提交
    e.preventDefault();
    //获取表单内容
    var formData = $('#form').serialize();
    formData += '&picName1='+ picArr[0].picName+'&picAddr1='+ picArr[0].picAddr;
    formData += '&picName2='+ picArr[1].picName+'&picAddr2='+ picArr[1].picAddr;
    formData += '&picName3='+ picArr[2].picName+'&picAddr3='+ picArr[2].picAddr;
    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:formData,
      success:function(info){
        // console.log(info);
        if(info.success){
          //隐藏模态框
          $('#addModal').modal('hide');
          //重置表单内容
          $('#form').data('bootstrapValidator').resetForm(true);
  
          //从新渲染第一页
          currentPage = 1;
          render();
          
          //重置文本
          $('#dropdownText').text('请选择二级分类');
          //删除所有图片
          $('#imgBox img').remove();
          
          //清空数组
          picArr = [];
        }
        
        
        
        
      }
      
    })
    
  })
  
  
  

});


//添加分类表单的总结:
//1,根据需求准备好模态框,从bootstrap中选择合适的组件和表单提交
//2,表单提交必须要设置name属性来传递数据,后台就是根据name属性来获取前端传递的数据
//3,配置好结构,符号设计的需求的配置项
//4,用到了表单校验插件,正则验证,文件上传插件
//5,给对应的非表单的元素设置隐藏的input框,记录对应的id来收集数据,发送后台
//6,当type = "hidden"就是隐藏域概念,input框将被隐藏,将来把表单验证的信息就存到
    //对应的input框中,也是需要name属性的
//7,图片上传,有专门对应的图片上传的接口,独立于表单的上传,当使用文件上传插件后,会立即
    //触发ajax发送请求,请求后台图片地址,根据后台返回的照片地址,来保存到对应的存放到元素中
    //由于是多文件上传,定义一个数组来保存对应的图片地址和图片名,
    //获取图片地址,和图片对象,添加到数组中去,再根据数组的长度去判断图片的个数,
    //用到了unshift,pop操作数组的方法,第一个是在前面添加,后面是删除数组最后一个元素
    //再把dom树上的对应的元素节点删除,用remove();
    //注意: 发送ajax请求根据后台的数据用了字符串的拼接来传递数据!
//8,根据表单校验插件完成表单校验,最后把不能校验的要手动去添加状态,根据插件提供的实例和方法,
//完成校验,
//9,最后根据表单校验插件,重置表单所有内容,不能重置的要手动去重置
//最后,清空数组;

