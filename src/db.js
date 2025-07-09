import mongoose from 'mongoose';


const URI = 'mongodb+srv://facu:facu1234@cluster0.abmibb2.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('✅ Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB Atlas:', error);
  }
};

export default connectDB;
