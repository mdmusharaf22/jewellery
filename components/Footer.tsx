import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="w-full px-4 lg:px-16 xl:px-24 pt-16 md:pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="mb-3">
              <Image
                src="/footer-logo.png"
                alt="SriGanesh Jewellers"
                width={90}
                height={36}
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 text-xs mb-3 leading-relaxed">
              Trusted by families for wedding jewellery, silver gifting and gold purchases. Quality craftsmanship with transparent pricing and genuine care.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="border border-gray-600 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">BIS Hallmarked</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">Insured Delivery</span>
            </div>
            <div className="flex gap-3 mt-6">
              <a href="#" className="text-white hover:text-[#C9A961] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-[#C9A961] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="text-white hover:text-[#C9A961] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-xs">Shop</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/gold" className="text-gray-300 hover:text-white transition">Gold Jewellery</a></li>
              <li><a href="/silver" className="text-gray-300 hover:text-white transition">Silver Collection</a></li>
              <li><a href="/new" className="text-gray-300 hover:text-white transition">New Arrivals</a></li>
              <li><a href="/savings" className="text-gray-300 hover:text-white transition">Savings Schema</a></li>
            </ul>
            
            <h3 className="font-semibold text-white mb-3 text-xs mt-6">Collections</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/mens-collection" className="text-gray-300 hover:text-white transition">Men's Collection</a></li>
              <li><a href="/womens-collection" className="text-gray-300 hover:text-white transition">Women's Collection</a></li>
              <li><a href="/kids-collection" className="text-gray-300 hover:text-white transition">Kids Collection</a></li>
              <li><a href="/bridal" className="text-gray-300 hover:text-white transition">Bridal Collection</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-xs">Support</h3>
            <ul className="space-y-2 text-xs">
              <li><a href="/loans" className="text-gray-300 hover:text-white transition">Gold Loans</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
              <li><a href="/rates" className="text-gray-300 hover:text-white transition">Today's Gold Rate</a></li>
              <li><a href="/visit" className="text-gray-300 hover:text-white transition">Book Showroom Visit</a></li>
              <li><a href="/exchange" className="text-gray-300 hover:text-white transition">Exchange Policy</a></li>
            </ul>
            
            <h3 className="font-semibold text-white mb-3 text-xs mt-6">Quality</h3>
            <div className="flex flex-col gap-2">
              <span className="border border-[#B8941E] text-[#B8941E] px-2 py-0.5 rounded text-[10px] whitespace-nowrap w-fit">916 / 22KT Gold</span>
              <span className="border border-[#B8941E] text-[#B8941E] px-2 py-0.5 rounded text-[10px] whitespace-nowrap w-fit">92.5 Silver</span>
            </div>
          </div>

          {/* Visit or Enquire + Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-xs">Visit or enquire</h3>
            <div className="space-y-2 text-xs text-gray-300 mb-4">
              <p className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>24 Temple Street, Chennai, Tamil Nadu</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Open daily • 10:00 AM to 8:30 PM</span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <h3 className="font-semibold text-white mb-2 text-xs">Get festive updates</h3>
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 px-3 py-2 rounded bg-[#1a1a1a] border border-gray-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A961] placeholder-gray-500"
                />
                <button className="bg-[#C9A961] text-black px-4 py-2 rounded font-semibold hover:bg-[#B8941E] transition text-xs whitespace-nowrap cursor-pointer">
                  Subscribe
                </button>
              </div>
              
              {/* Map */}
              <div className="mt-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267165657937!2d80.27054931482213!3d13.047984990806857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b5e0e0e0e1%3A0x0!2zMTPCsDAyJzUyLjciTiA4MMKwMTYnMjMuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="90"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>© 2026 SriGaneshJewellers. Purity, trust and family service.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
