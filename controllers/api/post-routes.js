const router = require("express").Router();
const { Post, User, Tag } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
    console.log("======================");
});
