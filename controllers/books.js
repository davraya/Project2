const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const {validationResult } = require('express-validator')

const getBookById = async (req, res) => {

    try{
        const client = await mongodb.getDb();
        const userId = new ObjectId(req.params.id)
        const result = await client.db('Library').collection('Books').find({_id : userId});
    
        result.toArray().then((list) =>{
            res.status(200).json(list[0]);
        });
    } catch(e){
        console.error(e);
    }
    
}

const getAllBooks = async (req, res) => {
    try{
        const client = await mongodb.getDb();
        const result = await client.db('Library').collection('Books').find();
    
        result.toArray().then((list) => {
            res.status(200).json(list);
        });
    } catch(e){
        console.error(e);
    }
    
}

const updateBook = async (req, res) => {
    try{
        const book = {
            isbn : req.body.isbn,
            title : req.body.title,
            subtitle : req.body.subtitle,
            author : req.body.author,
            published : req.body.published,
            publisher : req.body.publisher,
            pages : req.body.pages,
            description : req.body.description
        } 
        
        const bookId = new ObjectId(req.params.id);
    
        const client = await mongodb.getDb();
        const response  = await client.db('Library').collection('Books').replaceOne({ _id: bookId }, book);
        if (response.acknowledged) {
            res.status(204).json(response);  // not sending a status back
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
          }
    } catch(e){
        console.error(e);
    }
    
};

const addBook = async (req, res) => {

    try{
        const book = {
            isbn : req.body.isbn,
            title : req.body.title,
            subtitle : req.body.subtitle,
            author : req.body.author,
            published : req.body.published,
            publisher : req.body.publisher,
            pages : req.body.pages,
            description : req.body.description
        }
    
    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }
    
        const client = await mongodb.getDb();
        const response = await client.db('Library').collection('Books').insertOne(book);
    
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
          }
    } catch(e){
        console.error(e);
    }
    
};

const deleteBook = async (req, res) => {
    try{
        const bookId = new ObjectId(req.params.id);

    const client = await mongodb.getDb();
    const response  = await client.db('Library').collection('Books').deleteOne({ _id: bookId });
    if (response.acknowledged) {
        res.status(204).json(response);  // not sending a status back
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
    } catch(e){
        console.error(e);
    }
    

};

module.exports = {
    getBookById, 
    getAllBooks,
    updateBook,
    addBook,
    deleteBook
}