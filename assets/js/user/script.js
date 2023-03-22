// This function gets the user data from local storage and returns it as an object.
function getUserData() {
  let userData;
  try {
    // Get the user data from local storage and Parse the user data and return it as an object.
    userData = JSON.parse(localStorage.getItem("user_data"));
    
    if (!userData) {
      // If there was an error, return an empty array as a default value.
      userData = []
      localStorage.setItem("user_data", JSON.stringify(userData)); 
    }
    return userData;
  } catch (error) {
    console.error("An error occurred in getUserData function:", error);
    
  }
}

// This function removes the user data from local storage.
function removeUserData() {
  try {
    // Remove the user data from local storage.
    localStorage.removeItem("user_data");
  } catch (error) {
    console.error("An error occurred in removeUserData function:", error);
  }
}

// This function sets the user data in local storage.
function setUserData(data) {
  try {
    // Convert the user data to a JSON string and store it in local storage.
    localStorage.setItem("user_data", JSON.stringify(data));
  } catch (error) {
    console.error("An error occurred in setUserData function:", error);
  }
}

book_list = JSON.parse(localStorage.getItem("book_list"));
const id = JSON.parse(localStorage.getItem("id"));
const user_data = getUserData();
const userId = user_data.find((u) => u.id === id);



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

let commentList = JSON.parse(localStorage.getItem("comments"));
if (!localStorage.getItem("comments")) {
  commentList = [];
}
let commentLikeList = JSON.parse(localStorage.getItem("comment_likes"));
if (!localStorage.getItem("comment_likes")) {
  commentLikeList = [];
  localStorage.setItem("comment_likes", JSON.stringify(commentLikeList));
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

function getStars(rating) {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push(
      '<i class="bi bi-star-fill" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  // If there is a half a star, append it
  if (i == 0.5)
    output.push(
      '<i class="bi bi-star-half" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  // Fill the empty stars
  for (let i = 5 - rating; i >= 1; i--)
    output.push(
      '<i class="bi bi-star" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  return output.join("");
}

function CloseDetailPage() {
  document.querySelector(".book-detail").classList.remove("active");
  document.querySelector(".focus-out").classList.remove("active");
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

    // Get the current user data from local storage.
    const thisUser = getUserData().find(
      (e) => e.id == JSON.parse(localStorage.getItem("id"))
    );

    // Create a new anchor element for the book cover image, and set the link based on user role.
    const bookCover = document.createElement("a");
    bookCover.className = "book-cover";
    if (thisUser.role == "admin") {
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
    bookDiv.append(bookCover, favBtn, bookTitle);
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
function toggleFavourites() {
  try {
    // Get all the favorite buttons on the page.
    const favButtons = document.querySelectorAll(".fav-btn");

    // Add an event listener to each favorite button to toggle the book's favorite status.
    favButtons.forEach((button) => {
      const bookId = button.parentElement.dataset.id;
      button.addEventListener("click", () => {
        const userFavourites = userId["favourites"];
        if (userFavourites.includes(bookId)) {
          const index = userFavourites.indexOf(bookId);
          userFavourites.splice(index, 1);
        } else {
          userFavourites.push(bookId);
        }
        // Update the user data in local storage and refresh the page.
        setUserData(user_data);
        location.reload();
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// This function updates the active state of favourite buttons based on the user's favourites data.
function checkForFavourites() {
  try {
    // Get the user's favourites data.
    const favourites = userId.favourites;

    // Get all the favourite buttons on the page.
    const favButtons = document.querySelectorAll(".fav-btn");

    // Loop through each button and update its active state based on the favourites data.
    favButtons.forEach((button) => {
      const isFavourite = favourites.includes(button.parentElement.dataset.id);

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


