

let book_list = [
	{
		id: "d8cf433980423b8f",
		isActive: false,
		title: "Eloquent JavaScript, Third Edition",
		subtitle: "A Modern Introduction to Programming",
		author: "Marijn Haverbeke",
		pages: 472,
		language: "English",
		description:
			"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
		image: {
			src: "https://eloquentjavascript.net/img/cover.jpg",
			alt: "Eloquent JavaScript, Third Edition",
		},
		star_rating: 2,
		isBorrowable: true,
		tags: ["fantasy", "business"],
	},
	{
		id: "cbccae00dbe09ca2",
		isActive: true,
		title: "Practical Modern JavaScript",
		subtitle: "Dive into ES6 and the Future of JavaScript",
		author: "Nicolás Bevacqua",
		pages: 334,
		language: "English",
		description:
			"To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
		image: {
			src: "https://camo.githubusercontent.com/18565999d9ce20a73f987f933e1f73586d16dd676f492c99fc9f121c376a210a/68747470733a2f2f692e696d6775722e636f6d2f476254634475562e706e67",
			alt: "Practical Modern JavaScript",
		},
		star_rating: 3.2,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
	{
		id: "ff67691297c2b581",
		isActive: true,
		title: "Understanding ECMAScript 6",
		subtitle: "The Definitive Guide for JavaScript Developers",
		author: "Nicholas C. Zakas",
		pages: 352,
		language: "English",
		description:
			"ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
		image: {
			src: "https://d2sofvawe08yqg.cloudfront.net/understandinges6/s_shelf?1620418785",
			alt: "Understanding ECMAScript 6",
		},
		star_rating: 1.7,
		isBorrowable: true,
		tags: ["fantasy", "business"],
	},
	{
		id: "8f594631c7933107",
		isActive: true,
		title: "Speaking JavaScript",
		subtitle: "An In-Depth Guide for Programmers",
		author: "Axel Rauschmayer",
		pages: 460,
		language: "English",
		description:
			"Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
		image: {
			src: "http://speakingjs.com/speakingjs_cover_large.jpg",
			alt: "Speaking JavaScript",
		},
		star_rating: 4.3,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
	{
		id: "3bfef6182e62a991",
		isActive: true,
		title: "Learning JavaScript Design Patterns",
		subtitle: "A JavaScript and jQuery Developer's Guide",
		author: "Addy Osmani",
		pages: 254,
		language: "English",
		description:
			"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
		image: {
			src: "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
			alt: "Learning JavaScript Design Patterns",
		},
		star_rating: 5,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "9f052f03740a37db",
		isActive: true,
		title: "You Don't Know JS Yet",
		subtitle: "Get Started",
		author: "Kyle Simpson",
		pages: 143,
		language: "English",
		description:
			"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
		image: {
			src: "https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/get-started/images/cover.png",
			alt: "You Don't Know JS Yet",
		},
		star_rating: 2.5,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "0f455d4914ec46e3",
		isActive: true,
		title: "Pro Git",
		subtitle: "Everything you neeed to know about Git",
		author: "Scott Chacon and Ben Straub",
		pages: 458,
		language: "English",
		description:
			"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
		image: { src: "https://git-scm.com/images/progit2.png", alt: "Pro Git" },
		star_rating: 5,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "2a7c71cb87b2fe11",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 2.4,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "3ea054a9c59db03a",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 3.7,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "45374ffe90b61a8e",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			alt: "Rethinking Productivity in Software Engineering",
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
		},
		star_rating: 1.8,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "0e21d29ea26875f8",
		isActive: true,
		title: "Pro Git",
		subtitle: "Everything you neeed to know about Git",
		author: "Scott Chacon and Ben Straub",
		pages: 458,
		language: "English",
		description:
			"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
		image: { src: "https://git-scm.com/images/progit2.png", alt: "Pro Git" },
		star_rating: 5,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "690fdd2ea78a00bc",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 2.4,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "473f0f0f6aec8c7a",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			alt: "Rethinking Productivity in Software Engineering",
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
		},
		star_rating: 3.7,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "b2a6054df7cdac1b",
		isActive: true,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		language: "English",
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 1.8,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "09f45ec26a3f357a",
		isActive: true,
		title: "Eloquent JavaScript, Third Edition",
		subtitle: "A Modern Introduction to Programming",
		author: "Marijn Haverbeke",
		pages: 472,
		language: "English",
		description:
			"JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
		image: {
			src: "https://eloquentjavascript.net/img/cover.jpg",
			alt: "Eloquent JavaScript, Third Edition",
		},
		star_rating: 2,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "239ed93b484cea2e",
		isActive: true,
		title: "Practical Modern JavaScript",
		subtitle: "Dive into ES6 and the Future of JavaScript",
		author: "Nicolás Bevacqua",
		pages: 334,
		language: "English",
		description:
			"To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
		image: {
			src: "https://camo.githubusercontent.com/18565999d9ce20a73f987f933e1f73586d16dd676f492c99fc9f121c376a210a/68747470733a2f2f692e696d6775722e636f6d2f476254634475562e706e67",
			alt: "Practical Modern JavaScript",
		},
		star_rating: 3.2,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "f9b4a1fab113bdff",
		isActive: true,
		title: "Understanding ECMAScript 6",
		subtitle: "The Definitive Guide for JavaScript Developers",
		author: "Nicholas C. Zakas",
		pages: 352,
		language: "English",
		description:
			"ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
		image: {
			src: "https://d2sofvawe08yqg.cloudfront.net/understandinges6/s_shelf?1620418785",
			alt: "Understanding ECMAScript 6",
		},
		star_rating: 1.7,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "12076f1fd527aa0e",
		isActive: true,
		title: "Speaking JavaScript",
		subtitle: "An In-Depth Guide for Programmers",
		author: "Axel Rauschmayer",
		pages: 460,
		language: "English",
		description:
			"Like it or not, JavaScript is everywhere these days -from browser to server to mobile- and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
		image: {
			src: "http://speakingjs.com/speakingjs_cover_large.jpg",
			alt: "Speaking JavaScript",
		},
		star_rating: 4.3,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "2c939ef71c21a42c",
		isActive: true,
		title: "Learning JavaScript Design Patterns",
		subtitle: "A JavaScript and jQuery Developer's Guide",
		author: "Addy Osmani",
		pages: 254,
		language: "English",
		description:
			"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
		image: {
			src: "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
			alt: "Learning JavaScript Design Patterns",
		},
		star_rating: 5,
		isBorrowable: true,
		tags: ["fantasy", "business", "education"],
	},
	{
		id: "1e957f1b13b60f23",
		isActive: true,
		title: "You Don't Know JS Yet",
		subtitle: "Get Started",
		author: "Kyle Simpson",
		pages: 143,
		language: "English",
		description:
			"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
		image: {
			src: "https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/get-started/images/cover.png",
			alt: "You Don't Know JS Yet",
		},
		star_rating: 2.5,
		isBorrowable: false,
		tags: ["fantasy", "business", "education"],
	},
];
const kishoruser =[
	{
	  "json_id": "1",
	  "id": "b4f4be31b87d94e1",
	  "first_name": "Kishor",
	  "last_name": "M",
	  "name": "Kishor M",
	  "role": "user",
	  "dob": "2023-03-01",
	  "phone_number": "",
	  "age": 0,
	  "isActive": true,
	  "username": "kmuruganandham@fssa.freshworks.com",
	  "password": "1234kishor",
	  "profile": "https://ui-avatars.com/api/?name=KishorM&rounded=true&uppercase=false&background=random",
	  "favourites": [
		"3bfef6182e62a991"
	  ]
	},
	{
	  "json_id": "2",
	  "id": "afa44888216bc7aa",
	  "first_name": "sridevan",
	  "last_name": "Nanthagopal",
	  "name": "sridevan Nanthagopal",
	  "role": "user",
	  "dob": "2023-03-08",
	  "phone_number": null,
	  "age": null,
	  "isActive": true,
	  "username": "srnanthagopal@fssa.freshworks.com",
	  "password": "12345sri",
	  "profile": "https://ui-avatars.com/api/?name=sridevanNanthagopal&rounded=true&uppercase=false&background=random",
	  "favourites": [
		"cbccae00dbe09ca2"
	  ]
	},
	{
	  "json_id": "3",
	  "id": "809567a6485c5523",
	  "first_name": "Mohammed",
	  "last_name": "Ajmal",
	  "name": "Mohammed Ajmal",
	  "role": "admin",
	  "dob": "2003-03-01",
	  "phone_number": "",
	  "age": 20,
	  "isActive": true,
	  "username": "ajmal@gmail.com",
	  "password": "12345ajmal",
	  "profile": "https://ca.slack-edge.com/T032648LE-U041V83A4PL-e856d93352f7-192",
	  "favourites": []
	},
	{
	  "json_id": "4",
	  "id": "c38b776abc4f264e",
	  "first_name": "Surya",
	  "last_name": "Umapathy",
	  "name": "Surya Umapathy",
	  "role": "user",
	  "dob": "2023-08-30",
	  "phone_number": null,
	  "age": null,
	  "isActive": true,
	  "username": "email@gamil.com",
	  "password": "S@1234567890",
	  "profile": "https://ui-avatars.com/api/?name=SuryaUmapathy&rounded=true&uppercase=false&background=random",
	  "favourites": []
	}
  ]
async function setBook(){

	try {
		const response = await fetch(
      `https://library-management-53e19-default-rtdb.firebaseio.com/Users.json`,
      {
		  method: "GET",
		  headers: {
			  "Content-Type": "application/json"
			},
			body : JSON.stringify(kishoruser)
		}
    );
	console.log(await response.json());
} catch (error) {
	console.error(error);
}
}

// setBook()