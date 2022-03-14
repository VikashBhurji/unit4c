const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

mongoose.connect("");
mongoose.connection.on("error",err=>{
    console.log("connection error",err);
});

const userSchema=new mongoose.Schema({
    firstName:{type:String,require:true},
    middleName:{type:String,require:true},
    lastName:{type:String,require:true},
    age:{type:Number,require:true},
    email:{type:String,require:true},
    address:{type:String,require:true},
    gender:{type:String,require:false,default:female},
    type:{type:String,require:false,default:customer}
},
{
   versionKey:false,
   timestamps:true,
});

const User=mongoose.model("user",userSchema);

const branchSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        IFSC:{type:String,required:true},
        NICR:{type:Number,length:11,required:true},
    },
    {
        versionKey:false,
        timestamps:true
    }
);

const Branch=mongoose.model("branch",branchSchema);

const masterSchema=new mongoose.Schema(
    {
        balance:{type:Number,required:true},
        branch_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"branch"
        },
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const Master=mongoose.model("master",masterSchema);

const savingSchema=new mongoose.Schema(
    {
       account_number:{type:String,length:11,unique:true},
       balance:{type:Number,required:true},
       interest:{type:Number,required:true},
       branch_id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user",
       },
       
           user_id:{
               type:mongoose.Schema.Types.ObjectId,
               ref:"master",
           }
        },
        {
            versionKey:false,
            timestamps:true
        }
);
const Saving=mongoose.model("saving",savingSchema);

const fixedSchema=new mongoose.Schema(
    {
        account_number:{type:String,length:11,unique:true},
       balance:{type:Number,required:true},
       interest:{type:Number,required:true},
       startDate:{type:String,required:true},
       maturityDate:{type:String,required:true},
       branch_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
       },
       user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
       },
       master_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"master",
       }

    },
    {
        versionKey:false,
        timestamps:true,
    }
);

const Fixed=mongoose.model("fixed",fixedSchema);


app.get("/master",async(req,res)=>{
    try {
        const master=await Master.find().populate({path:"user_id",select:["firstName","middleName","lastName"]}).lean().exec();
        return res.send(master);
    } catch (error) {
        return res.send(err.messege)
    }
});

app.get("/master/:id",async(req,res)=>{
    try {
        const master =await Master.find(req.params.id)
        .populate({path:"saving_ids",select:['account_number','balance']})
        .populate({path:"fixed_ids",select:['account_number','balance']})
        .populate({path:"master_ids",select:['account_number','balance']})
        return res.send(err.messege)
    } catch (error) {
        return res.send(err.messege);
    }
});

app.post("/saving",async(req,res)=>{
    try {
        const saving =await Saving.create(req.body);

        return res.send(saving);
    } catch (error) {
        return res.send(err.messege);
    }
});


app.post("/fixed",async(req,res)=>{
    try {
        const fixed=await Fixed.create(req.body);

        return res.send(fixed);
    } catch (error) {
        return res.send(err.messege);
    }
});


app.delete("/fixed/:id",async(req,res)=>{
    try {
        const fixed=await Fixed.findByIdAndDelete(req.params.id).lean()
        return res.send(fixed);
    } catch (error) {
        return res.send(err.messege);
    }
});

app.listen(3500,function(){
    console.log("listening on port 3500")
});








