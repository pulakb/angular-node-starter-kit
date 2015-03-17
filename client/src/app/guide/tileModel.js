cloudStbApp.service('TileModel', [ 'GenerateUniqueId', function (GenerateUniqueId) {

  var Tile = function(pos, val) {
    this.x = pos.x;
    this.y = pos.y;
    this.value = val || 2;
    
    // Generate a unique id for this tile
    this.id = GenerateUniqueId.next();    
  };

  Tile.prototype.updatePosition = function(newPos) {
    this.x = newPos.x;
    this.y = newPos.y;
  };

  return Tile;	

}]);