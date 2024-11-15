const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const commentRouter = require("./routes/commentRouter");
const bgImageRouter = require("./routes/bgImageRouter");
const dashBoardRouter = require("./routes/dashBoardRouter");
const path = require("path");


dotenv.config();
//CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to MongoDB");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/user", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/product", productRouter);
app.use("/v1/order", orderRouter);
app.use("/v1/comment", commentRouter);
app.use("/v1/bgImage", bgImageRouter);
app.use("/v1/dashboard", dashBoardRouter);
app.use("/v1/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running...");
});
