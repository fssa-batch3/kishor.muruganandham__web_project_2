const popular_book_list = [
	{
		isbn: 9781593279509,
		title: "Eloquent JavaScript, Third Edition",
		subtitle: "A Modern Introduction to Programming",
		author: "Marijn Haverbeke",
		pages: 472,
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
		isbn: 9781491943533,
		title: "Practical Modern JavaScript",
		subtitle: "Dive into ES6 and the Future of JavaScript",
		author: "Nicolás Bevacqua",
		pages: 334,
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
		isbn: 9781593277574,
		title: "Understanding ECMAScript 6",
		subtitle: "The Definitive Guide for JavaScript Developers",
		author: "Nicholas C. Zakas",
		pages: 352,
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
		isbn: 9781449365035,
		title: "Speaking JavaScript",
		subtitle: "An In-Depth Guide for Programmers",
		author: "Axel Rauschmayer",
		pages: 460,
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
		isbn: 9781449331818,
		title: "Learning JavaScript Design Patterns",
		subtitle: "A JavaScript and jQuery Developer's Guide",
		author: "Addy Osmani",
		pages: 254,
		description:
			"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
		image: {
			src: "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
			alt: "Learning JavaScript Design Patterns",
		},
		star_rating: 5,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9798602477429,
		title: "You Don't Know JS Yet",
		subtitle: "Get Started",
		author: "Kyle Simpson",
		pages: 143,
		description:
			"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
		image: {
			src: "https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/get-started/images/cover.png",
			alt: "You Don't Know JS Yet",
		},
		star_rating: 2.5,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484200766,
		title: "Pro Git",
		subtitle: "Everything you neeed to know about Git",
		author: "Scott Chacon and Ben Straub",
		pages: 458,
		description:
			"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
		image: {
			src: "https://git-scm.com/images/progit2.png",
			alt: "Pro Git",
		},
		star_rating: 5,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 2.4,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
];

const intresting_book_list = [
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 2.4,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 3.7,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			alt: "Rethinking Productivity in Software Engineering",
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
		},
		star_rating: 1.8,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484200766,
		title: "Pro Git",
		subtitle: "Everything you neeed to know about Git",
		author: "Scott Chacon and Ben Straub",
		pages: 458,
		description:
			"Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
		image: {
			src: "https://git-scm.com/images/progit2.png",
			alt: "Pro Git",
		},
		star_rating: 5,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 2.4,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			alt: "Rethinking Productivity in Software Engineering",
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
		},
		star_rating: 3.7,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781484242216,
		title: "Rethinking Productivity in Software Engineering",
		subtitle: "",
		author: "Caitlin Sadowski, Thomas Zimmermann",
		pages: 310,
		description:
			'Get the most out of this foundational reference and improve the productivity of your software teams. This open access book collects the wisdom of the 2017 "Dagstuhl" seminar on productivity in software engineering, a meeting of community leaders, who came together with the goal of rethinking traditional definitions and measures of productivity.',
		image: {
			src: "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp",
			alt: "Rethinking Productivity in Software Engineering",
		},
		star_rating: 1.8,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9781593279509,
		title: "Eloquent JavaScript, Third Edition",
		subtitle: "A Modern Introduction to Programming",
		author: "Marijn Haverbeke",
		pages: 472,
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
		isbn: 9781491943533,
		title: "Practical Modern JavaScript",
		subtitle: "Dive into ES6 and the Future of JavaScript",
		author: "Nicolás Bevacqua",
		pages: 334,
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
		isbn: 9781593277574,
		title: "Understanding ECMAScript 6",
		subtitle: "The Definitive Guide for JavaScript Developers",
		author: "Nicholas C. Zakas",
		pages: 352,
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
		isbn: 9781449365035,
		title: "Speaking JavaScript",
		subtitle: "An In-Depth Guide for Programmers",
		author: "Axel Rauschmayer",
		pages: 460,
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
		isbn: 9781449331818,
		title: "Learning JavaScript Design Patterns",
		subtitle: "A JavaScript and jQuery Developer's Guide",
		author: "Addy Osmani",
		pages: 254,
		description:
			"With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
		image: {
			src: "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
			alt: "Learning JavaScript Design Patterns",
		},
		star_rating: 5,
		isBorrowable: true,

		tags: ["fantasy", "business"],
	},
	{
		isbn: 9798602477429,
		title: "You Don't Know JS Yet",
		subtitle: "Get Started",
		author: "Kyle Simpson",
		pages: 143,
		description:
			"The worldwide best selling You Don't Know JS book series is back for a 2nd edition: You Don't Know JS Yet. All 6 books are brand new, rewritten to cover all sides of JS for 2020 and beyond.",
		image: {
			src: "https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/get-started/images/cover.png",
			alt: "You Don't Know JS Yet",
		},
		star_rating: 2.5,
		isBorrowable: false,
		tags: ["fantasy", "business"],
	},
];
