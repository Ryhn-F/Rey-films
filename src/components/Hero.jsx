import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-background min-h-[90vh] flex items-center justify-center px-4">
      <div className="max-w-6xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-10 py-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Explore the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              Cinematic
            </span>{" "}
            Universe
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Dive into a galaxy of films. Your next favorite movie is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-background font-semibold shadow-lg hover:shadow-primary/50 transition"
            >
              Discover Now
            </motion.button>
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
        </motion.div>

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
