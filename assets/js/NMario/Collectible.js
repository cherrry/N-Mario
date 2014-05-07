require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin',
    'Flagpole': 'NMario/Collectible/Flagpole'
  },
  shim: {
    'Mushroom': {
      exports: 'Mushroom'
    },
    'Coin': {
      exports: 'Coin'
    },
    'Flagpole': {
      exports: 'Flagpole'
    }
  }
});

<<<<<<< HEAD
define('Collectible', ['Mushroom', 'Coin', 'Flagpole'], function (Mushroom, Coin, Flagpole) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;
  Collectible.Flagpole = Flagpole;
  
  return Collectible;
});
