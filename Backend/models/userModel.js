const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minlength:[3,"Name has to be more than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your E-Mail"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid E-Mail"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[6,"Name has to be more than 6 characters"],
        select:false
    },
    avatar:{
        
            public_id:{
                type:String,
                required:true
    
            },
            url:{
                type:String,
                required:true
    
            }
        
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//JWT TOKEN

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
};

userSchema.methods.passwordCompare = async function(enteredPassword){
   return bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+ 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema);