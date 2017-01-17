function GeneratorFactory (url, obj, elSelector) {
	var self = this;
	self.data = obj;
	$.get(url, function(data){
		self.template = data;
		if(elSelector) $(elSelector).html(self.renderize());
	});
}

GeneratorFactory.template = '';

GeneratorFactory.prototype.renderize = function() {
	var self = this;
    return self.template.replace(/{([^{}]*)}/g, function (a, b) {
        var r = self.data[b];
        return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : a;
    });
};