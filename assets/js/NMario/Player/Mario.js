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
      slide: 'super-slide',
      head: 'super-head'
    }
  };

  var Mario = function (identity, game, objects) {
    // stupid javascript scoping
    var self = this;

    var socket = null;

    var spriteOffset = 24 * identity.color;
    var anim = anim_key.small, state = 'small';
    var keypress = { 'up': false, 'down': false, 'left': false, 'right': false };

    Phaser.Sprite.call(this, game, 32 * (identity.color + 1) * localStorage.scale, 16 * localStorage.scale, 'mario', 0 + spriteOffset);
    objects.add(this);    

    var text_style = {
      font: (12 * localStorage.scale) + 'px SMB Filled',
      fill: '#ffffff',
      align: 'center'
    };
    this.playerName = game.add.text(0, 0, identity.name, text_style);
    this.playerName.anchor.setTo(0.5, 0.5);
    
    this.body.maxVelocity.x = 133 * localStorage.scale;
    this.body.gravity.y = 333 * localStorage.scale;
    this.body.collideWorldBounds = true;

    this.scale.setTo(localStorage.scale, localStorage.scale);

    // initialize animations
    this.animations.add('small-stand', [0 + spriteOffset], 1, true);
    this.animations.add('small-walk', [1 + spriteOffset, 2 + spriteOffset], 20, true);
    this.animations.add('small-jump', [3 + spriteOffset], 1, true);
    this.animations.add('small-turn', [4 + spriteOffset], 1, true);
    this.animations.add('small-slide', [5 + spriteOffset], 1, true);
    this.animations.add('small-die', [6 + spriteOffset], 1, true);
    this.animations.add('small-flag', [7 + spriteOffset], 1, true);

    this.animations.add('small2super', [8 + spriteOffset, 9 + spriteOffset, 10 + spriteOffset, 11 + spriteOffset, 12 + spriteOffset, 13 + spriteOffset, 14 + spriteOffset], 15, false);
    this.animations.add('super2small', [14 + spriteOffset, 13 + spriteOffset, 12 + spriteOffset, 11 + spriteOffset, 10 + spriteOffset, 9 + spriteOffset, 8 + spriteOffset], 15, false);

    this.animations.add('super-stand', [15 + spriteOffset], 1, true);
    this.animations.add('super-walk', [16 + spriteOffset, 17 + spriteOffset, 16 + spriteOffset, 15 + spriteOffset], 25, true);
    this.animations.add('super-jump', [18 + spriteOffset], 1, true);
    this.animations.add('super-turn', [19 + spriteOffset], 1, true);
    this.animations.add('super-slide', [20 + spriteOffset], 1, true);
    this.animations.add('super-die', [21 + spriteOffset], 1, true);
    this.animations.add('super-flag', [22 + spriteOffset], 1, true);
    this.animations.add('super-head', [23 + spriteOffset], 1, true);

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

    this.setKeyState = function (key, state) {
      keypress[key] = state;
    };

    this.getKeyState = function (key) {
      return keypress[key];
    };

    this.update = function () {
      // game.physics.arcade.collide(this, objects);

      if (state == 'small') {
        smallMario();
      } else if (state == 'super') {
        superMario();
      }

      if (self.getKeyState('left')) {
        // move to left

        if (self.body.velocity.x > 0) {

          if (self.body.velocity.x > 10 * localStorage.scale) {
            self.body.acceleration.x = -200 * localStorage.scale;
            self.scale.x = localStorage.scale;
            self.animations.play(anim.turn);
          } else {
            self.body.acceleration.x = -100 * localStorage.scale;
            self.scale.x = - localStorage.scale;
            self.animations.play(anim.walk);
          }
        } else {
          self.body.acceleration.x = -50 * localStorage.scale;
          self.scale.x = - localStorage.scale;
          self.animations.play(anim.walk);
        }

      } else if (self.getKeyState('right')) {
        // move to right

        if (self.body.velocity.x < 0) {

          if (self.body.velocity.x < -10 * localStorage.scale) {
            self.body.acceleration.x = 200 * localStorage.scale;
            self.scale.x = - localStorage.scale;
            self.animations.play(anim.turn);
          } else {
            self.body.acceleration.x = 100 * localStorage.scale;
            self.scale.x = localStorage.scale;
            self.animations.play(anim.walk);
          }
        } else {
          self.body.acceleration.x = 50 * localStorage.scale;
          self.scale.x = localStorage.scale;
          self.animations.play(anim.walk);
        }
      } else {
        // stand still

        if (Math.abs(self.body.velocity.x) < localStorage.scale) {
          self.body.velocity.x = 0;
          self.body.acceleration.x = 0;
          self.animations.play(anim.stand);
        } else {
          // sliding

          if (self.body.velocity.x > 0) {
            self.body.acceleration.x = -100 * localStorage.scale;
          } else {
            self.body.acceleration.x = 100 * localStorage.scale;
          }

          if (self.getKeyState('down') && state == 'super') {
            self.animations.play(anim.head);
            self.body.setSize(14, 16, 0, 8 * localStorage.scale);

          } else {
            self.animations.play(anim.slide);
          }
        }
      }

      // jumping control
      if (!self.body.touching.down) {
        self.animations.play(anim.jump);
      }

      if (self.getKeyState('up') && self.body.touching.down) {

        if (self.getKeyState('left') || self.getKeyState('right')) {
          self.body.velocity.y = -200 * localStorage.scale;
        } else {
          self.body.velocity.y = -220 * localStorage.scale;
        }
      }

      self.playerName.x = self.body.x + 16 ;
      self.playerName.y = self.body.y - 16;
    };

		this.collide = function(target) {
			console.log("superclass");
		};

    this.render = function () {
      game.debug.body(self);
    };

    this.broadcast = function (socket) {
      if (socket != null) {
        // send state to other player
        socket.emit('player data update', {
          id: sessionStorage.id,
          keypress: keypress,
          state: state,
          physics: {
            position: { x: self.body.x / localStorage.scale, y: self.body.y / localStorage.scale },
            velocity: { x: self.body.velocity.x / localStorage.scale, y: self.body.velocity.y / localStorage.scale },
            acceleration: { x: self.body.acceleration.x / localStorage.scale, y: self.body.acceleration.y / localStorage.scale }
          }
        });
      }
    };

    this.__defineSetter__('state', function (value) {
      state = value;
    });

    this.__defineSetter__('socket', function (value) { socket = value; });

    this.send = function (key, data) {
      socket.emit(key, data);
    };
  };

  Mario.prototype = Object.create(Phaser.Sprite.prototype);
  Mario.prototype.constructor = Mario;
  Mario.prototype.Type = 'Mario';

  return Mario;
});
