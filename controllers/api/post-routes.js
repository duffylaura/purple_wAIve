const router = require("express").Router();
const { Post, User, Tag } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    console.log("======================");
    Post.findAll({
      attributes: ["id", "title", "img_url"],     
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_title"],
          
        },
      ],
    })
      .then((PostData) => res.json(PostData.reverse()))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// post for single id
router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "img_url"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_title"],         
        },
      ],
    })
      .then((PostData) => {
        if (!PostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(PostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//   post router
router.post("/", withAuth, (req, res) => {
       Post.create({
      title: req.body.title,
      img_url: req.body.img_url,
      user_id: req.session.user_id,
    })
      .then((PostData) => res.json(PostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
//   update post
router.put("/:id", withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        img_url: req.body.img_url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((PostData) => {
        if (!PostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(PostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


// delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(PostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;