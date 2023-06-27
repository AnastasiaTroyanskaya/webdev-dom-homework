import { addLikeButtonElement, addReply} from "./index.js";

const commentsList = document.getElementById("comments");

export function renderComments (comments) {
    const commentsHtml = comments
    .map((comment) => {
      return `<li class="comment">
      <div class="comment-header">
            <div>${comment.commentAuthor}</div>
            <div>${comment.commentDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
              ${comment.commentText}
        </div>
      </div>
        <div class="comment-footer">
          <div class="likes"> 
            <span class="likes-counter">${comment.commentLikes}</span>
            <button class="${comment.commentIsLike ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
      </div>
    </li>`;
    })
    .join("");

    commentsList.innerHTML = commentsHtml;
    addLikeButtonElement(comments);
    addReply();
  }