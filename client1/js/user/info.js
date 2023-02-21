$(function () {
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间'
      }
    }
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/getUserInfo',
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('获取用户信息失败')
        }
        // 调用 form.val() 快速为表单赋值
        form.val('form-edit', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btn-reset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/updateUserInfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('更新用户信息失败')
        }
        layer.msg('更新用户信息成功')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })
})
