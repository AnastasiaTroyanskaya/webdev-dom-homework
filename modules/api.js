
import {renderComments} from "./render.js";

const messageButtonElement = document.getElementById("message-button");
const addNameElement = document.getElementById("add-name");
const addTextElement = document.getElementById("add-text");
let comments = [];

const needTrueDate = (date) => {
  const newDate = new Date(Date.parse(date));
  const year = newDate.getFullYear().toString().slice(2);
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  const hours = ("0" + newDate.getHours()).slice(-2);
  const minutes = ("0" + newDate.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export function getApi () {
  return fetch ("https://wedev-api.sky.pro/api/v1/:anast-tro/comments", {
     method: "GET",
   })
   .then((response) => {
     return response.json();
   })
   .then((responseData) => {
     comments = responseData.comments.map((comment) => {
       return {
         commentAuthor: comment.author.name,
         commentText: comment.text,
         commentLikes: comment.likes,
         commentDate: needTrueDate(comment.date),
         commentIsLike: comment.isLiked,
       }
     })
     renderComments(comments);
   })
   .then(() => {
       messageButtonElement.disabled = false;
       messageButtonElement.textContent = 'Написать';
     })
 }

 getApi(comments);

export function postApi () { 
    fetch ("https://wedev-api.sky.pro/api/v1/:anast-tro/comments", {
      method: "POST",
      body: JSON.stringify({
        text: addTextElement.value,
        name: addNameElement.value,
        forceError: true
      }),
    })
    .then((response) => {
      if (response.status === 500) {
        throw new Error ('Сервер упал');
      };
      if (response.status === 400) {
        throw new Error ('Неверный запрос');
      };
      return response.json();
    })
    .then(() => {
      return getApi();
    })
    .then(() =>{
      addNameElement.value = "";
      addTextElement.value = "";
     })
    .catch((error) => {
        console.warn(error);
        messageButtonElement.disabled = false;
        messageButtonElement.textContent = "Написать";
        if (error.message === 'Сервер упал') {
          alert('Сервер упал');
        } else if (error.message === 'Неверный запрос') {
          alert('Имя и комментарий должны быть не короче 3-х символов');
        } else {
          alert('Кажется, что-то пошло не так, повторите позже');
        }
    })
    renderComments(comments);
  }
