const popularBookData = popular_book_list;
const interestingBookData = interesting_book_list;

async function showData() {
  try {
    let borrowList = await getData("Borrows");
    const commentList = await getData("Comments");
    const bookList = await getData("Books");
    const commentListLength = commentList.filter(comment => comment.user_id === thisUser.id && comment.isActive).length || 0;
    const borrowListLength = borrowList.filter(borrow => borrow.user_id === thisUser.id).length || 0;
    const bookListLength = bookList?.length ? bookList.length : 0;
    const favoriteListLength = thisUser.favourites?.length > 1 ? thisUser.favourites.length - 1 : 0;
    document.querySelector(".book-count-info").innerHTML = `${bookListLength}`;
    document.querySelector(".comments-count-info").textContent = commentListLength;
    document.querySelector(".favourites-count-info").textContent = favoriteListLength;
    document.querySelector(".borrow-count-info").textContent = borrowListLength;
    setLoader(false);
  } catch (error) {
    console.error(error);
  }
}

async function displayBooks(books, bookRack) {
  try {
    for (const book of books) {
      generateBook(book, bookRack);
    }
  } catch (error) {
    console.error(error);
  }
}

const popularBookRack = document.querySelector(".generated-books");
await displayBooks(popularBookData, popularBookRack);
const interestingBookRack = document.querySelector(".interesting-books");
await displayBooks(interestingBookData, interestingBookRack);

toggleFavorites();
checkForFavorites();
