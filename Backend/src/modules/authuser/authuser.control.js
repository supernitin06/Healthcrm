import { registerUser, loginUser } from "./authuser.service.js";
import jwt from "jsonwebtoken";
import { sendemail } from "../../../utils/email.js";


export const registerUserController = async (req, res) => {
  try {
    const creator = req.user || null;

    const user = await registerUser(req.body, creator);
    
    if (user) {
      try {
        await sendemail(
          user.email,
          `
          <h2>Hello ${user.username}</h2>
          <p>Your account has been created successfully.</p>
          <p>Thanks for joining us 🚀</p>
          `
        );
        console.log(`✅ Registration email sent successfully to ${user.email}`);
      } catch (emailError) {
        // Log email error but don't fail registration
        console.error(`⚠️ Registration successful but email failed for ${user.email}:`, emailError.message);
        // You can choose to still return success or include a warning
        // For now, we'll return success but log the email failure
      }
    }


    

    res.status(201).json({
      ...user,
      message: 'User registered successfully'
    });

  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export const forgotPasswordController = async (req,res){
//   try {
    
//   } catch (error) {
    
//   }
// }