let bookList = [];
let userList = [];
let borrowList = [];
let commentList = [];
async function getAllDatas() {
  bookList = await getData("Books");
  userList = await getData("Users");
  borrowList = await getData("Borrows");
  commentList = await getData("Comments");
}

function showData() {
  getAllDatas()
    .then(() => {
      const currentUser = userList.find((user) => user.id === thisUser.id);
      const commentListLength = commentList.filter(
        (comment) => comment.user_id === currentUser.id && comment.isActive
      ).length;
      const borrowListLength =
        borrowList.filter((borrow) => borrow.user_id === currentUser.id).length || 0;
      const bookListLength = bookList.filter((b) => b.isActive).length || 0;
      const favoriteListLength =
        currentUser.favourites?.length > 1 ? currentUser.favourites.length - 1 : 0;
      document.querySelector(".book-count-info").innerHTML = `${bookListLength}`;
      document.querySelector(".comments-count-info").textContent =
        commentListLength;
      document.querySelector(".favourites-count-info").textContent =
        favoriteListLength;
      document.querySelector(".borrow-count-info").textContent = borrowListLength;
      setLoader(false);
    })
    .catch((error) => {
      console.error(error);
    });
}

showData();
function displayBooks(books, bookRack) {
  try {
    for (const book of books) {
      generateBook(book, bookRack);
    }
    toggleFavourites();
    checkForFavourites();
  } catch (error) {
    console.error(error);
  }
}

function showInterestingBook() {
  getAllDatas()
    .then(() => {
      const interestingBookRack = document.querySelector(".intresting-books");

      const interestingBookData = [];
      const filteredBookList = bookList.filter((book) => book.isActive);
      while (interestingBookData.length < 8) {
        const randomIndex = Math.floor(Math.random() * filteredBookList.length);
        const randomBook = filteredBookList[randomIndex];
        if (!interestingBookData.includes(randomBook)) {
          interestingBookData.push(randomBook);
        }
      }
      displayBooks(interestingBookData, interestingBookRack);
    })
    .catch((error) => {
      console.error(error);
    });
}

function showRecommendedBooks() {
  getAllDatas()
    .then(() => {
      const recommendedBooksRack = document.querySelector(".generated-books");
      const recommendedBooksData = [];
      const userFavourites = thisUser.favourites;
      let currentUserBooks = borrowList
        .filter((borrow) => borrow.user_id === thisUser.id)
        .map((borrow) => borrow.book_id);
      userFavourites.slice(1).forEach((fav) => currentUserBooks.push(fav));
      const currentUserBooksSet = new Set(currentUserBooks);
      currentUserBooks = Array.from(currentUserBooksSet);
      const filteredBooks = bookList.filter(
        (book) => !currentUserBooks.includes(book.id) && book.isActive
      );
      while (recommendedBooksData.length < 8) {
        const randomIndex = Math.floor(Math.random() * filteredBooks.length);
        const randomBook = filteredBooks[randomIndex];
        if (!recommendedBooksData.includes(randomBook)) {
          recommendedBooksData.push(randomBook);
        }
      }

      displayBooks(recommendedBooksData, recommendedBooksRack);
    })
    .catch((error) => {
      console.error(error);
    });
}

showRecommendedBooks();
showInterestingBook();
