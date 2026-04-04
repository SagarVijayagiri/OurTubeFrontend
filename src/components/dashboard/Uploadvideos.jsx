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
  return(
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
    )
}


