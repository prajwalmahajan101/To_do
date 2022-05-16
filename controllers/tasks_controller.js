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
