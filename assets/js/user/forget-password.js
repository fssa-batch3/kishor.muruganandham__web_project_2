
const form = document.getElementById("forget-password-form");
const emailInput = document.getElementById("username-forget");
const oldPasswordInput = document.getElementById("old-password-forget");
const newPasswordInput = document.getElementById("new-password-forget");
const confirmPasswordInput = document.getElementById("new-confirm-password-forget");

// Add form submit listener
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form input values
  const email = emailInput.value.trim();
  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Retrieve user data from localStorage
  const users = await getData("user");
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
  putData(`user/${currentUser.json_id}`, currentUser)
  .then((result) => {
    
    // Redirect to home page
    window.location.href = "/index.html";
  
    // Show success message
    alert("Password updated successfully");
  }).catch((err) => {
    console.log(err);
  });
});
