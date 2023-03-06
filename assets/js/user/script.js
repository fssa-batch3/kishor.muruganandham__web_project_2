// Dark Mode
// Get the current value of the "dark-mode" key from local storage
const isDarkMode = localStorage.getItem("dark-mode");

// If the value is "true", set the "dark-mode" class on the <body> element
if (isDarkMode === "true") {
	document.querySelector(":root").classList.add("dark-mode");
}
// Add an event listener to the dark mode toggle button
function darkMode() {
	// If the "dark-mode" class is set on the <body> element
	if (document.querySelector(":root").classList.contains("dark-mode")) {
		// Remove the class and set the "dark-mode" key to "false" in local storage
		document.querySelector(":root").classList.remove("dark-mode");
		document.querySelector(".dark-light").classList.replace("bi-sun-fill", "bi-moon-stars-fill");
		document.querySelector(".da-li-text").innerText = "Dark mode";
		localStorage.setItem("dark-mode", "false");
	} else {
		// Add the class and set the "dark-mode" key to "true" in local storage
		document.querySelector(":root").classList.add("dark-mode");
		document.querySelector(".dark-light").classList.replace("bi-moon-stars-fill", "bi-sun-fill");
		document.querySelector(".da-li-text").innerText = "Light mode";
		localStorage.setItem("dark-mode", "true");
	}
}

let commentList = JSON.parse(localStorage.getItem("comments"));
if (!localStorage.getItem("comments")) {
	commentList = [];
}
let commentLikeList = JSON.parse(localStorage.getItem("comment_likes"));
if (!localStorage.getItem("comment_likes")) {
	commentLikeList = [];
	localStorage.setItem("comment_likes",JSON.stringify(commentLikeList));
}


function generateGuid() {
	let result, i, j;
	result = '';
	for(j=0; j<16; j++) {
		i = Math.floor(Math.random()*16).toString(16);
		result = result + i;
	}
	return result;
}

function activeTab(evt, tabName) {
	// Hide all tab contents
	const tabContents = document.querySelectorAll(".tab-content");
	tabContents.forEach((tabContent) => (tabContent.style.display = "none"));

	// Remove 'active' class from all tab buttons
	const tabButtons = document.querySelectorAll(".tab-btn");
	tabButtons.forEach((tabButton) => tabButton.classList.remove("active"));

	// Show the selected tab content and set the selected tab button as active
	const selectedTabContent = document.getElementById(tabName);
	selectedTabContent.style.display = "block";
	evt.currentTarget.classList.add("active");
}

function getStars(rating) {
	// Round to nearest half
	rating = Math.round(rating * 2) / 2;
	const output = [];

	// Append all the filled whole stars
	for (let i = rating; i >= 1; i--){
		output.push('<i class="bi bi-star-fill" aria-hidden="true" style="color: gold;"></i>&nbsp;');
	}

	// If there is a half a star, append it
	if (i === 0.5){
		output.push('<i class="bi bi-star-half" aria-hidden="true" style="color: gold;"></i>&nbsp;');
	}

	// Fill the empty stars
	for ( i = 5 - rating; i >= 1; i--){
		output.push('<i class="bi bi-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
	}

	return output.join("");
}

function CloseDetailPage() {
	document.querySelector(".book-detail").classList.remove("active");
	document.querySelector(".focus-out").classList.remove("active");
}

book_list = JSON.parse(localStorage.getItem("book_list"));
const id = JSON.parse(localStorage.getItem("id"));
const user_data = getUserData();
const userId = user_data.find((u) => u.id == id);

function generateBook(book, bookRack) {
	if (book.isActive !== true){
		return;
	}
	const bookDiv = document.createElement("div");
	bookDiv.dataset.id = book.id;
	bookDiv.className = "book";
	const thisUser = getUserData().find(e => e.id == JSON.parse(localStorage.getItem("id")));

	const bookCover = document.createElement("a");
	bookCover.className = "book-cover";
	if (thisUser.role == "admin" ) {
		bookCover.href = "../../pages/admin/book_edit.html?id=" + book.id;
	} else{
		bookCover.href = "../../pages/book_details.html?id=" + book.id;

	}
	bookCover.dataset.filterTag = book.tags;

	const bookImage = document.createElement("img");
	bookImage.src = book.image.src;
	bookImage.alt = book.image.alt;
	bookImage.setAttribute("width", "150px");

	const favBtn = document.createElement("span");
	favBtn.className = "fav-btn";

	const favIcon = document.createElement("i");
	favIcon.className = "bi bi-bookmark-heart";

	const bookTitle = document.createElement("div");
	bookTitle.className = "book-title";

	const bookName = document.createElement("h4");
	bookName.innerText = book.title;

	const bookAuthor = document.createElement("p");
	bookAuthor.innerText = book.author;

	bookDiv.append(bookCover, favBtn, bookTitle);
	bookCover.append(bookImage);
	favBtn.append(favIcon);
	bookTitle.append(bookName, bookAuthor);
	bookRack.append(bookDiv);
}

function toggleFavourites() {
	const favButtons = document.querySelectorAll(".fav-btn");

	favButtons.forEach((button) => {
		const bookId = button.parentElement.dataset.id;
		button.addEventListener("click", () => {
			const userFavourites = userId["favourites"];

			if (userFavourites.includes(bookId)) {
				const index = userFavourites.indexOf(bookId);
				userFavourites.splice(index, 1);
			} else {
				userFavourites.push(bookId);
			}
			setUserData(user_data);
			location.reload();
		});
	});
}

function checkForFavourites() {
	const favourites = userId.favourites;
	const favButtons = document.querySelectorAll(".fav-btn");

	favButtons.forEach((button) => {
		const isFavourite = favourites.includes(button.parentElement.dataset.id);

		if (isFavourite) {
			button.classList.add("active");
			button.firstChild.classList.replace("bi-bookmark-heart", "bi-bookmark-heart-fill");
		} else {
			button.classList.remove("active");
			button.firstChild.classList.replace("bi-bookmark-heart-fill", "bi-bookmark-heart");
		}
	});
}

function getUserData() {
	const userJson = localStorage.getItem("user_data");
	return userJson === null || userJson === undefined ? [] : JSON.parse(userJson);
}

function removeUserData() {
	localStorage.removeItem("user_data");
}

function setUserData(data) {
	localStorage.setItem("user_data", JSON.stringify(data));
}


