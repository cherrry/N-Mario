define('Question', ['NMario'], function(NMario) {
  console.log('Question.js loaded');

  NMario.Question = function(group, y, x, attr) {
    var tile = group.create(x * 16 * globalScale, y * 16 * globalScale, 'brick', 1);
    tile.scale.setTo(globalScale, globalScale);
    tile.body.immovable = true;
    tile.animations.add('question', [4, 5, 6, 7], 4, true);
    tile.animations.play('question');
  };

});
