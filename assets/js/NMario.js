require.config({
  paths: {
    'Game': 'NMario/Game',
    'Land': 'NMario/Component/Land',
    'Brick': 'NMario/Component/Brick',
    'Coin': 'NMario/Component/Coin'
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

define(['Game', 'Land', 'Brick', 'Coin'], function (Game, Land, Brick, Coin) {
  var NMario = {};

  NMario.Game = Game;

  NMario.Player = {};
  // NMario.Player.Mario = ...;
  // NMario.Player.RemoteMario = ...;

  NMario.Component = {};
  NMario.Component.Land = Land;
  NMario.Component.Brick = Brick;
  NMario.Component.Coin = Coin;

  return NMario;
});
