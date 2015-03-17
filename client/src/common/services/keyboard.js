cloudStbApp.service('KeyboardService', [ '$document', function ($document) {

  var UP    = 'up',
      RIGHT = 'right',
      DOWN  = 'down',
      LEFT  = 'left';

  var keyboardMap = {
    37: LEFT,
    38: UP,
    39: RIGHT,
    40: DOWN
  };

  // Initialize the keyboard event binding
  this.init = function() {
    var self = this;
    this.keyEventHandlers = [];
    $document.bind('keydown', function(evt) {
      var key = keyboardMap[evt.which];

      if (key) {
        // An interesting key was pressed
        evt.preventDefault();
        self._handleKeyEvent(key, evt);
      }
    });
  };

  this._handleKeyEvent = function(key, evt) {
    var callbacks = this.keyEventHandlers;
    if (!callbacks) {
      return;
    }

    evt.preventDefault();
    if (callbacks) {
      for (var x = 0; x < callbacks.length; x++) {
        var cb = callbacks[x];
        cb(key, evt);
      }
    }
  };  

  // Bind event handlers to get called
  // when an event is fired
  this.keyEventHandlers = [];
  this.on = function(cb) {
    this.keyEventHandlers.push(cb);
  };


}]);