describe('GeneratorFactory ', function(){

  GeneratorFactory.register('test', '/test/');

	beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback('{testing} ');
    });

    spyOn($.fn, 'html');
    spyOn(console, 'error');
	});

  it("should register the test", function () {
    expect(GeneratorFactory.registry['test']).toBeDefined();
  });
  it("should get the template", function () {
    GeneratorFactory.loadTemplate('test')
    expect(GeneratorFactory.registry['test']).toBeDefined();
  });

  it("should be to parse the correct template", function () {
    GeneratorFactory.renderize('test', '#mainApp', { testing : 'foo' });
    expect(GeneratorFactory.registry['test'].lastRender).toEqual('foo ');
    expect(GeneratorFactory.registry['test'].template).toEqual('{testing} ');
    expect($('#mainApp').html).toHaveBeenCalled();
  });

  it("should be renderize multiple element", function () {
    var tests = [
      { testing : 'foo' },
      { testing : 'bar' }
    ]
    var template = GeneratorFactory.renderize('test', '#mainApp', tests);
    expect(template).toEqual('foo bar ');
  });

  it("should renderize number", function () {
    var template = GeneratorFactory.renderize('test', '#mainApp', { testing : 2 });
    expect(template).toEqual('2 ');
  });

  it("should renderize boolean", function () {
    var template = GeneratorFactory.renderize('test', '#mainApp', { testing : true });
    expect(template).toEqual('true ');
  });

  it("should renderize object", function () {
    $.get.isSpy = false;
    $.get = function(url, callback){ callback('{testing.a} '); };
    GeneratorFactory.loadTemplate('test', true)
    
    var template = GeneratorFactory.renderize('test', '#mainApp', { testing : { a : 1} });
    expect(template).toEqual('1 ');
  });
});