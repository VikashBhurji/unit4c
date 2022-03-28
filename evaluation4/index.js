const express=require('express');
const connect=require('./config/db');
const {register,login}=require('./controller/auth.controller');
const app=express();
app.use(express.json());
app.post("/register",register);
app.post("/login",login);
app.listen(2345,async()=>{
    try {
        await connect();
        console.log('listening to port 2345');
    } catch (error) {
       console.log({messege:error.messege}); 
    }
})