const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app =express();
const port =process.env.PORT ||5000;

//midlleware 
app.use(cors());
app.use(express.json());


//eta mongodb er connect theke copy kora code 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c6wxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const serviceCollection =client.db('geniusCar').collection('service');
        app.get('/service', async(req,res)=>{
            const query = {};
        const cursor =serviceCollection.find(query);
        const services =await cursor.toArray();
        res.send(services);
        });
        app.get('/service/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectId(id)};
            const service =await serviceCollection.findOne(query);
            res.send(service);
        });

        //post
       app.post('/service',async(req,res)=>{
           const newservice =req.body;
           const result =await serviceCollection.insertOne(newservice);
           res.send(result);
       })
    //   delete 
       app.delete('/service/:id',async(req,res)=>{
           const id =req.params.id;
           const query ={_id:ObjectId(id)}
           const result =await serviceCollection.deleteOne(query);
           res.send(result);
       })

    }
    finally{

    }

}
run().catch(console.dir);



// app.get
app.get('/',(req,res)=>{
    res.send('running genius server');
});

app.listen(port, () => {
    console.log('Listening to port ',port);
  })