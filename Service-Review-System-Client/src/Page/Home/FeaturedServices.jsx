import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import DynamicTitle from '../../Shared/DynamicTitle';
import Service from '../Services/Service';

const FeaturedServices = () => {
    const {serviceDataLimit,loading} = useContext(AuthContext);
    console.log(serviceDataLimit)
    return (
        <div>
            <DynamicTitle heading={"Featured Services"}></DynamicTitle>
            {
                loading && <span className="loading loading-spinner text-info"></span>
             }
              
            {/* Movies Grid */}
            <div className="lg:mx-40 md:mx-10 mx-2 mt-8 mb-32 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {serviceDataLimit.length > 0 ? (
                    serviceDataLimit.map(data => <Service data={data} key={data._id}></Service>)
                ) : (
                    <p className="text-center col-span-full">No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default FeaturedServices;