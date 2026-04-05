import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";

// Helper Functions
const formatViews = (views) => {
  if (!views) return "0";
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
};

const timeAgo = (dateString) => {
  if (!dateString) return "";
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
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " seconds ago";
};

export const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = import.meta.env.VITE_API_URL;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;
  const loggedin = !!token;

  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const viewedRef = useRef(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const viewTimerRef = useRef(null);
  const viewCountedRef = useRef(false);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    // Reset view tracking when video ID changes
    viewCountedRef.current = false;
    if (viewTimerRef.current) clearTimeout(viewTimerRef.current);

    const fetchData = async () => {
      try {
        const [videoRes, recRes, commentRes] = await Promise.all([
          axios.get(`${API_BASE}/video/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }),
          axios.get(`${API_BASE}/video/all`),
          axios.get(`${API_BASE}/comment/${id}`),
        ]);

        setVideo(videoRes.data.Video);
        setUser(videoRes.data.User);
        
        if (loggedin) {
          const subscribed = videoRes.data.User.subscribedby
            ?.map(String)
            .includes(storedUser._id);
          setIsSubscribed(subscribed);
        }
        
        setRecommended(
          recRes.data.Videos.filter((v) => v._id !== id).slice(0, 8)
        );
        setComments(commentRes.data.commentlist);
      } catch (err) {
        console.error(err);
        setError("Video not found or access denied.");
      }
    };

    fetchData();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id, token]);

  /* ---------------- ACTIONS ---------------- */
  const handleLike = async () => {
    if (!loggedin) return toast.info("Please login to like the video", { theme: "dark" });
    try {
      const res = await axios.put(`${API_BASE}/video/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setVideo(res.data.video);
    } catch (err) {
      if (err.response?.status === 409) toast.error("You already liked this video", { theme: "dark" });
      else toast.error("Failed to like video", { theme: "dark" });
    }
  };

  const handleDislike = async () => {
    if (!loggedin) return toast.info("Please login to dislike the video", { theme: "dark" });
    try {
      const res = await axios.put(`${API_BASE}/video/dislike/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setVideo(res.data.video);
    } catch (err) {
      if (err.response?.status === 409) toast.error("You already disliked this video", { theme: "dark" });
      else toast.error("Failed to dislike video", { theme: "dark" });
    }
  };

  const handlePlay = () => {
    if (viewCountedRef.current) return;
    viewTimerRef.current = setTimeout(async () => {
      try {
        await axios.put(`${API_BASE}/video/views/${id}`);
        viewCountedRef.current = true;
        setVideo(prev => ({ ...prev, views: prev.views + 1 }));
      } catch (err) {
        console.error("View count failed", err);
      }
    }, 10000);
  };

  const handlePauseOrEnd = () => {
    if (viewTimerRef.current) {
      clearTimeout(viewTimerRef.current);
      viewTimerRef.current = null;
    }
  };

  const handleSubscribe = async () => {
    if (!loggedin) return toast.info("Please login to subscribe", { theme: "dark" });
    try {
      if (isSubscribed) {
        await axios.put(`${API_BASE}/user/unsubscribe/${user._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setIsSubscribed(false);
        setUser(prev => ({ ...prev, subscribers: Math.max(0, prev.subscribers - 1) }));
        toast.success("Unsubscribed", { theme: "dark" });
      } else {
        await axios.put(`${API_BASE}/user/subscribe/${user._id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
        setIsSubscribed(true);
        setUser(prev => ({ ...prev, subscribers: prev.subscribers + 1 }));
        toast.success("Subscribed to channel!", { theme: "dark" });
      }
    } catch {
      toast.error("Action failed", { theme: "dark" });
    }
  };

  const handleComment = async () => {
    toast.info("Comments feature activating soon...", { theme: "dark" });
    return;
    // Future Implementation
    /*
    if (!commentText.trim() || !loggedin) return;
    try {
      await axios.post(`${API_BASE}/video/comment/${id}`, { text: commentText }, { headers: { Authorization: `Bearer ${token}` } });
      setComments(prev => [{ _id: Date.now(), user: storedUser.channelname, text: commentText }, ...prev]);
      setCommentText("");
    } catch {
      toast.error("Failed to post comment");
    }
    */
  };

  /* ---------------- RENDER ---------------- */
  if (error) return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#0f0f13]">
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl font-medium">{error}</div>
    </div>
  );

  if (!video) return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-[#0f0f13]">
      <OrbitProgress variant="track-disc" dense color="#14b8a6" size="medium" />
    </div>
  );

  return (
    <div className="bg-[#0f0f13] min-h-[calc(100vh-64px)] text-white">
      <ToastContainer position="bottom-right" autoClose={2000} />
      
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Main Video Area */}
        <div className="flex-1 lg:max-w-[70%] xl:max-w-[75%] flex flex-col gap-5">
          
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a35]">
            <video
              src={video.videourl}
              poster={video.thumbnailurl}
              controls
              autoPlay
              onPlay={handlePlay}
              onPause={handlePauseOrEnd}
              onEnded={handlePauseOrEnd}
              className="w-full h-full object-contain outline-none"
            />
          </div>

          {/* Title & Metadata */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide">{video.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-4">
              
              {/* Channel Info & Subscribe */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#2a2a35] overflow-hidden flex-shrink-0">
                  <img
                    src={user?.logourl || `https://ui-avatars.com/api/?name=${user?.channelname || 'C'}&background=2a2a35&color=14b8a6`}
                    alt={user?.channelname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight">{user?.channelname || "Creator"}</span>
                  <span className="text-xs text-[#8a8a93]">{user?.subscribers || 0} subscribers</span>
                </div>
                <button
                  onClick={handleSubscribe}
                  className={`ml-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    isSubscribed
                      ? "bg-[#22222a] text-[#8a8a93] hover:bg-[#2a2a35] border border-[#3a3a45]"
                      : "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  }`}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
              </div>

              {/* Action Buttons (Like / Dislike / Share) */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <div className="flex items-center bg-[#22222a] rounded-full border border-[#3a3a45] overflow-hidden">
                  <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2a35] transition-colors">
                    <AiFillLike className="text-lg" />
                    <span className="text-sm font-medium">{formatViews(video.likes)}</span>
                  </button>
                  <div className="w-px h-6 bg-[#3a3a45]"></div>
                  <button onClick={handleDislike} className="flex items-center px-4 py-2 hover:bg-[#2a2a35] transition-colors">
                    <AiOutlineDislike className="text-lg" />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#22222a] hover:bg-[#2a2a35] border border-[#3a3a45] rounded-full transition-colors text-sm font-medium">
                  <IoMdShareAlt className="text-xl" /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-[#1a1a20] rounded-xl p-4 border border-[#2a2a35] hover:bg-[#22222a] transition-colors cursor-pointer">
            <div className="text-sm font-bold mb-1">
              {formatViews(video.views)} views &nbsp;•&nbsp; {timeAgo(video.createdAt)}
            </div>
            <p className="text-sm text-[#8a8a93] whitespace-pre-wrap leading-relaxed">
              {video.description || "No description provided."}
            </p>
          </div>

          {/* Comments Section */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>
            
            {/* Add Comment Input */}
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#2a2a35] flex-shrink-0 overflow-hidden">
                {loggedin && storedUser?.logourl ? (
                  <img src={storedUser.logourl} alt="You" className="w-full h-full object-cover" />
                ) : (
                  <img src={`https://ui-avatars.com/api/?name=${storedUser?.channelname || 'U'}&background=14b8a6&color=fff`} alt="You" />
                )}
              </div>
              <div className="flex-1 flex flex-col items-end gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b border-[#3a3a45] focus:border-white transition-colors pb-1 outline-none text-sm placeholder-[#5a5a65]"
                />
                {commentText && (
                  <div className="flex gap-2">
                    <button onClick={() => setCommentText("")} className="px-4 py-2 text-sm font-medium hover:bg-[#22222a] rounded-full transition-colors">Cancel</button>
                    <button onClick={handleComment} className="px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-400 text-black rounded-full transition-colors">Comment</button>
                  </div>
                )}
              </div>
            </div>

            {/* Comment List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-[#5a5a65] text-sm text-center py-4">No comments yet. Be the first to start the conversation!</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2a2a35] flex-shrink-0 overflow-hidden text-xs flex items-center justify-center font-bold">
                       {c.user?.charAt(0).toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-bold">{c.user || "Anonymous"}</span>
                        <span className="text-xs text-[#5a5a65]">Just now</span>
                      </div>
                      <p className="text-sm text-gray-200">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Recommended Videos */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
          <h2 className="text-lg font-bold mb-4">Up Next</h2>
          <div className="flex flex-col gap-3">
            {recommended.map((vid) => (
              <Link
                to={`/dashboard/video/${vid._id}`}
                key={vid._id}
                className="flex gap-3 group outline-none p-2 -mx-2 rounded-xl hover:bg-[#1a1a20] transition-colors"
              >
                <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-[#2a2a35] flex-shrink-0 border border-transparent group-hover:border-[#3a3a45] transition-colors">
                  <img
                    src={vid.thumbnailurl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/160x90/1a1a20/5a5a65?text=Video'; }}
                  />
                </div>
                <div className="flex flex-col overflow-hidden py-0.5">
                  <h3 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-teal-400 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#8a8a93] mt-1 truncate">{vid.channelname || "Creator"}</p>
                  <p className="text-xs text-[#5a5a65] mt-0.5">
                    {formatViews(vid.views)} views • {timeAgo(vid.createdAt).replace(' ago', '')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
