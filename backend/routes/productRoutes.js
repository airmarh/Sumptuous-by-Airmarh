import express from 'express'
import { addProduct, getProduct, getAllProducts, removeProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router();

productRouter.post('/add', upload.single("image"), adminAuth, addProduct);
productRouter.get('/getAll', getAllProducts);
productRouter.delete('/remove', adminAuth, removeProduct);
productRouter.get('/get', getProduct);
productRouter.put('/update/:id', adminAuth, upload.single('image'), updateProduct);

export default productRouter