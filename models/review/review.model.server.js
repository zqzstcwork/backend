module.exports = function () {

    var ReviewSchema = require("./review .schema.server.js")();
    var mongoose = require("mongoose");
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        createReviewForUser: createReviewForUser,
        deleteReview: deleteReview,
        updateReview: updateReview,
        findAllReviewsForUser: findAllReviewsForUser,
        findReviewById: findReviewById,
        findAllReviewsForRestaurant: findAllReviewsForRestaurant,
        findAllReviewsByIds: findAllReviewsByIds,
        findExistingReview: findExistingReview
    };
    return api;

    function findExistingReview(userId, restaurantId) {
        return Review.find({
            $and: [
                {_user: userId},
                {_restaurant: restaurantId}
            ]
        })
    }
    
    function findAllReviewsForRestaurant(restaurantId) {
        return Review.find({
            _restaurant: restaurantId
        });
    }

    function findAllReviewsByIds(reviewIds) {
        // var reviews = [];
        // for (var i in reviewIds) {
        //     reviews.push(Review.find({_id: }));
        // }
        // return reviews;
        console.log(reviewIds);
        if(reviewIds) {
            return Review.find({
                _id: {$in: reviewIds}
            });
        } else {
            return [];
        }
    }

    function createReviewForUser(userId, review) {
        review._user = userId;
        return Review.create(review);
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

    function updateReview(reviewId, review) {
        return Review.update(
            {_id: reviewId},
            {
                $set: {
                    rate: review.rate,
                    review: review.review
                }
            }
        );
    }

    function findAllReviewsForUser(userId) {
        return Review.find({_user: userId});
    }

    function findReviewById(reviewId) {
        return Review.findOne({_id: reviewId});
    }
};