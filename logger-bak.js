var morgan = require('morgan');
var winston = require('winston');
var moment = require('moment');

let instance = null;
//module service with singleton pattern
export default class loggerService{
  get timeStamp(){ return this._timeStamp}

  constructor(){

    if (!instance)
    {
      //Setup Logger
       // to test whether we have singleton or not
      this._timeStamp = this.time;
      let time = ()=>{ return moment().format('YYYY-MM-DD h:mm:ss a')}

      //set up winston
          let winlogger = new winston.Logger({
          transports: [
              new winston.transports.File({
                  level: 'verbose',
                  filename: 'app.log',
                  handleExceptions: true,
                  json: true,
                  maxsize: 5242880, //5MB
                  maxFiles: 5,
                  colorize: false,
                  timestamp: true,
                  prettyprint:true
              })
          ],
          exitOnError: false
      });

      let logger ={
        timeStamp: this._timeStamp,
        time: time,
        log:(message,category = 'info')=>{ winlogger.log(category,message)},
        dev: morgan('dev')
      }

      instance = logger;
    }
    return instance;
  }
}
