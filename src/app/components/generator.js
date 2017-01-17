(function(global) {
  function GeneratorFactory (templatePath, data, elSelector) {
    var self = this;
    self.data = data;
    self.selector = elSelector;
    self.template = '';
    self.renderized = '';
    self.templatePath = templatePath;
    self.loadTemplate();
  }

  GeneratorFactory.prototype.renderize = function() {
    var self = this;
    var call = renderizeOne;
    if(self.data.constructor === Array){
      call = renderizeMultiple;
    }

    return call(self.data, self.template);
  };

  GeneratorFactory.prototype.loadTemplate = function(){
    var self = this;
    $.get(self.templatePath, function(data){
      self.template = data;
      self.renderized = self.renderize();
      if(self.selector) $(self.selector).html(self.renderized);
    });
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