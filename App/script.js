const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const GRID_PIXELS = GRID_WIDTH * GRID_HEIGHT;

const imageGridContainer = document.getElementsByClassName(
	"image-grid-container"
)[0];
const clearGridButton = document.getElementById("clear-grid");
const saveExampleButton = document.getElementById("save-example");
const inputNumberToPredict = document.getElementById("number-to-predict");

//! ---- ---- ---- ---- ---- !//

let pixelsContainer;
let numberToPredict = null;
const imagePixelValues = Array.from({ length: 400 }, () => 0);

//! ---- ---- ---- ---- ---- !//

generateImageGrid();
fillVisitedPixels();
clearGridButton.addEventListener("click", clearImageGrid);
saveExampleButton.addEventListener("click", saveNewTrainingExample);

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
				imagePixelValues[i] = 1;
			}
		};
	});
}

function clearImageGrid() {
	pixelsContainer = document.getElementsByClassName("pixel-container");
	if (!pixelsContainer) return;

	Array.prototype.forEach.call(pixelsContainer, function (pixelContainer, i) {
		pixelContainer.classList.remove("is-visited");
		imagePixelValues[i] = 0;
	});

	numberToPredict = null;
	inputNumberToPredict.value = null;
}

function saveNewTrainingExample() {
	const imageData = imagePixelValues.join(",");
	numberToPredict = inputNumberToPredict.value;

	const fileName = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];

	const imageDataBlob = new Blob([imageData], { type: "text/plain" });
	const imageDataLink = document.createElement("a");
	imageDataLink.href = URL.createObjectURL(imageDataBlob);
	imageDataLink.download = `input_${fileName}.txt`;
	imageDataLink.click();

	const numberToPredictBlob = new Blob([numberToPredict], {
		type: "text/plain",
	});
	const numberToPredictLink = document.createElement("a");
	numberToPredictLink.href = URL.createObjectURL(numberToPredictBlob);
	numberToPredictLink.download = `output_${fileName}.txt`;
	numberToPredictLink.click();
}
