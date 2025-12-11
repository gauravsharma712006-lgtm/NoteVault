const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path')
const { User, File } = require('./models/mon');
const jwt = require('jsonwebtoken')
const app = express();

app.set("view engine" , "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))


// ---------------------
// MIDDLEWARE
// ---------------------
function requireLogin(req, res, next){
  const token = req.cookies.token;
  
  if(!token) return res.redirect('/login');

  try{
    const data = jwt.verify(token, "???");
    req.user = data;
    next();
  }catch(err){
    return res.redirect('/login');
  }
}
function noCache(req, res, next){
  res.set('Cache-Control', 'no-store');
  next();
}



// ---------------------
// ROUTES
// ---------------------
app.get('/', (req,res)=>{
  res.render('reg')
})

app.post('/create', async (req,res)=>{
  try{
    let {username , email , password , age } = req.body;

    // check if email already exists BEFORE hashing
    let existingUser = await User.findOne({ email });
    if(existingUser){
      return res.send("Email already registered");
    }

    // hashing (no callback hell 🔥)
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      username,
      email,
      password: hashedPassword,
      age
    });

    // create jwt
    const token = jwt.sign(
      { email }, 
      "???",
      { expiresIn: "7d" }   // optional expiry
    );

    // set cookie securely
    res.cookie("token", token, {
      httpOnly:true,
      sameSite:"strict"
    });

    // redirect to dashboard
    res.redirect("/dashboard");

  }catch(err){
    console.log(err);
    res.send("Something went wrong 😔");
  }
});


app.get('/logout' , (req,res)=>{
  res.cookie("token" , "")
  res.redirect('/login')
})

app.get('/login' , (req,res)=>{
  res.render('login')
})

app.post('/login' , async (req,res)=>{
  let user = await User.findOne({email:req.body.email})

  if(!user) return res.send("Wrong Credentials")

  bcrypt.compare(req.body.password , user.password , (err , result)=>{
    if(result){
      let token = jwt.sign({email:user.email} , "???");
      res.cookie("token" , token)
      res.redirect("/dashboard")
    }
    else {
      res.send("wrong Credentials")
    }
  })
})


app.get('/dashboard' , requireLogin ,noCache , async function (req,res){
   

  let files  =  await File.find({email: req.user.email});

    const user = await User.findOne({ email: req.user.email });
res.render("index", { files: files, user: user });

   
})

app.post('/createNotes' ,requireLogin,noCache,async function (req,res){
  const token = req.cookies.token;
  const data = jwt.verify(token, "???")
  

await File.create({
    name :  req.body.title,
    data : req.body.body,
    email: data.email
  })
    res.redirect('/dashboard')
})

app.get('/file/:filename' , requireLogin,noCache,async function (req,res){

    let user = await File.findOne({_id:req.params.filename , email:req.user.email})

    // console.log(user)
       
        res.render("show",{filename:user , filedata: user});
    
})

  app.get('/edit/:filename' ,requireLogin,noCache, async function (req,res){

     let user = await File.findOne({_id:req.params.filename , email:req.user.email})

     console.log(user)
       
        res.render("edit",{filename:user.name , filedata: user.data});
    
})

app.post('/edit' ,requireLogin,noCache, async (req,res)=>{

await File.findOneAndUpdate({ name: req.body.filename} , {data : req.body.filedata} , {new : true})
    res.redirect('/dashboard')

})

app.get('/delete/:filename' , requireLogin,noCache,async function (req,res){

     let user = await File.findOneAndDelete({_id:req.params.filename , email:req.user.email})
       console.log(user)
        res.redirect("/dashboard")
    
})

















app.listen(3000);
