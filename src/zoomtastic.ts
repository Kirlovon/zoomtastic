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
	filter?: string;
	baseTop?: string | number;
	baseLeft?: string | number;
	baseWidth?: string | number;
	baseHeight?: string | number;
	baseFilter?: string;
	onShow?: () => void;
	onHide?: () => void;
}

/** Zoomtastic state */
type State = 'shown' | 'hidden';

/** Zoomtastic - Tiny image zoomer for web! */
class Zoomtastic {
	private state: State = 'shown';

	/** Timers ( Like setTimeout and setInterval ) */
	private delayTimer: NodeJS.Timer;
	private loadingTimer: NodeJS.Timer;
	private durationTimer: NodeJS.Timer;

	/** Default config */
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
		width: '90%',
		height: '90%',
		filter: 'drop-shadow(0 4px 64px rgba(0, 0, 0, 0.2))',
		baseTop: '55%',
		baseLeft: '50%',
		baseWidth: '90%',
		baseHeight: '90%',
		baseFilter: 'drop-shadow(0 4px 64px rgba(0, 0, 0, 0.2))',
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
			if (typeof this.config.filter !== 'string') throw new TypeError('Field "filter" must be a string');
			if (typeof this.config.baseTop !== 'string') throw new TypeError('Field "baseTop" must be a string');
			if (typeof this.config.baseLeft !== 'string') throw new TypeError('Field "baseLeft" must be a string');
			if (typeof this.config.baseWidth !== 'string' && typeof this.config.baseWidth !== 'number') throw new TypeError('Field "baseWidth" must be a number or string');
			if (typeof this.config.baseHeight !== 'string' && typeof this.config.baseHeight !== 'number') throw new TypeError('Field "baseHeight" must be a number or string');
			if (typeof this.config.baseFilter !== 'string') throw new TypeError('Field "baseFilter" must be a string');
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

		// Set state
		this.state = 'hidden';

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
		image.style.filter = this.config.baseFilter;

		container.addEventListener('click', () => this.hide());

		container.appendChild(image);
		document.body.appendChild(container);
	}

	/** Clear timers */
	private clearTimers(): void {
		if (this.loadingTimer) clearInterval(this.loadingTimer);
		if (this.durationTimer) clearInterval(this.durationTimer);
		if (this.delayTimer) clearInterval(this.delayTimer);

		// Sync state with the container
		if (this.state === 'shown') {
			document.getElementById('zoomtastic-container').style.display = 'block';
		} else {
			document.getElementById('zoomtastic-container').style.display = 'none';
		}
	}

	/**
	 * Listen elements for automatic image zooming
	 * @param selector Elements selector
	 */
	public listen(selector: string = '[zoomtastic]'): void {
		const elements: NodeListOf<Element> = document.querySelectorAll(selector);

		// Add event listener to each found element
		elements.forEach((item: HTMLElement) => {
			item.style.cursor = this.config.zoomInCursor;

			item.addEventListener('click', (event: MouseEvent) => {
				event.preventDefault();

				// Get image url from attributes
				let url: string = item.getAttribute('zoomtastic') || item.getAttribute('src') || item.getAttribute('lowsrc');
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

		// Check if url specified
		if (typeof url !== 'string') throw new TypeError('URL must be a string');

		const container: HTMLElement = document.getElementById('zoomtastic-container');
		const image: HTMLElement = document.getElementById('zoomtastic-image');

		// Callback
		if (typeof this.config.onShow === 'function') this.config.onShow();

		// Stop all animations
		this.clearTimers();

		// Show container
		container.style.display = 'block';
		setTimeout(() => (container.style.opacity = '1'), 0);

		// Apply image
		image.style.backgroundImage = `url("${encodeURI(url)}")`;

		// Preload image
		if (this.config.preload) {
			const preloadedImage: HTMLImageElement = new Image();
			preloadedImage.onload = () => {
				ready = true;
			};
			preloadedImage.onerror = () => {
				this.clearTimers();
			};
			preloadedImage.src = url;
		}

		// Show image
		this.delayTimer = setTimeout(() => {
			this.loadingTimer = setInterval(() => {
				if (ready) {
					image.style.opacity = '1';
					image.style.top = String(this.config.top);
					image.style.left = String(this.config.left);
					image.style.width = String(this.config.width);
					image.style.height = String(this.config.height);
					image.style.filter = this.config.filter;

					this.state = 'shown';
					this.clearTimers();
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

		// Callback
		if (typeof this.config.onHide === 'function') this.config.onHide();

		// Stop all animations
		this.clearTimers();

		// Set state
		this.state = 'hidden';

		// Hide image
		image.style.opacity = '0';
		image.style.top = String(this.config.baseTop);
		image.style.left = String(this.config.baseLeft);
		image.style.width = String(this.config.baseWidth);
		image.style.height = String(this.config.baseHeight);
		image.style.filter = this.config.baseFilter;

		// Hide container
		this.delayTimer = setTimeout(() => {
			container.style.opacity = '0';

			// Set display none after transition
			this.durationTimer = setTimeout(() => (container.style.display = 'none'), this.config.duration);
		}, this.config.delay);
	}
}

export default Zoomtastic;
