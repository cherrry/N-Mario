require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin'
  },
  shim: {
    'Mushroom': {
      exports: 'Mushroom'
    },
    'Coin': {
      exports: 'Coin'
    }
  }
});

define('Collectible', ['Mushroom', 'Coin'], function (Mushroom) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;

  return Collectible;
});
