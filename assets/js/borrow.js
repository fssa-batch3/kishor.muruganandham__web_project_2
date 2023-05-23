const modalCloseBtn = document.querySelector(".modal-close");
const borrowBtn = document.getElementById("borrow-now");
const borrowBtnElement = document.querySelector(".book-detail-borrow-now");

function openBorrowModal() {
  const borrowNowBtn = document.querySelector(".modal-submit");
  const borrowDateInput = document.getElementById("borrow-date");
  const dueDateInput = document.getElementById("due-date");
  const dueDurationInput = document.getElementById("due-duration");
  const fullBorrowDate = document.querySelector(".full-borrow-date");
  const fullDueDate = document.querySelector(".full-due-date");

  getData("Books")
    .then((booksArr) => {
      const bookList = Object.values(booksArr);
      const thisBook = bookList.find((book) => book.id === bookId);

      document.querySelector(".backdrop").classList.add("active");
      document.querySelector(".modal").classList.add("active");
      document.getElementById("book-title").value = thisBook?.title;

      const durationDate = moment().format("YYYY-MM-DD");
      let dueDateCalculated = moment(durationDate)
        .add(15, "days")
        .format("YYYY-MM-DD");
      borrowDateInput.value = durationDate;
      dueDateInput.value = dueDateCalculated;
      fullBorrowDate.innerText = moment().format("MMMM Do YYYY");
      fullDueDate.innerText = moment(dueDateCalculated).format("MMMM Do YYYY");

      dueDurationInput.addEventListener("change", () => {
        dueDateCalculated = moment(durationDate)
          .add(dueDurationInput.value, "days")
          .format("YYYY-MM-DD");
        dueDateInput.value = dueDateCalculated;
        fullDueDate.innerText =
          moment(dueDateCalculated).format("MMMM Do YYYY");
      });

      borrowNowBtn.addEventListener("click", handleBorrow);
    })
    .catch((error) => {
      console.error(error);
      alert("Error while borrowing book, Please try again. Error: " + error);
    });
}

function handleBorrow() {
  const borrowDateInput = document.getElementById("borrow-date");
  const dueDateInput = document.getElementById("due-date");

  const borrowDate = borrowDateInput.value;
  const dueDate = dueDateInput.value;

  if (!borrowDate || !dueDate) {
    alert("Both Dates are Required");
    return;
  }

  getData("Books")
    .then((bookList) => {
      return getData("Borrows").then((borrowList) => {
        const thisBook = bookList.find((book) => book.id === bookId);

        const borrowedBook = borrowList.find(
          (borrowed) => borrowed.book_id === bookId
        );

        if (borrowedBook && borrowedBook.status == "Pending") {
          alert("Book Already Exists");
          return;
        }

        const borrowId = generateGuid();
        const borrow_date = moment().format("YYYY-MM-DD h:mm A");
        const borrowObj = {
          borrow_date,
          due_date: dueDate,
          status: "Pending",
          return_date: "-",
          book_id: bookId,
          user_id: thisUser.id,
          username: thisUser.name,
          remarks: null,
          borrow_id: borrowId,
        };

        emailjs.init("KyF7Lia_QmwUPjOe5");
        emailjs.send("service_ifbzv8d", "template_lev9n7d", {
          name: thisUser.name,
          borrow_date,
          due_date: dueDate,
          link: `${window.location.origin}/pages/user/history.html`,
          reply_to: thisUser.username,
          book_title: thisBook.title,
        });

        thisBook.isBorrowable = false;
        return patchData(`Books/${thisBook.id}`, thisBook).then(() => {
          return putData(`Borrows/${borrowId}`, borrowObj).then(() => {
            alert(
              `Book Borrowed successfully. Reference mail is sent to : ${thisUser.username}`
            );
            closeBorrowModal();
            showBookDetails();
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Error while borrowing book, Please try again. Error: " + error);
    });
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
});
