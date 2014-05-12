require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin',
    'Flagpole': 'NMario/Collectible/Flagpole',
    'PowerUp': 'NMario/Collectible/PowerUp',
    'Brick': 'NMario/Collectible/Brick',
    'Water': 'NMario/Collectible/Water'
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

define('Collectible', ['Mushroom', 'Coin', 'Flagpole', 'PowerUp', 'Brick', 'Water'], function (Mushroom, Coin, Flagpole, PowerUp, Brick, Water) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;
  Collectible.Flagpole = Flagpole;
  Collectible.PowerUp = PowerUp;
  Collectible.Brick = Brick;
  Collectible.Water = Water;
  
  return Collectible;
});
