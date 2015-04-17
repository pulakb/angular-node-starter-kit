/**
* We’ll need to traverse the grid and find all of the possible locations. 
* As this is the responsibility of the grid to know where it’s open locations are, 
* we’ll create a new function on the GridService that will help us find all the
* possible traversal locations.
* 
* In order to find the direction, we’ll need to pick out the vector that the 
* user’s keypress indicates. For instance, if the user presses the right arrow key,
* then the user will want to move in increasing x locations.
*
* If the user presses the up button, then the user wants tiles to move in the decreasing y location. 
* We can map our vectors against the key the user pressed (which we get back from our KeyboardService) 
* using a JavaScript object.
*/

cloudStbApp.service('GridService', [ 'TileModel', function (TileModel) {

  this.grid   = [];
  this.tiles  = [];

  var vectors = {
    'left': { x: -1, y: 0 },
    'right': { x: 1, y: 0 },
    'up': { x: 0, y: -1 },
    'down': { x: 0, y: 1 }
  };

  // Size of the board
  this.size   = 4; // this will be dynamic in our case (3 cols but (1+1+1), (2+1), (3))
  // ...

  this.setSize = function(sz) {
    this.size = sz ? sz : 0;
  };
  
  this.setTileData = function () {

  };

  this.buildGridBoard = function () {

  };

  // Run a method for each element in the tiles array
  this.forEach = function(cb) {
    var totalSize = this.size * this.size;
    for (var i = 0; i < totalSize; i++) {
      var pos = this._positionToCoordinates(i);
      cb(pos.x, pos.y, this.tiles[i]);
    }
  };

  // Set a cell at position
  this.setCellAt = function(pos, tile) {
    if (this.withinGrid(pos)) {
      var xPos = this._coordinatesToPosition(pos);
      this.tiles[xPos] = tile;
    }
  };

  // Fetch a cell at a given position
  this.getCellAt = function(pos) {
    if (this.withinGrid(pos)) {
      var x = this._coordinatesToPosition(pos);
      return this.tiles[x];
    } else {
      return null;
    }
  };

  // A small helper function to determine if a position is
  // within the boundaries of our grid
  this.withinGrid = function(cell) {
    return cell.x >= 0 && cell.x < this.size &&
            cell.y >= 0 && cell.y < this.size;
  };

  this.anyCellsAvailable = function () {

  };

  this.traversalDirections = function(key) {
    var vector = vectors[key];
    var positions = {x: [], y: []};
    for (var x = 0; x < this.size; x++) {
      positions.x.push(x);
      positions.y.push(x);
    }
    // Reorder if we're going right
    if (vector.x > 0) {
      positions.x = positions.x.reverse();
    }
    // Reorder the y positions if we're going down
    if (vector.y > 0) {
      positions.y = positions.y.reverse();
    }
    return positions;
  };

  /*
  * If we do find a tile, we’ll start to look for the furthest possible positions away from the tile. 
  * To do this, we’ll walk through the next positions in the grid and check if the next cell is within the boundary 
  * of the grid and if the grid cell location is empty.

  * If the grid cell is empty and within the bounds of the grid, then we will look at the next cell and 
  * check the same conditions.

  * If either of these two conditions fail, then we have found either the boundary of the grid or we found the next cell. 
  * We’ll save the next position as newPosition and grab the next cell (regardless if it exists or not)
  */

  this.calculateNextPosition = function(cell, key) {
    var vector = vectors[key];
    var previous;

    do {
      previous = cell;
      cell = {
        x: previous.x + vector.x,
        y: previous.y + vector.y
      };
    } while (this.withinGrid(cell) && this.cellAvailable(cell));

    return {
      newPosition: previous,
      next: this.getCellAt(cell)
    };
  }; 

  this.moveTile = function(tile, newPosition) {
    var oldPos = {
      x: tile.x,
      y: tile.y
    };

    // Update array location
    this.setCellAt(oldPos, null);
    this.setCellAt(newPosition, tile);
    // Update tile model
    tile.updatePosition(newPosition);
  };  

}]);