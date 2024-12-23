import React from 'react';

const ShowReview = ({data}) => {
    console.log(data);
    return (
        <div>
            <div className='grid lg:grid-cols-3 grid-cols-1'>
              <div>
                <div className='mt-4'>
                   Name: <span className='font-bold'>{data.userName}</span>
                </div>
                <div className="avatar my-4">
                    <div className="ring-primary ring-offset-base-100 w-12  rounded-xl ring ring-offset-2">
                     <img src={data.userPhotoURL} alt="" />
                    </div>
                </div>
              </div>
              <div>
                <div className='lg:mt-4 mt-2'>
                Review Text: {data.reviewText}
                </div>
                <div className='lg:my-4'>
                Rating: {data.rating}
                </div>
              </div>
              <div className='my-4  lg:px-6'>
                Review Date: <span className='font-bold'>{data.reviewDate}</span>
              </div>
            </div>
            <hr />
        </div>
    );
};

export default ShowReview;