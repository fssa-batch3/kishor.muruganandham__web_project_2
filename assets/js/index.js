
const bookList = JSON.parse(localStorage.getItem("book_list"));
if (!bookList) {
  localStorage.setItem("book_list", JSON.stringify(book_list));
};

if (localStorage.getItem("id")) {
  window.location.href = "./pages/user/homepage.html";
};

const settingsObject = {
	"tags":["Fantasy","Education","Drama","Sci-fi"], 
	"books":
	{"avail_books":200,
	"max_borrow": 50,
	"max_fav":30
	}
}

localStorage.setItem("settings",JSON.stringify(settingsObject));

// Get form inputs and form element
const signinForm = document.getElementById("sign-in");
const usernameLogin = document.getElementById("username-sign-in");
const passwordLogin = document.querySelector(".password");
const loginRole = document.getElementById("role-sign-in");

// Listen to form submit event
signinForm.addEventListener("submit", function (e) {
	// Prevent default form submission
	e.preventDefault();
	
	// Get user data from local storage
	const userData = getUserData();
	
	// Check if user credentials match data in local storage
	const matchedUser = userData.find(user => 
		user.username === usernameLogin.value && 
		user.password === passwordLogin.value && 
		user.role === loginRole.value
	);
	
	// If there's a match, set user id in local storage and redirect
	if (matchedUser) {
		localStorage.setItem("id", JSON.stringify(matchedUser.id));
		const redirectUrl = (loginRole.value === "admin") ? "./pages/admin/admin_create-book.html" : "./pages/user/homepage.html";
		window.location.href = redirectUrl;
	} else {
		// Otherwise, show an alert with error message
		alert("Oops! Log In failed. Please try again.");
	}
});


function registerUser() {
	
	const firstName = document.getElementById("firstname-sign-up");
	const lastName = document.getElementById("lastname-sign-up");
	const dob = document.getElementById("DOB-sign-up");
	const emailAdd = document.getElementById("email-sign-up");
	const pass = document.getElementById("password-sign-up");
	const role = document.getElementById("role-sign-up");

	if (firstName.value === "" || lastName.value === "" || dob.value === "" || emailAdd.value === "" || pass.value === "" || role.value === "") {
		return alert("All fields should be filled");
	}

	let user_data = getUserData() || [];
	if (user_data.find(user => user.username === emailAdd.value)) {
		alert("Email address already exists");
		return;
	}

	const newUser = {
		id: generateGuid(),
		first_name: firstName.value,
		last_name: lastName.value,
		name: `${firstName.value} ${lastName.value}`,
		role: role.value,
		dob: dob.value,
		phone_number: null,
		address: null,
		age: null,
		username: emailAdd.value,
		password: pass.value,
		profile: `https://ui-avatars.com/api/?name=${firstName.value}${lastName.value}&rounded=true&uppercase=false&background=random`,
		favourites: [],
	};

	user_data.push(newUser);
	localStorage.setItem("user_data", JSON.stringify(user_data));
	location.reload();
}
