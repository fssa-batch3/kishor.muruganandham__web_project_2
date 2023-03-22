
// Get user detail elements and display user data
const profDisp = document.querySelector(".user-image");
const udInput = document.querySelectorAll(".ud-input");
const firstName = document.getElementById("ud-first-name");
const lastName = document.getElementById("ud-last-name");
const displayName = document.getElementById("ud-display-name");
const dateOfBirth = document.getElementById("ud-dob");
const phoneNumber = document.getElementById("ud-phone-number");
const emailAddress = document.getElementById("ud-email");
const age = document.getElementById("ud-age");
const profileEditBtn = document.querySelector(".user-image .bi-pencil-fill");
const indexOfUser = user_data.indexOf(thisUser);

profDisp.style.background = `url(${thisUser.profile}) no-repeat center center/cover`;
firstName.value = thisUser.first_name;
lastName.value = thisUser.last_name;
displayName.value = thisUser.name;
dateOfBirth.value = thisUser.dob;
emailAddress.value = thisUser.username;
phoneNumber.value = thisUser.phone_number;
age.value = moment().diff(dateOfBirth.value, "years");


// Add event listeners to edit, save, cancel, and delete buttons
const editBtn = document.querySelector(".user-detail-edit");
const deleteBtn = document.querySelector(".user-detail-delete");
const cancelBtn = document.querySelector(".user-detail-cancel");
const saveBtn = document.querySelector(".user-detail-save");

editBtn.addEventListener("click", (e) => {
	e.preventDefault();
	udInput.forEach(i => i.removeAttribute("disabled"));
	editBtn.style.display = "none";
	deleteBtn.style.display = "none";
	cancelBtn.style.display = "block";
	saveBtn.style.display = "block";
	profileEditBtn.style.display = "block";
});

profileEditBtn.addEventListener("click", () => {
	const profileUrl = prompt("Enter the Profile Image Url");
	if (profileUrl) {
		thisUser.profile = profileUrl;
		profDisp.style.background = `url(${profileUrl}) no-repeat center center/cover`;
	}
});

cancelBtn.addEventListener("click", (e) => {
	e.preventDefault();
	location.reload();
});

saveBtn.addEventListener("click", (e) => {
	e.preventDefault();
	thisUser.first_name = firstName.value;
	thisUser.last_name = lastName.value;
	thisUser.name = displayName.value;
	thisUser.dob = dateOfBirth.value;
	thisUser.age = moment().diff(dateOfBirth.value, "years");
	thisUser.phone_number = phoneNumber.value;

	if (thisUser.username !== emailAddress.value) {
		alert("You can't change the Email Address");
		return;
	}

	user_data[indexOfUser] = thisUser;
	setUserData(user_data);
	location.reload();
});

deleteBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const confirmValue = confirm("Are you sure you want to delete your account?");
	if (confirmValue === true) {
		const promptValue = prompt(`This action cannot be undone. This will permanently delete the ${thisUser.username} account and remove all details associated with it. Please type your password to confirm.`);
		if (promptValue === thisUser.password) {
			user_data.splice(indexOfUser, 1);
			setUserData(user_data);
			alert("The journey has come to an end, your account has been deleted.");
			window.location.href = "../../../index.html";
		}
	}
});
