import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-[#2a2420] min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Placeholder for hero image - replace with actual image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Tag */}
          <div className="inline-block bg-white rounded-full px-5 py-2 mb-6 md:mb-8">
            <p className="text-[#1a1a1a] text-xs md:text-sm font-medium">
              Trusted family jeweller for weddings and gifting
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            Timeless jewellery<br />
            for every Indian<br />
            celebration
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base md:text-lg mb-8 md:mb-10 max-w-lg">
            Explore handcrafted gold and silver collections from sriganeshjewellers.
          </p>

          {/* CTA Button */}
          <button className="bg-[#B8941E] text-white px-8 py-3 md:px-10 md:py-4 rounded hover:bg-[#8B6914] transition font-medium text-sm md:text-base shadow-lg">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
}
