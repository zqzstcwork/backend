module.exports = function () {
    var mongoose = require("mongoose");

    var RestaurantSchema = mongoose.Schema({
        name: String,
        description: String,
        type: String,
        address: String,
        dateCreated: {type: Date, default: Date.now},
        url: String,
        menu: [
            {
                description: String,
                foodName: String,
                url: String
            }
        ]
    }, {collection: "project.restaurant"});

    return RestaurantSchema;
};