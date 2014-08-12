/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var testObj = {
  createdAt: "today",
  objectId: "123",
  roomname: "lobby",
  text: "test update",
  updatedAt: "today",
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



  // if (request.url === '/') {
  //   // show the user a simple form
  //   console.log("[200] " + request.method + " to " + request.url);
  //   response.writeHead(200, "OK", {'Content-Type': 'text/html'});
  //   response.write('<html><head><title>Hello Noder!</title></head><body>');
  //   response.write('<h1>Welcome Noder, who are you?</h1>');
  //   response.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
  //   response.write('Name: <input type="text" name="username" value="John Doe" /><br />');
  //   response.write('Age: <input type="text" name="userage" value="99" /><br />');
  //   response.write('<input type="submit" />');
  //   response.write('</form></body></html');
  //   response.end();
  // }

  // if (request.url === '/sendmessage') {
  //   console.log("submit received.");
  //   data.results.push("submission");
  //   console.log(data);
  // }

  if (request.method === 'POST') {

  }

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

  if (request.url === '/classes/messages/') {
    if (request.method === "GET") {
      console.log("got GET");
      response.end(JSON.stringify(data));
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

