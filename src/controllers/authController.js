import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';


const signToken = (user) =>
jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });


export const register = async (req, res) => {
const { name, email, password } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ error: 'Email already registered' });
const user = await User.create({ name, email, password });
const token = signToken(user);
res.status(201).json({ user, token });
};


export const login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await user.comparePassword(password);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
if (!user.isActive) return res.status(403).json({ error: 'Account disabled' });
const token = signToken(user);
res.json({ user, token });
};


export const me = async (req, res) => {
const user = await User.findById(req.user.id);
res.json({ user });
};