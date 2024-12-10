const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Db Connection Successful")
    )
    .catch((error)=>{
        console.log("DB Connection Issue");
        console.error(error);
        process.exit(1);
    })
}