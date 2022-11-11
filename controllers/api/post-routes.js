const router = require("express").Router();
const { Post, User, Style } = require("../../models");
const sequelize = require("../../config/connection");
const auth = require("../../utils/auth");
const puppeteer = require("puppeteer");
// openai api for generation;
const { Configuration, Openai, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
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
    //converting keywordTags back to array to be displayed
    post.keywords = post.keywords.split(", ");
    console.log(post.keywords);

    res.render("singlePost", { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//   post router
router.post("/", auth, async (req, res) => {
  try {
    const parsedKeyword = req.body.keyword.join(" ");
    const storeKeyword = req.body.keyword.join(", ");
    //change style bck to and ID
    const styleReq = req.body.newStyle;
    console.log(req.body.newStyle + "test12");
    //query to find by style and get back the ID
    const styleData = await Style.findOne({
      where: {
        style_type: styleReq,
      },
    });
    const styleID = styleData.get({ plain: true });
    console.log(styleData + "test123");


    // openAI, working commenting out until we need it again//
    const response = await openai.createImage({
      //prompt, we are going to have to parse in the user inputted tag, add Album, and the style
      prompt: `${parsedKeyword} Album, ${Style}`,
      //how many photo alloted
      n: 1,
      //set size
      size: "512x512",
    }); // set index, since we are ever only generating one
    console.log(storeKeyword);
    const image_url = response.data.data[0].url;
    
    //for now
    // const image_url = "https://via.placeholder.com/512";

    //creating post content to store in db
    const PostData = await Post.create({
      title: req.body.newTitle,
      img_url: image_url,
      keywords: storeKeyword,
      body: req.body.newBody,
      style: styleID.id,
      user_id: req.session.user_id,
    });

    res.json(PostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
