//app create
//port find krna he
//middleware add karna he
//db se connect karna he
//cloud se connect krna he
//api route mount krna he
//server activate krna he

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/ '
}));

const db = require('./config/database');
db.connect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);

app.listen(PORT, ()=>{
    console.log(`Server is live at port ${PORT}`);
})

