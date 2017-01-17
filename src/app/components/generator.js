(function(global) {
  'use strict';
  function GeneratorFactory () {
    this.registry = {};
  }

  GeneratorFactory.prototype.register = function(name, url){
    var self = this;

    self.registry[name] = self.registry[name] || {
      templatePath : url,
      template : null,
      lastRender : null,
      callbacks : [],
      data : [],
      elSelector : [],
      loaded: false
    };

    self.loadTemplate(name);
  };

  GeneratorFactory.prototype.loadTemplate = function(name, reload){
    var self = this;
    if(self.registry[name].template && !reload){
      return;
    }

    $.get(self.registry[name].templatePath, function(data){
      self.registry[name].template = data;
      self.registry[name].loaded = true;
      self.registry[name].callbacks.map(function(callback){
        callback();
      });
      self.registry[name].callbacks = [];
    });
  };

  GeneratorFactory.prototype.renderize = function(name, data, elSelector) {
    var self = this;
    var call = processOneTemplate;


    if(!self.registry[name]){
      console.error('The ' + name + ' is not registred! Please first call GeneratorFactory.register(<name>, <url>)');
      return;
    }

    // just renderize with the setted value if we don't receive it.

    self.registry[name].data = data || self.registry[name].data || null;
    self.registry[name].elSelector = elSelector || self.registry[name].elSelector || null;

    // if is not loaded yet, add to the queue
    if(!self.registry[name].loaded){
      self.registry[name].callbacks.push(function(){ self.renderize(name, data, elSelector) });
      return;
    }

    if(self.registry[name].data.constructor === Array){
      call = processMultipleTemplate;
    }

    self.registry[name].lastRender = call(self.registry[name].data, self.registry[name].template);
    
    if(self.registry[name].elSelector){
      $(self.registry[name].elSelector).html(self.registry[name].lastRender);
    }

    return self.registry[name].lastRender;
  };

  function processMultipleTemplate(data, template){
    var finalTemplate = '';
    data.map(function(item){
      finalTemplate += processOneTemplate(item, template);
    });

    return finalTemplate;
  }

  function processOneTemplate(data, template){
    var layout = template.replace(/{([^{}]*)}/g, function (a, b) {
        var attrTree = b.split('.');
        var r = data;
        attrTree.map(function (attr) {
          r = r[attr];
        });

        return r;
    });

    return layout;
  }

  global.GeneratorFactory = new GeneratorFactory();
})(window);