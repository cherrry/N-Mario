define('Coin', ['NMario'], function(NMario) {
  console.log('Coin.js loaded');

  NMario.Coin = function(group, y, x, attr) {
    var tile = group.create(x * 16 * globalScale, y * 16 * globalScale, 'coin', 1);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;
    tile.animations.add('coin', [0, 1, 2, 3], 4, true);
    tile.animations.play('coin');
  };

});
