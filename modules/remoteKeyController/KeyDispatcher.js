syncmod.define('remoteKeyController.KeyDispatcher', function(require){
	var remoteKeyMap = require('remoteKeyController.keyMap.RemoteKeyMap');
	var keyboardKeyMap = require('remoteKeyController.keyMap.KeyboardKeyMap');

	var Subject = require('utils.observer.Subject');

	function KeyDispatcher(){
		this.__subject = new Subject();
	}

	var proto = KeyDispatcher.prototype;

	/*
	 =================================================================================
	 ============== Begin: delegate subject functions to a subject object ============
	 =================================================================================
	 */
	
	proto.registerKeyHandler = function(keyHandler){
		this.__subject.attach(keyHandler);
	}

	proto.unregisterKeyHandler = function(keyHandler){
		this.__subject.detach(keyHandler);
	}

	proto.handleKey = function(event){
		var keyCode = event.which || event.keyCode || event.keyLocation;
		var keyName = remoteKeyMap[keyCode] || keyboardKeyMap[keyCode];

		if(!keyName){
			throw new Error('Key code [' + keyCode + '] is not defined!');
		}

		this.__subject.notify(keyName);
	}

	/*
	 =================================================================================
	 ============== End: delegate subject functions to a subject object ============
	 =================================================================================
	 */
	
	return new KeyDispatcher();
});