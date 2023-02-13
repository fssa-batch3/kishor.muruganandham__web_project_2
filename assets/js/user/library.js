


let bookData = JSON.parse(localStorage.getItem("book_list"));

for (const book of bookData) {
    const bookRack = document.querySelector(".generated-books");

    generateBook(book, bookRack, bookData);
}


const user_data = JSON.parse(localStorage.getItem("user_data"))
const data = user_data;
let id = localStorage.getItem("id");
let userId = data.find((u) => u.id == id);

toggleFavourites();

checkForFavourites();

getBookDetails()

// borrowModal()

function tagFilterBooks(value) {
    const btns = document.querySelectorAll(".library-tags button");

    
    for (let btn of btns) {
        if (value.toLowerCase() == btn.innerHTML.toLowerCase().trim()) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");					
        }
    }

    let Books = document.querySelectorAll(".book-cover");

    for (let i of Books) {
        let book = i.dataset.filterTag.toLowerCase();
        if (value.toLowerCase() == "all") {
            i.parentElement.style.display = "block";
        } else if (book.includes(value.toLowerCase())) {
            i.parentElement.style.display = "block";
        } else if (!book.includes(value.toLowerCase())) {
            i.parentElement.style.display = "none";
        }
    }
}