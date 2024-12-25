import React, { useContext } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProviders';
import CountUp from 'react-countup';

const Countup = () => {
    const { countUser, serviceData, reviewData } = useContext(AuthContext);
    //  console.log(countUser)
    return (
        <div className='mb-8'>
            <DynamicTitle heading={"Count up"}></DynamicTitle>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-5 grid-cols-1 my-4 lg:mx-40 md:mx-20 mx-4 p-6'>
                <div className='p-4 bg-green-500 rounded-lg text-white text-center'>
                    <h2 className='font-bold text-2xl'>Total User</h2>
                    <p className='py-2 text-bold text-4xl'><CountUp end={countUser+1} duration={8}/></p>
                </div>
                <div className='p-4 bg-green-500 rounded-lg text-white text-center'>
                    <h2 className='font-bold text-2xl'>Total Service</h2>
                    <p className='py-2 text-bold text-4xl'><CountUp end={serviceData.length+1} duration={8}/></p>
                </div>
                <div className='p-4 bg-green-500 rounded-lg text-white text-center'>
                    <h2 className='font-bold text-2xl'>Total Review</h2>
                    <p className='py-2 text-bold text-4xl'><CountUp end={reviewData.length+1} duration={8}/></p>
                </div>
            </div>
        </div>
    );
};

export default Countup;
