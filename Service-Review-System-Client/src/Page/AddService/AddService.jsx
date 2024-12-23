import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';

const AddService = () => {
    const {user} = useContext(AuthContext);
    const [currentDate] = useState(new Date().toLocaleDateString());
    const {error, setError} = useState('');

    const handleSubmit =(event)=>{
        event.preventDefault();
        const form = event.target;
        const serviceTitle = form.serviceTitle.value;
        const email = form.email.value;
        const companyName = form.companyName.value;
        const website = form.website.value;
        const description = form.description.value;
        const price = form.price.value;
        const date = form.date.value;
        const category = form.category.value;
        const photo = form.photo.value;

        const serviceData ={serviceTitle,email,companyName,website,description,price,date,category,photo};
        console.log(serviceData)
        fetch('http://localhost:5000/services',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(serviceData)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                toast.success('Data submit sucessfully',{position: "top-center"});
            }
        })
        // .catch(error => console.log(error.message));
        .catch(error =>{
            setError(error.message)
        });
    }
        
    return (
        <div>
            <div className="relative bg-cover bg-center pb-10">
            <div className="absolute inset-0 bg-green-600" />
                {/* Upper Section with Glassmorphism */}
                <div className="backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg p-4 w-full shadow-lg text-center">
                    <h1 className="text-xl md:text-2xl font-bold text-white">Here - Add Service</h1>
                </div>
                <form  onSubmit={handleSubmit} className="grid lg:grid-cols-2 grid-cols-1 mt-6 text-black backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg p-6 lg:w-2/3 md:w-2/3 w-full mx-auto shadow-lg text-center">
                    <div>
                           <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Service Title:</span>
                                </div>
                                <input required name="serviceTitle" type="text" placeholder="Enter Service Title" className="input input-bordered lg:w-[90%] w-full"/>
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Email:</span>
                                </div>
                                <input required type="email" name="email"  value={user.email} disabled  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Company Name:</span>
                                </div>
                                <input required type="text" name="companyName"   placeholder="Enter Company Name"  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Website:</span>
                                </div>
                                <input required name="website" type="text"   placeholder="Enter Website Link"  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Description:</span>
                                </div>
                                <input required name="description" type="text"   placeholder="Enter Description"  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                    </div>
                    <div>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Price:</span>
                                </div>
                                <input required name="price" type="text"   placeholder="Enter Service Price"  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Date:</span>
                                </div>
                                <input required name="date" disabled  value={currentDate}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                             
                            <label className="form-control w-full text-white">
                                    <div className="label">
                                        <span className="label-text text-white">Category</span>
                                    </div>
                                    <select name="category" required className="select select-bordered lg:w-[90%] w-full">
                                        <option>Network Management</option>
                                        <option>Cybersecurity</option>
                                        <option>Cloud Computing</option>
                                        <option selected>Software Development</option>
                                        <option>Data Analytics</option>
                                        <option>IT Support Services</option>
                                        <option>AI and Machine Learning</option>
                                        <option>IoT Solutions</option>
                                        <option>Blockchain Technology</option>
                                        <option>IT Consulting</option>
                                    </select>
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Service Image URL:</span>
                                </div>
                                <input required name="photo" type="text"   placeholder="Enter Poster PhotoURL"  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-white">Now Submit</span>
                                </div>
                                <button
                                type="submit"
                                className="font-bold p-3 bg-green-600 text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]"
                                >
                                Add Service
                               </button>
                           </label>
                            
                    </div>
                    
                </form>
                {error}
            </div>
        </div>
    );
};

export default AddService;