require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Land', ['Phaser'], function (Phaser) {
  var Land = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'land', 1);
    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;
  };
  Land.prototype = Object.create(Phaser.Sprite.prototype);
  Land.prototype.constructor = Land;

  return Land;
});
