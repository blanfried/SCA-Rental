<<<<<<< HEAD
const User = require("./User");
const Car = require("./Car");
const Location = require("./Location");
=======
const Location = require("./Location");
const User = require("./User");
const Car = require("./Car");
>>>>>>> 958da0969f094244b8011f6c38ba2db16275603f

User.hasMany(Car, {
  foreignKey: "user_id",
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

Location.hasMany(Car, {
  foreignKey: "location_id",
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

Car.belongsTo(User, {
  foreignKey: "user_id",
  foreignKey: "car_id",
});

module.exports = { User, Car, Location };
