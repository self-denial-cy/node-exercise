$(function () {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()

  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#logout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'
      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  var layer = layui.layer
  $.ajax({
    method: 'GET',
    url: '/my/getUserInfo',
    success: function (res) {
      if (res.ret !== 1) {
        return layer.msg('获取用户信息失败')
      }
    }
  })
}
