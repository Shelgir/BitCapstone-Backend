import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRoute from "./src/routes/UserRoutes.js";
import ProductRouter from "./src/routes/ProductRoutes.js";
import CategroyRouter from "./src/routes/CategoryRoutes.js";

const app = express();

// parsey body data akain ba json bo away ta3amuli lagal bkre
app.use(bodyParser.json());

//  bakrhenani route ka la filey routeawa hatotawa la jyati app.post/get....
app.use(UserRoute);
app.use(ProductRouter);
app.use(CategroyRouter);

const port = 5000;
var url = "mongodb://localhost:27017/e_comerce";
// yak jar connecty db akain u tawaw
mongoose.connect(url).then(() => console.log("monggose connected"));

//ama pey ale la ch portek listenbka ka lasarawa ba 5000 daman nawa, 27017 hi mongoya lew tek nache
app.listen(port, () => {
  console.log("listenman krd");
});
