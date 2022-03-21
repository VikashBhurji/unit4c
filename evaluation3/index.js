const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/Bank",{
    userNewParser:true,
    useunifiedTopology:true,
})
.then(()=>console.log("connection okey"))
.catch((err)=>console.log(err));

const userSchema=new mongoose.Schema({
    firstName:{type:String,min:3,max:30,required:true},
    lastName:{type:String,min:3,max:30,required:false},
    age:{type:Number,min:1,max:150,required:true},
    email:{type:String,required:true,unique:true},
    profileImages:{type:URL},
},
{
    timestamps:{type:String,required:true}
});

const user=mongoose.model("user",userSchema);

const bookSchema=new mongoose.Schema({
    likes:{type:Number,min:0},
    coverImage:{type:String,required:true},
    content:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},
{
    timestamps:{type:String,required:true}
});

const book=mongoose.model("book",bookSchema);

const publicationSchema=new mongoose.Schema({
    name:{type:String,required:true},
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
    }
},
    {
        timestamps:{type:String,required:true}
    });

    const publication=mongoose.model("publication",publicationSchema);

    const commentSchema=new mongoose.Schema({
        body:{type:String,required:true},
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"book",
        }
    },{
        timestamps:{type:String,required:true} 
    });

    const comment=mongoose.model("comment",commentSchema);