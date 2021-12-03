let searchBtn = document.getElementById("searchBtn");
let inp = document.getElementById("input");
let word_div = document.getElementById("word-content");
let main = document.getElementById("main");
searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	let regex = /^[a-zA-Z]+$/;
	console.log(regex.test(inp.value));
	if (inp.value === "" || !regex.test(inp.value)) {
		word_div.innerHTML = "Please enter a valid word to search";
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

		// xhr.onprogress = function () {
		// 	console.log("On Progress");
		// };

		xhr.onload = function () {
			if (this.status == 200) {
				word_div.style.background = "transparent";
				word_div.style.height = "auto";
				let res = this.response;
				let json = JSON.parse(res);
				let word = json[0];
				let str = `<div class="card" style="width: 100%; text-align: left !important; background-color: rgb(243, 243, 243) !important;
        border: none !important;">
                    <div class="card-body">
                      <h5 class="card-title" style="font-weight: bolder">${inp.value}</h5>`;
				word.meanings.forEach((element) => {
					let initials = "as ";
					if (
						element.partOfSpeech.charAt(0) === "a" ||
						element.partOfSpeech.charAt(0) === "e" ||
						element.partOfSpeech.charAt(0) === "i" ||
						element.partOfSpeech.charAt(0) === "o" ||
						element.partOfSpeech.charAt(0) === "u"
					)
						initials += "an ";
					else initials += "a ";
					str += `<div><p style="text-decoration: underline;"><em>${initials}<strong>${element.partOfSpeech}</strong></em></p>`;
					element.definitions.forEach((ele) => {
						str += `<p style="margin:0; padding:0">${ele.definition}</p>`;
						str += `<p><strong>eg.</strong> ${ele.example}</p>`;
					});
					str += `</div>`;
				});
				str += `</div></div>`;
				word_div.innerHTML = str;
				inp.value = "";
			} else {
				console.log("Running");
				let divWidth = word_div.offsetWidth;
				let vwHeight = document.documentElement.clientHeight;
				let mainHeight = main.offsetHeight;
				console.log(vwHeight, mainHeight);
				let remHeight = vwHeight - mainHeight;
				let optimalSize = Math.min(remHeight, divWidth);
				let back = (optimalSize - 200 > 140 ? optimalSize - 200 : 140) + "px";
				console.log(back);
				word_div.style.height = remHeight - 40 + "px";
				word_div.style.background = `url('./noData.svg') no-repeat center center`;

				word_div.style.backgroundSize = `${back} ${back}`;
			}
		};

		xhr.send();
	}
});
