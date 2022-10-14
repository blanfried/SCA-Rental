const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Car, Location } = require("../models");
const { findAll } = require("../models/Location");
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  try {
    console.log("hello");
    // let userData = await User.findAll();
    // let users = userData.map((user) => user.get({ plain: true }));
    // let branchData = await Location.findAll();
    // let branch = branchData.map((location) => location.get({ plain: true }));
    console.log(users);
    // console.log(location);
    res.render(
      "homepage"
      // , { users, branch }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car", async (req, res) => {
  try {
    let carData = await Car.findAll();
    let cars = carData.map((vehicles) => vehicles.get({ plain: true }));

    res.render("car", {
      cars,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
