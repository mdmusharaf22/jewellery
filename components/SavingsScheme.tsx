export default function SavingsScheme() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="w-full px-2 xs:px-3 sm:px-4 lg:px-8 max-w-[100vw]">
        {/* Cream Container Box - Lighter beige background */}
        <div className="bg-[#EFE8D8] rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-12 lg:p-16">
          {/* Top Bar with Scheme Name and Join Link */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8 md:mb-12">
            {/* White pill box for scheme name */}
            <div className="bg-white rounded-full px-2.5 xs:px-3 sm:px-4 md:px-5 py-1 xs:py-1.5 sm:py-2 md:py-2.5 flex items-center gap-1.5 xs:gap-2">
              <span className="w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-[#B8941E] rounded-full flex-shrink-0"></span>
              <p className="text-gray-700 text-[10px] xs:text-xs sm:text-sm font-medium whitespace-nowrap">Gold Mine Savings</p>
            </div>
            {/* Join Savings Plan with gray border */}
            <a href="/savings" className="text-[#B8941E] text-[10px] xs:text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition border-2 border-[#B8941E] rounded px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 sm:py-2 cursor-pointer whitespace-nowrap">
              Join Plan
            </a>
          </div>

          {/* Main Content Grid - All boxes same height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 items-stretch">
            {/* Left Content Box */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 text-[#1a1a1a] leading-tight">
                  Save smart for<br />
                  your next<br />
                  jewellery<br />
                  purchase
                </h2>
                
                <p className="text-gray-600 mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                  A more polished, premium plan designed for families who want a clear and 
                  comfortable monthly path to buying gold.
                </p>
              </div>
              
              <button className="bg-[#B8941E] text-white px-4 xs:px-5 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded hover:bg-black transition font-medium text-[11px] xs:text-xs sm:text-sm w-fit cursor-pointer">
                Join Savings Plan
              </button>
            </div>

            {/* 10+1 Card */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col">
              <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide">PAY FOR 10 MONTHS</p>
              <p className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-[#B8941E] mb-2 xs:mb-3 sm:mb-4">10+1</p>
              <p className="text-gray-700 text-[11px] xs:text-xs sm:text-sm leading-relaxed">
                Enjoy the 11th month benefit and turn monthly savings into a premium gold purchase plan.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="bg-black text-white rounded-lg sm:rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col">
              <h4 className="font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 text-[10px] xs:text-xs sm:text-sm uppercase tracking-wide">WHY IT FEELS BETTER</h4>
              <ul className="space-y-2 xs:space-y-3 sm:space-y-4 flex-grow">
                <li className="flex items-start gap-2 sm:gap-3 text-[11px] xs:text-xs sm:text-sm">
                  <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Simple monthly installment rhythm</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-[11px] xs:text-xs sm:text-sm">
                  <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Clear 10+1 value proposition</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-[11px] xs:text-xs sm:text-sm">
                  <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Ideal for wedding and festive purchases</span>
                </li>
              </ul>
              <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 mt-3 xs:mt-4 sm:mt-5 md:mt-6 leading-relaxed">
                Designed as a strong promotional row with three balanced blocks and subtle premium gold accents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
