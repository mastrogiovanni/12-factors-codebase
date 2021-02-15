const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

let mongoHost = "localhost";
let mongoPort = 27017;
let dbName = "test";
let appPort = 3000;

app.use(bodyParser.json());
console.log('App started!');

console.log('Registering routes');

app.use('/api', require('./routes/hotels'));
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/bookings'));
app.use('/api', require('./routes/rooms'));

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

// Database URL
let url = `mongodb://${mongoHost}:${mongoPort}/${dbName}`;

(async () => {
  let trials = 10;
  for (let i = 0; i < trials; i ++ ) {
    try {
      await mongoose.connect(url, {
        "useNewUrlParser": true,
        "useUnifiedTopology": true,
        'serverSelectionTimeoutMS': 1000
      })
      console.log("Database connected!")
      mongoose.Promise = global.Promise;
      isReady = true;
    }
    catch (e) {
      console.log("Impossible to connect to database: test", (i+1), "/", trials)
    }
  }  
})()

app.listen(appPort, () => {
  console.log(`Example app listening at http://localhost:${appPort}`)
})


