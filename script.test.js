import { Ship, Gameboard } from './script';

describe('Ship', () => {
  let ship = new Ship(3);

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
  let ship = new Ship(3);
  let ship2 = new Ship(4);
  let board = new Gameboard();

  test('create board', () => {
    expect(board.gameboard).toHaveLength(10);
    board.gameboard.forEach(row => expect(row).toHaveLength(10));
  });

  test('place ship horizontally', () => {
    board.placeShip([0, 5], ship);
    expect(board.gameboard[0][5]).toMatchObject(ship);
    expect(board.gameboard[0][0]).toStrictEqual([]);
  });

  test('place ship vertically', () => {
    board.placeShip([9, 0], ship2);
    expect(board.gameboard[9][0]).toMatchObject(ship2);
    expect(board.gameboard[0][0]).toStrictEqual([]);
  });

  test('receive attack', () => {
    board.receiveAttack([0, 0]);
    expect(board.gameboard[0][0]).toBe(false);

    board.receiveAttack([9, 0]);
    expect(ship2.hits).toBe(1);
  });
});
