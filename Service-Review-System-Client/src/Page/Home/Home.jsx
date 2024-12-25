import React  from 'react';
import Banner from './Banner';
import FeaturedServices from './FeaturedServices';
import MeetOurPartners from './MeetOurPartners';
import ExtraSection1 from './ExtraSection1';
import ExtraSection2 from './ExtraSection2';
import Countup from './Countup';

const Home = () => {
   
    return (
        <div>
             <Banner></Banner>
             <FeaturedServices></FeaturedServices>
             <Countup></Countup>
             <MeetOurPartners></MeetOurPartners>
             <ExtraSection1></ExtraSection1>
             <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default Home;