// Polyfills for IE support
import './polyfills';

/** Zoomtastic config */
interface ZoomtasticConfig {
	duration?: number;
	zoomInCursor?: string;
	zoomOutCursor?: string;
	background?: string;
	easing?: string;
	zIndex?: number;
	x?: number;
	y?: number;
	scale?: number;
	initialX?: number;
	initialY?: number;
	initialScale?: number;
}

/** Zoomtastic - Tiny image zoomer for web! */
class Zoomtastic {
	private clickable: boolean = false;
	private timer0: NodeJS.Timer;
	private timer1: NodeJS.Timer;
	private timer2: NodeJS.Timer;
	private timer3: NodeJS.Timer;
	private timer4: NodeJS.Timer;

	/**
	 * Default config
	 */
	private config: ZoomtasticConfig = {
		duration: 200,
		zoomInCursor: 'zoom-in',
		zoomOutCursor: 'zoom-out',
		background: 'rgba(0, 0, 0, 0.75)',
		easing: 'linear',
		zIndex: 16777271,
		x: 0.5,
		y: 0.5,
		scale: 0.95,
		initialX: 0.5,
		initialY: 0.6,
		initialScale: 0.95,
	};

	/**
	 * On showing event
	 */
	public beforeShow: () => void;

	/**
	 * On showed event
	 */
	public afterShow: () => void;

	/**
	 * On hiding event
	 */
	public beforeHide: () => void;

	/**
	 * On hidden event
	 */
	public afterHide: () => void;

	/**
	 * Setup zoomtastic
	 * @param config Viewer config
	 */
	constructor(config?: ZoomtasticConfig) {
		if (config) {
			if (typeof this.config !== 'object') throw new TypeError('Config must be an object');

			// Merge custom and default config
			this.config = Object.assign(this.config, config);

			// Validate config
			if (typeof this.config.duration !== 'number' || this.config.duration < 0) throw new TypeError('Field "duration" must be a number greater than 0');
			if (typeof this.config.zoomInCursor !== 'string') throw new TypeError('Field "zoomInCursor" must be a string');
			if (typeof this.config.zoomOutCursor !== 'string') throw new TypeError('Field "zoomOutCursor" must be a string');
			if (typeof this.config.background !== 'string') throw new TypeError('Field "background" must be a string');
			if (typeof this.config.easing !== 'string') throw new TypeError('Field "easing" must be a string');
			if (typeof this.config.zIndex !== 'number') throw new TypeError('Field "zIndex" must be a number or string');
			if (typeof this.config.x !== 'number' || this.config.x > 1 || this.config.x < 0) throw new TypeError('Field "x" must be a number in the range from 0 to 1');
			if (typeof this.config.y !== 'number' || this.config.y > 1 || this.config.y < 0) throw new TypeError('Field "y" must be a number in the range from 0 to 1');
			if (typeof this.config.scale !== 'number' || this.config.scale > 1 || this.config.scale < 0) throw new TypeError('Field "scale" must be a number in the range from 0 to 1');
			if (typeof this.config.initialX !== 'number' || this.config.initialX > 1 || this.config.initialX < 0) throw new TypeError('Field "initialX" must be a number in the range from 0 to 1');
			if (typeof this.config.initialY !== 'number' || this.config.initialY > 1 || this.config.initialY < 0) throw new TypeError('Field "initialY" must be a number in the range from 0 to 1');
			if (typeof this.config.initialScale !== 'number' || this.config.initialScale > 1 || this.config.initialScale < 0)
				throw new TypeError('Field "initialScale" must be a number in the range from 0 to 1');
		}

		// Mount elements to the page
		this.mount();
	}

	/**
	 * Initialize viewer element
	 */
	private mount(): void {
		const existingContainer: HTMLElement = document.getElementById('zoomtastic-container');

		// Delete container if it is already exists
		if (existingContainer) existingContainer.remove();

		// Container element
		const container: HTMLDivElement = document.createElement('div');
		container.id = 'zoomtastic-container';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100%';
		container.style.height = '100vh';
		container.style.display = 'block';
		container.style.position = 'fixed';
		container.style.overflow = 'hidden';
		container.style.cursor = this.config.zoomOutCursor;
		container.style.zIndex = String(this.config.zIndex);
		container.style.display = 'none';

		// Background element
		const background: HTMLDivElement = document.createElement('div');
		background.id = 'zoomtastic-background';
		background.style.top = '0';
		background.style.left = '0';
		background.style.width = '100%';
		background.style.height = '100%';
		background.style.zIndex = '0';
		background.style.opacity = '0';
		background.style.position = 'absolute';
		background.style.backgroundColor = this.config.background;
		background.style.transitionProperty = 'opacity';
		background.style.transitionDuration = Math.round(this.config.duration) + 'ms';
		background.style.transitionTimingFunction = this.config.easing;
		background.style.pointerEvents = 'none';
		background.style.userSelect = 'none';

		// Image element
		const image: HTMLDivElement = document.createElement('div');
		image.id = 'zoomtastic-image';
		image.style.top = String(this.config.initialY * 100) + '%';
		image.style.left = String(this.config.initialX * 100) + '%';
		image.style.width = String(this.config.initialScale * 100) + '%';
		image.style.height = String(this.config.initialScale * 100) + '%';
		image.style.zIndex = '16777271';
		image.style.opacity = '0';
		image.style.display = 'block';
		image.style.position = 'absolute';
		image.style.transform = 'translate(-50%, -50%)';
		image.style.backgroundSize = 'contain';
		image.style.backgroundRepeat = 'no-repeat';
		image.style.backgroundPosition = 'center';
		image.style.transitionProperty = 'all';
		image.style.transitionDuration = Math.round(this.config.duration / 2) + 'ms';
		image.style.transitionTimingFunction = this.config.easing;
		image.style.pointerEvents = 'none';
		image.style.userSelect = 'none';
		image.style.filter = 'drop-shadow(0 4px 64px rgba(0, 0, 0, 0.1))';

		// Hide on container click
		container.addEventListener('click', () => {
			if (this.clickable) {
				this.hide();
				this.clickable = false;
			}
		});

		// Add elements to container
		container.appendChild(image);
		container.appendChild(background);

		// Add to body
		document.body.appendChild(container);
	}

	/**
	 * Clear internal tiemrs
	 */
	private clearTimers(): void {
		clearTimeout(this.timer0);
		clearTimeout(this.timer1);
		clearTimeout(this.timer2);
		clearTimeout(this.timer3);
		clearTimeout(this.timer4);
	}

	/**
	 * Listen elements for automatic image zooming
	 * @param attribute Search elements by the specified attribute
	 */
	public listen(attribute: string = 'zoomtastic'): void {
		const elements: NodeListOf<Element> = document.querySelectorAll(`[${attribute}]`);

		// Add event listener to each found element
		elements.forEach((item: HTMLElement) => {
			item.style.cursor = this.config.zoomInCursor;

			item.addEventListener('click', (event: MouseEvent) => {
				event.preventDefault();

				this.clickable = false;

				// Get image url from attributes
				let url: string = item.getAttribute(attribute) || item.getAttribute('src') || item.getAttribute('lowsrc');
				if (url) this.show(url);
			});
		});
	}

	/**
	 * Show image
	 * @param url Image url
	 */
	public async show(url: string): Promise<void> {
		const container: HTMLElement = document.getElementById('zoomtastic-container');
		const background: HTMLElement = document.getElementById('zoomtastic-background');
		const image: HTMLElement = document.getElementById('zoomtastic-image');

		// Check if url specified
		if (typeof url !== 'string') throw new TypeError('URL must be a string');

		// Event
		if (typeof this.beforeShow === 'function') this.beforeShow();

		// Clear timers
		this.clearTimers();

		// Change cursor
		container.style.cursor = this.config.zoomOutCursor;

		// Show container and background
		container.style.display = 'block';
		this.timer0 = setTimeout(() => (background.style.opacity = '1'), 0);

		// Apply image
		image.style.backgroundImage = `url("${encodeURI(url)}")`;

		// Show image
		this.timer1 = setTimeout(() => {
			this.clickable = true;
			image.style.opacity = '1';
			image.style.top = String(this.config.x * 100) + '%';
			image.style.left = String(this.config.y * 100) + '%';
			image.style.width = String(this.config.scale * 100) + '%';
			image.style.height = String(this.config.scale * 100) + '%';
		}, Math.round(this.config.duration / 2));

		// When image showed
		this.timer2 = setTimeout(() => {
			if (typeof this.afterShow === 'function') this.afterShow();
		}, Math.round(this.config.duration));
	}

	/**
	 * Hide zoomed image
	 */
	public async hide(): Promise<void> {
		const container: HTMLElement = document.getElementById('zoomtastic-container');
		const background: HTMLElement = document.getElementById('zoomtastic-background');
		const image: HTMLElement = document.getElementById('zoomtastic-image');

		// Event
		if (typeof this.beforeHide === 'function') this.beforeHide();

		// Clear timers
		this.clearTimers();

		// Change cursor
		container.style.cursor = 'auto';

		// Hide image
		image.style.opacity = '0';
		image.style.top = String(this.config.initialY * 100) + '%';
		image.style.left = String(this.config.initialX * 100) + '%';
		image.style.width = String(this.config.initialScale * 100) + '%';
		image.style.height = String(this.config.initialScale * 100) + '%';

		// Hide background
		this.timer3 = setTimeout(() => {
			background.style.opacity = '0';
		}, Math.round(this.config.duration / 2));

		// Hide container after transition
		this.timer4 = setTimeout(() => {
			container.style.display = 'none';
			this.clickable = true;
			if (typeof this.afterHide === 'function') this.afterHide();
		}, Math.round(this.config.duration));
	}
}

export default Zoomtastic;
