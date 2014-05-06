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
  var Land = function(game, group, x, y, attr) {
    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'land', 1);
    group.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;
  };
  Land.prototype = Object.create(Phaser.Sprite.prototype);
  Land.prototype.constructor = Land;

  return Land;
});
