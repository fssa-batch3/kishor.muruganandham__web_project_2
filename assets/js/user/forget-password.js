// const forgetPassword = document.getElementById("forget-password-form");
// const emailAddress = document.getElementById("username-forget");
// const oldPassword = document.getElementById("old-password-forget");
// const newPassword = document.getElementById("new-password-forget");
// const confirmPassword = document.getElementById("new-confirm-password-forget");


// forgetPassword.addEventListener("submit",function (e){
//     const emailAddressValue = emailAddress.value;
//     const oldPasswordValue = oldPassword.value;
//     const newPasswordValue = newPassword.value;
//     const confirmPasswordValue = confirmPassword.value;
    
//     e.preventDefault();
    
//     const id = localStorage.getItem("id");
// 	const data = getUserData();
// 	let userId = data.find((u) => u.id == id);

//     if (userId['username'] != emailAddressValue) {
//         alert("The Entered Email Doesn't exists in our Record");
//         return
//     } else
//     if (userId['password'] != oldPasswordValue ) {
//         alert("Please Enter your Old Password Correctly");
//         return
//     } else
//     if (userId['password'] == newPasswordValue ) {
//         alert("New Password Cannot be same as Old Password");
//         return
//     } else
//     if(newPasswordValue == confirmPasswordValue){
//         userId['password'] = confirmPasswordValue
//         const indexOfUser = data.indexOf(userId);
//         data.splice(indexOfUser, 1);
//         data.push(userId);
//         setUserData(data);
//         alert("Hurray! Password Changed Successfully")
//     }
//     window.location.href = "/index.html"; 
// });


// Get DOM elements
const form = document.getElementById("forget-password-form");
const emailInput = document.getElementById("username-forget");
const oldPasswordInput = document.getElementById("old-password-forget");
const newPasswordInput = document.getElementById("new-password-forget");
const confirmPasswordInput = document.getElementById("new-confirm-password-forget");

// Add form submit listener
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form input values
  const email = emailInput.value.trim();
  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Retrieve user data from localStorage
  const users = getUserData() || [];
  const currentUser = users.find((user) => user.username === email);

  // Check if user exists and old password is correct
  if (!currentUser) {
    alert("Email not found");
    return;
  }

  if (currentUser.password !== oldPassword) {
    alert("Incorrect password");
    return;
  }

  // Check if new password is the same as the old password
  if (oldPassword === newPassword) {
    alert("New password cannot be the same as old password");
    return;
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match");
    return;
  }

  // Update user data in localStorage
  currentUser.password = newPassword;
  setUserData(data);

  // Redirect to home page
  window.location.href = "/index.html";

  // Show success message
  alert("Password updated successfully");
});
