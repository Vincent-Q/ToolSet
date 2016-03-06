syncmod.define('logRobot.logPrinter.LogPrinter', function(){
	var levelMap = {
		'error':'0',
		'warn':'1',
		'info':'2',
		'debug':'3'
	};

	var LogPrinter = function(fileName, level){
		this.__fileName = fileName;
		this.__level = level || 'error';
	}

	LogPrinter.__level = 'error';

	LogPrinter.setLevel = function(level){
		LogPrinter.__level = level;
	}

	var proto = LogPrinter.prototype;

	proto.__isAccepted = function(level, kpiPath){
		var configuredLevel = this.__level || LogPrinter.__level;
		return levelMap[level] <= levelMap[configuredLevel] || kpiPath === 'kpi';
	}

	proto.debug = function(message, kpiPath){
		if(!this.__isAccepted('debug', kpiPath)){
			return;
		}

		console.debug(message);
	}

	return LogPrinter;
});