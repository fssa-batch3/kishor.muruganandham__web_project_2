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

signinForm.addEventListener("submit", function(e) {
  e.preventDefault();

  getData("Users")
    .then(function(userList) {

      const userData = userList?.find((f) => f.username === usernameLogin.value);
      if (!userData) {
        alert("User does not exist.");
        return;
      }
      const matchedUser =
        userData.username === usernameLogin.value &&
        userData.isActive === true;
      const isPasswordValid = comparePassword(
        passwordLogin.value,
        userData.password
      );

      if (userData.isVerified === false) {
        alert(
          "Your Email has not been verified yet, check your email for verification mail"
        );
        return;
      }
      if (isPasswordValid === false) {
        alert("Password You have entered is wrong. Please try again.");
        return;
      }
      if (matchedUser === false) {
        alert("Oops! Log In failed. Please try again.");
        return;
      }
      userData.isOnline = true;
      userData.last_login = moment().format("YYYY-MM-DD HH:mm:ss A");
      localStorage.setItem("user", JSON.stringify(userData));
      return patchData(`Users/${userData.id}`, userData)
      .then(function() {
        let redirectUrl;
        if (userData.role === "admin") {
          redirectUrl = "./pages/admin/admin-dashboard.html";
        } else {
          redirectUrl = "./pages/user/homepage.html";
        }
        window.location.assign(redirectUrl);
      })
      .catch(function(error) {
        console.error(error);
        alert("An error occurred while logging in. Please try again later.");
      });
    })
    .catch(function(error) {
      console.error(error);
      alert("An error occurred while logging in. Please try again later.");
    });
});


signupForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstname-sign-up");
  const lastName = document.getElementById("lastname-sign-up");
  const dob = document.getElementById("DOB-sign-up");
  const emailAdd = document.getElementById("email-sign-up");
  const pass = document.getElementById("password-sign-up");
  const role = document.getElementById("role-sign-up");

  getData("Users")
    .then(function(data) {
      const userExists = data?.find(user => user.username === emailAdd.value && user.isVerified === false);
      if (userExists) {
        alert("User with the same Email id exists.");
        return;
      }

      const thisId = generateGuid();
      const vid = generateGuid();
      emailjs.init("KyF7Lia_QmwUPjOe5");
      emailjs.send("service_ifbzv8d", "template_1zlwcip", {
        to_name: `${firstName.value} ${lastName.value}`,
        message: "Email Verification",
        link: `${window.location.origin}/pages/verify_email.html?id=${thisId}&&vid=${vid}`,
        to_email: `${emailAdd.value}`
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
        isVerified: false,
        verify_id: encryptPassword(vid),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss A"),
        profile: `https://ui-avatars.com/api/?name=${firstName.value}${lastName.value}&rounded=true&uppercase=false&background=random`,
        favourites: [0]
      };

      putData(`Users/${thisId}`, newUser)
        .then(function() {
          alert(
            `User with email ${emailAdd.value} created successfully! Check your email for verification and continue login.`
          );
          location.reload();
        })
        .catch(function(error) {
          console.error(error);
          alert("An error occurred while signing up. Please try again later.");
        });
    })
    .catch(function(error) {
      console.error(error);
      alert("An error occurred while fetching user data. Please try again later.");
    });
});

