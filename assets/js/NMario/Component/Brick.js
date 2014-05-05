define('Brick', function() {
  console.log('Brick.js loaded');
  var Brick = function(group, i, j, attr) {
    var tile = group.create(i * 16 * localstorage.globalScale, j * 16 * localstorage.globalScale, 'brick', 1);
    tile.scale.setTo(localstorage.globalScale, localstorage.globalScale);
    tile.body.immovable = true;
    tile.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    tile.animations.play('brick');
  };
});