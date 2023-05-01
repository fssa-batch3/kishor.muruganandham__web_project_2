// Keyboard shortcut for focusing the search bar
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "/") {
    document.getElementById("head-search").focus();
  }
});

function showHeader() {
  // Create header element with class "top-header"
  const header = document.createElement("header");
  header.classList.add("top-header");

  // Create left header section with class "left-header"
  const leftHeader = document.createElement("div");
  leftHeader.classList.add("left-header");

  // Create side toggle button with class "side-toggle" and three menu lines
  const sideToggle = document.createElement("div");
  sideToggle.classList.add("side-toggle");

  for (let i = 1; i <= 3; i++) {
    const menuLine = document.createElement("span");
    menuLine.classList.add("menu-line");
    sideToggle.appendChild(menuLine);
  }

  // Create user date section with class "user-date"
  const userDate = document.createElement("div");
  userDate.classList.add("user-date");

  // Create header username element with class "header-username" and text content "Hello"
  const headerUsername = document.createElement("h4");
  headerUsername.classList.add("header-username");
  headerUsername.textContent = "Hello";

  // Create greetings element with class "greetings" and text content "Have a Great Day!"
  const greetings = document.createElement("p");
  greetings.classList.add("greetings");
  greetings.textContent = "Have a Great Day!";

  // Append header username and greetings to user date section
  userDate.appendChild(headerUsername);
  userDate.appendChild(greetings);

  // Append side toggle and user date to left header section
  leftHeader.appendChild(sideToggle);
  leftHeader.appendChild(userDate);

  // Create right header section with class "right-header"
  const rightHeader = document.createElement("div");
  rightHeader.classList.add("right-header");

  // Create search field section with class "search-field"
  const searchField = document.createElement("div");
  searchField.classList.add("search-field");

  // Create search label element with "for" attribute and child search icon element
  const searchLabel = document.createElement("label");
  searchLabel.setAttribute("for", "head-search");

  const searchIcon = document.createElement("i");
  searchIcon.classList.add("bi", "bi-search");
  searchLabel.appendChild(searchIcon);

  // Create search input element with various attributes
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("name", "head-search");
  searchInput.setAttribute("id", "head-search");
  searchInput.setAttribute("placeholder", "Search...");
  if (window.location.pathname == "/pages/library.html") {
    searchInput.setAttribute("oninput", "tagFilterBooks('All'),searchBooks()");
  } else if (window.location.pathname == "/pages/user/favourites.html"){
    searchInput.setAttribute("oninput", "searchBooks()");
  } else{
    searchInput.classList.add("search-list-show");
  }

  // Create focus out and search list sections for search field
  const focusOut = document.createElement("div");
  focusOut.classList.add("focus-out");

  const searchList = document.createElement("div");
  searchList.classList.add("search-list");

  // Create search result and show all books link elements for search list section
  const searchResult = document.createElement("div");
  searchResult.classList.add("search-result");

  const showAll = document.createElement("a");
  showAll.setAttribute("href", `${window.location.origin}/pages/library.html`);
  showAll.classList.add("show-all");
  showAll.textContent = "Show All Books";

  searchList.appendChild(searchResult);
  searchList.appendChild(showAll);

  // Append search label, input, focus out, and search list sections to search field section
  searchField.appendChild(searchLabel);
  searchField.appendChild(searchInput);
  searchField.appendChild(focusOut);
  searchField.appendChild(searchList);

  // Create profile area link element with "href", "aria-label", and "class" attributes
  const profileArea = document.createElement("a");
  profileArea.setAttribute("href", `${window.location.origin}/pages/user_profile.html`);
  profileArea.setAttribute("aria-label", "profile-page");
  profileArea.classList.add("profile-area");

  // Create profile field and tooltip sections for profile area link
  const profileField = document.createElement("div");
  profileField.classList.add("profile-field");

  const tooltip = document.createElement("div");
  tooltip.setAttribute("class", "tooltip");
  tooltip.setAttribute("role", "tooltip");
  tooltip.setAttribute("data-popper-placement", "top");
  tooltip.textContent = "User Profile";

  const arrow = document.createElement("div");
  arrow.setAttribute("class", "arrow");
  arrow.setAttribute("data-popper-arrow", "");

  tooltip.appendChild(arrow);

  profileArea.appendChild(profileField);
  profileArea.appendChild(tooltip);

  rightHeader.appendChild(searchField);
  rightHeader.appendChild(profileArea);

  header.appendChild(leftHeader);
  header.appendChild(rightHeader);

  document.querySelector(".main-container").prepend(header);
}
showHeader();

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
setLoader(true);

async function addSearchResults() {
  try {
    const currentUser = await getData(`Users/${thisUser.id}`);
    const searchResult = document.querySelector(".search-result");
    if (searchResult) {
      getData("Books").then((details) => {
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
      document.querySelector(".search-list-show")?.addEventListener("focus", function () {
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

// Toggle sidebar
const sideToggle = document.querySelector(".side-toggle");
const sidebar = document.getElementById("sidebar");
const menuLines = document.querySelectorAll(".menu-line");

sideToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuLines.forEach((line) => line.classList.toggle("active"));
});
