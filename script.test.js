import { Ship } from './script';

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
