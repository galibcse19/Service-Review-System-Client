import React from 'react';
import animation from '../../assets/Animation.json'
import Lottie from 'lottie-react';
import DynamicTitle from '../../Shared/DynamicTitle';
const ExtraSection2 = () => {
    return (
        <div className=' my-10'>
            <DynamicTitle heading={"FAQ: Service Review"}></DynamicTitle>
              <div className='lg:mx-40 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 rounded p-6'>
                <div className='col-span-2'>
                <div className="collapse collapse-arrow mt-6">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">Service Section</div>
                <div className="collapse-content">
                    <p className='font-bold'>What IT support services do you offer?</p>
                    We provide a wide range of IT support services, including network management, cybersecurity solutions, cloud computing assistance, and on-site technical support.

                    <p className='font-bold'>How secure is your cloud storage solution?</p>
                    Our cloud storage solutions are designed with top-tier security protocols, including end-to-end encryption, multi-factor authentication, and regular security audits to protect your data from unauthorized access.
 
                </div>
                </div>
                <div className="collapse collapse-arrow ">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Review Section</div>
                <div className="collapse-content">
                <p className='font-bold'>How do I leave a review?</p>
                    You can leave a review by clicking on the 'Add Review' button on the service details page. Fill in the review form with your rating and feedback, then submit it.

                    <p className='font-bold'>Can I edit or delete my review?</p>
                    Currently, you cannot edit your review once it is submitted. However, you can delete it and submit a new review if necessary.
                </div>
                </div>
                 
                </div>
                <div className='p-6'>
                <Lottie animationData={animation}></Lottie>
                </div>
              </div>
        </div>
    );
};

export default ExtraSection2;