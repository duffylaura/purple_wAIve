const router = require("express").Router();
const { User, Post, Comment, Style } = require("../models");
const auth = require("../utils/auth");

router.get("/:id", async (req, res) => {
    const styleID = req.params.id;
    try {
        const postStyle = await Style.findOne({
            where: { id: styleID },
            include: [
                {
                    model: Post,
                    attributes: ["id", "title", "img_url", "body", "keywords", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        });
        const allPost = postStyle.get({ plain: true });
        console.log(allPost, " testing");
        res.render("postByStyle", {
            allPost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;