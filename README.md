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
- 📊 Lightweight _(***1.27kb*** gzipped)_
- 🥂 Short and simple API
- 🎬 Different animations
- 📦 No dependencies

<br>

## Installation

Installation via [NPM](https://www.npmjs.com/package/zoomtastic) repository:

```bash
npm install zoomtastic --save
```

or via [CDN](https://unpkg.com/):

```html
<script src="https://unpkg.com/zoomtastic@2.2.0"></script>
```

<br>

## Example
API is so simple that you don't even need documentation, take a look at HTML example:
```html
<body>
	<img zoomtastic src="https://via.placeholder.com/100" />
	<img zoomtastic src="https://via.placeholder.com/200" />
	<img zoomtastic src="https://via.placeholder.com/300" />

	<script src="https://unpkg.com/zoomtastic"></script>
	<script>

		// Mount viewer element
		Zoomtastic.mount({
			size: '95%',
			easing: 'ease',
			duration: 300,
			background: 'rgba(0, 0, 0, 0.9)',
			filter: 'drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))',
			animation: 'slide' // Can be slide, fade, zoom or drop
		});

		// Listen for an elements that contains "zoomtastic" attribute, and use "src" attribute as image source
		Zoomtastic.listen('[zoomtastic]', 'src');

		// Show image manually
		Zoomtastic.show('https://via.placeholder.com/600');

		// Hide image
		Zoomtastic.hide();

	</script>
</body>
```
Alternatively, you can use a bundlers like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), [Parcel](https://parceljs.org/) or [Vite](https://vitejs.dev/):
```javascript
import Zoomtastic from 'zoomtastic';

// Mount viewer elements
Zoomtastic.mount();

// Show image viewer manually
Zoomtastic.show('https://via.placeholder.com/256');

// Hide image viewer
Zoomtastic.hide();
```

Or you can import module using [Skypack](https://www.skypack.dev/):
```html
<script type="module">
	import Zoomtastic from 'https://cdn.skypack.dev/zoomtastic@2.2.0';

	// Mount viewer elements
	Zoomtastic.mount();
</script>
```

<br>

## API

### Zoomtastic.mount(_config_)
This function creates and mounts to the page the necessary Zoomtastic elements. If you call this function again, the elements will be recreated.

The configuration is optional, and has these parameters:
* **size** - Image size. _(Default: `95%`)_
* **ease** - Timing function. _(Default: `ease`)_
* **duration** - Animations duration. _(Default: `300`)_
* **background** - Viewer background. _(Default: `rgba(0, 0, 0, 0.9)`)_
* **filter** - CSS filter applied to image. _(Default: `drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))`)_
* **animation** - Animation type. Can be `slide`, `fade`, `zoom` or `drop`. _(Default: `slide`)_ 

### Zoomtastic.listen(_target_, _source_)
Add click event listener to the image elements. By default, it listens to all elements with the attribute `zoomtastic` and takes the image from the `src` attribute. 

The **target** should be a CSS selector, an element or an array of elements.

The **source** argument must be the name of the attribute from which URL to the image will be taken.

### Zoomtastic.show(_url_)
Show image viewer. The **url** argument must be link to the image.

### Zoomtastic.hide()
Hide image viewer.

<br>

## License
[MIT](https://github.com/Kirlovon/Zoomtastic/blob/master/LICENSE)
