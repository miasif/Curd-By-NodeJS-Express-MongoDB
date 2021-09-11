const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const User = require('./server/models/user');
const app = express();
const mongoose = require('mongoose');

app.use(morgan('tiny'));
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('mongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");
app.use(express.static('assets'));

// app.use('/css',express.static(path.resolve(__dirname."assets/css")));
// app.use('/img',express.static(path.resolve(__dirname."assets/img")));
// app.use('/js',express.static(path.resolve(__dirname."assets/js")));



// app.get('/',(req,res)=>{
//     res.render('index');
// });
app.get('/add_user',(req,res)=>{
  res.render('add_user');
});
app.post('/user/create', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/', async (req, res) => {
    try {
      const users =await User.find();
      res.render('index', { users });
    } catch (error) {
      console.log(error);
    }
  });
  

  app.get('/update_user/edit/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.render('update_user', { user });
    } catch (error) {
      console.log(error);
    }
  });
  app.post('/update_user/edit/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      });
      res.send(user);
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  });
  
  app.get('/users/delete/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.send(user);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  });



//  app.get('/update_user',(req,res)=>{
//  res.render('update_user');
// });


app.listen(3000, () => console.log('server is running on 3000'));


