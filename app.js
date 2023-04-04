require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const clientRouter = require('./routes/client');
const policyRouter = require('./routes/insurance-policy');
const claimRouter = require('./routes/claim');

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');


const connectDB = require('./db/connect');

app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/client',clientRouter);
app.use('/api/v1/policy',policyRouter);
app.use('/api/v1/claim',claimRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);


app.get(',',(req,res)=>{
    res.send("new assignment");
})

const port = process.env.PORT || 3000 ;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
       app.listen(port,console.log(`Server is listening on ${port}...`))
    }catch(error){
     console.log(error);
    }
}

start();