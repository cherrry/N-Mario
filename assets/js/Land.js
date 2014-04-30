define('Land', ['NMario'], function(NMario) {
  console.log('Land.js loaded');

  NMario.Land = function(group, y, x, callback) {
    var tile = group.create(x * 16 * globalScale, y * 16 * globalScale, 'land', 1);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;
  };

});
