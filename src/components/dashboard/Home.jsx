import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

// --- Helper Functions for Premium UI Formatting ---
const formatViews = (views) => {
  if (!views) return "0";
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};

const timeAgo = (dateString) => {
  if (!dateString) return "Unknown date";
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

export const Home = () => {
  const context = useOutletContext() || {};
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

  // Increased slice to 8 so grids look fuller on large screens
  const trending = useMemo(
    () => [...videos].sort((a, b) => b.views - a.views).slice(0, 8),
    [videos]
  );

  const recent = useMemo(
    () =>
      [...videos]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8),
    [videos]
  );

  if (loading) return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#0f0f13]">
      <OrbitProgress variant="track-disc" dense color="#14b8a6" size="medium" />
      <p className="text-[#8a8a93] mt-4 font-medium tracking-wide">Loading videos...</p>
    </div>
  );

  if (error) return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0f0f13]">
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl font-medium">
        {error}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 bg-[#0f0f13] min-h-[calc(100vh-64px)] max-w-[1800px] mx-auto">
      {searchQuery ? (
        <VideoSection 
          title={`Search Results for "${searchQuery}"`} 
          videos={searchedVideos} 
          isSearch={true} 
        />
      ) : (
        <>
          <VideoSection title="🔥 Trending Now" videos={trending} />
          <div className="w-full h-px bg-[#2a2a35] my-2"></div> {/* Divider */}
          <VideoSection title="✨ Recently Uploaded" videos={recent} />
        </>
      )}
    </div>
  );
};

const VideoSection = ({ title, videos, isSearch }) => {
  if (!videos.length) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
        <div className="bg-[#1a1a20] border border-[#2a2a35] rounded-xl p-10 text-center">
          <p className="text-[#8a8a93] text-lg">No videos found in this category.</p>
          {isSearch && <p className="text-[#5a5a65] text-sm mt-2">Try adjusting your search terms.</p>}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-wide">{title}</h2>

      {/* Responsive Grid: 1 col on mobile, 2 on tablet, up to 4 or 5 on huge screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {videos.map((video) => (
          <Link
            to={`/dashboard/video/${video._id}`}
            key={video._id}
            className="group flex flex-col gap-3 cursor-pointer outline-none"
          >
            {/* Thumbnail Wrapper */}
            <div className="relative w-full aspect-video bg-[#1a1a20] rounded-xl overflow-hidden border border-[#2a2a35] group-hover:border-teal-500/50 group-focus:border-teal-500/50 transition-colors shadow-lg group-hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)]">
              <img
                src={video.thumbnailurl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/640x360/1a1a20/5a5a65?text=No+Thumbnail';
                }}
              />
              {/* Optional: Add a duration badge here later if your API supports it */}
              {/* <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">12:34</span> */}
            </div>

            {/* Video Info Wrapper */}
            <div className="flex gap-3 pr-2">
              {/* Channel Avatar Placeholder */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-full bg-[#2a2a35] flex items-center justify-center overflow-hidden">
                  {/* Using UI Avatars to generate a cool initial avatar based on the title */}
                  <img 
                    src={`https://ui-avatars.com/api/?name=${video.title.charAt(0)}&background=2a2a35&color=14b8a6&bold=true`} 
                    alt="channel" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-teal-400 transition-colors">
                  {video.title}
                </h3>
                
                {/* Fallback channel name, views, and time */}
                <div className="text-[12px] text-[#8a8a93] mt-1 flex flex-col">
                  {/* If your API returns user/channel data, replace "V-Studio Creator" below */}
                  <span className="hover:text-white transition-colors truncate">
                    {video.channelname || "V-Studio Creator"}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span>{formatViews(video.views)} views</span>
                    <span className="w-1 h-1 rounded-full bg-[#5a5a65]"></span>
                    <span>{timeAgo(video.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
