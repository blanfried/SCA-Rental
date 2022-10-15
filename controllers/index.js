const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Car, Location } = require("../models");
const { findAll } = require("../models/Location");
router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  try {
    console.log("hello");
    let userData = await User.findAll();
    let users = userData.map((user) => user.get({ plain: true }));
    let locationData = await Location.findAll();
    let locations = locationData.map((branch) => branch.get({ plain: true }));
    console.log(users);
    console.log(locations);
    res.render("homepage", { users, locations });
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

router.get("/location", async (req, res) => {
  try {
    let locationData = await Location.findAll();
    let locations = locationData.map((branch) => branch.get({ plain: true }));

    res.render("location", {
      locations,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car/:id", async (req, res) => {
  try {
    const carDataSingle = await Car.findByPk(req.params.id, {
      include: [
        {
          model: Car,
        },
      ],
    });
    console.log(carDataSingle);
    const carSingle = carDataSingle.get({ plain: true });
    console.log(carSingle);
    res.render("carsingle");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
