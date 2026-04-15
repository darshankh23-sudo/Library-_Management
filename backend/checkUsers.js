import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    const User = (await import('./models/User.js')).default;
    const users = await User.find({});
    
    console.log('Users in database:');
    console.log('------------------');
    
    if (users.length === 0) {
      console.log('No users found!');
    } else {
      users.forEach(user => {
        console.log(`Email: ${user.email}`);
        console.log(`Role: ${user.role}`);
        console.log(`Name: ${user.name}`);
        console.log('------------------');
      });
    }
    
    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkUsers();