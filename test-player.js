// Глобальные переменные:
let interval = null;
let currentStep = 0; 
const maxSteps = 16;  // 16 шагов как пример (четко и просто)
let bpm = 120; // стартовый темп

// Эта функция обязательна: читает BPM из слайдера!
function updateTempo(){
    const tempoSlider = document.getElementById('tempo-range');
    const tempoDisplay = document.getElementById('tempo-display');
    bpm = parseInt(tempoSlider.value);
    tempoDisplay.textContent = bpm;
}

// Функция проигрывания одного шага.  
// Пока для теста без твоей сложной логики: просто шаг выводим в консоль:
function playStep(step){
    console.log('играем шаг номер: ', step);

    // здесь потом будет твоя реальная логика воспроизведения звука
}

// ТВОЯ СТАРАЯ ФУНКЦИЯ (уже надёжно работает!):
function playStep(step){
    console.log('играем шаг номер:', step);

    // проигрываем каждый отмеченный на этом шаге инструмент:
    const activeCells = document.querySelectorAll(`.cell[data-step="${step}"].selected`);
    activeCells.forEach(cell => {
        const inst = cell.getAttribute('data-instrument');
        if (sounds[inst]) {
            sounds[inst].currentTime = 0;
            sounds[inst].play();
        }
    });

    // (опционально) Подсветка текущего шага — визуальный фидбек:
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('active'));
    document.querySelectorAll(`.cell[data-step="${step}"]`).forEach(cell => cell.classList.add('active'));
}


// ТВОЯ СТАРАЯ ФУНКЦИЯ остановки проигрывания
function stopPlayback(){
    clearInterval(interval);
    interval = null;
    currentStep = 0;
}

// Если изменишь ползунок, темп сразу применится:
document.addEventListener('DOMContentLoaded', () => {
    updateTempo();

    document.getElementById('tempo-range').addEventListener('input', () => {
        updateTempo();

        // сразу перезапускаем проигрывание при изменении темпа
        if(interval){
            clearInterval(interval);
            interval = setInterval(() => {
                playStep(currentStep);
                currentStep = (currentStep + 1) % maxSteps;
            }, 60000 / bpm / 4);
        }
    });
});
