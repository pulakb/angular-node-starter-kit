  var _config = {
        /**
         * Defining middleware access mode: 'rest' for real one, 'stubbed' for stubbed one
         */
        mw_type: {
            url_arg: 'mw',
            default: "rest",
            expected: ["rest", "stubbed"]
        },
        /**
         * ip used for remote debugging
         */
        stb_ip: {
            url_arg: 'ip',
            default: "127.0.0.1"
        },
        /**
         * RCU key mappings to use
         */
        rcu: {
            url_arg: 'rcu',
            default: "keyboard",
            expected: ["keyboard", "ruwido", "ruwido_ir", "nangmab"]
        },
        /**
         * Location of the logging console: set-top box or development desktop
         */
        log_env: {
            url_arg: 'env',
            default: "stb",
            expected: ["stb", "dev", "dsk"]
        },
        /**
         * Defining logging threshold level:
         * can be one of string : ["DEBUG", "INFO", "WARN", "ERROR", "FATAL", "NONE"]
         * or their num values  : [0, 1, 2, 3, 4, 5].
         */
        log_treshold: {
            url_arg: 'lvl',
            default: "WARN",
            expected: ["NONE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
        },
        /**
         * Defining log filter:
         * Comma separated list of strings to match log msg against
         * ex: "SettingsSection,RecordSection"
         */
        log_filter: {
            url_arg: 'lvf',
            default: "",
            set: function(lvf){
                return ( typeof lvf === 'string' ) ? lvf.split(',') : [];
            }
        },
        /**
         * Default locale domain
         */
        locale: {
            url_arg: 'lg',
            default: "en",
            expected: ["en", "fr"],
            set: function(locale){
                return "locale-"+ locale.toLowerCase() +"_"+ locale.toUpperCase();
            }
        },
        /**
         * Sources (styles and scripts) loading mode
         */
        src: {
            url_arg: 'src',
            default: "raw",
            expected: ["min", "raw"]
        },
        /**
         * Scripts sources paths
         */
        scripts_path: {
            default: 'assets/js'
        },
        /**
         * Styles source paths
         */
        styles_path: {
            default: "assets/css"
        }
    };

    function getUrlArgs(){
        args = {};
        if( window.document.URL.toString().indexOf('?') > 0 ){
            params = window.document.URL.split('?')[1].split('&');
            for( param_idx in params ){
                arg_arr = params[param_idx].split('=');
                if( arg_arr.length > 1 ){
                    args[arg_arr[0]] = ( arg_arr[1] === "" ) ? false : arg_arr[1] ;
                } else {
                    args[arg_arr[0]] = true;
                }
            }
        }
        return args;
    };

    function checkUrlArg(obj_args, arg_name){
        if( arg_name in obj_args ) return obj_args[arg_name];
        return;
    };

    var CFG = { url_args: getUrlArgs() };
    for( name in _config ){
        CFG[name] = _config[name].default;

        // Override default value with url_arg provided one?
        if( typeof _config[name].url_arg !== 'undefined' ){
            var check_url_arg = checkUrlArg(CFG.url_args, _config[name].url_arg);

            if ( typeof check_url_arg !== 'undefined' ){
                if( typeof _config[name].expected === 'undefined' ){
                    CFG[name] = check_url_arg;
                } else {
                    for( idx in _config[name].expected ){
                        if( check_url_arg === _config[name].expected[idx] ){
                            CFG[name] = check_url_arg;
                            break;
                        }
                    }
                }
            }
        }
        if( typeof _config[name].set === 'function' ){
            CFG[name] = _config[name].set(CFG[name]);
        }
    };

    tools = new Tools( '127.0.0.1' );

    log = new Log( '5');
    player_manager = new PlayerManager();
    player_controller = new PlayerController();
    channels_factory = new ChannelsFactory();
    config_store_manager = new ConfigStoreManager();
    settings_manager = new SettingsManager();

    main_channels = null;
    current_channel_index = null;

    onCreatePlayer = function( uuid ){
        // Init player controller with newly created player
        player_controller.init( player_manager.getPlayer( uuid ) );
    };

    player_manager.createPlayer("epg-ui",function(uuid) {
        self.onCreatePlayer(uuid);});

    getChannelsList = function( cb ) {
        main_channels.getList( cb );
    };

    onCreateChannels = function( channels ){
        log.error({"channels" : channels});
        main_channels = channels;
    };

    channels_factory.createChannels(function(channels) {
        log.error("sumit channnel is " + channels);
        onCreateChannels(channels);
        getChannelsList(function() {});
    });

    playMyChannel = function( channel_index ){
        log.debug("channel_index:", channel_index );

        if( main_channels === null ){
            log.error("Unable to play channel from index, channel list is invalid.");
            return;
        }

        // TODO: REMOVE % channel_count ONLY FOR BIG CHANNEL LIST TEST
        var channel_count = main_channels.getChannelCount();
        //channel_index = channel_index % channel_count;


        // Valid channel index ?
        if( channel_index >= 0 && channel_index < channel_count ){

            // Search for corresponding service id / play info
            var play_info = main_channels.getPlayInfo( channel_index );

            var service_id = main_channels.getServiceId( channel_index );

            // Store valid channel index
            current_channel_index = channel_index;

            // Play the channel play info
            if( player_controller._player !== null ){

                //this.notifyStreamUpdate(service_id, update_epg);

                //var self = this;
                player_controller._player.playStream( play_info, service_id, function(){});
            }

            // Store logical channel number in configstore
            var lcn = main_channels.getLCN( current_channel_index );
            settings_manager.setLastLcn( lcn );
        }
    };



    myLcn = null;
    getLcn = function(lcn) {
        // Latest LCN wasn't set
        myLcn = lcn;
        if( lcn === -1 ){
            // Play first channel from list
            playMyChannel( 0 );
        }
        // We get a valid LCN
        else{
            // Play lastest channel index from LCN
            channel_index = -1;
            if(main_channels)
                channel_index = main_channels.getChannelIndexFromLcn(lcn);
            // LCN could be an old one, not valid anymore...
            if( channel_index === -1 ){
                // Play first channel index
                playMyChannel( 0 );
            }
            else{
                playMyChannel( channel_index );
            }
        }
    };

/*
     settings_manager.getLastLcn(function(lcn) {
         log.error('First Play');
     getLcn(lcn);
     });*/
