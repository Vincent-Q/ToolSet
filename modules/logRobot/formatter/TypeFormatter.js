syncmod.define('logRobot.formatter.TypeFormatter', function(require){
	var Type = require('util.Type');

	function TypeFormatter(){}

	var proto = TypeFormatter.prototype;

	proto.__formatNumber = function(argument){
		return argument;
	}

	proto.__formatBoolean = function(argument){
		return argument;
	}

	proto.__formatUndefined = function(argument){
		return '#' + argument + '#';
	}

	proto.__formatFunction = function(argument){
		return '#Function#';
	}

	proto.__formatObject = function(argument){
		var formattedStr = '{\n';
		
		for(var key in argument){
			formattedStr += '\t\t' + key + ': ' + this.formatValue(argument[key]) + ',\n';			
		}

		return formattedStr + '}';
	}

	proto.__formatArray = function(argument){
		var formattedStr = '[';

		var l = argument.length;
		for(var i=0; i<l; i++){
			if(i === 0){
				formattedStr += this.formatValue(argument[i]);
			} else {
				formattedStr += ', ' + this.formatValue(argument[i]);
			}
		}

		return formattedStr + ']';
	}

	proto.formatValue = function(value){
		if(Type.isFunction(value)){
			return this.__formatFunction(value);
		} else if(Type.isUndefined(value)){
			return this.__formatUndefined(value);
		} else if(Type.isNumber(value)){
			return this.__formatNumber(value);
		} else if(Type.isBoolean(value)){
			return this.__formatBoolean(value);
		} else if(Type.isArray(value)){
			return this.__formatArray(value);
		} else if(Type.isObject(value)){
			return this.__formatObject(value);
		} else {
			return value;
		}
	}

	return new TypeFormatter();
});