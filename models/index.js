const User = require("./User");
const Car = require("./Car");
const Location = require("./Location");

User.hasMany(Car, {
  foreignKey: "car_id",
  onDelete: "CASCADE",
});

Car.belongsTo(Location, {
  foreignKey: "location_id",
});

module.exports = { User, Car, Location };
