const EventEmitter = require('events');

const event = new EventEmitter();
let index = 0;

const callback = (index) => {
  console.log('触发 play 事件');
  console.log(`this is index:${index}`);
  if (index === 5) {
    event.off('play', callback);
  }
};

event.on('play', callback);

event.once('play:once', (index) => {
  console.log('触发 play:once 事件');
  console.log(`this is index:${index}`);
});

setInterval(() => {
  console.log(++index);
  event.emit('play', index);
  event.emit('play:once', index);
}, 2000);
