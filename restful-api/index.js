/**
* Primary file for the api
*
*/
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
//The servershould respond to all requests with a string
var server = http.createServer(function(req,res){



//get the url and parse it
var parsedUrl = url.parse(req.url,true);

//get the path
var path = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g,'');

//get the HTTP method
var method = req.method.toLowerCase();

//get the query string
var queryString = parsedUrl.query;

//get the payload if any
var decoder = new StringDecoder('utf-8');
var buffer = '';
//request object emits an event while data stream is being received
req.on('data',function(data){
  buffer += decoder.write(data);
});

//when data stream ends...
req.on('end',function(){
  buffer += decoder.end();

  console.log('\nPayload:\n ',buffer);

  //response can be added here since this is always called even when theres' //
  //payload
});

//get the request headers as an object
var headers = req.headers;
//send the response
  res.end('Hello World!\n');

//log the request
console.log('\nPath: \n' + trimmedPath);
console.log('\nQuery parameters:\n',queryString);
console.log('\nHeaders:\n',headers);
});

//start the server and listen to post 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000...");
})
