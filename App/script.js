const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const GRID_PIXELS = GRID_WIDTH * GRID_HEIGHT;

const L1_NEURONS = 25;
const L2_NEURONS = 15;
const L3_NEURONS = 10;

//! ---- ---- ---- ---- ---- !//

const imageGridContainer = document.getElementsByClassName(
	"image-grid-container"
)[0];

const clearGridButton = document.getElementById("clear-grid");
const saveExampleButton = document.getElementById("save-example");
const inputNumberToPredict = document.getElementById("number-to-predict");
const clearPixelButton = document.getElementById("clear-pixel");

const firstLayer = document.getElementById("layer-1");
const secondLayer = document.getElementById("layer-2");
const thirdLayer = document.getElementById("layer-3");

//! ---- ---- ---- ---- ---- !//

let pixelsContainer;
let numberToPredict = null;
let isLeftShiftPressed = false;
let isClearPixelActive = false;

const imagePixelValues = new Proxy(Array(400).fill(0), {
	set(target, property, value) {
		target[property] = value;

		modelComputations(target);

		return true;
	},
});

//! ---- ---- ---- ---- ---- !//

generateImageGrid();

generateLayer(firstLayer, L1_NEURONS, "neuron-l1");
generateLayer(secondLayer, L2_NEURONS, "neuron-l2");
generateLayer(thirdLayer, L3_NEURONS, "neuron-l3");

fillVisitedPixels();
clearGridButton.addEventListener("click", clearImageGrid);
saveExampleButton.addEventListener("click", saveNewTrainingExample);
clearPixelButton.addEventListener("click", toggleClearPixelStatus);

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
			if (isLeftShiftPressed && !isClearPixelActive) {
				this.classList.add("is-visited");
				if (!imagePixelValues[i]) {
					imagePixelValues[i] = 1;
				}
			}

			if (isClearPixelActive) {
				this.classList.add("nohover");
				this.classList.remove("is-visited");
				if (imagePixelValues[i]) {
					imagePixelValues[i] = 0;
				}
			}
		};

		pixelContainer.onmouseout = function (target) {
			this.classList.remove("nohover");
		};
	});
}

function clearImageGrid() {
	pixelsContainer = document.getElementsByClassName("pixel-container");
	if (!pixelsContainer) return;

	Array.prototype.forEach.call(pixelsContainer, function (pixelContainer, i) {
		pixelContainer.classList.remove("is-visited");
		if (imagePixelValues[i]) {
			imagePixelValues[i] = 0;
		}
	});

	// numberToPredict = null;
	// inputNumberToPredict.value = null;
}

function toggleClearPixelStatus() {
	isClearPixelActive = !isClearPixelActive;
	clearPixelButton.classList.toggle("active");
}

function saveNewTrainingExample() {
	const imageData = imagePixelValues.join(",");
	numberToPredict = inputNumberToPredict.value;

	const fileName = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];

	const imageDataBlob = new Blob([imageData], { type: "text/plain" });
	const imageDataLink = document.createElement("a");
	imageDataLink.href = URL.createObjectURL(imageDataBlob);
	imageDataLink.download = `x__${fileName}.txt`;
	imageDataLink.click();

	const numberToPredictBlob = new Blob([numberToPredict], {
		type: "text/plain",
	});
	const numberToPredictLink = document.createElement("a");
	numberToPredictLink.href = URL.createObjectURL(numberToPredictBlob);
	numberToPredictLink.download = `y__${fileName}.txt`;
	numberToPredictLink.click();
}

function generateLayer(layer, neuronsNumber, className) {
	for (let i = 0; i < neuronsNumber; ++i) {
		const neuronContainer = document.createElement("div");
		neuronContainer.className = `neuron-container ${className}`;
		layer.appendChild(neuronContainer);
	}
}

function modelComputations(imageOfNumber) {
	fetch("http://127.0.0.1:5000/process", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ array: imageOfNumber }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Processed data from Python:", data.nbr);
		})
		.catch(() => console.error("Error sending data to Python!"));
}
