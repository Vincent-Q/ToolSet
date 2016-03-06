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
			'position': 'absolute',
			'color': 'green'
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