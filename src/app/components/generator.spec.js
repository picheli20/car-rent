describe('GeneratorFactory ', function(){

	beforeEach(function () {
    $.get = function(){};
		spyOn($, "get").and.callFake(function(url, callback){
			callback('{testing}');
		});
	});

  it("should be to parse the correct template", function () {
    var test = new GeneratorFactory('', { testing : 'tested' }, '#mainApp');
    expect(test.template).toEqual('{testing}');
    expect(test.renderize()).toEqual('tested');
  });

  it("should be renderize multiple element", function () {
    var tests = [
      { testing : 'tested' },
      { testing : 'tested2' }
    ]
    var test = new GeneratorFactory('', tests, '#mainApp');
    expect(test.template).toEqual('{testing}');
    expect(test.renderize()).toEqual('testedtested2');
  });
});