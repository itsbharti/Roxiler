const axios = require('axios');
const ProductTransactionModel = require('../model/productSchema');
const mongoose = require('mongoose')

//Database Initialization
const initializeDatabase = async(req, res, next)=>{
    try{
        // http req to fetch data frm third party API
        const productTransactions = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        // extract json data from response
        const jsonData= await productTransactions.data
        
        // console.log('Retrieved data:', jsonData);//checking if data is retrieved or not

        // validate data and handle potential errors
        if (!Array.isArray(jsonData)) {
            throw new Error('Data fetched from third-party API is not in the expected format.');
        }

        //inserting data into the database
        await ProductTransactionModel.insertMany(jsonData)

        res.status(200).json({
            success: true,
            message:'Database initilized successfully..'
        })
    } catch(error){
        console.error('error in initilizing database', error);
        res.status(500).json({
            success: false,
            message:"An error occurred while initilizing the database"
        })
    }
}
///////////////////////////////////////////////////////////////////

const transactionList = async(req, res, next)=> {
    try{
        const {search, page=1, perPage=10} = req.query;

        //make mongodb query for search
        const query = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } }, // Case-insensitive search by title
                { description: { $regex: search, $options: 'i' } }, // Case-insensitive search by description
                { price: { $regex: search, $options: 'i' } } // Case-insensitive search by price
            ]
        }: {};

        //Apply pagination
        const options = {
            limit:parseInt(perPage),
            skip: (parseInt(page) - 1) * parseInt(perPage)
        }

        //database query
        const transactions = await ProductTransactionModel.find(query, null, options);

        //count total no of transaction for pagination
        const totalCount = await ProductTransactionModel.countDocuments(query);

        res.status(200).json({
            transactions,
            totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / parseInt(perPage))
        });
    } catch(error) {
        res.status(400).json({
            success:false,
            error: ' An error occurred while listing transactions'
        })
    }
}
module.exports = {initializeDatabase, transactionList}
