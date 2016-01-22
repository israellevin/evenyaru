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
        var modifier = 0; 
	var you = ''; var them='';
        if(null === message.winner){
            $scope.message = "תיקו! פנקו את עצמכם בשתי נקודות.";
	    you='cool';  them='cool';	
        }else{
            if(message.winner === $scope.team){
                modifier = -1;
                $scope.message = 'נצחת';
		you='win';  them='lose';	
            }else{
                modifier = 1;
                $scope.message = 'הפסדת';
		you='lose';  them='win';	
            }
        }
        $scope.response = moves[(moves.indexOf($scope.choice) + modifier) % 3];
	$scope.choice += ' ' + you;
	$scope.response += ' ' + them;
	
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
