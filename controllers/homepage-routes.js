const router = require("express").Router();
const { Post, Tag, User } = require("../models");
const auth = require("../utils/auth");

//get all posts by all users for homepage and render to homepage hbs

router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      attributes: ["id", "title", "img_url", "created_at", "user_id"],
      include: {
        model: User,
        attributes: ["id", "username"],
      },
    });
    //map goes over the allPostData array at each position and gets just the datavalues for the  post. and then we serialize the data with post.get so only the datavalues we want to see will show up
    const post = allPostData.map((post) => post.get({ plain: true }));
    console.log(post, "test");
    console.log(req.session);
    //if logged in. render homepage with all post (array)
    if (req.session.loggedIn) {
      res.render("homepage", {
        post,
        loggedIn: req.session.loggedIn,
      });
    } else {
      //if not logged in, render homepage with parsed out 5 post
      res.render("homepage", {
        post1: post[0],
        post2: post[1],
        post3: post[2],
        post4: post[3],
        post5: post[4],
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//create GET route to get to login page when the user is not logged in and trys to click on a post to read it

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//create GET route to get to login page when the user is not logged in and trys to click on a post to read it

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//get for a blogpost by id and render it in a single post view so we can see who posted it, the tags and when it was created

router.get("/post/:id", auth, async (req, res) => {
  try {
    const singlePostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "img_url", "created_at", "user_id"],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });
    console.log(singlePostData);
    const post = singlePostData.get({ plain: true });
    //rendering single post hbs when you click it on homepage
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//show create post

router.get("/create", auth, (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("createPost");
});

module.exports = router;
