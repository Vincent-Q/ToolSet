syncmod.define('remoteKeyController.keyMap.KeyboardKeyMap', function(){
        return {
        	'38': 'UP_KEY',
                '37': 'LEFT_KEY',
                '39': 'RIGHT_KEY',
                '40': 'DOWN_KEY',
                '13': 'OK_KEY',
                '84': 'GUIDE_KEY',
                '24': 'TT_KEY',
                '25': 'RESTART_KEY',
                '88': 'H_KEY',
                '89': 'TV_KEY',
                '76': 'POWER_KEY',
                '85': 'LIVE_KEY',
                '69': 'VOD_KEY',
                '87': 'VAS_KEY',
                '72': 'MENU_KEY',
                '73': 'INFO_KEY',
                '81': 'BTV_KEY',
                '27': 'EXIT_KEY',
                '79': 'AUDIO_KEY',
                '80': 'SUBTITLE_KEY',
                '75': 'MUTE_KEY',
                '66': 'BACK_KEY',
                '188': 'PAGEUP_KEY',
                '190': 'PAGEDOWN_KEY',
                '187': 'VOLUME_UP_KEY',
                '189': 'VOLUME_DOWN_KEY',
                '192': 'PAUSEPLAY_KEY',
                '65': 'RED_KEY',
                '83': 'GREEN_KEY',
                '68': 'YELLOW_KEY',
                '70': 'BLUE_KEY',
                '219': 'STAR_KEY',
                '186': 'LIVETV_KEY',
                '222': 'VOD_KEY',
                '220': 'GUIDE_KEY',
                '221': 'POUND_KEY',
                '71': 'TEST_KEY',
                '74': 'OPTION_KEY',
                '78': 'FBWD_KEY',
                '77': 'FFWD_KEY',
                '67': 'LOCAL_MEDIA_KEY',
                '112': 'PVR_KEY',
                '113': 'LONG_PVR_KEY',
                '187': 'CHANNEL_UP_KEY',
                '189': 'CHANNEL_DOWN_KEY',
                '82': 'RATE_KEY',
                '191': 'POWER_SUPPLY_KEY',
                '104': 'CHANNEL_UP_KEY',
                '98': 'CHANNEL_DOWN_KEY',
                '86': 'RECENT_KEY',
                '90': 'RECORD_KEY',
                '34': 'OFF_KEY',
                '32': 'SEARCH_KEY',
                '35': 'FAVOR_KEY',
                '114': 'POWER_KEY',
                '110': 'ENTER_KEY',
                '36': 'DVB_TXT_KEY',
                '121': 'RADIO_KEY',
                '10188': 'LONG_PAGEUP_KEY',
                '10190': 'LONG_PAGEDOWN_KEY',
                '119': 'STB_EXIT_KEY'
	}
});
syncmod.define('remoteKeyController.keyMap.RemoteKeyMap', function(){
	return {
		'256': 'POWER_KEY',
                '273': 'GUIDE_KEY',
                '268': 'INFO_KEY',
                '38': 'UP_KEY',
                '37': 'LEFT_KEY',
                '39': 'RIGHT_KEY',
                '40': 'DOWN_KEY',
                '13': 'OK_KEY',
                '8': 'BACK_KEY',
                '1117': 'EXIT_KEY',
                '5213': 'STB_EXIT_KEY',
                '267': 'PAGEUP_KEY',
                '266': 'PAGEDOWN_KEY',
                '1124': 'DVB_KEY',
                '265': 'FBWD_KEY',
                '264': 'FFWD_KEY',
                '263': 'PAUSEPLAY_KEY',
                '275': 'RED_KEY',
                '276': 'GREEN_KEY',
                '277': 'YELLOW_KEY',
                '278': 'BLUE_KEY',
                '48': 'ZERO_KEY',
                '49': 'ONE_KEY',
                '50': 'TWO_KEY',
                '51': 'THREE_KEY',
                '52': 'FOUR_KEY',
                '53': 'FIVE_KEY',
                '54': 'SIX_KEY',
                '55': 'SEVEN_KEY',
                '56': 'EIGHT_KEY',
                '57': 'NINE_KEY',
                '1120': 'OPTION_KEY',
                '259': 'VOLUME_UP_KEY',
                '260': 'VOLUME_DOWN_KEY',
                '257': 'CHANNEL_UP_KEY',
                '258': 'CHANNEL_DOWN_KEY',
                '261': 'MUTE_KEY',
                '272': 'MENU_KEY',
                '46': 'DELETE_KEY',
                '10': 'ENTER_KEY',
                '1105': 'SEARCH_KEY',
                '270': 'STOP_KEY',
                '1109': 'VOD_KEY',
                '1118': 'RECENT_KEY',
                '1119': 'RECORDINGS_KEY',
                '1121': 'RECORD_KEY',
                '1122': 'RADIO_KEY',
                '768': 'STB_EVENT_KEY',
                '769': 'RENDER_COMPLETE_KEY',
                '1152': 'ON_KEY',
                '1153': 'OFF_KEY',
                '4352': 'POWER_KEY',
                '4134': 'UP_KEY',
                '4136': 'DOWN_KEY',
                '4133': 'LEFT_KEY',
                '4135': 'RIGHT_KEY',
                '4109': 'OK_KEY',
                '5218': 'RADIO_KEY',
                '4104': 'BACK_KEY',
                '4368': 'MENU_KEY',
                '1376': 'DVB_TXT_KEY',
                '280': 'FAVOR_KEY',
                '4353': 'CHANNEL_UP_KEY',
                '4354': 'CHANNEL_DOWN_KEY',
                '10267': 'LONG_PAGEUP_KEY',
                '10266': 'LONG_PAGEDOWN_KEY',
                '10013': 'LONG_OK_KEY',
                '10046': 'LONG_DELETE_KEY'
	}
});
syncmod.define('utils.observer.Subject', function(){
	function Subject(){
		this.__observerList = [];
	};

	var proto = Subject.prototype;

	proto.attach = function(observer){
		if(!this.__hasObserver(observer)){
			this.__observerList.push(observer);
		}
	}

	proto.detach = function(observer){
		var index = this.__findIndexOf(observer);
		if(-1 !== index){
			this.__observerList.splice(index, 1);
		}
	}

	proto.notify = function(){
		var observer = null;
		for(var i=0; i<this.__observerList.length; i++){
			observer = this.__observerList[i];
			if(observer && observer.update){
				observer.update.apply(observer, arguments);
			}
		}
	}

	proto.__hasObserver = function(observer){
		return -1 !== this.__findIndexOf(observer);
	}

	proto.__findIndexOf = function(observer){
		for(var i=0; i<this.__observerList.length; i++){
			if(this.__observerList[i] === observer){
				return i;
			}
		}

		return -1;
	}

	return Subject;
});
syncmod.define('remoteKeyController.KeyDispatcher', function(require){
	var remoteKeyMap = require('remoteKeyController.keyMap.RemoteKeyMap');
	var keyboardKeyMap = require('remoteKeyController.keyMap.KeyboardKeyMap');

	var Subject = require('utils.observer.Subject');

	function KeyDispatcher(){
		this.__subject = new Subject();
	}

	var proto = KeyDispatcher.prototype;

	/*
	 =================================================================================
	 ============== Begin: delegate subject functions to a subject object ============
	 =================================================================================
	 */
	
	proto.registerKeyHandler = function(keyHandler){
		this.__subject.attach(keyHandler);
	}

	proto.unregisterKeyHandler = function(keyHandler){
		this.__subject.detach(keyHandler);
	}

	proto.handleKey = function(event){
		var keyCode = event.which || event.keyCode || event.keyLocation;
		var keyName = remoteKeyMap[keyCode] || keyboardKeyMap[keyCode];

		if(!keyName){
			throw new Error('Key code [' + keyCode + '] is not defined!');
		}

		this.__subject.notify(keyName);
	}

	/*
	 =================================================================================
	 ============== End: delegate subject functions to a subject object ============
	 =================================================================================
	 */
	
	return new KeyDispatcher();
});
syncmod.define('ruler.DistanceRuler', function(require){
	function DistanceRuler(left, top, width, height, alpha){
		this.__setSize(width, height);
		this.__setPosition(left, top);
		this.__setAlpha(alpha);

		this.__paint();
	}

	var proto = DistanceRuler.prototype;

	proto.resize = function(width, height){
		this.__setSize(width, height);
		this.__refresh();
	}

	proto.locate = function(left, top){
		this.__setPosition(left, top);
		this.__refresh();
	}

	proto.adjustTransparency = function(alpha){
		this.__setAlpha(alpha);
		this.__refresh();
	}

	proto.load = function(){
		this.__isLoaded = true;

		$('#root').append(this.__$rectangular);
		$('#root').append(this.__$label);
	}

	proto.unload = function(){
		this.__isLoaded = false;

		$('#root').remove(this.__$rectangular);
		$('#root').remove(this.__$label);
	}

	proto.__setSize = function(width, height){
		this.__width = width || 480;
		this.__height = height || 320;
	}

	proto.__setPosition = function(left, top){
		this.__left = left || 0;
		this.__top = top || 0;
	}

	proto.__setAlpha = function(alpha){
		this.__alpha = alpha || 0.5;
	}

	proto.__paint = function(){
		this.__$rectangular = $('<div>');
		this.__$label = $('<div>');

		this.__refreshLabel('left');
		this.__refresh();
	}

	proto.__refreshLabel = function(direction){
		this.__$label.css({
			'background-color':'rgba(255, 0, 0, 0.9)',
            'left': direction === 'left' ? '50px' : '1000px',
            'top': '50px',
            'width': '200px',
            'height': '24px',
            'position': 'absolute',
            'font-size': '20px',
            'padding': '2px 10px',
            'color': 'green'
		});
	}

	proto.__refresh = function(){
		this.__$rectangular.css({
			'background-color':'rgba(255, 0, 0, ' + this.__alpha + ')',
			'left': this.__left + 'px',
			'top': this.__top + 'px',
			'width': this.__width + 'px',
			'height': this.__height + 'px',
			'position': 'absolute'
		});

		this.__$label.text('width: ' + this.__width + '; height: ' + this.__height);
	}

	proto.update = function(keyName){
		if (!this.__isLoaded){
			throw 'Distance ruler needs to be loaded firstly.'
		}

		switch(keyName) {
			case 'UP_KEY':
				this.locate(this.__left, this.__top - 1);
				break;
			case 'DOWN_KEY':
				this.locate(this.__left, this.__top + 1);
				break;
			case 'LEFT_KEY':
				this.locate(this.__left - 1, this.__top);
				break;
			case 'RIGHT_KEY':
				this.locate(this.__left + 1, this.__top);
				break;
			case 'CHANNEL_UP_KEY':
			case 'VOLUME_UP_KEY':
				this.__height++;
				this.__top--;
				this.__refresh();
				break;
			case 'CHANNEL_DOWN_KEY':
			case 'VOLUME_DOWN_KEY':
				this.__height--;
				this.__top++;
				this.__refresh();
				break;
			case 'FBWD_KEY':
				this.__width++;
				this.__left--;
				this.__refresh();
				break;
			case 'FFWD_KEY':
				this.__width--;
				this.__left++;
				this.__refresh();
				break;
			case 'OK_KEY':
				this.__refreshLabel('right');
				break;
			case 'INFO_KEY':
				this.__refreshLabel('left');
				break;
			default:
				break;
		}
	};

	return new DistanceRuler();
});
syncmod.define('ruler.KerningRuler', function(require){
	function KerningRuler(){
		this.__width = 320;
		this.__height = 32;
		this.__left = 0;
		this.__top = 0;

		this.__paint();
	}

	var proto = KerningRuler.prototype;

	proto.load = function(){
		this.__isLoaded = true;

		$('#root').append(this.__$displayPanel);
		$('#root').append(this.__$kerningPanel);
	}

	proto.unLoad = function(){
		this.__isLoaded = false;

		$('#root').remove(this.__$displayPanel);
		$('#root').remove(this.__$kerningPanel);
	}

	proto.limitWidth = function(width){
		this.__width = width || -1;
		this.__refresh();
	}

	proto.limitSize = function(width, height){
		this.__height = height || -1;
		this.limitWidth(width);
	}

	proto.locate = function(left, top){
		this.__left = left || 0;
		this.__top = top || 0;
		this.__refresh();
	}

	proto.applyRule = function(fontRule){
		this.__fontRule = {
			'font-family': 'Tele-Grotesk',
    		'font-weight': '400px',
    		'font-size': '32px',
    		'line-height': '32px',
    		'letter-spacing': '1px'
		};
		this.__refresh();
	}

	proto.__paint = function(){
		this.__paintDisplayPanel('left');
		this.__paintKerningPanel();
	}

	proto.__paintDisplayPanel = function(direction){
		this.__$displayPanel = $('<div>');

		this.__$displayPanel.css({
			'background-color': 'rgba(0, 255, 0, 0.9)',
			'width': '230px',
			'height': '158px',
			'top': '50px',
			'left': direction === 'left' ? '50px' : '1000px',
			'position': 'absolute',
			'font-size': '18px'
		});

		this.__refreshDisplayPanel();
	}

	proto.__paintKerningPanel = function(){
		this.__$kerningPanel = $('<div>');

		this.__refreshKerningPanel();
	}

	proto.__refresh = function(){
		this.__refreshDisplayPanel();
		this.__refreshKerningPanel();
	}

	proto.__refreshDisplayPanel = function(){
		var innerHtml = '&nbsp;&nbsp;{<br/>';

		for(var key in this.__fontRule){
			innerHtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + key + ':' + this.__fontRule[key] + ';<br/>'
		}

		innerHtml += '&nbsp;&nbsp;}'

		this.__$displayPanel.html(innerHtml);
	}

	proto.__refreshKerningPanel = function(){
		var style = {
			'background-color': 'rgba(255, 0, 0, 0.2)',
			'left': this.__left + 'px',
			'top': this.__top + 'px',
			'width': this.__width + 'px',
			'height': this.__height + 'px',
			'position': 'absolute'
		}

		if (this.__fontRule){
			for(var key in this.__fontRule){
				style[key] = this.__fontRule[key];
			}
		}

		this.__$kerningPanel.css(style);
	}

	proto.update = function(keyName){
		if (!this.__isLoaded){
			throw 'Kerning ruler needs to be loaded firstly.'
		}

		switch(keyName) {
			case 'UP_KEY':
				this.locate(this.__left, this.__top - 1);
				break;
			case 'DOWN_KEY':
				this.locate(this.__left, this.__top + 1);
				break;
			case 'LEFT_KEY':
				this.locate(this.__left - 1, this.__top);
				break;
			case 'RIGHT_KEY':
				this.locate(this.__left + 1, this.__top);
				break;
			case 'CHANNEL_UP_KEY':
			case 'VOLUME_UP_KEY':
				this.__height++;
				this.__top--;
				this.__refresh();
				break;
			case 'CHANNEL_DOWN_KEY':
			case 'VOLUME_DOWN_KEY':
				this.__height--;
				this.__top++;
				this.__refresh();
				break;
			case 'FBWD_KEY':
				this.__width++;
				this.__left--;
				this.__refresh();
				break;
			case 'FFWD_KEY':
				this.__width--;
				this.__left++;
				this.__refresh();
				break;
			case 'OK_KEY':
				this.__refreshLabel('right');
				break;
			case 'INFO_KEY':
				this.__refreshLabel('left');
				break;
			default:
				break;
		}
	}

	return new KerningRuler();
});
syncmod.define('remoteKeyController.KeyController', function(require){
	var pageKeyHandler = null;
	var keyDispatcher = require('remoteKeyController.KeyDispatcher');
	var distanceRuler = require('ruler.DistanceRuler');
	var kerningRuler = require('ruler.KerningRuler');

	var keyOwner = 'Page';

	var loadKeyController = function(){
		pageKeyHandler = window.onkeydown;

		window.onkeydown = function(event){
			if(keyOwner === 'ToolSet'){
				keyDispatcher.handleKey(event);
			} else {
				return pageKeyHandler.apply(null, arguments);
			}
		}
	}

	loadKeyController();

	var switchKeyOwner = function(){
		if(keyOwner === 'Page'){
			keyOwner = 'ToolSet';
		} else {
			keyOwner = 'Page';
		}
	}

	var currentTool = null;

	var loadDistanceRuler = function(){
		if (currentTool){
			currentTool.unload();
			keyDispatcher.unregisterKeyHandler(currentTool);
		}

		currentTool = distanceRuler;

		currentTool.load();
		keyDispatcher.registerKeyHandler(currentTool);
	}

	var loadKerningRuler = function(){
		if (currentTool){
			currentTool.unload();
			keyDispatcher.unregisterKeyHandler(currentTool);
		}

		currentTool = kerningRuler;

		currentTool.load();
		keyDispatcher.registerKeyHandler(currentTool);
	}

	return {
		'loadDistanceRuler': loadDistanceRuler,
		'loadKerningRuler': loadKerningRuler,
		'switchKeyOwner': switchKeyOwner
	};
});
syncmod.define('ToolSet', function(){
	window.toolSet = {
		'distanceRuler': syncmod.use('ruler.DistanceRuler'),
		'kerningRuler': syncmod.use('ruler.KerningRuler'),
		'keyController': syncmod.use('remoteKeyController.KeyController')
	};
});