// player.js
document.addEventListener('DOMContentLoaded', () => {
    // По умолчанию выбранный инструмент
    let selectedInstrument = 'kick';
  
    // Обработка клика по кнопкам инструментов
    // Кнопки должны иметь класс .instrument-btn и атрибут data-instrument
    document.querySelectorAll('.instrument-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Снимаем активное выделение со всех кнопок
        document.querySelectorAll('.instrument-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedInstrument = btn.getAttribute('data-instrument');
      });
    });
  
    // Обработка клика по ячейкам
    // Ячейки должны иметь класс .cell
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', () => {
  
        // Если выбран режим стирания или клик по ячейке с тем же инструментом — очищаем ячейку
        if (selectedInstrument === 'erase' ||
           (cell.classList.contains('filled') && cell.getAttribute('data-instrument') === selectedInstrument)) {
          cell.classList.remove('filled');
          cell.removeAttribute('data-instrument');
          cell.innerHTML = '';
          return;
        }
  
        // В противном случае заполняем ячейку выбранным инструментом
        cell.classList.add('filled');
        cell.setAttribute('data-instrument', selectedInstrument);
        cell.innerHTML = `<img src="assets/instruments/${selectedInstrument}.png" alt="${selectedInstrument}" style="width:22px" />`;
      });
    });
  });
  
  // Аудио для инструментов
  const INSTRUMENT_AUDIO = {
    kick: new Audio('assets/sounds/kick.mp3'),
    snare: new Audio('assets/sounds/snare.mp3'),
    hihat: new Audio('assets/sounds/hihat.mp3'),
    clap: new Audio('assets/sounds/clap.wav')
  };
  
  // Функция воспроизведения шага
  function playStep(step) {
    const blockIndex = Math.floor(step / 4);
    const stepInBlock = step % 4;
    const blocks = document.querySelectorAll('.block');
    if (blockIndex >= blocks.length) return;
    const activeBlock = blocks[blockIndex];
    const rows = activeBlock.querySelectorAll('.row');
    rows.forEach(row => {
      const cells = row.querySelectorAll('.cell');
      if (cells.length > stepInBlock) {
        const cell = cells[stepInBlock];
        // Если в ячейке указан инструмент – воспроизводим его звук
        const instrument = cell.getAttribute('data-instrument');
        if (instrument && INSTRUMENT_AUDIO[instrument]) {
          INSTRUMENT_AUDIO[instrument].currentTime = 0;
          INSTRUMENT_AUDIO[instrument].play();
        }
        // Добавляем визуальный эффект (активная ячейка)
        cell.classList.add('active');
        setTimeout(() => cell.classList.remove('active'), 120);
      }
    });
  }
  
  /* Пример интервала воспроизведения (раскомментируйте при необходимости)
  let currentStep = 0;
  const totalSteps = 16;
  const interval_in_ms = 200;
  
  setInterval(() => {
    playStep(currentStep);
    currentStep = (currentStep + 1) % totalSteps;
  }, interval_in_ms);
  */
  