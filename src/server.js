const pgp = require('pg-promise')();
const winston = require('winston');
const express = require('express');

const router = express.Router();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const path = require('path');
const bodyParser = require("body-parser"); // for parsing application/json
const app = express();
const db = pgp('postgres://qiykkuwe:YZMdje9GHyZ-slGkXpFUHx_YvcQluy_8@ziggy.db.elephantsql.com/qiykkuwe');
const fastify = require('fastify')({
    logger: true
  });

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
fastify.register(require('@fastify/formbody'));

app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));
let saltRounds = 10;


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});


function clientError(req, message, errorCode) {
    logger.log({
        level: "info",
        endpoint: req.path,
        method: req.method,
        query_parameters: req.query,
        path_parameters: req.params,
        body: req.body,
        ip: req.ip,
        errorCode: errorCode,
        message: message,
        timestamp: new Date(),
    })
}


let clientID = 0;
app.all('/*', (req, res, next) => {
    clientID++;
    logger.log({
        level: "info",
        endpoint: req.path,
        method: req.method,
        query_parameters: req.query,
        path_parameters: req.params,
        body: req.body,
        ip: req.ip,
        // errorCode: 400,
        timestamp: new Date(),
    });
    next();
})