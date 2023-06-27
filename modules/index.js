import {postApi} from "./api.js";
import {getApi} from "./api.js";

const commentsList = document.getElementById("comments");
const messageButtonElement = document.getElementById("message-button");
const addNameElement = document.getElementById("add-name");
const addTextElement = document.getElementById("add-text");
let comments = [];
const deleteLastCommentButton = document.getElementById("delete-last-comment");
const messageElement = document.createElement('div');
messageElement.classList.add('message');
messageElement.textContent = 'Пожалуйста, подождите, комментарии загружаются...';
commentsList.append(messageElement); 

export const addLikeButtonElement = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (let i = 0; i < likeButtonElements.length; i++) {
      likeButtonElements[i].addEventListener("click", (event) => {
        event.stopPropagation();
        if (comments[i].commentIsLike === false) {
          comments[i].commentIsLike = true;
          comments[i].commentLikes++;
        }
        else if (comments[i].commentIsLike === true){
          comments[i].commentIsLike = false;
          comments[i].commentLikes--;
        }
        renderComments();
      })
    }
  };

  messageButtonElement.addEventListener('click', () => {
    addNameElement.classList.remove("error");
    addTextElement.classList.remove("error");

    if (addNameElement.value === "") {
          addNameElement.classList.add("error");
          return;
    }
    if (addTextElement.value === "") {
          addTextElement.classList.add("error");
          return;
    }
    
    // comments.push ({
    //   commentAuthor: addNameElement.value.replaceAll("&", "&amp;")
    //   .replaceAll("<", "&lt;")
    //   .replaceAll(">", "&gt;")
    //   .replaceAll('"', "&quot;"),
    //   commentText: addTextElement.value.replaceAll("&", "&amp;")
    //   .replaceAll("<", "&lt;")
    //   .replaceAll(">", "&gt;")
    //   .replaceAll('"', "&quot;"),
    //   commentLikes: 0,
    //   commentDate: newCurrentDate,
    //   commentIsLike: false,
    // });
    messageButtonElement.disabled = true;
    messageButtonElement.textContent = "Комментарий добавляется...";
    postApi();
    getApi();
  })

  deleteLastCommentButton.addEventListener("click", () => {
    const commentsList = document.getElementById("comments");
    const lastComment = commentsList.querySelector(".comment:last-of-type");

    if (lastComment) {
      commentsList.removeChild(lastComment);
    }
  });
  
 export function addReply() {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const authorName = commentElement.querySelector(".comment-header div:first-child").textContent;
        const authorText = commentElement.querySelector(".comment-text").textContent;
        addTextElement.value = `> ${authorText.trim()}\n${authorName}, `;
        addTextElement.focus();
      })
    }
  }
  