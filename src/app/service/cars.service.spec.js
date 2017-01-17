describe('GeneratorFactory ', function(){

  beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback('{testing} ');
    });
  });

  it("should be to defined", function () {
    expect(Cars).toBeDefined();
  });
});