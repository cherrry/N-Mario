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
  var socket = null, latency; // socket for connecting the server

  // choose server
  localStorage.server = localStorage.server || 'localhost:8080';
  $('#input_server_address').val(localStorage.server)
  $('#choose_server')
    .modal('setting', {
      closable: false,
      onApprove: function() {
        // connect to server
        localStorage.server = $('#input_server_address').val();
        socket = io.connect('http://' + localStorage.server);

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
        // initialize session
        sessionStorage.id = '';
        sessionStorage.room = -1;

        // measure network latency
        latency = new (function () {
          var self = this, ping;
          var delays = Array(60), latency_sum = 0, head = 0, count = 0;
          for (var i = 0; i < 60; i++) {
            delays[i] = 0;
          }

          // provide a way to query average delay of this player
          this.__defineGetter__('average_delay', function() {
            return latency_sum / count;
          });

          window.setInterval(function () {
            ping = Date.now();
            socket.emit('ping');
          }, 2000); // network latency is measured every 2 seconds
          socket.on('pong', function (data) {
            var delay = Date.now() - ping;
            latency_sum = latency_sum - delays[head];
            delays[head] = delay;
            latency_sum = latency_sum + delays[head];

            head = (head + 1) % 60;
            count = Math.min(count + 1, 60);
          });
        })();

        // notify the server your connection
        socket.emit('connect request', { name: localStorage.name });
        socket.on('connect response', function (data) {
          sessionStorage.id = data.player.id;
          update_room(data.rooms);
        });

        // update when room status has changed
        socket.on('room status change', function (data) {
          update_room(data);
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
            var room2alp = "ABCDEF";
            //console.log(data.room.players);

            $('#content_index').hide();
            $('#content_room .room.number').html(room2alp.charAt(data.room.number));
            $('#content_room').show();

            sessionStorage.room = data.room.number;

            update_room(data.room);
          } else if (data.status == 'reject') {
            console.log('join room request was rejected by server');
          }
        });

        // player leaves room
        $('#content_room #leave_room').click(function (evt) {
          //console.log(sessionStorage.room);
          if (sessionStorage.room != -1) {
            socket.emit('leave room request', { id: sessionStorage.id });
          }
        });
        socket.on('leave room response', function (data) {
          //console.log(data);
          sessionStorage.room = -1;

          $('#content_index').show();
          $('#content_room').hide();

          $('#message_board').html('');
          $('#chatbox').val('');

          update_room(data.rooms);
        });

        // chat when wating game to start
        $("#content_room #chatbox").keyup(function(evt){
          if (evt.keyCode == 13 && $('#chatbox').val() != ''){
            socket.emit('chat message send', { message: $('#chatbox').val() });
            $('#chatbox').val('');
          }
        });
        socket.on('chat message recieved', function (data) {
          // TODO: add the colored icon before the player name
          if (sessionStorage.room != -1) {
            $('#content_room #message_board')
              .append('<p>'+data.name+': '+data.message+'</p>')
              .scrollTop($('#content_room #message_board').height());
          }
        });

        // player change color
        $('#player_list .player_color').click(function (evt) {
          if ($(this).data('player') == sessionStorage.id) {
            socket.emit('change color request', { id: sessionStorage.id });
          }
        });

        // ready state change
        $('#content_room #im_ready').on('change', function (evt) {
          var state = $('#content_room #im_ready').is(':checked');
          socket.emit('ready state change', { id: sessionStorage.id, ready: state });
        });

        function update_room(rooms) {
          //console.log(rooms);
          if (sessionStorage.room == -1) {
            // player is not in any room
            for (var i = 0; i < 6; i++) {
              var room = rooms[i];

              for (var j = 0; j < 4; j++) {
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
          } else {
            // player is in a room
            var room = rooms;
            //console.log(room);

            for (var i = 0; i < 4; i++) {
              var player = room.players[i];

              if (player != null) {
                $('#player_list .empty_'+i).hide();
                $('#player_list .player_'+i).show();

                $('#player_list .player_'+i+' .player_color').css('background-position', '-' + ((player.color + 1) * 16 - 4) + 'px 4px');
                $('#player_list .player_'+i+' .player_color').data('player', player.id);

                $('#player_list .player_'+i+' .player_name').html(player.name);
                if (player.ready) {
                  $('#player_list .player_'+i+' .player_ready').show();
                } else {
                  $('#player_list .player_'+i+' .player_ready').hide();
                }

                if (player.id == sessionStorage.id) {
                  $('#player_list .player_'+i).addClass('self');
                  if (player.isOwner) {
                    $('#start_game').removeClass('disabled');
                  } else {
                    $('#start_game').addClass('disabled');
                  }
                } else {
                  $('#player_list .player_'+i).removeClass('self');
                }

                if (player.isOwner) {
                  $('#player_list .player_'+i).addClass('owner');
                } else {
                  $('#player_list .player_'+i).removeClass('owner');
                }

              } else {
                $('#player_list .empty_'+i).show();
                $('#player_list .player_'+i).hide();
              }
            }
          }
        }
      }
    }).modal('show');
});
