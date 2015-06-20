//
// leaflet-tilelayer-simplepicture Leaflet.js plugin
// Copyright 2015- pinmarch.at.sakura@gmail.com (@pinmarch_t: Satoshi Tada)
// Licensed under MIT License
//
;

L.TileLayer.SimplePicture = L.TileLayer.extend({
	initialize: function (url, options) {
		// console.log(url, options);
		L.TileLayer.prototype.initialize.call(this, url, options);

		var layer = this;
		var img = new Image();
		img.onload = function() {
			var tileSize = layer.options.tileSize,
			    w = img.width > img.height ? img.width : img.height;
			w = tileSize * Math.pow(2, Math.floor(Math.sqrt(w / tileSize)));
			layer._zoomWhole = tileSize / w;
			console.log("whole-view zoom:", layer._zoomWhole);
			layer.redraw();
		};
		img.src = url;
		this._localimage = img;
	},

	/* ver. 0.7.3 */
	getTileUrl: function (tilePoint) {
		if (!this._localimage.complete) {
			return L.Util.emptyImageUrl;
		}

		var img = this._localimage,
		    mapOrigin = this._map.getPixelOrigin(),
		    tileSize = this._getTileSize(),
		    tilePos = this._getTilePos(tilePoint).add(mapOrigin),
		    top = tilePos.y, left = tilePos.x,
		    zoom = this._map.getZoom() + this.options.zoomOffset;
		zoom = this._zoomWhole * Math.pow(2, zoom);

		var tile_canvas = document.createElement("canvas");
		tile_canvas.width = tileSize;
		tile_canvas.height = tileSize;
		var tile_ctx = tile_canvas.getContext('2d');
		tile_ctx.drawImage(img,
			left / zoom, top / zoom, tileSize / zoom, tileSize / zoom,
			0, 0, tileSize, tileSize);

		/* for position check
		tile_ctx.font = '14pt Calibri';
		tile_ctx.fillStyle = 'black';
		tile_ctx.fillText('{x:'+tilePos.x+', y:'+tilePos.y+'}', 2, 20);
		*/

		return tile_canvas.toDataURL();
	},
});

L.tileLayer.simplePicture = function(url, options) {
	return new L.TileLayer.SimplePicture(url, options);
};

