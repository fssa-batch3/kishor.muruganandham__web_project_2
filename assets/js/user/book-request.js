const bookReqForm = document.querySelector(".book-request");
const bookName = document.getElementById("book-name");
const authorName = document.getElementById("author-name");
const bookPrice = document.getElementById("price");
const bookDesc = document.getElementById("description");

let book_req = JSON.parse(localStorage.getItem("book_req"));
if (book_req == null || book_req == undefined) {
    book_req = [];
    localStorage.setItem("book_req", JSON.stringify(book_req));
    book_req = JSON.parse(localStorage.getItem("book_req"));
}


bookReqForm.addEventListener("submit", function (e){
    e.preventDefault();
    let bookNameExists = false;
    if (book_req != "") {
       for  ( const i of book_req) {
            if (i["book_name"] == bookName.value) {
               bookNameExists = true
               break;
            };
        };
        if (bookNameExists === true) {
            alert("The book is already requested")
            return
        };
    };
    const bookReq_obj = new Object()
    bookReq_obj.book_name = bookName.value;
    bookReq_obj.author_name = authorName.value;
    bookReq_obj.price = bookPrice.value;
    bookReq_obj.description = bookDesc.value;
    bookReq_obj.log = new Date();
    bookReq_obj.id = book_req.length + 1;
    book_req.push(bookReq_obj);
    JSON.parse(localStorage.getItem("book_req"))
    localStorage.removeItem("book_req")
    localStorage.setItem("book_req",JSON.stringify(book_req))

})


