

function showComment() {
  commentContainer.innerHTML = "";

  commentList.forEach((comment) => {
    if (comment.book_id !== bookId || !comment.isActive) {
      return;
    }

    const user = user_data.find(user => user.id === comment.user_id);

    const wrapper = document.createElement("div");
    wrapper.classList.add("book-detail-comments-wrap");

    const commentElement = document.createElement("div");
    commentElement.classList.add("book-detail-comment");

    const headerElement = document.createElement("div");
    headerElement.classList.add("comment-header");

    const profileElement = document.createElement("div");
    profileElement.classList.add("comment-profile");

    const profileImage = document.createElement("img");
    profileImage.src = user.profile;
    profileImage.alt = user.name;
    profileImage.width = 40;
    profileElement.appendChild(profileImage);

    const usernameElement = document.createElement("p");
    usernameElement.classList.add("comment-username");
    usernameElement.textContent = user.name;

    const honestCommenter = JSON.parse(localStorage.getItem("borrow-list"))
      .find(
        e =>
          e.book_id === comment.book_id &&
          e.user_id === comment.user_id &&
          moment(e.borrow_date).isBefore(moment().subtract(5, "hours"))
      );

    if (honestCommenter) {
      const trustedElement = document.createElement("span");
      trustedElement.classList.add("trusted");
      trustedElement.textContent = "Trusted";
      usernameElement.appendChild(trustedElement);
    }

    const momentTime = moment(comment.time);
    const diffInDays = moment().diff(momentTime, "days");
    const formattedDateTime = diffInDays > 1 ?
      momentTime.format("DD-MMM-YYYY h:mm A") :
      momentTime.fromNow();

    const timeElement = document.createElement("p");
    timeElement.classList.add("comment-time");
    timeElement.textContent = formattedDateTime;

    profileElement.appendChild(usernameElement);
    profileElement.appendChild(timeElement);
    headerElement.appendChild(profileElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("comment-actions");

    const likeElement = document.createElement("span");
    likeElement.classList.add("comment-like");

    const likeIconElement = document.createElement("i");

    const thisUser = getUserData().find(e => e.id === JSON.parse(localStorage.getItem("id")));
    const isLiked = commentLikeList.find(like => like.comment_id === comment.comment_id && like.user_id === thisUser.id);
    const likeCount = commentLikeList.filter(like => like.comment_id === comment.comment_id);

    const likeNameElement = document.createElement("div");
    likeNameElement.className = "tooltip";
    likeNameElement.setAttribute("role", "tooltip");
    likeNameElement.dataset.popperPlacement = "top";
    likeCount.forEach(names => {
      likeNameElement.innerText += `${names["username"]}, `;
    });

    function mouseOverLikes() {
      if (likeCount.length > 0) {
        likeNameElement.style.display = "block";
        likeElement.appendChild(likeNameElement);
      }
    };

    function mouseOutLikes () {
      if (likeCount.length > 0) {
        likeNameElement.style.display = "none";
      }
    };
    likeElement.addEventListener("mouseover", mouseOverLikes)
    likeElement.addEventListener("mouseout", mouseOutLikes)

    let likeData;
    const showLike = () => {
      if (isLiked) {
        likeData = {
          comment_id: comment.comment_id,
          user_id: thisUser.id
        };
        likeElement.dataset.likeData = JSON.stringify(likeData);
        likeIconElement.className = "bi bi-heart-fill";
      } else {
        likeIconElement.className = "bi bi-heart";
      }
    };

    showLike();

    const likesCountElement = document.createElement("p");
    likesCountElement.classList.add("comment-like-number");
    likesCountElement.textContent = likeCount.length;

    likeElement.appendChild(likeIconElement);
    likeElement.appendChild(likesCountElement);
    actionsElement.appendChild(likeElement);
    headerElement.appendChild(actionsElement);

    const bodyElement = document.createElement("div");
    bodyElement.classList.add("comment-body");

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("comment-description");
    descriptionElement.textContent = comment.description;

    const saveIconElement = document.createElement("span");
    saveIconElement.classList.add("bi", "bi-check-circle-fill");
    saveIconElement.style.display = "none";
    descriptionElement.appendChild(saveIconElement);

    if (thisUser["id"] === comment["user_id"]) {
      const editIconElement = document.createElement("span");
      editIconElement.classList.add("bi", "bi-pencil-square");
      editIconElement.innerText = "Edit";
      actionsElement.appendChild(editIconElement);

      const trashIconElement = document.createElement("span");
      trashIconElement.classList.add("bi", "bi-trash");
      trashIconElement.innerText = "Delete";
      actionsElement.appendChild(trashIconElement);

      function deleteComment()  {
        const deleteConfirm = confirm("Are you sure want to delete this comment?");
        if (deleteConfirm) {
          comment["isActive"] = false;
          localStorage.setItem("comments", JSON.stringify(commentList));
          wrapper.remove();
        }
      };

      function editComment() {
        descriptionElement.contentEditable = true;
        saveIconElement.style.display = "flex";
      }

      function saveComment() {
        descriptionElement.removeAttribute("contentEditable");
        saveIconElement.style.display = "none";
        comment["description"] = descriptionElement.textContent;
        localStorage.setItem("comments", JSON.stringify(commentList));
      }

      trashIconElement.addEventListener("click", deleteComment);
      editIconElement.addEventListener("click", editComment);
      saveIconElement.addEventListener("click", saveComment);
    }

    bodyElement.appendChild(descriptionElement);
    commentElement.appendChild(headerElement);
    commentElement.appendChild(bodyElement);
    wrapper.appendChild(commentElement);
    commentContainer.prepend(wrapper);

    likeElement.addEventListener("click", () => {
      if (likeData) {
        const likeData = JSON.parse(likeElement.dataset.likeData);
        const index = commentLikeList.findIndex(like => like.comment_id === likeData.comment_id && like.user_id === likeData.user_id);

        if (index !== -1) {
          commentLikeList.splice(index, 1);
          localStorage.setItem("comment_likes", JSON.stringify(commentLikeList));
          showComment();
        }

        likeElement.dataset.likeData = null;
      } else {
        const like = {
          comment_id: comment.comment_id,
          user_id: thisUser.id,
          book_id: bookId,
          username: thisUser.name,
          like_id: generateGuid(),
        };

        commentLikeList.push(like);
        localStorage.setItem("comment_likes", JSON.stringify(commentLikeList));
        showComment();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const sendBtn = document.querySelector(".add-comment-container .bi-telegram");
  const likeBtn = document.querySelector(".comment-like .bi-heart");
  const commentValue = document.querySelector("#add-comment");
  
  commentValue.addEventListener("keydown", event => {
  if (event.shiftKey && event.keyCode === 13) {
    commentValue.insertAdjacentHTML("beforeend", "");
  } else if (event.keyCode === 13) {
    event.preventDefault();
    sendBtn.click();
  }
  });
  
  sendBtn.addEventListener("click", () => {
  const commentObj = {
    comment_id: generateGuid(),
    description: commentValue.value,
    isActive: true,
    time: moment().format("DD-MMM-YYYY hh:mm A"),
    user_id: userId["id"],
    book_id: bookId,
  };
  
  if (commentValue.value.trim().length > 0) {
    commentList.push(commentObj);
    showComment();
    localStorage.setItem("comments", JSON.stringify(commentList));
    commentValue.value = "";
  }
  });
})

