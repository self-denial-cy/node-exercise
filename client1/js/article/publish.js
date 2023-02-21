$(function () {
  initCategorys()

  // 定义加载文章分类的方法
  function initCategorys() {
    $.ajax({
      method: 'GET',
      url: '/article/category/list',
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('初始化文章分类失败')
        }
        // 调用模板引擎，渲染分类的下拉菜单
        var htmlStr = template('tpl-category', res)
        $('[name=category]').html(htmlStr)
        // 一定要记得调用 form.render() 方法
        form.render()
      }
    })
  }

  // 初始化富文本编辑器
  $('#form-publish [name=content]').show()
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 为选择封面的按钮，绑定点击事件处理函数
  $('#btn-choose').on('click', function () {
    $('#coverFile').click()
  })

  // 监听 coverFile 的 change 事件，获取用户选择的文件列表
  $('#coverFile').on('change', function (e) {
    // 获取到文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了文件
    if (!files.length) {
      return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 定义文章的发布状态
  var publishState = '已发布'

  // 为存为草稿按钮，绑定点击事件处理函数
  $('#btn-save').on('click', function () {
    publishState = '草稿'
  })

  // 为表单绑定 submit 提交事件
  $('#form-publish').on('submit', function (e) {
    e.preventDefault()
    var formData = new FormData()
    formData.append('title', $('#form-publish [name=title]').val())
    formData.append('categoryId', $('#form-publish [name=category]').val())
    formData.append('content', tinymce.activeEditor.getContent())
    formData.append('state', publishState)
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        formData.append('coverImg', blob)
        // 6. 发起 ajax 数据请求
        publishArticle(formData)
      })
  })

  // 定义一个发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('发布文章失败')
        }
        layer.msg('发布文章成功')
        // 发布文章成功后，跳转到文章列表页面
        location.href = '/pages/article/list.html'
      }
    })
  }
})
