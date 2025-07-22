import React from "react";

const Hero = () => {
  return (
    <section className="bg-slate-900 min-h-[90vh] flex items-center justify-center px-4">
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Watch
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {" "}
              Films
            </span>{" "}
            Smoothly
            <br />
            Say no more
            <br />
            to lag
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Search literally everything in our websites
            <br className="hidden md:block" />
            Thousands films waiting for you to watch , wait no more !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center md:justify-start">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 transition">
              Lets go
            </button>
          </div>
          <div className="flex gap-8 justify-center md:justify-start">
            <div>
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-gray-400 text-sm">Movies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">300+</div>
              <div className="text-gray-400 text-sm">Anime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">240+</div>
              <div className="text-gray-400 text-sm">K-Drama</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="relative">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/family-watching-movie-6458657-5327387.png"
              alt="Travis"
              className="  rounded-2xl shadow-2xl  "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
