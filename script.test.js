import { Ship, Gameboard } from './script';

let ship = new Ship(3);
let board = new Gameboard();

describe('Ship', () => {
  test('hits', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('is sunk', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe('Gameboard', () => {
  test('create board', () => {
    expect(board.gameboard.length).toBe(10);
    board.gameboard.forEach(row => expect(row.length).toBe(10));
  });

  test('place ship horizontally', () => {
    board.placeShip([0, 5], ship);
    console.log(ship.coordinates);
    expect(ship.coordinates).toStrictEqual([
      [0, 5],
      [1, 5],
      [2, 5],
    ]);
  });

  test('place ship vertically', () => {
    board.placeShip([10, 0], ship);
    console.log(ship.coordinates);
    expect(ship.coordinates).toStrictEqual([
      [10, 0],
      [10, 1],
      [10, 2],
    ]);
  });
});
