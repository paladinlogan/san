var str = location.search.substr(1);
var goodId = str.split("=");


$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php",
  "type": "GET",
  "dataType": "json",
  "data": {
    "goods_id": goodId[1]
  },
  "success": function(response){
    $("#box").html('<li><img src="' +response.data[0].goods_thumb+ '"/><p>' +response.data[0].goods_name+  '</p><p>' +response.data[0].goods_desc+  '</p><p class="oP">商品单价：<span>￥' +response.data[0].price+'</span></p></li>')
  }
});


$("#btn").click(function(){
  var strNew = $("#str").val();  
  
  $.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_goods.php",
  "type": "GET",
  "dataType": "json",
  "data": {
    "goods_id":strNew
  },
  "success": function(response){
    $("#box").html('<li><img src="' +response.data[0].goods_thumb+ '" alt="" /><p><a href="#">' +response.data[0].goods_name+  '</a></p><p>' +response.data[0].goods_desc+  '</p><p class="oP">￥' +response.data[0].price+'</p></li>')
  }
  
});
})

$("#crat").click(function(){
  if( !localStorage.getItem("token") ){
    alert("请登录后才能使用加入购物车功能！");
    location.href = "login.html#callback=" +location.href;
    return;
  }
    
  var goods_number = localStorage.getItem("cart"+goodId[1]);
  
  goods_number = goods_number ? parseInt(goods_number)+1 : 1;
  
  
  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
    "type":"POST",
    "dataType": "json",
    "data": {
      "goods_id": goodId[1],
      "number": goods_number
    },
    "success": function(response){
      localStorage.setItem("cart"+goodId[1],goods_number);
    }
  });
})