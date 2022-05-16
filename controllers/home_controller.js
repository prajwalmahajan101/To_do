const Task = require('../models/task')


module.exports.home = async function(req, res){
    if(!req.user){
        req.flash('error',"You Are not Logged in Please Log-in before Going to the  Home Page" );
        return res.redirect('/users/sign-in')
    }

    let tasks = await Task.find({user:req.user.id});
    // console.log(tasks);
    let rtasks = [];
    let ctasks = [];
    let totalPoints =0;
    let comPoints = 0;

    for (let task of tasks){
        totalPoints+= parseInt(task.priority);
        if (task.isCompleted) {
            ctasks.push(task);
            comPoints+=parseInt(task.priority);
        }
        else rtasks.push(task); 
        if(task.priority==1) task.color ='blue';
        else if(task.priority==2) task.color='green';
        else task.color = 'red';
    }
   let ans = ((comPoints*1.0)/totalPoints)*100;
//    console.log(ans);
    ans = ans.toFixed(2);


    return res.render('home',{
        title: "To Do List Home",
        tasks:tasks,
        rtasks:rtasks,
        ctasks:ctasks,
        comPer:ans,

    })
}