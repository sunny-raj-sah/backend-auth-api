import { User } from '../models/User.js';


export const listUsers = async (req, res) => {
const page = Math.max(1, parseInt(req.query.page || '1', 10));
const limit = Math.min(100, parseInt(req.query.limit || '10', 10));
const skip = (page - 1) * limit;
const [items, total] = await Promise.all([
User.find().select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
User.countDocuments()
]);
res.json({ page, limit, total, items });
};


export const getUser = async (req, res) => {
const user = await User.findById(req.params.id).select('-password');
if (!user) return res.status(404).json({ error: 'Not found' });
res.json({ user });
};


export const updateUser = async (req, res) => {
const updates = {};
if (typeof req.body.role !== 'undefined') updates.role = req.body.role;
if (typeof req.body.isActive !== 'undefined') updates.isActive = req.body.isActive;
const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
if (!user) return res.status(404).json({ error: 'Not found' });
res.json({ user });
};


export const deleteUser = async (req, res) => {
const user = await User.findByIdAndDelete(req.params.id);
if (!user) return res.status(404).json({ error: 'Not found' });
res.json({ success: true });
};