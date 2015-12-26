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

.controller('mainCtrl', function($scope, $location){
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.emit('connect', {});

    socket.on('connected', function(msg){
        $scope.token = msg.token;
    });

    socket.on('ready', function(msg){
        $scope.message = 'בחר:';
        $scope.score = [0, 0];
        $scope.ready = true;
        $scope.state = 0;
        $scope.$apply();
    });

    socket.on('move', function(msg){
        if(msg.player === $scope.token){
            $scope.state = 1;
        }else{
            $scope.state = -1;
        }
        $scope.$apply();
    });

    socket.on('victory', function(msg){
        if(!msg.player){
            $scope.message = "It's a tie.";
        }else if(msg.player === $scope.token){
            $scope.message = 'You won.';
            $scope.score[0]++;
        }else{
            $scope.message = 'You lost.';
            $scope.score[1]++;
        }
        $scope.message += ' Play again:'
        $scope.state = 0;
        $scope.$apply();
    });

    $scope.join = function(room){
        socket.emit('join', {room: room});
    };

    $scope.roomchange = function(event){
        if(event.keyCode === 13){
            $scope.join($scope.form.room);
        }
    }

    $scope.play = function(){
        socket.emit('play', {choise: $scope.form.choise});
    }


    $scope.gplay = function (val) {
	socket.emit('play', {choise: val});
	$scope.yourlastchois =val;
    }

    $scope.form = {};
    $scope.room = $location.search().room;
    if($scope.room) $scope.join($scope.room);
});
