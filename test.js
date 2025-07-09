import connectDB from './src/db.js';
import Product from './src/models/Product.js';

const test = async () => {
  await connectDB();

  const nuevo = await Product.create({
    title: 'Test Product Atlas',
    description: 'Producto de prueba en Atlas',
    code: 'TEST123',
    price: 999,
    stock: 5,
    category: 'pruebas'
  });

  console.log('✅ Producto creado:', nuevo);
};

test();
