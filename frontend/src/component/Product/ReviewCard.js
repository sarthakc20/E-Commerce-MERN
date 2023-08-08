import React from 'react';
import userlogo from "../../images/user.png"
import { Rating } from '@mui/material';
import Loader from '../layout/Loader/Loader';
import { useSelector } from 'react-redux';

const ReviewCard = ({ review }) => {

  const { user, loading } = useSelector((state) => state.user);

    const option = {
      size: "small",
      readOnly: true,
      value: review.rating,
      precision: 0.5
    };

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
    <div className='reviewCard'>
      <img src={user ? user.avatar.url : userlogo } alt={user.name} />
      <p>{review.name}</p>
      <Rating {...option} /> 
      <span className='Comment'>{review.comment}</span>
    </div>
    )}
    </>
  );
};

export default ReviewCard;
