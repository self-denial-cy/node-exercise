$(function () {
  // 定义一个查询的参数对象，将来请求数据的时候，需要将请求参数对象提交到服务器
  var q = {
    page: 1, // 页码值，默认请求第一页的数据
    pageSize: 10, // 每页显示几条数据，默认每页显示10条
    category: '', // 文章分类id
    state: '' // 文章的发布状态
  };

  initTable();
  initCategories();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/article/page',
      data: q,
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('获取文章列表失败');
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
        // 调用渲染分页的方法
        renderPage(res.total);
      }
    });
  }

  // 初始化文章分类的方法
  function initCategories() {
    $.ajax({
      method: 'GET',
      url: '/article/category/list',
      success: function (res) {
        if (res.ret !== 1) {
          return layer.msg('获取分类数据失败');
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-category', res);
        $('[name=category]').html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      }
    });
  }

  // 为筛选表单绑定 submit 事件
  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    // 获取表单中选中项的值
    var category = $('[name=category]').val();
    var state = $('[name=state]').val();
    // 为查询参数对象 q 中对应的属性赋值
    q.category = category;
    q.state = state;
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable();
  });

  // 定义渲染分页的方法
  function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
      elem: 'page-box', // 分页容器的 id
      count: total, // 总数据条数
      limit: q.pageSize, // 每页显示几条数据
      curr: q.page, // 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [10, 20, 50, 100],
      // 分页发生切换的时候，触发 jump 回调
      // 触发 jump 回调的方式有两种：
      // 1. 点击页码的时候，会触发 jump 回调
      // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
      jump: function (obj, first) {
        // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
        // 如果 first 的值为 true，证明是方式2触发的
        // 否则就是方式1触发的
        // console.log(first)
        // console.log(obj)
        // 把最新的页码值，赋值到 q 这个查询参数对象中
        q.page = obj.curr;
        // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
        q.pageSize = obj.limit;
        // 根据最新的 q 获取对应的数据列表，并渲染表格
        if (!first) {
          initTable();
        }
      }
    });
  }

  // 通过代理的形式，为删除按钮绑定点击事件处理函数
  $('tbody').on('click', '.btn-delete', function () {
    // 获取删除按钮的个数
    var len = $('.btn-delete').length;
    // 获取到文章的 id
    var id = $(this).attr('data-id');
    // 询问用户是否要删除数据
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/article/del/' + id,
        success: function (res) {
          if (res.ret !== 1) {
            return layer.msg('删除文章失败');
          }
          layer.msg('删除文章成功');
          // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
          // 如果没有剩余的数据了，则让页码值 -1
          if (len === 1) {
            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
            // 页码值最小必须是 1
            q.page = q.page === 1 ? 1 : q.page - 1;
          }
          initTable();
        }
      });
      layer.close(index);
    });
  });

  $('tbody').on('click', '.btn-preview', function () {
    var content = $(this).attr('data-content');
    layer.open({
      skin: 'overflow-fit',
      type: 1,
      area: ['800px', '500px'],
      title: '预览',
      content: $('#tpl-preview').html().replace('$$content$$', encodeURIComponent(content))
    });
  });
});
