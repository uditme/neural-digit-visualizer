const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const GRID_PIXELS = GRID_WIDTH * GRID_HEIGHT;

const imageGridContainer = document.getElementsByClassName(
	"image-grid-container"
)[0];
const clearGridButton = document.getElementById("clear-grid");

//! ---- ---- ---- ---- ---- !//

let pixelsContainer;

//! ---- ---- ---- ---- ---- !//

generateImageGrid();
fillVisitedPixels();
clearGridButton.addEventListener("click", clearImageGrid);

//! ---- ---- ---- ---- ---- !//

function generateImageGrid() {
	for (let i = 0; i < GRID_PIXELS; ++i) {
		const pixelContainer = document.createElement("div");

		pixelContainer.className = "pixel-container";
		pixelContainer.dataset.index = `pixel-${Math.floor(i / GRID_WIDTH)}-${
			i % GRID_WIDTH
		}`;

		imageGridContainer.appendChild(pixelContainer);
	}
}

function fillVisitedPixels() {
	pixelsContainer = document.getElementsByClassName("pixel-container");
	if (!pixelsContainer) return;

	let isLeftShiftPressed = false;

	document.onkeydown = function (event) {
		if (event.code === "ShiftLeft") {
			isLeftShiftPressed = true;
		}
	};

	document.onkeyup = function (event) {
		if (event.code === "ShiftLeft") {
			isLeftShiftPressed = false;
		}
	};

	Array.prototype.forEach.call(pixelsContainer, function (pixelContainer, i) {
		pixelContainer.onmouseover = function (target) {
			if (isLeftShiftPressed) {
				this.classList.add("is-visited");
			}
		};
	});
}

function clearImageGrid() {
	pixelsContainer = document.getElementsByClassName("pixel-container");
	if (!pixelsContainer) return;

	Array.prototype.forEach.call(pixelsContainer, function (pixelContainer, i) {
		pixelContainer.classList.remove("is-visited");
	});
}
