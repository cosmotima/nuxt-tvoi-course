const categories = require("./categories");
const courses = require("./courses");
const schools = require("./schools");
const reviews_skillbox = require("./reviews_skillbox");

module.exports = () => ({
    categories,
    courses,
    schools,
    reviews_skillbox
});