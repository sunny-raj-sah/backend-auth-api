// scripts/seedAdmin.js
import 'dotenv/config';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';

(async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Load env values
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    // 3. Check if admin exists
    let admin = await User.findOne({ email });

    if (!admin) {
      // User model pre-save hook will hash the password automatically
      admin = await User.create({
        name: 'Super Admin',
        email,
        password,
        role: 'admin',
      });
      console.log('✅ Admin created successfully:', admin.email);
    } else {
      console.log('ℹ️ Admin already exists:', admin.email);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Admin seeding failed:', err.message);
    process.exit(1);
  }
})();
