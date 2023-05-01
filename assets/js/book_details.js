const ratingInputs = document.querySelectorAll('input[type="radio"]');
let ratingValue;
let ratingId;
let thisRating;
async function ratings() {
  const ratingList = await getData("Ratings");
  thisRating = ratingList.find(
    (rating) => rating.user_id === thisUser.id && rating.book_id == bookId
  );
  if (thisRating) {
    ratingId = thisRating.rating_id;
    setRatingValue(thisRating.rating);
  } else {
    ratingId = generateGuid();
  }
  const thisBookRatings = ratingList.filter(
    (rating) => (rating.book_id == bookId)
  );
  const ratings = thisBookRatings.reduce((acc, obj) => acc + obj.rating, 0);
  const avgRating = Math.round(ratings / thisBookRatings.length);
  const starRatingElement = document.querySelector(".stars");
  starRatingElement.innerHTML = avgRating || 0;
}
ratings();

ratingInputs.forEach((input) => {
  input.addEventListener("click", () => {
    ratingValue = +input.value;
    if (thisRating?.rating === ratingValue) {
      return;
    }
    const ratingObj = {
      user_id: thisUser.id,
      rating: ratingValue,
      book_id: thisBook.id,
      rating_id: ratingId,
    };
    putData(`Ratings/${ratingId}`, ratingObj).then(() => {
      if (thisRating) {
        thisRating.rating = ratingValue;
      }

      alert("Rated Successfully");
      ratings();
    });
  });
});

function adminSidebar() {
  const navBar = document.querySelector("nav");
  navBar.innerHTML = `<div class="side-header">
    <div class="logo">
      <i class="bi bi-book-half"></i>
      <p>Bookly</p>
    </div>
    <div class="divider-line"></div>
    <div class="nav-list">
      <a href="./admin/admin-dashboard.html" class="nav-items"
        ><i class="bi bi-grid"></i>
        <p>Dashboard</p>
        <div class="tooltip" role="tooltip" data-popper-placement="right">
          Dashboard
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="./admin/admin_library.html" class="nav-items"
        ><i class="bi bi-building"></i>
        <p>Library</p>
        <div
          class="tooltip"
          role="tooltip"
          style="top: 195px"
          data-popper-placement="right"
        >
          Library
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="./admin/borrow-list.html" class="nav-items"
        ><i class="bi bi-inboxes"></i>
        <p>Borrow List</p>
        <div
          class="tooltip"
          role="tooltip"
          style="top: 255px"
          data-popper-placement="right"
        >
          Borrow List
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="./admin/admin_create-book.html" class="nav-items"
        ><i class="bi bi-file-plus"></i>
        <p>Create Book</p>
        <div
          class="tooltip"
          role="tooltip"
          style="top: 315px"
          data-popper-placement="right"
        >
          Create Book
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="./admin/user_list.html" class="nav-items"
        ><i class="bi bi-person"></i>
        <p>User List</p>
        <div
          class="tooltip"
          role="tooltip"
          style="top: 370px"
          data-popper-placement="right"
        >
          User List
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="./admin/bookrequest_list.html" class="nav-items "
            ><i class="bi bi-hdd-stack"></i>
            <p>Book Request List</p>
            <div
              class="tooltip"
              role="tooltip"
              style="top: 430px;"
              data-popper-placement="right"
            >
              Book Request List
              <div class="arrow" data-popper-arrow></div>
            </div>
          </a>
    </div>
  </div>
  <div class="side-footer">
    <div class="dark-toggle">
      <a href="#" onclick="darkMode()" class="nav-items"
        ><i class="bi bi-moon-stars-fill dark-light"></i>
        <p class="da-li-text">Dark mode</p>
        <div
          class="tooltip"
          role="tooltip"
          style="bottom: 115px; top: unset"
          data-popper-placement="right"
        >
          Theme
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
      <a href="#" class="nav-items" id="sign-out"
        ><i class="bi bi-box-arrow-left"></i>
        <p>Log Out</p>
        <div
          class="tooltip"
          role="tooltip"
          style="bottom: 55px; top: unset"
          data-popper-placement="right"
        >
          Log-Out
          <div class="arrow" data-popper-arrow></div>
        </div>
      </a>
    </div>
  </div>`;
}


