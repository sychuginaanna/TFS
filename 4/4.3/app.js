var randomButtonElement = document.getElementById('randomize');
var randomUserElement = document.getElementById('user');
var errorElement = document.getElementById('error');

randomButtonElement.onclick = function() {
	fetch('https://api.github.com/users')
		.then(
			response => {
				if (response.status != 200) {
					return new Error('Ошибка ' + response.status);
				} else {
					return response.json();
				}
			})
		.then(data => {
			var user = data[Math.floor(Math.random() * data.length)];
			loadImage(user.avatar_url, function() {
				hideError();
				drawUser(user)
			});
		})
		.then(user => loadImage(user)).then(loadedUser => {
		hideError();
		drawUser(loadedUser);
	})
		.catch(error => showError(error))
};

function showError(err) {
	errorElement.textContent = err;
	errorElement.classList.remove('hidden');
	randomUserElement.classList.add('hidden');
}

function hideError() {
	errorElement.classList.add('hidden');
	randomUserElement.classList.remove('hidden');
}


function loadImage(imageUrl, successCallback, errorCallback) {
	return new Promise(function(resolve, reject) {
		var img = new Image();

		img.onload = function() {
			successCallback(img);
		};

		img.onerror = function() {
			errorCallback(new Error('Что-то пошло не так'));
		};
		img.src = imageUrl;
	});
}

function drawUser(data) {
	var img = randomUserElement.querySelector('img');
	var link = randomUserElement.querySelector('a');
	img.src = data.avatar_url;
	img.alt = data.login;
	link.href = data.html_url;
	link.textContent = data.login;
}