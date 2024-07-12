const { request, response } = require('express');
const loggerData = require('../data/loggerData');

const checkLoggerData = (request, response) => {
    loggerData.map( iterator => {
        if(iterator.uname === request.params.uname && iterator.upwd === request.params.upwd)
        {
            return response.status(200).json({message: "Authenticated Successfully"});
        }
        else{
            return response.status(404).json({message: "Authentication failed"})
        }
    })
}


module.exports = {checkLoggerData}