module.exports = function () {
    var mongoose = require("mongoose");

    var favoriteSchema = mongoose.Schema({
        _users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
        description: String,
        name: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.favorite"});

    return favoriteSchema;
};