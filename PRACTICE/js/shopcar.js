$.ajax({
  "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
  "type":"GET",
  "dataType": "json",
  "success": function(response){    
    if(response.data.length > 0){
      for(var i=0;i<response.data.length;i++){
        var obj = response.data[i];
        
        var html = `<div class="goods">
              <div class="goods-box">
                <input type="checkbox" class="chkbox"/>
                <input type="hidden" class="goods_id" value=" ${ obj.goods_id } "/>
                <img src="${ obj.goods_thumb }" alt="" />
                <p>${ obj.goods_name }</p>
              </div>
              
              <div class="goods-one">${ obj.goods_price }</div>
              <div class="goods-lists">
                <span class="left-button">-</span>
                <input type="text" class="center-text" value="${ obj.goods_number }"/>
                <span class="right-button">+</span>
              </div>
              <div class="goods-sum">${ obj.goods_price * obj.goods_number }</div>
              <div class="goods-op">
                <span>删除</span>
              </div>
            </div>`;
        
        
        $("#Shop").html( $("#Shop").html()+html );
      }
      
      //添加删除事件
      $(".goods-op").click(function(){
        alert("是否要删除！");
        var goods = this.parentNode;
        $(goods).remove();
        //删除数据库中，相应的内容
        updetaCartAjax(this,0);
        showSum();
      })
      
      //加号事件
      $(".right-button").click(function(){
        uadataCart(this,"+1");showSum();
      })
      //减号事件
      $(".left-button").click(function(){
        uadataCart(this,"-1");showSum();
      })
      //键盘事件监听上下两个按钮
//						$(".center-text").keydown(function(){
//							stepSetGoods(this,event);
//						})
      $(".center-text").blur(function(){
        setGoods(this);
      })
      
    }
  }
});

//选中元素删除商品信息
  $("#Delete").click(function(){
//找到商品信息goods里面的复选框(选中状态的)
  var inputs = $(".goods input:checked");




  for(var i=0;i<inputs.length;i++){
    var goods_id = document.getElementsByClassName("goods_id")[0].value;

    var goodsL = inputs[i].parentNode.parentNode;
    goodsL.parentNode.removeChild(goodsL);

    var inpParent = inputs[i].parentNode;
    //删除数据库中，相应的内容
    updetaCartAjax(inpParent,0);
  }
  showSum();

})
//全选和全不选 全局事件委托方法
$("#Shop").click(function(event){
  if(event.target.id === "selectAll" ){
    //得到全选按钮的当前选中状态，存入变量
    var selected = event.target.checked;
    //通过类名找到所有商品的复选框的类数组
    var checkBoxs = document.getElementsByClassName("chkbox");
    for(var i=0;i<checkBoxs.length;i++){
    checkBoxs[i].checked = selected;
    }
    showSum();
    return;
  }

  //除了全选复选框事件
  if( event.target.type == "checkbox" ){showSum();}

})
//显示总价和选中商品数量
function showSum(){
  //动态得到商品数据的类数组
  var goods = document.getElementsByClassName("goods");

  //信号量
  var sum = 0;  //金额累加器
  var num = 0;  //商品数量累加器

  for(var i =0;i<goods.length;i++){
    var goodObj = goods[i];

    if( $(goodObj).children("div:first").children("input").is(":checked") ){
      sum += parseInt( $(goodObj).children("div:eq(3)").text() );  
      num += parseInt( $(goodObj).children("div:eq(2)").children("input").val() );
    }
  }

  $("#Money").text("￥"+sum);
  $("#Amount").text(num);
}
//上，下按钮的监听
function stepSetGoods(obj,event){
  event.preventDefault();

  if(event.keyCode === 40){
    uadataCart(obj,"-1");
  }else if(event.keyCode === 38){
    uadataCart(obj,"+1");
  }
}
//设置某件商品数量
function setGoods(obj){
  //获取输出的内容
  var num = parseInt( $(obj).val() );

  //判断商品数量的值，大于或者小于范围
  if(num < 1 || isNaN(num)){
    $(obj).val(1);
  }
  if(num > 10){
    $(obj).val(10);
  }

  uadataCart(obj,$(obj).val());
}
//改变购物车商品数量的业务函数
function uadataCart(obj,num){
    //找对象
    var goods = obj.parentNode.parentNode;
    var goods_id = goods.getElementsByClassName("goods_id")[0].value;
    var goods_number = goods.getElementsByClassName("center-text")[0];
    var goods_number_value= parseInt(goods_number.value);
    var goods_price = goods.getElementsByClassName("goods-one")[0];
    var goods_price_value = parseInt(goods_price.innerText);
    var goods_sum = goods.getElementsByClassName("goods-sum")[0];

  //判断范围
  if(num == "-1" && goods_number_value <= 1){
    return;
  }
  if(num == "+1" && goods_number_value >= 10){
    return;
  }


  if( num === "-1"){
      goods_number_value--;
  }else if( num === "+1"){
      goods_number_value++;
  }else if( num > 0 ){
      goods_number_value = num;
  }else{
      goods_number_value = 1;
  }

  //当前商品的值               改变后的变量
  goods_number.value = goods_number_value;

  //算出合计金额
  var subtotal = goods_number_value * goods_price_value;

  //改变合计金额
  goods_sum.innerText = subtotal;

  //调用总金额函数
  showSum();
}

//通过ajax删除商品数据
function updetaCartAjax(obj,num){
  var goods = obj.parentNode;
  var goods_id = goods.getElementsByClassName("goods_id")[0].value;


  $.ajax({
      "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
      "type":"POST",
      "dataType": "json",
      "data": {
        "goods_id": goods_id,
        "number": num
       },
      "success": function(response){
      }
  });
}
//去下订单页面，到这总金额过去
$("#checkout").click(function(){
  var sum = $("#Money").text().substr(1);

  location.href = "checkout.html?sum=" +sum;
})
