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
declare class Zoomtastic {
    private clickable;
    private timer0;
    private timer1;
    private timer2;
    private timer3;
    private timer4;
    /**
     * Default config
     */
    private config;
    /**
     * On showing event
     */
    beforeShow: () => void;
    /**
     * On showed event
     */
    afterShow: () => void;
    /**
     * On hiding event
     */
    beforeHide: () => void;
    /**
     * On hidden event
     */
    afterHide: () => void;
    /**
     * Setup zoomtastic
     * @param config Viewer config
     */
    constructor(config?: ZoomtasticConfig);
    /**
     * Initialize viewer element
     */
    private mount;
    /**
     * Clear internal tiemrs
     */
    private clearTimers;
    /**
     * Listen elements for automatic image zooming
     * @param attribute Search elements by the specified attribute
     */
    listen(attribute?: string): void;
    /**
     * Show image
     * @param url Image url
     */
    show(url: string): Promise<void>;
    /**
     * Hide zoomed image
     */
    hide(): Promise<void>;
}
export default Zoomtastic;
