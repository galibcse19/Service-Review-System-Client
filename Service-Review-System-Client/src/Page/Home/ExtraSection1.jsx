import React from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

const ExtraSection1 = () => {
    return (
        <div>
            <DynamicTitle heading={"Our Services"}></DynamicTitle>
             <div className='my-6 lg:mx-40'>
            <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image Section */}
                    <div>
                    <motion.img src="https://i.ibb.co.com/pbfKYCB/a14.png" className="rounded-lg shadow-lg w-full"
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.5 }}
                            onHoverStart={() => console.log('hover started!')}
                            />
                        {/* <img
                            src=" "
                            alt="Sample"
                            className="rounded-lg shadow-lg w-full"
                        /> */}
                    </div>

                    {/* Text Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Our Services</h2>
                        <p className="text-gray-600 mb-6">
                            We provide world-class solutions designed to meet your unique needs. Our dedicated team
                            ensures exceptional service delivery, helping you achieve your goals with innovative
                            and tailored approaches.
                        </p>
                        <Link to={'/services'}>
                        <button 
                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-red-500 transition duration-200"
                        >
                        Learn More
                       </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        </section>
            </div>
           
        </div>
    );
};

export default ExtraSection1;