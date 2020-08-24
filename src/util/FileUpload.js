import React, { useState } from "react";
import Dropzone from "react-dropzone";
import AddIcon from '@material-ui/icons/Add'
import axios from "axios"

function FileUpload(props) {

  const [Images, setImages] = useState([])
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("") 
  const [Thumbnail, setThumbnail] = useState("")

  const baseUrl = 'http://localhost:5000/youtube';


  const onDrop = (files) => {

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-Data" },
    };
    formData.append("file", files[0]);
     axios.post(`${baseUrl}/uploadVideo`, formData, config)
     .then(res => {
         if(res.data.success){
            let variable = {
              url: res.data.filePath,
              fileName: res.data.fileName
            }

            setFilePath(res.data.filePath)
            props.refreshFunction(res.data.filePath)
            axios.post(`${baseUrl}/thumbnail`, variable) 
            .then(res => {
              if(res.data.success){
                   setDuration(res.data.fileDuration)
                   setThumbnail(res.data.url)
                   props.thumbnailRefresh(res.data.url)
                   props.duration(res.data.fileDuration)  
              }else{
                alert('Failed to generate thumbnail')
              }
            })

         }else{
             alert('Failed to save video in server')
         }
     })
    //save the image in the node server
  };
  
  // const onDelete = (image) => {
  //      const currentIndex = Images.indexOf(image)
  //      let newImages = [...Images]
  //      newImages.splice(currentIndex, 1)

  //      setImages(newImages)
  //      props.refreshFunction(newImages)
  // }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} 
      multiple ={false} 
      maxSize = {800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{ 
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <AddIcon style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
       
             {Thumbnail !== ""  &&
              <div>
              <img  style={{ minWidth: '300px', width: '300px', height:'240px'}} src={`http://localhost:5000/${Thumbnail}`} alt="video"/>
            </div>
}
      </div>
    </div>
  );
}

export default FileUpload;
