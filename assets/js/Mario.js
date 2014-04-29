function Mario(identity, game, solids) {

  // ensure the return value is a Mario
  if (this == window) {
    return new Mario(identity, game, solids);
  }

  var player;
  var spriteOffset = 26 * identity.color;
  var anim = {
    stand: 'samll-stand',
    walk: 'small-walk',
    jump: 'small-jump',
    turn: 'small-turn',
    slide: 'small-slide'
  };
  var state = 'small';

  player = game.add.sprite(16 * scale, 0, 'mario');
  game.physics.arcade.enable(player);

  // physical properties
  player.body.maxVelocity.x = 400;
  player.body.gravity.y = 333 * scale;
  player.body.collideWorldBounds = true;

  player.scale.setTo(scale, scale);

  // initialize animations
  player.animations.add('small-stand', [0 + spriteOffset], 1, true);
  player.animations.add('small-walk', [1 + spriteOffset, 2 + spriteOffset], 15, true);
  player.animations.add('small-jump', [3 + spriteOffset], 1, true);
  player.animations.add('small-turn', [4 + spriteOffset], 1, true);
  player.animations.add('small-slide', [5 + spriteOffset], 1, true);

  player.animations.add('super-stand', [14 + spriteOffset], 1, true);
  player.animations.add('super-walk', [15 + spriteOffset, 16 + spriteOffset, 15 + spriteOffset, 14 + spriteOffset], 30, true);
  player.animations.add('super-jump', [17 + spriteOffset], 1, true);
  player.animations.add('super-turn', [18 + spriteOffset], 1, true);
  player.animations.add('super-slide', [19 + spriteOffset], 1, true);
  player.animations.add('super-head', [25 + spriteOffset], 1, true);

  // set anchor and start animation
  player.anchor.setTo(0.5, 0.5);
  player.animations.play(anim.stand);

  // game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
  game.camera.follow(player);

  function smallMario() {
    player.body.setSize(14, 16, 0 * scale, 8 * scale);
    anim.stand = 'small-stand';
    anim.walk = 'small-walk';
    anim.jump = 'small-jump';
    anim.turn = 'small-turn';
    anim.slide = 'small-slide';
    anim.head = 'small-slide';
    state = 'small';
  }

  function superMario() {
    player.body.setSize(14, 27, 0 * scale, 2 * scale);
    anim.stand = 'super-stand';
    anim.walk = 'super-walk';
    anim.jump = 'super-jump';
    anim.turn = 'super-turn';
    anim.slide = 'super-slide';
    anim.head = 'super-head';
    state = 'super';
  }

  this.update = function(data) {
    var keyboard = data.keyboard;

    game.physics.arcade.collide(player, solids);

    if (state == 'small') {
      smallMario();
    } else if (state == 'super') {
      superMario();
    }

    if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
      // move to left

      if (player.body.velocity.x > 0) {

        if (player.body.velocity.x > 10 * scale) {
          player.body.acceleration.x = -200 * scale;
          player.scale.x = scale;
          player.animations.play(anim.turn);
        } else {
          player.body.acceleration.x = -100 * scale;
          player.scale.x = -scale;
          player.animations.play(anim.walk);
        }
      } else {
        player.body.acceleration.x = -50 * scale;

        player.scale.x = -scale;
        player.animations.play(anim.walk);
      }

    } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      // move to right

      if (player.body.velocity.x < 0) {

        if (player.body.velocity.x < -10 * scale) {
          player.body.acceleration.x = 200 * scale;
          player.scale.x = -scale;
          player.animations.play(anim.turn);
        } else {
          player.body.acceleration.x = 100 * scale;
          player.scale.x = scale;
          player.animations.play(anim.walk);
        }
      } else {
        player.body.acceleration.x = 50 * scale;

        player.scale.x = scale;
        player.animations.play(anim.walk);
      }

    } else {
      // stand still
      if (Math.abs(player.body.velocity.x) < scale) {
        player.body.velocity.x = 0;
        player.body.acceleration.x = 0;

        player.animations.play(anim.stand);
      } else {
        if (player.body.velocity.x > 0) {
          player.body.acceleration.x = -100 * scale;
        } else {
          player.body.acceleration.x = 100 * scale;
        }

        if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
          player.animations.play(anim.head);
          player.body.setSize(14, 16, 0 * scale, 8 * scale);
        } else {
          player.animations.play(anim.slide);
        }
      }

    }

    if (!player.body.touching.down) {
      player.animations.play(anim.jump);
    }

    if (keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down) {
      // jump
      if (keyboard.isDown(Phaser.Keyboard.LEFT) || keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.body.velocity.y = -200 * scale;
      } else {
        player.body.velocity.y = -220 * scale;
      }
    }

  };

  this.__defineGetter__('player', function() {
    return player;
  });

  this.debug = function() {
    game.debug.body(player);
  };

  return this;

};
