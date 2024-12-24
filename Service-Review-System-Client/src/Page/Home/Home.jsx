import React  from 'react';
import Banner from './Banner';
import FeaturedServices from './FeaturedServices';
import MeetOurPartners from './MeetOurPartners';
import ExtraSection1 from './ExtraSection1';

const Home = () => {
   
    return (
        <div>
             <Banner></Banner>
             <FeaturedServices></FeaturedServices>
             <MeetOurPartners></MeetOurPartners>
             <ExtraSection1></ExtraSection1>
        </div>
    );
};

export default Home;