
let borrow_list = JSON.parse(localStorage.getItem("borrow-list"));
const tagSettings = JSON.parse(localStorage.getItem("settings"));
const popularBookData = popular_book_list;
const intrestingBookData = intresting_book_list;

async function showData(){
  const bookList = await getData("book");
  const borrowListLength = borrow_list?.length ? borrow_list.length : 0; 
  const bookListLength = bookList?.length ? bookList.length : 0; 
  
  document.querySelector(".avail-books").innerHTML = `${bookListLength}`;
  document.querySelector(".fav-books").innerHTML = `${thisUser.favourites.length}`;
  document.querySelector(".card-text p").innerHTML = `Our Goal : ${tagSettings["books"]["avail_books"]}`;
  document.querySelector(".chart").dataset.percent = `${bookListLength}`;
  document.querySelector(".fav-chart").dataset.percent = `${thisUser.favourites.length}`;
  document.querySelector(".borrowed-books").innerHTML = `${borrowListLength}`;
  document.querySelector(".borrow-chart").dataset.percent = `${borrowListLength}`;
}
showData();
const elements = document.querySelectorAll(".chart");
elements.forEach(element => {
   EasyPieChart(element, {
    size: 120,
    lineWidth: 13,
    barColor: "#ffffff",
    trackColor: "#ffffff55",
    scaleColor: "transparent",
  });
});


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


