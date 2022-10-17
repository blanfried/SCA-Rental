const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Car, Location } = require("../models");
const { findAll } = require("../models/Location");
const withAuth = require("../utils/auth");
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
    res.render("homepage", {
      users,
      locations,
      logged_in: req.session.logged_in,
    });
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
    console.log(req.session.logged_in);
    res.render("location", {
      locations,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car/:id", withAuth, async (req, res) => {
  try {
    const carDataSingle = await Car.findByPk(req.params.id);
    console.log(carDataSingle);
    const carSingle = carDataSingle.get({ plain: true });
    console.log("Single", carSingle.brand);
    res.render(
      "carsingle",
      {
        carSingle,
        logged_in: req.session.logged_in,
      }
      // , {
      //   include: [{ model: Car, attributes: ["id", "brand", "model", "size"] }],
      // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/location/:id", withAuth, async (req, res) => {
  try {
    const locationDataSingle = await Car.findAll({
      where: { location_id: req.params.id },
    });
    console.log(locationDataSingle);
    // const locationSingle = locationDataSingle.get({ plain: true });

    const locationCars = locationDataSingle.map((results) =>
      results.get({ plain: true })
    );

    console.log(locationCars);

    // console.log("Single", locationSingle.y);
    res.render(
      "locationsingle",
      { locationCars, logged_in: req.session.logged_in }
      // {
      //   include: [
      //     { model: Location, attributes: ["id", "country", "city", "image"] },
      //   ],
      // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route

  res.render("login");
});

module.exports = router;
