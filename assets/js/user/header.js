// Keyboard shortcut for focusing the search bar
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "/") {
    document.getElementById("head-search").focus();
  }
});

// Toggle sidebar
const sideToggle = document.querySelector(".side-toggle");
const sidebar = document.querySelector(".sidebar");
const menuLines = document.querySelectorAll(".menu-line");

sideToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuLines.forEach((line) => line.classList.toggle("active"));
});

// Display user name and profile picture

async function displayUserData() {
  const currentUser = await getOneData(`Users/${thisUser.id}`);
  try {
    const nameDisplay = document.querySelector(".header-username");
    const greetings = document.querySelector(".greetings");
    const now = moment();
    if (
      now.isBetween(
        moment("05:00:00", "HH:mm:ss"),
        moment("12:00:00", "HH:mm:ss")
      )
    ) {
      greetings.textContent = `Good morning! 🌞`;
    } else if (
      now.isBetween(
        moment("12:00:00", "HH:mm:ss"),
        moment("18:00:00", "HH:mm:ss")
      )
    ) {
      greetings.textContent = `Good afternoon! ☀️`;
    } else {
      greetings.textContent = `Good evening! 🌙`;
    }
    const profileDisplay = document.querySelector(".profile-field");

    profileDisplay.addEventListener("mouseenter", () => {
      profileDisplay.nextElementSibling.style.display = "inline-block";
    });

    profileDisplay.addEventListener("mouseleave", () => {
      profileDisplay.nextElementSibling.style.display = "none";
    });
    nameDisplay.textContent = `Hello ${currentUser.name}`;
    profileDisplay.style.background = `url(${currentUser.profile}) no-repeat center center/cover`;
  } catch (error) {
    console.error(`Error in displayUserData function: ${error}`);
  }
}

displayUserData();

async function addSearchResults() {
  try {
    const currentUser = await getData(`Users/${thisUser.id}`);
    const searchResult = document.querySelector(".search-result");
    if (searchResult) {
      getData("Books")
      .then((details) => {
        // Iterate through book list and add search result elements
        for (const book of details) {
          if (book.isActive === true) {
            const searchItem = document.createElement("a");
            searchItem.setAttribute("class", "search-item");
            searchItem.setAttribute("data-id", book["id"]);
            if (currentUser.role === "admin") {
              searchItem.setAttribute(
                "href",
                "../../pages/admin/book_edit.html?id=" + book["id"]
              );
            } else {
              searchItem.setAttribute(
                "href",
                "../../pages/book_details.html?id=" + book["id"]
              );
            }
            searchResult.append(searchItem);

            const searchImg = document.createElement("img");
            searchImg.setAttribute("class", "search-item-img");
            searchImg.setAttribute("src", book["image"]["src"]);
            searchImg.setAttribute("alt", book["image"]["alt"]);
            searchImg.setAttribute("width", "70px");
            searchItem.append(searchImg);

            const searchTitle = document.createElement("p");
            searchTitle.setAttribute("class", "search-item-title");
            searchTitle.innerText = book["title"];
            searchItem.append(searchTitle);

            const searchArrow = document.createElement("i");
            searchArrow.setAttribute("class", "bi bi-caret-right-fill");
            searchItem.append(searchArrow);
          }
        }
      });

      // Show search list when search input is focused
      document
        .querySelector(".search-list-show")
        .addEventListener("focus", function () {
          document.querySelector(".search-list").classList.add("active");
          document.querySelector(".focus-out").classList.add("active");
        });

      // Hide search list when focus is lost
      document
        .querySelector(".focus-out")
        .addEventListener("click", function () {
          document.querySelector(".search-list").classList.remove("active");
          document.querySelector(".focus-out").classList.remove("active");
        });

      // Filter search results based on input
      const searchInput = document.getElementById("head-search");
      searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();
        const Books = document.getElementsByClassName("search-item");

        for (const i of Books) {
          const book = i.innerText.toLowerCase();
          if (book.includes(searchValue)) {
            i.style.display = "flex";
          } else {
            i.style.display = "none";
          }
        }
      });
    }
  } catch (error) {
    console.error("An error occurred while adding search results: ", error);
  }
}

addSearchResults();
