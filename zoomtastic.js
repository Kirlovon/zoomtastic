/** Initialization. */
init();

/**
 * 🔍 Zoomtastic 🔍
 * Tiny image zoomer for web!
 */
const Zoomtastic = {

    // Default parameters
    size: '95%',
    easing: 'ease',
    duration: 200,
    background: 'rgba(0, 0, 0, 0.75)',

    /**
     * Listen for an elements that contains specified attribute. ("zoomtastic" by default)
     * @param {string} [attribute='zoomtastic'] Attribute to search by.
     */
    listen(attribute = 'zoomtastic') {
        const elements = document.querySelectorAll(`[${attribute}]`);

        setInitialStyles(this);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.style.cursor = 'zoom-in';

            element.addEventListener('click', (event) => {
                event.preventDefault();

                const url = element.getAttribute(attribute) || element.getAttribute('src');
                if (url) this.show(url);
            });
        }
    },

    /**
     * Show image viewer.
     * @param {string} url URL to the image.
     */
    show(url) {
        const containerElement = document.getElementById('zoomtastic-container');
        const backgroundElement = document.getElementById('zoomtastic-background');
        const imageElement = document.getElementById('zoomtastic-image');

        if (typeof url !== 'string') throw new TypeError('URL must be a string');
        imageElement.style.backgroundImage = `url("${encodeURI(url)}")`;
        containerElement.style.visibility = 'visible';

        setInitialStyles(this);

        setTimeout(() => {
            backgroundElement.style.opacity = '1';
        });

        setTimeout(() => {
            imageElement.style.top = '50%';
            imageElement.style.opacity = '1';
        });
    },

    /**
     * Hide image viewer.
     */
    hide() {
        const containerElement = document.getElementById('zoomtastic-container');
        const backgroundElement = document.getElementById('zoomtastic-background');
        const imageElement = document.getElementById('zoomtastic-image');

        setInitialStyles(this);

        setTimeout(() => {
            imageElement.style.top = '55%';
            imageElement.style.opacity = '0';
            backgroundElement.style.opacity = '0';
        });

        setTimeout(() => {
            containerElement.style.visibility = 'hidden';
        }, this.duration);
    }

}

/**
 * Create and mount viewer to the page.
 */
function init() {
    const existingContainer = document.getElementById('zoomtastic-container');
    if (existingContainer) existingContainer.remove();

    const containerElement = createElement('zoomtastic-container', {
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        display: 'block',
        position: 'fixed',
        overflow: 'hidden',
        cursor: 'zoom-out',
        zIndex: '16777271',
        visibility: 'hidden'
    });

    const backgroundElement = createElement('zoomtastic-background', {
        top: '0',
        left: '0',
        zIndex: '0',
        opacity: '0',
        width: '100%',
        height: '100%',
        userSelect: 'none',
        position: 'absolute',
        transitionDuration: '200ms',
        transitionProperty: 'opacity',
        transitionTimingFunction: 'ease',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    });

    const imageElement = createElement('zoomtastic-image', {
        top: '55%',
        left: '50%',
        width: '95%',
        height: '95%',
        opacity: '0',
        display: 'block',
        zIndex: '16777271',
        userSelect: 'none',
        position: 'absolute',
        pointerEvents: 'none',
        backgroundSize: 'contain',
        transitionProperty: 'all',
        transitionDuration: '200ms',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transitionTimingFunction: 'ease',
        transform: 'translate(-50%, -50%)',
    });

    
    containerElement.addEventListener('click', () => Zoomtastic.hide());
    
    containerElement.appendChild(imageElement);
    containerElement.appendChild(backgroundElement);
    document.body.appendChild(containerElement);
}

/**
 * Set initial styles for the elements.
 */
function setInitialStyles(config) {
    const backgroundElement = document.getElementById('zoomtastic-background');
    const imageElement = document.getElementById('zoomtastic-image');

    imageElement.style.width = config.size;
    imageElement.style.height = config.size;
    imageElement.style.transitionTimingFunction = config.easing;
    imageElement.style.transitionDuration = config.duration + 'ms';

    backgroundElement.style.backgroundColor = config.background;
    backgroundElement.style.transitionTimingFunction = config.easing;
    backgroundElement.style.transitionDuration = config.duration + 'ms';
}

/**
 * Create new element.
 */
function createElement(id, styles = {}) {
    const element = document.createElement('div');
    for (const key in styles) element.style[key] = styles[key];
    element.id = id
    return element;
}

export default Zoomtastic;
