syncmod.define('utils.observer.Subject', function(){
	function Subject(){
		this.__observerList = [];
	};

	var proto = Subject.prototype;

	proto.attach = function(observer){
		if(!this.__hasObserver(observer)){
			this.__observerList.push(observer);
		}
	}

	proto.detach = function(observer){
		var index = this.__findIndexOf(observer);
		if(-1 !== index){
			this.__observerList.splice(index, 1);
		}
	}

	proto.notify = function(){
		var observer = null;
		for(var i=0; i<this.__observerList.length; i++){
			observer = this.__observerList[i];
			if(observer && observer.update){
				observer.update.apply(observer, arguments);
			}
		}
	}

	proto.__hasObserver = function(observer){
		return -1 !== this.__findIndexOf(observer);
	}

	proto.__findIndexOf = function(observer){
		for(var i=0; i<this.__observerList.length; i++){
			if(this.__observerList[i] === observer){
				return i;
			}
		}

		return -1;
	}

	return Subject;
});