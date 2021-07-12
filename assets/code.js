Zoomtastic.mount({ animation: 'slide' });
Zoomtastic.listen('[zoomtastic]', 'zoomtastic');

var slideButton = document.getElementById('slide');
var fadeButton = document.getElementById('fade');
var zoomButton = document.getElementById('zoom');
var dropButton = document.getElementById('drop');

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
	Zoomtastic.mount({ animation: 'drops' });
});

function unclickButtons() {
	slideButton.classList.remove('active');
	fadeButton.classList.remove('active');
	zoomButton.classList.remove('active');
	dropButton.classList.remove('active');
}

// Preload full-sized images
var images = ['image1.png', 'image2.png', 'image3.jpg'];
for (var i = 0; i < images.length; i++) {
	var image = new Image();
	image.src = './assets/' + images[i];
}
