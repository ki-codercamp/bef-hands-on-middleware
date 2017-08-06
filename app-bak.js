var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var fs = require('fs');
var winston = require('winston'),
var morgan = require('morgan');
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream((path, 'access.log'), {flags: 'a'})

var states = require('./routes/states');

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// router.use('/',(req,res,next) =>{
//   console.log(path + req.method);
//   next();
// });
//
// router.get('/states',(req,res) =>{
//   res.sendFile(path + 'index.html');
// });


app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      level: 'verbose',
      // filename: 'app.log',
      handleExceptions: true,
      json: true,
      // maxsize: 5242880, //5MB
      // maxFiles: 5,
      colorize: false,
      timestamp: true,
      prettyprint:true
    })
  ],
  exitOnError: false
}));

app.use('/', router);
app.use('/states',states);



app.listen(3000,() => {
  console.log('Live at port 3000');
});
