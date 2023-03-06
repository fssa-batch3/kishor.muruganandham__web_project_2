const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");
const bookList = JSON.parse(localStorage.getItem("book_list"));
const thisBook = bookList.find((e) => e.id === bookId);

document.querySelector(".book-detail-image img").src = thisBook["image"]["src"];
document.querySelector(".book-detail-image img").alt = thisBook["image"]["alt"];
document.querySelector(".book-detail-header h2").textContent =
  thisBook["title"];
document.querySelector(".book-detail-header p").textContent =
  thisBook["author"];
document.querySelector(".book-detail-description p").textContent =
  thisBook["description"];
document.querySelector(".book-detail-pages-info").innerHTML +=
  thisBook["pages"];
document.querySelector(".book-detail-language-info").innerHTML +=
  thisBook["language"];
thisBook["tags"].forEach((tag) => {
  const tagSpan = document.createElement("span");
  tagSpan.className = "book-detail-tags";
  tagSpan.innerText = tag;
  document.querySelector(".book-detail-tags-list").append(tagSpan);
});
const starRating = document.getElementById("stars");

starRating.innerHTML = getStars(thisBook.star_rating);

// Borrow Modal

const modalCloseBtn = document.querySelector(".modal-close");
const borrowBtn = document.getElementById("borrow-now");
const borrowBtnElement = document.querySelector(".book-detail-borrow-now");
const borrowList = JSON.parse(localStorage.getItem("borrow-list")) || [];

modalCloseBtn.addEventListener("click", closeBorrowModal);
borrowBtn.addEventListener("click", openBorrowModal);

function closeBorrowModal() {
  hideElement(".backdrop");
  hideElement(".modal");
}

const availableDate = JSON.parse(localStorage.getItem("borrow-list")).find(
  (e) => e.book_id === thisBook["id"] && e.status === "Pending"
);
if (thisBook?.isBorrowable === false && availableDate) {
  const targetDate = moment(availableDate["due_date"]);
  const duration = moment.duration(targetDate.diff(moment()));
  const daysDiff = duration.asDays();
  borrowBtn.style.display = "none";
  borrowBtnElement.innerHTML = `<p class="available-date">Borrowed By ${availableDate["username"]},<br>Will Available in ${Math.ceil(daysDiff)} days</p>`;
} else  {
  borrowBtn.innerText = "Borrow Now";
  borrowBtn.disabled = false;
}
function openBorrowModal() {
  showElement(".backdrop");
  showElement(".modal");

  document.getElementById("book-title").value = thisBook?.title;

  const borrowNowBtn = document.querySelector(".modal-submit");
  const borrowDateInput = document.getElementById("borrow-date");
  const dueDateInput = document.getElementById("due-date");

  const todayDate = moment().format("YYYY-MM-DD");
  borrowDateInput.value = todayDate;
  let dueDateCalculated = moment(borrowDateInput.value).add(15, "days").format("YYYY-MM-DD");
    dueDateInput.value = dueDateCalculated;
  borrowDateInput.addEventListener("input", () => {
	dueDateCalculated = moment(borrowDateInput.value).add(15, "days").format("YYYY-MM-DD");
    dueDateInput.value = dueDateCalculated;
  });

  borrowNowBtn.addEventListener("click", handleBorrow);

  function handleBorrow() {
    const borrowDate = borrowDateInput.value;
    const dueDate = dueDateInput.value;

    if (!borrowDate || !dueDate) {
      alert("Both Dates are Required");
      return;
    }

    const borrowedBook = borrowList.find(
      (borrowed) => borrowed.book_id === bookId
    );

    if (borrowedBook && borrowedBook.status == "Pending") {
      alert("Book Already Exists");
      return;
    }

    const borrowObj = {
      borrow_date: moment().format("YYYY-MM-DD"),
      due_date: dueDate,
      status: "Pending",
      return_date: "-",
      book_id: bookId,
      user_id: userId.id,
	  username: userId.name,
      borrow_id: generateGuid(),
    };
    thisBook.isBorrowable = false;
    borrowList.push(borrowObj);

    localStorage.setItem("book_list", JSON.stringify(bookList));
    localStorage.setItem("borrow-list", JSON.stringify(borrowList));
    setUserData(user_data);
    location.reload();
  }
}

function showElement(selector) {
  document.querySelector(selector)?.classList.add("active");
}

function hideElement(selector) {
  document.querySelector(selector)?.classList.remove("active");
}

const commentContainer = document.querySelector(
  ".book-detail-comments-container"
);

commentList.forEach((comment) => {
  if (comment.book_id !== bookId || comment.isActive !== true) {
    return;
  }

  const user = user_data.find((user) => user.id == comment.user_id);

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
  profileImage.alt = "";
  profileImage.width = 40;
  profileElement.appendChild(profileImage);

  const usernameElement = document.createElement("p");
  usernameElement.classList.add("comment-username");
  usernameElement.textContent = user.name;

  const honestCustomer = JSON.parse(localStorage.getItem("borrow-list")).find(
    (e) =>
      e.book_id === comment.book_id &&
      e.user_id === comment.user_id &&
      e.borrow_date < moment().format("YYYY-MM-DD")
  );

  if (honestCustomer) {
    const trustedElement = document.createElement("span");
    trustedElement.classList.add("trusted");
    trustedElement.textContent = "Trusted";
    usernameElement.appendChild(trustedElement);
  }

  const momentTime = moment(comment.time);

  const diffInDays = moment().diff(momentTime, "days");
  let formattedDateTime;
  if (diffInDays > 1) {
    formattedDateTime = momentTime.format("DD-MMM-YYYY h:mm A");
  } else {
    formattedDateTime = momentTime.fromNow();
  }
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
  const thisUser = getUserData().find(
    (e) => e.id == JSON.parse(localStorage.getItem("id"))
  );
  const isLiked = commentLikeList.find(
    (like) =>
      like.comment_id === comment.comment_id && like.user_id === thisUser.id
  );

  let likeData;
  if (isLiked) {
    likeData = { comment_id: comment.comment_id, user_id: thisUser.id };
    likeElement.dataset.likeData = JSON.stringify(likeData);
    likeIconElement.className = "bi bi-heart-fill";
  } else {
    likeIconElement.className = "bi bi-heart";
  }

  const likesCountElement = document.createElement("p");
  likesCountElement.classList.add("comment-like-number");
  likesCountElement.textContent = commentLikeList.filter(
    (like) => like.comment_id === comment.comment_id
  ).length;

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

    trashIconElement.addEventListener("click", () => {
      comment["isActive"] = false;
      localStorage.setItem("comments", JSON.stringify(commentList));
      wrapper.remove();
    });
    editIconElement.addEventListener("click", () => {
      descriptionElement.contentEditable = true;
      saveIconElement.style.display = "flex";
    });
    saveIconElement.addEventListener("click", () => {
      descriptionElement.removeAttribute("contentEditable");
      saveIconElement.style.display = "none";
      comment["description"] = descriptionElement.textContent;
      localStorage.setItem("comments", JSON.stringify(commentList));
    });
  }
  bodyElement.appendChild(descriptionElement);

  commentElement.appendChild(headerElement);
  commentElement.appendChild(bodyElement);
  wrapper.appendChild(commentElement);
  commentContainer.appendChild(wrapper);

  if (likeData) {
    likeElement.addEventListener("click", () => {
      const likeData = JSON.parse(likeElement.dataset.likeData);
      const index = commentLikeList.findIndex(
        (like) =>
          like.comment_id === likeData.comment_id &&
          like.user_id === likeData.user_id
      );
      if (index !== -1) {
        commentLikeList.splice(index, 1);
        localStorage.setItem("comment_likes", JSON.stringify(commentLikeList));
        location.reload();
      }
      likeElement.dataset.likeData = null;
    });
  } else {
    likeElement.addEventListener("click", () => {
      const like = {
        comment_id: comment.comment_id,
        user_id: thisUser.id,
        book_id: bookId,
        like_id: generateGuid(),
      };
      commentLikeList.push(like);
      localStorage.setItem("comment_likes", JSON.stringify(commentLikeList));
      location.reload();
    });
  }
});

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[now.getMonth()];
  const day = now.getDate().toString().padStart(2, "0");
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime =
    `${hours.toString().padStart(2, "0")  }:${  minutes  } ${  ampm}`;
  return `${day}-${month}-${year} ${strTime}`;
}

const sendBtn = document.querySelector(".add-comment-container .bi-telegram");
const likeBtn = document.querySelector(".comment-like .bi-heart");
const commentValue = document.querySelector("#add-comment");
const commentId = generateGuid();

commentValue.addEventListener('keydown', function(event) {
  if (event.shiftKey && event.keyCode === 13) {
    sendBtn.click();
  };
});
sendBtn.addEventListener("click", () => {
  if (commentValue.value.length > 0) {
    const commentObj = {
      comment_id: commentId,
      description: commentValue.value,
      isActive: true,
      time: getCurrentDateTime(),
      user_id: userId["id"],
      book_id: bookId,
    };
    commentList.push(commentObj);
    location.reload();
    localStorage.setItem("comments", JSON.stringify(commentList));
  }
});
