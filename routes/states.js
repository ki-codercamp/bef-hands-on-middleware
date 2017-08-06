var express = require('express');
var router = express.Router();
var path = __dirname + '/views/';
var winston = require('winston');


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'debug' }),
  ]
});


let = states = [
  {
    state: "California",
    id: "CA",
    population:"38.8 million"
  },
  {
    state: "Texas",
    id: "TX",
    population:"27 million"
  },
  {
    state: "Florida",
    id: "FL",
    population:"19.9 million"
  },
  {
    state: "New York",
    id: "NY",
    population:"19.8 million"
  },
  {
    state: "Illinois",
    id: "IL",
    population:"12.9 million"
  },
  {
    state: "Pennsylvania",
    id: "PA",
    population:"12.8 million"
  },
  {
    state: "Ohio",
    id: "OH",
    population:"11.6 million"
  },
  {
    state: "Georgia",
    id: "GA",
    population:"10.1 million"
  },
  {
    state: "North Carolina",
    id: "NC",
    population:"10 million"
  },
  {
    state: "Michigan",
    id: "MI",
    population:"9.9 million"
  }
];

let area51 = 'Oh no! You found Area51 in Roswell, Nevada!!!';

let secretKey = (req,res,next) =>{
  let secret = req.query['secret'];
  if (secret !== '51') {
    res.status(401).send('Nothing to see here. Move along.');
  } else {
    res.send(area51);
  }
};

// router.get('/', secretKey);


router.get('/', (req,res) => {
  let secret = req.query['secret'];
  logger.log('debug', '/states');
  res.send(states);
  if (secret !== '51') {
    console.log('No clearance here');
    logger.log('warn', 'invalid secret');
  } else {
    console.log(area51);
    logger.log('info', 'invalid secret');
  }
});


router.get('/:id', (req,res) => {
  let secret = req.query['secret'];
  for (var i = 0; i < states.length; i++) {
    if (states[i].id === req.params['id'].toUpperCase()) {
      res.send(states[i].state + ' population is: ' + states[i].population);
      logger.log('debug', '/states/:id');
    } else {
      res.send('invalid state');
      logger.log('info', 'invalid state id');
    }
  }

  // res.send(states);
});

// router.get('/:id', (req,res) => {
//   for (var i = 0; i < states.length; i++) {
//     if (states[i].id === req.params['id'].toUpperCase()) {
//       res.send(states[i].state + ' population is: ' + states[i].population);
//       logger.log('debug', '/states/:id');
//     } else {
//
//     }
//   }
//   // res.send(states);
//   logger.log('info', 'invalid route');
// });



module.exports = router;
