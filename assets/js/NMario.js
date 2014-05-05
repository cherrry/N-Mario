require.config({
  paths: {
    'Game': 'NMario/Game',
    'Component': 'NMario/Component'
  },
  shim: {
    'Game': {
      exports: 'Game'
    }
  }
});

define(['Game', 'Component'], function (Game, Component) {
  var NMario = {};

  NMario.Game = Game;

  NMario.Player = {};

  NMario.Component = Component;

  return NMario;
});
