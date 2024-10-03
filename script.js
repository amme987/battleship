export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  // Increases the number of 'hits' in your ship
  hit() {
    return this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) {
      return true;
    } else {
      return false;
    }
  }
}

export class Gameboard {
  constructor() {
    this.gameboard = Array.from({ length: 10 }, () => Array(10).fill([]));
  }

  placeShip(coordinates, ship) {
    if (coordinates[0] + ship.length <= 10) {
      ship.coordinates = [];
      for (let i = 0; i < ship.length; i++) {
        ship.coordinates.push([coordinates[0] + i, coordinates[1]]);
      }
    } else if (coordinates[1] + ship.length <= 10) {
      ship.coordinates = [];
      for (let i = 0; i < ship.length; i++) {
        ship.coordinates.push([coordinates[0], coordinates[1] + i]);
      }
    }
  }

  // Takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to
  // the correct ship, or records the coordinates of the missed shot.
  receiveAttack() {}
}
