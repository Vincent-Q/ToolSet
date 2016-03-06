/**
 * @class VirtualKeyEvent
 * @author Vincent Qiu
 * @version 1.0.0
 */

(function(namespace){

	var CharToKeycodeMap = {
		'h' : 72,
		'b' : 66,
		'up': 38,
		'down': 40
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
		keyboardEvent.initKeyboardEvent(type, true, true, document.defaultView, this.__charValue, this.__keycode, null, null, 10);
		keyboardEvent.metaKey = true;
		return keyboardEvent;
	}

	proto.triggerKeydown = function(){
		this.__contextElement.dispatchEvent(this.__wrapEvent('keydown'));
	}

	namespace.VirtualKeyEvent = VirtualKeyEvent;

})(window);