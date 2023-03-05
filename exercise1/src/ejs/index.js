const express = require('express');
const path = require('path');

const app = express();

// 配置模板引擎
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  const list = [
    {
      name: '斗战胜佛之大圣之泪',
      brief:
        '成为斗战胜佛的孙悟空竟被怨灵蛊惑，唐三藏遭遇灭顶之灾！危急关头，孙悟空揪出怨灵源头，却发现她竟是与自己有三百年缘分的天人界女神——“幸运星”！为了找出“幸运星”黑化的原因，拯救唐三藏，孙悟空踏上了一场回到过去之旅，却最终流下了一滴眼泪。大圣之泪，为何而流，为谁而流？',
      author: '钟智行 Frankie Chung'
    },
    {
      name: '猎谎者',
      brief:
        '三个月前，某市发生了一起恶性绑架杀人案。三个月后，凶手与被害人都死于车祸。初出茅庐的女警韩烨找到了案件的幸存者林超凡，向他求证案件发生的经过。但随着调查的深入，韩烨发现林超凡的很多证词都存在漏洞，再三逼问之下，林超凡无奈坦白了另一个版本的故事，但案件真相远没有这么简单，几乎每个人都在说谎，而故事也开始不断反转。',
      author: '廉欣 Xin Lian'
    },
    {
      name: '天启大爆炸',
      brief:
        '《天启大爆炸》以中国古代曾真实发生的神秘爆炸为原型，加以天马行空的巧妙构思，为观众解封至今困惑世人的隐秘真相。神秘机构“夜行司”追踪离奇谜团勇闯“无相城”，一场关乎百姓苍生命运博弈就此展开。',
      author: '黄羿 Yi Huang / 曾黎'
    }
  ];
  const html = `<h4>我是 HTML 内容</h4>`;
  const js = `<script>alert('我是 Javascript 内容')</script>`;
  const flag = true;
  res.render('index', { list, html, js, flag });
});

app.listen(8201, () => {
  console.log('server running at http://127.0.0.1:8201');
});
