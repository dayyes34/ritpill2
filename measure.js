const sequencerContainer = document.querySelector(".sequencer-container");
const numBlocksSelector = document.getElementById("num-blocks");
let totalBlocks = parseInt(numBlocksSelector.value);
let totalSteps = totalBlocks * 4; // 4 шага в каждом блоке
let currentStep = 0;

// Функция создания одного блока
function createBlock(blockNumber) {
  const block = document.createElement('div');
  block.className = 'block';
  block.dataset.blockNum = blockNumber;

  const instruments = ['kick', 'snare', 'hat-closed', 'hat-open'];

  instruments.forEach(instr => {
    let row = document.createElement('div');
    row.className = 'row';
    row.dataset.instrument = instr;
    for (let i = 0; i < 4; i++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }
    block.appendChild(row);
  });

  return block;
}

// Очистка и генерация необходимого количества блоков
function generateBlocks(numBlocks){
  sequencerContainer.innerHTML = '';
  for(let i = 0; i < numBlocks; i++){
    sequencerContainer.appendChild(createBlock(i));
  }
  totalBlocks = numBlocks;
  totalSteps = totalBlocks * 4;
  currentStep = 0;
}

// Вызов функции при смене количества блоков
numBlocksSelector.addEventListener('change', e => {
  generateBlocks(parseInt(e.target.value));
});

// Сразу создаем блоки
generateBlocks(totalBlocks);
