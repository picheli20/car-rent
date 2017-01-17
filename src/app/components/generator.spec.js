describe('GeneratorFactory ', function(){

	beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback('{testing} ');
    });

    spyOn($.fn, 'html');
	});

  it("should be to parse the correct template", function () {
    var test = new GeneratorFactory('', { testing : 'tested' }, '#mainApp');
    expect(test.template).toEqual('{testing} ');
    expect(test.renderize()).toEqual('tested ');
    expect($('#mainApp').html).toHaveBeenCalled();
  });

  it("should be renderize multiple element", function () {
    var tests = [
      { testing : 'tested' },
      { testing : 'tested2' }
    ]
    var test = new GeneratorFactory('', tests, '#mainApp');
    expect(test.renderize()).toEqual('tested tested2 ');
  });

  it("should renderize number", function () {
    var test = new GeneratorFactory('', { testing : 2 }, '#mainApp');
    expect(test.renderize()).toEqual('2 ');
  });

  it("should renderize boolean", function () {
    var test = new GeneratorFactory('', { testing : true }, '#mainApp');
    expect(test.renderize()).toEqual('true ');
  });

  it("should not renderize object", function () {
    var test = new GeneratorFactory('', { testing : {} }, '#mainApp');
    expect(test.renderize()).toEqual('{testing} ');
  });

  it("should not renderize without a selected", function () {
    var test = new GeneratorFactory('', { testing : {} });
    expect($('#mainApp').html).not.toHaveBeenCalled();
  });
});