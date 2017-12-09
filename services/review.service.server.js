module.exports = function (app, models) {
    var reviewModel = models.reviewModel;
    var restaurantModel = models.restaurantModel;
    
    app.get("/projectApi/user/:uid/review", findAllReviewsForUser);
    app.get("/projectApi/review/:rid", findReviewById);
    app.get("/projectApi/review/restaurant/:rid", findAllReviewsForRestaurant);
    app.post("/projectApi/review/check/", checkReviewed);
    app.post("/projectApi/user/:uid/review", createReviewForUser);
    app.put("/projectApi/review/:rid", updateReview);
    app.delete("/projectApi/review/:rid", deleteReview);

    function checkReviewed(req, res) {
        var userId = req.body.userId;
        var restaurantId = req.body.restaurantId;
        reviewModel
            .findExistingReview(userId, restaurantId)
            .then(
                function (response) {
                    console.log(response);
                    if (response.length) {
                        res.send(true);
                    } else {
                        res.send(false);
                    }
                }
            );
    }

    function findAllReviewsForRestaurant(req, res) {
        var restaurantId = req.params.rid;
        reviewModel
            .findAllReviewsForRestaurant(restaurantId)
            .then(
                function (response) {
                    res.send(response)
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findAllReviewsByIds(req, res) {
        var reviewIds = req.body;
        console.log(reviewIds);
        reviewModel
            .findAllReviewsByIds(reviewIds)
            .then(
                function (response) {
                    console.log(response);
                    res.send(response)
                },
                function (error) {
                    console.log(error);
                    res.status(400).send(error);
                }
            )
    }
    
    function deleteReview(req, res) {
        var reviewId = req.params.rid;
        reviewModel
            .deleteReview(reviewId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to delete review with ID: "+reviewId);
                }
            )
    }
    
    function updateReview(req, res) {
        var reviewId = req.params.rid;
        var newReview = req.body;
        reviewModel
            .updateReview(reviewId, newReview)
            .then(
                function (review) {
                    console.log(review);
                    res.send(review);
                },
                function (error) {
                    res.status(404).send("Unable to update review with ID: "+reviewId);
                }
            )
    }
    
    function createReviewForUser(req, res) {
        var newReview = req.body;
        var userId = req.params.uid;
        reviewModel
            .createReviewForUser(userId, newReview)
            .then(
                function (review) {
                    res.send(review);
                },
                function (error) {
                    res.status(400).send("Unable to create review");
                }
            )
    }
    
    function findReviewById(req, res) {
        var reviewId = req.params.rid;
        reviewModel
            .findReviewById(reviewId)
            .then(
                function (review) {
                    console.log(review);
                    res.send(review)
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }
    
    function findAllReviewsForUser(req, res) {
        var userId = req.params.uid;
        reviewModel
            .findAllReviewsForUser(userId)
            .then(
                function (reviews) {
                    res.send(reviews);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function populateReview(partialReview) {
        restaurantModel
            .findRestaurantById(partialReview._restaurant)
            .then(
                function (restaurant) {
                    return;
                },
                function (error) {
                    return;
                }
            );
    }
};