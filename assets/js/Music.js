require.config({
  paths: {
    'Phaser': '../libs/phaser/phaser.min'
  }
});

define('Music', ['Phaser'], function (Phaser) {
  
  var Music = {};
  var phaser = new Phaser.Game(0, 0, Phaser.CANVAS, 'music', { preload: preload, create: function() {}, update: function() {} }, false, false);

  function preload() {
    phaser.load.audio('theme', ['assets/music/theme.mp3', 'assets/music/theme.ogg']);
    phaser.load.audio('theme3', ['assets/music/theme3.mp3', 'assets/music/theme3.ogg']);
    phaser.load.audio('coin', ['assets/music/coin.mp3', 'assets/music/coin.ogg']);
    phaser.load.audio('dead', ['assets/music/dead.mp3', 'assets/music/dead.ogg']);

    phaser.load.audio('jump', ['assets/music/jump.mp3', 'assets/music/jump.ogg']);
    phaser.load.audio('stomp', ['assets/music/stomp.mp3', 'assets/music/stomp.ogg']);
    phaser.load.audio('bump', ['assets/music/bump.mp3', 'assets/music/bump.ogg']);

    phaser.load.audio('powerup', ['assets/music/powerup.mp3', 'assets/music/powerup.ogg']);
    phaser.load.audio('small2super', ['assets/music/small2super.mp3', 'assets/music/small2super.ogg']);
    phaser.load.audio('super2small', ['assets/music/super2small.mp3', 'assets/music/super2small.ogg']);

    phaser.load.audio('end-level', ['assets/music/end-level.mp3', 'assets/music/end-level.ogg']);
    phaser.load.audio('end-game', ['assets/music/end-game.mp3', 'assets/music/end-game.ogg']);
  }

  var theme = null;

  var sound_playing = 0;
  var sound = null;

  var blocking_sound_playing = 0;
  var blocking_sound = null;

  Music.stopTheme = function () {
    if (theme != null) {
      theme.stop();
      theme = null;
    }
  };

  Music.theme = function (_theme) {
    if (theme != null) {
      theme.stop();
    }

    theme = phaser.sound.play(_theme, 1, true);
  };

  Music.sound = function (_sound, _callback, _volume) {
    sound_playing++;
    sound = phaser.sound.play(_sound, _volume || 1);

    sound.onStop.add(function () {
      sound_playing--;
    });

    if (_callback != null) {
      sound.onStop.add(_callback);
    }
  };

  Music.blockingSound = function (_sound, _callback, _volume) {
    if (theme != null) {
      theme.pause();
    }

    blocking_sound_playing++;
    blocking_sound = phaser.sound.play(_sound, _volume || 1);

    blocking_sound.onStop.add(function () {
      blocking_sound_playing--;
      if (theme != null && blocking_sound_playing == 0) {
        theme.resume();
      }
    });

    if (_callback != null) {
      blocking_sound.onStop.add(_callback);
    }
  }

  return Music;
});
