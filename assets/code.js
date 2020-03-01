new Zoomtastic().listen('zoomtastic');

// Preload full-sized images
var images = ['image1.png', 'image2.png', 'image3.jpg'];
for (var i = 0; i < images.length; i++) {
	var image = new Image();
	image.src = './assets/' + images[i];
}
