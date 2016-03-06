describe('Test behaviors of FuncExecutionFormatterSpec', function(){
	var funcExecutionFormatter;

	var functionBeginRegExp = 'Begin function doA\\(1, <[0-9A-Z]{8}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{12}>, 2\\)';
	var functionEndRegExp = 'End function doA\\(<[0-9A-Z]{8}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{12}>\\)';

	beforeEach(function(){
		funcExecutionFormatter = syncmod.use('logRobot.formatter.FuncExecutionFormatter');
	});

	describe('formatBegin -> check different arguments of function', function(){
		it('arguments only contain pure number', function(){
			var formattedResult = funcExecutionFormatter.formatBegin('doA', [1, 2, 3]);
			expect(formattedResult).toEqual('Begin function doA(1, 2, 3)');
		});

		it('arguments contain object', function(){
			var formattedResult = funcExecutionFormatter.formatBegin('doA', [1, {'a':'a', 'b':'b'}, 2]);
			expect(formattedResult).toEqual(jasmine.stringMatching(functionBeginRegExp));
		});

		it('arguments contain array', function(){
			var formattedResult = funcExecutionFormatter.formatBegin('doA', [1, ['a', 'b'], 2]);
			expect(formattedResult).toEqual(jasmine.stringMatching(functionBeginRegExp));
		});
	});

	describe('formatEnd -> check different returned results of function', function(){
		it('returned result is array', function(){
			var formattedResult = funcExecutionFormatter.formatEnd('doA', [1, 2, 3]);
			expect(formattedResult).toEqual(jasmine.stringMatching(functionEndRegExp));
		});

		it('returned result is object', function(){
			var formattedResult = funcExecutionFormatter.formatEnd('doA', {'a':'a', 'b':'b'});
			expect(formattedResult).toEqual(jasmine.stringMatching(functionEndRegExp));
		});

		it('returned result is number', function(){
			var formattedResult = funcExecutionFormatter.formatEnd('doA', 1);
			expect(formattedResult).toEqual('End function doA(1)');
		});

		it('returned result is undefined', function(){
			var formattedResult = funcExecutionFormatter.formatEnd('doA');
			expect(formattedResult).toEqual('End function doA(#undefined#)');
		});
	});
});