import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Definimos la estructura que va a tener cada producto en la base de datos
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },           // Nombre del producto
  description: { type: String, required: true },     // Detalle o descripción
  code: { type: String, required: true, unique: true }, // Código único para identificar el producto
  price: { type: Number, required: true },           // Precio en moneda local
  status: { type: Boolean, default: true },          // Activo/inactivo (por defecto está activo)
  stock: { type: Number, required: true },           // Cantidad disponible
  category: { type: String, required: true },        // Categoría para agrupar productos
  thumbnails: { type: [String], default: [] }        // Imágenes del producto (URLs)
});

// Habilitamos paginación para consultas más eficientes en listas grandes
productSchema.plugin(paginate);

// Creamos y exportamos el modelo para usarlo en otras partes del proyecto
const Product = mongoose.model('Product', productSchema);
export default Product;

