// Dark Mode
// Get the current value of the "dark-mode" key from local storage
let isDarkMode = localStorage.getItem("dark-mode");

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

function activeTab(evt, tabName) {
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tab-content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tab-btn");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

function passVisible(inpid, toggler) {
	const passVisible = document.querySelector(toggler);
	const passKey = document.getElementById(inpid);

	if (passVisible.classList.contains("bi-eye-fill")) {
		passVisible.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
		passKey.setAttribute("type", "text");
	} else {
		passVisible.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
		passKey.setAttribute("type", "password");
	}
}

function userNameValidation(userName, userNameError) {
	const usernameLogin = document.getElementById(userName);
	const userNameValue = usernameLogin.value.replace(/\s/g, "");
	const emailErr = document.querySelector(userNameError);

	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (userNameValue.match(mailformat)) {
		emailErr.style.display = "none";
	} else if (!userNameValue.match(mailformat) && usernameLogin == "") {
		usernameLogin.classList.add("invalid");
		emailErr.style.display = "inline-block";
	}
	if (userNameValue.match(mailformat)) {
		usernameLogin.classList.remove("invalid");
		usernameLogin.classList.add("valid");
	} else {
		usernameLogin.classList.remove("valid");
	}
}

function confirmPassValidation(srcid, error, checkid) {
	const errors = document.querySelector(error);
	const confPass = document.getElementById(srcid);
	const confPassValue = confPass.value.replace(/\s/g, "");
	const passKey = document.getElementById(checkid);
	const passKeyValue = passKey.value.replace(/\s/g, "");

	if (confPassValue == "") {
		errors.innerHTML = "Confirm Password cannot be empty";
		errors.style.display = "inline-block";
		confPass.classList.add("invalid");
	} else if (confPassValue != passKeyValue) {
		errors.innerHTML = "Seems like your password doesn't match.";
		errors.style.display = "inline-block";
		confPass.classList.add("invalid");
	} else {
		errors.style.display = "none";
		confPass.classList.remove("invalid");
		confPass.classList.add("valid");
	}
}

function passValidation(elemenid, errormsg) {
	const errors = document.querySelector(errormsg);
	const passKey = document.getElementById(elemenid);
	const passKeyValue = passKey.value.replace(/\s/g, "");

	if (passKeyValue == "") {
		errors.innerHTML = "Password cannot be empty";
		errors.style.display = "inline-block";
		passKey.classList.add("invalid");
	}
	if (
		passKeyValue.length < 8 ||
		passKeyValue.search(/[a-z]/i) < 0 ||
		passKeyValue.search(/[0-9]/) < 0
	) {
		errors.innerHTML =
			"Your password must be at least 8 characters <br> Your password must contain at least one letter. <br> Your password must contain at least one digit.<br>";
		errors.style.display = "inline-block";
		passKey.classList.add("invalid");
	}
	if (
		passKeyValue.length > 8 ||
		passKeyValue.search(/[a-z]/i) > 0 ||
		passKeyValue.search(/[0-9]/) > 0
	) {
		errors.style.display = "none";
		passKey.classList.remove("invalid");
		passKey.classList.add("valid");
	}
}

function getStars(rating) {
	// Round to nearest half
	rating = Math.round(rating * 2) / 2;
	let output = [];

	// Append all the filled whole stars
	for (var i = rating; i >= 1; i--)
		output.push('<i class="bi bi-star-fill" aria-hidden="true" style="color: gold;"></i>&nbsp;');

	// If there is a half a star, append it
	if (i == 0.5)
		output.push('<i class="bi bi-star-half" aria-hidden="true" style="color: gold;"></i>&nbsp;');

	// Fill the empty stars
	for (let i = 5 - rating; i >= 1; i--)
		output.push('<i class="bi bi-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

	return output.join("");
}

function CloseDetailPage() {
	document.querySelector(".book-detail").classList.remove("active");
	document.querySelector(".focus-out").classList.remove("active");
}

// Function to generate Books
// (book)defines which books to be shown
// (bookRack)defines where books to be shown

// Function to Get ID of the Current Book

book_list = JSON.parse(localStorage.getItem("book_list"));

function generateBook(book, bookRack) {
	const bookDiv = document.createElement("div");
	bookDiv.setAttribute("data-id", book["isbn"]);
	bookDiv.setAttribute("class", "book");

	const bookCover = document.createElement("div");
	bookCover.setAttribute("class", "book-cover");
	bookCover.setAttribute("data-filter-tag", book["tags"]);

	const bookImage = document.createElement("img");
	bookImage.setAttribute("src", book["image"]["src"]);
	bookImage.setAttribute("alt", book["image"]["alt"]);
	bookImage.setAttribute("width", "150px");

	const favBtn = document.createElement("span");
	favBtn.setAttribute("class", "fav-btn");

	const favIcon = document.createElement("i");
	favIcon.setAttribute("class", "bi bi-bookmark-heart");

	const bookTitle = document.createElement("div");
	bookTitle.setAttribute("class", "book-title");

	const bookName = document.createElement("h4");
	bookName.innerText = book["title"];

	const bookAuthor = document.createElement("p");
	bookAuthor.innerText = book["author"];

	bookRack.append(bookDiv);
	bookDiv.append(bookCover);
	bookCover.append(bookImage);
	bookDiv.append(favBtn);
	favBtn.append(favIcon);
	bookDiv.append(bookTitle);
	bookTitle.append(bookName);
	bookTitle.append(bookAuthor);
}

function toggleFavourites() {
	const favButton = document.querySelectorAll(".fav-btn");

	for (const i of favButton) {
		const thisBook = i.parentElement.dataset.id;
		const favBook = userId["favourites"];
		i.addEventListener("click", () => {
			if (favBook.length != 0) {
				for (let f of favBook) {
					if (thisBook.includes(f)) {
						const removeBook = favBook.findIndex((removeBook) => removeBook == thisBook);
						favBook.splice(removeBook, 1);
						getUserData();
						removeUserData();
						setUserData(user_data);
						checkForFavourites();
						location.reload();
						return;
					}
				}
				favBook.push(thisBook);
			} else {
				favBook.push(thisBook);
			}
			getUserData();
			removeUserData();
			setUserData(user_data);
			location.reload();
		});
	}
}

function checkForFavourites() {
	let Books = document.querySelectorAll(".fav-btn");
	let userInfo = userId["favourites"];
	for (let i of Books) {
		if (userInfo.includes(i.parentElement.dataset.id)) {
			i.classList.add("active");
			i.firstChild.classList.replace("bi-bookmark-heart", "bi-bookmark-heart-fill");
		}
		if (!userInfo.includes(i.parentElement.dataset.id)) {
			i.classList.remove("active");
			i.firstChild.classList.replace("bi-bookmark-heart-fill", "bi-bookmark-heart");
		}
	}
}

// Function for Searching Books in Search Bar
function SearchBooks() {
	let searchValue = document.getElementById("head-search");
	searchValue = searchValue.value.toLowerCase();

	let Books = document.querySelectorAll(".book");

	for (let i of Books) {
		let book = i.innerHTML.toLowerCase();

		if (!book.includes(searchValue)) {
			i.style.display = "none";
		} else if (book.includes(searchValue)) {
			i.style.display = "block";
		}
	}
}

function getUserData() {
	const userJson = localStorage.getItem("user_data");

	if (userJson == undefined || userJson == null) {
		const data = [];
		data_json = JSON.stringify(data);
		localStorage.setItem("user_data", data_json);
		localJson = localStorage.getItem("user_data");
		const user_data = JSON.parse(localJson);
		return user_data;
	} else {
		const user_data = JSON.parse(userJson);
		return user_data;
	}
}

function removeUserData() {
	localStorage.removeItem("user_data");
}

function setUserData(data) {
	const userJson = JSON.stringify(data);
	localStorage.setItem("user_data", userJson);
}

function getBookDetails() {
	let bookCovers = document.getElementsByClassName("book-cover");
	for (let bookCover of bookCovers) {
		bookCover.addEventListener("click", () => {
			let dataId = bookCover.parentElement.dataset.id;
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
		});
	}
}

// Event Listener for Borrow Modal Box
function borrowModal() {
	const modalCloseBtn = document.querySelector(".modal-close");
	const borrowBtn = document.getElementById("borrow-now");

	modalCloseBtn.addEventListener("click", () => {
		document.querySelector(".backdrop").classList.remove("active");
		document.querySelector(".modal").classList.remove("active");
	});
	borrowBtn.addEventListener("click", () => {
		let bookId = borrowBtn.dataset.bookDetail;
		let book_list = JSON.parse(localStorage.getItem("book_list"));
		const borrowDate = document.getElementById("borrow-date");
		const dueDate = document.getElementById("due-date");
		const borrowNow = document.querySelector(".modal-submit");
		const reqBook = book_list.find((b) => b.isbn == bookId);
		let borrowList = JSON.parse(localStorage.getItem("borrow-list"));
		let borrowListLength;
		if (borrowList == null || borrowList == undefined) {
			borrowList = []
			localStorage.setItem("borrow-list", JSON.stringify(borrowList));
			borrowList = JSON.parse(localStorage.getItem("borrow-list"));
			borrowListLength = 0
			console.log(borrowList);
		} else{
			borrowListLength = borrowList.length
			console.log("f");
		}
	
		console.log(borrowList);
		document.querySelector(".backdrop").classList.add("active");
		document.querySelector(".modal").classList.add("active");
		document.getElementById("book-title").value = reqBook.title;

		borrowNow.addEventListener("click", () => {
			if (borrowDate.value != null && dueDate.value != null) {
				let bookExists = false;
				for (const i of userId["borrow_history"]) {
					if (i["book_id"] == bookId) {
						bookExists = true;
						break;
					}
				}
				if (bookExists === true) {
					alert("Book Already Exists");
				} else {
					// data.splice(indexOfUser, 1);
					const borrow_obj = new Object();
					borrow_obj.id = userId["borrow_history"].length + 1;
					borrow_obj.issue_date = new Date();
					borrow_obj.borrow_date = borrowDate.value;
					borrow_obj.due_date = dueDate.value;
					borrow_obj.return_date = "-";
					borrow_obj.status = "Pending";
					borrow_obj.book_id = bookId;
					borrow_obj.user_id = userId["id"];
					borrow_obj.borrow_id = borrowListLength + 1;
					userId["borrow_history"].push(borrow_obj);
					borrowList.push(borrow_obj);
					localStorage.removeItem("borrow-list");
					const indexOfUser = data.indexOf(userId);
					data[indexOfUser] = userId
					// borrowList = [];
					// userId["borrow_history"] = [];
					// data.push(userId);
					localStorage.setItem("borrow-list", JSON.stringify(borrowList));
					setUserData(data);
					location.reload();
				}
			} else {
				alert("Both Dates are Required");
			}
		});
	});
}

