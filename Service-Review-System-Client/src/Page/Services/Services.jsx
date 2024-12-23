import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import Service from './Service';

const Services = () => {
    const { serviceData, loading } = useContext(AuthContext);
    return (
        <div>
             {
                loading && <span className="loading loading-spinner text-info"></span>
             }
              
            {/* Movies Grid */}
            <div className="lg:mx-40 md:mx-10 mx-2 mt-8 mb-32 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {serviceData.length > 0 ? (
                    serviceData.map(data => <Service data={data} key={data._id}></Service>)
                ) : (
                    <p className="text-center col-span-full">No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Services;