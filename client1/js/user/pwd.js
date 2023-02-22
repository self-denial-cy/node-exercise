$(function () {
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致'
      }
    }
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatePwd',
      data: {
        oldPwd: $('[name=oldPwd]').val(),
        newPwd: $('[name=newPwd]').val()
      },
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('更新密码失败')
        }
        layer.msg('更新密码成功，请重新登录')
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        setTimeout(function () {
          window.parent.location.href = '/login.html'
        }, 1500)
      }
    })
  })
})
