import React, { useState, useRef } from 'react';
import style from './ContactUs.module.css'
import emailjs from '@emailjs/browser';
import githubIcon from "../../assets/githubicon.png"
import linkedinIcon from "../../assets/linkedingicon.png"
import ceroWaste from "../../assets/CeroWasteCycle.avif"

export const ContactUs = () => {

const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const ref = useRef()
  const [success,setSuccess] = useState(null);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      formIsValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      formIsValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (validateForm()) {
    emailjs.sendForm('service_0nrvtlo', 'template_h09ak9q', ref.current, 'HFA10L3-dlaZZcGA1')
    .then((result) => {
        console.log(result.text);
        setSuccess(true);
        setFormData({
          ...formData,
          subject: '',
          message: ''
        })
    }, (error) => {
        console.log(error.text);
        setSuccess(false)
    });

  }
  };


  return (
    <div className={style.contactUs}>
        <form ref={ref} onSubmit={handleSubmit} className={style.contactForm}>
            <h2>Contact Us <hr/></h2>
          <div className={style.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            {errors.name && <p className={style.errorText}>{errors.name}</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p className={style.errorText}>{errors.email}</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} />
            {errors.subject && <p className={style.errorText}>{errors.subject}</p>}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange}></textarea>
            {errors.message && <p className={style.errorText}>{errors.message}</p>}
          </div>
          <div className={style.formGroup}>
            <button type="submit">Submit</button>
            {success === true && (
            <p className={style.successText}>Your message has been sent. We'll get back to you soon!</p>
            )}
            {success === false && (
            <p className={style.errorText}>An error occurred. Please try again later.</p>
            )}
          </div>
          <div className={style.contactLinks}>
            <h2>Find Us on <hr/></h2>
          <a href="https://linktr.ee/greenlandpf" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a href="https://linktr.ee/greenlandpf" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" />
          </a>
        </div>
        </form>
    
        
        <div className={style.imageContainer}>
        <img src={ceroWaste} alt="imagen del costado" />
        </div>
    
    </div>
  );
};