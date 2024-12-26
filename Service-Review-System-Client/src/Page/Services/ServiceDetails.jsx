import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';
import ShowReview from './ShowReview';

const ServiceDetails = () => {
    const { loading,user,reviewData } = useContext(AuthContext);
    const location = useLocation(); 
    const {error, setError} = useState('');
    const [rating, setRating] = useState(3);
    const [reviewText, setReviewText] = useState('');
    const { data } = location.state;
    const {serviceTitle,companyName,website,description,price,date,category,photo,_id} =data;
    const reviewDate = new Date().toLocaleDateString(); 
    const userEmail = user.email;
    const userPhotoURL = user.photoURL;
    const userName = user.displayName;
    const reviwCategory = category;

 

    // console.log(reviewData);
    // console.log(reviewData.reviwCategory);

    const thisServiceReview = reviewData.filter(thisReview => thisReview.reviwCategory === category);
    // console.log(thisServiceReview)

    const handleReview =()=>{
        if (!reviewText || rating === 0) {
            toast.error('Please provide both review text and rating', { position: 'top-center' });
            return;
          }
        //  console.log(rating,reviewText,reviewDate,userName,userEmail,userPhotoURL)  
         const reviewData ={rating,reviewText,reviewDate,userName,userEmail,userPhotoURL,reviwCategory}
        //  console.log(reviewData)
        fetch('https://service-review-system-server-gray.vercel.app/reviews',{
                    method: 'POST',
                    headers:{
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reviewData)
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.insertedId){
                        toast.success('Review submitted',{position: "top-center"});
                    }
                })
                // .catch(error => console.log(error.message));
                .catch(error =>{
                    setError(error.message)
                });
    }
    return (
        <div>
            {
                loading && <span className="loading loading-spinner text-info"></span>
             }
            <div className="p-6">
                <div className="card glass lg:w-2/3 md:w-3/4 w-full mx-auto p-6">
                    <img className="w-full h-full border rounded-lg mb-4" src={photo} alt="" />
                    {/* <h2 className='my-2 font-bold text-xl'>Title: {serviceTitle}</h2> */}
                    <p>Title: <span className='font-bold my-1'>{serviceTitle}</span></p>
                    <p>Company Name: <span className='font-bold my-1'>{companyName}</span></p>
                    <p>Website: <span className='font-bold my-1'>{website}</span></p>
                    <p>Price: <span className='font-bold my-1'>{price}</span></p>
                    <p>Publish Date: <span className='font-bold my-1'>{date}</span></p>
                    <p>Category: <span className='font-bold my-1'>{category}</span></p>
                    <p className="text-md mb-4">Description: {description}</p>
                </div>
            </div>
            <div className='p-6'>
                <div className='card glass lg:w-2/3 md:w-3/4 w-full mx-auto p-6'>
                    <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
                    <div className='grid lg:grid-cols-2 grid-cols-1'>
                        <div>
                         <textarea onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..." className="textarea textarea-info textarea-md w-full max-w-xs mb-4"></textarea>
                          <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            isRequired
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mt-4">
                                <strong>Today Date:</strong> {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <button onClick={handleReview}
                    className="lg:w-1/3 md:w-1/2 w-full font-bold lg:p-4 mt-4 md:p-4 p-2 bg-green-500 text-white rounded-md hover:bg-red-500 transition duration-200"
                    >
                    Add Review
               </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
            <div className='p-6'>
                <div className='card glass lg:w-2/3 md:w-3/4 w-full mx-auto p-6'>
                    <h3 className='font-bold text-xl'>Total Review: {thisServiceReview.length}</h3>
                    
                    {
                    thisServiceReview.map(data =><ShowReview data={data} key={data._id}></ShowReview>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default ServiceDetails;