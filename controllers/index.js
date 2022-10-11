const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/car", (req, res) => {
  try {
    res.render("car");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
