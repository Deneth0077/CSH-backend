import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Category from '../models/Category.js';

dotenv.config();

// Sample data
const categories = [
  {
    name: 'Software & Apps',
    description: 'Professional software and applications',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'MS Office Keys',
    description: 'Microsoft Office licenses and keys',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Windows Keys',
    description: 'Windows operating system licenses',
    image: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'PC Games',
    description: 'Latest PC games and gaming software',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Cracked',
    description: 'Utilities and system tools',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories imported!');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Microsoft Office 365',
        description: 'Complete productivity suite with Word, Excel, PowerPoint, and more',
        price: 2999,
        category: createdCategories[1]._id, // MS Office Keys
        image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 100,
        tags: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneNote', 'Teams'],
        features: ['Word', 'Excel', 'PowerPoint', 'Outlook', 'OneNote', 'Teams'],
        systemRequirements: ['Windows 10 or later', '4GB RAM', '4GB storage'],
        featured: true
      },
      {
        name: 'Windows 11 Pro',
        description: 'Latest Windows operating system with enhanced security and productivity',
        price: 8999,
        category: createdCategories[2]._id, // Windows Keys
        image: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 80,
        tags: ['Enhanced Security', 'Virtual Desktops', 'Microsoft Teams', 'Widgets'],
        features: ['Enhanced Security', 'Virtual Desktops', 'Microsoft Teams', 'Widgets'],
        systemRequirements: ['TPM 2.0', '8GB RAM', '64GB storage'],
        featured: true
      },
      {
        name: 'Adobe Creative Suite',
        description: 'Professional creative tools for designers and artists',
        price: 15999,
        category: createdCategories[0]._id, // Software & Apps
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 50,
        tags: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects'],
        features: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects'],
        systemRequirements: ['16GB RAM', '20GB storage', 'Graphics card required'],
        featured: true
      },
      {
        name: 'Cyberpunk 2077',
        description: 'Open-world action-adventure RPG set in Night City',
        price: 1999,
        category: createdCategories[3]._id, // PC Games
        image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 60,
        tags: ['Open World', 'RPG Elements', 'Cyberpunk Setting', 'Character Customization'],
        features: ['Open World', 'RPG Elements', 'Cyberpunk Setting', 'Character Customization'],
        systemRequirements: ['GTX 1060', '12GB RAM', '70GB storage'],
        featured: true
      },
      {
        name: 'Malware Removal Tool',
        description: 'Advanced malware detection and removal software',
        price: 999,
        category: createdCategories[4]._id, // Cracked
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 120,
        tags: ['Real-time Protection', 'Virus Scan', 'Malware Removal', 'System Optimization'],
        features: ['Real-time Protection', 'Virus Scan', 'Malware Removal', 'System Optimization'],
        systemRequirements: ['Windows 7 or later', '2GB RAM', '500MB storage'],
        featured: false
      },
      {
        name: 'Video Editor Pro',
        description: 'Professional video editing software with advanced features',
        price: 4999,
        category: createdCategories[0]._id, // Software & Apps
        image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
        stock: 70,
        tags: ['4K Editing', 'Color Correction', 'Audio Mixing', 'Effects Library'],
        features: ['4K Editing', 'Color Correction', 'Audio Mixing', 'Effects Library'],
        systemRequirements: ['16GB RAM', '10GB storage', 'Dedicated GPU'],
        featured: false
      }
    ];

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log('Products imported!');

    // Create sample orders
    const sampleOrders = [
      {
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567'
        },
        items: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].name,
            image: createdProducts[0].image,
            price: createdProducts[0].price,
            quantity: 1,
            total: createdProducts[0].price
          }
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        status: 'pending',
        paymentMethod: 'credit_card'
      },
      {
        customer: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 (555) 987-6543'
        },
        items: [
          {
            product: createdProducts[2]._id,
            name: createdProducts[2].name,
            image: createdProducts[2].image,
            price: createdProducts[2].price,
            quantity: 2,
            total: createdProducts[2].price * 2
          }
        ],
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90210',
          country: 'USA'
        },
        status: 'completed',
        paymentMethod: 'paypal'
      }
    ];

    await Order.insertMany(sampleOrders);
    console.log('Orders imported!');

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}