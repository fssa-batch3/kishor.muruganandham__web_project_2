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
const datePicker = document.querySelector(".datePicker");
const minDate = moment().subtract(100, "year").format("YYYY-MM-DD");
const maxDate = moment().subtract(10, "year").format("YYYY-MM-DD");
datePicker.setAttribute("min", minDate);
datePicker.setAttribute("max", maxDate);

if (thisUser.role === "admin") {
  adminSidebar();
}
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
  try {
    await putData(`Users/${thisUser.id}`, thisUser);
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(thisUser));
    alert("User Details updated successfully");
    location.reload();
  } catch (error) {
    console.log(error);
    alert("Error updating user details. Please try again later.");
  }
});


deleteBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const confirmValue = confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmValue === false) {
      return;
    }
    const promptValue = prompt(
      `This action cannot be undone. This will permanently delete the ${thisUser.username} account and remove all details associated with it. Please type your password to confirm.`
    );
    if (promptValue !== thisUser.password) {
      alert("Please enter your password correctly");
      return;
    }
    thisUser.isActive = false;

    await putData(`Users/${thisUser.id}`, thisUser);
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(thisUser));
    alert("The journey has come to an end, your account has been deleted.");
    window.location.assign(window.location.origin);
  } catch (error) {
    console.log(error);
    alert("Error deleting user account. Please try again later.");
  }
});


setLoader(false);

function adminSidebar() {
  const navBar = document.querySelector("nav");
  navBar.innerHTML = `<div class="side-header">
  <div class="logo">
    <i class="bi bi-book-half"></i>
    <p>Bookly</p>
  </div>
  <div class="divider-line"></div>
  <div class="nav-list">
    <a href="./admin/admin-dashboard.html" class="nav-items"
      ><i class="bi bi-grid"></i>
      <p>Dashboard</p>
      <div class="tooltip" role="tooltip" data-popper-placement="right">
        Dashboard
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="./admin/admin_library.html" class="nav-items"
      ><i class="bi bi-building"></i>
      <p>Library</p>
      <div
        class="tooltip"
        role="tooltip"
        style="top: 195px"
        data-popper-placement="right"
      >
        Library
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="./admin/borrow-list.html" class="nav-items"
      ><i class="bi bi-inboxes"></i>
      <p>Borrow List</p>
      <div
        class="tooltip"
        role="tooltip"
        style="top: 255px"
        data-popper-placement="right"
      >
        Borrow List
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="./admin/admin_create-book.html" class="nav-items"
      ><i class="bi bi-file-plus"></i>
      <p>Create Book</p>
      <div
        class="tooltip"
        role="tooltip"
        style="top: 315px"
        data-popper-placement="right"
      >
        Create Book
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="./admin/user_list.html" class="nav-items"
      ><i class="bi bi-person"></i>
      <p>User List</p>
      <div
        class="tooltip"
        role="tooltip"
        style="top: 370px"
        data-popper-placement="right"
      >
        User List
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="./admin/bookrequest_list.html" class="nav-items "
            ><i class="bi bi-hdd-stack"></i>
            <p>Book Request List</p>
            <div
              class="tooltip"
              role="tooltip"
              style="top: 430px;"
              data-popper-placement="right"
            >
              Book Request List
              <div class="arrow" data-popper-arrow></div>
            </div>
          </a>
  </div>
</div>
<div class="side-footer">
  <div class="dark-toggle">
    <a href="#" onclick="darkMode()" class="nav-items"
      ><i class="bi bi-moon-stars-fill dark-light"></i>
      <p class="da-li-text">Dark mode</p>
      <div
        class="tooltip"
        role="tooltip"
        style="bottom: 115px; top: unset"
        data-popper-placement="right"
      >
        Theme
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
    <a href="#" class="nav-items" id="sign-out"
      ><i class="bi bi-box-arrow-left"></i>
      <p>Log Out</p>
      <div
        class="tooltip"
        role="tooltip"
        style="bottom: 55px; top: unset"
        data-popper-placement="right"
      >
        Log-Out
        <div class="arrow" data-popper-arrow></div>
      </div>
    </a>
  </div>
</div>`;
}
