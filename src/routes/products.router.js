import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();


router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    const filter = {};
    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: {}
    };

    if (sort === 'asc') options.sort.price = 1;
    if (sort === 'desc') options.sort.price = -1;

    const result = await Product.paginate
      ? await Product.paginate(filter, options)
      : await Product.find(filter)
          .limit(options.limit)
          .skip((options.page - 1) * options.limit)
          .sort(options.sort);

    if (result.docs) {
      res.json({
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        nextPage: result.hasNextPage ? result.nextPage : null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
      });
    } else {
      res.json({
        status: 'success',
        payload: result,
        totalPages: 1,
        prevPage: null,
        nextPage: null,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null
      });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', detail: error.message });
  }
});

router.get('/', async (req, res) => {
  try {

    const { limit = 10, page = 1, query, sort } = req.query;

    const filter = {};
    if (query) {
      if (query === 'true' || query === 'false') {
        filter.status = query === 'true';
      } else {
        filter.category = query;
      }
    }


    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: {}
    };

    if (sort === 'asc') options.sort.price = 1;
    if (sort === 'desc') options.sort.price = -1;

    const result = await Product.paginate(filter, options);


    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al paginar productos', detail: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', detail: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    updated
      ? res.json(updated)
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', detail: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);
    deleted
      ? res.json({ message: 'Producto eliminado' })
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', detail: error.message });
  }
});

export default router;
