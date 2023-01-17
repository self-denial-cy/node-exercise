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
