module.exports = function (app, models) {
    var userModel = models.userModel;
    var favoriteModel = models.favoriteModel;

    app.post("/projectApi/list", createList);
    app.get("/projectApi/user/:uid/list", findAllListsForUser);
    app.get("/projectApi/list/:lid", findListById);
    app.put("/projectApi/list/", updateList);
    app.delete("/projectApi/user/:uid/list/:lid", deleteListForUser);
    app.put("/projectApi/user/:uid/list/:lid", addListForUser);
    //    deleteListForUser: deleteListForUser
    app.delete("/projectApi/list/:lid/restaurant/:rid", removeRestaurantFromList);
    app.get("/projectApi/list/:lid/restaurant/:rid", addRestaurantToList);
    
    function createList(req, res) {
        var newlist = req.body;
        favoriteModel
            .createList(newlist)
            .then(
                function (list) {
                    res.send(list);
                },
                function (error) {
                    res.status(400).send(error);
                })
    }

    function findAllListsForUser(req, res) {
        var userId = req.params.uid;
        favoriteModel
            .findAllListsForUser(userId)
            .then(
                function (favorite) {
                    res.send(favorite);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteListForUser(req, res) {
        var uid = req.params.uid;
        var lid = req.params.lid;
        favoriteModel
            .deleteListForUser(lid, uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to remove list with ID: " + lid);
                }
            );
    }

    function findListById(req, res) {
        var lid = req.params.lid;
        //console.log(userId);
        favoriteModel
            .findListById(lid)
            .then(
                function (list) {
                    res.send(list);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateList(req, res) {
        var list = req.body;
        favoriteModel
            .updateList(list._id, list)
            .then(
                function (list) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update list with ID: " + lid);
                }
            );
    }

    function addListForUser(req, res) {
        var uid = req.params.uid;
        var lid = req.params.lid;
        favoriteModel
            .addListForUser(lid, uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to add list with ID: " + lid);
                }
            );
    }

    function removeRestaurantFromList(req, res) {
        var rid = req.params.rid;
        var lid = req.params.lid;
        favoriteModel
            .removeRestaurantFromList(lid, rid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to remove restaurant with ID: " + lid);
                }
            );
    }

    function addRestaurantToList(req, res) {
        var rid = req.params.rid;
        var lid = req.params.lid;
        favoriteModel
            .addRestaurantToList(lid, rid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to add restaurant with ID: " + lid);
                }
            );
    }

};