const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", e => {
	const searchTerm = searchInput.value;
	const searchLimit = document.querySelector("#limit").value;
	if (!searchTerm) {
		showMessage("Please add a search term", "alert-danger");
	} else {
		showMessage("Searching...", "alert-success");
	}
	searchReddit(searchTerm, searchLimit);
	searchInput.value = "";
	e.preventDefault();
});

function showMessage(message, classname) {
	const div = document.createElement("div");
	div.className = `alert ${classname}`;
	div.appendChild(document.createTextNode(message));
	document
		.querySelector("#search-container")
		.insertAdjacentElement("afterBegin", div);

	setTimeout(() => {
		document.querySelector(".alert").remove();
	}, 2000);
}

function searchReddit(term, limit) {
	axios.get(`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=nZnPNxjesCWHL5dA81NnHrx8UFV5YArR&limit=${limit}`)
		.then(res => {
			const gifs = res.data.data;
			let output = '<div class="card-columns">';
			gifs.forEach(gif => {
				output += `
				<div class="card" style="width: 18rem;">
					<img class="card-img-top" src='${gif.images.original.url}' >
				</div>
				`;
			});
			output += "</div>";
			document.querySelector("#results").innerHTML = output;

		})
		.catch(err => console.log(err));
}


























