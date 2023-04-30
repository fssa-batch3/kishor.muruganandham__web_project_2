

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

  adminSidebar()

  