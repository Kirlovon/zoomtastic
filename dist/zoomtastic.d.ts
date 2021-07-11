export default Zoomtastic;
/**
 * Zoomtastic configuration
 */
export type ZoomtasticConfig = {
    /**
     * Image size.
     */
    size?: string;
    /**
     * Timing function.
     */
    ease?: string;
    /**
     * Animations duration.
     */
    duration?: number;
    /**
     * Viewer background.
     */
    background?: string;
    /**
     * CSS filter applied to image.
     */
    filter?: string;
    /**
     * Animation type.
     */
    animation?: 'slide' | 'fade' | 'zoom' | 'drop';
};
declare namespace Zoomtastic {
    /**
     * Mount Zoomtastic element to the page.
     * @param {ZoomtasticConfig} config Zoomtastic configuration
     */
    function mount(config?: ZoomtasticConfig): void;
    /**
     * Add event listener to the elements. By default, it listens to all elements with the attribute _zoomtastic_ and takes the image from the _src_ attribute.
     * @param {string|HTMLElement|HTMLCollection|NodeList} [target='[zoomtastic]'] CSS selector, element or array of elements.
     * @param {string} [source='src'] Image source.
     */
    function listen(target?: string | HTMLElement | HTMLCollection | NodeList, source?: string): void;
    /**
     * Show image viewer.
     * @param {string} url URL to the image.
     */
    function show(url: string): void;
    /**
     * Hide image viewer.
     */
    function hide(): void;
}
