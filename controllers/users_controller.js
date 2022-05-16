const User = require('../models/user'); 



module.exports.profile = (req,res) =>{
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile',{
            title:'Profile',
            profile_user : user,
        });     
    });

   

};

module.exports.update= async (req,res) =>{
    if(req.user.id ==req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
                user.name = req.body.name;
                user.email = req.body.email;
                user.save();
                return res.redirect('back');

        }catch(err){
            req.flash('error','Error in Updating'+err);
            console.log('error in Error in Updating profile'); 
            return;
        }

    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
   

};


module.exports.signin = (req,res) =>{
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
    return res.render('user_sign_in',{
        title:'Sign In',
    });
}
};


module.exports.create = (req,res) =>{
    if(req.body.password!= req.body.confirm_password) return res.redirect("back");
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) {console.log('error in finding user in signing up');return;}
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err) {console.log('error in creating user in signing up');return;}

                return res.redirect('/users/sign-in');
            });
        }
        else return res.redirect('back');

    })    


};


module.exports.createSession = (req,res) =>{
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');
};


module.exports.destorySession = (req,res)=>{
    req.logout();
    req.flash('success','Logged out Sucessfully !');
    return res.redirect('/users/sign-in');
}