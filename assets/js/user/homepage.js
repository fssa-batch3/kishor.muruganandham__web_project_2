
// use const instead of let when declaring variables that don't change

let borrow_list = JSON.parse(localStorage.getItem("borrow-list"));
const tagSettings = JSON.parse(localStorage.getItem("settings"));

// use const for values that don't change
const popularBookData = popular_book_list;
const intrestingBookData = intresting_book_list;

// use template literals to interpolate variables in strings
document.querySelector(".avail-books").innerHTML = `${book_list.length}`;
document.querySelector(".fav-books").innerHTML = `${userId.favourites.length}`;
document.querySelector(".card-text p").innerHTML = `Our Goal : ${tagSettings["books"]["avail_books"]}`;

// use dataset property to store data attributes in HTML
document.querySelector(".chart").dataset.percent = `${book_list.length}`;
document.querySelector(".fav-chart").dataset.percent = `${userId.favourites.length}`;

document.querySelector(".borrowed-books").innerHTML = `${borrow_list.length}`;
document.querySelector(".borrow-chart").dataset.percent = `${borrow_list.length}`;

// use querySelectorAll instead of getElementsByClassName to return a NodeList instead of an HTMLCollection
const elements = document.querySelectorAll(".chart");
elements.forEach((element) => {
  // use arrow function syntax for callbacks
  new EasyPieChart(element, {
    size: 120,
    lineWidth: 13,
    barColor: "#ffffff",
    trackColor: "#ffffff55",
    scaleColor: "transparent",
    
  });
});

// extract common code into a function and reuse it
function displayBooks(books, bookRack) {
  for (const book of books) {
    generateBook(book, bookRack);
  }
}

// Display popular and interesting books
const popularBookRack = document.querySelector(".generated-books");
displayBooks(popularBookData, popularBookRack);

const interestingBookRack = document.querySelector(".intresting-books");
displayBooks(intrestingBookData, interestingBookRack);

toggleFavourites();
checkForFavourites();


