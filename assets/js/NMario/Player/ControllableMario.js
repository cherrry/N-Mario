require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min',
    'Mario': 'NMario/Player/Mario'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    },
    'Mario': {
      exports: 'Mario'
    }
  }
});

define('ControllableMario', ['Phaser', 'Mario'], function (Phaser, Mario) {
  var ControllableMario = function (identity, game, objects) {
    var self = this;

    Mario.call(this, identity, game, objects);
    game.camera.follow(this,  Phaser.Camera.FOLLOW_LOCKON);
    
    this.collide = function(target) {
      if (this.state == 'small' || this.state == 'super') {
        switch (target.Type) {
          case 'Mushroom':
            //If it is hit by player from above, kill the mushroom
            if (target.body.touching.up == true) {
              // target.collected();
              self.body.velocity.y = -0.8 * self.body.velocity.y;
              self.send('player collect object', { id: target.id, Type: target.Type });
            } else { //Otherwise, hit the player
              this.hit();
            }
            break;
          case 'Coin':
            // target.collected();
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'Power-Up':
            // target.collected();
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'Brick':
            if (target.body.touching.down == true) {
              self.send('player collect object', { id: target.id, Type: target.Type });
            }
            break;
          case 'Flag':
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'Boat':
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'LifeUp':
            // target.collected();
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'LifeDown':
            // target.collected();
            self.send('player collect object', { id: target.id, Type: target.Type });
            break;
          case 'Water':
            self.send('player die', { id: target.id });
            break;
        }
      }
    };

    var super_reborn = this.reborn;
    this.reborn = function () {
      //Subtract lives
      self.lives -= 1;

      if (self.lives <= 0) {
        console.log('game over');
        self.state = 'game over';
        self.send('player game over', { player: sessionStorage.id });
      }

      //If there is life remains, reset the state and physics, go back to last reborn point
      if (self.state != 'game over'){
        self.x = self.rebornX;
        self.y = self.rebornY;
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
        self.animations.play('small-jump');
        setTimeout(function () { self.state = 'small'; }, 1000);
        //state = 'small';
      } 
    };
  };

  ControllableMario.prototype = Object.create(Mario.prototype);
  ControllableMario.prototype.constructor = ControllableMario;
  ControllableMario.prototype.Type = 'ControllableMario';

  return ControllableMario;
});
