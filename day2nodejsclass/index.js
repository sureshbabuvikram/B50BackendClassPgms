import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser';
import empRouter from './Routers/employee.router.js';

const app=express();
const PORT=4000

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())
app.use('/api/emp',empRouter)

app.listen(PORT,()=>{
    console.log("App is listening -",PORT);
})