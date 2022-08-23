const { format } = require('express/lib/response');
const { level } = require('winston');
const winston = require ('winston');
const config = require ('../../config/index');

const transports = [];
transports.push(
    new winston.transports.Console(),
);

const LoggerInstance = winston.createLogger({
    level: config.log.level,
    format: winston.format.simple(),
    transports
}
);

module.exports = LoggerInstance;