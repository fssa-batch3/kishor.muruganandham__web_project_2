window.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.keyCode == 191) {
		document.getElementById("head-search").focus();
	}
});

const sideTogg = document.querySelector(".side-toggle");
const menuLine = document.querySelectorAll(".menu-line");

sideTogg.addEventListener("click", () => {
	document.querySelector(".sidebar").classList.toggle("active");

	for (const i of menuLine) {
		i.classList.toggle("active");
	}
});

function dispName() {
	const id = localStorage.getItem("id");
	const data = getUserData();
	let userId = data.find((u) => u.id == id);

	const nameDisp = document.querySelector(".header-username");
	const profDisp = document.querySelector(".profile-field");
	profDisp.addEventListener("mouseover", () => {
		profDisp.nextElementSibling.style.display = "inline-block";
	});
	profDisp.addEventListener("mouseout", () => {
		profDisp.nextElementSibling.style.display = "none";
	});

	nameDisp.innerHTML += " " + userId.name;
	profDisp.style.background = `url(${userId["profile"]}) no-repeat center center/cover`;
}

dispName();

// <div class="search-item">
// <img class="search-item-img" src="https://eloquentjavascript.net/img/cover.jpg" alt="" width="70px">
// <p class="search-item-title">Eloquent JavaScript, Third Edition</p>
// <i class="bi bi-caret-right-fill"></i>
// </div>
// book_list = JSON.parse(localStorage.getItem("book_list"));

const searchResult = document.querySelector(".search-result");
if (searchResult == null || searchResult == undefined) {
} else {
	for (const book of book_list) {
		const searchItem = document.createElement("div");
		searchItem.setAttribute("class", "search-item");
		searchItem.setAttribute("data-id", book["isbn"]);
		searchResult.append(searchItem);

		const searchImg = document.createElement("img");
		searchImg.setAttribute("class", "search-item-img");
		searchImg.setAttribute("src", book["image"]["src"]);
		searchImg.setAttribute("alt", book["image"]["alt"]);
		searchImg.setAttribute("width", "70px");
		searchItem.append(searchImg);

		const searchTitle = document.createElement("p");
		searchTitle.setAttribute("class", "search-item-title");
		searchTitle.innerText = book["title"];
		searchItem.append(searchTitle);

		const searchArrow = document.createElement("i");
		searchArrow.setAttribute("class", "bi bi-caret-right-fill");
		searchItem.append(searchArrow);
	}
	document.querySelector(".search-list-show").addEventListener("focus", function () {
		document.querySelector(".search-list").classList.add("active");
		document.querySelector(".focus-out").classList.add("active");
	});
	document.querySelector(".focus-out").addEventListener("click", function () {
		document.querySelector(".search-list").classList.remove("active");
		document.querySelector(".focus-out").classList.remove("active");
		document.querySelector(".book-detail").classList.remove("active");
	});

	const searchItems = document.getElementsByClassName("search-item");

	for (const searchItem of searchItems) {
		searchItem.addEventListener("click", function () {
			let dataId = searchItem.dataset.id;
			let bookId = book_list.find((book) => book.isbn == dataId);

			document.querySelector(".book-detail").classList.add("active");

			const bookDes = document.querySelector(".book-description");
			const bookAuthor = document.querySelector(".book-content p");
			const bookTitle = document.querySelector(".book-content h4");
			const bookImage = document.querySelector(".book-image img");
			const StarRating = document.getElementById("stars");
			const borrowBtn = document.getElementById("borrow-now");

			bookDes.innerHTML = bookId.description;
			bookAuthor.innerHTML = bookId.author;
			bookTitle.innerHTML = bookId.title;
			bookImage.setAttribute("src", bookId["image"]["src"]);
			bookImage.setAttribute("alt", bookId["image"]["alt"]);
			StarRating.innerHTML = getStars(bookId.star_rating);
			if (bookId.isBorrowable === false) {
				borrowBtn.innerText = "Currently Not Available";
				borrowBtn.disabled = true;
			} else if (bookId.isBorrowable === true) {
				borrowBtn.dataset.bookDetail = bookId["isbn"];
				borrowBtn.disabled = false;
				borrowBtn.innerText = "Borrow Now";
			}

			document.querySelector(".search-list").classList.remove("active");
		});
	}

	const searchInput = document.getElementById("head-search");
	searchInput.addEventListener("input", function () {
		const searchValue = searchInput.value.toLowerCase();
		let Books = document.getElementsByClassName("search-item");

		for (let i of Books) {
			let book = i.innerText.toLowerCase();

			if (!book.includes(searchValue)) {
				i.style.display = "none";
			} else if (book.includes(searchValue)) {
				i.style.display = "flex";
			}
		}
	});
}

borrowModal();
