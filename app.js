import express from "express";
import mongoose from "mongoose";
import UserRoute from "./src/routes/User.Routes.js";
import ProductRouter from "./src/routes/Product.Routes.js";
import CategroyRouter from "./src/routes/Category.Routes.js";
import AuthRouter from "./src/routes/Auth.Routes.js";
import cors from "cors";
import winston from "winston";
import "winston-mongodb";
import dotenv from "dotenv";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import OrdersRouter from "./src/routes/Orders.Routes.js";

async function main() {
  dotenv.config("dotenv");
  const app = express();
  app.use(cors());
  // load documentation
  const docs = yaml.load("./swagger.yaml");
  // setup api documentation
  app.use("/api", swaggerUi.serve, swaggerUi.setup(docs));

  // parsey body data akain ba json bo away ta3amuli lagal bkre
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //  bakrhenani route ka la filey routeawa hatotawa la jyati app.post/get....
  app.use(UserRoute);
  app.use(ProductRouter);
  app.use(CategroyRouter);
  app.use(AuthRouter);
  app.use(OrdersRouter);

  var url = process.env.DB_URL;
  // yak jar connecty db akain u tawaw
  await mongoose.connect(url).then(() => {
    console.log("monggose connected");
    winston.error("server has started");
  });

  winston.add(
    new winston.transports.MongoDB({
      db: url,
      level: "error",
      useUnifiedTopology: true,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: url,
      level: "info",
      useUnifiedTopology: true,
    })
  );

  //ama pey ale la ch portek listenbka ka lasarawa ba 5000 daman nawa, 27017 hi mongoya lew tek nache
  app.listen(process.env.PORT, () => {
    console.log("listenman krd", process.env.PORT);
  });
}

main();
