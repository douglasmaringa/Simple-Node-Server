const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

//db connection 
mongoose.connect('mongodb+srv://admin:admin@cluster0.qwahu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true })
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db is connected successfully")
});

//middleware 
const app = express();
app.use(express.json());
app.use(cors());

//import routes
const postRoute = require("./routes/post");

//Route Middlewares
app.use("/api/post", postRoute);

//server now on and listening to server 
app.listen(5000,()=> console.log("server started on port 5000"))