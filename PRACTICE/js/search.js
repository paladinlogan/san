//固定定位
$("aside div:last-child").click(function(){
  $('body,html').animate({ scrollTop: 0 }, 500);
  return false;
})

var str = location.search.substr(1);//location.search返回URL的查询部分
  var searchText = str.split("=");
  //汉字解码
  var newText = decodeURI(searchText[1]);

  $.ajax({
      "url":"http://h6.duchengjiu.top/shop/api_goods.php",
      "type":"GET",
      "dataType":"json",
      "data":{
          "search_text":newText
        },
      "success":function(response){
          for(var i=0;i<response.data.length;i++){
            $("#goodsUl").append('<li><img src="' +response.data[i].goods_thumb+ '" alt="" /><p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '">' +response.data[i].goods_name+  '</a></p><p>' +response.data[i].goods_desc+  '</p><p class="oP">￥' +response.data[i].price+'</p><a href="detail.html?goods_id=' +response.data[i].goods_id+ '"><button class="addCart" goodid="' +response.data[i].goods_id+ '">点击查看详情</button></a></li>' )
          }
      }
  });

