syncmod.define('logRobot.LogSuit', function(require){
	var LogPrinter = require('logRobot.LogPrinter');

	function LogSuit(){
		this.__logPrinter = new LogPrinter();
	}

	var proto = LogSuit.prototype;

	proto.wearSuit = function(){
		var property;
		for(var key in this){
			property = this[key];

			if(typeof property === "function"){
				this[key] = function(){
					this.__logPrinter.printBegin(key, arguments);

					var result = property.apply(this, arguments);

					this.__logPrinter.printEnd(key, result);

					return result;
				}
			}
		}
	}

	return LogSuit;
});