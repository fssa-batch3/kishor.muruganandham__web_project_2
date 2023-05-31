const forgetForm = document.getElementById("forget-password-form");
const emailInput = document.getElementById("username-forget");
const oldPasswordInput = document.getElementById("old-password-forget");
const newPasswordInput = document.getElementById("new-password-forget");
const confirmPasswordInput = document.getElementById(
  "new-confirm-password-forget"
);

forgetForm.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form input values
  const email = emailInput.value.trim();
  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = newPasswordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // Retrieve user data from DB
  getData("Users")
    .then(function(users) {
      const currentUser = users.find(user => user.username === email);

      // Check if user exists and old password is correct
      if (!currentUser) {
        alert("Email not found");
        return;
      }
      const isCorrectPass = comparePassword(oldPassword, currentUser.password);
      if (isCorrectPass === false) {
        alert("Incorrect password");
        return;
      }

      // Check if new password is the same as the old password
      if (oldPassword === newPassword) {
        alert("New password cannot be the same as the old password");
        return;
      }

      // Check if new password and confirm password match
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match");
        return;
      }

      // Update user data in DB
      currentUser.password = encryptPassword(newPassword);

      putData(`Users/${currentUser.id}`, currentUser)
        .then(function() {
          // Show success message
          alert("Password updated successfully");
          // Redirect to home page
          window.location.assign(window.location.origin);
        })
        .catch(function(err) {
          console.log(err);
          alert("Error updating password. Please try again. Error: " + err);
        });
    })
    .catch(function(err) {
      console.error(err);
      alert("Error fetching user data. Please try again later.");
    });
});


