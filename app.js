module.exports = function (app) {

    var models = require("./models/models.js")();

    var userService = require("./services/user.service.server.js")(app, models);
    var restaurantService = require("./services/restaurant.service.server.js")(app, models);
    var reviewService = require("./services/review.service.server")(app, models);
    var friendService = require("./services/friend.service.server")(app, models);
    var favoriteService = require("./services/favorite.service.server")(app, models);
};