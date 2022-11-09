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