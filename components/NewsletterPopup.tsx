'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import Image from 'next/image';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend

      setIsSubmitted(true);
      
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-64 md:h-auto bg-gradient-to-br from-[#B8941E] to-[#9a7a19]">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-center text-white">
                <Mail className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-sm opacity-90">Get exclusive offers & new arrivals</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Join Our Newsletter
                </h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#B8941E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B8941E] text-white py-3 rounded-lg font-semibold hover:bg-[#9a7a19] transition"
                  >
                    Subscribe Now
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
