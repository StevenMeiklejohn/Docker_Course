const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors')

app.use(express.json());
app.use(cors())

// use when starting application locally
// let mongoUrlLocal = "mongodb://admin:password@localhost:27018";

// use when starting application as docker container
// let mongoUrlDocker = "mongodb://admin:password@mongodb";


MongoClient.connect('mongodb://admin:password@localhost:27018', { useNewUrlParser: true, useUnifiedTopology: true })
.then((client) => {
  console.log('client', client);
  const db = client.db('games_hub');
  const gamesCollection = db.collection('games');
  console.log('gamesCollection', gamesCollection);
  const gamesRouter = createRouter(gamesCollection);
  app.use('/api/games', gamesRouter);

})
.catch(console.error);


app.listen(9000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
