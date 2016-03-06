/**
 * @class VirtualKeyEvent
 * @author Vincent Qiu
 * @version 1.0.0
 */

(function(namespace){

	var CharToKeycodeMap = {
		'h' : '72',
		'b' : '66'
	};

	var findKeycode = function(charValue){
		var lowerCaseChar = charValue.toLowerCase();
		return CharToKeycodeMap[lowerCaseChar] || charValue;
	};

	function VirtualKeyEvent(charValue, contextElement){
		this.__charValue = charValue;
		this.__keycode = findKeycode(charValue);
		this.__contextElement = contextElement || document;
	}

	var proto = VirtualKeyEvent.prototype;

	proto.__wrapEvent = function(type){
		var keyboardEvent = this.__contextElement.createEvent('KeyboardEvent');
		keyboardEvent.initKeyboardEvent(type, true, true, document.defaultView, this.__charValue, this.__keycode);
	}

	proto.triggerKeydown = function(){
		this.__contextElement.dispatchEvent(this.__wrapEvent('keydown'));
	}

	namespace.VirtualKeyEvent = VirtualKeyEvent;

})(window);


(function(namespace){
	
	function Iterator(data, isCircular){
		this.setData(data);
		this.__isCircular = isCircular;

		this.__index = -1;
	}

	var proto = Iterator.prototype;

	proto.setData = function(data){
		this.__data = data;
	}

	proto.reset = function(){
		this.__index = -1;
		this.__data = [];
	}

	proto.hasNext = function(){
		if(this.__isCircular){
			return true;
		} else {
			return this.__index < this.__data.length - 1;
		}
	}

	proto.hasPrevious = function(){
		if(this.__isCircular){
			return true;
		} else {
			return this.__index > 0;
		}
	}

	proto.next = function(){
		this.__increase();
		return this.__data[this.__index];
	}

	proto.previous = function(){
		this.__decrease();
		return this.__data[this.__index];
	}

	proto.__increase = function(){
		this.__index++;
		this.__validateIndex();
	}

	proto.__decrease = function(){
		this.__index--;
		this.__validateIndex();
	}

	proto.__validateIndex = function(){
		if(this.__isCircular){
			if(this.__index >= this.__data.length){
				this.__index = 0;
				return;
			}

			if(this.__index < 0){
				this.__index = this.__data.length - 1;
			}
		} else {
			if(this.__index >= this.__data.length){
				this.__index = this.__data.length - 1;
				return;
			}

			if(this.__index < 0){
				this.__index = 0;
			}
		}
	}

	namespace.Iterator = Iterator;

})(window);


(function(namespace){
	var VirtualKeyEvent = namespace.VirtualKeyEvent;
	var Iterator = namespace.Iterator;

	function AutomaticExecution(timeDuration){
		this.__timeDuration = timeDuration;

		this.__initializeKeys();
	}

	var proto = AutomaticExecution.prototype;

	proto.__initializeKeys = function(){
		var keys = [];
		
		keys.push(new VirtualKeyEvent('h'));
		keys.push(new VirtualKeyEvent('b'));

		this.__iterator = new Iterator(keys, true);
	}

	proto.start = function(){
		clearInterval(this.__intervalTimer);
		
		var self = this;
		this.__intervalTimer = setInterval(function(){
			self.__execute.apply(self);
		}, this.__timeDuration);
	}

	proto.__execute = function(){
		if(this.__iterator.hasNext()){
			var next = this.__iterator.next();
			next.triggerKeydown();
		}
	}

	proto.stop = function(){
		clearInterval(this.__intervalTimer);
	}

	namespace.automaticExecution = new AutomaticExecution(2000);
	namespace.automaticExecution.start();

})(window);