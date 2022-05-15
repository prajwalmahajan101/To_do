//Required Files
const express = require('express');





// Contants
const app = express();
const port = 8000;

//MiddleWare
app.set('view engine', 'ejs');
app.set('views', './views');







app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
