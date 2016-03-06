syncmod.define('logRobot.LogSnapshot', function(require){
	var UUID = require('util.UUID');
	var logFormatter = require('logRobot.formatter.TypeFormatter');

	function LogSnapshot(){
		this.__snapshots = {};
	}

	var proto = LogSnapshot.prototype;

	proto.takeSnapshot = function(obj){
		var uniqueId = UUID.createId();
		this.__snapshots[uniqueId] = logFormatter.formatValue(obj);

		return uniqueId;
	}

	return new LogSnapshot();
});