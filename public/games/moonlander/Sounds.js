var audioLibParams = {
  explosion: [
    "noise",
    1.0,
    0.661,
    0.0,
    0.03,
    2.196,
    2.0,
    20.0,
    440.0,
    2000.0,
    0.0,
    0.0,
    0.0,
    7.9763,
    0.0003,
    0.0,
    0.0,
    0.1,
    0.0,
    0.0,
    0.0,
    -0.01,
    0.026,
    0.321,
    1.0,
    1.0,
    0.0,
    0.0,
  ],
  thruster: [
    "noise",
    0.0,
    1.0,
    0.0,
    10.0,
    0.0,
    0.0,
    20.0,
    281.0,
    2400.0,
    0.0,
    0.0,
    0.0,
    7.9763,
    0.0003,
    0.0,
    0.0,
    0.0,
    0.2515,
    0.0,
    0.2544,
    0.0,
    0.0,
    0.273,
    0.0,
    0.379,
    0.0,
    0.0,
  ],
  beep: [
    "square",
    0.0,
    0.03,
    0.0,
    0.3,
    0.0,
    0.0,
    20.0,
    1210.0,
    20.0,
    0.0,
    0.0,
    0.0,
    7.9763,
    0.0003,
    0.0,
    0.0,
    0.1,
    0.0,
    0.0,
    0.4632,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
  ],
};

var samples = jsfxlib.createWaves(audioLibParams);
//samples.test.play();
//samples.explosion.play();
//samples.thruster.loop = true;
//samples.thruster.play();

samples.beep.volume = 0.3;
var thrustSound = samples.thruster;
var thrustInterval = 0;
var thrustPlaying = false;
var thrustVolume = 0;
var thrustTargetVolume = 0;

//playThruster();

function setThrustVolume(vol) {
  thrustTargetVolume = vol;
  if (vol > 0 && !thrustPlaying) {
    playThruster();
  }
}

function playThruster() {
  if (touchable) return;
  if (thrustInterval) clearInterval(thrustInterval);
  if (thrustPlaying) {
    thrustSound.pause();
  }

  thrustSound.play();
  thrustSound.currentTime = 0;
  thrustInterval = setInterval(updateThruster, 10);
  thrustPlaying = true;
}

function updateThruster(e) {
  if (touchable) return;
  if (thrustSound.currentTime > 8.5) thrustSound.currentTime = 0.1;
  if (thrustVolume != thrustTargetVolume) {
    thrustVolume += (thrustTargetVolume - thrustVolume) * 0.1;
    if (Math.abs(thrustVolume - thrustTargetVolume) < 0.01)
      thrustVolume = thrustTargetVolume;

    thrustSound.volume = thrustVolume;
  }
  if (thrustVolume <= 0) stopThruster();
}
function stopThruster() {
  if (touchable) return;

  if (!thrustPlaying) return;

  //thrustSound.currentTime = 2.5;
  clearInterval(thrustInterval);
  thrustPlaying = false;
}
