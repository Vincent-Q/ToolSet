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