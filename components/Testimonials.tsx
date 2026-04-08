export default function Testimonials() {
  const testimonials = [
    {
      name: 'Anitha R.',
      location: 'Chennai',
      text: 'We bought my daughter\'s wedding set here. The guidance felt personal, the collection looked refined, and the whole buying experience was very reassuring.',
      rating: 5
    },
    {
      name: 'Karthik M.',
      location: 'Coimbatore',
      text: 'The monthly savings scheme made our planning easy. The structure was clear, the staff explained every step, and it felt like a smart way to buy gold.',
      rating: 5
    },
    {
      name: 'Priya S.',
      location: 'Madurai',
      text: 'I first visited for silver gifting and later returned for festive shopping. The store feels trustworthy, polished, and genuinely premium without being overwhelming.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#E8DCC8] mb-16 md:mb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1a1a1a]">
          Why families come back to us
        </h2>
        <p className="text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto text-sm md:text-base">
          A more premium testimonial presentation with subtle gold highlights and stronger visual trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#B8941E] text-xl">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#B8941E] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 mt-12 md:mt-16 max-w-3xl mx-auto text-sm md:text-base">
          Trusted by families for wedding jewellery, silver gifting, savings plans and 
          transparent gold loan assistance.
        </p>
      </div>
    </section>
  );
}
