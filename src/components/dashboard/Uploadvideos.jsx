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
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-[#0f0f13] p-4 sm:p-8 font-sans text-white">
      
      {/* Main Upload Card */}
      <div className="bg-[#1a1a20] rounded-2xl w-full max-w-5xl p-6 sm:p-10 shadow-2xl border border-[#2a2a35]">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wide mb-2">PUBLISH YOUR CREATION</h2>
          <p className="text-[#8a8a93] text-sm">Select and prepare your next masterpiece for the community.</p>
        </div>

        <form onSubmit={submithandler}>
          
          {/* Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            
            {/* LEFT COLUMN: Media Uploads */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Drag & Drop Zone */}
              <div className="relative bg-[#22222a] border-2 border-dashed border-[#4a4a5a] rounded-xl p-12 text-center transition-all duration-300 hover:border-red-500 hover:bg-[#2a2a35] overflow-hidden group">
                <i className="fa-solid fa-cloud-arrow-up text-5xl text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(255,51,51,0.4)]"></i>
                <h3 className="text-base mb-2 font-semibold text-gray-100">DRAG & DROP YOUR VIDEO FILE</h3>
                <span className="bg-[#333340] inline-block px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer mb-4 text-gray-200">
                  OR CLICK TO BROWSE
                </span>
                <span className="block text-[11px] text-[#7a7a85]">Supported formats: MP4, MOV, AVI. Max: 2GB.</span>
                
                {/* Hidden File Input covering the entire box */}
                <input 
                  onChange={videohandler} 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept="video/*" 
                />
              </div>

              {/* Thumbnail Upload Zone */}
              <div className="flex justify-between items-center bg-[#22222a] border border-[#3a3a45] rounded-xl p-4">
                <div>
                  <label className="text-[11px] text-[#8a8a93] uppercase tracking-wide font-semibold">Thumbnail</label>
                  <p className="text-xs text-gray-300 mt-1">Upload a compelling image.</p>
                </div>
                
                <div className="relative w-24 h-16 bg-[#333340] rounded-md border border-[#4a4a5a] flex justify-center items-center overflow-hidden hover:border-red-500 transition-colors">
                  {/* Hidden Thumbnail Input */}
                  <input 
                    onChange={thumbnailhandler} 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                    accept="image/*" 
                  />
                  {imageurl ? (
                    <img className="w-full h-full object-cover" alt="thumbnail" src={imageurl} />
                  ) : (
                    <i className="fa-solid fa-image text-[#7a7a85] text-xl"></i>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Text Details */}
            <div className="flex-1 flex flex-col gap-5">
              
              {/* Title Input */}
              <div className="flex flex-col">
                <label className="text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Field: Title</label>
                <input 
                  onChange={(e)=>{settitle(e.target.value)}} 
                  placeholder="Enter an engaging title" 
                  className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-red-500 focus:ring-0 transition-colors"
                  required 
                />
              </div>

              {/* Description Textarea */}
              <div className="flex flex-col">
                <label className="text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Field: Description</label>
                <textarea 
                  onChange={(e)=>{setdescription(e.target.value)}} 
                  placeholder="Tell viewers about your video..." 
                  rows="4"
                  className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-red-500 focus:ring-0 transition-colors resize-y"
                  required
                ></textarea>
              </div>

              {/* Category and Tags Row */}
              <div className="flex flex-col sm:flex-row gap-5">
                
                {/* Category Select */}
                <div className="flex flex-col flex-1">
                  <label className="text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Field: Category</label>
                  <select 
                    onChange={(e)=>{setcategory(e.target.value)}}
                    className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8a93' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value='science' className="bg-[#1a1a20]">Science</option>
                    <option value='technology' className="bg-[#1a1a20]">Technology</option>
                    <option value='education' className="bg-[#1a1a20]">Education</option>
                    <option value='motivation' className="bg-[#1a1a20]">Motivation</option>
                    <option value='story' className="bg-[#1a1a20]">Story</option>
                  </select>
                </div>

                {/* Tags Input */}
                <div className="flex flex-col flex-1">
                  <label className="text-[11px] text-[#8a8a93] mb-2 tracking-wide uppercase font-semibold">Field: Tags</label>
                  <input 
                    onChange={(e)=>{settags(e.target.value)}} 
                    placeholder="#Science #Education" 
                    className="w-full bg-transparent border border-[#3a3a45] rounded-lg p-3 text-sm text-white placeholder-[#5a5a65] focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold py-4 px-6 rounded-lg shadow-[0_4px_15px_rgba(255,51,51,0.3)] hover:shadow-[0_6px_20px_rgba(255,51,51,0.5)] transition-all duration-300 flex justify-center items-center gap-3 tracking-widest text-sm disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {loading && <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>}
            {loading ? 'UPLOADING...' : 'BEGIN UPLOAD & PUBLISH'}
          </button>

        </form>
      </div>
    </div>
  );
}


