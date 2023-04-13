async function openBorrowModal() {
  const bookList = await getData("book");
  const thisBook = bookList.find((book) => book.id === bookId);
  document.querySelector(".backdrop").classList.add("active");
  document.querySelector(".modal").classList.add("active");
  document.getElementById("book-title").value = thisBook?.title;

  const todayDate = moment().format("YYYY-MM-DD");
  borrowDateInput.value = todayDate;
  let dueDateCalculated = moment(borrowDateInput.value)
    .add(15, "days")
    .format("YYYY-MM-DD");
  dueDateInput.value = dueDateCalculated;
  borrowDateInput.addEventListener("input", () => {
    dueDateCalculated = moment(borrowDateInput.value)
      .add(15, "days")
      .format("YYYY-MM-DD");
    dueDateInput.value = dueDateCalculated;
  });

  borrowNowBtn.addEventListener("click", handleBorrow);
}
async function handleBorrow() {
  const bookList = await getData("book");
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

  const borrowObj = {
    borrow_date: moment().format("YYYY-MM-DD"),
    due_date: dueDate,
    status: "Pending",
    return_date: "-",
    book_id: bookId,
    user_id: thisUser.id,
    username: thisUser.name,
    remarks: null,
    borrow_id: generateGuid()
  };
  thisBook.isBorrowable = false;
  borrowList.push(borrowObj);
  localStorage.setItem("borrow-list", JSON.stringify(borrowList));
  closeBorrowModal();
  showBookDetails();
}

function closeBorrowModal() {
  document.querySelector(".backdrop").classList.remove("active");
  document.querySelector(".modal").classList.remove("active");
}
