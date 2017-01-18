describe('Index Test', function(){
  beforeEach(function () {
    spyOn(app, "reload");
    spyOn($.fn, "toggleClass");
    spyOn(app, "processPath");
    spyOn(GeneratorFactory, "remove");
    $.get = function(){};
  });

  it('should be initialized', function(){
    app.init();
  });

  it('should go to a page', function(){
    var url = '#/test/test a';
    app.goTo(url);
    expect(window.location.hash).toBe(encodeURI(url));
  });

  it('should group by vendor', function(){
    app.groupByVendor();
    expect($.fn.toggleClass).toHaveBeenCalled();
    expect(app.processPath).toHaveBeenCalled();
  });
});