window.onload = localStorage.setItem("book_list", JSON.stringify(book_list));

if (localStorage.getItem("isSignedIn") == "true") {
	window.location.href = "./../../pages/user/homepage.html";
}

const usernameLogin = document.getElementById("username-sign-in");
const passwordLogin = document.querySelector(".password");
const loginRole = document.getElementById("role-sign-in");
const signinForm = document.getElementById("sign-in");

signinForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const data = getUserData();
	let isMatch = false;
	for (let i of data) {
		if (
			passwordLogin.value == i.password &&
			usernameLogin.value == i.username &&
			loginRole.value == i.role
		) {
			isMatch = true;
			localStorage.setItem("id", i.id);
			break;
		}
	}
	if (isMatch === true) {
		localStorage.setItem("isSignedIn", "true");
		if (loginRole.value == "admin") {
			window.location.href = "./../../pages/admin/admin_create-book.html";
		} else {
			window.location.href = "./../../pages/user/homepage.html";
		}
	} else {
		alert("Oops! Log In failed Try Again");
	}
});

function registerUser() {
	let user_data = getUserData();
	event.preventDefault();

	const firstName = document.getElementById("firstname-sign-up");
	const lastName = document.getElementById("lastname-sign-up");
	const dob = document.getElementById("DOB-sign-up");
	const emailAdd = document.getElementById("email-sign-up");
	const pass = document.getElementById("password-sign-up");
	const role = document.getElementById("role-sign-up");
	const data = user_data;
	let dataLength;
	if (user_data === null || user_data === undefined) {
		dataLength = "0";
	} else {
		dataLength = user_data.length;
	}

	if (
		firstName.value == "" ||
		lastName.value == "" ||
		dob.value == "" ||
		emailAdd.value == "" ||
		pass.value == "" ||
		role.value == ""
	) {
		return alert("All field should be filled");
	}
	if (data != undefined || data != null) {
		for (const user of data) {
			if (user["username"] == emailAdd.value) {
				alert("Email address already Exsits");
				location.reload();
				return;
			}
		}
	}
	let newUser = new Object();
	newUser.id = dataLength + 1;
	newUser.first_name = firstName.value;
	newUser.last_name = lastName.value;
	newUser.name = firstName.value + " " + lastName.value;
	newUser.role = role.value;
	newUser.dob = dob.value;
	newUser.phone_number = null;
	newUser.address = null;
	newUser.age = null;
	newUser.username = emailAdd.value;
	newUser.password = pass.value;
	newUser.profile = `https://ui-avatars.com/api/?name=${firstName.value + lastName.value}&rounded=true&uppercase=false&background=random`;
	newUser.favourites = [];
	newUser.borrow_history = [];
	user_data.push(newUser);
	// user_data = []
	localStorage.removeItem("user_data");
	const user_json = JSON.stringify(user_data);
	localStorage.setItem("user_data", user_json);
	location.reload();
}
