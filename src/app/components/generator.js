(function(global) {
  function GeneratorFactory (url, data, elSelector) {
    var self = this;
    self.data = data;
    self.selector = elSelector;
    $.get(url, function(data){
      self.template = data;
      if(elSelector) $(elSelector).html(self.renderize());
    });
  }

  GeneratorFactory.template = '';

  GeneratorFactory.prototype.renderize = function() {
    var self = this;
    var call = renderizeOne;
    if(self.data.constructor === Array){
      call = renderizeMultiple;
    }

    return call(self.data, self.template);
  };

  function renderizeMultiple(data, template){
    var finalTemplate = '';
    data.map(function(item){
      finalTemplate += renderizeOne(item, template);
    });

    return finalTemplate;
  }

  function renderizeOne(data, template){
    return template.replace(/{([^{}]*)}/g, function (a, b) {
        var r = data[b];
        return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : a;
    });
  }

  global.GeneratorFactory = GeneratorFactory;
})(window);