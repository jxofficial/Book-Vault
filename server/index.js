const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app); // app is the express object with all middleware and route handlers bounded

server.listen(config.PORT, () => logger.info(`Server running on PORT ${config.PORT}`));
