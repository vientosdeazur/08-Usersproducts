const express = require('express');
const morgan = require('morgan');
const { listen } = require('express/lib/application');
const config = require('../../config');
const {routes} = require('../../routes/users.routes');
const res = require('express/lib/response');
const logger = require('../loggers/index'); 
const swaggerUi = require ('swagger-ui-express');
class ExpressServer {

    constructor(){
        this.app = express();
        this.port = config.port;
        this._middlewares();
        this._swagerConfig();
        this.basePath = ''; //config.api.prefix
        this._routes();
        this._notFound();
        this._errorHandler();
        
    }

    _middlewares (){
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }
        
    _routes (){
        this.app.use (`${this.basePath}`, routes);
        this.app.head("/status", (req,res)=> {
            res.status(200).end();
        })
    }

    _notFound() {
        this.app.use ((req,res,next) => {
            const err = new Error("Not Found");
            err.status = 404;
            err.code = 404;
            next(err);
        })

    }

    _swagerConfig(){
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swagger.json'))
        )
    }

    _errorHandler(app){
        this.app.use((err,req,res,next) =>{
            const code = err.code || 500;
            res.status(code);
            const body = {
               error: {
                   code,
                   message: err.message
               }                    
            }
        res.json(body);    
        });

    }

    async start() {
        this.app.listen(this.port, (error)=> {
            if(error){
                logger.error(err);
                process.exit(1);
                return;
            }
            logger.info(`App Started at port ${this.port}`);
        })

    }

}

module.exports =  ExpressServer;
