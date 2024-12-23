import { Ship, Gameboard, Player } from './objects';

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
  let ship2 = new Ship(2);
  let board = new Gameboard();

  test('create board', () => {
    expect(board.gameboard).toHaveLength(10);
    board.gameboard.forEach(row => expect(row).toHaveLength(10));
  });

  test('place ship horizontally', () => {
    board.placeShip([0, 5], true, ship);
    expect(board.gameboard[0][5]).toMatchObject(ship);
    expect(board.gameboard[0][0]).toStrictEqual([]);
  });

  test('place ship vertically', () => {
    board.placeShip([9, 0], false, ship2);
    expect(board.gameboard[9][0]).toMatchObject(ship2);
    expect(board.gameboard[0][0]).toStrictEqual([]);
  });

  test('generates coordinates until ship can be placed', () => {
    let autoShip = new Ship(2);

    board.canPlaceShip = jest.fn();
    board.canPlaceShip.mockReturnValue(true).mockReturnValueOnce(false);

    board.generateCoordinates = jest.fn();
    board.generateCoordinates.mockReturnValue({
      horizontal: true,
      row: 6,
      col: 2,
    });

    board.autoPlaceShips(autoShip);
    expect(board.canPlaceShip).toHaveBeenCalledTimes(2);
    expect(board.gameboard[6][2]).toMatchObject(autoShip);
  });

  test('receive attack', () => {
    board.receiveAttack([0, 0]);
    expect(board.gameboard[0][0]).toBe(false);

    board.receiveAttack([9, 0]);
    expect(ship2.hits).toBe(1);
    expect(board.gameboard[9][0]).toBe(true);
  });

  test('all sunk', () => {
    expect(board.allSunk()).toBe('not all sunk');

    board.receiveAttack([9, 1]);
    board.receiveAttack([0, 5]);
    board.receiveAttack([1, 5]);
    board.receiveAttack([2, 5]);
    board.receiveAttack([6, 2]);
    board.receiveAttack([7, 2]);

    expect(board.allSunk()).toBe('all sunk');
  });
});

test('player', () => {
  let player = new Player('Emma');
  expect(player.name).toBe('Emma');

  // console.log(player.gameboard);
  // player.autoPlaceShips();
  // console.log(player.gameboard);
});
