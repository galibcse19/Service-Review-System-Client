import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import MyReview from './MyReview';

const MyReviews = () => {
    const {reviewData,user} = useContext(AuthContext);
    const thisUserReview = reviewData.filter(thisUser => thisUser.userEmail=== user.email);
    // console.log(thisUserReview)
    return (
        <div className='p-6'>
            <h2 className="text-2xl text-center font-bold my-4">My Services</h2>
            <div className='card glass lg:w-2/3 md:w-3/4 w-full mx-auto  p-2'>
             {
                thisUserReview.map(review=><MyReview review={review} key={review._id}></MyReview>)
             }
            </div>
        </div>
    );
};

export default MyReviews;