const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL

const databaseconnect = () => {
    mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('database connected successfully', MONGODB_URL) )
    .catch(err => console.error(`Error in connecting to database`, err))
}

mongoose.connection.on('connected',()=> {
    console.log('mongoose connected to mongodb')
})

module.exports = databaseconnect