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
};
