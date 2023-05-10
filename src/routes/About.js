import React from 'react';
import Navbar from '../components/navbar/Navbar';
import '../Style/about.css';
import Start from '../components/Start';
import Footer from './Footer';

function About() {
  return (
    <>
      <Navbar />
      <Start
        cName="hero-about"
        title="About us"
        //text="We will be happy to assist you with any question ragarding purchases."
        // buttonText='Shop Now'
        btnClass="hide"
      />
      <div className="main-about">
        <div className="sub-about">
          <img src="/about/about.jpg" alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="sub-about">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <img src="/about/about.jpg" alt="" />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default About