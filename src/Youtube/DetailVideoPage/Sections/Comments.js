import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from 'axios'
import { accountService } from '../../../redux/actions/userActions'
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

function Comments(props) {

    const baseUrl = "http://localhost:5000/comment";
    const writerId = accountService.userValue.id;
    

    
const [Comment, setComment] = useState("")
const handleChange = (e) => {
    setComment(e.currentTarget.value)
}

const onSubmit = (e) => {
     e.preventDefault();
      
     const variables = {
         content: Comment,
         writer: writerId,
         postId: props.postId
     }
     axios.post(`${baseUrl}/saveComments`, variables)
     .then(res => {
         if(res.data.success){
             setComment("")
             props.refreshFunction(res.data.result)
         }else{
             alert('Failed to save comments')
         }
     })
}

  return (
    <div>
      <br />
      <p> replies</p>
      <hr/>
      {/* {console.log(props.CommentList)} */}

       { props.CommentList && props.CommentList.map((comment, index)=>(
        
        (!comment.responseTo &&
          <React.Fragment>
              <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
              <ReplyComment CommentList={props.CommentList}  postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
        </React.Fragment> )
            
       ))}


      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="Comment on this post"
        />
        <br />
        <Button style={{width:"20%", height:"52px"}} onClick={onSubmit}> Submit </Button>
      </form>
    </div>
  );
}

export default Comments;
