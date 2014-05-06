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

define('Mario', ['Phaser'], function (Phaser) {
  var anim_key = {
    small: {
      stand: 'small-stand',
      walk: 'small-walk',
      jump: 'small-jump',
      turn: 'small-turn',
      slide: 'small-slide'
    },
    super: {
      stand: 'super-stand',
      walk: 'super-walk',
      jump: 'super-jump',
      turn: 'super-turn',
      slide: 'super-slide'
    }
  };

  var Mario = function (identity, game, group, solids) {
    // stupid javascript scoping
    var self = this;

    var spriteOffset = 26 * identity.color;
    var anim = anim_key.small, state = 'small';

    Phaser.Sprite.call(this, game, 16 * localStorage.scale, 16 * localStorage.scale, 'mario', 0 + spriteOffset);
    group.add(this);

    this.body.maxVelocity.x = 400 * localStorage.scale;
    this.body.gravity.y = 333 * localStorage.scale;
    this.body.collideWorldBounds = true;

    this.scale.setTo(localStorage.scale, localStorage.scale);

    // initialize animations
    this.animations.add('small-stand', [0 + spriteOffset], 1, true);
    this.animations.add('small-walk', [1 + spriteOffset, 2 + spriteOffset], 15, true);
    this.animations.add('small-jump', [3 + spriteOffset], 1, true);
    this.animations.add('small-turn', [4 + spriteOffset], 1, true);
    this.animations.add('small-slide', [5, spriteOffset], 1, true);

    this.animations.add('super-stand', [14 + spriteOffset], 1, true);
    this.animations.add('super-walk', [15 + spriteOffset, 16 + spriteOffset, 15 + spriteOffset, 14 + spriteOffset], 30, true);
    this.animations.add('super-jump', [17 + spriteOffset], 1, true);
    this.animations.add('super-turn', [18 + spriteOffset], 1, true);
    this.animations.add('super-slide', [19 + spriteOffset], 1, true);
    this.animations.add('super-head', [25, spriteOffset], 1, true);

    // set anchor and start animation
    this.anchor.setTo(0.5, 0.5);
    this.animations.play(anim.stand);
    smallMario();

    function smallMario() {
      self.body.setSize(14, 16, 0 * localStorage.scale, 8 * localStorage.scale);
      anim = anim_key.small;
      state = 'small';
    }
    function superMario() {
      self.body.setSize(14, 27, 0 * localStorage.scale, 2 * localStorage.scale);
      anim = anim_key.super;
      state = 'super';
    }

    this.update = function () {
      game.physics.arcade.collide(self, solids);
    };

    this.debug = function () {
      game.debug.body(this);
    }

  };

  Mario.prototype = Object.create(Phaser.Sprite.prototype);
  Mario.prototype.constructor = Mario;

  return Mario;
});
