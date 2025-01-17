const express = require("express");
const { connectDatabase } = require("./database/database");
const app = express();
const cors = require("cors");

//ROUTES HERE
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/productRoute");
const adminUsersRoute = require("./routes/admin/adminUsersRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");
const profileRoute = require("./routes/user/profileRoute");
const cartRoute = require("./routes/user/cartRoute");
const orderRoute = require("./routes/user/orderRoute");
const adminOrdersRoute = require("./routes/admin/adminOrderRoute");
const paymentRoute = require("./routes/user/paymentRoute");

//Routes end here

app.use(
  cors({
    origin: "*",
  })
);

// TELL NODE TO USE DOTENV
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// telling nodejs to give access to uploads folder
app.use(express.static("./uploads"));

//DATABASE CONNECTION
connectDatabase(process.env.MONGO_URL);

//test api to check if server is live or not
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/admin", adminUsersRoute);
app.use("/api/reviews", userReviewRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin", adminOrdersRoute);
app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT;
//listen server
app.listen(PORT, () => {
  console.log(`Server has started at PORT ${PORT} `);
});
