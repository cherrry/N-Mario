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
    phaser.load.audio('coin', ['assets/music/coin.mp3', 'assets/music/coin.ogg']);
  }

  var theme = null;
  var sound_playing = 0;
  var sound = null;

  Music.theme = function (_theme) {
    if (theme != null) {
      theme.stop();
    }

    theme = phaser.sound.play(_theme);
    theme.onStop.add(function () {
      theme.restart();
    });
  };

  Music.sound = function (_sound) {
    if (theme != null) {
      //theme.pause();
    }

    sound_playing++;
    sound = phaser.sound.play(_sound);

    sound.onStop.add(function () {
      sound_playing--;
      if (theme != null && sound_playing == 0) {
        //theme.resume();
      }
    });
  };

  return Music;
});
