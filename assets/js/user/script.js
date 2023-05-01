const thisUser = JSON.parse(localStorage.getItem("user"));

// Dark Mode
// Get the current value of the "dark-mode" key from local storage
const isDarkMode = localStorage.getItem("dark-mode");

// If the value is "true", set the "dark-mode" class on the <body> element
if (isDarkMode === "true") {
  document.querySelector(":root").classList.add("dark-mode");
}
// Add an event listener to the dark mode toggle button
function darkMode() {
  // If the "dark-mode" class is set on the <body> element
  if (document.querySelector(":root").classList.contains("dark-mode")) {
    // Remove the class and set the "dark-mode" key to "false" in local storage
    document.querySelector(":root").classList.remove("dark-mode");
    document
      .querySelector(".dark-light")
      .classList.replace("bi-sun-fill", "bi-moon-stars-fill");
    document.querySelector(".da-li-text").innerText = "Dark mode";
    localStorage.setItem("dark-mode", "false");
  } else {
    // Add the class and set the "dark-mode" key to "true" in local storage
    document.querySelector(":root").classList.add("dark-mode");
    document
      .querySelector(".dark-light")
      .classList.replace("bi-moon-stars-fill", "bi-sun-fill");
    document.querySelector(".da-li-text").innerText = "Light mode";
    localStorage.setItem("dark-mode", "true");
  }
}

function generateGuid() {
  let result, i, j;
  result = "";
  for (j = 0; j < 16; j++) {
    i = Math.floor(Math.random() * 16).toString(16);
    result = result + i;
  }
  return result;
}

function encryptPassword(password) {
  try {
    // Generate a random salt value
    const salt = CryptoJS.lib.WordArray.random(16);

    // Hash the password using SHA-256 with salt
    const hashedPassword = CryptoJS.SHA256(password + salt);

    // Return the salt and hashed password as a string
    return salt.toString() + " " + hashedPassword.toString();
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
}

function comparePassword(userInputPassword, saltAndHashedPassword) {
  try {
    // Split the stored salt and hashed password
    const [salt, storedHash] = saltAndHashedPassword.split(" ");

    // Hash the user input password with the stored salt
    const hashedPassword = CryptoJS.SHA256(
      userInputPassword + CryptoJS.enc.Hex.parse(salt)
    );

    // Compare the hashed user input password with the stored hash
    return hashedPassword.toString() === storedHash;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
}

function searchBooks() {
  const searchValue = document
    .getElementById("head-search")
    .value.toLowerCase();

  const books = document.querySelectorAll(".book");
  books.forEach((book) => {
    const title = book.innerHTML.toLowerCase();
    const display = title.includes(searchValue) ? "block" : "none";
    book.style.display = display;
  });
}

function activeTab(evt, tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((tabContent) => (tabContent.style.display = "none"));

  // Remove 'active' class from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((tabButton) => tabButton.classList.remove("active"));

  // Show the selected tab content and set the selected tab button as active
  const selectedTabContent = document.getElementById(tabName);
  selectedTabContent.style.display = "block";
  evt.currentTarget.classList.add("active");
}

function setRatingValue(data) {
  let radioButtons = document.getElementsByName("rating");
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].id === "rating-" + data) {
      radioButtons[i].checked = true;
      break;
    }
  }
}

async function getBookGenres() {
  try {
    const bookList = await getData("Books");
    const bookCountsByGenre = {};
    bookList.forEach((book) => {
      if (book["isActive"]) {
        book.tags.forEach((tag) => {
          if (bookCountsByGenre[tag]) {
            bookCountsByGenre[tag]++;
          } else {
            bookCountsByGenre[tag] = 1;
          }
        });
      }
    });
    const uniqueCategories = [
      ...new Set(
        Object.keys(bookCountsByGenre).map((cat) => cat.toLowerCase())
      ),
    ];
    const result = {};
    uniqueCategories.forEach((cat) => {
      const catCounts = Object.entries(bookCountsByGenre)
        .filter(([key, val]) => key.toLowerCase() === cat)
        .map(([key, val]) => val);
      result[cat] = catCounts.reduce((acc, val) => acc + val, 0);
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function showTags() {
  const tagsArray = await getBookGenres();
  const tagSettings = Object.keys(tagsArray);
  tagSettings.forEach((tags) => {
    const tagBtn = document.createElement("button");
    tagBtn.setAttribute("onclick", `tagFilterBooks('${tags}')`);
    tagBtn.innerText = tags;
    document.querySelector(".library-tags").append(tagBtn);
  });
}

// This function generates a book card element and appends it to a book rack container.
function generateBook(book, bookRack) {
  try {
    // Check if the book is active before proceeding.
    if (book.isActive !== true) return;

    // Create a new div element to hold the book card.
    const bookDiv = document.createElement("div");
    bookDiv.dataset.id = book.id;
    bookDiv.className = "book";

    // Create a new anchor element for the book cover image, and set the link based on user role.
    const bookCover = document.createElement("a");
    bookCover.className = "book-cover";
    if (thisUser.role === "admin") {
      bookCover.href = "../../pages/admin/book_edit.html?id=" + book.id;
    } else {
      bookCover.href = "../../pages/book_details.html?id=" + book.id;
    }

    // Set the filter tag for the book based on its tags.
    bookCover.dataset.filterTag = book.tags;

    // Create a new image element for the book cover, and set its source and alt text.
    const bookImage = document.createElement("img");
    bookImage.src = book.image.src;
    bookImage.alt = book.image.alt;
    bookImage.setAttribute("width", "150px");

    // Create a new span element for the favorite button, and add a bookmark icon to it.
    const favBtn = document.createElement("span");
    favBtn.className = "fav-btn";
    const favIcon = document.createElement("i");
    favIcon.className = "bi bi-bookmark-heart";

    // Create a new div element for the book title and author, and set the title and author text.
    const bookTitle = document.createElement("div");
    bookTitle.className = "book-title";
    const bookName = document.createElement("h4");
    bookName.innerText = book.title;
    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;

    // Append the book cover, favorite button, title and author to the book card div element.
    bookDiv.append(bookCover, bookTitle);
    if (thisUser.role === "user") {
      bookDiv.append(favBtn);
    }
    bookCover.append(bookImage);
    favBtn.append(favIcon);
    bookTitle.append(bookName, bookAuthor);

    // Append the book card div element to the book rack container.
    bookRack.append(bookDiv);
  } catch (error) {
    // Log any errors to the console for debugging purposes.
    console.error(error);
  }
}

// This function adds event listeners to the favorite buttons on the book cards.
async function toggleFavourites() {
  try {
    const currentUser = await getOneData(`Users/${thisUser.id}`);
    // Get all the favorite buttons on the page.
    const favButtons = document.querySelectorAll(".fav-btn");

    // Add an event listener to each favorite button to toggle the book's favorite status.
    favButtons.forEach((button) => {
      const bookId = button.parentElement.dataset.id;
      button.addEventListener("click", () => {
        const userFavourites = currentUser["favourites"];
        if (userFavourites?.includes(bookId)) {
          const index = userFavourites.indexOf(bookId);
          userFavourites.splice(index, 1);
        } else {
          userFavourites?.push(bookId);
        }
        putData(`Users/${currentUser.id}`, currentUser).then(() => {
          checkForFavourites();
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// This function updates the active state of favourite buttons based on the user's favourites data.
async function checkForFavourites() {
  try {
    const currentUser = await getOneData(`Users/${thisUser.id}`);
    // Get the user's favourites data.
    const favourites = currentUser.favourites;
    // Get all the favourite buttons on the page.
    const favButtons = document.querySelectorAll(".fav-btn");

    // Loop through each button and update its active state based on the favourites data.
    favButtons.forEach((button) => {
      const isFavourite = favourites?.includes(button.parentElement.dataset.id);

      if (isFavourite) {
        button.classList.add("active");
        button.firstChild.classList.replace(
          "bi-bookmark-heart",
          "bi-bookmark-heart-fill"
        );
      } else {
        button.classList.remove("active");
        button.firstChild.classList.replace(
          "bi-bookmark-heart-fill",
          "bi-bookmark-heart"
        );
      }
    });
  } catch (error) {
    console.error("An error occurred in checkForFavourites function:", error);
  }
}

function setLoader(status) {
  const bodyContainer = document.body;
  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader";
  const loaderBody = `
  <div>
    <ul>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
      <li>
        <svg fill="currentColor" viewBox="0 0 90 120">
          <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
        </svg>
      </li>
    </ul>
  </div><span>Loading...</span>`;
  loaderContainer.innerHTML = loaderBody;

  if (status === true) {
    bodyContainer.append(loaderContainer);
    bodyContainer.innerHTML += `<div class="background-blur"></div>`;
  }
  setTimeout(() => {
    if (status === true) {
      setLoader(false);
    }
  }, 8000);
  if (status === false) {
    document.querySelector(".loader")?.remove();
    document.querySelector(".background-blur")?.remove();
  }
}
