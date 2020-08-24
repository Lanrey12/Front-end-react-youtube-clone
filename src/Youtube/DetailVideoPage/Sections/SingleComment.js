import React, {useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import { accountService } from '../../../redux/actions/userActions'
import axios from 'axios'
import LikeDislikes from './LikeDislikes';


const { TextArea } = Input;


function SingleComment(props) {

    const userId = window.localStorage.getItem('userId')
    const [OpenReply, setOpenReply] = useState(false)    
    const openReply = () => {
        setOpenReply(!OpenReply)
    }
     
    const action = [
        <LikeDislikes comment commentId={props.comment._id} userId={userId}/>, 
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ]

    const [CommentValue, setCommentValue] = useState("")
    const handleChange = (e) => {
    setCommentValue(e.currentTarget.value)
}
   
    const onSubmit = (e) => {
           e.preventDefault();
           const writerId = accountService.userValue.id;
           const variables ={
               writer: writerId,
               postId: props.postId,
               responseTo: props.comment._id,
               content: CommentValue
           }
           axios.post("http://localhost:5000/comment/saveComments", variables)
           .then(res => {
            if(res.data.success){
              console.log("reply to", res.data.result)
              setCommentValue("")
              setOpenReply(!OpenReply)
              props.refreshFunction(res.data.result)
            }else{
                alert('Failed to save comment')
            }
        })
    }

   
    return (
        <div>
            <Comment 
                 actions={action}
                 author = {props.comment.writer.firstName}
                 avatar={
                     <Avatar src={props.comment.writer.image} alt = "image"/>
                 }
                 content = {
                     <p>
                         {props.comment.content}
                     </p>
                 }></Comment>
       {OpenReply && 
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={CommentValue}
          placeholder="Comment on this post"
        />
        <br />
        <Button style={{width:"20%", height:"52px"}} onClick={onSubmit}> Submit </Button>
      </form>}
        </div>
    )
}

export default SingleComment
