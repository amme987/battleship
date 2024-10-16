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

  generateCoordinates(length) {
    let range = 11 - length;
    let horizontal = Math.random() < 0.5;

    // 0-range exclusive
    let row = Math.floor(Math.random() * range);
    let col = Math.floor(Math.random() * range);

    return { horizontal, row, col };
  }

  autoPlaceShips(...ships) {
    ships.forEach(ship => {
      let { horizontal, row, col } = this.generateCoordinates(ship.length);

      while (!this.canPlaceShip([row, col], horizontal, ship)) {
        ({ horizontal, row, col } = this.generateCoordinates(ship.length));
      }

      this.placeShip([row, col], horizontal, ship);
    });
  }

  placeShip([x, y], orientation, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (orientation) {
        this.gameboard[x + i][y] = ship;
      } else {
        this.gameboard[x][y + i] = ship;
      }
    }
  }

  // Make sure ship isn't placed on top of existing ship
  canPlaceShip([x, y], orientation, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (orientation && this.gameboard[x + i][y].length !== 0) {
        return false;
      } else if (this.gameboard[x][y + i].length !== 0) {
        return false;
      }
    }
    return true;
  }

  // Takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to
  // the correct ship, or records the coordinates of the missed shot.
  receiveAttack([x, y]) {
    if (this.gameboard[x][y] instanceof Ship) {
      this.gameboard[x][y].hit();
      this.gameboard[x][y] = true;
    } else {
      this.gameboard[x][y] = false;
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

  autoPlaceShips() {
    this.gameboard.autoPlaceShips(
      this.carrier,
      this.battleship,
      this.destroyer,
      this.submarine,
      this.patrol
    );
  }
}
