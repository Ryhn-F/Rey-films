import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WatchPage = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="bg-background min-h-screen text-white p-8">
      {show && (
        <>
          <h1 className="text-5xl font-bold text-primary mb-4">{show.name}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg">
                {/* Placeholder for video player */}
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Video player will be here.</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <img src={show.image?.original} alt={show.name} className="rounded-lg shadow-lg mb-4" />
              <div
                className="text-gray-300"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
              <p className="mt-4">
                <span className="font-bold text-secondary">Genres:</span> {show.genres.join(', ')}
              </p>
              <p>
                <span className="font-bold text-secondary">Language:</span> {show.language}
              </p>
              <p>
                <span className="font-bold text-secondary">Rating:</span> {show.rating?.average || 'N/A'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WatchPage;
