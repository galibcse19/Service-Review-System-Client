import React from 'react';
import { useLocation } from 'react-router-dom';

const ServiceDetails = () => {
    const location = useLocation(); 
    const { data } = location.state;
    const {serviceTitle,email,companyName,website,description,price,date,category,photo,_id} =data;
    // console.log(data);
    return (
        <div>
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
        </div>
    );
};

export default ServiceDetails;