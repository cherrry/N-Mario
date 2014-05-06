require.config({
  paths: {
    'Game': 'NMario/Game',
    'Player': 'NMario/Player',
    'Component': 'NMario/Component'
  },
  shim: {
    'Game': {
      exports: 'Game'
    },
    'Player': {
      exports: 'Player'
    },
    'Component': {
      exports: 'Component'
    }
  }
});

define(['Game', 'Player', 'Component'], function (Game, Player, Component) {
  var NMario = {};

  NMario.Game = Game;
  NMario.Player = Player;
  NMario.Component = Component;

  return NMario;
});
