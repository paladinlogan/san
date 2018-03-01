$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token,
  "type":"GET",
  "dataType": "json",
  "success": function(response){
    
    var html = '';
    
    //外层for循环，订单id
    for(var i=0;i<response.data.length;i++){
      var obj = response.data[i];
      
      html += '<div class="order-item">';
      html += '<div class="order-item-header">订单号：' +obj.order_id+ '</div>';
      
      //里层for循环，商品信息
      for(var j = 0; j < obj.goods_list.length; j++){
        var goods = obj.goods_list[j]; //商品列表
        goods.subtotal = goods.goods_price * goods.goods_number;
        
        html += '<div data-id="' +
             goods.goods_id + 
            '"><img src="'+
            goods.goods_thumb+
            '" /> 商品名称：' +
            goods.goods_name +
            '商品数量：'   +
            goods.goods_number +
            '商品单价：'   +
            goods.goods_price +
            '商品金额：'   +
            goods.subtotal +
            '</div>';
      }
      html += '</div>';
    }
    
    $("#order-list").html( html );
  }
});

// $("#pay").click(function(){
//   alert("余额不足，支付失败！")
// })