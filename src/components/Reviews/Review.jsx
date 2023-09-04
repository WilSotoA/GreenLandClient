import React, {useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styles from "./Review.module.css";


const { VITE_SERVER_URL } = import.meta.env;
import { alertConfirm, alertAcept } from "../SweetAlert/SweetAlert";
import { useSelector } from "react-redux";


const Reviews = () => {
  const auth = useSelector((state) => state.authData);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasPurchased, setHasPurchased] = useState(false);
  const token = JSON.parse(localStorage.getItem("profile"))?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `${VITE_SERVER_URL}/reviews/product/${id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, id]);

  useEffect(() => {
    const checkPurchase = async () => {
      try {
          const response = await axios.get(
            `${VITE_SERVER_URL}/orders/purchase?userId=${auth?.id}&productId=${id}`,
            config
          );
          setHasPurchased(response.data.purchase);
         }    catch (error) {
             console.error(error);
         }
    };
      if (auth?.id) {
      checkPurchase();
    }
  }, [auth?.id, id, config]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      if (message.length > 200) {
        setErrorMessage("Review text cannot exceed 200 characters");
        return;
      }

      if (!hasPurchased) {
        setErrorMessage("Only users who have purchased the product can submit a review");
        return;
      }  

      await axios.post(
        `${VITE_SERVER_URL}/reviews/`,
        {
          productId: id,
          rating,
          message,
          userId: auth?.id,
        },
        config
      );
        // La reseña se envió correctamente
        setSuccessMessage("Review submitted successfully");
        setRating(0);
        setMessage("");
        fetchReviews(); // Actualiza la lista de reseñas

    } catch (error) {
      console.error(error);
      alertAcept("error", "Error creating review" ,error.response?.data?.error|| error.message );
      setErrorMessage("Error submitting review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (auth && (auth.id === reviewId || auth.id === 1)) {
    try {
      const confirmed = await alertConfirm(
        "warning",
        "Delete review!",
        "Are you sure you want to delete the review?"
      );
      if (confirmed) {
        const response = await axios.delete(
          `${VITE_SERVER_URL}/reviews/${reviewId}`,
          config
        );
        if (response.status === 200) {
          // La reseña se eliminó correctamente
          setSuccessMessage("Review deleted successfully");
          fetchReviews(); // Actualiza la lista de reseñas
        }
      }
    } catch (error) {
      console.error(error);
      alertAcept("error", "Error deleting review" ,error.response?.data?.error|| error.message );
      setErrorMessage("Error deleting review");
    }
   }
  };

  if (reviews.length === 0) {
    return (
      <div className={styles.reviewsContainer}>
        <h2 className={styles.reviewsContainerH2}>Reviews</h2>
        <Link to={`/reviews/${id}`} className={styles.linkReviews}>
        This product has no reviews yet...
        </Link>
      </div>
    );
  }

  /*Lógica de comparación de id del user y id del producto para validar la compra, de ser asi puede crear la reseña. 
Asi mismo en el renderizado un condicional para que pueda eliminar la reseña el usuario que la creó o el admin, tambíen 
lógica para dicha función en la const handleDeleteReview.
También implemento en el renderizado lógica para las estrellas si deben estar pintadas incompletas segun % de reseñas.*/

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.reviewsContainerH2}>Reviews</h2>
      <Link to={`/reviews/${id}`} className={styles.linkReviews}>
        Read {reviews.length} Reviews
      </Link>
  
      {reviews.map((review) => (
        <div className={styles.reviewItem} key={review.id}>
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{review.username}</h3>
            <div className={styles.rating}>
              {Array(Math.floor(review.rating))
                .fill()
                .map((_, index) => (
                  <BsStarFill key={index} />
                ))}
              {review.rating % 1 !== 0 && <BsStarHalf />}
              {Array(5 - Math.ceil(review.rating))
                .fill()
                .map((_, index) => (
                  <BsStar key={index} />
                ))}
            </div>
          </div>
          <p>{review.message}</p>
          {(auth && (auth.id === review.userId || auth.id === 1)) && (
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteReview(review.id)}
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
  
      <div className={styles.starIcons}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span key={value} onClick={() => handleRatingChange(value)}>
            {value <= rating ? (
              <BsStarFill className={styles.starIconsSvgFilled} />
            ) : (
              <BsStar className={styles.starIconsSvgEmpty} />
            )}
          </span>
        ))}
      </div>
  
      <textarea
        className={styles.reviewFormTextarea}
        placeholder="Write your review......"
        value={message}
        onChange={handleMessageChange}
        disabled={!hasPurchased}
      ></textarea>
  
      <button className={styles.reviewFormButton} onClick={handleSubmitReview}>
        Submit Review
      </button>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
export default Reviews;