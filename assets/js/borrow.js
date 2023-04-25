
async function openBorrowModal() {
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
  fullBorrowDate.innerText = moment().format("MMMM Do YYYY, h:mm a")
  fullDueDate.innerText = moment(dueDateCalculated).format("MMMM Do YYYY, h:mm a")
  
  dueDurationInput.addEventListener("change", () => {
    dueDateCalculated = moment(durationDate)
    .add(dueDurationInput.value, "days")
    .format("YYYY-MM-DD h:mm A");
    dueDateInput.value = dueDateCalculated;
  fullDueDate.innerText = moment(dueDateCalculated).format("MMMM Do YYYY, h:mm a")

  });

  borrowNowBtn.addEventListener("click", handleBorrow);
}
async function handleBorrow() {
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
  putData(`Borrows/${borrowId}`, borrowObj).then((data) => {
    console.log(data);
    // Success notification
    alert("Book Borrowed successfully");
    closeBorrowModal();
    showBookDetails();
  });
  patchData(`Books/${thisBook.id}`, thisBook);
}

function closeBorrowModal() {
  document.querySelector(".backdrop").classList.remove("active");
  document.querySelector(".modal").classList.remove("active");
}
