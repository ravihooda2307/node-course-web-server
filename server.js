const express= require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() => {

return new Date().getFullYear()

});

hbs.registerHelper('makeCapitalLetter', (text) =>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

 app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now= new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;


fs.appendFile('server.log',log + '\n',(err)=>{
         if(err){
           console.log(err);
         }
});
  console.log(log);
next();
});

//
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
//   next();
// });



app.get('/home',(req,res) => {

  // res.send("<h1>Hello Express!!</h1>");
// res.send({
//   name:'Ravi',
//   likes:[
//     'playing',
//     'biking',
//     'baskeyball'
//   ]
// });

res.render('home.hbs',{
  pageTitle:'Home Page',
  welcomeMessage:'Welcome to my Website',
// currentYear:new Date().getFullYear() /// we can use registerhepler in this also as done by me
});
});

app.get('/about',(req,res) => {
  // res.send("<h1>About page<h1>")
  res.render('about.hbs',{
    pageTitle:'About Page',
    // currentYear: new Date().getFullYear()
  });
});



app.get('/bad',(req,res)=> {

res.send({
  errorMessage:'Unable to handle request'
});

});


// app.listen(3000,()=>{
app.listen(port,()=>{
console.log(`server is up on port:${port}`);
});
