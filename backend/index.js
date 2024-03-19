const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = 8082
const app = express();
const databaseconnect = require('./dbConnect')
const databaseRoute = require('./routes/databaseRouter')

databaseconnect();

app.use(cors({origin:[process.env.CLIENT_URL]}))

app.use('/api', databaseRoute)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})