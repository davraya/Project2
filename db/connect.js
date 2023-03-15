require('dotenv').config();
const {MongoClient} = require('mongodb');


const getDb = async () => {
    const client = new MongoClient(process.env.DB_URI);
    console.log('Attempting connection')
    
    try{
        await client.connect();
        console.log('Connection succeded')
    } catch(e){
        console.log(e);
    }
    return client;
}

module.exports = {
    getDb
}