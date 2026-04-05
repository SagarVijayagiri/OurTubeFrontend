/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UpdateVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    thumbnailurl: '',
    tags: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_URL}/video/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(res => {
    console.log("Full response from /video/:id", res.data);

    const video = res.data.Video;

    if (!video) {
      setError('Video not found or access denied.');
      setLoading(false);
      return;
    }

    const { title, description, thumbnailurl, category, tags } = video;
    setVideoData({ title, description, thumbnailurl, category, tags:Array.isArray(tags)?tags.join(','):tags });
    setLoading(false);
  })
  .catch(err => {
    console.error(err);
    setError('Failed to load video data.');
    setLoading(false);
  });
}, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setVideoData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://ourtubeapi1.onrender.com/video/${id}`, videoData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(() => {
      alert('Video updated successfully!');
      navigate('/dashboard/myvideos');
    })
    .catch(err => {
      console.error(err);
      alert('Update failed.');
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="main-wrapper">
      <h2 className="c-name">Update Video</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div>
          <label className="blockfontmedium">Title</label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="blockfontmedium">Description</label>
          <textarea
            name="description"
            value={videoData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="blockfontmedium">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnailurl"
            value={videoData.thumbnailurl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="blockfontmedium">Category</label>
          <select required onChange={handleChange}>
          <option value='science'>Science</option>
          <option value='technology'>Technology</option>
          <option value='education'>Education</option>
          <option value='motivation'>Motivation</option>
          <option value='story'>Story</option>
        </select>
        </div>

        <div>
          <label className="blockfontmedium">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={videoData.tags}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Video
        </button>
      </form>
    </div>
  );
};*/
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UpdateVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    thumbnailurl: '',
    tags: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. Correctly extract the token once at the top level
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  useEffect(() => {
    if (!user?.token) {
      setError('Authentication required.');
      setLoading(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/video/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(res => {
      const video = res.data.Video;
      if (!video) {
        setError('Video not found or access denied.');
        setLoading(false);
        return;
      }

      const { title, description, thumbnailurl, category, tags } = video;
      setVideoData({ 
        title, 
        description, 
        thumbnailurl, 
        category, 
        tags: Array.isArray(tags) ? tags.join(', ') : tags 
      });
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load video data.');
      setLoading(false);
    });
  }, [id, user?.token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setVideoData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
    
    // 2. Used environment variable instead of hardcoded string
    axios.put(`${import.meta.env.VITE_API_URL}/video/${id}`, videoData, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(() => {
      setIsUpdating(false);
      alert('Video updated successfully!');
      navigate('/dashboard/myvideos');
    })
    .catch(err => {
      setIsUpdating(false);
      console.error(err);
      alert('Update failed.');
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center text-white">
          <p className="text-[#8a8a93] font-medium tracking-wide">Loading video details...</p>
      </div>
    );
  }

  if (error) {
      return (
      <div className="min-h-screen bg-[#0f0f13] flex flex-col gap-4 items-center justify-center text-white">
          <p className="text-red-500 font-medium">{error}</p>
          <button onClick={() => navigate('/dashboard/myvideos')} className="text-sm underline text-gray-400">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] p-4 sm:p-8 font-sans text-white flex items-center justify-center">
      <div className="bg-[#1a1a20] rounded-2xl w-full max-w-4xl p-6 sm:p-10 shadow-2xl border border-[#2a2a35]">
        
        {/* Header Section */}
        <div className="mb-8 border-b border-[#2a2a35] pb-6 flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/myvideos')}
            className="p-2 bg-[#22222a] hover:bg-[#2a2a35] rounded-full transition-colors border border-[#3a3a45]"
            title="Go Back"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Update Video Details</h2>
            <p className="text-[#8a8a93] text-sm mt-1">Modify the metadata and thumbnail for your existing video.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Top Row: Title & Category */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-[2]">
              <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Video Title</label>
              <input
                type="text"
                name="title"
                value={videoData.title}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Category</label>
              <select 
                name="category"
                value={videoData.category}
                onChange={handleChange}
                className="w-full bg-[#1a1a20] border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8a93' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                required
              >
                <option value='science'>Science</option>
                <option value='technology'>Technology</option>
                <option value='education'>Education</option>
                <option value='motivation'>Motivation</option>
                <option value='story'>Story</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Description</label>
            <textarea
              name="description"
              value={videoData.description}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors resize-y"
              rows={4}
              required
            />
          </div>

          {/* Bottom Row: Tags & Thumbnail */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={videoData.tags}
                  onChange={handleChange}
                  placeholder="e.g., tutorial, coding, react"
                  className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Thumbnail Image URL</label>
                <input
                  type="text"
                  name="thumbnailurl"
                  value={videoData.thumbnailurl}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Thumbnail Preview Area */}
            <div className="flex-1">
              <label className="block text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Thumbnail Preview</label>
              <div className="border border-[#3a3a45] rounded-lg overflow-hidden bg-[#22222a] w-full h-[180px] flex items-center justify-center relative">
                {videoData.thumbnailurl ? (
                  <img 
                    src={videoData.thumbnailurl} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block'; // Show broken icon
                    }} 
                  />
                ) : (
                  <span className="text-[#5a5a65] text-sm">No valid URL provided</span>
                )}
                {/* Fallback if image fails to load */}
                <div className="hidden text-[#5a5a65] text-sm absolute">Invalid Image URL</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 border-t border-[#2a2a35] pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/myvideos')}
              className="px-6 py-3 rounded-lg text-sm font-bold text-[#8a8a93] hover:text-white hover:bg-[#22222a] transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white font-bold py-3 px-8 rounded-lg shadow-[0_4px_15px_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isUpdating ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
