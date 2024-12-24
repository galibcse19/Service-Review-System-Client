import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyReview = ({review}) => {
    // console.log(review)
    const {rating,reviewDate,reviewText,reviwCategory,userEmail,userName,userPhotoURL}= review;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specficData, setSpecificdata]= useState('');
    const [UpdateReviewText, setUpdareReviewText] = useState('');
    const [updareRating, setUpdareRating] = useState(3);
    

    console.log(specficData)
    const handleDelete =(_id)=>{
        // console.log(_id)
        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`http://localhost:5000/reviews/${_id}`, {
                            method: 'DELETE',
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.deletedCount > 0) {
                                    Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                    );
                                } else {
                                    Swal.fire(
                                        "Failed!",
                                        "Something went wrong while deleting.",
                                        "error"
                                    );
                                }
                            })
                    }
                });
    }
    const handleUpdate =(review)=>{
        console.log(review)
        setSpecificdata(review);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleUpdateReview =()=>{
        const rating = updareRating;
        const reviewText = UpdateReviewText;
        const reviewDate = new Date().toLocaleDateString(); 
        const reviewData ={rating,reviewText,reviewDate,userName,userEmail,userPhotoURL,reviwCategory}
        // const reviewData ={rating,reviewText,reviewDate,userName,userEmail,userPhotoURL,reviwCategory}
        console.log(reviewData)
        fetch(`http://localhost:5000/reviews/${specficData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reviewData),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.modifiedCount > 0) {
                            toast.success('Review data updated successfully!', { position: "top-center" });
                        }
                    })
    }
    return (
       <div>
         <div className="card bg-base-100 lg:w-96 md:w-96 w-52 shadow-xl my-4 mx-auto">
            <div className="card-body">
                <h2 className="card-title">Title: {reviwCategory}</h2>
                <p>Text Review: {reviewText}</p>
                 <div className=' '>
                    <Rating
                            style={{ maxWidth: 140 }}
                            value={rating}
                            readOnly
                            /> 
                </div>
            </div>
            <div className='grid grid-cols-2 mx-8 mb-2'>
                <div >
                <button onClick={()=>handleUpdate(review)} className="btn btn-sm bg-green-500 w-full">Update</button>
                </div>
                <div>
                <button onClick={()=>handleDelete(review._id)} className="btn btn-sm bg-red-500 ml-2 w-full">Delete</button>
                </div>
            </div>
        </div>
        {isModalOpen && (
                <div className="fixed inset-0  min-h-min flex items-center justify-center z-50">
                    <div className="relative bg-cover bg-center pb-10 w-full max-w-3xl">
                        <div className="absolute inset-0 bg-green-600" />
                        <div className='p-6'>
                                        <div className='card lg:w-2/3 md:w-3/4 w-full mx-auto p-6'>
                                            <h2 className="text-xl font-bold mb-4">Update Your Review</h2>
                                            <div className='grid grid-cols-1'>
                                                <div>
                                                    <h2 className='font-bold mb-4'>Title: value={specficData.reviwCategory}</h2>
                                                 <textarea onChange={(e) => setUpdareReviewText(e.target.value)}
                                                defaultValue={specficData.reviewText} className="textarea textarea-info textarea-md w-full max-w-xs mb-4"></textarea>
                                                  <Rating
                                                    style={{ maxWidth: 180 }}
                                                    value={rating}
                                                    onChange={setUpdareRating}
                                                    isRequired
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm mt-4">
                                                        <strong>Today Date:</strong> {new Date().toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <button onClick={handleUpdateReview} 
                                            className=" w-full font-bold lg:p-4 mt-4 md:p-4 p-2 bg-green-500 text-white rounded-md hover:bg-red-500 transition duration-200"
                                            >
                                            Update Review
                                       </button>
                                        </div>
                                    </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
       </div>
    );
};

export default MyReview;