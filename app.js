const express = require('express');
const app = express()
const PORT = 3000
app.use(express.json())

app.get('/',(request,response)=>{
    response.status(200).json({message: 'Hello World!!'})
})

const routes = require('./routes/loggerRoutes');
app.use('/api', routes);


app.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}/`);
})