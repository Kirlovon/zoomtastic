<p align="center">
	<img src="https://raw.githubusercontent.com/Kirlovon/Zoomtastic/master/assets/logo.png" alt="Zoomtastic Logo" width="256">
</p>

<h3 align="center">Zoomtastic</h3>
<p align="center"><i>Tiny image zoomer for web!</i></p>

<p align="center">
	<img src="https://img.shields.io/github/license/Kirlovon/Zoomtastic.svg" alt="License">
	<img src="https://img.shields.io/github/last-commit/Kirlovon/Zoomtastic.svg" alt="Last commit">
	<img src="https://img.shields.io/npm/v/zoomtastic.svg" alt="NPM version">
	<img src="https://img.shields.io/npm/types/zoomtastic.svg" alt="Types">
</p>

<a href="https://kirlovon.github.io/Zoomtastic/">
	<h4 align="center">🔎 Demo</h4>
</a>

## Features

-   📊 Lightweight _( Around ***2kb*** gzipped )_
-   🥂 Short and simple API
-   📚 Typescript support
-   📦 No dependencies

## Installation

Installation via [NPM](https://www.npmjs.com/package/zoomtastic) repository:

```bash
npm install zoomtastic --save
```

or via [CDN](https://unpkg.com/):

```html
<script src="https://unpkg.com/zoomtastic"></script>
```

## Example

```html
<body>
	<!-- Possible ways to image zooming -->
	<img zoomtastic src="https://via.placeholder.com/200" />
	<img zoomtastic="https://via.placeholder.com/900" src="https://via.placeholder.com/300" />
	<div zoomtastic="https://via.placeholder.com/400">Click to open!</div>

	<script src="https://unpkg.com/zoomtastic"></script>
	<script>
		const viewer = new Zoomtastic({
			// Transition duration
			duration: 200,

			// Cursor on hover
			zoomInCursor: 'zoom-in',
			zoomOutCursor: 'zoom-out',

			// Styles for the elements
			background: 'rgba(0, 0, 0, 0.75)',
			easing: 'linear',
			zIndex: '16777271',

			// Parameters used when the image is shown
			x: 0.5,
			y: 0.5,
			scale: 0.95,

			// Initial parameters used when image is hidden
			initialX: 0.5,
			initialY: 0.6,
			initialScale: 0.9,
		});

		// Listen for an elements that contains specified attribute
		viewer.listen('zoomtastic');

		// Show image viewer
		viewer.show('https://via.placeholder.com/600');

		// Hide image viewer
		viewer.hide();

		// Events
		viewer.beforeShow = () => console.log('Showing...');
		viewer.afterShow = () => console.log('Shown!');
		viewer.beforeHide = () => console.log('Hidding...');
		viewer.afterHide = () => console.log('Hidden!');
	</script>
</body>
```

## License

[MIT](https://github.com/Kirlovon/Zoomtastic/blob/master/LICENSE)
