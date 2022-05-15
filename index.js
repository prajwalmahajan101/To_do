//Required Files
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const sassMiddleware =require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// Contants
const app = express();
const port = 8000;

//MiddleWare

//view Engine
app.set('view engine', 'ejs');
app.set('views', './views');


//static
app.use(express.static('./assets'));


//scss
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//req.bodyPraser
app.use(bodyParser.urlencoded({ extended: false }));


//cookieParser
app.use(cookieParser());

//Layout
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Seesion
app.use(session({

    name:'To_Do_List',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
            mongoUrl:'mongodb://localhost:27017/ToDoList',
            autoRemove:'disabled'
    },(err)=>{
        console.log(err||'connect-mongo is setup ok');
    })

}));





//PassPort
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//Flash Message
app.use(flash());
app.use(customMware.setFlash);


//Routes

app.use('/', require('./routes'));



//Server
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
