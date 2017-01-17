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
    var call = processOneTemplate;
    if(self.data.constructor === Array){
      call = processMultipleTemplate;
    }

    var renderizedTemplate = call(self.data, self.template);
    
    if(self.selector){
      $(self.selector).html(renderizedTemplate);
    }

    return renderizedTemplate;
  };

  GeneratorFactory.prototype.loadTemplate = function(){
    var self = this;
    $.get(self.templatePath, function(data){
      self.template = data;
      self.renderize();
    });
  };

  function processMultipleTemplate(data, template){
    var finalTemplate = '';
    data.map(function(item){
      finalTemplate += processOneTemplate(item, template);
    });

    return finalTemplate;
  }

  function processOneTemplate(data, template){
    return template.replace(/{([^{}]*)}/g, function (a, b) {
        var r = data[b];
        return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : a;
    });
  }

  global.GeneratorFactory = GeneratorFactory;
})(window);