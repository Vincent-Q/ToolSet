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