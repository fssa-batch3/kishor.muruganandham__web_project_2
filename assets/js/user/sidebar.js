const sideBar = document.querySelector(".sidebar");
const navBtns = document.querySelectorAll(".nav-items");
const toolTip = document.querySelectorAll(".tooltip");

for (const i of navBtns) {
  i.addEventListener("mouseover", () => {
    if (sideBar.offsetWidth <= 95) {
      i.children[2].style.display = "inline-block";
    }
  });
  i.addEventListener("mouseout", () => {
    i.children[2].style.display = "none";
  });
}

let signOut = document.getElementById("sign-out");
signOut.addEventListener("click", async () => {
  try {
    const currentUser = await getOneData(`Users/${thisUser.id}`);
    currentUser.isOnline = false;
    setLoader(true);
    await patchData(`Users/${currentUser.id}`, currentUser);
    setLoader(false);
    localStorage.removeItem("user");
    return window.location.href = window.location.origin;
  } catch (error) {
    console.error(error);
    return alert("Error Signing out: " + error.message);
  }
});



