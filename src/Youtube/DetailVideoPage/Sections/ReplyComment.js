import React, { useEffect, useState } from "react";
import SingleComment from "../Sections/SingleComment";

function ReplyComment(props) {
  const [ChidCommentNumber, setChidCommentNumber] = useState(0);
  const [OpenReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.CommentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChidCommentNumber(commentNumber);
  }, [props.CommentList, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) => 
    props.CommentList.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ margin: "50px", width: "80%" }} key={index}>
            <SingleComment
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
            <ReplyComment
              CommentList={props.CommentList}
              postId={props.postId}
              parentCommentId={comment._id}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));


  const handleChange = () => {
    setOpenReplyComment(!OpenReplyComment);
  };

  return (
    <div>
      {ChidCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={handleChange}
        >
          View {ChidCommentNumber} more comment(s)
        </p>
      )}
      {OpenReplyComment && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;

