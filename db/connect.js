require('dotenv').config();
const {MongoClient} = require('mongodb');


const getDb = async () => {
    const client = new MongoClient(process.env.DB_URI);
    
    try{
        await client.connect();
    } catch(e){
        console.log(e);
    }
    return client;
}

module.exports = {
    getDb
}