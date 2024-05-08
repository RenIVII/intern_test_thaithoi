import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import cors from "cors";

require("dotenv").config();

let app = express();
app.use(cors({ credentials: true, origin: true }));
// bodyParser giup lay data tu client to server
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("running :" + port);
});
