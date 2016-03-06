syncmod.define('remoteKeyController.KeyController', function(require){
	var pageKeyHandler = null;
	var keyDispatcher = require('remoteKeyController.KeyDispatcher');
	var distanceRuler = require('ruler.DistanceRuler');
	var kerningRuler = require('ruler.KerningRuler');

	var keyOwner = 'Page';

	var loadKeyController = function(){
		pageKeyHandler = window.onkeydown;

		window.onkeydown = function(event){
			if(keyOwner === 'ToolSet'){
				keyDispatcher.handleKey(event);
			} else {
				return pageKeyHandler.apply(null, arguments);
			}
		}
	}

	loadKeyController();

	var switchKeyOwner = function(){
		if(keyOwner === 'Page'){
			keyOwner = 'ToolSet';
		} else {
			keyOwner = 'Page';
		}
	}

	var currentTool = null;

	var loadDistanceRuler = function(){
		if (currentTool){
			currentTool.unload();
			keyDispatcher.unregisterKeyHandler(currentTool);
		}

		currentTool = distanceRuler;

		currentTool.load();
		keyDispatcher.registerKeyHandler(currentTool);
	}

	var loadKerningRuler = function(){
		if (currentTool){
			currentTool.unload();
			keyDispatcher.unregisterKeyHandler(currentTool);
		}

		currentTool = kerningRuler;

		currentTool.load();
		keyDispatcher.registerKeyHandler(currentTool);
	}

	return {
		'loadDistanceRuler': loadDistanceRuler,
		'loadKerningRuler': loadKerningRuler,
		'switchKeyOwner': switchKeyOwner
	};
});