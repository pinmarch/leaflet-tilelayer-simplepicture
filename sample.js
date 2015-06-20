;

window.onload = function() {
	var map = L.map('lmap');
	map.setView([0, 0], 3);

	var tileLayer = L.tileLayer.simplePicture(
		'/img/IMG_1952.jpg',
		{
		attribution : 'It&quot;s a sample'
		}
	);
	tileLayer.addTo(map);
};

