import React from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const Uploadvideos=()=>{
  const [title,settitle]=useState('')
  const [description,setdescription]=useState('')
  const [category,setcategory]=useState('')
  const [tags,settags]=useState('')
  const [video,setvideo]=useState(null)
  const [thumbnail,setthumbnail]=useState(null)
  const [loading,setloading]=useState(false)
  const [imageurl,setimageurl]=useState(null)
  const navigate=useNavigate();
  const videohandler=(e)=>{
    setvideo(e.target.files[0])
  }
  const thumbnailhandler=(e)=>{
    setthumbnail(e.target.files[0])
    setimageurl(URL.createObjectURL(e.target.files[0]))
  }
  const submithandler = (e) => {
  e.preventDefault();
  setloading(true);

  const formdata = new FormData();
  formdata.append('title', title);
  formdata.append('description', description);
  formdata.append('category', category);
  formdata.append('tags', tags);
  formdata.append('video', video);
  formdata.append('thumbnail', thumbnail);

  // 1. Safely extract the token from the 'user' string
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  axios.post(`${import.meta.env.VITE_API_URL}/video/upload`, formdata, {
    headers: {
      // 2. Pass the correctly extracted token
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setloading(false);
    console.log(res.data);
    toast("video uploaded...");
    navigate('/dashboard/myvideos');
  })
    .catch(err=>{
      console.log(err)
      setloading(false)
      toast.error(err.response.data.error)
    })
  }
  const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

  if(!user){
    return (
      <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center">
    Please login to upload videos.
    </div>
    )
  }
  /*return(
    <div className='upload-container'>
      <h2>upload video</h2>
      <form onSubmit={submithandler} className="upload-form">
        <input onChange={(e)=>{settitle(e.target.value)}} placeholder="title"/>
        <input onChange={(e)=>{setdescription(e.target.value)}} placeholder="description"></input>
        <select onChange={(e)=>{setcategory(e.target.value)}}>
          <option value='science'>Science</option>
          <option value='technology'>Technology</option>
          <option value='education'>Education</option>
          <option value='motivation'>Motivation</option>
          <option value='story'>Story</option>
        </select>
        <textarea onChange={(e)=>{settags(e.target.value)}} placeholder="tags"></textarea>
        <label>Select Video</label>
        <input onChange={videohandler} type='file' />
        <label>Thumbnail</label>
        <input onChange={thumbnailhandler} type='file' />
        {imageurl && <img className="thumbnail" alt='thumbnail' src={imageurl} />}
        <button type="submit">{loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}upload</button>
      </form>
    </div>
    )*/
  return (
  <div className="upload-page-wrapper">
    <div className="upload-card">
      
      <div className="upload-header">
        <h2>PUBLISH YOUR CREATION</h2>
        <p>Select and prepare your next masterpiece for the community.</p>
      </div>

      <form onSubmit={submithandler} className="upload-layout">
        
        {/* LEFT COLUMN: Media Uploads */}
        <div className="media-column">
          <div className="drag-drop-zone">
            <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
            <h3>DRAG & DROP YOUR VIDEO FILE</h3>
            <p>OR CLICK TO BROWSE</p>
            <span className="file-info">Supported formats: MP4, MOV, AVI. Max: 2GB.</span>
            {/* The actual input is hidden over the whole box to make it clickable */}
            <input onChange={videohandler} type="file" className="file-overlay" accept="video/*" />
          </div>

          <div className="thumbnail-zone">
            <div className="thumb-text">
              <label>THUMBNAIL</label>
              <p>Upload a compelling image.</p>
            </div>
            <div className="thumb-input-container">
              <input onChange={thumbnailhandler} type="file" className="thumb-input" accept="image/*" />
              {imageurl && <img className="thumbnail-preview" alt="thumbnail" src={imageurl} />}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Text Inputs */}
        <div className="details-column">
          <div className="form-group">
            <label>FIELD: TITLE</label>
            <input onChange={(e)=>{settitle(e.target.value)}} placeholder="Enter an engaging title" required />
          </div>

          <div className="form-group">
            <label>FIELD: DESCRIPTION</label>
            <textarea onChange={(e)=>{setdescription(e.target.value)}} placeholder="Tell viewers about your video..." rows="4" required></textarea>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>FIELD: CATEGORY</label>
              <select onChange={(e)=>{setcategory(e.target.value)}}>
                <option value='science'>Science</option>
                <option value='technology'>Technology</option>
                <option value='education'>Education</option>
                <option value='motivation'>Motivation</option>
                <option value='story'>Story</option>
              </select>
            </div>
            
            <div className="form-group half-width">
              <label>FIELD: TAGS</label>
              <input onChange={(e)=>{settags(e.target.value)}} placeholder="#Science #Education" />
            </div>
          </div>
        </div>

        {/* FULL WIDTH SUBMIT BUTTON */}
        <div className="submit-container">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "BEGIN UPLOAD & PUBLISH"}
          </button>
        </div>

      </form>
    </div>
  </div>
);
}


