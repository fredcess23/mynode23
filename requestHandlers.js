/*
function iniciar() {
  console.log("Manipulador de petición 'iniciar' ha sido llamado.");

function sleep(milliSeconds) {  
    // obten la hora actual
    var startTime = new Date().getTime();
    // atasca la cpu
    while (new Date().getTime() < startTime + milliSeconds); 
  }

  sleep(10000)
  return "Hola Iniciar";
}

function subir() {
  console.log("Manipulador de petición 'subir' ha sido llamado.");
  return "Hola Subir";
}

exports.iniciar = iniciar;
exports.subir = subir;
*/

/*
var exec = require("child_process").exec;

function iniciar(response) {
  console.log("Manipulador de petición 'iniciar' fue llamado.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(stdout);
    response.end();
  });
}

function subir(response) {
  console.log("Manipulador de petición 'subir' fue llamado.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hola Subir");
  response.end();
}
*/
var querystring = require("querystring");

function iniciar(response, postData) {
  console.log("Manipulador de peticiones 'iniciar' fue llamado.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/subir" method="post">'+
    '<textarea name="text" rows="5" cols="60"></textarea>'+
    '<input type="submit" value="Enviar texto" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function subir(response, dataPosteada) {
  console.log("Manipulador de Peticion 'subir' fue llamado.");
  response.writeHead(200, {"Content-Type": "text/html"});
  //response.write("Tu enviaste: " + dataPosteada);

  response.write("Tu enviaste el texto: : " + querystring.parse(dataPosteada)["text"]);

  response.end();
}

exports.iniciar = iniciar;
exports.subir = subir;
