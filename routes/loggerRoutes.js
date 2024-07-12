const express = require('express')
const router = express.Router()

const {checkLoggerData} = require('../controllers/loggerController')
const dataEntryLogger = require('../middlewares/dataEntryLogger')


router.post('/checkLoggerData/:uname/:upwd', dataEntryLogger, checkLoggerData);

module.exports = router