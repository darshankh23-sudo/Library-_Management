import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const User = (await import('./models/User.js')).default;
    
    // Delete existing admin
    await User.deleteOne({ email: 'admin@library.com' });
    console.log('🗑️ Removed existing admin');
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@library.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('\n✅ ADMIN CREATED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: admin@library.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━\n');
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();