var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var fs = require('fs');
var winston = require('winston');
// var morgan = require('morgan');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
});

// var stateRoute = require('./routes/stateRoute');
var states = require('./routes/states');


// router.use('/',(req,res,next) =>{
//   console.log(path + req.method);
//   next();
// });
//
// router.get('/states',(req,res) =>{
//   res.sendFile(path + 'index.html');
// });




app.use('/', router);
app.use('/states',states);
// app.use('/statesRoute',stateRoute);



app.listen(3000,() => {
  console.log('Live at port 3000');
});
