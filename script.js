import { Ship, Gameboard, Player } from './objects.js';

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('player').value;
  hideForm();
  displayBoard(name);
});

function hideForm() {
  const form = document.querySelector('form');
  form.style.display = 'none';
}

function displayBoard(name) {
  const player = new Player(name);
  player.autoPlaceShips();
  let gameboard = player.gameboard;
  console.log(gameboard);
  let board = document.querySelector('div > .board');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const button = document.createElement('button');
      button.textContent = gameboard.gameboard[i][j];
      board.appendChild(button);
    }
  }
}
