const router = require("express").Router();
const { Location, Car } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const locationData = await Location.findOne({
      where: {
        id: req.params.id,
      },
      include: [Car],
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
