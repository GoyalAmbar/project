import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register user
export const register = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      photo
    });

    await newUser.save();
    res.status(200).json({ success: true, message: 'Successfully created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create. Try again', error: err.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // if user exists, check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }

    const { password: pw, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '15d'
    });

    // set token in browser cookies and send response
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).status(200).json({ token, data: { ...rest }, role, message: 'Successfully login' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to login', error: err.message });
  }
};
