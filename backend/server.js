import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
const PORT = 5000;

//db connection
const connectDB = async()=>{
    await mongoose.connect('mongodb://localhost:27017/First-Task').then(()=>console.log('DB connected'));
}

//database schema
const ContactSchema = new mongoose.Schema({
    task:{type:String,required:true},
})
//usermodel
const userModel = mongoose.models.user || mongoose.model("to-do-app",ContactSchema);


const addUser = async (req,res) =>{
    const user = new userModel({
        task:req.body.task,
    })
    try {
        await user.save();
        res.json({success:true,message:"Task Added successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error occured"});
    }
}

const taskList = async (req,res) =>{
    try {
        const taskList = await userModel.find({})
        res.json({success:true,Data:taskList})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error Occured"})
    }
}

const removeTask = async (req, res) => {
    try {
        //finding model
        const deletTask = await userModel.findById(req.body.id);
        //deleting the model from mongooDB
        await userModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Task Deleted"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error Occured"})
    }
}




app.use(express.json())
app.use(cors())
connectDB();

const userRoute = express.Router();

userRoute.post('/add',addUser)
userRoute.get('/tasks',taskList)
userRoute.post('/removeTask',removeTask)

app.use("/task",userRoute)

app.get('/',(req,res)=>{
    res.send("Api Working")
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})