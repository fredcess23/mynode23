/*
	FORMA 1
	
var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hola Mundo");
  response.end();
}).listen(8888);
*/
/*
	FORMA 2
	
var http = require("http");
function onRequest(request, response) {
  console.log("Peticion Recibida.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hola Mundo");
  response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Servidor Iniciado.");
*/
/*
	FORMA 3 con router
	
var http = require("http");
var url = require("url");

function iniciar(route,handle) {

  function onRequest(request, response) {

  	var pathname = url.parse(request.url).pathname;
    console.log("Petición para " + pathname + " recibida. ");
    
    //route(handle,pathname);
    
    response.writeHead(200, {"Content-Type": "text/html"});
    var content = route(handle,pathname);
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;
*/


/*
//Otra forma de crear el server
var http = require('http');
var server = http.createServer();
function control(petic, resp) {
	resp.writeHead(200, {'content-type': 'text/plain'});
	resp.write('Hola, Mundo!');
	resp.end();
}
server.on('request', control);
server.listen(8080);

*/

var http = require("http");
var url = require("url");

function iniciar(route, handle) {
    
  function onRequest(request, response) {
    
    var dataPosteada = "";

    var pathname = url.parse(request.url).pathname;
    console.log("Peticion para " + pathname + " recibida.");

    request.setEncoding("utf8");

    request.addListener("data", function(trozoPosteado) {
      dataPosteada += trozoPosteado;
      console.log("Recibido trozo POST '" + trozoPosteado + "'.");
    });
    
    
    request.addListener("end", function() {
        (handle, pathname, response, dataPosteada);
    });

    //route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;


