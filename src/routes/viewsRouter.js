const express = require("express");
const ProductModel = require("../dao/models/Product.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 5, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      if (query === "available") filter.status = true;
      else filter.category = query;
    }

    
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      lean: true, 
    };

    const result = await ProductModel.paginate(filter, options);
    console.log(result.docs);
    res.render("home", {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      currentPage: result.page,
      totalPages: result.totalPages,
      prevLink: result.hasPrevPage ? `/?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error(" Error al obtener productos:", error);
    res.status(500).send("Error al cargar los productos");
  }
});

module.exports = router;
