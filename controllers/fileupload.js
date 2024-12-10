const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload --> handlerfunction create krna he

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file from request
    const file = req.files.file;
    console.log("File agayi jii", file);
    //__dirname defines the current directory of the file just like our cuurent directory now is constollers
    //create path where file needs to store in server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; //this is server's path
    console.log("PATH->", path);

    //Add path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log("Not able to upload file on server");
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
  const options = { folder };
  console.log("temp file path",file.tempFilePath);

  if(quality){
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload karne ka handler

exports.imageUpload = async (req, res) => {
  try {
    //step-1 data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }
    //file formate supported hai
    const response = await uploadFileToCloudinary(file, "Abhishek");
    console.log(response);
    //DB ke anadar entry save krni he
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uloaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//vedio upload ka handler yha lilk rhe he
exports.vedioUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.vediofile;
    console.log(file);

    //TODO: add a upper limit of 5mb for vedio

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type" ,fileType);
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }
    //file formate supported hai
    const response = await uploadFileToCloudinary(file, "Abhishek");
    console.log(response);
    //DB ke anadar entry save krni he
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Vedio successfully uloaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//image reducer

exports.imageSizeReducer = async (req,res) =>{
    try {
       //step-1 data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type:", fileType);

    //TODO: add a upper limit of 
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File formate not supported",
      });
    }
    //file formate supported hai
    const response = await uploadFileToCloudinary(file, "Abhishek",90);
    console.log(response);
    //DB ke anadar entry save krni he
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image successfully uloaded",
    }); 
    } catch (error) {
        
    }
}