
const parentElement = document.querySelector(".comments-container");

async function editComment(commentData, commentDescription) {
  const newDescription = prompt(
    "Enter the new description:",
    commentDescription.textContent
  );
  if (newDescription !== null) {
    commentDescription.textContent = newDescription;
  }
  await putData(`Comments/${commentData.comment_id}`, commentData);
  commentData.description = newDescription;
  alert("Comment edited successfully");
}

async function deleteComment(commentData, commentContainer) {
  const deleteConfirm = confirm("Are you sure want to delete this comment?");
  if (deleteConfirm) {
    commentData["isActive"] = false;
    commentContainer.remove();
  }
  if (parentElement.innerHTML !== null) {
    parentElement.innerHTML = `<p class="no-comments">No Active Comments Found</p>`;
  }
  await putData(`Comments/${commentData.comment_id}`, commentData);
  alert("Comment deleted successfully");
}

async function likeComment(commentData, likeIcon, likeNumber) {
  const likeNum = +likeNumber.textContent;
  const addedLikeNum = likeNum + 1;
  const subtractedLikeNum = likeNum != 0 ? likeNum - 1 : 0;
  const commentLikeList = await getData("Likes");
  const likeId = generateGuid();
  const thisLike = commentLikeList.find(
    (like) =>
      like.comment_id === commentData.comment_id && like.user_id === thisUser.id
  );
  const likeIndex = commentLikeList.indexOf(thisLike);
  if (likeIndex === -1) {
    const like = {
      comment_id: commentData.comment_id,
      user_id: thisUser.id,
      book_id: bookId,
      username: thisUser.name,
      like_id: likeId,
    };
    putData(`Likes/${likeId}`, like).then(() => {
      likeNumber.innerHTML = addedLikeNum;
      likeIcon.className = "bi bi-heart-fill";
    });
  } else {
    deleteData(`Likes/${thisLike.like_id}`).then(() => {
      likeNumber.innerHTML = subtractedLikeNum;
      likeIcon.className = "bi bi-heart";
    });
  }
}

function commentCurrentTime(time) {
  const momentTime = moment(time);
  const diffInDays = moment().diff(momentTime, "days");
  const formattedDateTime =
    diffInDays > 1
      ? momentTime.format("DD-MMM-YYYY h:mm A")
      : momentTime.fromNow();
  return formattedDateTime;
}

async function showComment() {
  parentElement.innerHTML = "";
  const userList = await getData("Users");
  const comments = await getData("Comments");
  const likes = await getData("Likes");
  const borrowList = await getData("Borrows");
  const filteredComments = comments
    .filter((comment) => comment.book_id === bookId && comment.isActive)
    .reverse();
  if (filteredComments.length < 1) {
    parentElement.innerHTML = `<p class="no-comments">No Active Comments Found</p>`;
  }
  filteredComments.forEach((commentData) => {
    const likeArr = likes.filter(
      (like) => like.comment_id === commentData.comment_id
    );
    const user = userList.find((user) => user.id === commentData.user_id);

    const commentSection = createCommentSection(commentData, user, likeArr, borrowList);
    parentElement.prepend(commentSection);
  });
}
showComment();
function createCommentSection(commentData, user, likeArr, borrowList) {
  const thisLike = likeArr.find(
    (like) =>
      like.comment_id === commentData.comment_id && like.user_id === thisUser.id
  );

  const commentsWrap = document.createElement("div");
  commentsWrap.className = "book-detail-comments-wrap";

  const comment = document.createElement("div");
  comment.className = "book-detail-comment";

  const commentHeader = document.createElement("div");
  commentHeader.className = "comment-header";

  const commentProfile = document.createElement("div");
  commentProfile.className = "comment-profile";

  const profileImage = document.createElement("img");
  profileImage.src = user["profile"];
  profileImage.alt = user["name"];
  profileImage.width = "40";

  const username = document.createElement("p");
  username.className = "comment-username";
  username.textContent = user["name"];

  const honestCommenter = borrowList?.find(
    (e) =>
      e.book_id === commentData.book_id &&
      e.user_id === commentData.user_id &&
      moment(e.borrow_date).isBefore(moment().subtract(5, "hours"))
  );

  if (honestCommenter) {
    const trustedElement = document.createElement("span");
    trustedElement.classList.add("trusted");
    trustedElement.textContent = "Trusted";
    username.appendChild(trustedElement);
  }

  const commentTime = document.createElement("p");
  commentTime.className = "comment-time";
  commentTime.textContent = commentCurrentTime(commentData["time"]);

  commentProfile.appendChild(profileImage);
  commentProfile.appendChild(username);

  commentProfile.appendChild(commentTime);
  commentHeader.appendChild(commentProfile);

  const commentActions = document.createElement("div");
  commentActions.className = "comment-actions";

  const commentLike = document.createElement("span");
  commentLike.className = "comment-like";

  const likeNameElement = document.createElement("div");
  likeNameElement.className = "tooltip";
  likeNameElement.setAttribute("role", "tooltip");
  likeNameElement.dataset.popperPlacement = "top";
  likeArr?.forEach((names, index, array) => {
    const name = names["username"];
    if (array.length == 0 || index === array.length - 1) {
      likeNameElement.innerText += `${name}. `;
    } else {
      likeNameElement.innerText += `${name}, `;
    }
  });

  commentLike.addEventListener("mouseover", () => {
    if (likeArr.length > 0) {
      likeNameElement.style.display = "block";
      commentLike.appendChild(likeNameElement);
    }
  });
  commentLike.addEventListener("mouseout", () => {
    if (likeArr.length > 0) {
      likeNameElement.style.display = "none";
    }
  });

  const likeNumber = document.createElement("p");
  likeNumber.className = "comment-like-number";
  likeNumber.textContent = likeArr.length;

  const likeIcon = document.createElement("i");
  likeIcon.className = thisLike ? "bi bi-heart-fill" : "bi bi-heart";
  likeIcon.addEventListener("click", () => {
    likeComment(commentData, likeIcon, likeNumber);
  });

  commentLike.appendChild(likeIcon);
  commentLike.appendChild(likeNumber);
  commentLike.appendChild(likeNameElement);
  commentActions.appendChild(commentLike);

  if (commentData.user_id === thisUser.id) {
    const editIcon = document.createElement("span");
    editIcon.className = "bi bi-pencil-square";
    editIcon.textContent = "Edit";
    editIcon.addEventListener("click", async () => {
      editComment(commentData, commentDescription);
    });
    commentActions.appendChild(editIcon);

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "bi bi-trash";
    deleteIcon.textContent = "Delete";
    deleteIcon.addEventListener("click", async () => {
      deleteComment(commentData, commentsWrap);
    });
    commentActions.appendChild(deleteIcon);
  }

  const commentBody = document.createElement("div");
  commentBody.className = "comment-body";

  const checkCircle = document.createElement("span");
  checkCircle.className = "bi bi-check-circle-fill";
  checkCircle.style.display = "none";

  const commentDescription = document.createElement("div");
  commentDescription.className = "comment-description";
  commentDescription.textContent = commentData["description"];

  commentBody.appendChild(checkCircle);
  commentBody.appendChild(commentDescription);

  comment.appendChild(commentHeader);
  commentHeader.appendChild(commentActions);
  comment.appendChild(commentBody);
  commentsWrap.append(comment);

  return commentsWrap;
}

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector(".add-comment-container .bi-telegram");
  const commentValue = document.querySelector("#add-comment");

  commentValue.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.keyCode === 13) {
      commentValue.insertAdjacentHTML("beforeend", "");
    } else if (event.keyCode === 13) {
      event.preventDefault();
      sendBtn.click();
    }
  });

  sendBtn.addEventListener("click", () => {
    const commentId = generateGuid();
    const commentObj = {
      comment_id: commentId,
      description: commentValue.value,
      isActive: true,
      time: moment().format("DD-MMM-YYYY hh:mm A"),
      user_id: thisUser["id"],
      book_id: bookId,
    };
    if (commentValue.value.trim().length < 1) {
      return alert("Comment cannot be empty");
    }

    const commentSection = createCommentSection(commentObj, thisUser, []);
    parentElement.prepend(commentSection);
    document.querySelector(".no-comments")?.remove();
    putData(`Comments/${commentId}`, commentObj);
    commentValue.value = "";
  });
});
