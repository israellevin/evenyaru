var QUIPS = {
    'win': {
        'rock': [
            'win rock 1',
            'win rock 2'
        ],
        'paper': [
            'win paper 1',
            'win paper 2'
        ],
        'scissors': [
            'win scissors 1',
            'win scissors 2'
        ]
    },
    'draw': {
        'rock': [
            'draw rock 1',
            'draw rock 2'
        ],
        'paper': [
            'draw paper 1',
            'draw paper 2'
        ],
        'scissors': [
            'draw scissors 1',
            'draw scissors 2'
        ]
    },
    'lose': {
        'rock': [
            'lose rock 1',
            'lose rock 2'
        ],
        'paper': [
            'lose paper 1',
            'lose paper 2'
        ],
        'scissors': [
            'lose scissors 1',
            'lose scissors 2'
        ]
    }
};

angular.module('evenyaru', ['ionic']).config(function($ionicConfigProvider){
    $ionicConfigProvider.views.maxCache(0);
})

.run(function($ionicPlatform){
    $ionicPlatform.ready(function(){
        // Hide the accessory bar.
        if(window.cordova && window.cordova.plugins.Keyboard){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar){
            StatusBar.styleDefault();
        }
    });
})

.controller('mainCtrl', function($scope, $location, $ionicPopup, $timeout){
    var moves = ['rock', 'paper', 'scissors']
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.emit('connect', {});

    socket.on('connected', function(message){
        $scope.token = message.token;
        $scope.room = $location.search().room || 'stam';
        $scope.join($scope.room);
        $scope.$apply();
    });

    socket.on('fail', function(message){
        if(message.type === 'room is full'){
            $ionicPopup.alert({
                title: 'החדר מלא!',
                template: 'נסה שוב?'
            }).then(function(){
                $scope.join($scope.room);
            });
        }else if(message.type === 'wrong team'){
            $ionicPopup.confirm({
                title: 'playing for the wrong team',
                template: 'Would you like to override your default team?'
            }).then(function(override){
                if(override){
                    $scope.join($scope.room, true);
                }
            });
        }else{
            console.log('unknown error', message);
        }
    });

    socket.on('ready', function(message){
        $scope.room = message.room;
        $scope.team = message.team;
        $scope.message = 'בחר:';
        $scope.ready = true;
        $scope.state = 0;
        $scope.$apply();
    });

    socket.on('score', function(message){
        $scope.score = message.score;
        $scope.$apply();
    });

    socket.on('move', function(message){
        if(message.move === $scope.team){
            $scope.state = 2;
        }else{
            $scope.state = -1;
        }
        $scope.$apply();
    });

    socket.on('winner', function(message){
        var rightquips, modifier;
        if(null === message.winner){
            rightquips = QUIPS.draw[$scope.choice];
            modifier = 0;
        }else if(message.winner === $scope.team){
            rightquips = QUIPS.win[$scope.choice];
            modifier = -1;
        }else{
            rightquips = QUIPS.lose[$scope.choice];
            modifier = 1;
        }
        $scope.message = rightquips[Math.floor(Math.random() * rightquips.length)];
        $scope.response = moves[(moves.indexOf($scope.choice) + modifier) % 3];

        // TODO Here comes the animation.
        $timeout(function(){
            $scope.state = 0;
        }, 5000);

        $scope.message += ' שחק שוב:'
        $scope.$apply();
    });

    $scope.join = function(room, override){
        socket.emit('join', {room: room, override: override});
    };

    $scope.play = function(choice){
        $scope.state = 1;
        socket.emit('play', {choice: choice});
        $scope.choice = choice;
        $scope.response = false;
        $scope.$apply();
    };

    $scope.log_email = function(address){
        socket.emit('log_email', address);
    };
});
