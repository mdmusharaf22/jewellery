'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/product-detail/TrustBadges';
import Testimonials from '@/components/Testimonials';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['24 Temple Street', 'Chennai, Tamil Nadu 600001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@sriganeshjewellers.com', 'support@sriganeshjewellers.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Sunday', '10:00 AM - 8:30 PM'],
    },
  ];

  return (
    <>
      <Header />
      
      {/* Hero Banner */}
      <section 
        className="relative h-[200px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#2a2420] to-[#3E2723]"
      >
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-[90%] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#F5F1E8] rounded-lg p-8 text-center hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4">
                  <info.icon className="w-8 h-8 text-[#B8941E]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-3 text-base">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-xs text-gray-600 leading-relaxed">{detail}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Have a question or need assistance? Fill out the form below and we'll get back to you shortly.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="savings">Savings Scheme</option>
                    <option value="loan">Gold Loan</option>
                    <option value="custom">Custom Order</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8941E] focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#B8941E] text-white py-4 rounded-lg font-semibold hover:bg-[#9a7a18] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8 text-sm">
                Quick answers to common questions about our services and policies.
              </p>
              
              {/* FAQ Items */}
              <div className="space-y-4">
                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">Do I need an appointment to visit?</h3>
                  <p className="text-sm text-gray-600">
                    Walk-ins are welcome during business hours. However, we recommend booking an appointment 
                    for personalized consultations and custom orders.
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">What is your exchange policy?</h3>
                  <p className="text-sm text-gray-600">
                    We offer hassle-free exchange for gold and silver jewellery. Bring your old pieces 
                    and upgrade to new designs with transparent valuation.
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">Are all products BIS hallmarked?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, all our gold jewellery is BIS hallmarked ensuring 100% purity and quality. 
                    We provide proper certification with every purchase.
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">How does the savings scheme work?</h3>
                  <p className="text-sm text-gray-600">
                    Our monthly savings scheme allows you to save systematically for your jewellery purchase. 
                    Contact us for detailed terms and benefits.
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">Do you offer gold loans?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, we provide gold loan services with competitive interest rates and flexible 
                    repayment options. Visit us for quick processing.
                  </p>
                </div>

                <div className="bg-[#F5F1E8] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a1a] mb-2">Can I order custom designs?</h3>
                  <p className="text-sm text-gray-600">
                    Absolutely! We specialize in custom jewellery design. Share your ideas with our 
                    expert designers and we'll bring them to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#2a2420] to-[#3E2723] py-16 text-white">
        <div className="w-[90%] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prefer to Talk Directly?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our customer service team is available during business hours to answer your questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-[#B8941E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#9a7a18] transition cursor-pointer inline-block"
            >
              Call Now: +91 98765 43210
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1a1a1a] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer inline-block"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Common Sections */}
      <div className="py-12 md:py-16 bg-white">
        <div className="w-[98%] mx-auto mb-14 md:mb-18">
          <TrustBadges />
        </div>
        <div className="w-[100%] mx-auto">
          <Testimonials />
        </div>
      </div>

      <Footer />
    </>
  );
}
