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