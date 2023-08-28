import React, { useEffect, useState } from "react";
import styles from "./ClientComments.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../redux/action";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

function ClientComments() {
  const dispatch   = useDispatch();
  const allReviews = useSelector((state) => state.allReviews);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  useEffect(() => {
    const filtered       = allReviews.filter((review) => review.rating > 3);
    const shuffled       = shuffleArray(filtered);
    const limitedReviews = shuffled.slice(0, 10);

    setFilteredReviews(limitedReviews);
  }, [allReviews]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div className={styles.testimonials_container}>
      <div className={styles.testimonials_grid}>
        {filteredReviews.map((testimonial, index) => (
          <div key={index} className={styles.testimonial_box}>
            <div className={styles.avatar}>
              <img src={testimonial.user.image} alt="Avatar" />
              <div className={styles.avatar_details}>
                <div className={styles.avatar_name}>{testimonial.user.name}</div>
                <div className={styles.avatar_title}>{testimonial.product.name}</div>
                <div className={styles.avatar_rating}>{renderStars(testimonial.rating)}</div>
                <div className={styles.avatar_comments}>{testimonial.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientComments;