require.config({
  paths: {
    'Game': 'NMario/Game'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define(['Game'], function (Game) {
  var NMario = {};

  NMario.Game = Game;

  NMario.Player = {};
  // NMario.Player.Mario = ...;
  // NMario.Player.RemoteMario = ...;

  NMario.Component = {};
  // NMario.Component.Land = ...;

  return NMario;
});
