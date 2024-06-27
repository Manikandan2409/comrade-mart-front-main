// import React from 'react';

// const Home = () => {
//   return <div>Home Page</div>;
// };

// export default Home;
import React from 'react';
import Caro from '../components/Caro';
import carossel1 from '../assets/carossel1.jpeg';
import carossel2 from '../assets/carossel2.jpg';
import carossel3 from '../assets/carossel3.jpeg';
import AboutUs from '../components/About';
import OurProducts from '../components/HotProducts';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Feedback from '../components/Feedback';
const Home = () => {
  const slides = [carossel1, carossel2, carossel3];

  return (
    <div className="max-h-full">
     <Navbar/>
      <Caro autoSlide={true}>
        {
          slides.map((s, index) => <img key={index} src={s} alt={`Slide ${index + 1}`} className="w-full h-72"   />)
        }
      </Caro>
      <AboutUs/>
      <OurProducts/>
        <Feedback/>
      <Footer/>
    </div>
  );
};

export default Home;
