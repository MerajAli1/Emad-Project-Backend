import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Product } from "../models/Product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const ProductList = asyncHandler(async (req, res) => {
    //Getting product Detail from frontend
    const { category, price, description, title, product_id } = req.body

    //checking validation
    if (!category || !price || !description || !title || !product_id) {
        throw new ApiError(400, "All fields are required....")
    }

    //Validation For Unique Product Id
    const existingProduct = await Product.findOne({ product_id: product_id });
    if (existingProduct) {
        throw new ApiError(400, "product id must be unique...");
    }
    const imageLocalPath = req.files?.image[0]?.path
    if (!imageLocalPath) {
        throw new ApiError(400, "image is required...")
    }

    const image = await uploadOnCloudinary(imageLocalPath)
    if (!image) {
        throw new ApiError(400, "image field is required...")
    }

    const product = Product.create({
        category,
        price,
        description,
        title,
        product_id,
        image: image
    })

    return res.status(201).json(
        new ApiResponse(200, product, "Product upload successfully...")
    )

})

const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const singleProduct = await Product.findById({ _id: id })

    //Checking if product is not found
    if (!singleProduct) {
        return res.status(404).json(
            new ApiResponse(404, null, "Product not found")
        )
    }
    return res.status(200).json(
        new ApiResponse(200, singleProduct, "single product retreive successfully..")
    )
})

const getProduct = asyncHandler(async (req, res) => {

    const productGet = await Product.find({})
    return res.status(200).json(
        new ApiResponse(200, productGet, "product retreive successfully..")
    )

})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const update = req.body; // This should be the update you want to apply to the product
    const productUpdate = await Product.findByIdAndUpdate(id, update, { new: true });
    console.log(id);
    return res.status(200).json(
        new ApiResponse(200, productUpdate, "product Updated successfully..")
    )
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const productDel = await Product.findByIdAndDelete({_id:id})
    return res.status(200).json(
        new ApiResponse(200, productDel, "product Deleted successfully..")
    )
})

export {
    ProductList,
    getProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
