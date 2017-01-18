describe('Util ', function(){
  var mock;
  beforeEach(function () {
    /*
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback(jsonResponse);
    });
    spyOn(console, "error");
    spyOn(Util, "sort");*/

    mock = [
      {
        id : 1,
        a : 1,
        b : {
          a : 2,
          b : '2'
        }
      },
      {
        id : 2,
        a : 3,
        b : {
          a : 1,
          b : '1'
        }
      },
      {
        id : 3,
        a : 3,
        b : {
          a : 10,
          b : '10'
        }
      }
    ];
  });

  it("should be defined", function () {
    expect(Util).toBeDefined();
  });

  it("should sort a simple array", function () {
    var sortedList = Util.sort(mock, 'a');
    expect(sortedList[0].id).toBe(1);
  });

  it("should sort by object attr", function () {
    var sortedList = Util.sort(mock, 'b.a');
    expect(sortedList[0].id).toBe(2);
    expect(sortedList[1].id).toBe(1);
  });

  it("should sort asc by object attr", function () {
    var sortedList = Util.sort(mock, 'b.a:asc');
    expect(sortedList[2].id).toBe(2);
    expect(sortedList[1].id).toBe(1);
  });

  it("should sort reversed by object attr", function () {
    var sortedList = Util.sort(mock, 'b.a', true);
    expect(sortedList[2].id).toBe(2);
    expect(sortedList[1].id).toBe(1);
  });

  it("should sort a string", function () {
    var sortedList = Util.sort(mock, 'b.b:string');
    expect(sortedList[0].id).toBe(2);
    expect(sortedList[1].id).toBe(3);
  });

  it("should get the obj attr", function () {
    var res = Util.getAttrFromArr('b.b', mock[0]);
    var res2 = Util.getAttrFromArr(['b', 'b'], mock[1]);
    expect(res).toBe('2');
    expect(res2).toBe('1');
  });

  it("should not get a not defined attr", function () {
    var res = Util.getAttrFromArr('b.c', mock[0]);
    expect(res).toBe(undefined);
  });

  it("should not get a not defined obj", function () {
    var res = Util.getAttrFromArr('b.c');
    expect(res).toBe(undefined);
  });
});