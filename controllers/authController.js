const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Userr already exist with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "user registered successfully",
        userId: user.id,
      });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while registering user" });
  }
};

exports.loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "Please fill all the fields"});
        }

        const user = await User.findOne({where : {email}});

        if(!user){
            return res.status(400).json({success : false,message : "Invalid email or password"});
        }

        const match = await bcrypt.compare(password,user.password);
        
        if(!match){
            return res.status(401).json({success : false ,message : "Invalid email or password"});
        }

        const token = jwt.sign({userId : user.id, role : user.role}, process.env.JWT_SECRET , {expiresIn : "1d"});

        res.status(200).json({success : true, message : "Login successful", token , user : {name: user.name,email : user.email, userId : user.id, role : user.role}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Error occurred while logging in"});
    }
}