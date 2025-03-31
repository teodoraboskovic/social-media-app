const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path")
const nodemailer = require('nodemailer');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const filterRoute = require("./routes/filter");
const passwordRoute = require("./routes/password");
const timelineRoute = require("./routes/timeline");
const commentRoute = require("./routes/comment");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
//     console.log("Connected to MongoDB")
// });

mongoose.connect(process.env.MONGO_URL);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/images")
    },
    filename: (req,file,cb)=>{
        try{
            console.log(">>>>>>STIGLO: " + req.body.name)
            cb(null, req.body.name)
        }catch(err){
            console.log("SERVER OTISAO" + err)
        }
        
    }
})

const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("FIle je uspesno uploadovan!")
    } catch (error) {
        console.log(error)
    }
})


// Konfiguracija transporter-a za slanje emaila
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'freespech87@gmail.com',
      pass: '^mw&3qzF5!5p2o@a'
    }
  });
  
  // Opcije emaila
  const mailOptions = {
    from: 'krkicandrej@yahoo.com',
    to: 'andrejkrkic46@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using nodemailer.'
  };
  
  

  app.get("/api/forgot", (req, res)=>{
    try {
       

        // Slanje emaila
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).json(error + " greskaa")
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json("poslato");
    }
  });
    } catch (error) {
        console.log(error)
        res.status(500).json(err + " greskaa")
    }
})

// app.use(authMiddleware); //ovde koristimo globalni middleware

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/filter", filterRoute);
app.use("/api/password", passwordRoute);
app.use("/api/timeline", timelineRoute);
app.use("/api/comment", commentRoute);


app.listen(8800, ()=>{
    console.log("Backend server je pokrenut!")
} )