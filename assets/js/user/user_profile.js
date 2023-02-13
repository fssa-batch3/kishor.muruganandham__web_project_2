const id = localStorage.getItem("id");
const data = getUserData();
let userId = data.find((u) => u.id == id);
const profDisp = document.querySelector(".user-image");
const udInput = document.querySelectorAll(".ud-input");
const firstName = document.getElementById("ud-first-name");
const lastName = document.getElementById("ud-last-name");
const displayName = document.getElementById("ud-display-name");
const dateOfBirth = document.getElementById("ud-dob");
const phoneNumber = document.getElementById("ud-phone-number");
const emailAddress = document.getElementById("ud-email");
const editBtn = document.querySelector(".user-detail-edit");
const deleteBtn = document.querySelector(".user-detail-delete");
const cancelBtn = document.getElementsByClassName("user-detail-cancel")[0];
const saveBtn = document.getElementsByClassName("user-detail-save")[0];
const age = document.getElementById("ud-age");
const profileEditBtn = document.querySelector(".user-image .bi-pencil-fill");

profDisp.style.background = `url(${userId["profile"]}) no-repeat center center/cover`;
firstName.value = userId["first_name"];
lastName.value = userId["last_name"];
displayName.value = userId["name"];
dateOfBirth.value = userId["dob"];
emailAddress.value = userId["username"];
phoneNumber.value = userId["phone_number"];

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

const calculatedAge = calculateAge(dateOfBirth.value)
age.value = calculatedAge

editBtn.addEventListener("click", function (e) {
	e.preventDefault();
	for (const i of udInput) {
		i.removeAttribute("disabled");
	}
	editBtn.style.display = "none";
	deleteBtn.style.display = "none";
	cancelBtn.style.display = "block";
	saveBtn.style.display = "block";
	profileEditBtn.style.display = "block";
});
profileEditBtn.addEventListener("click", function (e){
	let profileUrl = prompt("Enter the Profile Image Url")
	if (profileUrl == "") {
		profileUrl = userId["profile"]
	}
	userId["profile"] = profileUrl;
	profDisp.style.background = `url(${profileUrl}) no-repeat center center/cover`;
})
cancelBtn.addEventListener("click", function (e) {
	e.preventDefault();
	location.reload();
});
saveBtn.addEventListener("click", function (e) {
	e.preventDefault();
	userId["first_name"] = firstName.value;
	userId["last_name"] = lastName.value;
	userId["name"] = displayName.value;
	userId["dob"] = dateOfBirth.value;
	userId["age"] = calculatedAge;
	userId["phone_number"] = phoneNumber.value;
	if (userId["username"] == emailAddress.value) {
		const indexOfUser = data.indexOf(userId);
		data[indexOfUser] = userId;
		setUserData(data);
		location.reload();
	} else{
		alert("You can't change the Email Address")
		location.reload();
	}

});
deleteBtn.addEventListener("click", function (e) {
	e.preventDefault();
	const confirmValue = confirm("Are you sure you want to delete your account.")
	if (confirmValue === true) {
		const promptValue = prompt(
			`This action cannot be undone. This will permanently delete the ${userId["username"]} account and remove all details associated with it.So Please type your password to confirm.`)
		if (promptValue == userId["password"] ) {
			const indexOfUser = data.indexOf(userId);
			// data.splice(indexOfUser, 1);
			// setUserData(data);
			console.log(indexOfUser);
			alert("The journey has come to an end, your account has been deleted.")
			// location.reload();

		}
	}
	// data[indexOfUser] = userId;
	// data.splice(indexOfUser, 1);
	// data.push(userId);
	// setUserData(data);
	// location.reload();
});


