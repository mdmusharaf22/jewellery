'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import TrustBadges from '@/components/product-detail/TrustBadges';
import { Calculator, Gift, Shield, TrendingUp, CheckCircle, Calendar, Coins, Award } from 'lucide-react';
import Image from 'next/image';

export default function SavingsSchemePage() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [selectedPlan, setSelectedPlan] = useState('10+1');

  const calculateReturns = () => {
    const totalPaid = monthlyAmount * 10;
    const bonus = monthlyAmount * 1; // 11th month free
    const totalValue = totalPaid + bonus;
    return { totalPaid, bonus, totalValue };
  };

  const { totalPaid, bonus, totalValue } = calculateReturns();

  const plans = [
    {
      id: '10+1',
      name: '10+1 Scheme',
      duration: '11 Months',
      benefit: '1 Month Free',
      popular: true,
    },
    {
      id: '11+1',
      name: '11+1 Scheme',
      duration: '12 Months',
      benefit: '1 Month Free',
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: 'Extra Month Benefit',
      description: 'Get the 11th month absolutely free when you complete 10 monthly payments',
    },
    {
      icon: Shield,
      title: 'Secure Investment',
      description: 'Your savings are safe and can be redeemed for gold jewelry anytime',
    },
    {
      icon: TrendingUp,
      title: 'Beat Inflation',
      description: 'Gold prices tend to rise over time, protecting your purchasing power',
    },
    {
      icon: Calendar,
      title: 'Flexible Payments',
      description: 'Choose your monthly installment amount based on your budget',
    },
    {
      icon: Coins,
      title: 'No Hidden Charges',
      description: 'Transparent pricing with no hidden fees or charges',
    },
    {
      icon: Award,
      title: 'Premium Collection',
      description: 'Redeem your savings for any jewelry from our exclusive collection',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Enroll in the Scheme',
      description: 'Choose your monthly installment amount and register for the savings scheme',
    },
    {
      step: '2',
      title: 'Make Monthly Payments',
      description: 'Pay your chosen amount every month for 10 consecutive months',
    },
    {
      step: '3',
      title: 'Get Bonus Month',
      description: 'Receive the 11th month value as a bonus from us - completely free',
    },
    {
      step: '4',
      title: 'Shop for Jewelry',
      description: 'Use your total savings to purchase beautiful gold jewelry from our collection',
    },
  ];

  const faqs = [
    {
      question: 'What is the Gold Mine Savings Scheme?',
      answer: 'The Gold Mine Savings Scheme is a systematic savings plan where you pay for 10 months and get the 11th month free. It helps you save for your jewelry purchases in a disciplined manner.',
    },
    {
      question: 'What is the minimum monthly installment?',
      answer: 'The minimum monthly installment is ₹2,000. You can choose any amount above this based on your budget and savings goal.',
    },
    {
      question: 'Can I withdraw my savings before completion?',
      answer: 'Yes, you can withdraw your savings anytime. However, the bonus benefit is only applicable when you complete the full 10-month term.',
    },
    {
      question: 'Is the scheme transferable?',
      answer: 'Yes, the scheme can be transferred to your family members. You need to inform us and complete the transfer formalities.',
    },
    {
      question: 'What happens if I miss a payment?',
      answer: 'We provide a grace period of 7 days. If you miss a payment beyond the grace period, please contact our customer service to discuss options.',
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section with Image */}
      <div className="relative text-white py-6 xs:py-8 sm:py-10 md:py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1920&h=400&fit=crop&q=80"
            alt="Gold Savings"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative w-[90%] mx-auto text-center z-10 px-2 xs:px-3 sm:px-4">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-2.5 sm:mb-3">Gold Mine Savings Scheme</h1>
          <p className="text-base xs:text-lg md:text-xl mb-1.5 xs:mb-2">Pay for 10 Months, Get 11th Month FREE!</p>
          <p className="text-sm xs:text-base opacity-90">Save smart for your next jewelry purchase</p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-gray-50 py-6 xs:py-8 sm:py-10 md:py-12">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto border border-gray-200">
            <div className="flex items-center gap-2 xs:gap-3 mb-5 xs:mb-6 sm:mb-8">
              <Calculator className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#B8941E]" />
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">Savings Calculator</h2>
            </div>

            {/* Plan Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 mb-5 xs:mb-6 sm:mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-4 xs:p-5 sm:p-6 border-2 rounded-lg xs:rounded-xl transition ${
                    selectedPlan === plan.id
                      ? 'border-[#B8941E] bg-[#FFF8E7]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2 xs:-top-3 left-3 xs:left-4 bg-[#B8941E] text-white text-[10px] xs:text-xs font-bold px-2 xs:px-3 py-0.5 xs:py-1 rounded-full">
                      POPULAR
                    </span>
                  )}
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1 xs:mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-xs xs:text-sm mb-1">{plan.duration}</p>
                  <p className="text-[#B8941E] text-sm xs:text-base font-semibold">{plan.benefit}</p>
                </button>
              ))}
            </div>

            {/* Amount Slider */}
            <div className="mb-5 xs:mb-6 sm:mb-8">
              <label className="block text-base xs:text-lg font-semibold text-gray-900 mb-3 xs:mb-4">
                Monthly Installment Amount
              </label>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B8941E]"
              />
              <div className="flex justify-between text-xs xs:text-sm text-gray-600 mt-2">
                <span>₹2,000</span>
                <span className="text-xl xs:text-2xl font-bold text-[#B8941E]">
                  ₹ {monthlyAmount.toLocaleString('en-IN')}
                </span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 mb-5 xs:mb-6 sm:mb-8">
              <div className="bg-gray-50 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 text-center">
                <p className="text-xs xs:text-sm text-gray-600 mb-1.5 xs:mb-2">You Pay (10 Months)</p>
                <p className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                  ₹ {totalPaid.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 text-center">
                <p className="text-xs xs:text-sm text-green-700 mb-1.5 xs:mb-2">Bonus (11th Month)</p>
                <p className="text-lg xs:text-xl sm:text-2xl font-bold text-green-600">
                  ₹ {bonus.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-[#FFF8E7] rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 text-center">
                <p className="text-xs xs:text-sm text-[#B8941E] mb-1.5 xs:mb-2">Total Value</p>
                <p className="text-lg xs:text-xl sm:text-2xl font-bold text-[#B8941E]">
                  ₹ {totalValue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <button className="w-full bg-[#B8941E] text-white py-3 xs:py-3.5 sm:py-4 rounded-lg text-base xs:text-lg font-semibold hover:bg-[#9a7a19] transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-8 xs:py-10 sm:py-12 md:py-16 bg-white">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Why Choose Our Savings Scheme?
            </h2>
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg px-4">
              Designed to make your jewelry dreams come true with smart savings
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 hover:shadow-lg transition">
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-[#B8941E] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                  <benefit.icon className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-1.5 xs:mb-2">{benefit.title}</h3>
                <p className="text-sm xs:text-base text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-8 xs:py-10 sm:py-12 md:py-16 bg-gray-50">
        <div className="w-[90%] mx-auto px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg px-4">
              Simple steps to start your savings journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 text-center h-full">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-[#B8941E] text-white rounded-full flex items-center justify-center text-xl xs:text-2xl font-bold mx-auto mb-3 xs:mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-base xs:text-lg font-bold text-gray-900 mb-1.5 xs:mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs xs:text-sm">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-[#B8941E]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-8 xs:py-10 sm:py-12 md:py-16 bg-white">
        <div className="w-[90%] mx-auto max-w-4xl px-2 xs:px-3 sm:px-4">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 xs:space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-gray-50 rounded-lg xs:rounded-xl p-4 xs:p-5 sm:p-6 group">
                <summary className="font-semibold text-sm xs:text-base sm:text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[#B8941E] group-open:rotate-180 transition flex-shrink-0 ml-2">
                    <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base mt-3 xs:mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#B8941E] to-[#9a7a19] text-white py-8 xs:py-10 sm:py-12 md:py-16">
        <div className="w-[90%] mx-auto text-center px-2 xs:px-3 sm:px-4">
          <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-base xs:text-lg sm:text-xl mb-5 xs:mb-6 sm:mb-8">
            Join thousands of happy customers who are saving smart for their jewelry purchases
          </p>
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center">
            <button className="bg-white text-[#B8941E] px-6 xs:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg text-base xs:text-lg font-semibold hover:bg-gray-100 transition">
              Enroll Online
            </button>
            <button className="border-2 border-white text-white px-6 xs:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg text-base xs:text-lg font-semibold hover:bg-white hover:text-[#B8941E] transition">
              Visit Store
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges & Testimonials Section */}
      <div className="bg-white">
        {/* Trust Badges Section */}
        <div className="py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="w-[90%] mx-auto">
            <TrustBadges />
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="pb-6 xs:pb-8 sm:pb-10 md:pb-12 lg:pb-16">
          <Testimonials />
        </div>
      </div>

      <Footer />
    </>
  );
}
