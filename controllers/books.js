const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getBookById = async (req, res) => {
    const client = await mongodb.getDb();
    const userId = new ObjectId(req.params.id)
    const result = await client.db('Library').collection('Books').find({_id : userId});

    result.toArray().then((list) =>{
        res.status(200).json(list[0]);
    });
}

const getAllBooks = async (req, res) => {
    const client = await mongodb.getDb();
    const result = await client.db('Library').collection('Books').find();

    result.toArray().then((list) => {
        res.status(200).json(list);
    });
}

const updateBook = async (req, res) => {
    const book = req.body;
    const bookId = new ObjectId(req.params.id);

    const client = await mongodb.getDb();
    const response  = await client.db('Library').collection('Books').replaceOne({ _id: bookId }, book);
    if (response.acknowledged) {
        res.status(204).json(response);  // not sending a status back
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
};

const addBook = async (req, res) => {

    const book = req.body;

    const client = await mongodb.getDb();
    const response = await client.db('Library').collection('Books').insertOne(book);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
};

const deleteBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);

    const client = await mongodb.getDb();
    const response  = await client.db('Library').collection('Books').deleteOne({ _id: bookId });
    if (response.acknowledged) {
        res.status(204).json(response);  // not sending a status back
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }

};

module.exports = {
    getBookById, 
    getAllBooks,
    updateBook,
    addBook,
    deleteBook
}