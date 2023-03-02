
// Get user data and ID from local storage
// const data = getUserData();
// const id = localStorage.getItem("id");
// const userId = data.find(u => u.id == id);

// Calculate the Age using Given Date of Birth

function calculateAge(dob) {
	let today = new Date();
	let birthDate = new Date(dob);
	let ageCalculated = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		ageCalculated--;
	}
	return ageCalculated;
}

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
const indexOfUser = user_data.indexOf(userId);

profDisp.style.background = `url(${userId.profile}) no-repeat center center/cover`;
firstName.value = userId.first_name;
lastName.value = userId.last_name;
displayName.value = userId.name;
dateOfBirth.value = userId.dob;
emailAddress.value = userId.username;
phoneNumber.value = userId.phone_number;
age.value = calculateAge(dateOfBirth.value);

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

profileEditBtn.addEventListener("click", (e) => {
	const profileUrl = prompt("Enter the Profile Image Url");
	if (profileUrl) {
		userId.profile = profileUrl;
		profDisp.style.background = `url(${profileUrl}) no-repeat center center/cover`;
	}
});

cancelBtn.addEventListener("click", (e) => {
	e.preventDefault();
	location.reload();
});

saveBtn.addEventListener("click", (e) => {
	e.preventDefault();
	userId.first_name = firstName.value;
	userId.last_name = lastName.value;
	userId.name = displayName.value;
	userId.dob = dateOfBirth.value;
	userId.age = calculateAge(dateOfBirth.value);
	userId.phone_number = phoneNumber.value;

	if (userId.username !== emailAddress.value) {
		alert("You can't change the Email Address");
		return;
	}

	user_data[indexOfUser] = userId;
	setUserData(user_data);
	location.reload();
});

deleteBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const confirmValue = confirm("Are you sure you want to delete your account?");
	if (confirmValue === true) {
		const promptValue = prompt(`This action cannot be undone. This will permanently delete the ${userId.username} account and remove all details associated with it. Please type your password to confirm.`);
		if (promptValue === userId.password) {
			user_data.splice(indexOfUser, 1);
			setUserData(user_data);
			alert("The journey has come to an end, your account has been deleted.");
			window.location.href = "../../../index.html";
		}
	}
});
