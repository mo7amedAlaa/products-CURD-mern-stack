import Product from "../models/product.model.js";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

}
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const product = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, product, { new: true });
        res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}