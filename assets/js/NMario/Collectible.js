require.config({
  paths: {
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin',
    'Flagpole': 'NMario/Collectible/Flagpole',
    'PowerUp': 'NMario/Collectible/PowerUp',
    'Brick': 'NMario/Collectible/Brick',
    'Box': 'NMario/Collectible/Box',
    'Water': 'NMario/Collectible/Water',
    'Boat': 'NMario/Collectible/Boat'
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

define('Collectible', ['Mushroom', 'Coin', 'Flagpole', 'PowerUp', 'Brick', 'Box', 'Water', 'Boat'], function (Mushroom, Coin, Flagpole, PowerUp, Brick, Box, Water, Boat) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;
  Collectible.Flagpole = Flagpole;
  Collectible.PowerUp = PowerUp;
  Collectible.Brick = Brick;
  Collectible.Box = Box;
  Collectible.Water = Water;
  Collectible.Boat = Boat;

  return Collectible;
});
