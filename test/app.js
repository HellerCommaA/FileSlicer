var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8083});


var fs = require("fs");

wss.on('connection', function(ws) {

	var name, qtdeSlice, size;

    ws.on('message', function(message) {

    		if(!name){
    			name = message.substr(30, message.length);
    			qtdeSlice = message.substr(0, 18);
    			size = message.substr(18, 30);

    			console.log(name, qtdeSlice, size);    			
    		}
    		
    		console.log(message);   	
	       
    	
    });
});