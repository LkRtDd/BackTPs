const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const PORT = 3000;

const productManager = new ProductManager('./src/Products.js'); 

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getProducts(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
