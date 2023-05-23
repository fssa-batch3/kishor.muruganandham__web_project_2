// Get book ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

function tagsToArray() {
  const tags = document.querySelector('input[name="input-custom-dropdown"]')
    .previousSibling.children;
  let str = "";
  for (let i = 0; i < tags.length - 1; i++) {
    const tag = tags[i].innerText;
    str += " " + tag.toLowerCase();
  }

  let stringArray = str.split(" ");
  let row = stringArray.filter((n) => n);
  return row;
}

async function showBookEditDetails() {
  // Store references to all relevant DOM elements
  const bookIdNo = document.getElementById("ed-book-id");
  const bookTitle = document.getElementById("ed-book-title");
  const bookAuthor = document.getElementById("ed-book-author");
  const bookLang = document.getElementById("ed-language");
  const bookPages = document.getElementById("ed-pages");
  const bookDesc = document.getElementById("ed-book-description");
  const bookImage = document.querySelector(".book-edit-image img");
  const bookAvailablity = document.getElementById("ed-book-available");
  const editBtn = document.querySelector(".book-edit.submit");
  const deleteBtn = document.querySelector(".book-delete.submit");
  const cancelBtn = document.querySelector(".book-cancel.submit");
  const saveBtn = document.querySelector(".book-save.submit");
  const imgEditBtn = document.querySelector(".bi-pencil-fill");
  const books = await getData("Books");
  const thisBook = books.find((book) => book.id === bookId);
  const tagsArray = await getBookGenres();
  const whitelist = Object.keys(tagsArray);
  const indexOfBook = books.indexOf(thisBook);
  const str = thisBook.tags.join(", ");
  const customInput = document.querySelector(
    'input[name="input-custom-dropdown"]'
  );
  customInput.value = str;

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
  bookImage.addEventListener("error", () => {
    bookImage.src =
      "https://via.placeholder.com/280x400/cccccc/3b3b3b.jpeg?text=Error+Loading+Image";
  });

  // Add event listener to Edit button to enable form fields for editing
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    imgEditBtn.style.display = "block";
    const editable = document.querySelectorAll(".ed-input");
    editable.forEach((inp) => {
      inp.removeAttribute("disabled");
    });
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    cancelBtn.style.display = "block";
    saveBtn.style.display = "block";
    new Tagify(customInput, {
      whitelist,
      maxTags: 5,
      dropdown: {
        maxItems: 20,
        classname: "tags-look",
        enabled: 0,
        closeOnSelect: false,
      },
    });
  });
  imgEditBtn.addEventListener("click", showUploadWidget);
  // Add event listener to Cancel button to reload the page and revert any unsaved changes
  cancelBtn.addEventListener("click", function () {
    location.reload();
  });

  // Add event listener to Delete button to mark the book as inactive and update the book list in Database
  deleteBtn.addEventListener("click", function () {
    thisBook.isActive = false;
    books[indexOfBook] = thisBook;
    putData(`Books/${thisBook.id}`, thisBook)
      .then(() => {
        alert("Book Deleted successfully");
        window.location.href =
          window.location.origin + "/pages/admin/admin_library.html";
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // Add event listener to Save button to update the book data and update the book list in Database
  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();
    setLoader(true);
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
    thisBook.tags = tagsToArray();
    thisBook.isBorrowable = JSON.parse(bookAvailablity.value);
    books[indexOfBook] = thisBook;
    putData(`Books/${thisBook.id}`, thisBook)
      .then(() => {
        setLoader(false);
        // Success notification
        alert("Book Details updated successfully");
        location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
let thisBook;
function showBookDetails() {
  getData("Books")
    .then((books) => {
      getData(`Borrows/`)
        .then((borrowList) => {
          thisBook = books.find((book) => book.id === bookId);

          const bookImage = document.querySelector(".book-detail-image img");
          bookImage.src = thisBook["image"]["src"];
          bookImage.alt = thisBook["image"]["alt"];
          bookImage.addEventListener("error", () => {
            bookImage.src =
              "https://via.placeholder.com/280x400/cccccc/3b3b3b.jpeg?text=Error+Loading+Image";
          });

          const bookViews = borrowList?.filter(
            (e) => e.book_id === thisBook["id"]
          ).length;
          const bookViewsElement = document.querySelector(".book-views");
          bookViewsElement.textContent = bookViews > 0 ? `${bookViews}` : `0`;

          const bookTitleElement = document.querySelector(".book-detail-header h2");
          bookTitleElement.textContent = thisBook["title"];

          const bookAuthorElement = document.querySelector(".book-detail-header p");
          bookAuthorElement.textContent = thisBook["author"];

          const bookDescriptionElement = document.querySelector(
            ".book-detail-description p"
          );
          bookDescriptionElement.textContent = thisBook["description"];

          const bookPagesElement = document.querySelector(".book-detail-pages-info");
          bookPagesElement.innerHTML = thisBook["pages"];

          const bookLanguageElement = document.querySelector(
            ".book-detail-language-info"
          );
          bookLanguageElement.innerHTML = thisBook["language"];

          const bookDetailTagsListElement = document.querySelector(
            ".book-detail-tags-list"
          );
          bookDetailTagsListElement.innerHTML = "";
          thisBook["tags"].forEach((tag) => {
            const tagSpan = document.createElement("span");
            tagSpan.className = "book-detail-tags";
            tagSpan.innerText = tag;
            bookDetailTagsListElement.append(tagSpan);
          });

          const availableDate = borrowList?.find(
            (e) => e.book_id === thisBook["id"] && e.status === "Pending"
          );
          const borrowBtn = document.getElementById("borrow-now");
          const borrowBtnElement = document.querySelector(".book-detail-borrow-now");

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
        })
        .catch((error) => {
          console.error("An error occurred while fetching borrow list:", error);
        });
    })
    .catch((error) => {
      console.error("An error occurred while fetching book list:", error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/pages/admin/book_edit.html") {
    showBookEditDetails()
      .then(() => {
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (window.location.pathname === "/pages/book_details.html") {
    showBookDetails();
    setLoader(false);
  }
});
