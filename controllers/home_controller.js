const Task = require('../models/task')


module.exports.home = async function(req, res){
    if(!req.user){
        req.flash('error',"You Are not Logged in Please Log-in before Going to the  Home Page" );
        return res.redirect('/users/sign-in')
    }

    let tasks = await Task.find({user:req.user.id}).sort('-day').sort('-priority');
    // console.log(tasks);
    const format = (data) =>{
        if(data>9) return data;
        else return '0'+data;
    }
    let rtasks = [];
    let ctasks = [];
    let Ttasks = [];
    let mtasks = [];
    let totalPoints =0;
    let TtotalPoints =0;
    let TcomPoints =0;
    let comPoints = 0;
    let date = new Date;
    let Qday = date.getFullYear()+"-"+format(date.getMonth()+1)+"-"+format(date.getDate());

    for (let task of tasks){
        const month = task.day.toLocaleString('en-US',{month :'long'});
        const year = task.day.getFullYear();
        const day = task.day.getDate();
        task.month = month;
        task.year = year;
        task.dayName = day;

        let d = task.day.getFullYear()+"-"+format(task.day.getMonth()+1)+"-"+format(task.day.getDate());
        if(d<Qday){
            mtasks.push(task);
        }
        if (d==Qday) {
            Ttasks.push(task);
            TtotalPoints+=parseInt(task.priority);
            if(task.isCompleted) TcomPoints += parseInt(task.priority);
        }
        totalPoints+= parseInt(task.priority);
        if (task.isCompleted) {
            ctasks.push(task);
            comPoints+=parseInt(task.priority);
        }
        else rtasks.push(task); 
        if(task.priority==1) task.color ='aqua';
        else if(task.priority==2) task.color='green';
        else task.color = 'red';
        if(task.isCompleted) task.color='';
    }
   let ans = ((comPoints*1.0)/totalPoints)*100;
//    console.log(ans);
    ans = ans.toFixed(2);

    let ans2 = ((TcomPoints*1.0)/TtotalPoints)*100;
    ans2 = ans2.toFixed(2);


    return res.render('home',{
        title: "To Do List Home",
        tasks:tasks,
        rtasks:rtasks,
        ctasks:ctasks,
        ttasks:Ttasks,
        comPer:ans,
        tcomPer:ans2,
        mtasks:mtasks,

    })
}