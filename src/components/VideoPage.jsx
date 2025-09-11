import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setVideo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load video");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-white text-center mt-10">Loading video...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!video) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">{video.name}</h1>
      <img
        src={video.image?.original}
        alt={video.name}
        className="rounded-xl mb-6 max-w-xl w-full"
      />
      <div
        className="mb-4 text-lg"
        dangerouslySetInnerHTML={{ __html: video.summary }}
      />
      <div className="mb-2">Genre: {video.genres?.join(", ")}</div>
      <div className="mb-2">Premiered: {video.premiered}</div>
      <div className="mb-2">Rating: {video.rating?.average || "N/A"}</div>
      {/* Placeholder for video player */}
      <div className="mt-8 w-full max-w-2xl h-64 bg-black flex items-center justify-center rounded-xl border-2 border-indigo-500">
        <span className="text-indigo-400">[Video player would be here]</span>
      </div>
    </div>
  );
};

export default VideoPage;
