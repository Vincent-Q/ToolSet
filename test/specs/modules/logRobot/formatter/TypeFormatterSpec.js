describe('Test behaviors of TypeFormatterSpec.js', function(){
	var typeFormatter;

	beforeEach(function(){
		typeFormatter = syncmod.use('logRobot.formatter.TypeFormatter');
	});

	describe('formatValue -> check different type for this method', function(){
		it('format array', function(){
			var array = [1, 2, 3];

			var formattedResult = typeFormatter.formatValue(array);

			expect(formattedResult).toEqual('[1, 2, 3]');
		});

		it('format function', function(){
			function func(){};

			var formattedResult = typeFormatter.formatValue(func);

			expect(formattedResult).toEqual('#Function#');
		});

		it('format undefined', function(){
			var formattedResult = typeFormatter.formatValue(undefined);

			expect(formattedResult).toEqual('#undefined#');
		});

		it('format object', function(){
			var obj = {
				'a':'1',
				'b':function(){
					return 0;
				}
			};

			var formattedResult = typeFormatter.formatValue(obj);

			expect(formattedResult).toEqual('{\n\t\ta: 1,\n\t\tb: #Function#,\n}');
		});
	});

});