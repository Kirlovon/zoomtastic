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
/** Zoomtastic - Tiny image zoomer for web! */
declare class Zoomtastic {
    private state;
    /** Timers ( Like setTimeout and setInterval ) */
    private delayTimer;
    private loadingTimer;
    private durationTimer;
    /** Default config */
    private config;
    /**
     * Setup zoomtastic
     * @param config Viewer config
     */
    constructor(config?: ZoomtasticConfig);
    /**
     * Initialize viewer element
     */
    private mount;
    /** Clear timers */
    private clearTimers;
    /**
     * Listen elements for automatic image zooming
     * @param selector Elements selector
     */
    listen(selector?: string): void;
    /**
     * Show image
     * @param url Image url
     */
    show(url: string): void;
    /**
     * Hide zoomed image
     */
    hide(): void;
}
export default Zoomtastic;
