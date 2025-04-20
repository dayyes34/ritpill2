// Глобальные переменные для проигрывания
let currentStep = 0;
const stepsPerBlock = 4;   // В каждом блоке 4 шага (4 ячейки в ряду)
let totalSteps = 0;
let playInterval = null;
let tempo = 80; // стартовое BPM (можно менять через слайдер)
let noteLength = 16; // по умолчанию шестнадцатая

function getStepInterval() {
  // 60000 / tempo — длительность четверти в мс;
  // 4/noteLength — сколько четвертей занимает шаг (1 для 1/4, 0.5 для 1/8, 0.25 для 1/16)
  return (60000 / tempo) * (4 / noteLength);
}

// Функция генерации блоков (долей)
function generateBlocks(numBlocks) {
  const container = document.getElementById('blockrow');
  container.innerHTML = ""; // очищаем предыдущие блоки

  for (let blockIndex = 0; blockIndex < numBlocks; blockIndex++) {
    const block = document.createElement('div');
    block.classList.add('block');
    // Номер блока
    const blockNumber = document.createElement('div');
    blockNumber.classList.add('block-number');
    blockNumber.textContent = blockIndex + 1;
    block.appendChild(blockNumber);

    // Создаём 4 ряда.
    // Ряды 1 и 3 – hand-icon "R", ряды 2 и 4 – hand-icon "L"
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const row = document.createElement('div');
      row.classList.add('row');

      const handIcon = document.createElement('div');
      handIcon.classList.add('hand-icon');
      handIcon.textContent = (rowIndex % 2 === 0) ? 'R' : 'L';
      row.appendChild(handIcon);

      // Создаем 4 ячейки (шаги) в каждом ряду
      for (let cellIndex = 0; cellIndex < stepsPerBlock; cellIndex++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        // По клику можно переключать состояние ячейки (например для включения/выключения звука)
        cell.addEventListener('click', () => {
          cell.classList.toggle('filled');
        });
        row.appendChild(cell);
      }

      block.appendChild(row);
    }

    container.appendChild(block);
  }

  totalSteps = numBlocks * stepsPerBlock;
  currentStep = 0;
}

// Функция воспроизведения текущего шага
function playStep(step) {
  // Вычисляем, какой блок (доля) активен и какой шаг внутри блока
  const blockIndex = Math.floor(step / stepsPerBlock);
  const stepInBlock = step % stepsPerBlock;
  // console.log('stepInBlock', stepInBlock);

  // Получаем список всех блоков
  const blocks = document.querySelectorAll('.block');
  if (blockIndex >= blocks.length) return;

  const activeBlock = blocks[blockIndex];
  // Для каждого ряда внутри активного блока выбираем ячейку с номером stepInBlock
  const rows = activeBlock.querySelectorAll('.row');
  rows.forEach(row => {
    const cells = row.querySelectorAll('.cell');
    if (cells.length > stepInBlock) {
      const cell = cells[stepInBlock];

      // Если ячейка отмечена для проигрывания, можно запустить функцию playSound (твой код)
      if (cell.classList.contains('filled')) {
        // Пример вызова: определяем инструмент из панели или data-атрибут строки
        // let instrument = row.dataset.instrument; // если установлено
        // playSound(instrument);
        // console.log('Воспроизведение звука в блоке', blockIndex+1, 'шаг', stepInBlock+1);
      }

      // Визуальный эффект активации
      cell.classList.add('active');
      setTimeout(() => cell.classList.remove('active'), 150);
    }
  });
}

// Функция старта воспроизведения
function startPlayback() {
  stopPlayback(); // стоп, если уже запущено

  let intervalTime = getStepInterval();

  playInterval = setInterval(() => {
    playStep(currentStep);
    currentStep = (currentStep + 1) % totalSteps;
  }, intervalTime);
}

// Функция остановки воспроизведения
function stopPlayback() {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
}

// Обработчик изменения размера такта (число блоков)
document.getElementById('numblocks').addEventListener('change', (e) => {
  const numBlocks = parseInt(e.target.value);
  generateBlocks(numBlocks);
});

// Обработчик изменения темпа (BPM)
document.getElementById('temporange').addEventListener('input', (e) => {
  tempo = parseInt(e.target.value);
  document.getElementById('tempodisplay').textContent = tempo;

  // Если проигрывание запущено – перезапускаем его с новым интервалом
  if (playInterval) {
    startPlayback();
  }
});

// Обработчик изменения длины ячейки (noteLength)
document.getElementById('notelength').addEventListener('change', (e) => {
  noteLength = parseInt(e.target.value, 10);
  // если играем — перезапускаем по новым настройкам
  if (playInterval) startPlayback();
});

// Инициализация при загрузке страницы: генерируем блоки
document.addEventListener('DOMContentLoaded', () => {
  const defaultBlocks = parseInt(document.getElementById('numblocks').value);
  generateBlocks(defaultBlocks);
});
