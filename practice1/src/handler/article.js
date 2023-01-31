const db = require('../db/index');

// 获取文章分类列表
exports.getArticleCategoryListHandler = (req, res) => {
  const sqlStr = 'select id, name, alias from ev_article_category where is_delete = 0 order by id asc';
  db.query(sqlStr, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    res.send({ ret: 1, msg: '查询成功', data: results });
  });
};

// 新增文章分类
exports.addArticleCategoryHandler = (req, res) => {
  const body = req.body;
  let sqlStr = 'select * from ev_article_category where name = ? or alias = ?';
  db.query(sqlStr, [body.name, body.alias], (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    // 保证文章分类名称和别名唯一性
    if (results.length) {
      return res.send({ ret: 0, msg: '文章分类名称或别名已被占用，请更换后重试' });
    }
    sqlStr = 'insert into ev_article_category set ?';
    db.query(sqlStr, body, (err, result) => {
      if (err) {
        return res.send({ ret: 0, msg: err.message });
      }
      if (result.affectedRows !== 1) {
        return res.send({ ret: 0, msg: '新增失败，请稍后再试' });
      }
      res.send({ ret: 1, msg: '新增成功' });
    });
  });
};

// 删除文章分类
exports.delArticleCategoryHandler = (req, res) => {
  const params = req.params;
  const sqlStr = 'update ev_article_category set is_delete = 1 where id = ?';
  db.query(sqlStr, params.id, (err, result) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (result.affectedRows !== 1) {
      return res.send({ ret: 0, msg: '删除失败，请稍后再试' });
    }
    res.send({ ret: 1, msg: '删除成功' });
  });
};

// 获取单个文章分类详情
exports.getArticleCategoryHandler = (req, res) => {
  const params = req.params;
  const sqlStr = 'select id, name, alias from ev_article_category where id = ?';
  db.query(sqlStr, params.id, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (!results.length) {
      return res.send({ ret: 0, msg: '查询失败，请稍后再试' });
    }
    const firstRow = results[0];
    res.send({ ret: 1, msg: '查询成功', data: firstRow });
  });
};

// 修改单个文章分类
exports.updateArticleCategoryHandler = (req, res) => {
  const body = req.body;
  let sqlStr = 'select * from ev_article_category where id = ?';
  db.query(sqlStr, body.id, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (!results.length) {
      return res.send({ ret: 0, msg: '更新失败，请稍后再试' });
    }
    sqlStr = 'select * from ev_article_category where name = ? or alias = ?';
    db.query(sqlStr, [body.name, body.alias], (err, results) => {
      if (err) {
        return res.send({ ret: 0, msg: err.message });
      }
      // 保证文章分类名称和别名唯一性
      if (results.length) {
        return res.send({ ret: 0, msg: '文章分类名称或别名已被占用，请更换后重试' });
      }
      sqlStr = 'update ev_article_category set ? where id = ?';
      db.query(sqlStr, [body, body.id], (err, result) => {
        if (err) {
          return res.send({ ret: 0, msg: err.message });
        }
        if (result.affectedRows !== 1) {
          return res.send({ ret: 0, msg: '更新失败，请稍后再试' });
        }
        res.send({ ret: 1, msg: '更新成功' });
      });
    });
  });
};

// 新增文章
exports.addArticleHandler = (req, res) => {
  const body = req.body;
  const file = req.file;
  const auth = req.auth;
  if (!file || file.fieldname !== 'coverImg') {
    return res.send({ ret: 0, msg: '请上传文章封面图片' });
  }
  const article = {
    title: body.title,
    content: body.content,
    cover_img: `/uploads/${file.filename}`,
    publish_at: new Date().toLocaleString(),
    state: body.state,
    category_id: body.categoryId,
    author_id: auth.id
  };
  const sqlStr = 'insert into ev_articles set ?';
  db.query(sqlStr, article, (err, result) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (result.affectedRows !== 1) {
      return res.send({ ret: 0, msg: '发布失败，请稍后再试' });
    }
    res.send({ ret: 1, msg: '发布成功' });
  });
};
