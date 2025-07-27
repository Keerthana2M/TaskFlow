import Task from '../model/taskModel.js'


// create a New Task

export const createTask = async(req,res)=>{
    try{
        const{title,description,priority,dueDate,completed}=req.body;
        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            completed:completed ==='Yes'||completed===true,
            owner: req.user.id
        });
        const saved = await task.save();
        res.status(201).json({success:true,task:saved});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success:false,message:error.message})
    };
    
}

//Get all task for Logged -in USER

export const getTask = async(req,res)=>{
    try{
        const tasks = await Task.find({owner:req.user.id}).sort({createdAt:-1});
        res.json({success:true,tasks});
    }
    catch(err){
                res.status(500).json({success:false,message:err.message})
    }
}

//Get Single Task by ID(MUST Belong to that user)

export const getTaskById = async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user.id});
        if(!task) return res.status(404).json({success:false,message:"Task not Found"});
        res.json({success:true,task});
    }
    catch(err){
                res.status(500).json({success:false,message:err.message})
    }

}

//update Task

export const update = async (req,res)=>{
    try{
        const data = {...req.body};
        if(data.completed !== undefined){
            data.completed = data.completed ==='Yes' || data.completed ===true;
        }
        const updated = await Task.findOneAndUpdate({_id:req.params.id,owner:req.user.id},data,{new:true,runValidators:true});
        if(!updated) return res.status(404).json({success:false,message:"Task not Found or not Yours"});
        res.json({success:true,task:updated});
    }
    catch(err){
                res.status(500).json({success:false,message:err.message})
    }
}

//Delete a task

export const deleteTask = async(req,res)=>{
    try{
        const deleted = await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id});
        if(!deleted) return res.status(404).json({success:false,message:'Tasks Not Found or Not yours'});
        res.json({success:true,message:"task deleted"});
    }
    catch(err){
                res.status(500).json({success:false,message:err.message})
    }
}
