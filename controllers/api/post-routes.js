const router = require("express").Router();
const { Post, User, Style, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const auth = require("../../utils/auth");
// const puppeteer = require("puppeteer");
//to download image
var fs = require("fs"),
  http = require("http"),
  https = require("https");
var Stream = require("stream").Transform;

// openai api for generation;
const { Configuration, Openai, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//dropbox
const { Dropbox } = require('dropbox');
const dbx = new Dropbox({ accessToken: process.env.DROPBOX })

//cloudinary
var cloudinary = require('cloudinary')

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
      attributes: [
        "id",
        "title",
        "img_url",
        "body",
        "created_at",
        "keywords",
        "user_id",
      ],
      include: [
        {
          model: Comment,
          attributes: ["text", "user_id", "created_at", "id"],
          include: {
            model: User,
            attributes: ["id", "username"],
            // as: "comment_username",
          },
        },
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

    console.log(post);
    console.log(post.comments[0]);

    //converting keywordTags back to array to be displayed
    post.keywords = post.keywords.split(", ");
    console.log(post.keywords);

    res.render("singlePost", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//   post router
router.post("/", auth, async (req, res) => {
  let cloud_url;
  try {
    const parsedKeyword = req.body.keyword.join(" ");
    const storeKeyword = req.body.keyword.join(", ");
    //change style back to and ID //currently broken
    const styleReq = req.body.newStyle;
    console.log(req.body.newStyle + "test12");
    //query to find by style and get back the ID
    const styleData = await Style.findOne({
      where: {
        style_type: styleReq,
      },
    });
    let styleID = styleData.get({ plain: true });
    // styleID = JSON.stringify(styleID)
    console.log(styleID.id);

    // openAI, working commenting out until we need it again//
    const response = await openai.createImage({
      //prompt, we are going to have to parse in the user inputted tag, add Album, and the style
      prompt: `${parsedKeyword} Album, ${styleReq}`,
      //how many photo alloted
      n: 1,
      //set size
      size: "512x512",
    }); // set index, since we are ever only generating one
    console.log(storeKeyword);
    console.log(response.data.created + "<--our file name");
    const filename = response.data.created;
    const image_url = response.data.data[0].url;
    console.log(
      image_url + "<--for funsies just incase error and we lost the image"
    );

    // downloading image from url since expiring 1 hr

    // Download Image Helper Function
    var downloadImageFromURL = (url, filename, callback) => {
      var client = http;
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }

      client
        .request(url, function (response) {
          var data = new Stream();

          response.on("data", function (chunk) {
            data.push(chunk);
          });
          // console.log(data)
          // console.log(data.data);
          // console.log(data.read());

          response.on("end", function () {
            fs.writeFileSync(`./public/assets/dalle/${filename}`, data.read());
            //   dbx.filesUpload({
            //     path: `/dalle/${filename}`,
            //     contents: data.data
            //   })
            //     .then(response => {
            //       console.log(response);
            //     })
            //     .catch(err => {
            //       console.log(err);
            //     });
            cloudinary.v2.uploader
              .upload(`./public/assets/dalle/${filename}`, {
                public_id: `dalle/${filename}`
              })
              .then(result => {
                console.log(result.url);
                cloud_url = result.url;
              });

          });
        })
        .end();
    };

    // // Calling Function to Download
    downloadImageFromURL(image_url, `${filename}.png`)

    //after image downloaded on heroku instance
    // //dropbox time
    // fs.readFile(`./public/assets/dalle/${filename}.png`, (err, image) => {
    //   if (err) {
    //     console.log('ERROR', err);
    //   };
    //   //after reading, upload
    //   dbx.filesUpload({
    //     path: `/dalle/${filename}.png`,
    //     contents: image
    //   })
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // });


    //for now
    // const image_url = "https://via.placeholder.com/512";

    //creating post content to store in db
    const PostData = await Post.create({
      title: req.body.newTitle,
      img_url: `${cloud_url}`,
      keywords: storeKeyword,
      body: req.body.newBody,
      style_id: styleID.id,
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
    const PostData = await Post.update(
      {
        title: req.body.title,
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
