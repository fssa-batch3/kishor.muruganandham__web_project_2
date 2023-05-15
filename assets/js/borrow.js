const modalCloseBtn = document.querySelector(".modal-close");
const borrowBtn = document.getElementById("borrow-now");
const borrowBtnElement = document.querySelector(".book-detail-borrow-now");

async function openBorrowModal() {
  try {
    const borrowNowBtn = document.querySelector(".modal-submit");
    const borrowDateInput = document.getElementById("borrow-date");
    const dueDateInput = document.getElementById("due-date");
    const dueDurationInput = document.getElementById("due-duration");
    const fullBorrowDate = document.querySelector(".full-borrow-date");
    const fullDueDate = document.querySelector(".full-due-date");
    const booksArr = await getData("Books");
    const bookList = Object.values(booksArr);
    const thisBook = bookList.find((book) => book.id === bookId);
    document.querySelector(".backdrop").classList.add("active");
    document.querySelector(".modal").classList.add("active");
    document.getElementById("book-title").value = thisBook?.title;

    const durationDate = moment().format("YYYY-MM-DD h:mm A");
    let dueDateCalculated = moment(durationDate)
      .add(15, "days")
      .format("YYYY-MM-DD h:mm A");
    borrowDateInput.value = durationDate;
    dueDateInput.value = dueDateCalculated;
    fullBorrowDate.innerText = moment().format("MMMM Do YYYY, h:mm a");
    fullDueDate.innerText = moment(dueDateCalculated).format(
      "MMMM Do YYYY, h:mm a"
    );

    dueDurationInput.addEventListener("change", () => {
      dueDateCalculated = moment(durationDate)
        .add(dueDurationInput.value, "days")
        .format("YYYY-MM-DD h:mm A");
      dueDateInput.value = dueDateCalculated;
      fullDueDate.innerText = moment(dueDateCalculated).format(
        "MMMM Do YYYY, h:mm a"
      );
    });

    borrowNowBtn.addEventListener("click", handleBorrow);
  } catch (error) {
    console.error(error);
    alert("Error while borrowing book, Please try again. Error: " + error);
  }
}

async function handleBorrow() {
  try {
    const borrowDateInput = document.getElementById("borrow-date");
    const dueDateInput = document.getElementById("due-date");
    const bookList = await getData("Books");
    const borrowList = await getData("Borrows");
    const thisBook = bookList.find((book) => book.id === bookId);
    const borrowDate = borrowDateInput.value;
    const dueDate = dueDateInput.value;

    if (!borrowDate || !dueDate) {
      alert("Both Dates are Required");
      return;
    }

    const borrowedBook = borrowList.find(
      (borrowed) => borrowed.book_id === bookId
    );

    if (borrowedBook && borrowedBook.status == "Pending") {
      alert("Book Already Exists");
      return;
    }
    const borrowId = generateGuid();
    const borrowObj = {
      borrow_date: moment().format("YYYY-MM-DD h:mm A"),
      due_date: dueDate,
      status: "Pending",
      return_date: "-",
      book_id: bookId,
      user_id: thisUser.id,
      username: thisUser.name,
      remarks: null,
      borrow_id: borrowId,
    };
    thisBook.isBorrowable = false;
    await patchData(`Books/${thisBook.id}`, thisBook);
    await putData(`Borrows/${borrowId}`, borrowObj);
    // Success notification
    alert("Book Borrowed successfully");
    closeBorrowModal();
    showBookDetails();
  } catch (error) {
    console.error(error);
    alert("Error while borrowing book, Please try again. Error: " + error);
  }
} 

function closeBorrowModal() {
  document.querySelector(".backdrop").classList.remove("active");
  document.querySelector(".modal").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const borrowBtn = document.getElementById("borrow-now");
  const modalCloseBtn = document.querySelector(".modal-close");
  modalCloseBtn.addEventListener("click", closeBorrowModal);
  borrowBtn.addEventListener("click", openBorrowModal);
  // showComment();
});
