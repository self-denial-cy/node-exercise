const chai = require('chai');
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../src/koa/index');

const assert = chai.assert;
const expect = chai.expect;

chai.should(); // Modifies `Object.prototype`

// describe 测试组，it 单个测试
describe('我是测试大组 A', () => {
  describe('我是测试小组 B', () => {
    it('我是单个测试 A【assert 风格】', () => {
      const value = 'hello';

      assert.typeOf(value, 'string');
      assert.equal(value, 'hello');
      assert.lengthOf(value, 5);
    });

    it('我是单个测试 B【should 风格】', () => {
      const value = 'hello';

      value.should.exist;
      value.should.be.a('string');
      value.should.equal('hello');
      value.should.not.equal('hello2');
      value.should.have.length(5);
    });

    it('我是单个测试 C【expect 风格】', () => {
      const value = 'hello';
      const number = 3;

      expect(number).to.be.at.most(5);
      expect(number).to.be.at.least(3);
      expect(number).to.be.within(1, 4);

      expect(value).to.exist;
      expect(value).to.be.a('string');
      expect(value).to.equal('hello');
      expect(value).to.not.equal('hello2');
      expect(value).to.have.length(5);
    });

    it('我是单个测试 D【异步场景——回调函数】', (done) => {
      fs.readFile(path.join(__dirname, '../.gitignore'), 'utf8', (err, data) => {
        if (err) return done(err);
        assert.include(data, 'apidocs');
        done();
      });
    });

    beforeEach(() => {
      console.log('beforeEach:');
    });

    afterEach(() => {
      console.log('afterEach.');
    });
  });

  describe('我是测试小组 C', () => {
    let server;

    before(() => {
      server = app.listen(3000);
    });

    it('我是单个测试 E【异步场景—— async/await】', async () => {
      const data = await fs.promises.readFile(path.join(__dirname, '../.gitignore'), 'utf8');
      assert.include(data, 'apidocs');
    });

    it('我是单个测试 F【异步场景——接口测试】', async () => {
      await request(server)
        .get('/login')
        .expect('Content-Type', /text\/html/)
        .expect(200);
    });

    // 钩子函数，当前测试组中所有单个测试结束后，走 after 钩子
    after(() => {
      server.close();
    });
  });
});
