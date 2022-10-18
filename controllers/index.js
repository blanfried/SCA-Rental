const router = require("express").Router();
const apiRoutes = require("./api");
const { User, Car, Location, Bookings } = require("../models");
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

router.get("/bookings/:id", async (req, res) => {
  try {
    const bookingData = await Bookings.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const booking = bookingData.get({ plain: true });

    res.render("booking", {
      ...booking,
      logged_in: req.session.logged_in,
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
    const carDataSingle = await Car.findByPk(req.params.id);
    console.log(carDataSingle);
    const carSingle = carDataSingle.get({ plain: true });
    console.log("Single", carSingle.brand);
    res.render("carsingle", carSingle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/location/:id", async (req, res) => {
  try {
    const locationDataSingle = await Car.findAll({
      where: { location_id: req.params.id },
    });

    console.log(locationDataSingle);

    const locationCars = locationDataSingle.map((results) =>
      results.get({ plain: true })
    );

    console.log(locationCars);

    res.render("locationsingle", { locationCars });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
