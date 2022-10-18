const datef = require("date-and-time");

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = {
  format_time: (date) => {
    return datef.format(date, "ddd, MMM DD YYYY");
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    // return date.toLocaleTimeString();
  },
  withAuth,
};

// module.exports = withAuth;
