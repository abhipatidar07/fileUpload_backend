const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});


//post middleware db me entry dalne ke bad jo middleware dalte he wo post middleware hota he
fileSchema.post("save", async function(doc){
    try {
        console.log("DOC", doc)
        //transporter
        let transporter = nodemailer.transporter({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send email
        let info = await transporter.sendMail({
            from:`Abhishek`,
            to: doc.email,
            subject: "New File Uploaded on CLoudinary",
            html: `<h2>Hello Jee</h2> <p> File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        console.log(info);
    } catch (error) {
        console.error(error);
    }
})
const File = mongoose.model("File",fileSchema);
module.exports = File;