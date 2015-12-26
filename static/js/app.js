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

.controller('mainCtrl', function($scope, $location, $ionicPopup){
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.emit('connect', {});

    socket.on('connected', function(msg){
        $scope.token = msg.token;
        $scope.room = 'stam';
        $scope.join($scope.room);
        $scope.$apply();
    });

    socket.on('fail', function(msg){
        if(msg.type === 'room is full'){
            $ionicPopup.alert({
                title: 'אי אפשר!',
                template: 'החדר כבר מלא'
            });
        }else if(msg.type === 'wrong team'){
            $ionicPopup.confirm({
                title: 'playing for the wrong team',
                template: 'Would you like to override your default team?'
            }).then(function(override){
                if(override){
                    $scope.join($scope.room, true);
                }
            });
        }else{
            console.log('unknown error', msg);
        }
    });

    socket.on('ready', function(msg){
        $scope.room = msg.room;
        $scope.team = msg.team;
        $scope.message = 'בחר:';
        $scope.ready = true;
        $scope.state = 0;
        $scope.$apply();
    });

    socket.on('score', function(msg){
        $scope.score = msg.score;
        $scope.$apply();
    });

    socket.on('move', function(msg){
        if(msg.move === $scope.team){
            $scope.state = 1;
        }else{
            $scope.state = -1;
        }
        $scope.$apply();
    });

    socket.on('winner', function(msg){
        if(!msg.winner){
            $scope.message = "It's a tie.";
        }else{
            if(msg.winner === $scope.team){
                $scope.message = 'You won.';
            }else{
                $scope.message = 'You lost.';
            }
        }
        $scope.message += ' Play again:'
        $scope.state = 0;
        $scope.$apply();
    });

    $scope.join = function(room, override){
        socket.emit('join', {room: room, override: override});
    };

    $scope.play = function(val){
        socket.emit('play', {choise: val});
        $scope.yourlastchois = val;
    }
});
