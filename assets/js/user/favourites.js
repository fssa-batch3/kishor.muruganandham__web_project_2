const datas = getUserData();
			let id = localStorage.getItem("id");
			let userId = datas.find((u) => u.id == id);
			let favBooks = userId.favourites;

			if (favBooks.length) {
				for (const i of favBooks) {
					const data = book_list;
					favoBook = data.find((f) => f.isbn == i);
					if (favoBook != undefined) {
						const bookRack = document.querySelector(".generated-books");
						generateBook(favoBook, bookRack, data);
						checkForFavourites();
					}
				}
			} else {
				document.querySelector(
					".favourites-section"
				).innerHTML = `<div class="no-result" style="text-align:center; align-self:center;">
				<img src="../../assets/images/lib_page.svg" alt="lib_page" width="280px">
				<h4 style="margin: 50px 0;">You Haven't Decided <br> your favourites Yet!</h4>
				<a href="./library.html" class="submit" style="padding:15px 30px;">Decide Now</a>
				</div>`;
			}

const user_data = JSON.parse(localStorage.getItem("user_data"))
const data = user_data;
id = localStorage.getItem("id");
userId = data.find((u) => u.id == id);
			toggleFavourites();
			checkForFavourites();
            
getBookDetails()