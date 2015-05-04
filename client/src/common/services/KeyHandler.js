cloudStbApp.service('KeyHandlerService', ['$state', '$stateParams', function ($state, $stateParams) {

    this.move = function (key, evt) {
        /*
        * Based on KEY pressed, respective functions to be called.
        * */
        switch (key) {
            case 'enter':
                ENTER_KEY_EventsHandler (evt);
                break;

            default:
                break;
        }
    };


    /**
     * The following function for handling 'ENTER' events
     *
     * */
    function ENTER_KEY_EventsHandler (evt) {

        var _target = evt.target,
            _hash = _target.hash,
            _isChannelClicked = $(_target).hasClass('channelCarousel'),
            _isProgramClicked = $(_target).hasClass('programCarousel');

        var _data = _hash.split('/'),
            _dataLength = _data.length,
            _param = _data[_dataLength - 1];

        if (_isChannelClicked) {
            // If Channel Link is Clicked
            $state.go('tabs.bychannel.channellist.channel',  { "cid": _param });

        } else if (_isProgramClicked) {
            // If Program Link is Clicked
            $state.go('tabs.bychannel.channellist.channel.programInfo',  { "pid": _param });

        } else {
            $state.go('tabs.bychannel.channellist');
        }
    }

    /**
     * The following function for handling 'LEFT' events
     *
     * */

     function LEFT_KEY_EventsHandler () {

     }
    /**
     * The following function for handling 'RIGHT' events
     *
     * */

    function RIGHT_KEY_EventsHandler () {

    }

  }]);