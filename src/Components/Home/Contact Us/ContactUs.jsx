/* eslint-disable no-unused-vars */
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import './ContactUs.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                'service_wqcg5ef',
                'your_template_id',
                formData,
                'your_user_id'
            );
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            toast.error('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="contact__header">
                    <h2 className="title">
                        <span className="title-highlight">Contact Us</span>
                    </h2>
                    <p className="subtitle">Have a Question, Don't Hesitate</p>
                </div>

                <div className="contact__content">
                    <div className="contact__info">
                        <img src="/Contact Us.png" alt="" className="contact-img" />
                    </div>

                    <div className="contact__form-container">
                        <h3 className="contact__form-title">Send a message</h3>
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div className="contact__form-row">
                                <div className="contact__form-group">
                                    <label htmlFor="name" className="contact__form-label">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="contact__form-input"
                                        required
                                    />
                                </div>

                                <div className="contact__form-group">
                                    <label htmlFor="email" className="contact__form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="contact__form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact__form-group">
                                <label htmlFor="subject" className="contact__form-label">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="contact__form-input"
                                    required
                                />
                            </div>

                            <div className="contact__form-group">
                                <label htmlFor="message" className="contact__form-label">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="contact__form-textarea"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="contact__submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;