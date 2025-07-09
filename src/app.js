import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import Product from './models/Product.js'; // ✅ Ahora usamos el modelo Mongoose
import __dirname from './utils.js';
import connectDB from './db.js';

const app = express();
const PORT = 8080;

// ✅ Conectamos a MongoDB
connectDB();

// ✅ Configuramos Handlebars como motor de plantillas
app.engine('handlebars', engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// ✅ Middleware para archivos estáticos y JSON
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

// ✅ Usamos los routers para API y vistas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// ✅ Levantamos el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// ✅ Configuramos Socket.io
const io = new Server(server);

// ✅ Flujo en tiempo real, ahora 100% con MongoDB
io.on('connection', socket => {
  console.log('Cliente conectado por socket.io');

  // Crear producto en Mongo y emitir lista actualizada
  socket.on('newProduct', async (data) => {
    try {
      await Product.create(data);
      const products = await Product.find().lean();
      io.emit('updateProducts', products);
    } catch (error) {
      console.error('Error al crear producto vía socket:', error);
    }
  });

  // Eliminar producto de Mongo y emitir lista actualizada
  socket.on('deleteProduct', async (id) => {
    try {
      await Product.findByIdAndDelete(id);
      const products = await Product.find().lean();
      io.emit('updateProducts', products);
    } catch (error) {
      console.error('Error al eliminar producto vía socket:', error);
    }
  });
});


export { io };
