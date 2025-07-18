import fs  from 'fs';
import dotenv from 'dotenv';
import Product from '../../Models/product.js';
import connectDB from '../../DataBase/connectDB.js';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'product.json');
const products = JSON.parse(fs.readFileSync(filePath));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);
    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
