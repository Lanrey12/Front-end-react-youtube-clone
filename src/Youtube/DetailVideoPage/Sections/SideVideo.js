import React, {useEffect, useState} from 'react'
import axios from 'axios'

function SideVideo() {

    const baseUrl = "http://localhost:5000/youtube";
    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
       axios.get(`${baseUrl}/getVideos`)
           .then(res => {
            if (res.data.success) {
                setSideVideos(res.data.video);
              } else {
                alert("Failed to get video");
              }
           })
    }, [])

    
    const sideVideoItem = SideVideos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

         return (
            <div style={{display: 'flex', marginTop:"1rem", padding:"0 2rem"}} key={index}>
            <div style={{width: "40%", marginRight: "1rem"}}>
              <a href={`/video/${video._id}`} style={{color: 'grey'}}>
                <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                </a>
            </div>
            <div style={{width: "50%"}}>
                <a href={`/video/${video._id}`} style={{color: 'grey'}}>
                <span style={{fontSize: '1rem', color: 'black'}}>{video.title}</span>
                <span>{video.writer.name}</span><br/>
                <span>{video.views}</span><br/>
                <span> {minutes} : {seconds}</span>
                </a>
            </div>
        </div>
         )
    })
    return (
        <React.Fragment>
            <div style={{marginTop: "3rem"}}>
            {sideVideoItem}
            </div>
        </React.Fragment>
    )
}

export default SideVideo
