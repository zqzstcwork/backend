module.exports = function () {

    var UserSchema = require("./user.schema.server")();
    var mongoose = require("mongoose");
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByEmail: findUserByEmail,
        findUserByGoogleId: findUserByGoogleId,
        findFriendsByUserId:findFriendsByUserId,
        AddFriendById: AddFriendById,
        deleteFriend: deleteFriend,
        getFriends: getFriends,
        uploadImage: uploadImage
    };
    return api;
    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }
    function uploadImage(userId, url) {
        return User.update(
            {_id: userId},
            {
                $set: {
                    url: url
                }
            }
        );
    }



    function createUser(user) {
        return User.create(user);
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        console.log(user);
        return User.update(
            {_id: userId},
            {
                $set: {
                    nickname: user.nickname,
                    email: user.email,
                    url: user.url,
                }
            }
        );
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return User.findOne({_id: userId});
    }
    function findUserByEmail(email) {
        return User.findOne({email: email});
    }
    function findFriendsByUserId(userId){
        return User.find({_user: userId});
    }

    function AddFriendById(userId, fid) {
        User.update(
            {_id: fid},
            {
                $push: {
                    friends: userId
                }
            }
        );

        return User.update(
            {_id: userId},
            {
                $push: {
                    friends: fid
                }
            }
        );
    }
    function deleteFriend(userId,friendId) {
        return User.update(
            {_id: userId},
            {
                $pull: {
                    friends: friendId
                }
            }
        );
    }

    function getFriends(friendlist) {
        return User.find({
            _id: {$in: friendlist}
        });
    }



};