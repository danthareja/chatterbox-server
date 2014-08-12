/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require('url');
// var queryString = require( "querystring" );

var testObj = {
  createdAt: new Date(),
  objectId: "1",
  roomname: "lobby",
  text: "test update",
  username: "testUser"
};

var data = {results:[testObj]};

exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);
  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

  // get query from URL to sort
  if (url.parse(request.url).pathname === '/classes/messages/') {
    if (request.method === 'GET') {
      console.log("GET FIRED");
      var queryObj = url.parse(request.url, true).query;
      console.log(queryObj.order);

      if (queryObj.order) {
        if(queryObj.order.charAt(0) === '-') {
          console.log('oh yeah');
          console.log(data.results);
          data.results.sort(function(a, b) {
            return b.createdAt - a.createdAt;
          });
          console.log(data.results);
        }
      }
      // console.log(query);

      response.end(JSON.stringify(data));
    }

    if (request.method === 'POST') {
      request.on("data", function(inputData) {

        console.log('data received');
        var dataObj = JSON.parse(inputData);
        dataObj.objectId = getObjectId();
        dataObj.createdAt = new Date();

        data.results.push(dataObj);
      });
    }
  }
  response.end("Hello, World!");
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var currentObjectId = 1;
var getObjectId = function() {
  var newID = ++currentObjectId;
  newID = newID.toString();
  return newID;
};
