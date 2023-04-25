
const popularBookData = popular_book_list;
const intrestingBookData = intresting_book_list;

async function showData(){
  let borrowList = await getData("Borrows");
  const commentList = await getData("Comments");
  const bookList = await getData("Books");
  const commentListLength = commentList.filter(comment => comment.user_id === thisUser.id && comment.isActive).length
  const borrowListLength = borrowList.filter(borrow => borrow.user_id === thisUser.id).length || 0;
  const bookListLength = bookList?.length ? bookList.length : 0;
  const favoriteListLength = thisUser.favourites?.length > 1 ? thisUser.favourites.length -1 : 0; 
  document.querySelector(".book-count-info").innerHTML = `${bookListLength}`;
  document.querySelector(".comments-count-info").textContent = commentListLength ;
  document.querySelector(".favourites-count-info").textContent = favoriteListLength;
  document.querySelector(".borrow-count-info").textContent = borrowListLength;
}



showData();


function displayBooks(books, bookRack) {
  for (const book of books) {
    generateBook(book, bookRack);
  }
}

const popularBookRack = document.querySelector(".generated-books");
displayBooks(popularBookData, popularBookRack);

const interestingBookRack = document.querySelector(".intresting-books");
displayBooks(intrestingBookData, interestingBookRack);

toggleFavourites();
checkForFavourites();


