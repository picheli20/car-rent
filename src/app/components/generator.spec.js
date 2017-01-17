describe('GeneratorFactory ', function(){

  GeneratorFactory.register('test', '');

	beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback('{testing} ');
    });

    spyOn($.fn, 'html');
    spyOn(console, 'error');
	});

  it("should be to parse the correct template", function () {
    GeneratorFactory.renderize('test', { testing : 'foo' }, '#mainApp');
    expect(GeneratorFactory.registry['test'].lastRender).toEqual('foo ');
    expect(GeneratorFactory.registry['test'].template).toEqual('{testing} ');
    expect($('#mainApp').html).toHaveBeenCalled();
  });

  it("should be renderize multiple element", function () {
    var tests = [
      { testing : 'foo' },
      { testing : 'bar' }
    ]
    var template = GeneratorFactory.renderize('test', tests, '#mainApp');
    expect(template).toEqual('foo bar ');
  });

  it("should renderize number", function () {
    var template = GeneratorFactory.renderize('test', { testing : 2 }, '#mainApp');
    expect(template).toEqual('2 ');
  });

  it("should renderize boolean", function () {
    var template = GeneratorFactory.renderize('test', { testing : true }, '#mainApp');
    expect(template).toEqual('true ');
  });

  it("should renderize object", function () {
    $.get.isSpy = false;
    $.get = function(url, callback){ callback('{testing.a} '); };
    
    var template = GeneratorFactory.renderize('test', { testing : { a : 1} }, '#mainApp');
    expect(template).toEqual('1 ');
  });

  it("should not renderize without a selected", function () {
    GeneratorFactory.renderize('test', { testing : {} });
    expect($('#mainApp').html).not.toHaveBeenCalled();
  });

  it("should update the template", function () {

    var tests = [
      { testing : 'foo' },
      { testing : 'bar' }
    ]
    var template = GeneratorFactory.renderize('test', tests, '#mainApp');
    expect(template).toEqual('foo bar ');
    self.registry['test'].data[0].testing = 'bar';
    self.registry['test'].data[1].testing = 'foo';
    template = GeneratorFactory.renderize('test');
    expect(template).toEqual('foo bar ');
  });
});