// Create web server
// Start server
// Listen for requests
// Parse requests
// Get comments
// Send comments

// Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Create web server
http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  // Start server
  fs.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    // Listen for requests
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(8888);

console.log("Server running at http://localhost:8888/");