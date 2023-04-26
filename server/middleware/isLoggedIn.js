const isLoggedIn = (req, res, next) => {
  console.log("req.isAuthenticated:", req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log("Is Authenticated!!");
    next();
  } else {
    console.log("Is Not Authenticated!!");
    res.status(403).json({ message: "need to login" });
  }
};

export default isLoggedIn;
