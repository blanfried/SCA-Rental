const router = require("express").Router();
const userRoutes = require("./userRoutes");
const carRoutes = require("./carRoutes");
<<<<<<< HEAD
const locationRoutes = require("./locationRoutes");

router.use("/users", userRoutes);
router.use("/cars", carRoutes);
router.use("./location", locationRoutes);
=======

router.use("/users", userRoutes);
router.use("/cars", carRoutes);
>>>>>>> 958da0969f094244b8011f6c38ba2db16275603f

module.exports = router;
