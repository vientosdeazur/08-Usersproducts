const ExpressServer = require ('./server/expressServer');
const mongooseLoader = require('./mongoose');
const config = require ('../config');
const logger = require('./loggers');

const startServer = async () => {

    await mongooseLoader();
    logger.info('DB LOADED AND CONNECTED');

    const server = new ExpressServer;
    logger.info('Express Loaded');
    server.start();
    logger.info(`Server listening on port: ${config.port}`);
}

module.exports = {startServer};