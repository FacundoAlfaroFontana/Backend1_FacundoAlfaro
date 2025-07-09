import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';
import __dirname from './utils.js';


import connectDB from './db.js';

const app = express();
const PORT = 8080;

connectDB();


app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const productManager = new ProductManager('src/productos.json');

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const io = new Server(server);

io.on('connection', socket => {
  console.log('Cliente conectado por socket.io');

  socket.on('newProduct', async (data) => {
    await productManager.addProduct(data);
    const products = await productManager.getProducts();
    io.emit('updateProducts', products);
  });

  socket.on('deleteProduct', async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.emit('updateProducts', products);
  });
});

export { io };
