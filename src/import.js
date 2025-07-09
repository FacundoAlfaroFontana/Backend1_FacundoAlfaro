import connectDB from './db.js';
import Product from './models/Product.js';

const productos = [
  {
    "title": "Laptop Gamer",
    "description": "Laptop con RTX 3060",
    "code": "LAP001",
    "price": 2500,
    "status": true,
    "stock": 5,
    "category": "Computadoras",
    "thumbnails": []
  },
  {
    "title": "Auriculares Bluetooth",
    "description": "Auriculares inalámbricos",
    "code": "AUR002",
    "price": 120,
    "status": true,
    "stock": 20,
    "category": "Audio",
    "thumbnails": []
  },
  {
    "title": "Monitor 27\"",
    "description": "Monitor 4K UHD",
    "code": "MON003",
    "price": 400,
    "status": true,
    "stock": 10,
    "category": "Monitores",
    "thumbnails": []
  },
  {
    "title": "Teclado Mecánico",
    "description": "Teclado RGB switches azules",
    "code": "TEC004",
    "price": 80,
    "status": true,
    "stock": 15,
    "category": "Periféricos",
    "thumbnails": []
  },
  {
    "title": "Mouse Gamer",
    "description": "Mouse óptico 8000 DPI",
    "code": "MOU005",
    "price": 50,
    "status": true,
    "stock": 30,
    "category": "Periféricos",
    "thumbnails": []
  },
  {
    "title": "Tablet 10\"",
    "description": "Tablet Android 10 pulgadas",
    "code": "TAB006",
    "price": 300,
    "status": true,
    "stock": 8,
    "category": "Tablets",
    "thumbnails": []
  },
  {
    "title": "Impresora Multifunción",
    "description": "Impresora WiFi",
    "code": "IMP007",
    "price": 200,
    "status": true,
    "stock": 12,
    "category": "Oficina",
    "thumbnails": []
  },
  {
    "title": "Smartwatch",
    "description": "Reloj inteligente",
    "code": "SMA008",
    "price": 150,
    "status": true,
    "stock": 25,
    "category": "Wearables",
    "thumbnails": []
  },
  {
    "title": "Cámara de seguridad",
    "description": "Cámara IP WiFi",
    "code": "CAM009",
    "price": 90,
    "status": true,
    "stock": 40,
    "category": "Seguridad",
    "thumbnails": []
  },
  {
    "title": "Smart TV 50\"",
    "description": "Televisor 4K UHD",
    "code": "TV010",
    "price": 700,
    "status": true,
    "stock": 6,
    "category": "Electrodomésticos",
    "thumbnails": []
  },
  {
    "title": "Consola de videojuegos",
    "description": "Consola última generación",
    "code": "CON011",
    "price": 500,
    "status": true,
    "stock": 7,
    "category": "Gaming",
    "thumbnails": []
  },
  {
    "title": "Router WiFi 6",
    "description": "Router dual band",
    "code": "ROU012",
    "price": 130,
    "status": true,
    "stock": 18,
    "category": "Redes",
    "thumbnails": []
  },
  {
    "title": "Disco SSD 1TB",
    "description": "SSD NVMe",
    "code": "SSD013",
    "price": 150,
    "status": true,
    "stock": 22,
    "category": "Almacenamiento",
    "thumbnails": []
  },
  {
    "title": "Memoria RAM 16GB",
    "description": "RAM DDR4",
    "code": "RAM014",
    "price": 80,
    "status": true,
    "stock": 35,
    "category": "Componentes",
    "thumbnails": []
  },
  {
    "title": "Silla Gamer",
    "description": "Silla ergonómica",
    "code": "SIL015",
    "price": 250,
    "status": true,
    "stock": 9,
    "category": "Muebles",
    "thumbnails": []
  }
];

const run = async () => {
  await connectDB();
  await Product.insertMany(productos);
  console.log('✅ Productos insertados en Mongo Atlas');
  process.exit();
};

run();
