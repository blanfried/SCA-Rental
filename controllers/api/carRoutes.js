const router = require("express").Router();

const { Car } = require("../../models");



router.get("/", async (req, res) => {
  try {
    const carData = await Car.findAll({

      include: [Location],
    });

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCar = await Car.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCar);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const carData = await Car.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!carData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
