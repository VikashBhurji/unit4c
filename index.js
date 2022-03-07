const express=require("express");

const app=express();

app.get("/books",(req,res)=>{
    res.send({
        book1:"Physics",
        book2:"Maths",
        book3:"Chemistry",
    });
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
});

app.get("/libraries",(req,res)=>{
    res.send({
        library1:"Aryabhatt Central Library",
        library2:"Unknown Library",
        library3:"SomeX",
    });
});

app.get("/authors",(req,res)=>{
    res.send({
        author1:"PremChand",
        author2:"Vikash",
        author3:"Kabir",
    });
});