import User from "../models/user.model.js";
import { errorHandler } from "../utills/error.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// export const signup = async (req, res,next) => {
//   const { username, email, password } = req.body;
//   const hashPassword = await bcryptjs.hash(password, 10);
//   const newUser = new User({ username, email, password:hashPassword });

//   try {
//     await newUser.save();
//     res.status(201).send({
//       message: "User created successfully",
//     });
//   } catch (err) {
//     next(err);
    
  
//   }
// };

// export const signin = async(req, res,next) => {
//   const { email, password } = req.body;
//   try{
//     const validUser = await User.findOne({ email });
//     if(!validUser) return next(errorHandler(404,'user not found'));
//     const validPassword = bcryptjs.compareSync(password,validUser.password);
//     if(!validPassword) return next(errorHandler(401,'wrong credentials'));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: hashPassword, ...rest } = validUser._doc;
//     const expiryDate = new Date(Date.now() + 3600000); 
//     res.cookie('token',token,
//     {
//       httpOnly:true,
//       expires: expiryDate,
//     }).status(200).send(rest);
  
    
//   }catch(err){
//     next(err);
//   }
// };



// export const signup = async (req, res, next) => {
//   const { username, email, password, role } = req.body;

//   try {
//     // Check if the provided role is valid
//     if (role && !['admin', 'user'].includes(role)) {
//       return next(errorHandler(400, 'Invalid role'));
//     }

//     const hashPassword = await bcryptjs.hash(password, 10);

//     // Create a new user with the specified role or default to 'user'
//     const newUser = new User({
//       username,
//       email,
//       password: hashPassword,
//       role: role || 'user',
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).send({
//       message: 'User created successfully',
//     });
//   } catch (err) {
//     next(err);
//   }
// };


export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password, contact, course, profilePicture, role } = req.body;

  try {
    // Check if the provided role is valid
    if (role && !['admin', 'user'].includes(role)) {
      return next(errorHandler(400, 'Invalid role'));
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    // Create a new user with the specified role or default to 'user'
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      contact,
      course,
      profilePicture,
      role: role || 'user',
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send({
      message: 'User created successfully',
    });
  } catch (err) {
    next(err);
  }
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong credentials'));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Check if the user has the role "admin"
    const isAdmin = validUser.role === 'admin';

    // Include the role in the token payload if the user is an admin
    const tokenPayload = isAdmin ? { id: validUser._id, role: 'admin' } : { id: validUser._id };

    const { password: hashPassword, ...rest } = validUser._doc;

    // Set the role as "admin" in the response if the user is an admin
    const responseData = isAdmin ? { ...rest, role: 'admin' } : rest;

    res.cookie('token', token, {
      httpOnly: true,
    }).status(200).send(responseData);
  } catch (err) {
    next(err);
  }
};




export const google = async(req, res,next) => {
  try{
    const user = await User.findOne({ email: req.body.email});
    if(user){
      const token = jwt.sign({ id: user._id},process.env.JWT_SECRET);
      const { password: hashPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie('token',token,{
        httpOnly:true,
        expires: expiryDate
      }).status(200).send(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase(),
        email: req.body.email,
        password: hashPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id},process.env.JWT_SECRET);
      const { password: hashPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res.cookie('token',token,{
        httpOnly:true,
        expires: expiryDate
      }).status(200).send(rest);
    }
  }catch(err){
    next(err);
  }

};
export const signout = async(req, res,next) => {
  res.clearCookie('token').status(200).send({
    message: "User signed out successfully"
  });

}

export const forgotpassword = async (req, res,next) => {
  try{
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return next(errorHandler(404,'user not found'));  
   // Generate a temporary password
   const tempPassword = Math.random().toString(36).slice(-8);

   // Hash the temporary password
   const hashedPassword = await bcryptjs.hash(tempPassword, 10);

   // Update the user's password in the database
   await User.updateOne({ email }, { password: hashedPassword });
   await User.updateOne({ email }, { password: hashedPassword });

    // Send the temporary password to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'shafyali@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your temporary password is: ${tempPassword}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset successful. Check your email for the temporary password.' });


  }catch(err){
    next(err);
  }
}
