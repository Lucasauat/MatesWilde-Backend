const ProductModel = require("./models/Product.js");

class ProductMongoManager {
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const filter = query
      ? { $or: [{ category: query }, { status: query === "true" }] }
      : {};

    const sortOption = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};
    const skip = (page - 1) * limit;

    const totalDocs = await ProductModel.countDocuments(filter);
    const products = await ProductModel.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}` : null,
    };
  }

  async addProduct(product) {
    const requiredFields = ["title", "description", "code", "price", "stock", "category"];
    for (const field of requiredFields) {
      if (!product[field]) throw new Error(`Falta el campo obligatorio: ${field}`);
    }

    const exists = await ProductModel.findOne({ code: product.code });
    if (exists) throw new Error("Código duplicado");

    const newProduct = await ProductModel.create(product);
    return newProduct;
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async updateProduct(id, updates) {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductMongoManager;
