const express = require('express')
const router = express.Router()
const {initializeDatabase, transactionList} = require('../controller/dataController')


router.get('/database-initialize',initializeDatabase)
router.get('/transactions', transactionList)




module.exports = router

