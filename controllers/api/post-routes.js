const router = require("express").Router();
const { Post, User, Style } = require("../../models");
const sequelize = require("../../config/connection");
const auth = require("../../utils/auth");
// openai api for generation;
const { Configuration, Openai, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);



router.get("/", async (req, res) => {
  console.log("======================");
  try {
    const PostData = await Post.findAll({
      attributes: ["id", "title", "img_url", "body", "keywords"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Style,
          attributes: ["id", "style_type"],
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// post for single id
router.get("/:id", async (req, res) => {
  try {
    const PostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "img_url", "body", "created_at", "keywords"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Style,
          attributes: ["id", "style_type"],
        },
      ],
    });
    if (!PostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = PostData.get({ plain: true });
    console.log(post)
    res.render("singlePost", { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//   post router
router.post("/", auth, async (req, res) => {
  try {
    // openAI, working commenting out until we need it again//
    // const promptTags = req.body.tags;
    // const promptStyle = req.body.style;
    // const response = await openai.createImage({
    //   //prompt, we are going to have to parse in the user inputted tag, add Album, and the style
    //   prompt: "`ferret riding a unicycle with a cat on the backseat`",
    //   //how many photo alloted
    //   n: 1,
    //   //set size
    //   size: "512x512",
    // }) // set index, since we are ever only generating one
    // console.log(response);
    // const image_url = response.data.data[0].url;

    //creating post content to store in db
    const PostData = await Post.create({
      title: req.body.title,
      img_url: image_url,
      user_id: req.session.user_id,
      body: req.body.body,
    })

    res.json(PostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

//   update post
router.put("/:id", auth, async (req, res) => {
  try {
    const PostData = Post.update(
      {
        title: req.body.title,
        img_url: req.body.img_url,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!PostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(PostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!PostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(PostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
