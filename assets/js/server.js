const http = require('http');
const fs = require('fs')

const PORT = 8080;

const handleRequest = (req, res) => {
    const path = req.url

    switch (path) {
        case '/notes':
            fs.readFile(`${__dirname}/notes.html`, (err, data) => {
                if (err) throw err;
            
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
              });
            break
        default: 
        fs.readFile(`${__dirname}/index.html`, (err, data) => {
            if (err) throw err;
        
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
          });
      }
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});