import React,{useState} from 'react';
import Footer from './Footer';
import Start from '../components/Start';
import ContactForm from '../components/ContactForm';
import Navbar from "../components/navbar/Navbar";

function Contact() {
  const [navClose, setNavClose] = useState(false);

  return (
    <>
      <Navbar closeNav={navClose} />
      <div onClick={() => setNavClose(!navClose)}>
        <Start
          cName="hero-contact"
          title="Contact Us"
          text="We will be happy to assist you with any question ragarding purchases."
          // buttonText='Shop Now'
          btnClass="hide"
        />
        <ContactForm />
        <Footer />
      </div>
    </>
  );
}

export default Contact