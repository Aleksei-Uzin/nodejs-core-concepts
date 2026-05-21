const Timer = require('./timer');

const onTick = remaining => {
  console.log(`Tick: ${remaining} seconds remaining`);
};

const onTickAlert = remaining => {
  if (remaining === 2) {
    console.log(`HURRY! Only ${remaining}s left!`);
  }
};

const onDone = () => {
  console.log('Time is up');
};

function timer(timer) {
  timer.on('tick', onTick);
  timer.on('tick', onTickAlert);
  timer.on('done', onDone);

  setTimeout(() => {
    console.log('Timer paused');
    timer.pause();
  }, 3000);

  setTimeout(() => {
    console.log('Timer resumed');
    timer.resume();
  }, 5000);

  timer.start();
}

timer(new Timer(5));
