
function getData() {
  $.ajax({
      url: 'http://localhost:3000/admin/home',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function(res) {
        console.log(res)
        if(res.username){
          $('#uname').text(res.username)
          $('#username').text('欢迎你，管理员' + res.username + '!')
        }
      }
  })
}

$(function() {
  // getData();
  $('#logout').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/admin/logout',
        type: 'get',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function(res) {
          console.log(res)
          if(res.code == 0){
            console.log(res.msg);
            layer.msg(res.msg, {
              icon: 1,
              time: 1000
            });
            setTimeout("location.reload()",1500)
          }
        }
    })
})
})