/**
* GuideManager will be responsible for managing the guide state and handling the key
* movements, updating program info and video URL
*
*/
cloudStbApp.service('GuideManager', [ 'GridService', function (GridService) {

  	// Handle the move action
	this.move = function(key) {
	  var self = this;
	  // define move here
	  if (self.win) { return false; }
	  var positions = GridService.traversalDirections(key);

	  // DO WE NEED THIS FOR OUR PROGRAM ?????
	  positions.x.forEach(function(x) {
	    positions.y.forEach(function(y) {
	      	// For every position
	      	// save the tile's original position
			var originalPosition = {x:x,y:y};
			var tile = GridService.getCellAt(originalPosition);

			if (tile) {
			  // if we have a tile here
			  var cell = GridService.calculateNextPosition(tile, key),
			  	  next = cell.next;
			  // ...
			}
	    });
	  });
	};

  	// Update the score
	this.updateInfo = function(newScore) {};

	/**
	* Are there moves left? movesAvailable() function reports true when there are cells available
	* we’ll want to ensure there are no moves available when there are neither cells nor data available
	*/
	this.movesAvailable = function() {
		return GridService.anyCellsAvailable();
	};	

}]);