describe('CarsService ', function(){

  var jsonResponse = [
    {
      "VehAvailRSCore": {
        "VehRentalCore": {
          "@PickUpDateTime": "2014-09-22T10:00:00Z",
          "@ReturnDateTime": "2014-10-06T10:00:00Z",
          "PickUpLocation": {
            "@Name": "Las Vegas - Airport"
          },
          "ReturnLocation": {
            "@Name": "Las Vegas - Airport"
          }
        },
        "VehVendorAvails": [
          {
            "Vendor": {
              "@Code": "125",
              "@Name": "ALAMO"
            },
            "VehAvails": [
              {
                "@Status": "Available",
                "Vehicle": {
                  "@AirConditionInd": "true",
                  "@TransmissionType": "Automatic",
                  "@FuelType": "Petrol",
                  "@DriveType": "Unspecified",
                  "@PassengerQuantity": "5+",
                  "@BaggageQuantity": "3",
                  "@Code": "IFAR2",
                  "@CodeContext": "CARTRAWLER",
                  "@DoorCount": "5",                               
                  "VehMakeModel": {
                    "@Name": "Toyota Rav4 or similar"
                  },
                  "PictureURL": "https://cdn.cartrawler.com/otaimages/toyota/rav_4_nologo.jpg"
                },                
                "TotalCharge": {
                  "@RateTotalAmount": "999.99",
                  "@EstimatedTotalAmount": "878.98",
                  "@CurrencyCode": "CAD"
                }
              },
              {
                "@Status": "Available",
                "Vehicle": {
                  "@AirConditionInd": "true",
                  "@TransmissionType": "Automatic",
                  "@FuelType": "Petrol",
                  "@DriveType": "Unspecified",
                  "@PassengerQuantity": "5+",
                  "@BaggageQuantity": "3",
                  "@Code": "IFAR",
                  "@CodeContext": "CARTRAWLER",
                  "@DoorCount": "5",                               
                  "VehMakeModel": {
                    "@Name": "Toyota Rav4 or similar"
                  },
                  "PictureURL": "https://cdn.cartrawler.com/otaimages/toyota/rav_4_nologo.jpg"
                },                
                "TotalCharge": {
                  "@RateTotalAmount": "878.98",
                  "@EstimatedTotalAmount": "878.98",
                  "@CurrencyCode": "CAD"
                }
              }
            ]
          }
        ]
      }
    }
  ];
  beforeEach(function () {
    $.get = function(){};
    spyOn($, "get").and.callFake(function(url, callback){
      callback(jsonResponse);
    });
    spyOn(console, "error");
    spyOn(Util, "sort");
  });

  it("should be to defined", function () {
    expect(CarsService).toBeDefined();
  });

  it("should load the itens", function () {
    CarsService.load(function(data){
      expect(data.length).toBe(1);
    });

    expect(console.error).not.toHaveBeenCalled();
    expect($.get).toHaveBeenCalled();
  });

  it("should load the cached values", function () {
    CarsService.load(function(){ });

    expect($.get).not.toHaveBeenCalled();
  });

  it("should order the cars by price", function () {
    CarsService.load(function(){});

    expect(Util.sort).toHaveBeenCalled();
  });
/*
  it("should get one cars", function () {
    console.log('loading...')
    CarsService.load(function(data){
      console.log();
    }, { code : 'IFAR', name : 'Toyota Rav4 or similar'});

    expect(Util.sort).toHaveBeenCalled();
  });
  */
});