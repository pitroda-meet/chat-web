import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;
    if (!fullName || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const mailProfilePicture = `https://avatar.iran.liara.run/public/boy`;
    const femailProfilePicture = `https://avatar.iran.liara.run/public/girl`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePhoto:
        gender === "male" ? mailProfilePicture : femailProfilePicture,
      gender,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const verifyUser = async (req) => {
  try {
    if (req.id) {
      return res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });

    console.error(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Fix cross-domain issues
      })
      .json({
        message: "Logged in successfully",
        success: true,
        token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addContact = async (req, res) => {
  try {
    const { contactEmail } = req.body;

    if (!contactEmail) {
      return res
        .status(400)
        .json({ message: "Contact email is required", success: false });
    }

    const user = await User.findById(req.id);
    const contact = await User.findOne({ email: contactEmail });

    if (!contact) {
      return res.status(404).json({
        message: "The entered email is not registered",
        success: false,
      });
    }

    if (user.contacts.includes(contact._id)) {
      return res
        .status(400)
        .json({ message: "Contact already added", success: false });
    }

    user.contacts.push(contact._id);
    await user.save();

    contact.contacts.push(req.id);
    await contact.save();

    res.status(200).json({
      message: "Contact added successfully",
      success: true,
      contact: {
        _id: contact._id,
        email: contact.email,
        fullName: contact.fullName,
        profilePhoto: contact.profilePhoto,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const contactUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate(
      "contacts",
      "fullName email profilePhoto"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ contacts: user.contacts });
  } catch (error) {
    console.error(error);
  }
};
