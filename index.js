const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 5000
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dotnzuk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const serviceCollection = client.db('mernUser').collection('services')
        const reviewCollection = client.db('mernUser').collection('reviews')
       

        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })
        app.get('/services/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })
        app.post('/services', async(req, res) =>{
            const user = req.body;
            console.log(user)
            const result = await serviceCollection.insertOne(user)
            res.send(result)
        })
        // reviews
        app.get('/reviews', async(req, res)=>{
            const query = {}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)
        })
        app.get('/reviews/:id', async(req, res) =>{
          const id = req.params.id
          console.log(id)
          const query = {_id : ObjectId(id)}
          const result = await reviewCollection.findOne(query)
          console.log(result)
          res.send(result)
        })
        app.post('/reviews', async(req, res) =>{
            const user = req.body;
            console.log(user)
            const result = await reviewCollection.insertOne(user)
            res.send(result)
        })
        app.put('/reviews/:id', async(req, res)=>{
          const id = req.params.id;
          const filter = {_id : ObjectId(id)}
          const review = req.body;
          const option = {upsert : true}
          const updateReview = {
            $set: {
              name : review.name,
              email : review.email,
              address : review.address
            }
          }
          const result = await reviewCollection.updateOne(filter, updateReview, option)
          res.send(result)
        })
    
        app.delete('/reviews/:id', async(req, res)=>{
          const id = req.params.id
          console.log(id)
          const query = {_id : ObjectId(id)}
          const result = await reviewCollection.deleteOne(query)
          console.log(result)
          res.send(result)
        })
        
    }

    finally {

    }
}
run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('mern developer data loading!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})