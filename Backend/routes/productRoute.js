const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/permitTo");

const router = require("express").Router();
const { multer, storage } = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const upload = multer({ storage: storage });

// router.post("/products",createProduct)
// router.get("/products",getProducts)

router
  .route("/products")
  .post(
    isAuthenticated,
    restrictTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(getProducts));

router.route("/products/:id").get(catchAsync(getProduct));

module.exports = router;