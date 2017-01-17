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

  it("should load the itens", function () {
    CarsService.load(function(data){
      expect(data.length).toBe(1);
    });

    expect(console.error).not.toHaveBeenCalled();
  });
});