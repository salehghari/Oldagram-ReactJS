import { useState, useRef, createRef } from "react";
import { addComment } from "./postsSlice"
import { userData } from "../../userData";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "./postsSlice";

export default function Posts() {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const [forNthPost, setForNthPost] = useState(null);
  const [comment, setComment] = useState([
    {
      id: 1,
      message: ""
    }
  ]);
  
  const submitButtonRefs = useRef([]);
  
  function separator(number) {
    var str = number.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  function showCommentSection(n) {
    // it will show the specific comments of the post, that you've clicked on
    setForNthPost(n);
  }
  function hideCommentSection() {
    // it will hide the comments section
    setForNthPost(null);
  }

  function onCommentChange(e, postId) {
    const submitButton = submitButtonRefs.current[postId - 1];

    if(!e.target.value) {
      submitButton.setAttribute("disabled", "")
    } else {
      submitButton.removeAttribute("disabled")
    }
    setComment(prevMessage => {
      return prevMessage.map(message => {
        return { id: postId, message: e.target.value };
      });
    });
  }

  function postComment(n, lastCommentId) {
    if(comment[0].message) {
      setForNthPost(n);
      dispatch(
        addComment({
          id: lastCommentId + 1,
          forNthPost: n,
          username: userData.username,
          message: comment[0].message,
          avatar: userData.avatar,
        })
      )
      setComment([
        {id: n, message: ""}
      ])
      showCommentSection(n)
    }
  }


  const renderedComments = posts.map(post => (
    post.comments.map(comment => (
      <div key={comment.id} className={forNthPost === comment.forNthPost ? "comments-section d-flex column" : "d-none comments-section"} >
        <div className="user-comment">
          <img className="profile-picture comment-profile-picture" src={comment.avatar} draggable={false} alt={comment.name} />
          <div className="comment-texts">
            <span className="bold" style={{ marginRight: "6px" }}>{comment.username}</span>
            <span>{comment.message}</span>
          </div>
        </div>
        {comment.replies?.map(reply => (
          <div key={reply.id} className="user-reply">
            <img className="profile-picture reply-profile-picture" src={reply.avatar} draggable={false} alt={reply.name} />
            <div className="comment-texts">
              <span className="bold" style={{ marginRight: "6px" }}>{reply.username}</span>
              <span>{reply.message}</span>
            </div>
          </div>
        ))}
      </div>
    ))
  ))
  const renderedPosts = posts.map(post => {
    const lastComment = post.comments.slice(-1)[0]; // last comment of each post
    return (
      <article key={post.id}>
        <div className="username-info d-flex">
          <img className="profile-picture" style={{margin: "12px 10px 12px 16px"}} draggable={false} src={post.avatar} alt={post.name} />
          <div className="d-flex column jc-center">
            <h1 className="large">{post.name}</h1>
            <p>{post.location}</p>
          </div>
        </div>
        <div className="d-flex column">
          <img className="post-image" src={post.postImage} alt={post.discription} />
          <div className="d-flex" style={{margin: "4px 16px 0 6px"}}>
            <button className="action-buttons reset-buttons cursor-pointer d-flex ai-center">
              <img className="action-images cursor-pointer" src="images/like.svg" alt="Like" />
            </button>
            <button onClick={() => showCommentSection(post.id)} className="action-buttons reset-buttons cursor-pointer d-flex ai-center">
              <img className="action-images" src="images/comment.svg" alt="Comment" />
            </button>
            <button className="action-buttons reset-buttons cursor-pointer d-flex ai-center">
              <img className="action-images" src="images/share.svg" alt="Share" />
            </button>
          </div>
          <div style={{margin: "0 16px 12px 16px"}}>
            <p className="likes-count bold">{separator(post.likes)} likes</p>
            <div className="d-flex">
              <span className="bold" style={{marginRight: "4px"}}>{post.username}</span><span>{post.discription}</span>
            </div>
            <section>
              <form className="d-flex" style={{marginTop: "8px"}}>
                <textarea
                  className="comment-input"
                  name="addComment"
                  aria-label="Add a comment…"
                  placeholder="Add a comment…"
                  value={comment.find(
                    i => i.id === post.id)?.message
                  }
                  onChange={(e) => onCommentChange(e, post.id)}
                  autoComplete="off">
                </textarea>
                <button onClick={() => postComment(post.id, lastComment.id)} className="reset-buttons submit-button bold" ref={(element) => submitButtonRefs.current.push(element)} type="button">Post</button>
              </form>
            </section>
          </div>
          <div onClick={hideCommentSection} className={forNthPost === post.id ? "overlay" : "d-none overlay"}></div>
          <div className={forNthPost === post.id ? "popup" : "d-none"}>
            {renderedComments}
          </div>
        </div>
      </article>
    )
  })
  return (
    <div className="Posts">
      <section>
        {renderedPosts}
      </section>
    </div>
  )
}
