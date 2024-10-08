export class Ship {
  constructor(length) {
    this.length = length;
  }

  hits = 0;

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
  gameboard = Array.from({ length: 10 }, () => Array(10).fill([]));

  placeShip([x, y], ship) {
    if (x + ship.length < 10) {
      for (let i = 0; i < ship.length; i++) {
        this.gameboard[x + i][y] = ship;
      }
    } else if (y + ship.length < 10) {
      for (let i = 0; i < ship.length; i++) {
        this.gameboard[x][y + i] = ship;
      }
    }
  }

  // Takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to
  // the correct ship, or records the coordinates of the missed shot.
  receiveAttack([x, y]) {
    if (!this.gameboard[x][y].length) {
      this.gameboard[x][y] = false;
    } else {
      this.gameboard[x][y].hit();
      this.gameboard[x][y] = true;
    }
  }

  // Report whether or not all ships have been sunk
  allSunk() {
    if (this.gameboard.flat().some(obj => obj instanceof Ship)) {
      return 'not all sunk';
    } else {
      return 'all sunk';
    }
  }
}

export class Player {
  constructor(name) {
    this.name = name;
  }

  gameboard = new Gameboard();

  carrier = new Ship(5);
  battleship = new Ship(4);
  destroyer = new Ship(3);
  submarine = new Ship(3);
  patrol = new Ship(2);
}
