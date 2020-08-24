import React, {useEffect, useState} from "react";
import { Tooltip, Icon } from "antd";
// import Icon from '@ant-design/icons'
import axios from 'axios'



function LikeDislikes(props) {

    const baseUrl = "http://localhost:5000/like"
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)
    const [LikeAction, setLikeAction] = useState(null)

    let variable = {
         
    }
    if(props.video){
         variable = { videoId: props.videoId, userId: props.userId}
    }else{
        variable = {commentId: props.commentId, userId: props.userId}
    }

  useEffect(() => {
     
      axios.post(`${baseUrl}/getLikes`, variable)
      .then(res => {
        if(res.data.success){
          setLikes(res.data.likes.length)

          res.data.likes.map((like) => {
               if(like.userId === props.userId){
                    setLikeAction('liked')
               }
          })
        }else{
          alert('Failed to get likes')
        }
      })

      axios.post(`${baseUrl}/getDislikes`, variable)
      .then(res => {
        if(res.data.success){
          setDislikes(res.data.dislikes.length)

          res.data.dislikes.map((dislike) => {
               if(dislike.userId === props.userId){
                    setDislikeAction('disliked')
               }
          })
        }else{
          alert('Failed to get dislikes')
        }
      })

  }, [])
   
  const onLike = () => {
    if(LikeAction === null){
          axios.post(`${baseUrl}/upLike`, variable)
          .then(res => {
            if(res.data.success){
                  setLikes(Likes + 1)
                  setLikeAction('liked')
                   if(DislikeAction !== null){
                    setDislikeAction(null)
                    setDislikes(Dislikes - 1)
                   }          
            }else{
              alert('Failed to uplike')
            }
          })
    }else{

      axios.post(`${baseUrl}/downLike`, variable)
      .then(res => {
        if(res.data.success){
                   setLikes(Likes - 1)
                  setLikeAction(null)

        }else{
          alert('Failed to downlike')
        }
      })

    }
  }

  const onDisLike = () => {
     if(DislikeAction === null){
      axios.post(`${baseUrl}/upDislike`, variable)
      .then(res => {
        if(res.data.success){
                  setDislikes( Dislikes + 1)
                  setDislikeAction('disliked')
                  
              setLikeAction(null)
              setLikes(Likes - 1)
                  
            
        }else{
          alert('Failed to upDislike')
        }
      })
     }else{
      axios.post(`${baseUrl}/downDislike`, variable)
      .then(res => {
        if(res.data.success){
          setDislikes( Dislikes - 1)
          setDislikeAction(null)
        }else{
          alert('Failed to downDislike')
        }
     })
  }
}
  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
        <Icon
            type="like"
            
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick = {onLike}
          />
        </Tooltip>
  <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
      </span>&nbsp;&nbsp;
      <Tooltip>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick = {onDisLike}
          />
        </Tooltip>
  <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
      </span>
      </Tooltip>
    </React.Fragment>
  );
}

export default LikeDislikes;
