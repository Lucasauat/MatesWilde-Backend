const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;


const productSchema = new mongoose.Schema(
   {
    title: String,
    description: String,
    code: { type: String, unique: true },
    price: Number,
    status: { type: Boolean, default: true },
    stock: Number,
    category: String,
    thumbnails: [String]
  },
  { timestamps: true },
  {collection: 'products'}
);

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
