import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { toast } from "react-toastify";
import "./Video.css";
import { AiFillLike,AiFillDislike } from "react-icons/ai";

export const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = import.meta.env.VITE_API_URL;

  // auth (single source of truth)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;
  const loggedin = !!token;

  // state
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  // prevent view spam
  const viewedRef = useRef(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const viewTimerRef = useRef(null);
  const viewCountedRef = useRef(false);


  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
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
         
        const subscribed =
          videoRes.data.User.subscribedby
            ?.map(String)
            .includes(storedUser._id);
        setIsSubscribed(subscribed);
      
      }
        setRecommended(
          recRes.data.Videos.filter((v) => v._id !== id).slice(0, 6)
        );
        setComments(commentRes.data.commentlist);
      } catch (err) {
        console.error(err);
        setError("Video not found");
      }
    };

    fetchData();
  }, [id, token]);

  /* ---------------- ACTIONS ---------------- */

  const handleLike = async () => {
    if (!loggedin) return toast("Please login to like the video");

    try {
      const res = await axios.put(
        `${API_BASE}/video/like/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideo(res.data.video);
    } catch (err) {
      const status = err.response?.status;
      console.log(status);
      if (status === 409) toast("You already liked this video");
      else if (status === 401) toast("Session expired. Please login again.");
      else toast("Failed to like video");
    }
  };

  const handleDislike = async () => {
    if (!loggedin) return toast("Please login to dislike the video");

    try {
      const res = await axios.put(
        `${API_BASE}/video/dislike/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVideo(res.data.video);
    } catch (err) {
      const status = err.response?.status;
      console.log(status);
      if (status === 409) toast("You already disliked this video");
      else if (status === 401) toast("Session expired. Please login again.");
      else toast("Failed to dislike video");
    }
  };

  const handlePlay = () => {
  if (viewCountedRef.current) return;

  // start 10s timer
  viewTimerRef.current = setTimeout(async () => {
    try {
      await axios.put(`${API_BASE}/video/views/${id}`);
      viewCountedRef.current = true;

      // update UI immediately
      setVideo(prev => ({
        ...prev,
        views: prev.views + 1,
      }));
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
  if (!loggedin) return toast("Please login to subscribe");

  try {
    if (isSubscribed) {
      await axios.put(
        `${API_BASE}/user/unsubscribe/${user._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsSubscribed(false);
      setUser(prev => ({
        ...prev,
        subscribers: Math.max(0, prev.subscribers - 1),
      }));

      toast("Unsubscribed");
    } else {
      await axios.put(
        `${API_BASE}/user/subscribe/${user._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsSubscribed(true);
      console.log("Subscribed to channel:", user._id);
      setUser(prev => ({
        ...prev,
        subscribers: prev.subscribers + 1,
      }));

      toast("Subscribed");
    }
  } catch {
    toast("Action failed");
  }
};


  const handleComment = async () => {
    toast("Feature will  be added soon...");
    return;
    if (!commentText.trim()) return;
    if (!loggedin) return toast("Please login to comment");

    try {
      await axios.post(
        `${API_BASE}/video/comment/${id}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [
        ...prev,
        { _id: Date.now(), user: "You", text: commentText },
      ]);
      setCommentText("");
    } catch {
      toast("Failed to post comment");
    }
  };

  /* ---------------- RENDER ---------------- */

  if (error) return <p className="error-msg">{error}</p>;

  if (!video)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <OrbitProgress variant="track-disc" color="#ef1409" size="medium" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto text-white">
      {/* LEFT */}
      <div className="flex-1">
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <video
          src={video.videourl}
          poster={video.thumbnailurl}
          controls
          onPlay={handlePlay}
          onPause={handlePauseOrEnd}
          onEnded={handlePauseOrEnd}
          className="w-full h-full"
/>

        </div>

        <h1 className="mt-4 text-xl font-semibold">{video.title}</h1>

        <div className="mt-2 text-sm text-neutral-400">
          {video.views} views •{" "}
          {new Date(video.createdAt).toLocaleDateString()}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 flex items-center gap-2"
          >
          <AiFillLike className="size-6" /> {video.likes}
          </button>
          <button
            onClick={handleDislike}
            className="px-4 py-2 bg-neutral-800 rounded-full hover:bg-neutral-700 flex items-center gap-2"
          >
            <AiFillDislike /> {video.dislike}
          </button>
        </div>

        {/* CHANNEL */}
        <div className="flex items-center gap-3 mt-6">
          {user?.logourl && (
            <img
              src={user.logourl}
              alt="Channel"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{user?.channelname}</p>
            <p className="text-sm text-neutral-400">Creator</p>
          </div>
          <button
  onClick={handleSubscribe}
  className={`ml-auto px-4 py-2 rounded-full text-sm ${
    isSubscribed
      ? "bg-neutral-700 hover:bg-neutral-600"
      : "bg-red-600 hover:bg-red-500"
  }`}
>
  {isSubscribed ? "Subscribed" : "Subscribe"}
</button>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 bg-neutral-900 p-4 rounded-lg text-sm">
          {video.description}
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 outline-none"
          />

          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Post Comment
          </button>

          <div className="mt-4 space-y-3">
            {comments.length === 0 ? (
              <div className="text-center text-neutral-400 text-sm py-6">
                No comments yet. Be the first one.
              </div>
            ) : (
              comments.map((c) => (
                <div key={c._id} className="bg-neutral-900 p-3 rounded-lg">
                  <p className="font-medium">{c.user || "Anonymous"}</p>
                  <p className="text-sm text-neutral-300">{c.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-80 shrink-0">
        <h2 className="text-lg font-semibold mb-3">Recommended</h2>

        <div className="space-y-3">
          {recommended.map((vid) => (
            <Link
              to={`/dashboard/video/${vid._id}`}
              key={vid._id}
              className="flex gap-3 hover:bg-neutral-900 p-2 rounded-lg"
            >
              <img
                src={vid.thumbnailurl}
                alt={vid.title}
                className="w-40 h-24 object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-medium line-clamp-2">{vid.title}</p>
                <p className="text-xs text-neutral-400">{vid.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
