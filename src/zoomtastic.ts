// Polyfills for IE support
import './polyfills';

/** Zoomtastic config */
interface ZoomtasticConfig {
	preload?: boolean;
	duration?: number;
	delay?: number;
	zoomInCursor?: string;
	zoomOutCursor?: string;
	background?: string;
	easing?: string;
	zIndex?: string | number;
	top?: string | number;
	left?: string | number;
	width?: string | number;
	height?: string | number;
	baseTop?: string | number;
	baseLeft?: string | number;
	baseWidth?: string | number;
	baseHeight?: string | number;
	onShow?: () => void;
	onHide?: () => void;
}

/** Zoomtastic - Tiny image zoomer for web! */
class Zoomtastic {
	private config: ZoomtasticConfig = {
		preload: true,
		duration: 150,
		delay: 200,
		zoomInCursor: 'zoom-in',
		zoomOutCursor: 'zoom-out',
		background: 'rgba(0, 0, 0, 0.75)',
		easing: 'ease-out',
		zIndex: '16777271',
		top: '50%',
		left: '50%',
		width: '95%',
		height: '95%',
		baseTop: '55%',
		baseLeft: '50%',
		baseHeight: '90%',
		baseWidth: '90%',
	};

	/**
	 * Setup zoomtastic
	 * @param config Viewer config
	 */
	constructor(config?: ZoomtasticConfig) {
		if (config) {
			if (typeof this.config !== 'object') throw new TypeError('Config must be an object');
			this.config = Object.assign(this.config, config);

			if (typeof this.config.preload !== 'boolean') throw new TypeError('Field "preload" must be a boolean');
			if (typeof this.config.duration !== 'number') throw new TypeError('Field "duration" must be a number');
			if (typeof this.config.delay !== 'number') throw new TypeError('Field "delay" must be a number');
			if (typeof this.config.zoomInCursor !== 'string') throw new TypeError('Field "zoomInCursor" must be a string');
			if (typeof this.config.zoomOutCursor !== 'string') throw new TypeError('Field "zoomOutCursor" must be a string');
			if (typeof this.config.background !== 'string') throw new TypeError('Field "background" must be a string');
			if (typeof this.config.easing !== 'string') throw new TypeError('Field "easing" must be a string');
			if (typeof this.config.top !== 'string') throw new TypeError('Field "top" must be a string');
			if (typeof this.config.left !== 'string') throw new TypeError('Field "left" must be a string');
			if (typeof this.config.width !== 'string' && typeof this.config.width !== 'number') throw new TypeError('Field "width" must be a number or string');
			if (typeof this.config.height !== 'string' && typeof this.config.height !== 'number') throw new TypeError('Field "height" must be a number or string');
		}

		// Mount elements to the page
		this.mount();
	}

	/**
	 * Initialize viewer element
	 */
	private mount(): void {
		const existingContainer: HTMLElement = document.getElementById('zoomtastic-container');
		if (existingContainer) existingContainer.remove();

		// Container element
		const container: HTMLDivElement = document.createElement('div');
		container.id = 'zoomtastic-container';
		container.style.top = '0';
		container.style.left = '0';
		container.style.width = '100%';
		container.style.height = '100vh';
		container.style.opacity = '0';
		container.style.position = 'fixed';
		container.style.overflow = 'hidden';
		container.style.cursor = this.config.zoomOutCursor;
		container.style.zIndex = String(this.config.zIndex);
		container.style.backgroundColor = this.config.background;
		container.style.transitionProperty = 'all';
		container.style.transitionDuration = this.config.duration + 'ms';
		container.style.transitionTimingFunction = this.config.easing;
		container.style.display = 'none';

		// Image element
		const image: HTMLDivElement = document.createElement('div');
		image.id = 'zoomtastic-image';
		image.style.top = String(this.config.baseTop);
		image.style.left = String(this.config.baseLeft);
		image.style.width = String(this.config.baseWidth);
		image.style.height = String(this.config.baseHeight);
		image.style.zIndex = String(this.config.zIndex);
		image.style.opacity = '0';
		image.style.display = 'block';
		image.style.position = 'absolute';
		image.style.transform = 'translate(-50%, -50%)';
		image.style.backgroundSize = 'contain';
		image.style.backgroundRepeat = 'no-repeat';
		image.style.backgroundPosition = 'center';
		image.style.transitionProperty = 'all';
		image.style.transitionDuration = this.config.duration + 'ms';
		image.style.transitionTimingFunction = this.config.easing;
		image.style.filter = 'drop-shadow(0 4px 64px rgba(0, 0, 0, 0.5))';

		container.addEventListener('click', () => this.hide());

		container.appendChild(image);
		document.body.appendChild(container);
	}

	/**
	 * Listen elements for automatic image zooming
	 * @param selector Elements selector
	 */
	public listen(selector: string): void {
		const elements: NodeListOf<Element> = document.querySelectorAll('[zoomtastic]');

		// Add event listener to each found element
		elements.forEach((item: HTMLElement) => {
			item.style.cursor = this.config.zoomInCursor;

			item.addEventListener('click', (event: MouseEvent) => {
				event.preventDefault();

				// Get image url from attributes
				let url: string = item.getAttribute('zoomtastic') || item.getAttribute('src');
				if (url) this.show(url);
			});
		});
	}

	/**
	 * Show image
	 * @param url Image url
	 */
	public show(url: string): void {
		let ready: boolean = !this.config.preload;

		const container: HTMLElement = document.getElementById('zoomtastic-container');
		const image: HTMLElement = document.getElementById('zoomtastic-image');

		// Show container
		container.style.display = 'block';
		setTimeout(() => (container.style.opacity = '1'), 0);

		// Preload image
		if (this.config.preload) {
			const preloadedImage: HTMLImageElement = new Image();
			preloadedImage.onload = () => {
				ready = true;
				if (typeof this.config.onShow === 'function') this.config.onShow();
			};
			preloadedImage.src = url;
		} else {
			if (typeof this.config.onShow === 'function') this.config.onShow();
		}

		// Show image
		setTimeout(() => {
			const loading: NodeJS.Timeout = setInterval(() => {
				if (ready) {
					image.style.backgroundImage = `url("${url}")`;
					image.style.opacity = '1';
					image.style.top = String(this.config.top);
					image.style.left = String(this.config.left);
					image.style.width = String(this.config.width);
					image.style.height = String(this.config.height);
					clearInterval(loading);
				}
			}, 10);
		}, this.config.delay);
	}

	/**
	 * Hide zoomed image
	 */
	public hide(): void {
		const container: HTMLElement = document.getElementById('zoomtastic-container');
		const image: HTMLElement = document.getElementById('zoomtastic-image');

		// Event call
		if (typeof this.config.onHide === 'function') this.config.onHide();

		// Hide image
		image.style.opacity = '0';
		image.style.top = String(this.config.baseTop);
		image.style.left = String(this.config.baseLeft);
		image.style.width = String(this.config.baseWidth);
		image.style.height = String(this.config.baseHeight);

		// Hide container
		setTimeout(() => {
			container.style.opacity = '0';

			// Set display none after transition
			setTimeout(() => (container.style.display = 'none'), this.config.duration);
		}, this.config.delay);
	}
}

export default Zoomtastic;
