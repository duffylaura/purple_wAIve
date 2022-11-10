const { Style } = require("../models");

const styleSeed = [
  {
    style_type: "3D render",
  },
  {
    style_type: "Abstract",
  },
  {
    style_type: "Anime",
  },
  {
    style_type: "Art deco",
  },
  {
    style_type: "Art nouveau",
  },
  {
    style_type: "Ballpoint pen",
  },
  {
    style_type: "Charcoal sketch",
  },
  {
    style_type: "Crayon",
  },
  {
    style_type: "Dadaism",
  },
  {
    style_type: "Disney",
  },
  {
    style_type: "Expressionism",
  },
  {
    style_type: "Impressionism",
  },
  {
    style_type: "Nightmare Before Christmad",
  },
  {
    style_type: "Oil painting",
  },
  {
    style_type: "Pixar",
  },
  {
    style_type: "Pixel Art",
  },
  {
    style_type: "Pop Art",
  },
  {
    style_type: "Roman mosaic",
  },
  {
    style_type: "Scientific diagram",
  },
  {
    style_type: "Stensil",
  },
  {
    style_type: "Storybook",
  },
  {
    style_type: "Studio Ghibli",
  },
  {
    style_type: "Ukiyo-e",
  },
  {
    style_type: "Watercolor",
  }
];

const seedStyle = () => Style.bulkCreate(styleSeed);

module.exports = seedStyle;
