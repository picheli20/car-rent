describe('GeneratorFactory ', function(){

	beforeEach(function () {
		spyOn($, "get").and.callFake(function(url, callback){
			callback('{testing}');
		});
	});

  it("should be to parse the correct template", function () {
    var test = new GeneratorFactory('', { testing : 'tested' }, '#mainApp');
    expect(test.template).toEqual('{testing}');
    expect(test.renderize()).toEqual('tested');
  });
});