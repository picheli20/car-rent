describe('GeneratorFactory ', function(){

  beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback([{}]);
    });
    spyOn(console, "error");
  });

  it("should be to defined", function () {
    expect(CarsService).toBeDefined();
  });

  it("should trow a error if has no factory", function () {
    CarsService.factory = null;
    CarsService.load();
    expect(console.error).toHaveBeenCalled();
  });

  it("should load the itens normally", function () {
    CarsService.factory = CarFactory;
    CarsService.load(function(data){
      expect(data.length).toBe(1);
    });

    expect(console.error).not.toHaveBeenCalled();
  });
});