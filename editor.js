document.addEventListener('DOMContentLoaded', () => {

  let selectedInstrument = 'kick';

  document.querySelectorAll('.instrument-btn').forEach(btn => {        
      btn.addEventListener('click', () => {    
          document.querySelectorAll('.instrument-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');

          selectedInstrument = btn.getAttribute('data-instrument');
      });
  });

  document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', () => {

          if(selectedInstrument === 'erase'){
              cell.classList.remove('filled');
              cell.removeAttribute('data-instrument');
              cell.innerHTML = '';
              return;
          }

          if (cell.classList.contains('filled') && cell.getAttribute('data-instrument') === selectedInstrument) {
              cell.classList.remove('filled');
              cell.removeAttribute('data-instrument');
              cell.innerHTML = '';
              return;
          }

          cell.classList.add('filled');
          cell.setAttribute('data-instrument', selectedInstrument);
          cell.innerHTML = `<img src="assets/instruments/${selectedInstrument}.png" alt="${selectedInstrument}"/>`;
      });
  });
});
