import React, { useEffect, useState } from "react";
import { List, Avatar, Typography, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";

function DetailVideoPage(props) {

  const userId = window.localStorage.getItem('userId')
  const baseUrl = "http://localhost:5000/youtube";
  const commentUrl = "http://localhost:5000/comment";

 

  const videoId = props.match.params.videoId;
  const videoVariable = {
    videoId: videoId,
  };

  const [CommentList, setCommentList] = useState([])
  const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
  }

  const [Video, setVideo] = useState([]);
  useEffect(() => {
    axios.post(`${baseUrl}/video/getVideo`, videoVariable).then((res) => {
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Failed to get video info");
      }
    });
    axios.post(`${commentUrl}/getComments`, videoVariable).then((res) => {
      if (res.data.success) {
        setCommentList(res.data.comments);
      } else {
        alert("Failed to get comments");
      }
    });
  }, []);
  
 

  if(Video.writer){
    return (
        <Row>
          <Col lg={18} xs={24}>
            <div
              className="postPage"
              style={{ width: "100%", padding: "3rem 4rem" }}
            >
              <video
                style={{ width: "100%" }}
                src={`http://localhost:5000/${Video.filePath}`}
                controls
              ></video>
              <List.Item actions={[ 
              <LikeDislikes video videoId={videoId} userId={userId}/>, 
              <Subscriber userTo={Video.writer.id} userFrom = {userId}/>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={Video.writer && Video.writer.image} />}
                  title={<a href="">{Video.title}</a>}
                  description={Video.description}
                />
                <div></div>
              </List.Item>
              <Comments CommentList={CommentList} postId={Video._id} refreshFunction={updateComment}/>
            </div>
          </Col>
          <Col lg={6} xs={24}>
              <SideVideo/>
          </Col>
        </Row>
      );
  }else{
      return (
          <div>Loading...</div>
      )
  }
}

export default DetailVideoPage;
