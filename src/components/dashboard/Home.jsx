import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import { OrbitProgress} from "react-loading-indicators";
export const Home = () => {
  const context = useOutletContext() || {};
  // ✅ ONLY declaration of searchQuery
  const { searchQuery, setSearchQuery } = context;

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/video/all`)
      .then((res) => {
        setVideos(res.data.Videos || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load videos");
        setLoading(false);
      });
  }, []);

  const searchedVideos = useMemo(() => {
  if (!searchQuery) return [];
  return videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, videos]);


  const trending = useMemo(
    () => [...videos].sort((a, b) => b.views - a.views).slice(0, 6),
    [videos]
  );

  const recent = useMemo(
    () =>
      [...videos]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    [videos]
  );

  if (loading) return (
    <div className="w-full min-h-screen flex items-center justify-center">
    <OrbitProgress variant="track-disc" dense color="#ef1409" size="medium" text="" textColor="" />
</div>

);
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-8">
      {searchQuery ? (
        <VideoSection title="Search Results" videos={searchedVideos} />
      ) : (
        <>
          <VideoSection title="Trending" videos={trending} />
          <VideoSection title="Recently Uploaded" videos={recent} />
        </>
      )}
    </div>
  );
};

const VideoSection = ({ title, videos }) => {
  if (!videos.length) {
    return <p className="text-neutral-400">No videos found</p>;
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link
            to={`/dashboard/video/${video._id}`}
            key={video._id}
            className="bg-neutral-900 rounded-lg overflow-hidden hover:bg-neutral-800"
          >
            <img
              src={video.thumbnailurl}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-neutral-400">
                {video.views} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
