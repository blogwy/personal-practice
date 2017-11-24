$(function() {
    var BASE_URL = '//localhost:3000/admin'
    $('form').on('submit', function(e) {
      e.preventDefault();
      if($('form').serialize()){
        $.ajax({
          url: BASE_URL,
          type: 'post',
          // 允许 跨域  携带 cookie
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: $('form').serialize(),
          success: function(res){
            console.log(res)
            if(res.code == 0){
              layer.msg(res.msg, {
                icon: 1,
                time: 1000
              });
              setTimeout("location.href = 'http://localhost:3000/admin/home'",1500)
            }
            if(res.code == 1){
              layer.msg(res.msg, {
                icon: 2,
                time: 1000
              }); 
            }
          },
          error: function(err) {
            console.error(JSON.stringify(err))
          }
        })
      }else{
        layer.msg('请输入用户名或密码', {
          icon: 0,
          time: 1000
        });
      }
    })
  })