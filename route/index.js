module.exports = function (app, bdd) {
    const item = require("./item")(app, bdd);
    const input = require("./input")(app, bdd);
    const regex = require("./regex")(app, bdd);
    const condition = require("./condition")(app, bdd);
    const form = require("./form")(app, bdd);
    const treatment = require("./treatment")(app, bdd);
}