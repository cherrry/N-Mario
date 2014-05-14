require.config({
  paths: {
    'BaseCollectible': 'NMario/Collectible/BaseCollectible',
    'Mushroom': 'NMario/Collectible/Mushroom',
    'Coin': 'NMario/Collectible/Coin',
    'Flag': 'NMario/Collectible/Flag',
    'Flagpole': 'NMario/Collectible/Flagpole',
    'PowerUp': 'NMario/Collectible/PowerUp',
    'Brick': 'NMario/Collectible/Brick',
    'Box': 'NMario/Collectible/Box',
    'Water': 'NMario/Collectible/Water',
    'Boat': 'NMario/Collectible/Boat',
    'LifeUp': 'NMario/Collectible/LifeUp',
    'LifeDown': 'NMario/Collectible/LifeDown'
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

define('Collectible', ['BaseCollectible', 'Mushroom', 'Coin', 'Flag', 'Flagpole', 'PowerUp', 'Brick', 'Box', 'Water', 'Boat','LifeUp','LifeDown'], function (BaseCollectible, Mushroom, Coin, Flag, Flagpole, PowerUp, Brick, Box, Water, Boat, LifeUp, LifeDown) {
  var Collectible = {};

  Collectible.Mushroom = Mushroom;
  Collectible.Coin = Coin;
  Collectible.Flag = Flag;
  Collectible.Flagpole = Flagpole;
  Collectible.PowerUp = PowerUp;
  Collectible.Brick = Brick;
  Collectible.Box = Box;
  Collectible.Water = Water;
  Collectible.Boat = Boat;
  Collectible.LifeUp = LifeUp;
  Collectible.LifeDown = LifeDown;

  Collectible.__defineSetter__('collide_objects', function (value) {
    BaseCollectible.collide_objects = value;
  });
  Collectible.__defineSetter__('overlap_objects', function (value) {
    BaseCollectible.overlap_objects = value;
  });
  Collectible.__defineSetter__('ref_collectibles', function (value) {
    BaseCollectible.ref_collectibles = value;
  });
  Collectible.__defineSetter__('structure_objects', function (value) {
    BaseCollectible.structure_objects = value;
  });

  return Collectible;
});
