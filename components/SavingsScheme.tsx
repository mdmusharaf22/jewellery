export default function SavingsScheme() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="w-full px-4 lg:px-8">
        {/* Cream Container Box - Lighter beige background */}
        <div className="bg-[#EFE8D8] rounded-2xl p-8 md:p-12 lg:p-16">
          {/* Top Bar with Scheme Name and Join Link */}
          <div className="flex justify-between items-center mb-8 md:mb-12">
            {/* White pill box for scheme name */}
            <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B8941E] rounded-full"></span>
              <p className="text-gray-700 text-sm font-medium">Gold Mine Savings Scheme</p>
            </div>
            {/* Join Savings Plan with gray border */}
            <a href="/savings" className="text-[#B8941E] text-sm font-medium hover:bg-black hover:text-white transition border-2 border-gray-300 rounded px-6 py-2">
              Join Savings Plan
            </a>
          </div>

          {/* Main Content Grid - All boxes same height */}
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Content Box */}
            <div className="bg-white rounded-xl p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a1a] leading-tight">
                  Save smart for<br />
                  your next<br />
                  jewellery<br />
                  purchase
                </h2>
                
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  A more polished, premium plan designed for families who want a clear and 
                  comfortable monthly path to buying gold.
                </p>
              </div>
              
              <button className="bg-[#B8941E] text-white px-8 py-3 rounded hover:bg-black transition font-medium text-sm w-fit">
                Join Savings Plan
              </button>
            </div>

            {/* 10+1 Card */}
            <div className="bg-white rounded-xl p-8 flex flex-col">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">PAY FOR 10 MONTHS</p>
              <p className="text-5xl md:text-6xl font-bold text-[#B8941E] mb-4">10+1</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Enjoy the 11th month benefit and turn monthly savings into a premium gold purchase plan.
              </p>
            </div>

            {/* Benefits Card */}
            <div className="bg-[#3E2723] text-white rounded-xl p-8 flex flex-col">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-wide">WHY IT FEELS BETTER</h4>
              <ul className="space-y-4 flex-grow">
                <li className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Simple monthly installment rhythm</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Clear 10+1 value proposition</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-[#B8941E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Ideal for wedding and festive purchases</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                Designed as a strong promotional row with three balanced blocks and subtle premium gold accents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
