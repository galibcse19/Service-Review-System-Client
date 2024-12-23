import React from 'react';
import { useNavigate } from 'react-router-dom';

const Service = ({data}) => {
    const {serviceTitle,email,companyName,website,description,price,date,category,photo,_id} =data;
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/serviceDetails/${_id}`, { state: { data } }); 
    };
    return (
        <div>
           <div className="card bg-slate-200 lg:w-96 md:w-84 w-76">
             <div className='p-4'>
                <img className='w-full h-48 border rounded-lg' src={photo} alt="" />
                 <h2 className='my-2 font-bold text-2xl'>Title: {serviceTitle}</h2>
                 <p>Description: <span className='font-bold my-1'>{description}</span></p>
                 <p>Category: <span className='font-bold my-1'>{category}</span></p>
                 <p>Price: <span className='font-bold my-1'>{price}</span></p>
             </div>
                <button onClick={handleDetails}
                    className="w-full font-bold lg:p-4 md:p-4 p-2 bg-green-600 text-white rounded-md hover:bg-red-500 transition duration-200"
                    >
                    See Details
               </button>
           </div>
        </div>
    );
};

export default Service;