require.config({
  paths: {
    'jquery': '../libs/jquery/jquery.min',
    'semantic-ui': '../libs/semantic-ui/javascript/semantic.min',
    'socket.io': '../libs/socket.io/socket.io.min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'semantic-ui': ['jquery'],
    'socket.io': {
      exports: 'io'
    }
  }
});

define(['jquery', 'semantic-ui', 'socket.io'], function ($, _, io) {
  // variables
  var socket; // socket for connecting the server

  // connecting to server
  socket = io.connect('http://n-mario.herokuapp.com:80');
  //socket = io.connect('http://localhost:8080');

  // player name
  localStorage.name = localStorage.name || 'Player';
  $('#player_name')
    .html(localStorage.name)
    .popup({
      content: 'Change your name',
      position: 'bottom center'
    });
  $('#input_player_name')
    .val(localStorage.name);
  $('#edit_player_name')
    .modal('setting', {
      onApprove: function() {
        localStorage.name = $('#input_player_name').val();
        $('#player_name').html(localStorage.name);
        $('#input_player_name').val(localStorage.name);

        // TODO: tell the server about name change
        socket.emit('name change', { id: sessionStorage.id, name: localStorage.name });
      }
    })
    .modal('attach events', '#player_name', 'show');


  // notify the server your connection
  socket.emit('connect request', { name: localStorage.name });
  socket.on('connect response', function (data) {
    sessionStorage.id = data.player.id;
    update_room(data.rooms);
  });

  // player request to join room
  $('#content_index .room').click(function (evt) {
    var room = $(this).data('room'),
        data = { id: sessionStorage.id, room: room };
    // console.log('join room request: ' + JSON.stringify(data));
    socket.emit('join room request', data);
  });
  socket.on('join room response', function (data) {
    //console.log('join room response: ' + JSON.stringify(data));
    if (data.status == 'accept') {

      $('#content_index').hide();
      $('#content_room').show();
    } else if (data.status == 'reject') {
      console.log('join room request was rejected by server');
    }
  });

  socket.on('room status change', function (data) {
    update_room(data);
  });

  function update_room(rooms) {
    //console.log(rooms);

    for (var i = 0; i < 6; i++) {
      var room = rooms[i];

      for (var j = 0; j < 6; j++) {
        var player = room.players[j];

        if (player != null) {
          $('#room_'+i+' .empty_'+j).hide();
          $('#room_'+i+' .player_'+j).show();
          $('#room_'+i+' .player_'+j+' .player_color').css('background-position', '-' + (player.color + 1) * 16 + 'px 0px');
          $('#room_'+i+' .player_'+j+' .player_name').html(player.name);
        } else {
          $('#room_'+i+' .empty_'+j).show();
          $('#room_'+i+' .player_'+j).hide();
        }
      }
    }
  }
});
