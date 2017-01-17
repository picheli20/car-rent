describe('Index Test', function(){

  it('should be tested', function(){
    app.init();
    expect(CarFactory).toBeDefined();
    expect(WrapperFactory).toBeDefined();
  });
});