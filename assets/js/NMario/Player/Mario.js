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
      slide: 'small-slide',
      dead: 'small-dead',
      flag: 'small-flag',
      yeah: 'small-yeah'
    },
    super: {
      stand: 'super-stand',
      walk: 'super-walk',
      jump: 'super-jump',
      turn: 'super-turn',
      slide: 'super-slide',
      head: 'super-head',
      dead: 'super-dead',
      flag: 'super-flag',
      yeah: 'super-yeah'
    }
  };

  var Mario = function (identity, game, objects) {
    // stupid javascript scoping
    var self = this;

    var socket = null;

    var spriteOffset = 24 * identity.color;
    var anim = anim_key.small, state = 'small';
    var keypress = { 'up': false, 'down': false, 'left': false, 'right': false, 'q': false };

    var rebornX = 32 * (identity.color + 1) * localStorage.scale; 
    var rebornY = 16 * localStorage.scale;
    Phaser.Sprite.call(this, game, rebornX, rebornY, 'mario', 0 + spriteOffset);
    objects.add(this);    

    var text_style = {
      font: (12 * localStorage.scale) + 'px SMB Filled',
      fill: '#ffffff',
      align: 'center'
    };
    this.playerName = game.add.text(0, 0, identity.name, text_style);
    this.playerName.anchor.setTo(0.5, 0.5);
    this.lives = identity.lives;
    this.coins = identity.coins;
    
    this.body.maxVelocity.x = 133 * localStorage.scale;
    this.body.maxVelocity.y = 300 * localStorage.scale;
    this.body.gravity.y = 333 * localStorage.scale;
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = false;

    this.scale.setTo(localStorage.scale, localStorage.scale);

    // initialize animations
    this.animations.add('small-stand', [0 + spriteOffset], 1, true);
    this.animations.add('small-walk', [1 + spriteOffset, 2 + spriteOffset], 20, true);
    this.animations.add('small-jump', [3 + spriteOffset], 1, true);
    this.animations.add('small-turn', [4 + spriteOffset], 1, true);
    this.animations.add('small-slide', [5 + spriteOffset], 1, true);
    this.animations.add('small-dead', [6 + spriteOffset], 1, true);
    this.animations.add('small-flag', [7 + spriteOffset], 1, true);
    this.animations.add('small-yeah', [4 + spriteOffset], 0.5, false);

    this.animations.add('small2super', [8 + spriteOffset, 9 + spriteOffset, 10 + spriteOffset, 11 + spriteOffset, 12 + spriteOffset, 13 + spriteOffset, 14 + spriteOffset], 6, false);
    this.animations.add('super2small', [14 + spriteOffset, 13 + spriteOffset, 12 + spriteOffset, 11 + spriteOffset, 10 + spriteOffset, 9 + spriteOffset, 8 + spriteOffset], 6, false);

    this.animations.add('super-stand', [15 + spriteOffset], 1, true);
    this.animations.add('super-walk', [16 + spriteOffset, 17 + spriteOffset, 16 + spriteOffset, 15 + spriteOffset], 25, true);
    this.animations.add('super-jump', [18 + spriteOffset], 1, true);
    this.animations.add('super-turn', [19 + spriteOffset], 1, true);
    this.animations.add('super-slide', [20 + spriteOffset], 1, true);
    this.animations.add('super-head', [21 + spriteOffset], 1, true);
    this.animations.add('super-dead', [22 + spriteOffset], 1, true);
    this.animations.add('super-flag', [23 + spriteOffset], 1, true);
    this.animations.add('super-yeah', [20 + spriteOffset], 0.5, false);

    // set anchor and start animation
    this.anchor.setTo(0.5, 0.5);
    this.animations.play(anim.stand);

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

    this.grow = function () {
      if (state == 'small') {
        state = 'small2super';

        // stop moving when growing up
        self.body.velocity.x = 0;
        self.body.velocity.y = 0;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;
        self.body.allowGravity = false;

        self.animations.play('small2super');
      }
    };

		this.shrink = function () {
			if (state == 'super') {
				state = 'super2small';

        // stop moving when shrinking
        self.body.velocity.x = 0;
        self.body.velocity.y = 0;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;
        self.body.allowGravity = false;
				
        self.animations.play('super2small');
			}
		};

    this.flag = function (position) {
      if (state != 'flag') {
        state = 'flag';

        //Set Mario to climb the flag pole
        self.x = position.x - 10;
        self.scale.x = localStorage.scale;
        self.body.velocity.x = 0;
        self.body.velocity.y = 100 * localStorage.scale;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;
        self.body.allowGravity = false;
				
        self.animations.play(anim.flag);
      }
    };

    this.yeah = function () {
      if (state != 'yeah') {
        state = 'yeah';

        console.log('yeah!');

        // Set Mario move a step right
        self.x += 48;

        // Stop moving
        self.body.velocity.x = 0;
        self.body.velocity.y = 0;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;
        self.body.allowGravity = false;
				
        self.animations.play(anim.yeah);
      }
    };

    this.die = function () {
      if (state != 'dead'){
        state = 'dead';

        //Set body to bounce upword
        self.body.velocity.x = 0;
        self.body.velocity.y = -300 * localStorage.scale;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;

        //Set no collision
        self.body.checkCollision.up = false;
        self.body.checkCollision.down = false;
        self.body.checkCollision.left = false;
        self.body.checkCollision.right = false;
        self.body.collideWorldBounds = false;

        //Change to dying animation
        self.animations.play(anim.dead);
      }
    };

    self.events.onOutOfBounds.add(function () {
      if (state != 'game over'){
        self.reborn();
      }
    }, self);

    self.events.onAnimationComplete.add(function () {
      switch (state){
        case 'small2super':
          state = 'super';
          self.body.allowGravity = true;
          break;
        case 'super2small':
          state = 'small';
          self.body.allowGravity = true;
          break;
        case 'yeah':
          self.send('end game');
          break;
      }
    }, self);

    this.reborn = function () {
      //Subtract lives
      self.lives -= 1;
      if (self.lives <= 0) {
        state = 'game over';
        self.send('player game over');
      }

      //If there is life remains, reset the state and physics, go back to last reborn point
      if (state != 'game over'){
        state = 'small';
        self.x = rebornX;
        self.y = rebornY;
        self.scale.x = localStorage.scale;
        self.body.velocity.x = 0;
        self.body.velocity.y = 0;
        self.body.acceleration.x = 0;
        self.body.acceleration.y = 0;
        self.body.checkCollision.up = true;
        self.body.checkCollision.down = true;
        self.body.checkCollision.left = true;
        self.body.checkCollision.right = true;
        self.body.collideWorldBounds = true;

      } 
    };

    this.hit = function () {
      //Mario is being hit.
      //If its state is 'super', change to 'small'
      //Othwise, kill the player.
      switch (state) {
        case 'small':
          self.send('player die');
          break;
        case 'super':
          self.send('player shrink');
          break;
      }
    };

    this.update = function () {
      // game.physics.arcade.collide(this, objects);

      //Update parameters according to state
      if (state == 'small') {
        smallMario();
      } else if (state == 'super') {
        superMario();
      } else if (state == 'small2super') {
        self.body.setSize(14, 27, 0 * localStorage.scale, 2 * localStorage.scale);
        self.playerName.x = self.body.x + 16 ;
        self.playerName.y = self.body.y - 24;
      }

      //If still alive, update movements
      if (['small', 'super'].indexOf(state) >= 0) {
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

            self.animations.play(anim.slide);
          }
        }

        // jumping control
        if (!self.body.touching.down) {

          self.animations.play(anim.jump);
        } else if (self.getKeyState('down') && state == 'super') {
          // super mario cover its head

          // it must slide at that time
          if (self.body.velocity.x > 0) {
            self.body.acceleration.x = -100 * localStorage.scale;
          } else {
            self.body.acceleration.x = 100 * localStorage.scale;
          }

          self.animations.play(anim.head);
          self.body.setSize(14, 16, 0, 8 * localStorage.scale);
        }

        if (self.getKeyState('up') && self.body.touching.down) {

          if (self.getKeyState('left') || self.getKeyState('right')) {
            self.body.velocity.y = -200 * localStorage.scale;
          } else {
            self.body.velocity.y = -220 * localStorage.scale;
          }
        }

        //Suicide
        if (self.getKeyState('q')) {
          self.send('player die');
        }
      }

      //If climbing flag pole, change to 'yeah' when touching ground
      if (state == 'flag') {
        if (self.body.touching.down) {
          self.send('player yeah');
        }
      }

      //Set player name above the player
      self.playerName.x = self.body.x + 16 ;
      if (state == 'small') {
        self.playerName.y = self.body.y - 16;
      } else {
        self.playerName.y = self.body.y - 24;
      }
    };

    this.collide = function(target) {};

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

    this.__defineGetter__('state', function () {
      return state;
    });

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
