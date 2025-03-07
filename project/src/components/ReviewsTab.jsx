import React, { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../axios/axios";

function ReviewsTab({ truckId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });

  const getReviews = async () => {
    try {
      const response = await axiosInstance.get(`/users/get-reviews/${truckId}`);
      if (response.status === 200) {
        setReviews(response.data || []);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, [user]);

  const resetForm = () => {
    setReviewForm({
      rating: 0,
      content: "",
    });
  };

  const onSubmitReview = async (e) => {
    e.preventDefault();

    if (reviewForm.rating === 0) {
      setSubmitMessage({ type: "error", message: "Please select a rating" });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ type: "", message: "" });

    try {
      // Format the review data according to your backend requirements
      const reviewData = {
        truckId: truckId,
        rating: reviewForm.rating,
        comment: reviewForm.content,
      };

      const response = await axiosInstance.post(
        `/users/add-review/${user._id}`,
        reviewData
      );

      if (response.status === 201) {
        setSubmitMessage({
          type: "success",
          message: "Your review has been submitted!",
        });
        resetForm();
        // Refresh the reviews list
        getReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to submit review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      {user&&<div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

        {submitMessage.message && (
          <div
            className={`p-3 mb-4 rounded-md ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitMessage.message}
          </div>
        )}

        <form onSubmit={onSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setReviewForm((prev) => ({ ...prev, rating: star }))
                  }
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= reviewForm.rating
                        ? "text-primary fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={reviewForm.content}
              onChange={(e) =>
                setReviewForm((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Share your experience..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-2 ${
              isSubmitting ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
            } text-white rounded-lg transition-colors`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </form>
      </div>}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No reviews yet. Be the first to leave a review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id || review.id}
              className="bg-white border border-gray-100 rounded-lg p-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src="/default.png"
                  alt={review.name || "User"}
                  className="w-12 h-12 rounded-full object-contain"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review?.userId?.name || "Anonymous"}
                      </h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-primary fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {review.comment || review.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewsTab;
