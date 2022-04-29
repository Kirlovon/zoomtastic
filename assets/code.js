// Initiate Zoomtastic

Zoomtastic.mount({ animation: 'slide' });
Zoomtastic.listen('[zoomtastic]', 'zoomtastic');

// Animation elements

const slideButton = document.getElementById('slide');
const fadeButton = document.getElementById('fade');
const zoomButton = document.getElementById('zoom');
const dropButton = document.getElementById('drop');

slideButton.addEventListener('click', () => {
	unclickButtons();
	slideButton.classList.add('active');
	Zoomtastic.mount({ animation: 'slide' });
});

fadeButton.addEventListener('click', () => {
	unclickButtons();
	fadeButton.classList.add('active');
	Zoomtastic.mount({ animation: 'fade' });
});

zoomButton.addEventListener('click', () => {
	unclickButtons();
	zoomButton.classList.add('active');
	Zoomtastic.mount({ animation: 'zoom' });
});

dropButton.addEventListener('click', () => {
	unclickButtons();
	dropButton.classList.add('active');
	Zoomtastic.mount({ animation: 'drop' });
});

function unclickButtons() {
	slideButton.classList.remove('active');
	fadeButton.classList.remove('active');
	zoomButton.classList.remove('active');
	dropButton.classList.remove('active');
}

// Example block

const codeExample = `
<!-- Add Zoomtastic attribute to zoomable elements! -->
<img zoomtastic src="https://via.placeholder.com/256" />

<!-- Load Zoomtastic from the CDN! -->
<script src="https://unpkg.com/zoomtastic@2.2.1"></script>

<script>

	// Mount viewer element
	Zoomtastic.mount({
		size: '95%',
		easing: 'ease',
		duration: 500,
		background: 'rgba(0, 0, 0, 0.9)',
		filter: 'drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))',
		animation: 'slide' // Can be slide, fade, zoom or drop
	});

	// Listen for an elements that contains "zoomtastic" attribute, 
	// and use "src" attribute as image source
	Zoomtastic.listen('[zoomtastic]', 'src');

	// Show image manually
	Zoomtastic.show('https://via.placeholder.com/256');

	// Hide image
	Zoomtastic.hide();

</script>
`;

const renderedExample = hljs.highlight(codeExample.trim(), { language: 'xml' }).value
document.getElementById('code-example').innerHTML = renderedExample;

// Preload full-sized images

setTimeout(() => {
	const images = ['image1.png', 'image2.png', 'image3.jpg'];
	for (let i = 0; i < images.length; i++) {
		const image = new Image();
		image.src = './assets/' + images[i];
	}
}, 200);