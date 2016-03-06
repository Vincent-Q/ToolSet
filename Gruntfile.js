module.exports = function(grunt){
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	concat: {
    		options: {
    			separator: '\n'
    		},
    		dist: {
    			src: ['modules/remoteKeyController/keyMap/KeyboardKeyMap.js', 'modules/remoteKeyController/keyMap/RemoteKeyMap.js', 
    			'utils/observer/Subject.js', 'modules/remoteKeyController/KeyDispatcher.js', 'modules/ruler/DistanceRuler.js', 'modules/ruler/KerningRuler.js',
    			'modules/remoteKeyController/KeyController.js', 'modules/main.js'],
    			dest: 'dest/ToolSet.js'
    		}
	    }
  	});

  	grunt.loadNpmTasks('grunt-contrib-concat');

  	grunt.registerTask('default', ['concat']);
}