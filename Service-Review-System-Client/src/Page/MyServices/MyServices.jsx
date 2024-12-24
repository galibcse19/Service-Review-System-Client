import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyServices = () => {
    const {user,serviceData} = useContext(AuthContext);
    // console.log(serviceData)
 
    const thisUserService = serviceData.filter(thisUser => thisUser.email === user.email);

    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState(thisUserService || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specficData, setSpecificdata]= useState('');
    const {error, setError} = useState('');
    const [currentDate] = useState(new Date().toLocaleDateString());
    console.log(filteredData) 

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = thisUserService.filter((service) =>
            service.serviceTitle.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    const handleDelete = (_id) => {
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
                fetch(`http://localhost:5000/services/${_id}`, {
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
    };

    const handleUpdate =(service)=>{
        // console.log(service)
        setSpecificdata(service);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        fetch(`http://localhost:5000/services/${specficData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success('Service data updated successfully!', { position: "top-center" });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl text-center font-bold my-4">My Services</h2>
            <div className="mb-4 text-center">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="input input-bordered input-accent w-full max-w-md"
                />
            </div>
            <div className='card glass lg:w-2/3 md:w-3/4 w-full mx-auto p-6'>
             {/* Table */}
             <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Publish Date</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filteredData.map((service, index) => (
                            <tr key={service._id}>
                                <td>{index + 1}</td>
                                <td>{service.serviceTitle}</td>
                                <td>{service.category}</td>
                                <td>${service.price}</td>
                                <td>{service.date}</td>
                                <td><button onClick={()=>handleUpdate(service)} className="btn btn-sm bg-green-500">Update</button></td>
                                <td><button onClick={()=>handleDelete(service._id)} className="btn btn-sm bg-red-500 ml-2">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                thisUserService.length === 0 && (<p className="text-center text-gray-500 mt-4">No services found.</p>)
            }
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-cover bg-center pb-10 w-full max-w-3xl">
                        <div className="absolute inset-0 bg-green-600" />
                        <div className="backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg p-4 w-full shadow-lg text-center">
                            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-white">Here - Update Service</h1>
                        </div>
                        <form onSubmit={handleSubmit}   className="grid grid-cols-2 mt-6 text-black backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 rounded-lg p-6 lg:w-2/3 md:w-2/3 w-full mx-auto shadow-lg text-center">
                          <div>
                           <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Service Title:</span>
                                </div>
                                <input required name="serviceTitle" type="text" defaultValue={specficData.serviceTitle} className="input input-bordered lg:w-[90%] w-full"/>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Email:</span>
                                </div>
                                <input required type="email" name="email"  value={user.email} disabled  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Company Name:</span>
                                </div>
                                <input required type="text" name="companyName" defaultValue={specficData.companyName}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Website:</span>
                                </div>
                                <input required name="website" type="text" defaultValue={specficData.website}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text text-white">Description:</span>
                                </div>
                                <input required name="description" type="text" defaultValue={specficData.description}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                    </div>
                    <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Price:</span>
                                </div>
                                <input required name="price" type="text" defaultValue={specficData.price}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Date:</span>
                                </div>
                                <input required name="date" disabled  defaultValue={currentDate}  className="input input-bordered lg:w-[90%] w-full" />
                            </label>
                             
                            <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text text-white">Category</span>
                                    </div>
                                    <select name="category" defaultValue={specficData.category} required className="select select-bordered lg:w-[90%] w-full">
                                        <option>Network Management</option>
                                        <option>Cybersecurity</option>
                                        <option>Cloud Computing</option>
                                        <option>Software Development</option>
                                        <option>Data Analytics</option>
                                        <option>IT Support Services</option>
                                        <option>AI and Machine Learning</option>
                                        <option>IoT Solutions</option>
                                        <option>Blockchain Technology</option>
                                        <option>IT Consulting</option>
                                    </select>
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-white">Service Image URL:</span>
                                </div>
                                <input required name="photo" type="text" defaultValue={specficData.photo}  className="input input-bordered lg:w-[90%] w-full" />
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
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            &times;
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default MyServices;