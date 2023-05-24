const parentElement = document.querySelector(".comments-container");

function editComment(commentData, commentDescription, comment) {
  const newDescription = prompt(
    "Enter the new description:",
    commentDescription.textContent
  );

  if (newDescription !== null) {
    commentDescription.textContent = newDescription;
  }

  commentData.isEdited = true;
  commentData.edited_at = moment().format("DD-MMM-YYYY hh:mm A");
  commentData.description = newDescription;
  showCommentEdited(comment, commentData.edited_at);

  putData(`Comments/${commentData.comment_id}`, commentData)
    .then(() => {
      alert("Comment edited successfully");
    })
    .catch((error) => {
      console.error("An error occurred while editing the comment:", error);
      alert("Failed to edit the comment");
    });
}


function showCommentEdited(comment,editedTime){
  const commentFooter = document.createElement("div");
  commentFooter.className = "comment-footer";

  const editedElement = document.createElement("div");
  editedElement.className = "tooltip";
  editedElement.setAttribute("role", "tooltip");
  editedElement.dataset.popperPlacement = "top";
  editedElement.textContent = editedTime;

  const commentEdited = document.createElement("small");
  commentEdited.className = "comment-edited";
  commentEdited.textContent = "(edited)";

  commentEdited.addEventListener("mouseover", () => {
    editedElement.style.display = "block";
  });
  commentEdited.addEventListener("mouseout", () => {
    editedElement.style.display = "none";
  });

  commentFooter.appendChild(editedElement);
  commentFooter.appendChild(commentEdited);
  comment.appendChild(commentFooter);
}
function deleteComment(commentData, commentContainer) {
  const deleteConfirm = confirm("Are you sure want to delete this comment?");
  if (deleteConfirm) {
    commentData["isActive"] = false;
    commentContainer.remove();
  }

  const commentExists = document.querySelector(".book-detail-comments-wrap");
  if (!commentExists) {
    parentElement.innerHTML = `<p class="no-comments">No Active Comments Found</p>`;
  }

  putData(`Comments/${commentData.comment_id}`, commentData)
    .then(() => {
      alert("Comment deleted successfully");
    })
    .catch((error) => {
      console.error("An error occurred while deleting the comment:", error);
      alert("Failed to delete the comment");
    });
}


function likeComment(commentData, likeIcon, likeNumber, likeNameElement) {
  const likeNum = +likeNumber.textContent;
  const addedLikeNum = likeNum + 1;
  const subtractedLikeNum = likeNum !== 0 ? likeNum - 1 : 0;

  let commentLikeList;

  getData("Likes")
    .then((likeList) => {
      commentLikeList = likeList;

      const thisLike = findLike(commentLikeList, commentData.comment_id, thisUser.id);
      const likeIndex = commentLikeList.indexOf(thisLike);

      if (likeIndex === -1) {
        addLike(commentData, likeIcon, likeNumber, likeNameElement)
          .then(() => {
            likeNameElement.innerText = updateLikeName(likeNameElement.innerText, thisUser.name);
            likeNumber.innerHTML = addedLikeNum;
            likeIcon.className = "bi bi-heart-fill";
          })
          .catch((error) => {
            console.error("An error occurred while adding the like:", error);
            alert("Failed to add the like");
          });
      } else {
        deleteLike(commentLikeList, likeIndex, likeIcon, likeNumber, likeNameElement)
          .then(() => {
            likeNameElement.innerText = updateLikeName(likeNameElement.innerText, thisUser.name);
            likeNumber.innerHTML = subtractedLikeNum;
            likeIcon.className = "bi bi-heart";
          })
          .catch((error) => {
            console.error("An error occurred while deleting the like:", error);
            alert("Failed to delete the like");
          });
      }
    })
    .catch((error) => {
      console.error("An error occurred while retrieving the like list:", error);
      alert("Failed to retrieve the like list");
    });
}

function findLike(likeList, commentId, userId) {
  return likeList.find(
    (like) =>
      like.comment_id === commentId &&
      like.user_id === userId
  );
}

function addLike(commentData, likeIcon, likeNumber, likeNameElement) {
  const likeId = generateGuid();
  const like = {
    comment_id: commentData.comment_id,
    user_id: thisUser.id,
    book_id: bookId,
    username: thisUser.name,
    like_id: likeId,
  };

  return putData(`Likes/${likeId}`, like);
}

function deleteLike(likeList, likeIndex, likeIcon, likeNumber, likeNameElement) {
  const likeToDelete = likeList[likeIndex];
  return deleteData(`Likes/${likeToDelete.like_id}`);
}

function updateLikeName(originalName, userName) {
  let updatedName = originalName;

  if (updatedName.includes(userName + ", ")) {
    updatedName = updatedName.replace(userName + ", ", "");
  }
  if (updatedName.includes(userName + ".")) {
    updatedName = updatedName.replace(userName + ".", "");
  }

  return updatedName;
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

function showComment() {
  parentElement.innerHTML = "";
  getData("Users")
    .then(function (userList) {
      getData("Comments")
        .then(function (comments) {
          getData("Likes")
            .then(function (likes) {
              getData("Borrows")
                .then(function (borrowList) {
                  const filteredComments = comments
                    .filter(
                      (comment) =>
                        comment.book_id === bookId && comment.isActive
                    )
                    .reverse();
                  if (filteredComments.length < 1) {
                    parentElement.innerHTML = `<p class="no-comments">No Active Comments Found</p>`;
                  }
                  filteredComments.forEach(function (commentData) {
                    const likeArr = likes.filter(
                      (like) => like.comment_id === commentData.comment_id
                    );
                    const user = userList.find(
                      (user) => user.id === commentData.user_id
                    );

                    const commentSection = createCommentSection(
                      commentData,
                      user,
                      likeArr,
                      borrowList,
                      userList
                    );
                    parentElement.prepend(commentSection);
                  });
                })
                .catch(function (error) {
                  console.error(error);
                  alert(
                    "An error occurred while fetching borrow list. Please try again later."
                  );
                });
            })
            .catch(function (error) {
              console.error(error);
              alert(
                "An error occurred while fetching likes. Please try again later."
              );
            });
        })
        .catch(function (error) {
          console.error(error);
          alert(
            "An error occurred while fetching comments. Please try again later."
          );
        });
    })
    .catch(function (error) {
      console.error(error);
      alert(
        "An error occurred while fetching user list. Please try again later."
      );
    });
}

showComment();
function createCommentSection(
  commentData,
  user,
  likeArr,
  borrowList,
  userList
) {
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
    const name = userList.find((n) => n.id === names["user_id"])["name"];
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
    likeComment(commentData, likeIcon, likeNumber, likeNameElement);
  });

  commentLike.appendChild(likeIcon);
  commentLike.appendChild(likeNumber);
  commentLike.appendChild(likeNameElement);
  commentActions.appendChild(commentLike);

  if (commentData.user_id === thisUser.id) {
    const editIcon = document.createElement("span");
    editIcon.className = "bi bi-pencil-square";
    editIcon.textContent = "Edit";
    editIcon.addEventListener("click",  () => {
      editComment(commentData, commentDescription,comment);
    });
    commentActions.appendChild(editIcon);

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "bi bi-trash";
    deleteIcon.textContent = "Delete";
    deleteIcon.addEventListener("click",  () => {
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

  if (commentData["isEdited"]) {
    showCommentEdited(comment,commentData["edited_at"])
  }

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
      isEdited: false,
    };
    if (commentValue.value.trim().length < 1) {
      return alert("Comment cannot be empty");
    }
  
    const commentSection = createCommentSection(commentObj, thisUser, []);
    parentElement.prepend(commentSection);
    document.querySelector(".no-comments")?.remove();
  
    putData(`Comments/${commentId}`, commentObj)
      .then(() => {
        commentValue.value = "";
      })
      .catch((error) => {
        console.error(error);
        alert("Error sending comment: " + error.message);
      });
  });
  
});
