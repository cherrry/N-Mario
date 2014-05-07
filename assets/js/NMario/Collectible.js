require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin',
    'Flagpole': 'NMario/Collectible/Flagpole',
    'PowerUp': 'NMario/Collectible/PowerUp'
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
    },
    'PowerUp': {
      exports: 'PowerUp'
    }
  }
});

define('Collectible', ['Mushroom', 'Coin', 'Flagpole', 'PowerUp'], function (Mushroom, Coin, Flagpole, PowerUp) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;
  Collectible.Flagpole = Flagpole;
  Collectible.PowerUp = PowerUp;
  
  return Collectible;
});
