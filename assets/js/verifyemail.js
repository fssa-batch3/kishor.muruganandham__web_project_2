// Get book ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const verifyId = urlParams.get("vid");

const verifyEmail = document.getElementById("confirm-email");
const verifyContainer = document.querySelector(".verify-container");
const verifySuccessContainer = document.querySelector(
  ".verify-success-container"
);
const verifyRedirect = document.querySelector(".verify-redirect");

let counter = 5;

function redirect() {
  if (counter === 0) {
    window.location.assign(window.location.origin);
  } else {
    verifyRedirect.innerText = counter;
    counter--;
    console.log(counter);
    setTimeout(redirect, 1000);
  }
}

verifyEmail.addEventListener("click", () => {
  getOneData(`Users/${userId}`)
    .then((currentUser) => {
      const verified = comparePassword(verifyId, currentUser.verify_id);
      if (!verified) {
        alert("Email verification failed. Please try again.");
        setLoader(false);
        throw new Error("Email verification failed");
      }
      currentUser.isVerified = true;
      return patchData(`Users/${userId}`, currentUser);
    })
    .then(() => {
      verifyContainer.style.display = "none";
      verifySuccessContainer.style.display = "block";
      redirect();
    })
    .catch((error) => {
      if (error.message !== "Email verification failed") {
        console.error(error);
        alert("Error verifying your email. Please try again. Error: " + error);
      }
    });
});








