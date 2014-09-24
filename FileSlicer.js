 

var FileSlicer = (function (config) {	

	if(!config) throw 'Configuração não é definida';

	var self = this;
	self.sliceSize = config.sliceSize || (1024*1024);
	self.currentSlice = 0;

	if(!config.socket) throw 'Referência WebSocket Não definida';
	if(!config.file) throw 'Arquivo não foi';

	self.socket = config.socket;
	self.file = config.file;

	this.send = function (handHead, handFilePart) {
		var file = self.file;
		if(!self.file) throw 'Arquivo não foi passado';

		self.slices = Math.ceil(self.file.size / self.sliceSize);

		var getNextSlice = function() {
	        var start = self.currentSlice * self.sliceSize;
	        var end = Math.min((self.currentSlice+1) * self.sliceSize, self.file.size);
	        ++self.currentSlice;

	        return self.file.slice(start, end);
	    };

	    self.socket.send(handHead(self.file)); // see below

	    for(var i = 0; i < self.slices; ++i) {
            self.socket.send(handFilePart(getNextSlice())); // see below
        }
	};

	this.pad = function(num, size) {
	    var s = "000000000000000000000000000000" + num;
	    return s.substr(s.length-size);	
	};

});




//TEST

/*

var socket = new WebSocket('ws://localhost:3009');

socket.onopen = function(){
	console.log('omnpen')
};

var a = new FileSlicer({
	'socket' : socket
});
a.setFile('testeAAA');


var b = new FileSlicer({
	'socket' : socket
});
b.setFile('testeBBB');

*/


