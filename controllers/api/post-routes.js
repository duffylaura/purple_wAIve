const router = require("express").Router();
const { Post, User, Tag } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/",async (req, res) => {
    console.log("======================");
    try{
   const PostData = await Post.findAll({
      attributes: ["id", "title", "img_url","body"],     
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
}
      catch (err){ 
        console.log(err);
        res.status(500).json(err);
      };
    });
// post for single id
router.get("/:id",async (req, res) => {
    try{
    const PostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "img_url","body"],
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
    });
      if (!PostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(PostData);
      }
      catch(err){
        console.log(err);
        res.status(500).json(err);
      };
  });

//   post router
router.post("/", auth,async (req, res) => {
    try{
      const PostData = Post.create({
      title: req.body.title,
      img_url: req.body.img_url,
      user_id: req.session.user_id,
      body: req.body.body
    })
       res.json(PostData)
}
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  
});
  
//   update post
router.put("/:id", auth,async (req, res) => {
    try{
   const PostData = Post.update(
      {
        title: req.body.title,
        img_url: req.body.img_url,
        body: req.body.body
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    
      
        if (!PostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(PostData);
      }
    
      catch(err)  {
        console.log(err);
        res.status(500).json(err);
      };
  });


// delete a post
router.delete("/:id", auth,async (req, res) => {
    try{
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
   if (!PostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(PostData);
    }

    catch(err)  {
      console.log(err);
      res.status(500).json(err);
    };
});

module.exports = router;