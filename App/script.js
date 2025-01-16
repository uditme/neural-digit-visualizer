const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;
const GRID_PIXELS = GRID_WIDTH * GRID_HEIGHT;

const L1_NEURONS = 20;
const L2_NEURONS = 16;
const L3_NEURONS = 11;

//! ---- ---- ---- ---- ---- !//

const imageGridContainer = document.getElementsByClassName(
	"image-grid-container"
)[0];
const neuronsConnections = document.getElementById("neurons-connections");
const toggleDataCollectionInput = document.getElementById(
	"toggle-data-collection-mode"
);
const clearGridButton = document.getElementById("clear-grid");
const saveExampleButton = document.getElementById("save-example");
const inputNumberToPredict = document.getElementById("number-to-predict");
const clearPixelButton = document.getElementById("clear-pixel");
const firstLayer = document.getElementById("layer-1");
const secondLayer = document.getElementById("layer-2");
const thirdLayer = document.getElementById("layer-3");

//! ---- ---- ---- ---- ---- !//

let pixelsContainer;
let numberToPredict = -1;
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

// generateNeuronsConnections(
// 	"neuron-container neuron-l1",
// 	"neuron-container neuron-l2"
// );

modelComputations(imagePixelValues);
fillVisitedPixels();

clearGridButton.addEventListener("click", function () {
	clearImageGrid();
	modelComputations(Array(400).fill(0));
});
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
	if (!pixelsContainer || pixelsContainer.length === 0) return;

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

	Array.from(pixelsContainer).forEach(function (pixelContainer, i) {
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
	if (!pixelsContainer || pixelsContainer.length === 0) return;

	Array.from(pixelsContainer).forEach(function (pixelContainer, i) {
		pixelContainer.classList.remove("is-visited");
		if (imagePixelValues[i]) {
			imagePixelValues[i] = 0;
		}
	});

	numberToPredict = -1;
	inputNumberToPredict.value = -1;
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

		const activationLvel = document.createElement("div");
		activationLvel.className = `activation-level ${className}`;
		neuronContainer.appendChild(activationLvel);

		layer.appendChild(neuronContainer);
	}
}

function modelComputations(imageOfNumber) {
	if (toggleDataCollectionInput.checked) return;

	fetch("http://127.0.0.1:5000/process", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ array: imageOfNumber }),
	})
		.then((response) => response.json())
		.then((data) => {
			showActivations(data.L1_prbs, "neuron-l1", 2);
			showActivations(data.L2_prbs, "neuron-l2");
			showActivations(data.L3_prbs, "neuron-l3");
		})
		.catch((err) => console.error(`Error sending data to Python! ${err}`));
}

// function generateNeuronsConnections(startLayerClassName, endLayerClassName) {
// 	const startLayerNeurons =
// 		document.getElementsByClassName(startLayerClassName);
// 	if (!startLayerNeurons) return;

// 	const endLayerNeurons = document.getElementsByClassName(endLayerClassName);
// 	if (!endLayerNeurons) return;

// 	let neuronsConnection = document.createElement("div");
// 	neuronsConnection.className = "neurons-connection";

// 	let startLayerNeuron = startLayerNeurons[1];
// 	let endLayerNeuron = endLayerNeurons[10];

// 	let startX = startLayerNeuron.offsetLeft + startLayerNeuron.offsetWidth;
// 	let startY = startLayerNeuron.offsetTop + startLayerNeuron.offsetHeight / 2;

// 	let endX = endLayerNeuron.offsetLeft;
// 	let endY = endLayerNeuron.offsetTop + endLayerNeuron.offsetHeight / 2;

// 	neuronsConnection.style.left = `${startX}px`;
// 	neuronsConnection.style.top = `${startY}px`;
// 	neuronsConnection.style.width = `${endX - startX}px`;
// 	neuronsConnection.style.height = `${endY - startY}px`;

// 	neuronsConnections.appendChild(neuronsConnection);

// 	// Array.prototype.forEach.call(startLayerNeurons, function (_, i) {
// 	// 	Array.prototype.forEach.call(endLayerNeurons, function (_, j) {
// 	// 		let neuronsConnection = document.createElement("div");
// 	// 		neuronsConnection.className = "neurons-connection";

// 	// 		let startLayerNeuron = startLayerNeurons[0];
// 	// 		let endLayerNeuron = endLayerNeurons[0];

// 	// 		let startX = startLayerNeuron.offsetRight; //+ startLayerNeuron.offsetWidth / 2;
// 	// 		let startY =
// 	// 			startLayerNeuron.offsetTop + startLayerNeuron.offsetHeight / 2;

// 	// 		let endX = endLayerNeuron.offsetLeft; // + endLayerNeuron.offsetWidth / 2;
// 	// 		let endY = endLayerNeuron.offsetTop + endLayerNeuron.offsetHeight / 2;

// 	// 		neuronsConnection.style.left = `${startX}px`;
// 	// 		neuronsConnection.style.top = `${startY}px`;
// 	// 		neuronsConnection.style.width = `${endX - startX}px`;
// 	// 		neuronsConnection.style.height = `${endY - startY}px`;

// 	// 		neuronsConnections.appendChild(neuronsConnection);
// 	// 	});
// 	// });
// }

function showActivations(activations, className, coeff = 1) {
	const activationLevels = document.getElementsByClassName(
		`activation-level ${className}`
	);

	if (!activationLevels || activationLevels.length === 0) return;

	const activationsAsNumbers = activations
		.split(",")
		.map((act) => parseFloat(act.trim()));

	Array.from(activationLevels).forEach(function (activationLevel, i) {
		activationLevel.style.width = `${Math.min(
			94,
			Math.max(0, activationsAsNumbers[i] * coeff - 6)
		)}%`;
	});
}
