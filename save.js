document.getElementById('saveExercise').addEventListener('click', () => {
    const exercise = {
      id: prompt('Введите id упражнения', 'ex-002'),
      title: prompt('Введите название упражнения', 'Новое упражнение'),
      description: prompt('Опишите упражнение', ''),
      difficulty: prompt('Уровень сложности (Начальный, Средний, Продвинутый)', 'Средний'),
      bpm: parseInt(prompt('Введите BPM', '120')),
      skills: prompt('Навыки (через запятую)', 'скорость,координация').split(',').map(s => s.trim()),
      instruments: ["kick","snare","hihat"],
      grid: []
    };
  
    for (let step = 1; step <= 16; step++) {
      const stepObj = { step, notes: [] };
      document.querySelectorAll(`.cell:nth-child(${step + 1})`).forEach(cell => {
        let instrument = cell.innerHTML.includes('snare') ? 'snare' :
                         cell.innerHTML.includes('kick') ? 'kick' :
                         cell.innerHTML.includes('hihat') ? 'hihat' : '';
  
        stepObj.notes.push({
          instrument,
          hand: cell.parentElement.querySelector('.hand-icon').textContent,
          active: cell.classList.contains('filled')
        });
      });
      exercise.grid.push(stepObj);
    }
  
    const jsonStr = JSON.stringify(exercise, null, 2);
    const blob = new Blob([jsonStr], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = exercise.id+'.json';
    a.href = url;
    a.click();
    URL.revokeObjectURL(url);
  });
  