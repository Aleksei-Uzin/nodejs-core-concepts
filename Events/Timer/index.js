import Timer from './Timer.js';

const [duration = 5, pauseAfter = 3, resumeAfter = 5] = process.argv.slice(2).map(Number);

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
  }, pauseAfter * 1000);

  setTimeout(() => {
    console.log('Timer resumed');
    timer.resume();
  }, resumeAfter * 1000);

  timer.start();
}

timer(new Timer(duration));
