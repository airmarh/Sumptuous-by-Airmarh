import cloudinary from 'cloudinary'
import productModel from '../models/productModel.js'

export const addProduct = async(req, res) => {
    try{
        const {name, price, description, category} = req.body
        const image = req.file;
        let imageUrl = ""
        if(image){
            let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'})
            imageUrl = result.secure_url
        }else{
            imageUrl = "https://via.placeholder.com/150"
        }

        const productRequest = {
            name, description, category, 
            price: Number(price), 
            image: imageUrl,
            date: Date.now()
        }
        
        const product = new productModel(productRequest)
        await product.save()

        res.status(201).json({success:true, message: "Product added successfully!"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot add product"})
    }
}

export const getAllProducts = async(req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success:true, message: "Products retrieved successfully", products: products})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot retrieve products"})
    }
}

export const removeProduct = async(req, res) => {
    try{
        if(!req.body._id){
            return res.status(400).json({success:false, message: "Product id is required"})
        }
        await productModel.findByIdAndDelete(req.body._id);
        res.json({success:true, message: "Product removed"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot remove product"})
    }
    
}

export const getProduct = async(req, res) => {
    try{
        if(!req.body._id){
            return res.status(400).json({success:false, message: "Product id is required"})
        }
        const product = await productModel.findById(req.body._id);
        res.json({success:true, message: "Product retrieved", product: product})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot get product information"})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body
        const updateData = { name, description, price, category }
        if (req.file) updateData.image = req.file.path

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )

        if (!product)
            return res.json({ success: false, message: 'Product not found' })

        res.json({ success: true, message: 'Product updated successfully', product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Cannot update product" })
    }
}