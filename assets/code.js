const DURATION = 300;

Zoomtastic.mount({ animation: 'slide', duration: DURATION });
Zoomtastic.listen('[zoomtastic]', 'zoomtastic');

var slideButton = document.getElementById('slide');
var fadeButton = document.getElementById('fade');
var zoomButton = document.getElementById('zoom');
var dropButton = document.getElementById('drop');

slideButton.addEventListener('click', () => {
	unclickButtons();
	slideButton.classList.add('active');
	Zoomtastic.mount({ animation: 'slide', duration: DURATION });
});

fadeButton.addEventListener('click', () => {
	unclickButtons();
	fadeButton.classList.add('active');
	Zoomtastic.mount({ animation: 'fade', duration: DURATION });
});

zoomButton.addEventListener('click', () => {
	unclickButtons();
	zoomButton.classList.add('active');
	Zoomtastic.mount({ animation: 'zoom', duration: DURATION });
});

dropButton.addEventListener('click', () => {
	unclickButtons();
	dropButton.classList.add('active');
	Zoomtastic.mount({ animation: 'drop', duration: DURATION });
});

function unclickButtons() {
	slideButton.classList.remove('active');
	fadeButton.classList.remove('active');
	zoomButton.classList.remove('active');
	dropButton.classList.remove('active');
}

const codeExample = `
<!-- Add Zoomtastic attribute to zoomable elements! -->
<img zoomtastic src="https://via.placeholder.com/256" />

<!-- Load Zoomtastic from the CDN! -->
<script src="https://unpkg.com/zoomtastic@2.1.0"></script>

<script>

	// Mount viewer elements
	Zoomtastic.mount({
		size: '95%',
		easing: 'ease',
		duration: 500,
		background: 'rgba(0, 0, 0, 0.9)',
		filter: 'drop-shadow(0 2px 16px rgba(0, 0, 0, 0.3))',
		animation: 'slide' // Can be slide, fade, zoom or drop
	});

	// Show image manually
	Zoomtastic.show('https://via.placeholder.com/256');

	// Hide image
	Zoomtastic.hide();

	// Listen for an elements that contains "zoomtastic" attribute, 
	// and use "src" attribute as image source
	Zoomtastic.listen('[zoomtastic]', 'src');

</script>
`;

const renderedExample = hljs.highlight(codeExample.trim(), { language: 'xml' }).value
document.getElementById('code-example').innerHTML = renderedExample;