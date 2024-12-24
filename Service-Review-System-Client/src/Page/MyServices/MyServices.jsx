import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';

const MyServices = () => {
    const {user,serviceData} = useContext(AuthContext);
    // console.log(serviceData)
 
    const thisUserService = serviceData.filter(thisUser => thisUser.email === user.email);

    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredData, setFilteredData] = useState(thisUserService || []);
    // console.log(thisUserService)

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = thisUserService.filter((service) =>
            service.serviceTitle.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

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
                                <td><button className="btn btn-sm bg-green-500">Update</button></td>
                                <td><button className="btn btn-sm bg-red-500 ml-2">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                thisUserService.length === 0 && (<p className="text-center text-gray-500 mt-4">No services found.</p>)
            }
            </div>
        </div>
    );
};

export default MyServices;