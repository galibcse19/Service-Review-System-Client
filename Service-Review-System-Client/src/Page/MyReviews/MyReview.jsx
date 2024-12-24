import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import React from 'react';
import Swal from 'sweetalert2';

const MyReview = ({review}) => {
    // console.log(review)
    const {rating,reviewDate,reviewText,reviwCategory,userEmail,userName,userPhotoURL}= review;
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
    const handleUpdate =()=>{

    }
    return (
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
                <button onClick={()=>handleUpdate()} className="btn btn-sm bg-green-500 w-full">Update</button>
                </div>
                <div>
                <button onClick={()=>handleDelete(review._id)} className="btn btn-sm bg-red-500 ml-2 w-full">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyReview;