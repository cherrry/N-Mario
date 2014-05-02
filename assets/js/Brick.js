define('Brick', ['NMario'], function(NMario) {
  console.log('Brick.js loaded');

  NMario.Brick = function(group, y, x, attr) {
    var tile = group.create(x * 16 * globalScale, y * 16 * globalScale, 'brick', 1);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;
    tile.animations.add('brick', [0, 0, 1, 2, 3], 6, true);
    tile.animations.play('brick');
  };

});
