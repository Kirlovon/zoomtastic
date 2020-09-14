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

<p align="center">
  <a href="https://kirlovon.github.io/Zoomtastic/">🔎 Demo</a>
</p>

## Features
- 📊 Lightweight _( Less than ***2kb*** gzipped )_
- 🥂 Short and simple API
- 📦 No dependencies

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

		// Change default 
		// Listen for an elements that contains specified attribute
		Zoomtastic.listen('zoomtastic');

		// Show image viewer
		Zoomtastic.show('https://via.placeholder.com/600');

		// Hide image viewer
		Zoomtastic.hide();

	</script>
</body>
```

## License

[MIT](https://github.com/Kirlovon/Zoomtastic/blob/master/LICENSE)
