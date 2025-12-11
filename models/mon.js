const mongoose = require('mongoose')
 
mongoose.connect('mongodb://127.0.0.1:27017/???');

const userSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String,
   age: Number,
  
});

const fileSchema = new mongoose.Schema({
    email: String, 
    name : String,
    data : String
});

const User = mongoose.model("user" , userSchema);
const File = mongoose.model("file" , fileSchema);

module.exports = { User, File };


