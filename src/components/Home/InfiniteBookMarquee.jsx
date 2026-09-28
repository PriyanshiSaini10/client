import React from 'react';

export default function InfiniteBookMarquee({ books, onSelectBook }) {
  // Repeating array to build continuous width
  const marqueeBooks = [...books, ...books, ...books, ...books];

  return (
    <section className="py-12 bg-[#0d0d0d] border-y border-zinc-800/80 overflow-hidden select-none">
      <style>{`
        @keyframes marqueeNonStop {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .marquee-track-continuous {
          display: flex;
          flex-shrink: 0;
          animation: marqueeNonStop 25s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Centered Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Featured <span className="bg-gradient-to-r from-[#FF5F1F] via-orange-500 to-amber-500 bg-clip-text text-transparent">Spotlight</span>
        </h2>
      </div>

      {/* Truly Non-Stop Infinite Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:_linear-gradient(to_right,transparent_0,_black_80px,_black_calc(100%-80px),transparent_100%)]">
        {/* Track A */}
        <div className="marquee-track-continuous flex">
          {marqueeBooks.map((book, index) => (
            <div
              key={`trackA-${book.id}-${index}`}
              onClick={() => onSelectBook(book)}
              className="px-3 flex-shrink-0 cursor-pointer group"
            >
              <div className="w-40 sm:w-48 bg-[#1a1a1a] rounded-2xl p-3 border border-zinc-800 hover:border-[#FF5F1F]/60 hover:shadow-xl hover:shadow-orange-950/20 transition-all">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#151515] flex items-center justify-center p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Track B (Follows Track A with zero gap) */}
        <div className="marquee-track-continuous flex" aria-hidden="true">
          {marqueeBooks.map((book, index) => (
            <div
              key={`trackB-${book.id}-${index}`}
              onClick={() => onSelectBook(book)}
              className="px-3 flex-shrink-0 cursor-pointer group"
            >
              <div className="w-40 sm:w-48 bg-[#1a1a1a] rounded-2xl p-3 border border-zinc-800 hover:border-[#FF5F1F]/60 hover:shadow-xl hover:shadow-orange-950/20 transition-all">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#151515] flex items-center justify-center p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}