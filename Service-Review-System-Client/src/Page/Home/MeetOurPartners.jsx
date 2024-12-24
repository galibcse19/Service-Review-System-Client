import React from 'react';
import DynamicTitle from '../../Shared/DynamicTitle';

const MeetOurPartners = () => {
    const partners = [
        {
            name: "TechNova Inc.",
            logo: "https://i.ibb.co.com/QXctq1b/a18.png", // Replace with actual logo URL
            description: "TechNova Inc. provides innovative technology solutions and IT consulting services.",
        },
        {
            name: "GreenTech Solutions",
            logo: "https://i.ibb.co.com/syLr10n/a12.jpg", // Replace with actual logo URL
            description: "GreenTech Solutions specializes in sustainable IT practices and eco-friendly tech.",
        },
        {
            name: "Cloud Connect",
            logo: "https://i.ibb.co.com/Vpdc9H6/a13.jpg", // Replace with actual logo URL
            description: "Cloud Connect offers reliable cloud computing and data management services.",
        },
        {
            name: "CyberSecure Labs",
            logo: "https://i.ibb.co.com/pbfKYCB/a14.png", // Replace with actual logo URL
            description: "CyberSecure Labs ensures top-notch cybersecurity for our systems and applications.",
        },
    ];
    return (
        <div>
        <section className="py-12 bg-gray-100 lg:mx-40">
            <div className="container mx-auto px-4 text-center">
            <DynamicTitle heading={"Meet Our Partners"}></DynamicTitle>
                <p className="text-gray-600 mb-10">
                    We collaborate with industry leaders to deliver the best solutions for our users.
                </p>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-700">{partner.name}</h3>
                            <p className="text-gray-600 mt-2">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
   
 
 

        </div>
    );
};

export default MeetOurPartners;