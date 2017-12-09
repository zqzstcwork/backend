module.exports = function (app, models) {
    var restaurantModel = models.restaurantModel;
    
    app.get("/projectApi/restaurant/:rid", findRestaurantById);
    app.get("/projectApi/restaurant", findAllRestaurants);
    app.post("/projectApi/restaurant/", createRestaurant);
    app.delete("/projectApi/restaurant/:rid", deleteRestaurant);
    app.put("/projectApi/restaurant/:rid", updateRestaurant);
    app.get("/projectApi/search/:keyword", searchRestaurant);
    app.post("/projectApi/restaurants", getRestaurants);
    
    function getRestaurants(req, res) {
        var restaurantId = req.params.rid;
        if (restaurantId) {
            findRestaurantById(restaurantId, res)
        } else {
            findAllRestaurants(res)
        }
    }

    function findRestaurantById(req, res)  {
        var restaurantId = req.params.rid;
        restaurantModel
            .findRestaurantById(restaurantId)
            .then(
                function (data) {
                    var restaurant = data;
                    res.send(restaurant);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllRestaurants(req, res) {
        restaurantModel
            .findAllRestaurants()
            .then(
                function (data) {
                    var restaurants = data;
                    res.send(restaurants);
                },
                function (error) {
                    res.status(400).send(error)
                }
            );
    }

    function createRestaurant(req, res) {
        var newRestaurant = req.body;
        restaurantModel
            .createRestaurant(newRestaurant)
            .then(
                function (restaurant) {
                    res.send(restaurant);
                },
                function (error) {
                    res.status(400).send("Unable to create restaurant");
                }
            );
    }

    function updateRestaurant(req, res) {
        var restaurantId = req.params.rid;
        var newRestaurant = req.body;
        restaurantModel
            .updateRestaurant(restaurantId, newRestaurant)
            .then(
                function (restaurant) {
                    res.send(restaurant);
                },
                function (error) {
                    res.status(404).send("Unable to update restaurant with ID: " + restaurantId);
                }
            );
    }

    function deleteRestaurant(req, res) {
        var restaurantId = req.params.rid;
        restaurantModel
            .deleteRestaurant(restaurantId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove restaurant with ID: " + restaurantId)
                }
            );
    }

    function searchRestaurant(req, res) {
        var keyword = req.params.keyword;
        restaurantModel
            .searchRestaurant(keyword)
            .then(
                function (data) {
                    var restaurants = data;
                    res.send(restaurants);
                },
                function (error) {
                    res.status(400).send(error)
                }
            );
    }

    function getRestaurants(req, res) {
        var restaurantList = req.body;
        restaurantModel
            .getRestaurants(restaurantList)
            .then(
                function (restaurants) {
                    res.json(restaurants);
                },
                function (err) {
                    done(err, null);
                })
    }
};