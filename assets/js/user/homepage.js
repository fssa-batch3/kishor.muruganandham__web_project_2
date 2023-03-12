
let borrow_list = JSON.parse(localStorage.getItem("borrow-list"));
const tagSettings = JSON.parse(localStorage.getItem("settings"));

const popularBookData = popular_book_list;
const intrestingBookData = intresting_book_list;

document.querySelector(".avail-books").innerHTML = `${book_list.length}`;
document.querySelector(".fav-books").innerHTML = `${userId.favourites.length}`;
document.querySelector(".card-text p").innerHTML = `Our Goal : ${tagSettings["books"]["avail_books"]}`;

document.querySelector(".chart").dataset.percent = `${book_list.length}`;
document.querySelector(".fav-chart").dataset.percent = `${userId.favourites.length}`;

document.querySelector(".borrowed-books").innerHTML = `${borrow_list.length}`;
document.querySelector(".borrow-chart").dataset.percent = `${borrow_list.length}`;

const elements = document.querySelectorAll(".chart");
elements.forEach((element) => {
  new EasyPieChart(element, {
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


