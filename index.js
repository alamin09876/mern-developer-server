const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
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
       

       
        app.get('/services', async(req, res) =>{
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
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