const submitButton = document.getElementById("movie-submit");

class Movie {
	constructor(title, score) {
		if (title.length < 2) {
			alert(`${this.title} is not valid: title must contain two or more characters.`);
			return;
		}
		
		this.title = title;
		this.score = score;
		
		this.addLI();
	}
	
	addLI() {
		const liText = `<li><em>${this.title}</em> <strong>${this.score}</strong> <button>x</button></li>`;
		$('#movie-list')
			.append(liText);

		$('button').on('click', (e) => {
			$(e.target).parent().remove()
		});
	}
}

$('#movie-submit').on('click', (e) => {
	e.preventDefault();

	let title = $('#movie-title').val();
	let score = parseInt($('#movie-score').val());

	new Movie(title, score);
	
	$('#movie-form').trigger('reset');
	//document.getElementById('movie-form').reset();
});