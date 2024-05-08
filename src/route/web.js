import express from "express";
import paymentController from "../controllers/paymentController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", paymentController.getHomePage);
  router.post("/create-payment-link", paymentController.createPayment);
  router.get("/success", paymentController.getSuccessPage);
  router.get("/cancel", paymentController.getCancelPage);
  return app.use("/", router);
};

module.exports = initWebRoutes;
