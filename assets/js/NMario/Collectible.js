require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Flagpole': 'NMario/Collectible/Flagpole'
  },
  shim: {
    'Mushroom': {
      exports: 'Mushroom'
    },
    'Flagpole': {
      exports: 'Flagpole'
    }
  }
});

define('Collectible', ['Mushroom', 'Flagpole'], function (Mushroom, Flagpole) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Flagpole = Flagpole;

  return Collectible;
});
