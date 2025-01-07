const GRID_WIDTH = 18;
const GRID_HEIGHT = 18;
const GRID_PIXELS = GRID_WIDTH * GRID_HEIGHT;

const imageGridContainer = document.getElementsByClassName(
	"image-grid-container"
)[0];

for (let i = 0; i < GRID_PIXELS; ++i) {
	const pixelContainer = document.createElement("div");

	pixelContainer.className = "pixel-container";
	pixelContainer.dataset.index = `pixel-${i}`;

	imageGridContainer.appendChild(pixelContainer);
}
