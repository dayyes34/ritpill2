let bpm = 120; // можно менять пользователем
let noteLength = 16; // по умолчанию 1/16
let playInterval = null;

document.getElementById('tempo-range').addEventListener('input', function(e) {
  bpm = parseInt(e.target.value, 10);
  document.getElementById('tempo-display').textContent = bpm;
  if (playInterval) startPlayback();
});

document.getElementById('note-length').addEventListener('change', function(e) {
  noteLength = parseInt(e.target.value, 10);
  if (playInterval) startPlayback();
});

function getStepInterval() {
  // 1 минута = 60000 мс
  // 1 четверть: 60000 / bpm
  // одна ячейка == noteLength-ая нота
  // если 16 -> 1/16, значит шаг = (60000 / bpm) / 4
  // если 8  -> 1/8,  значит шаг = (60000 / bpm) / 2
  // если 4  -> 1/4,  значит шаг = (60000 / bpm)
  let quarterMs = 60000 / bpm;
  if (noteLength === 16) return quarterMs / 4;
  if (noteLength === 8) return quarterMs / 2;
  if (noteLength === 4) return quarterMs;
  return quarterMs / 4; // по дефолту
}

function startPlayback() {
  stopPlayback();
  playInterval = setInterval(() => {
    playStep(currentStep);
    currentStep = (currentStep + 1) % totalSteps;
  }, getStepInterval());
}

function stopPlayback() {
  if (playInterval) clearInterval(playInterval);
  playInterval = null;
}