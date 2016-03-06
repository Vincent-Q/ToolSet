syncmod.define('ToolSet', function(){
	window.toolSet = {
		'distanceRuler': syncmod.use('ruler.DistanceRuler'),
		'kerningRuler': syncmod.use('ruler.KerningRuler'),
		'keyController': syncmod.use('remoteKeyController.KeyController')
	};
});