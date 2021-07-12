// Initialization status
let mounted = false;

// Locking clicking on images
let locked = false;

// Elements
let container;
let background;
let image;

/**
 * @typedef {object} ZoomtasticConfig Zoomtastic configuration
 * @property {string} [size] Image size.
 * @property {string} [ease] Timing function.
 * @property {number} [duration] Animations duration.
 * @property {string} [background] Viewer background.
 * @property {string} [filter] CSS filter applied to image.
 * @property {'slide'|'fade'|'zoom'|'drop'} [animation] Animation type.
 */

/**
 * Zoomtastic 🔍
 * Tiny image zoomer for web!
 */
const Zoomtastic = { config: {} };

/**
 * Mount Zoomtastic element to the page.
 * @param {ZoomtasticConfig} config Zoomtastic configuration
 */
Zoomtastic.mount = function(config = {}) {
	const existingContainer = document.getElementById('zoomtastic-container');
	if (existingContainer) existingContainer.remove();

	Zoomtastic.config.size = config.size || '95%';
	Zoomtastic.config.easing = config.easing || 'ease';
	Zoomtastic.config.duration = config.duration || 500;
	Zoomtastic.config.background = config.background || 'rgba(0, 0, 0, 0.9)';
	Zoomtastic.config.filter = config.filter || 'drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))';
	Zoomtastic.config.animation = config.animation || 'slide';

	container = createElement('zoomtastic-container', {
		top: '0',
		left: '0',
		width: '100%',
		height: '100vh',
		position: 'fixed',
		overflow: 'hidden',
		cursor: 'zoom-out',
		zIndex: '16777271',
		visibility: 'hidden',
	});

	background = createElement('zoomtastic-background', {
		zIndex: '0',
		opacity: '0',
		width: '100%',
		height: '100%',
		userSelect: 'none',
		position: 'absolute',
		background: Zoomtastic.config.background,
		transitionProperty: 'opacity',
		transitionTimingFunction: Zoomtastic.config.easing,
		transitionDuration: parseInt(Zoomtastic.config.duration * 0.75) + 'ms',
	});

	image = createElement('zoomtastic-image', {
		top: '50%',
		left: '50%',
		width: Zoomtastic.config.size,
		height: Zoomtastic.config.size,
		opacity: '0',
		zIndex: '16777271',
		userSelect: 'none',
		position: 'absolute',
		pointerEvents: 'none',
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		transitionProperty: 'all',
		transitionTimingFunction: Zoomtastic.config.easing,
		transitionDuration: parseInt(Zoomtastic.config.duration) + 'ms',
		transform: 'translate(-50%, -50%) scale(1)',
		filter: Zoomtastic.config.filter,
	});

	if (Zoomtastic.config.animation === 'slide') image.style.transform = 'translate(-50%, -45%) scale(1)';
	if (Zoomtastic.config.animation === 'zoom') image.style.transform = 'translate(-50%, -50%) scale(0.95)';
	if (Zoomtastic.config.animation === 'drop') image.style.transform = 'translate(-50%, -50%) scale(1.1)';

	container.addEventListener('click', () => {
		if (locked) return;
		locked = true;
		Zoomtastic.hide();
	});

	container.appendChild(image);
	container.appendChild(background);
	document.body.appendChild(container);

	locked = false;
	mounted = true;
};

/**
 * Add event listener to the elements. By default, it listens to all elements with the attribute `zoomtastic` and takes the image from the `src` attribute. 
 * @param {string|HTMLElement|HTMLCollection|NodeList} [target='[zoomtastic]'] CSS selector, element or array of elements. 
 * @param {string} [source='src'] Image source.
 */
Zoomtastic.listen = function(target = '[zoomtastic]', source = 'src') {
	if (!mounted) throw new Error('Zoomtastic is not mounted');

	if (typeof target === 'string') target = document.querySelectorAll(target);
	if (target instanceof HTMLElement) target = [target];
    if (!target) return;

	for (let i = 0; i < target.length; i++) {
		const element = target[i];
		element.style.cursor = 'zoom-in';

		element.addEventListener('click', event => {
			event.preventDefault();

			const url = element.getAttribute(source);
			if (url) Zoomtastic.show(url);
		});
	}
};

/**
 * Show image viewer.
 * @param {string} url URL to the image.
 */
Zoomtastic.show = function(url) {
	if (!mounted) throw new Error('Zoomtastic is not mounted');
	if (!url) throw new TypeError('URL is not specified');

	image.style.backgroundImage = `url("${encodeURI(url)}")`;
	container.style.visibility = 'visible';

	setTimeout(() => {
		if (Zoomtastic.config.animation === 'slide') image.style.transform = 'translate(-50%, -50%) scale(1)';
		if (Zoomtastic.config.animation === 'zoom' || Zoomtastic.config.animation === 'drop') image.style.transform = 'translate(-50%, -50%) scale(1)';

		image.style.opacity = '1';
		background.style.opacity = '1';
		locked = false;
	});
};

/**
 * Hide image viewer.
 */
Zoomtastic.hide = function() {
	if (!mounted) throw new Error('Zoomtastic is not mounted');

	setTimeout(() => {
		if (Zoomtastic.config.animation === 'slide') image.style.transform = 'translate(-50%, -45%) scale(1)';
		if (Zoomtastic.config.animation === 'zoom') image.style.transform = 'translate(-50%, -50%) scale(0.95)';
		if (Zoomtastic.config.animation === 'drop') image.style.transform = 'translate(-50%, -50%) scale(1.1)';

		image.style.opacity = '0';
		background.style.opacity = '0';
	});

	setTimeout(() => {
		image.style.backgroundImage = 'none';
		container.style.visibility = 'hidden';
		locked = false;
	}, parseInt(Zoomtastic.config.duration));
};

/**
 * Create new element.
 */
function createElement(id, styles = {}) {
	const element = document.createElement('div');
	for (const key in styles) element.style[key] = styles[key];
	element.id = id;
	return element;
}

export default Zoomtastic;
