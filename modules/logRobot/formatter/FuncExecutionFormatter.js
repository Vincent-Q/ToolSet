syncmod.define('logRobot.formatter.FuncExecutionFormatter', function(require){

	var Type = require('util.Type');
	var typeFormatter = require('logRobot.formatter.TypeFormatter');
	var logSnapshot = require('logRobot.LogSnapshot');

	function FuncExecutionFormatter(){}

	var proto = FuncExecutionFormatter.prototype;

	proto.formatBegin = function(funcName, args){
		var message = 'Begin function ' + funcName + '(';
		
		var l = args.length;
		for(var i=0; i<l; i++){
			if(i!==0){
				message += ', ';
			}

			message += this.__formatExecutionValue(args[i]);
		}

		message += ')';

		return message;
	}

	proto.formatEnd = function(funcName, result){
		var message = 'End function ' + funcName + '(' + this.__formatExecutionValue(result) + ')';
		return message;
	}

	proto.__formatExecutionValue = function(value){
		if(Type.isArray(value) || Type.isObject(value)){
			var snapshotId = logSnapshot.takeSnapshot(value);
			return '<' + snapshotId + '>';
		} else {
			return typeFormatter.formatValue(value);
		}
	}

	return new FuncExecutionFormatter();
});