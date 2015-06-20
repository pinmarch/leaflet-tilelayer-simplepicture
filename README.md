# leaflet-tilelayer-simplepicture
A TileLayer plugin for Leaflet.js, showing a picture file on the tile layer.

Requirements
------------
* Leaflet version: tested with 0.7.3(stable)
* Canvas

Usage
-----
In HTML;
```
<script type="text/javascript" src="L.TileLayer.SimplePicture.js"></script>
```

In JS;
```
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
```

Author
------
Satoshi Tada [@pinmarch_t](https://twitter.com/pinmarch_t)


