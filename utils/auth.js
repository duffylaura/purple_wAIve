//helper function to disallow logged out users from accessing some routes
const auth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    //if they are logged in then execute the route function they requested
    next();
  }
};

module.exports = auth;
