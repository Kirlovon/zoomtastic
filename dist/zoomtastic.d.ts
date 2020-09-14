export default Zoomtastic;
declare namespace Zoomtastic {
    const size: string;
    const easing: string;
    const duration: number;
    const background: string;
    /**
     * Listen for an elements that contains specified attribute. ("zoomtastic" by default)
     * @param {string} [attribute='zoomtastic'] Attribute to search by.
     */
    function listen(attribute?: string): void;
    /**
     * Listen for an elements that contains specified attribute. ("zoomtastic" by default)
     * @param {string} [attribute='zoomtastic'] Attribute to search by.
     */
    function listen(attribute?: string): void;
    /**
     * Show image viewer.
     * @param {string} url URL to the image.
     */
    function show(url: string): void;
    /**
     * Show image viewer.
     * @param {string} url URL to the image.
     */
    function show(url: string): void;
    /**
     * Hide image viewer.
     */
    function hide(): void;
    /**
     * Hide image viewer.
     */
    function hide(): void;
}
