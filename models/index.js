const Location = require("./Location");
const User = require("./User");
const Car = require("./Car");

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
