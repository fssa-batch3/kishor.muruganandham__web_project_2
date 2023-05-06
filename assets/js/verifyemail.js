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

verifyEmail.addEventListener("click", async () => {
  try {
    const currentUser = await getOneData(`Users/${userId}`);
    const verified = comparePassword(verifyId, currentUser.verify_id);
    if (verified === false) {
      alert("Email verification failed. Please try again");
      setLoader(false);
      return;
    }
    currentUser.isVerified = true;
    await patchData(`Users/${userId}`, currentUser);
    verifyContainer.style.display = "none";
    verifySuccessContainer.style.display = "block";
    redirect();
  } catch (error) {
    console.error(error);
    alert("Error Verifying your Email Please try again. Error :" + error);
  }
});


function redirect() {
  let counter = 5;
  if (counter === 0) {
    window.location.assign(window.location.origin);
  } else {
    verifyRedirect.innerText = counter;
    counter--;
    setTimeout(redirect, 1000);
  }
};

