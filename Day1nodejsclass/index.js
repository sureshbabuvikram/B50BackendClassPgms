import express from 'express';
const app= express();
import cors from 'cors';

const PORT= 4000;

//methods -> get,post,put,delete, 

//middlewares
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hai my dear students , we will become a FSD"});
});



app.listen(PORT,()=>{
    console.log("My App is listening with port",PORT);
});