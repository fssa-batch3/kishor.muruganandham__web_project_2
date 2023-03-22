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
};

const signOut = document.getElementById("sign-out");

signOut.addEventListener("click", () => {
	localStorage.removeItem("user");
	(window.location.href = "../../index.html");
});
