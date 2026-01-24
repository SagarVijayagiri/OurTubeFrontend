import axios from 'axios'
import React,{useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
export const Myvideos=()=>{

  const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

  if(!user){
    return (
    <div className="w-full min-h-[calc(100vh-56px)] flex items-center justify-center">
    Please login to view your videos.
    </div>

  )
  }




  const [videos,setvideos]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    getownvideo()
  },[])
  const getownvideo=()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/video/ownvideo`,{
      headers:{
        Authorization:'Bearer ' +localStorage.getItem('token')
      }
    })
    .then(res=>{
      console.log(res.data)
      setvideos(res.data.Videos)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handlevideoclick=(id)=>{
    navigate(`/video/${id}`)
    console.log(id)
  }
  const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this video?")) return;

  axios.delete(`https://ourtubeapi1.onrender.com/video/${id}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  })
    .then(() => {
      setvideos(videos.filter(v => v._id !== id))
    })
    .catch(err => console.error(err))
}

  return(
    <div className="myvideos-container">
      <table className='videos-table'>
        <thead>
          <tr>
            <th>Video</th>
            <th>Title</th>
            <th>Date</th>
            <th>views</th>
            <th>Like vs Dislike</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video=>(
          <tr key={video._id} onClick={()=>
            handlevideoclick(video._id)} style={{cursor:'pointer'}}
          >
            <td><img src={video.thumbnailurl} /></td>
            <td>{video.title}</td>
            <td>{video.createdAt}</td>
            <td>{video.views}</td>
            <td>{video.likes}/{video.dislike}</td>
            <td><button onClick={(e) => {
              e.stopPropagation()
              handleDelete(video._id)
            }} style={{background_color:"red"}}>Delete</button></td>
            <td>
            <button
             onClick={(e) => {
             e.stopPropagation(); // prevents the row click
             navigate(`/update/${video._id}`);
            }}
            >
             Edit
            </button>
</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}