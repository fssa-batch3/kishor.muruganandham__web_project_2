

if (localStorage.getItem("id")) {
  window.location.href = "./pages/user/homepage.html";
}

const datePicker = document.querySelector('.datePicker');
const minDate = moment().subtract(100, 'year').format('YYYY-MM-DD');
const maxDate = moment().subtract(10, 'year').format('YYYY-MM-DD');

datePicker.setAttribute('min', minDate);
datePicker.setAttribute('max', maxDate);
// const settingsObject = {
//   tags: ["Fantasy", "Education", "Drama", "Sci-fi"],
//   books: { avail_books: 200, max_borrow: 50, max_fav: 30 },
// };

// localStorage.setItem("settings", JSON.stringify(settingsObject));

// Get form inputs and form element
const signinForm = document.getElementById("sign-in");
const signupForm = document.getElementById("sign-up");
const usernameLogin = document.getElementById("username-sign-in");
const passwordLogin = document.querySelector(".password");
const loginRole = document.getElementById("role-sign-in");

// Listen to form submit event
signinForm.addEventListener("submit", async function (e) {
  // Prevent default form submission
  e.preventDefault();
  // Get user data from local storage

  getData(`Users`)
  .then(data => {
    console.log();
    const userData = Object.values(data).find(f => f.username === usernameLogin.value);
    if (!userData) {
      alert("User does not exist.");
      return;
    }
    const matchedUser =
      userData.username === usernameLogin.value &&
      userData.password === passwordLogin.value &&
      userData.role === loginRole.value &&
      userData.isActive === true;

    //   If there's a match, set user id in local storage and redirect
    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(userData));
      const redirectUrl =
        loginRole.value === "admin"
          ? "./pages/admin/admin-dashboard.html"
          : "./pages/user/homepage.html";
      window.location.href = redirectUrl;
    } else {
      // Otherwise, show an alert with error message
      alert("Oops! Log In failed. Please try again.");
    }
  });
});

signupForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  console.log(event);
  const firstName = document.getElementById("firstname-sign-up");
  const lastName = document.getElementById("lastname-sign-up");
  const dob = document.getElementById("DOB-sign-up");
  const emailAdd = document.getElementById("email-sign-up");
  const pass = document.getElementById("password-sign-up");
  const role = document.getElementById("role-sign-up");
  const formInputs = [firstName, lastName, dob, emailAdd, pass, role];
  
  if (formInputs.some(input => input.value === "")) {
    return alert("All fields should be filled");
  }
  
  getData("Users")
  .then(data => {
    console.log(data);
    const userExists = Object.values(data).find(user => user.username === emailAdd.value);
    if (userExists) {
      alert("Email id exist.");
      return;
    }
    const thisId = generateGuid();
    const newUser = {
      id: thisId,
      first_name: firstName.value,
      last_name: lastName.value,
      name: `${firstName.value} ${lastName.value}`,
      role: role.value,
      dob: dob.value,
      phone_number: null,
      age: moment().diff(dob.value, "years"),
      isActive: true,
      username: emailAdd.value,
      password: pass.value,
      profile: `https://ui-avatars.com/api/?name=${firstName.value}${lastName.value}&rounded=true&uppercase=false&background=random`,
      favourites: [0],
    };
  
  
    putData(`Users/${thisId}`, newUser)
  .then(data => {
    alert(`User with email ${emailAdd.value} created successfully!`);
    location.reload();
  })
  .catch(error => {
    alert(error);
  });
  
  });

});


