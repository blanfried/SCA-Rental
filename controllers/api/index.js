const router = require("express").Router();
const userRoutes = require("./userRoutes");
const carRoutes = require("./carRoutes");
const locationRoutes = require("./locationRoutes");

// const locationRoutes = require("./locationRoutes");

router.use("/users", userRoutes);
router.use("/cars", carRoutes);

router.use("./location", locationRoutes);

module.exports = router;
