import style from './Product.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsCartPlusFill, BsCheckCircleFill } from 'react-icons/bs';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import {alertConfirm} from '../SweetAlert/SweetAlert'

export const Product = ({ active, id, name, rating, description, price, image }) => {
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [whis, setWhis] = useState(false);

  const [iconSprings, iconApi] = useSpring(() => ({
    from: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
  }));

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProduct = products.find((p) => p.id === id);
    setIsCartClicked(!!existingProduct);
  }, [id]);

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
      if (lastSpaceIndex === -1) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text.slice(0, lastSpaceIndex) + '...';
      }
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.1;
    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(<BsStarFill key={i} className={style.star} />);
    }

    if (hasHalfStar) {
      starElements.push(<BsStarHalf key="half" className={style.star} />);
    }

    const emptyStars = 5 - starElements.length;
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(<BsStar key={`empty-${i}`} className={style.star} />);
    }

    return starElements;
  };

  const handleClick = () => {
    setIsCartClicked(!isCartClicked);

    iconApi.start({
      opacity: 0,
      transform: 'rotate(1080deg) scale(0.2)',
      onRest: () => {
        iconApi.start({
          opacity: 1,
          transform: 'rotate(0deg) scale(1)',
        });
      },
    });

    const product = {
      id: id,
      title: name,
      description: description,
      unit_price: price,
      quantity: 1,
      currency_id: 'USD',
      picture_url: image,
    };

    const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const updatedProducts = products.filter((p) => p.id !== product.id);

    if (updatedProducts.length === products.length) {
      updatedProducts.push(product);
    }

    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
  };


  const addWhislist = async (e) => {
    // const targetId = e.target.id;
    const product = JSON.parse(localStorage.getItem('whislist')) || [];
    const existingProduct = product?.find((p) => p.id === Number(id));

    if (!whis) {
      if (!existingProduct) {
        product.push({ active, id, name, description, image, price, rating });
        localStorage.setItem('whislist', JSON.stringify(product));
        setWhis(true);
        // alert("Added to Whislist");
      } else {
        console.error("The product is already in the wishlist.");
      }
    } else {
      const resAlert = await alertConfirm('warning', 'Delete Product!','Do you want to remove this product from your wish list?')
      if (resAlert) {
        const updatedWhisList = product.filter((p) => p.id !== Number(id));
        localStorage.setItem("whislist", JSON.stringify(updatedWhisList));
        setWhis(false);
      }
    }
  };
  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("whislist")) || [];
    const existingP = product.find((p) => p.id === id);
    setWhis(!!existingP)
  }, [id]);


  return (
    <div key={id} className={style.prodCont}>
      <Link to={`/detail/${id}`}>
        <img src={image} alt='' />
      </Link>

      {!whis ? (
        <AiOutlineHeart id={id} className={style.prodHeartEmpty} onClick={addWhislist} size={28} />
      ) : (
        <AiFillHeart className={style.prodHeartEmpty} onClick={addWhislist} size={28} />
      )}

      <h2>{name}</h2>
      <h3>{truncateDescription(description, 30)}</h3>
      <p>Price: ${price}</p>
      <div className={style.prodCart}>
        <animated.div
          onClick={handleClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...iconSprings,
          }}
        >
          {isCartClicked ? (
            <BsCheckCircleFill size={40} />
          ) : (
            <BsCartPlusFill size={40} />
          )}
        </animated.div>
      </div>

      <div className={style.prodStarCont}>{renderStars(rating)}</div>
    </div>
  );
};