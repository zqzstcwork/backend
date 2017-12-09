module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        nickname: String,
        email: String,
        url: String,
        google: {
            id: String,
            token: String
        },
        type: String,//VIP or not
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    return UserSchema;
};