const http = require('http');
const app = require('./app');

const Url = 'http://localhost:';

const port = process.env.PORT || 5000;


const server = http.createServer(app);

server.listen(port);

console.log(`server started on ${Url}${port}`);