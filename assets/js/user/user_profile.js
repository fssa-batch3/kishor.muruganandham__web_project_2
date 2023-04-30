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
const datePicker = document.querySelector('.datePicker');
const minDate = moment().subtract(100, 'year').format('YYYY-MM-DD');
const maxDate = moment().subtract(10, 'year').format('YYYY-MM-DD');
datePicker.setAttribute('min', minDate);
datePicker.setAttribute('max', maxDate);

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
const saveForm = document.querySelector(".user-detail-form");

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  udInput.forEach((i) => i.removeAttribute("disabled"));
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

saveForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  thisUser.first_name = firstName.value;
  thisUser.last_name = lastName.value;
  thisUser.name = displayName.value;
  thisUser.dob = dateOfBirth.value;
  thisUser.age = moment().diff(dateOfBirth.value, "years");
  thisUser.phone_number = phoneNumber.value;
  const phoneNumberPattern = /^[6789]\d{9}$/;

  if (phoneNumber.value !== "" && phoneNumberPattern.test(phoneNumber.value) === false) {
    alert("Invalid phone number. Phone number must be 10 digits long and should start with 6,7,8,9 only.");
    return;
  } 
  if (thisUser.username !== emailAddress.value) {
    alert("You can't change the Email Address");
    return;
  }
  putData(`Users/${thisUser.id}`, thisUser).then(() => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(thisUser));
    alert("User Details updated successfully");
    location.reload();
  });
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const confirmValue = confirm("Are you sure you want to delete your account?");
  if (confirmValue === true) {
    const promptValue = prompt(
      `This action cannot be undone. This will permanently delete the ${thisUser.username} account and remove all details associated with it. Please type your password to confirm.`
    );
    if (promptValue === thisUser.password) {
      thisUser.isActive = false;
      putData(`Users/${thisUser.id}`, thisUser).then(() => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(thisUser));
        alert("The journey has come to an end, your account has been deleted.");
        window.location.href = "../../index.html";
      });
    }
  }
});

setLoader(false)







