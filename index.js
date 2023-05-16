const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect mongodb 

const uri = "mongodb+srv://mern_crud_app:awBxh6M1IE2Pz6Io@cluster0.1ndgjy2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })


async function run() {
    try {

        const itemsCollection = client.db('mern_crud_app').collection('items')
       

        app.post('/items', async (req, res) => {
            const items = req.body
            const result = await itemsCollection.insertOne(items)
            res.send(result)
        });

        app.get('/items', async (req, res) => {
            const query = {}
            const cursor = itemsCollection.find(query)
            const items = await cursor.toArray()
            res.send(items)
        });

        app.delete('/items/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await itemsCollection.deleteOne(filter);
            res.send(result);
        });


    }
    finally {

    }
}
run().catch(error => console.error(error))


app.get("/", (req, res) => {
    res.send("Server Is Ready To Fight.");
});

app.listen(port, () => {
    console.log("port is running", port);
});