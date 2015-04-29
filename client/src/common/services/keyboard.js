cloudStbApp.service('KeyboardService', [ '$document', function ($document) {

    /*Trellis.Input = {}

    Trellis.Input.Keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13,
        BROWSER_BACK: 166,

        CHANNEL_UP: 427,
        CHANNEL_DOWN: 428,
        VOLUME_UP: 447,
        VOLUME_DOWN: 448,
        MUTE: 173,

        PLAY: 415,
        PAUSE: 19,
        STOP: 413,
        SEEK_FORWARD: 167,
        SEEK_BACK: 166,
        FAST_FORWARD: 417,
        REWIND: 9,
        RECORD: 219,

        HOME: 36,
        INFO: 191,
        GUIDE: 186,
        EXIT: 27,

        RED: 403,
        GREEN: 404,
        YELLOW: 405,
        BLUE: 406,

        KEY_0: 48,
        KEY_1: 49,
        KEY_2: 50,
        KEY_ESC: 27,
        KEY_SPC: 32,
        KEY_Z: 90,
        KEY_F1: 112,
        KEY_F2: 113,
        KEY_F3: 114,
        KEY_F4: 115
    };*/

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