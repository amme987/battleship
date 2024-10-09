import { Ship, Gameboard, Player } from './objects.js';

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('player').value;
  displayBoard(name);
});

function displayBoard(name) {
  const player = new Player(name);
}
