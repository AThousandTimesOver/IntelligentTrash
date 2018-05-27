function login() {  
  
    var username = $("#username").val();  
    var pass = $("#password").val();  
  
    if (username == "") {  
  
        alert("请输入用户名");  
  
    } else if (pass  == "") {  
  
        alert("请输入密码");  
  
    } else {
  
        $.ajax({
            //几个参数需要注意一下
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: "/isexist" ,//url
                data: {username : username,password : pass},
                success: function (result) {
                    console.log(result);//打印服务端返回的数据(调试用)
                    if (result.status == false) {
                        alert("用户名或密码错误！");
                    } else {
                        window.location.href = "/display";
                    }

                },
                error : function() {
                    alert("异常！");
                }
            });
  
    } 
} 