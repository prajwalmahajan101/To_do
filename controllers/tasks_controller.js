const Task = require("../models/task");


module.exports.create = async (req, res) => {
    // console.log(req.body);
    const format = (data) =>{
        if(data>9) return data;
        else return '0'+data;
    }
    date1 = new Date;
    let datenow = date1.getFullYear()+"-"+format(date1.getMonth()+1)+"-"+format(date1.getDate());
    taskdate = req.body.day;
   
    if (datenow > taskdate) {
        req.flash('error', 'Sorry Time Travel is Not Possible Yet !!');
        res.redirect('back');

    }
    else {
        try {
            let task = await Task.create(req.body);
            req.flash('success', 'Task Created Sucessfully !');
        }
        catch (err) {
            req.flash('error', 'Sorry, Task Cannot Be Created !!');
            console.log(err);
        }
        res.redirect('back');
    }
}


module.exports.distroy = async (req, res) => {
    // console.log(req.params.id);
    try {
        let task = await Task.findById(req.params.id);
        task.remove();
        req.flash('success', 'Task Deleted Sucessfully !');
    }
    catch (err) {
        req.flash('error', 'Sorry, Task Cannot Be Deleted !!');
        console.log(err);
    }
    res.redirect('back');

}

module.exports.complete = async (req, res) => {
    // console.log(req.params.id);
    try {
        let task = await Task.findById(req.params.id);
        task.isCompleted = true;
        task.save();
        req.flash('success', 'Task Marked Complete Sucessfully !');
    }
    catch (err) {
        req.flash('error', 'Sorry, Task Cannot Be Marked Complete !!');
        console.log(err);
    }
    res.redirect('back');
}
