import jwt from 'jsonwebtoken';


export const auth = (req, res, next) => {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ error: 'No token provided' });


try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = { id: payload.id, role: payload.role };
next();
} catch {
return res.status(401).json({ error: 'Invalid or expired token' });
}
};


export const authorize = (...roles) => (req, res, next) => {
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
next();
};