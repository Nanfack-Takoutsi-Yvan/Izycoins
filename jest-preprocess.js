/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}

const newLocal = "babel-jest"
module.exports = require(newLocal).default.createTransformer(babelOptions)