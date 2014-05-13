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

define('Scoreboard', ['Phaser'], function (Phaser) {

  var Line = function(game, i, player){
    var text_style = {
      font: (12 * localStorage.scale) + 'px SMB Filled',
      fill: '#ffffff',
      align: 'left'
    };
    this.playerName = game.add.text(5 * localStorage.scale, (18*i+5) * localStorage.scale, player.playerName.text, text_style);
    this.playerName.fixedToCamera = true;
    var life = game.add.sprite(16*8 * localStorage.scale, (18*i+2) * localStorage.scale, 'mario-color');
    game.physics.arcade.enable(life);
    life.animations.add('mario-life', [(player.playerColor+1)%9], 20, true);
    life.animations.play('mario-life');
    life.scale.setTo(localStorage.scale, localStorage.scale);
    life.fixedToCamera = true;
    this.lives = game.add.text(16*9 * localStorage.scale, (18*i+5) * localStorage.scale, '', text_style);
    this.lives.fixedToCamera = true;
    var coin = game.add.sprite(16*11 * localStorage.scale, (18*i+2) * localStorage.scale, 'coin');
    game.physics.arcade.enable(coin);
    coin.animations.add('flipping', [0, 1, 2, 3], 5, true);
    coin.animations.play('flipping');
    coin.scale.setTo(localStorage.scale, localStorage.scale);
    coin.fixedToCamera = true;
    this.coins = game.add.text(16*12 * localStorage.scale, (18*(i)+5) * localStorage.scale, '', text_style);
    this.coins.fixedToCamera = true;

  }
  Line.prototype.constructor = Line;
  Line.prototype.getPlayerName = function(){
    return this.playerName;
  }
  Line.prototype.getLives = function(){
    return this.lives;
  }
  Line.prototype.getCoins = function(){
    return this.coins;
  }


  var Scoreboard = function(game, player, remote_players){
    this.player = player;
    this.remote_players = remote_players;

    this.lines = new Array();
    this.lines.push(new Line(game, 0, player));
    this.noOfRemote = 0;
    for(var key in remote_players){
      this.noOfRemote++;
      this.lines.push(new Line(game, this.noOfRemote, remote_players[key]));      
    }

  }
  Scoreboard.prototype.constructor = Scoreboard;
  Scoreboard.prototype.update = function() {
    var line = this.lines[0];
    var i = 0;    
    line.getLives().text = ' X '+(this.player.lives > 99 ? 'oo' : this.player.lives);
    line.getCoins().text = ' X '+this.player.coins;
    for(var key in this.remote_players){
      line = this.lines[++i];
      line.getLives().text = ' X '+(this.remote_players[key].lives > 99 ? 'oo' : this.remote_players[key].lives);
      line.getCoins().text = ' X '+this.remote_players[key].coins;
    }
  }

  return Scoreboard;
});
