const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const auth = require("../../utils/auth");
//WORKS//create POST route for add comments
router.post("/", auth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      include: { model: Post },
      include: { model: User, where: { id: req.session.user_id } },
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//WORKS//get all comments
router.get("/", auth, async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });

    res.status(200).json(commentsData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//WORKS//create DELETE route for deleting YOUR comments only
router.delete("/:id", auth, async (req, res) => {
  try {
    const DeleteCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!DeleteCommentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(DeleteCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
