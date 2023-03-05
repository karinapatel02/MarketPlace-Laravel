import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"
import Footer from "./footer";
import Navbar from "./Navbar";

function Contact() {
  const navigate = useNavigate();
  const Submit = async (e) => {
    alert("Thank you for contacting us");
    navigate('/home');
  }
  return (
    <div>
      <Navbar />
      <div id="contact">
        <div className="formboldmainwrapper">
          <div className="formboldformwrapper">
            <form onSubmit={Submit} method="POST">
              <div className="formboldmb5">
                <label htmlFor="name" className="formboldformlabel" style={{ color: 'black' }}> Full Name </label>
                <input type="text" name="name" id="name" placeholder="Full Name" className="formboldforminput" />
              </div>

              <div className="formboldmb5">
                <label htmlFor="email" className="formboldformlabel" style={{ color: 'black' }}> Email Address </label>
                <input type="email" name="email" id="email" placeholder="Enter your Email" className="formboldforminput" />
              </div>

              <div className="formboldmb5">
                <label htmlFor="subject" className="formboldformlabel" style={{ color: 'black' }}> Subject </label>
                <input type="text" name="subject" id="subject" placeholder="Enter your Subject"
                  className="formboldforminput" />
              </div>

              <div className="formboldmb5">
                <label htmlFor="msg" className="formboldformlabel" style={{ color: 'black' }}> Message </label>
                <div>
                  <textarea name="msg" id="msg" placeholder="Type your Message"
                    className="formboldforminput"></textarea>
                </div>
              </div>

              <div>
                <button type="button" style={{ marginLeft: 250 }} className="formboldbtn" onClick={() => navigate("/contact")}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact

