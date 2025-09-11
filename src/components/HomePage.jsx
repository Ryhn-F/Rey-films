import { useState, React, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { Star } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = ({ searchResults }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setPosts(searchResults.map((result) => result.show));
      setLoading(false);
    } else {
      axios
        .get("https://api.tvmaze.com/shows?page=1")
        .then((response) => {
          setPosts(response.data.slice(0, 20));
          setLoading(false);
          console.log(response.data.slice(0, 20));
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [searchResults]);

  if (loading) return <div>Loading..................</div>;
  if (error) return <div>Error : {error}</div>;

  return (
    <div className="pb-20">
      <h1 className="text-5xl text-center text-primary font-bold tracking-widest uppercase">
        Now Showing
      </h1>
      <div className=" justify-center items-center p-20 flex-row flex-wrap grid lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-2 gap-5  ">
        <AnimatePresence mode="wait">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-60 bg-gray-900 rounded-xl p-3 shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-primary/50"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={post.image?.medium}
                alt=""
                className="rounded-xl"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mt-2 flex text-sm"
              >
                Rating : &#9734; {post.rating?.average || "N/A"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between"
              >
                <h2 className="text-base font-semibold mt-1  truncate text-white">
                  {post.name}
                </h2>
                <p className="text-purple-400 mt-1">
                  {post.genres?.[0] || "Unknown"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="truncate text-white"
              >
                {post.summary?.split(" ").slice(5).join(" ") ||
                  "No summary available"}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-between"
              >
                <p className="text-white mt-3">{post.premiered || "Unknown"}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-500 text-white hover:bg-indigo-300 rounded-xl px-5 py-0.5 mt-3 transition-all duration-200"
                  onClick={() => navigate(`/watch/${post.id}`)}
                >
                  Watch
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;
