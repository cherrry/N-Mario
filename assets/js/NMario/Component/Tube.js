require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define('Tube', ['Phaser'], function (Phaser) {
  var Tube = function(game, group, x, y, attr) {

    Phaser.Sprite.call(this, game, x * 16 * localStorage.scale, y * 16 * localStorage.scale, 'tube', attr.frame);
    group.add(this);

    this.scale.setTo(localStorage.scale, localStorage.scale);
    this.body.immovable = true;

    // set bounding box
    /*
    if (attr.frame == 0) {
      this.body.setSize(32, 16, 0, 0);
    } else if (attr.frame == 1) {
      this.body.setSize(32, 16, 0, 0);
    } else if (attr.frame == 2) {
      this.body.setSize(32, 16, 0, 0);
    }
    */

    this.render = function () {
      game.debug.body(this);
    };
  };
  Tube.prototype = Object.create(Phaser.Sprite.prototype);
  Tube.prototype.constructor = Tube;
  Tube.prototype.Type = 'Tube';

  return Tube;
});
