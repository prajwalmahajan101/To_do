const Task = require("../models/task");


module.exports.create = async (req,res)=>{
    // console.log(req.body);
    try{
    let task = await Task.create(req.body);
    req.flash('success','Task Created Sucessfully !');
    // console.log(task);
    }
    catch(err){
        req.flash('error','Sorry, Task Cannot Be Created !!');
        console.log(err);
    }
    res.redirect('back');

}


module.exports.distroy = async (req,res)=>{
    // console.log(req.params.id);
    try{
        let task = await Task.findById(req.params.id);
        task.remove();
        req.flash('success','Task Deleted Sucessfully !');
    }
    catch(err){
        req.flash('error','Sorry, Task Cannot Be Deleted !!');
        console.log(err);
    }
    res.redirect('back');

} 

module.exports.complete = async (req,res)=>{
    // console.log(req.params.id);
    try{
        let task = await Task.findById(req.params.id);
        task.isCompleted = true;
        task.save();
        req.flash('success','Task Marked Complete Sucessfully !');
    }
    catch(err){
        req.flash('error','Sorry, Task Cannot Be Marked Complete !!');
        console.log(err);
    }
    res.redirect('back');
}
