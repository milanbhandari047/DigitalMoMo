const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const permitTo = require("../middleware/permitTo");

const router = require("express").Router();
const { multer, storage } = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const upload = multer({ storage: storage });

router
  .route("/products")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(getProducts));

router
  .route("/products/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, permitTo("admin"), catchAsync(deleteProduct))
  .patch(isAuthenticated, permitTo("admin"),  upload.single("productImage"),catchAsync(editProduct));

module.exports = router;
