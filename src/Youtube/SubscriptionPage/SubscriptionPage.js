import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Row, Typography } from "antd";
import axios from "axios";
import moment from "moment";

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage(props) {
    
  const baseUrl = "http://localhost:5000/youtube";
  const [Videos, setVideos] = useState([]);
  const userFrom = window.localStorage.getItem('userId')

  let variable = {
      userFrom:  userFrom
  }

  useEffect(() => {
    axios.post(`${baseUrl}/getSubscriptionVideos`, variable)
    .then((res) => {
      if (res.data.success) {
          setVideos(res.data.video)
      } else {
        alert("Failed to get subscription videos");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div style={{ position: "relative" , margin:"10px"}}>
            <a href={`/video/${video._id}`}>
          <img
            style={{ width: "100%" }}
            alt="thumbnail"
            src={`http://localhost:5000/${video.thumbnail}`}
          />
          <div
            className="duration"
            style={{
              color: "#fff",
              backgroundColor: "rgba(17, 17, 17, 0.8)",
              opacity: 0.8,
              padding: "2px 4px",
              bottom: 0,
              right: 0,
              position: "absolute",
              margin: "4px",
              borderRadius: "2px",
              letterSpacing: '0.5px',
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "12px"
            }}
          >
            <span>
              {minutes} : {seconds}
            </span>
          </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.firstName}</span>
        <br />
        <span style={{ margin: "3rem" }}>{video.views} views</span>
        <span>{moment(video.createdAt).format("MMM DD YYYY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Subscribed Videos</Title>
      <hr />
      <Row>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage
