import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Service from './Service';
import DynamicTitle from '../../Shared/DynamicTitle';

const Services = () => {
    const { serviceData, loading } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredData, setFilteredData] = useState([]);

    // Update filteredData when serviceData changes or filters are applied
    useEffect(() => {
        if (serviceData) {
            let filtered = serviceData;

            // Apply category filter
            if (selectedCategory !== 'All') {
                filtered = filtered.filter(service => service.category === selectedCategory);
            }

            // Apply search filter
            if (searchQuery) {
                filtered = filtered.filter(service =>
                    service.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredData(filtered);
        }
    }, [serviceData, searchQuery, selectedCategory]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    return (
        <div>
            <DynamicTitle heading={"Service All Information"}></DynamicTitle>

            {/* Search and Category Filter */}
            <div className="text-center my-4">
                <select
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="select select-bordered select-accent w-[50%]"
                >
                    <option value="All">All Categories</option>
                    <option value="Network Management">Network Management</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="IT Support Services">IT Support Services</option>
                    <option value="AI and Machine Learning">AI and Machine Learning</option>
                    <option value="IoT Solutions">IoT Solutions</option>
                    <option value="Blockchain Technology">Blockchain Technology</option>
                    <option value="IT Consulting">IT Consulting</option>
                </select>
            </div>

            {/* Search Input */}
            <div className="my-4 text-center">
                <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="input input-bordered input-accent w-[50%]"
                />
            </div>
            {loading && <span className="loading loading-spinner text-info"></span>}

            {/* Services Grid */}
            <div className="lg:mx-40 md:mx-10 mx-2 mt-8 mb-32 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {filteredData.length > 0 ? (
                    filteredData.map(data => <Service data={data} key={data._id}></Service>)
                ) : (
                    <p className="text-center col-span-full">No services found.</p>
                )}
            </div>
        </div>
    );
};

export default Services;
