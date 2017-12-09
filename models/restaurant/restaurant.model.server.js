module.exports = function () {

    var RestaurantSchema = require("./restaurant .schema.server.js")();
    var mongoose = require("mongoose");
    var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

    var api = {
        createRestaurant: createRestaurant,
        deleteRestaurant: deleteRestaurant,
        updateRestaurant: updateRestaurant,
        findAllRestaurants: findAllRestaurants,
        findRestaurantById: findRestaurantById,
        searchRestaurant: searchRestaurant,
        getRestaurants: getRestaurants
    };
    return api;

    function createRestaurant(restaurant) {
        return Restaurant.create(restaurant);
    }

    function deleteRestaurant(restaurantId) {
        return Restaurant.remove({_id: restaurantId});
    }

    function updateRestaurant(restaurantId, restaurant) {
        return Restaurant.update(
            {_id: restaurantId},
            {
                $set: {
                    name: restaurant.name,
                    description: restaurant.description
                }
            }
        );
    }

    function findAllRestaurants() {
        return Restaurant.find();
    }

    function findRestaurantById(restaurantId) {
        return Restaurant.findOne({_id: restaurantId});
    }

    function searchRestaurant(keyword) {
        // return Restaurant.find({ $or: [ {"name" : "/.*"+keyword+".*/i"}, {"type" : "/.*"+keyword+".*/i"} ] });
        // console.log(keyword);
        var r = new RegExp(keyword, 'i');
        // return Restaurant.find({name: "The Rusty Tire"});
        return Restaurant.find({$or: [{name: {$regex: r}}, {"type": {$regex: r}}]});
        // return Restaurant.find({ $or: [ {"name" : " '/.*sea.*/i'"}, {"type" : "'/.*ood.*/i'"} ] });
    }


    function getRestaurants(restaurantlist) {
        return Restaurant.find({
            _id: {$in: restaurantlist}
        });
    }

};