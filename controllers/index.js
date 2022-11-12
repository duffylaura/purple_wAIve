const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homepage-routes");
const profileRoutes = require("./profile-routes");
const styleRoutes = require("./style-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/profile", profileRoutes);
router.use("/style", styleRoutes);

module.exports = router;
