const Product = require('../models/Products');

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al crear el producto' });
    }
  },

  async getAll(req, res) {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al obtener productos' });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send({ message: 'Producto no encontrado' });
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error al obtener el producto' });
    }
  },

async getProductsByName(req, res) {
   try {
     const name = new RegExp(req.params.name, 'i')
     const products = await Product.find({ name })
     res.send(products)
   } catch (error) {
     console.log(error)
   }
 },
   async getProductsByName(req, res) {
   try {
     if (req.params.name.length > 20) {
       return res.status(400).send('Búsqueda demasiado larga')
     }
     const name = new RegExp(req.params.name, 'i')

     const products = await Product.find({ 
      $text: {
        $search: req.params.name,
      },
     })
     res.send(products)
   } catch (error) {
     console.log(error)
   }
 },

  async delete(req, res) {
   try {
     const product = await Product.findByIdAndDelete(req.params._id)
     res.send({ product, message: 'Product deleted' })
   } catch (error) {
     console.error(error)
     res.status(500).send({
         message: 'there was a problem trying to remove the product',
       })
   }
  },

   async update(req, res) {
   try {
     const product = await Product.findByIdAndUpdate(
       req.params._id,
       req.body,
       { new: true }
     )
     res.send({ message: 'product successfully updated', product })
   } catch (error) {
     console.error(error)
   }
 },

};

module.exports = ProductController;
