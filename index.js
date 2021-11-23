let searchBtn = document.getElementById("searchBtn");
let inp = document.getElementById("input");
let word_div = document.getElementById("word-content");
searchBtn.addEventListener("click", function (e) {
	e.preventDefault();
	if (inp.value == "") {
		word_div.innerHTML = "Please enter a word to search";
		setTimeout(() => {
			word_div.innerHTML = "";
		}, 2000);
	} else {
		let xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`https://api.dictionaryapi.dev/api/v2/entries/en/${inp.value}`,
			true
		);
		xhr.onprogress = function () { 
			console.log("On Progress");
		};

		xhr.onload = function () {
			if (this.status == 200) {
				let res = this.response;
				let json = JSON.parse(res);
				let word = json[0];
				word.meanings.forEach((element) => {
					console.log(element.partOfSpeech);
					element.definitions.forEach((ele) => {
						console.log(ele.definition);
					});
				});
				console.log(word);
			} else console.log("Some Error Occured");
		};

		xhr.send();
	}
});
