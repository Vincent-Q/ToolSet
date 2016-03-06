syncmod.define('util.Type', function(require){
	function Type(){
		throw 'util.Type cannot be instantiated!';
	}

	Type.isArray = function(array){
		return typeof array === 'object' && array.constructor === Array;
	}

	Type.isObject = function(object){
		return !Type.isArray(object) && typeof object === 'object';
	}

	Type.isFunction = function(func){
		return typeof func === 'function';
	}

	Type.isNumber = function(number){
		return typeof number === 'number';
	}

	Type.isBoolean = function(bool){
		return typeof bool === 'boolean';
	}

	Type.isUndefined = function(undef){
		return typeof undef === 'undefined';
	}

	return Type;
});