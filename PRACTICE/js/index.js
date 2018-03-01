//顶部
  $("header img:nth-last-child(3)").mouseenter(function(){
    $("header>div .weiXin").css("display","block");
  })
  $("header>div .weiXin").mouseenter(function(){
    $(this).css("display","block");
  })
  $("header img:nth-last-child(3)").mouseleave(function(){
    $("header>div .weiXin").css("display","none");
  })
  $("header>div .weiXin").mouseleave(function(){
    $(this).css("display","none");
  })
//导航栏
  $("nav>ul>li").mouseenter(function(){
    var idx = $(this).index();
    $("nav .navDiv").eq(idx).slideDown();
  })
  $("nav>ul>li").mouseleave(function(){
    var idx = $(this).index();
    $("nav .navDiv").eq(idx).slideUp();
  })
//用户
  if( localStorage.getItem("token") ){
    $(".login").html("用户名是：" + localStorage.getItem("username") + "&nbsp;<button id='clear'>取消登录</button>")
  }

  $("#clear").click(function(){
    localStorage.clear();
    $(".login").html('<a href="register.html">注册</a><span>|</span><a href="login.html">登录</a>');
  })

//搜索按钮
  $("#btnHeaderSearch").click(function(){
    var search = $("#skey").val();
    window.location.href =  "search.html?search_text=" + search;
  })
//呼吸轮播图
    var $lis = $("banner a");
    var idx =0;
    $("#next").click(MoveRight)
      
    function MoveRight() {
      $lis.eq(idx).fadeOut(1000);
      idx++;
      if(idx > $lis.length-1){
        idx = 0;
      }
      $lis.eq(idx).fadeIn(1000);
       $("banner ol li").eq(idx).addClass("cur").siblings().removeClass();
     }
    $("#previous").click(function(){
      if( $lis.eq(idx).is(":animated") ){
        return;
      }

      $lis.eq(idx).fadeOut(1000);
      idx--;
      if(idx < 0){
        idx = $lis.length-1;
      }
      $lis.eq(idx).fadeIn(1000);
      
      $("banner ol li").eq(idx).addClass("cur").siblings().removeClass();
    })

    $("banner ol li").mouseenter(function(){
        idx = $(this).index();
        $("banner ol li").eq(idx).addClass("cur").siblings().removeClass();
        $lis.eq(idx).fadeIn(1000).siblings().fadeOut(1000);
        //$lis.eq( $(this).index() ).fadeToggle(1000);
    })
    
    var timer =setInterval(MoveRight,3000);

    $("banner").mouseenter(function(){
      clearInterval(timer);
    })

    $("banner").mouseleave(function(){
      timer =setInterval(MoveRight,3000);
    })
//秒杀商品
  $.get("http://h6.duchengjiu.top/shop/api_goods.php",function(response){
      for(var i=0;i<5;i++){		
          $("#goodsUl").append('<li><img src="' +response.data[i].goods_thumb+ '" alt="" /><p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '">' +response.data[i].goods_name+  '</a></p><p>' +response.data[i].goods_desc+  '</p><p class="oP">￥' +response.data[i].price+'</p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '"><button class="addCart" goodid="' +response.data[i].goods_id+ '">点击查看详情</button></a></li>')	
      }
  })
//懒加载
var page= 2
  showShop(page);

  function showShop(page){
    if($(window).scrollTop()>5000){
      return;
    }
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?page="+page+"&pagesize=10",
        "type":"GET",
        "dataType":"json",
        "success":function(response){
            for(var i=0;i<response.data.length;i++){
                $("main ul").append('<li><img src="' +response.data[i].goods_thumb+ '" alt="" /><p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '">' +response.data[i].goods_name+  '</a></p><p>' +response.data[i].goods_desc+  '</p><p class="oP">￥' +response.data[i].price+'</p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '"><button class="addCart" goodid="' +response.data[i].goods_id+ '">点击查看详情</button></a></li>' )
            }
            lock=true;
        }
    })
  }

  var lock=true;
  $(window).scroll(function(){
    if(!lock)return;

    var A =$(window).scrollTop();
    var B = $(window).height();
    var C = $(document).height();

    var rate = A/(C-B);
    if(rate>=0.7){
      page++;
      showShop(page);
      lock=false;
    }
    
  })
//固定定位
  $("aside div:last-child").click(function(){
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  })