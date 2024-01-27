import express from "express";
import todoRoute from "./todo.route.js";
import captureDateMiddleware from "../../middleware/middleware.js";
const router = express.Router();

router.use("/todos", todoRoute);

// Uncomment in Milestone 5
// const testRoute = require("./test.route");
// router.use("/test", testRoute);

module.exports = router;
