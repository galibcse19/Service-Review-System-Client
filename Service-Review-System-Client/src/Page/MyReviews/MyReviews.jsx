import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import MyReview from './MyReview';
import DynamicTitle from '../../Shared/DynamicTitle';

const MyReviews = () => {
    const {reviewData,user} = useContext(AuthContext);
    const thisUserReview = reviewData.filter(thisUser => thisUser.userEmail=== user.email);
    // console.log(thisUserReview)
    return (
        <div className='p-6'>
            <DynamicTitle heading={"Featured Services"}></DynamicTitle>
            <div className='card glass lg:w-2/3 md:w-3/4 w-full mx-auto my-4  p-2'>
             {
                thisUserReview.map(review=><MyReview review={review} key={review._id}></MyReview>)
             }
            </div>
        </div>
    );
};

export default MyReviews;