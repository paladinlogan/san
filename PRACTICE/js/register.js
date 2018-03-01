			
			//用户名验证是否重复
			$('input[name="username"]').blur(function(){
				var username = $('input[name="username"]').val();
				
				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_user.php",
					"type": "POST",
					"dataType": "json",
					"data": {
						"status": "check",
						"username": username
					},
					"success": function(response){
						
						if(response.code === 0){
							$("#success").show();
							$("#error").hide();
						}else{
							$("#error").show();
							$("#success").hide();
						}
					}
				});
			})
			
			
			$("#reg").click(function(){
				var $username = $('input[name="username"]').val();
				var $password = $('input[name="password"]').val();
				var $surePassWord = $('input[name="surePassWord"]').val();
							
				if($password.length < 6 || $password.length > 20){
					alert("密码长度应该是6-20位之间");
					return;
				}

				if($surePassWord !== $password){
					alert("两次密码不相同");
					return;
				}
				
//				http://h6.duchengjiu.top/shop/api_user.php
			  //协议      域名/ip: 端口/path/文件夹/文件名?查询的参数#a
				
				$.ajax({
					"url": "http://h6.duchengjiu.top/shop/api_user.php",
					"type": "POST",
					"dataType": "json",
					"data": {
						"status": "register",
						"username": $username,
						"password": $password
					},
					"success": function(response){
            //console.log(response);
						
						if(response.code === 0){
              alert("注册成功！~");
							window.location.href = "login.html";
            }
					}
				});
				
      })
$('input[name="username"]').blur(function(){
    if( $('input[name="username"]').val()=="" ){
          $("#userNameError").css("visibility","visible")
    }else{
          $("#userNameError").css("visibility","hidden")
        }
})
      
$('input[name="password"]').blur(function(){
    if( $('input[name="password"]').val()=="" ){
          $("#passWordError").css("visibility","visible")
    }else{
          $("#passWordError").css("visibility","hidden")
        }
})