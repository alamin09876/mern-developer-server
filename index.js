const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000

// middleware
app.use(cors())
app.use(express.json())

// mernUser
// 

// console.log(process.env.DB_USER)
// ${process.env.DB_USER} ${process.env.DB_PASSWORD}


const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dotnzuk.mongodb.net/?retryWrites=true&w=majority";
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('mern developer data loading!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})