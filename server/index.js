const app = require('./app');
const http = require('http');
const config = require('./utils/config');

const server = http.createServer(app); // app is the express object with all middleware and route handlers bounded

server.listen(config.PORT, () => console.log(`Server running on PORT ${config.PORT}`));

