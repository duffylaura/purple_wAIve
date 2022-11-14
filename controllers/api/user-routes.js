const router = require("express").Router();
const { User, Post, Style, Comment } = require("../../models");
const auth = require("../../utils/auth");

//logging In
router.post("/login", async (req, res) => {
  const uEmail = req.body.email;
  const uPW = req.body.password;
  try {
    //find the user in db if email exists
    const userData = await User.findOne({
      where: { email: uEmail },
    });
    //if user don't exisst
    if (!userData) {
      res.status(400).json({
        message: `Uable to find user with that email. ${uEmail} does not exists`,
      });
      return;
    }
    //otherwie if user exists use bcrypt to compare password
    const validPassword = await userData.comparePW(uPW); //this returns boolean

    if (!validPassword) {
      res.status(400).json({ message: `Wrong password. Plz try again` });
      return;
    } else {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        req.session.username = userData.username;
        res.status(200).json({
          user: userData,
          message: `Welcome Back! ~${userData.username}~`,
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//signup
router.post("/signup", async (req, res) => {
  try {
    const nUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    console.log(nUser);
    const newUserData = await User.create(nUser);
    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.username = newUserData.username;
      req.session.email = newUserData.email;
      req.session.loggedIn = true;
      res.status(200).json(`${nUser.username}'s account has been created`);
      console.log(req.session);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get User by username, protected and will redirect if not logged in
router.get('/:id', auth, async (req, res) => {
  try {
    const selectedUserID = req.params.id;

    const userData = await User.findOne({
      where: { id: selectedUserID },
      include: [{
        model: Post,
        attributes: ["id", "title", "img_url", "body", "created_at"],
        include: {
          model: Style,
          attributes: ["style_type"],
        }
      }],
    });

    const displayUserPosts = userData.get({ plain: true });
    console.log(displayUserPosts, " testing for Mari");
    res.render('otherProfile', {
      user: displayUserPosts,
      loggedIn: req.session.loggedIn,
    });
    //catach error as usual
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//logout route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // confirming if actuallu loggedIN,
    req.session.destroy(() => {
      //remove the current loggedIn session
      res.status(204).end();
    });
  } else {
    res.status(404).json("error not loggedin").end();
  }
});

//future dev:
//maybe delete user

module.exports = router;
