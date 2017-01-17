describe('GeneratorFactory ', function(){

	beforeEach(function () {
		spyOn($, "get").and.callFake(function(url, callback){
			callback('{test}');
		});
	});

	it("should be to renderize the correct template", function () {
		var test = new GeneratorFactory('', { test : 'tested' }, '#mainApp');
		expect(test.template).toEqual('{test}');
		expect(test.renderize()).toEqual('tested');
	});
});