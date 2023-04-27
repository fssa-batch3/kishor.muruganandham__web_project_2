if (localStorage.getItem("id")) {
  window.location.href = "./pages/user/homepage.html";
}

const datePicker = document.querySelector(".datePicker");
const minDate = moment().subtract(100, "year").format("YYYY-MM-DD");
const maxDate = moment().subtract(10, "year").format("YYYY-MM-DD");

datePicker.setAttribute("min", minDate);
datePicker.setAttribute("max", maxDate);

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

  getData(`Users`).then((data) => {
    const userData = data.find((f) => f.username === usernameLogin.value);
    if (!userData) {
      alert("User does not exist.");
      return;
    }
    const matchedUser =
      userData.username === usernameLogin.value &&
      userData.role === loginRole.value &&
      userData.isActive === true;
    const isPasswordValid = comparePassword(
      passwordLogin.value,
      userData.password
    );

    if (userData.isVerified === false) {
      // Show an alert with error message
      alert("Your Email has not been verified yet, check your email for verification mail");
      return;
    }
    if (isPasswordValid === false) {
      // Show an alert with error message
      alert("Password You have entered is wrong. Please try again.");
      return;
    }
    //   If there's a match, set user id in local storage and redirect
    if (matchedUser === false) {
      // Show an alert with error message
      alert("Oops! Log In failed. Please try again.");
      return;
    }
    setLoader(true);
    userData.isOnline = true;
    userData.last_login = moment().format("YYYY-MM-DD HH:mm:ss A");
    localStorage.setItem("user", JSON.stringify(userData));
    patchData(`Users/${userData.id}`, userData).then(() => {
      setLoader(false);
      const redirectUrl =
        loginRole.value === "admin"
          ? "./pages/admin/admin-dashboard.html"
          : "./pages/user/homepage.html";
      window.location.href = redirectUrl;
    });
  });
});

signupForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const firstName = document.getElementById("firstname-sign-up");
  const lastName = document.getElementById("lastname-sign-up");
  const dob = document.getElementById("DOB-sign-up");
  const emailAdd = document.getElementById("email-sign-up");
  const pass = document.getElementById("password-sign-up");
  const role = document.getElementById("role-sign-up");
  const formInputs = [firstName, lastName, dob, emailAdd, pass, role];

  if (formInputs.some((input) => input.value === "")) {
    return alert("All fields should be filled");
  }

  getData("Users").then((data) => {
    setLoader(true);
    const userExists = data.find((user) => user.username === emailAdd.value);
    if (userExists) {
      alert("Email id exist.");
      setLoader(false);
      return;
    }

    const thisId = generateGuid();
    const vid = generateGuid();
    emailjs.init("KyF7Lia_QmwUPjOe5");
    emailjs.send("service_ifbzv8d","template_1zlwcip",{
      to_name: `${firstName.value} ${lastName.value}`,
      message: "Email Verification",
      link: `${window.location.origin}/pages/verify_email.html?id=${thisId}&&vid=${vid}` ,
      to_email: `${emailAdd.value}`,
      });
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
      password: encryptPassword(pass.value),
      isOnline: false,
      isVerified: false,
      verify_id: encryptPassword(vid),
      created_at: moment().format("YYYY-MM-DD HH:mm:ss A"),
      profile: `https://ui-avatars.com/api/?name=${firstName.value}${lastName.value}&rounded=true&uppercase=false&background=random`,
      favourites: [0],
    };

    putData(`Users/${thisId}`, newUser)
      .then(() => {
        setLoader(false);
        alert(`User with email ${emailAdd.value} created successfully!`);
        location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  });
});
