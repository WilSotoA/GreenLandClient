import React, { useEffect } from "react";
import style from './Updates.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../../redux/action";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const Updates = () => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allReviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const sortedReviews = allReviews
  ? [...allReviews].sort((a, b) => new Date(b.date) - new Date(a.date))
  : [];
  const recentReviews = sortedReviews.slice(0, 6);
  

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
    <div className={style.Updates}>
        {recentReviews.map((review) => {
        return (
          <div className={style.update}>
            <img src={review.user.image} alt="profile" />
            <div className={style.notification}>
              <div>
                <span> {review.product.name}</span>
              </div>
              <div style={{marginBottom: '0.5rem'}}>
              <span>{renderStars(review.rating)}</span>
              </div>
                <span>{review.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}

