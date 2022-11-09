const router = require("express").Router();
//importing models
const { User, Post, Tag } = require("../models");
//importing auth helper to make sure user is logged int to access certain routes
const auth = require("../utils/auth");

//get all posts that the logged in user has made and render them to the profile.hbs file
router.get("/", auth, async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Tag,
          attributes: ["tag_title"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = allPostData.map((post) => post.get({ plain: true }));
    console.log(postData, "test");
    res.render("profile", {
      post,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single post from the profile hbs so that the logged in user can edit/delete a single post they click on

router.get("/edit/:id", auth, async (req, res) => {
  try {
    const editSinglePostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const editPostData = editSinglePostData.get({ plain: true });
    console.log(editPostData, "test");
    res.render("post-edit", {
      editPostData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;