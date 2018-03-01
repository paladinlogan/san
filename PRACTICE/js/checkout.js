//信号量
address_id = 0;


//通过ajax调用数据库收货地址
function addreddAjax(){
$.ajax({
  "url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,
  "type": "GET",
  "dataType": "json",
  "success": function(response){    
    var html = '';
    for(var i=0;i<response.data.length;i++){
      var obj = response.data[i];
      
      html += '<li class="address-item" data-id="' + obj.address_id +'">收货人：'
          + obj.address_name
          + '&nbsp;&nbsp;手机号' + obj.mobile
          + '&nbsp;&nbsp;省份：' + obj.province
          + '&nbsp;&nbsp;市：'   + obj.city
          + '&nbsp;&nbsp;地区：' + obj.district
          + '&nbsp;&nbsp;街道：' + obj.address
          + '<span class="remove">删除</span></li>';
      
    }
    
    $(".addess-ul").html(html);
    
    //点击改变样式
    $(".address-item").click(function(event){
      $(this).addClass("active").siblings().removeClass("active");
      
      if(event.target){
        address_id = event.target.getAttribute("data-id");
      }
    })
    
    //删除事件
    $(".remove").click(function(){
      var removeLi = this.parentNode;
      removeLi.parentNode.removeChild(removeLi);
      removeAjax(removeLi);
    })
    
  }
})
}

addreddAjax();	




//删除地址业务
function removeAjax(obj){

var address_id = $(obj).attr("data-id");

$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token=" +localStorage.token+ "&status=delete&address_id="+address_id,
  "type":"get",
  "dataType": "json",
  "success": function(response){
  }
});

}

//显示新增地址
$(".newAddress").click(function(){
  $("#add").show();
})
$("#add .close").click(function(){
  $("#add").hide();
})

//新建收货地址
$("#btn").click(function(){
  var data = $("form").serialize();

  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token+"&status=add",
    "type":"POST",
    "dataType": "json",
    "data": data,
    "success": function(response){
      //console.log(response)
      if(response.code === 0){
        $("#add").hide();
        addreddAjax();
      }
        
    }
  });
})

var sum = location.search.substr(5);
if(sum===""){sum=0}

$("#sum").html("<h2>当前订单总金额是：￥"+sum+"</h2>");

$("#order").click(function(){
  if(address_id === 0){
    alert("请选择地址后在下订单");
    return;
  }
  //console.log(sum);
  if( sum==="0" ){
    alert("当前无可支付订单");
    return;
  }

  $.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.token+"&status=add",
    "type":"POST",
    "dataType": "json",
    "data": {
      "address_id": address_id, 
      "total_prices": sum
    },
    "success": function(response){
      if(response.code === 0){
        alert("下订单成功！");
        location.href = "order.html";
      }
    }
  });

})