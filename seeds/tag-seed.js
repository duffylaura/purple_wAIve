const { Tag } = require("../models");

const tagSeed = [
  {
    tag_title: "impressionism",
  },
  {
    tag_title: "abstract",
  },
  {
    tag_title: "gothic",
  },
];

const seedTags = () => Tag.bulkCreate(tagSeed);

module.exports = seedTags;
