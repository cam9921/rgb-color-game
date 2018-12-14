const squares = document.querySelectorAll('.square')
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let header = document.querySelector('h1')
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');
let colors, pickedColor, clickedColor, modeText, numSquares;

init();

function init() {
	addButtonListeners();
	numSquares = 9;
	startGame(numSquares)
}

function addButtonListeners() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			modeButtons[2].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === "Easy" ? numSquares = 3 : this.textContent === "Medium" ? numSquares = 6 : numSquares = 9;
			startGame(numSquares);
		});
	}
	resetButton.addEventListener('click', function() {
		startGame(numSquares);
	});
}

function startGame(numColors) {
	colors = generateRandomColors(numColors);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = '';
	header.style.backgroundColor = 'steelblue';
	resetButton.textContent = 'New Colors';
	setUpSquares();
}

function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
			squares[i].addEventListener("click", function() {
				clickedColor = this.style.backgroundColor;
				if(clickedColor === pickedColor) {
					messageDisplay.textContent = 'Correct!'
					resetButton.textContent = 'Play Again?'
					changeColors(clickedColor);
					header.style.backgroundColor = clickedColor
				} else {
					this.style.backgroundColor = '#232323';
					messageDisplay.textContent = 'Try Again!'
				}
			});
		} else {
			squares[i].style.display = 'none';
		}
	}
}

function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
} 

function pickColor() {
	let randIndex = randomValue(colors.length);
	return colors[randIndex];
}

function generateRandomColors(size) {
	let colorArray = [];

	for(var i = 0; i < size; i++) {
		colorArray[i] = randomColor();
	}

	return colorArray;
}

function randomColor() {
	let r = randomValue(256);
	let g = randomValue(256);
	let b = randomValue(256);
	return `rgb(${r}, ${g}, ${b})`
}

function randomValue(x) {
	return Math.floor(Math.random() * x);
}




