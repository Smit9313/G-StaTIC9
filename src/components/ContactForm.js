import React,{ useState } from 'react';
import '../Style/contactform.css';
import { Toaster, toast } from "react-hot-toast";

function ContactForm() {

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameFlag, setNameFlag] = useState(false);


  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);

  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [subjectFlag, setSubjectFlag] = useState(false);

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageFlag, setMessageFlag] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    /*************** Name *************/
    let nameNull = name.trim() === "";

    if (nameNull) {
      setNameFlag(false);
      setNameError("Name Should not blank.");
    }

    if (!nameNull) {
      setNameFlag(true);
    }

    /*************** Email *************/
    const email_pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let emailNull = email.trim() === "";

    if (emailNull) {
      setEmailFlag(false);
      setEmailError("Email Should not be blank.");
    }

    if (!email_pattern.test(email)) {
      setEmailFlag(false);
      setEmailError("Enter Valid Email.");
    }

    if (!emailNull && email_pattern.test(email)) {
      setEmailFlag(true);
       setEmailError("");
    }

    /*************** Subject *************/
    if (subject === "") {
      setSubjectFlag(false);
      setSubjectError("Subject should not be blank!.");
    }

    if (subject !== "") {
      setSubjectFlag(true);
      setSubjectError("");
    }

    /*************** Message *************/
    if (message === '') {
      setMessageFlag(false);
      setMessageError("Message should not be blank!");
    }

    if (message !== "") {
      setMessageFlag(true);
       setMessageError("");
    }

    if(nameNull || emailNull || !email_pattern.test(email) || subject === "" || message === ''){
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }

    if(!nameNull && !emailNull && email_pattern.test(email) && subject !== "" && message !== ""){
      
      toast.success("Valid!");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    }


  }

  return (
    <>
      <div className="form-container">
        <h1>Send a message to us!</h1>
        <form type="submit">
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          {!nameFlag && <p>{nameError}</p>}
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!emailFlag && <p>{emailError}</p>}
          {/* {errorFlag && <p>{error}</p>} */}
          <input
            type="text"
            value={subject}
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          {!subjectFlag && <p>{subjectError}</p>}

          <textarea
            placeholder="Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {!messageFlag && <p>{messageError}</p>}
          <button type="submit" onClick={handleSubmit}>
            Send Message
          </button>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default ContactForm