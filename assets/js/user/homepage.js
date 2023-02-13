function getUserData() {
	const userJson = localStorage.getItem("user_data");
	const user_data = JSON.parse(userJson);

	return user_data;
}
function removeUserData() {
	localStorage.removeItem("user_data");
}

function setUserData() {
	const userJson = JSON.stringify(user_data);
	localStorage.setItem("user_data", userJson);
}

const user_data = JSON.parse(localStorage.getItem("user_data"));
const data = user_data;
let id = localStorage.getItem("id");
let userId = data.find((u) => u.id == id);

const popularBookData = popular_book_list;

for (const book of popularBookData) {
	const bookRack = document.querySelector(".generated-books");

	generateBook(book, bookRack, popularBookData);
}

const intrestingBookData = intresting_book_list;
for (const book of intrestingBookData) {
	const bookRack = document.querySelector(".intresting-books");

	generateBook(book, bookRack, intrestingBookData);
}

toggleFavourites();

checkForFavourites();

let favBooks = userId.favourites;
document.querySelector(".avail-books").innerHTML += book_list.length;
document.querySelector(".fav-books").innerHTML = favBooks.length;
document
	.querySelector(".chart")
	.setAttribute("data-percent", `${book_list.length}`);
document
	.querySelector(".fav-chart")
	.setAttribute("data-percent", `${favBooks.length}`);
document.querySelector(".borrowed-books").innerHTML =
	userId["borrow_history"].length;
document
	.querySelector(".borrow-chart")
	.setAttribute("data-percent", `${userId["borrow_history"].length}`);

let element = document.querySelectorAll(".chart");
for (const i of element) {
	new EasyPieChart(i, {
		size: 120,
		lineWidth: 13,
		barColor: "#ffffff",
		trackColor: "#ffffff55",
		scaleColor: "transparent",
	});
}

getBookDetails();

