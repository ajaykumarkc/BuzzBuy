const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");


//Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

    const{name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });

    sendToken(user,201,res);
});

//Login User

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const{email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or password",401))
    }

    const isPassWordMatched = await user.passwordCompare(password)

    if(!isPassWordMatched){
        return next(new ErrorHandler("Invalid Email or password",401))
    }

    sendToken(user,200,res);

 

})

//LogOut User

exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged out",
    })
})

//Get User Details

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })

})


//update password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPassWordMatched = await user.passwordCompare(req.body.oldPassword);

    if(!isPassWordMatched){
        return next(new ErrorHandler("old password doesnt match",401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler(" password doesnt match",401));
    }

    user.password = req.body.newPassword

    await user.save();

    sendToken(user,200,res)

})

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

//Get all users(Admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })

})


//Get single users(Admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User doesnt exist",402));
    }

    res.status(200).json({
        success:true,
        user
    })
})

//update user role admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        user
    })
});


//delete user Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    let user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User Not Found",404));
     }

   
    else {
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);
        user = await User.findByIdAndDelete(req.params.id);
        
        res.json({
        success:true,
        message:"User is deleted"
       })}
})
