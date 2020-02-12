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

<br>

## Features

-   📊 Lightweight _( Around ***2kb*** gzipped )_
-   📝 Customizable Animation
-   🥂 Short and Simple API
-   📦 Single-file library
-   📚 Typescript Support

## Instalation

Installation via [NPM](https://www.npmjs.com/package/zoomtastic) repository:

```bash
npm install zoomtastic --save
```

or via [CDN](https://unpkg.com/): _( Should be added at the end of the body )_

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
			// If true, image will be shown only after loading completion
			preload: true,

			// Transition duration
			duration: 150,

			// Delay between container transition and image transition
			delay: 200,

			// Cursor on hover
			zoomInCursor: 'zoom-in',
			zoomOutCursor: 'zoom-out',

			// Styles for the elements
			background: 'rgba(0, 0, 0, 0.75)',
			easing: 'ease-out',
			zIndex: '16777271',
			top: '50%',
			left: '50%',
			width: '95%',
			height: '95%',

			// Initial styles used before image reveal
			baseTop: '55%',
			baseLeft: '50%',
			baseHeight: '90%',
			baseWidth: '90%',

			// Callbacks
			onShow: () => console.log('Shown!'),
			onHide: () => console.log('Hidden!'),
		});

		// Listen for an elements found by specified selector
		viewer.listen('[zoomtastic]');

		// Show image viewer
		viewer.show('https://via.placeholder.com/600');

		// Hide image viewer
		viewer.hide();
	</script>
</body>
```

## License

[MIT](https://github.com/Kirlovon/Zoomtastic/blob/master/LICENSE)
