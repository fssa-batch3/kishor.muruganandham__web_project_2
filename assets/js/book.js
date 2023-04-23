// Get book ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

async function showBookEditDetails() {
  const books = await getData("Books");
  const thisBook = books.find((book) => book.id === bookId);
  const indexOfBook = books.indexOf(thisBook);

  // Set the values of form fields based on the data for the book
  bookIdNo.value = thisBook.id;
  bookTitle.value = thisBook.title;
  bookAuthor.value = thisBook.author;
  bookLang.value = thisBook.language;
  bookPages.value = thisBook.pages;
  bookDesc.value = thisBook.description;
  bookImage.src = thisBook.image.src;
  bookImage.alt = thisBook.title;
  bookAvailablity.value = JSON.stringify(thisBook.isBorrowable);

  // Add event listener to Edit button to enable form fields for editing
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const editable = document.querySelectorAll(".ed-input");
    editable.forEach((inp) => {
      inp.removeAttribute("disabled");
    });
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    cancelBtn.style.display = "block";
    saveBtn.style.display = "block";
  });

  // Add event listener to Cancel button to reload the page and revert any unsaved changes
  cancelBtn.addEventListener("click", function () {
    location.reload();
  });

  // Add event listener to Delete button to mark the book as inactive and update the book list in Database
  deleteBtn.addEventListener("click", function () {
    thisBook.isActive = false;
    books[indexOfBook] = thisBook;
    putData(`book/${thisBook.json_id}`, thisBook).then((data) => {
      console.log(data);
    });
    window.location.href =
      window.location.origin + "/pages/admin/admin_library.html";
  });

  // Add event listener to Save button to update the book data and update the book list in Database
  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (bookIdNo.value !== thisBook.id) {
      alert("Book Id cannot be changed");
      location.reload();
      return;
    }
    thisBook.title = bookTitle.value;
    thisBook.author = bookAuthor.value;
    thisBook.language = bookLang.value;
    thisBook.pages = parseInt(bookPages.value, 10);
    thisBook.description = bookDesc.value;
    thisBook.image.src = bookImage.src;
    thisBook.isBorrowable = JSON.parse(bookAvailablity.value);
    books[indexOfBook] = thisBook;
    putData(`Books/${thisBook.id}`, thisBook)
    .then((data) => {
      console.log(data);
      // Success notification
      location.reload();
    });
  });
}

async function showBookDetails() {
  const books = await getData("Books");
  const borrowList = await getData(`Borrows/`)

  const thisBook = books.find((book) => book.id === bookId);
  document.querySelector(".book-detail-image img").src =
    thisBook["image"]["src"];
  document.querySelector(".book-detail-image img").alt =
    thisBook["image"]["alt"];
  const bookViews = borrowList?.filter(
    (e) => e.book_id === thisBook["id"]
  ).length;
  document.querySelector(".book-views").textContent =
    bookViews > 0 ? `${bookViews}` : `0`;
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
  
  const availableDate = borrowList?.find((e) => e.book_id === thisBook["id"] && e.status === "Pending");
  if (thisBook?.isBorrowable === false && availableDate) {
    const targetDate = moment(availableDate["due_date"]);
    const duration = moment.duration(targetDate.diff(moment()));
    const daysDiff = duration.asDays();
    borrowBtn.style.display = "none";
    borrowBtnElement.innerHTML = `<p class="available-date">Borrowed By ${
      availableDate["username"]
    },<br>Will Available in ${Math.ceil(daysDiff)} days</p>`;
  } else if (thisBook?.isBorrowable === true) {
    borrowBtn.innerText = "Borrow Now";
    borrowBtn.disabled = false;
  } else {
    borrowBtn.style.display = "none";
    borrowBtnElement.innerHTML = `<p class="available-date">Book is under Progress by Admin</p>`;
  }
}
