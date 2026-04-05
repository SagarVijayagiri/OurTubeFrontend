
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Myvideos = () => {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const [videos, setvideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]); // For bulk selection
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full min-h-[calc(100vh-56px)] bg-[#0f0f13] text-white flex items-center justify-center font-sans">
        Please login to view your videos.
      </div>
    );
  }

  useEffect(() => {
    getownvideo();
  }, []);

  const getownvideo = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/video/ownvideo`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(res => {
        setvideos(res.data.Videos);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlevideoclick = (id) => {
    navigate(`/video/${id}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    axios.delete(`${import.meta.env.VITE_API_URL}/video/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
      .then(() => {
        setvideos(videos.filter(v => v._id !== id));
        setSelectedVideos(selectedVideos.filter(vId => vId !== id)); // Remove from selection if deleted
      })
      .catch(err => console.error(err));
  };

  // --- Helper Functions for Formatting ---
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num || 0;
  };

  const getEngagementRatio = (likes = 0, dislikes = 0) => {
    const total = likes + dislikes;
    if (total === 0) return 0;
    return Math.round((likes / total) * 100);
  };

  // --- Summary Analytics Calculations ---
  const totalViews = videos.reduce((acc, curr) => acc + (curr.views || 0), 0);
  let totalLikes = 0, totalInteractions = 0;
  videos.forEach(v => {
    totalLikes += (v.likes || 0);
    totalInteractions += (v.likes || 0) + (v.dislike || 0);
  });
  const avgEngagement = totalInteractions > 0 ? ((totalLikes / totalInteractions) * 100).toFixed(1) : 0;

  // --- Selection Logic ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVideos(videos.map(v => v._id));
    } else {
      setSelectedVideos([]);
    }
  };

  const handleSelectVideo = (e, id) => {
    e.stopPropagation(); // Prevent row click
    if (e.target.checked) {
      setSelectedVideos([...selectedVideos, id]);
    } else {
      setSelectedVideos(selectedVideos.filter(vId => vId !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1a1a20] border border-[#2a2a35] rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <p className="text-[#8a8a93] text-sm font-medium">Total Videos</p>
              <h3 className="text-2xl font-bold">{videos.length}</h3>
            </div>
          </div>

          <div className="bg-[#1a1a20] border border-[#2a2a35] rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <div>
              <p className="text-[#8a8a93] text-sm font-medium">Total Views</p>
              <h3 className="text-2xl font-bold">{formatNumber(totalViews)}</h3>
            </div>
          </div>

          <div className="bg-[#1a1a20] border border-[#2a2a35] rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p className="text-[#8a8a93] text-sm font-medium">Avg. Duration</p>
              <h3 className="text-2xl font-bold">--:--</h3>
            </div>
          </div>

          <div className="bg-[#1a1a20] border border-[#2a2a35] rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <div>
              <p className="text-[#8a8a93] text-sm font-medium">Engagement Rate</p>
              <h3 className="text-2xl font-bold">{avgEngagement}%</h3>
            </div>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-[#1a1a20] rounded-xl border border-[#2a2a35] overflow-hidden shadow-2xl">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-[#2a2a35] bg-[#1a1a20]">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-[#3a3a45] bg-[#22222a] text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
                onChange={handleSelectAll}
                checked={videos.length > 0 && selectedVideos.length === videos.length}
              />
              <span className="text-sm font-medium text-gray-300">Select all</span>
            </div>
            <div className="flex gap-3">
              <button 
                className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                disabled={selectedVideos.length === 0}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                Delete Selected
              </button>
              <button 
                className="px-4 py-2 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                disabled={selectedVideos.length === 0}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                Modify Selected
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-[#1a1a20] text-[#8a8a93] text-xs uppercase tracking-wider border-b border-[#2a2a35]">
                <tr>
                  <th className="px-4 py-4 w-12"></th>
                  <th className="px-4 py-4 font-semibold">Video</th>
                  <th className="px-4 py-4 font-semibold">Title</th>
                  <th className="px-4 py-4 font-semibold">Date Uploaded</th>
                  <th className="px-4 py-4 font-semibold">Views</th>
                  <th className="px-4 py-4 font-semibold min-w-[150px]">Engagement</th>
                  <th className="px-4 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a35]">
                {videos.map(video => {
                  const ratio = getEngagementRatio(video.likes, video.dislike);
                  return (
                    <tr 
                      key={video._id} 
                      onClick={() => handlevideoclick(video._id)} 
                      className="hover:bg-[#22222a] transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-4 text-center">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-[#3a3a45] bg-[#1a1a20] text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
                          checked={selectedVideos.includes(video._id)}
                          onChange={(e) => handleSelectVideo(e, video._id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-24 h-14 rounded-md overflow-hidden bg-[#2a2a35] border border-[#3a3a45]">
                          <img src={video.thumbnailurl} alt="thumbnail" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-white truncate max-w-[200px] lg:max-w-[300px]">
                          {video.title}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#8a8a93]">
                        {formatDate(video.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium">
                        {formatNumber(video.views)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="w-full bg-[#2a2a35] rounded-full h-2 overflow-hidden">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${ratio}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[11px] text-[#8a8a93] font-medium">
                            <span>{formatNumber(video.likes)} / {formatNumber(video.dislike)}</span>
                            <span>{ratio}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/update/${video._id}`);
                            }}
                            className="p-2 rounded-md bg-[#2a2a35] text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 transition-colors border border-[#3a3a45]"
                            title="Edit Video"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          
                          {/* Delete Button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(video._id);
                            }} 
                            className="p-2 rounded-md bg-[#2a2a35] text-red-500 hover:bg-red-500/20 hover:text-red-400 transition-colors border border-[#3a3a45]"
                            title="Delete Video"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* Empty State */}
            {videos.length === 0 && (
              <div className="w-full py-16 flex flex-col items-center justify-center text-[#8a8a93]">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <p className="text-lg font-medium">No videos found</p>
                <p className="text-sm">Upload your first video to see it here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
