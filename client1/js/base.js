var form = layui.form,
  layer = layui.layer,
  laypage = layui.laypage;

// 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function (options) {
  // 在发起真正的 ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://localhost:3001' + options.url;

  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1 || options.url.indexOf('/article/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    };
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.ret === -1 && res.responseJSON.msg === '非法请求') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  };
});
